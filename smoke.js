// Teste de fumaça: node tests/smoke.js  (precisa do playwright: NODE_PATH=<pasta node_modules>)
const { chromium } = require('playwright'); const http = require('http'), fs = require('fs'), path = require('path'), assert = require('assert');
const root = path.join(__dirname, '..'), OUT = process.env.OUT || '/tmp';
const mime = { '.js': 'text/javascript', '.css': 'text/css', '.html': 'text/html', '.jpg': 'image/jpeg', '.png': 'image/png' };
const srv = http.createServer((q, r) => { const u = decodeURIComponent(q.url.split('?')[0]); const f = path.join(root, u === '/' ? 'index.html' : u);
  fs.readFile(f, (e, d) => { if (e) { r.statusCode = 404; r.end(); } else { r.setHeader('content-type', mime[path.extname(f)] || 'application/octet-stream'); r.end(d); } }); });
let ok = 0, bad = 0; async function t(n, fn) { try { await fn(); ok++; console.log('ok -', n); } catch (e) { bad++; console.log('FALHOU -', n, '\n  ', String(e.message).split('\n').slice(0, 3).join(' // ')); } }
srv.listen(0, async () => {
  const base = 'http://localhost:' + srv.address().port + '/';
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, acceptDownloads: true });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, (r) => r.abort());
  const p = await ctx.newPage(); const erros = []; p.on('pageerror', (e) => erros.push(e.message));
  await p.addInitScript(() => { window.__abertos = []; window.open = (u) => { window.__abertos.push(u); return {}; }; navigator.canShare = () => true; navigator.share = async (d) => { window.__share = { n: d.files[0].name, t: d.files[0].type, s: d.files[0].size, title: d.title }; }; });
  await p.goto(base); await p.waitForSelector('.cartao');
  await t('catálogo mostra 41 produtos com foto', async () => {
    assert.strictEqual(await p.locator('.cartao').count(), 41);
    await p.waitForFunction(() => [...document.querySelectorAll('.cartao img')].slice(0, 6).every((i) => i.complete && i.naturalWidth > 0), null, { timeout: 8000 });
    const quebradas = await p.evaluate(async () => { const r = []; for (const x of window.PRODUTOS) { const ok = await new Promise((res) => { const i = new Image(); i.onload = () => res(true); i.onerror = () => res(false); i.src = x.foto; }); if (!ok) r.push(x.codigo); } return r; });
    assert.deepStrictEqual(quebradas, [], 'fotos ausentes');
  });
  await t('busca e categoria', async () => {
    await p.fill('#busca', 'luminaria'); const n = await p.locator('.cartao').count(); assert(n > 3 && n < 41);
    await p.fill('#busca', 'zzzz'); assert(await p.locator('#vazio').isVisible()); await p.fill('#busca', '');
    await p.getByRole('button', { name: 'Quadros', exact: true }).click(); const q = await p.locator('.cartao').count(); assert(q >= 3 && q < 41);
    await p.getByRole('button', { name: 'Todos', exact: true }).click(); assert.strictEqual(await p.locator('.cartao').count(), 41);
  });
  await t('escolher cor, quantidade e personalização; validação do nome', async () => {
    await p.locator('.cartao', { hasText: 'Luminária Infantil Astronauta' }).first().getByRole('button', { name: /Escolher/ }).click();
    await p.getByRole('button', { name: 'Rosa' }).click(); await p.fill('.qtd input', '2');
    await p.getByRole('button', { name: /Sim, quero personalizar/ }).click();
    await p.getByRole('button', { name: /Adicionar ao orçamento/ }).click();
    assert(/Digite o nome/.test(await p.textContent('.erro:not([hidden])')));
    await p.fill('#f-pers', 'Maria Clara'); await p.getByRole('button', { name: /Adicionar ao orçamento/ }).click();
    assert(await p.locator('#folha').isHidden()); assert.strictEqual((await p.textContent('#cont')).trim(), '2');
    await p.locator('.cartao', { hasText: 'Quadro Pai Nosso' }).first().getByRole('button', { name: /Escolher/ }).click();
    await p.getByRole('button', { name: /Adicionar ao orçamento/ }).click();
    assert.strictEqual((await p.textContent('#cont')).trim(), '3');
  });
  await t('orçamento: pede nome, abre WhatsApp da loja com a mensagem completa', async () => {
    await p.click('#btn-barra');
    await p.getByRole('button', { name: /Solicitar orçamento pelo WhatsApp/ }).click();
    assert(/Informe seu nome/.test(await p.textContent('.erro:not([hidden])')));
    await p.fill('#f-cliente', 'Ana Souza'); await p.fill('#f-obs', 'Para o dia 20');
    await p.getByRole('button', { name: /Solicitar orçamento pelo WhatsApp/ }).click();
    await p.waitForFunction(() => window.__abertos.length === 1);
    const u = await p.evaluate(() => window.__abertos[0]); assert(u.startsWith('https://wa.me/5585987040243?text='), u.slice(0, 60));
    const msg = decodeURIComponent(u.split('text=')[1]); fs.writeFileSync(OUT + '/msg.txt', msg);
    for (const s of ['Solicitação de orçamento', 'Cliente: Ana Souza', 'Cor: Rosa | Quantidade: 2', 'Personalização: "Maria Clara"', 'Ver o pedido completo com as fotos:', 'orcamento.html#', 'Para o dia 20', 'Total: 3 peças']) assert(msg.includes(s), 'falta: ' + s);
  });
  await t('link do pedido (o que o dono abre no WhatsApp): mostra tudo com fotos e baixa PDF', async () => {
    const msg = fs.readFileSync(OUT + '/msg.txt', 'utf8'); const link = msg.match(/https?:\/\/\S+orcamento\.html#\S+/)[0];
    const v = await ctx.newPage(); const er = []; v.on('pageerror', (e) => er.push(e.message)); await v.goto(link);
    await v.waitForSelector('.p-item'); assert.strictEqual(await v.locator('.p-item').count(), 2);
    const txt = await v.textContent('#ped');
    for (const x of ['Ana Souza', 'Maria Clara', 'Rosa', 'Para o dia 20', 'Total: 3 peças', 'Astronauta', 'Pai Nosso']) assert(txt.includes(x), 'falta ' + x);
    assert.strictEqual((await v.locator('.qtd-g').allTextContents()).join(','), '2,1');
    await v.waitForFunction(() => [...document.querySelectorAll('.p-item img')].every((i) => i.complete && i.naturalWidth > 0));
    await v.getByRole('button', { name: /Gerar PDF do pedido/ }).click(); await v.getByRole('link', { name: 'Baixar PDF' }).waitFor(); assert(await v.getByRole('link', { name: 'Abrir PDF' }).isVisible());
    const [dl] = await Promise.all([v.waitForEvent('download'), v.getByRole('link', { name: 'Baixar PDF' }).click()]);
    const f = OUT + '/orcamento-dono.pdf'; await dl.saveAs(f); assert(fs.readFileSync(f).slice(0, 5).toString() === '%PDF-');
    await v.screenshot({ path: OUT + '/pedido_390.png', fullPage: true });
    await v.goto(base + 'orcamento.html#xxxx'); await v.reload(); await v.waitForSelector('h1'); assert(/não encontrado/.test(await v.textContent('h1')));
    assert.deepStrictEqual(er, []); await v.close();
  });
  await t('confirmação: PDF baixa, é válido e tem imagens', async () => {
    await p.getByRole('link', { name: 'Baixar PDF' }).waitFor(); assert(await p.getByRole('link', { name: /Abrir PDF/ }).isVisible()); assert(await p.getByText('Passo 2').isVisible());
    await p.getByRole('button', { name: /Enviar o PDF com as fotos/ }).click();
    await p.screenshot({ path: OUT + '/conf_390.png' });
    const sh = await p.evaluate(() => window.__share); assert(sh && sh.t === 'application/pdf' && sh.s > 8000 && /\.pdf$/.test(sh.n), JSON.stringify(sh));
    const [dl] = await Promise.all([p.waitForEvent('download'), p.getByRole('link', { name: 'Baixar PDF' }).click()]);
    const f = OUT + '/orcamento.pdf'; await dl.saveAs(f); const buf = fs.readFileSync(f);
    assert(buf.slice(0, 5).toString() === '%PDF-' && buf.slice(-6).toString().includes('%%EOF')); assert(buf.length > 8000);
    assert(/orcamento-orc-\d{8}-\d{3}\.pdf/.test(dl.suggestedFilename()));
  });
  await t('novo orçamento limpa o carrinho', async () => {
    await p.getByRole('button', { name: /Começar um novo orçamento/ }).click(); assert(await p.locator('#cont').isHidden());
  });
  await t('sem erros de JavaScript', async () => assert.deepStrictEqual(erros, []));
  await p.screenshot({ path: OUT + '/home_390.png' });
  const d = await b.newPage({ viewport: { width: 1280, height: 900 } }); await d.route(/fonts\./, (r) => r.abort()); await d.goto(base); await d.waitForSelector('.cartao'); await d.waitForTimeout(600); await d.screenshot({ path: OUT + '/home_1280.png' });
  console.log(ok + ' ok, ' + bad + ' falhas'); await b.close(); srv.close(); process.exit(bad ? 1 : 0);
});
