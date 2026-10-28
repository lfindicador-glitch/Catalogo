/* Catálogo Corte e Cria Decor: escolher produtos, montar o orçamento e enviar pelo WhatsApp. */
(function () {
  'use strict';
  var CFG = window.CONFIG || {};
  var PRODUTOS = window.PRODUTOS || [];
  var CORES = CFG.CORES || [];
  var CHAVE = 'cec_orcamento_v1';

  var S = { cat: 'Todos', busca: '', itens: [], cliente: '', obs: '', ultimo: null, foco: null };

  // ---------- utilidades ----------
  function $(s, r) { return (r || document).querySelector(s); }
  function h(tag, attrs) {
    var el = document.createElement(tag), i, k, c;
    if (attrs) for (k in attrs) {
      if (attrs[k] == null || attrs[k] === false) continue;
      if (k === 'text') el.textContent = attrs[k];
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]);
      else if (k === 'class') el.className = attrs[k];
      else el.setAttribute(k, attrs[k] === true ? '' : attrs[k]);
    }
    for (i = 2; i < arguments.length; i++) {
      c = arguments[i]; if (c == null || c === false) continue;
      if (Array.isArray(c)) c.forEach(function (x) { if (x) el.appendChild(x); });
      else el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return el;
  }
  function icone(path) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('class', 'ic'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true');
    path.split('|').forEach(function (d) { var p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', d); s.appendChild(p); });
    return s;
  }
  var IC = {
    wa: 'M4 20l1.3-4.2A8 8 0 1 1 8.3 18.8L4 20Z|M9 9c0 3 3 6 6 6l1.2-1.4-2-1-1 .6c-.8-.4-1.6-1.2-2-2l.6-1-1-2L9 9Z',
    baixar: 'M12 4v11|M7 11l5 5 5-5|M5 20h14',
    ok: 'M5 12.5l4.5 4.5L19 7.5',
    mais: 'M12 5v14|M5 12h14',
    lixo: 'M5 7h14|M10 7V4h4v3|M7 7l1 13h8l1-13',
    comp: 'M12 4v11|M8 8l4-4 4 4|M5 14v6h14v-6'
  };
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function porCodigo(c) { for (var i = 0; i < PRODUTOS.length; i++) if (PRODUTOS[i].codigo === c) return PRODUTOS[i]; return null; }
  function corHex(n) { for (var i = 0; i < CORES.length; i++) if (CORES[i].nome === n) return CORES[i].hex; return '#ccc'; }
  function salvar() { try { localStorage.setItem(CHAVE, JSON.stringify({ itens: S.itens, cliente: S.cliente, obs: S.obs })); } catch (e) { /* sem armazenamento */ } }
  function carregar() {
    try {
      var d = JSON.parse(localStorage.getItem(CHAVE) || 'null');
      if (d && Array.isArray(d.itens)) {
        S.itens = d.itens.filter(function (i) { return i && porCodigo(i.codigo) && i.qtd > 0; })
          .map(function (i) { return { codigo: i.codigo, cor: i.cor || '', qtd: Math.min(999, Math.max(1, i.qtd | 0)), pers: i.pers ? String(i.pers).slice(0, 100) : '' }; });
        S.cliente = String(d.cliente || '').slice(0, 80); S.obs = String(d.obs || '').slice(0, 300);
      }
    } catch (e) { /* ignora */ }
  }
  function aviso(txt) {
    var a = h('div', { class: 'aviso', text: txt }); $('#avisos').appendChild(a);
    setTimeout(function () { a.remove(); }, 2200);
  }
  function totalPecas() { return S.itens.reduce(function (s, i) { return s + i.qtd; }, 0); }

  // ---------- catálogo ----------
  function categorias() {
    var set = {}; PRODUTOS.forEach(function (p) { set[p.categoria] = 1; });
    return ['Todos'].concat(Object.keys(set).sort(function (a, b) { return a.localeCompare(b, 'pt'); }));
  }
  function desenharCats() {
    var box = $('#cats'); box.textContent = '';
    categorias().forEach(function (c) {
      box.appendChild(h('button', { type: 'button', class: 'chip', 'aria-pressed': String(S.cat === c), text: c, onclick: function () { S.cat = c; desenharCats(); desenharGrade(); } }));
    });
  }
  function cartao(p) {
    var img = h('img', { src: p.foto, alt: p.nome, loading: 'lazy', decoding: 'async', width: 400, height: 400 });
    return h('li', { class: 'cartao' },
      h('button', { type: 'button', class: 'foto', 'aria-label': 'Ver detalhes de ' + p.nome, onclick: function () { abrirProduto(p); } }, img),
      h('div', { class: 'corpo' },
        h('span', { class: 'cat-rot', text: p.categoria }),
        h('h3', { class: 'nome', text: p.nome }),
        p.medidas ? h('span', { class: 'med', text: 'Medidas: ' + p.medidas }) : null,
        p.personalizavel ? h('span', { class: 'etq', text: 'Personalizável' }) : null,
        h('button', { type: 'button', class: 'btn btn-sec btn-peq', 'aria-label': 'Escolher ' + p.nome, onclick: function () { abrirProduto(p); } }, icone(IC.mais), 'Escolher')));
  }
  function desenharGrade() {
    var q = norm(S.busca).trim(), g = $('#grade'); g.textContent = '';
    var lista = PRODUTOS.filter(function (p) {
      return (S.cat === 'Todos' || p.categoria === S.cat) && (!q || norm(p.nome + ' ' + p.nomeCompleto + ' ' + p.categoria + ' ' + p.codigo).indexOf(q) >= 0);
    });
    lista.forEach(function (p) { g.appendChild(cartao(p)); });
    $('#vazio').hidden = lista.length > 0;
    $('#contagem').textContent = lista.length + (lista.length === 1 ? ' produto' : ' produtos');
  }

  // ---------- folha (modal) ----------
  function abrirFolha(titulo, corpo) {
    S.foco = document.activeElement;
    $('#folha-titulo').textContent = titulo;
    var c = $('#folha-corpo'); c.textContent = ''; c.appendChild(corpo);
    $('#folha').hidden = false; document.body.style.overflow = 'hidden';
    $('#folha .folha-caixa').focus();
  }
  function fecharFolha() {
    $('#folha').hidden = true; document.body.style.overflow = '';
    if (S.foco && S.foco.focus) try { S.foco.focus(); } catch (e) { /* ok */ }
  }
  function folhaAberta() { return !$('#folha').hidden; }

  function seletorQtd(inicial, onChange) {
    var inp = h('input', { type: 'number', inputmode: 'numeric', min: 1, max: 999, value: inicial, 'aria-label': 'Quantidade' });
    function set(v) { v = Math.min(999, Math.max(1, parseInt(v, 10) || 1)); inp.value = v; if (onChange) onChange(v); return v; }
    inp.addEventListener('change', function () { set(inp.value); });
    var box = h('div', { class: 'qtd' },
      h('button', { type: 'button', 'aria-label': 'Diminuir', text: '−', onclick: function () { set((parseInt(inp.value, 10) || 1) - 1); } }), inp,
      h('button', { type: 'button', 'aria-label': 'Aumentar', text: '+', onclick: function () { set((parseInt(inp.value, 10) || 1) + 1); } }));
    box.valor = function () { return set(inp.value); };
    return box;
  }

  // Descrição do produto (recolhida): linhas "## " viram subtítulo, "- " viram itens de lista
  function detalhes(p) {
    if (!p.descricao || !p.descricao.length) return null;
    var corpo = h('div', { class: 'desc-corpo' }), lista = null;
    p.descricao.forEach(function (t) {
      if (t.indexOf('- ') === 0) { if (!lista) { lista = h('ul'); corpo.appendChild(lista); } lista.appendChild(h('li', { text: t.slice(2) })); return; }
      lista = null;
      if (t.indexOf('## ') === 0) corpo.appendChild(h('h4', { text: t.slice(3) })); else corpo.appendChild(h('p', { text: t }));
    });
    return h('details', { class: 'desc' }, h('summary', { text: 'Ver descrição do produto' }), corpo);
  }

  // Foto principal do produto + miniaturas das fotos extras (se houver)
  function galeria(p) {
    var img = h('img', { src: p.foto, alt: p.nome });
    var caixa = h('div', { class: 'det-foto' }, img);
    var todas = [p.foto].concat(p.fotosExtra || []);
    if (todas.length < 2) return caixa;
    var botoes = todas.map(function (f, i) {
      var b = h('button', { type: 'button', class: 'mini' + (i === 0 ? ' ativa' : ''), 'aria-label': 'Ver foto ' + (i + 1) + ' de ' + todas.length,
        onclick: function () {
          img.src = f;
          botoes.forEach(function (x) { x.classList.remove('ativa'); });
          b.classList.add('ativa');
        } }, h('img', { src: f, alt: '', loading: 'lazy' }));
      return b;
    });
    return h('div', { class: 'galeria' }, caixa, h('div', { class: 'minis' }, botoes));
  }

  function abrirProduto(p) {
    var cor = '', querPers = false;
    var erro = h('p', { class: 'erro', role: 'alert', hidden: true });
    var nomeInp = h('input', { class: 'campo', id: 'f-pers', type: 'text', maxlength: 100, placeholder: p.persExemplo || 'Ex.: Maria Clara', autocomplete: 'off' });
    var blocoNome = h('div', { class: 'bloco', hidden: true }, h('label', { for: 'f-pers', text: p.persRotulo || 'Nome ou frase para gravar' }), nomeInp);
    var qtd = seletorQtd(1);

    var cores = h('div', { class: 'cores', role: 'group', 'aria-label': 'Cor' });
    function marcarCor() { Array.prototype.forEach.call(cores.children, function (b) { b.setAttribute('aria-pressed', String(b.dataset.cor === cor)); }); }
    var coresDoProduto = p.cores ? CORES.filter(function (c) { return p.cores.indexOf(c.nome) > -1; }) : CORES;
    coresDoProduto.forEach(function (c) {
      var i = h('i'); i.style.background = c.hex;
      cores.appendChild(h('button', { type: 'button', class: 'cor', 'data-cor': c.nome, 'aria-pressed': 'false', onclick: function () { cor = (cor === c.nome ? '' : c.nome); marcarCor(); } }, i, c.nome));
    });

    var blocoPers = null;
    if (p.personalizavel) {
      var bSim = h('button', { type: 'button', 'aria-pressed': 'false', text: 'Sim, quero personalizar' });
      var bNao = h('button', { type: 'button', 'aria-pressed': 'true', text: 'Não' });
      function setPers(v) { querPers = v; bSim.setAttribute('aria-pressed', String(v)); bNao.setAttribute('aria-pressed', String(!v)); blocoNome.hidden = !v; if (v) nomeInp.focus(); }
      bSim.addEventListener('click', function () { setPers(true); }); bNao.addEventListener('click', function () { setPers(false); });
      blocoPers = h('div', { class: 'bloco' }, h('span', { class: 'rot', text: p.persPergunta || 'Personalizar com nome?' }), h('div', { class: 'sw-pers' }, bSim, bNao));
    }

    var add = h('button', { type: 'button', class: 'btn btn-pri btn-grande', onclick: function () {
      var nome = nomeInp.value.trim();
      if (querPers && !nome) { erro.textContent = 'Preencha o que será gravado.'; erro.hidden = false; nomeInp.focus(); return; }
      adicionar({ codigo: p.codigo, cor: cor, qtd: qtd.valor(), pers: querPers ? nome : '' });
      fecharFolha(); aviso('Adicionado ao orçamento');
    } }, icone(IC.mais), 'Adicionar ao orçamento');

    var corpo = h('div', { class: 'pilha' },
      galeria(p),
      h('div', { class: 'det-info' },
        h('span', { class: 'cat-rot', text: p.categoria }),
        h('h3', { text: p.nomeCompleto }),
        p.medidas ? h('span', { class: 'med', text: 'Medidas: ' + p.medidas }) : null),
      detalhes(p),
      coresDoProduto.length ? h('div', { class: 'bloco' }, h('span', { class: 'rot' }, 'Cor ', h('span', { class: 'dica', text: '(opcional)' })), cores) : null,
      h('div', { class: 'bloco' }, h('span', { class: 'rot', text: 'Quantidade' }), qtd),
      blocoPers, blocoNome, erro, add);
    abrirFolha('Escolher opções', corpo);
  }

  function adicionar(novo) {
    var ex = S.itens.filter(function (i) { return i.codigo === novo.codigo && i.cor === novo.cor && i.pers === novo.pers; })[0];
    if (ex) ex.qtd = Math.min(999, ex.qtd + novo.qtd); else S.itens.push(novo);
    salvar(); atualizarBarra();
  }
  function atualizarBarra() {
    var n = totalPecas(), c = $('#cont');
    c.hidden = n === 0; c.textContent = n;
    var b = $('#barra-mob'); b.hidden = S.itens.length === 0;
    $('#btn-barra').textContent = 'Ver meu orçamento (' + n + (n === 1 ? ' peça)' : ' peças)');
  }

  // ---------- orçamento ----------
  function detalheItem(i) {
    var l = []; l.push('Cor: ' + (i.cor || 'a combinar')); l.push('Quantidade: ' + i.qtd);
    return l;
  }
  function abrirCarrinho() {
    if (!S.itens.length) {
      abrirFolha('Meu orçamento', h('div', { class: 'pilha' }, h('p', { text: 'Seu orçamento está vazio. Escolha produtos no catálogo e toque em “Adicionar ao orçamento”.' }), h('button', { type: 'button', class: 'btn btn-pri btn-grande', 'data-fechar': true, text: 'Ver produtos' })));
      return;
    }
    var lista = h('ul', { class: 'itens' });
    function redesenhar() {
      lista.textContent = '';
      S.itens.forEach(function (it, idx) {
        var p = porCodigo(it.codigo);
        var q = seletorQtd(it.qtd, function (v) { it.qtd = v; salvar(); atualizarBarra(); });
        lista.appendChild(h('li', { class: 'item' },
          h('img', { src: p.foto, alt: '' }),
          h('div', null,
            h('h4', { text: p.nome }),
            h('p', { text: 'Cor: ' + (it.cor || 'a combinar') }),
            it.pers ? h('p', { text: 'Personalização: “' + it.pers + '”' }) : null,
            h('div', { class: 'item-acoes' }, q,
              h('button', { type: 'button', class: 'lnk perigo', onclick: function () { S.itens.splice(idx, 1); salvar(); atualizarBarra(); if (!S.itens.length) fecharFolha(); else redesenhar(); } }, 'Remover')))));
      });
    }
    redesenhar();
    var nome = h('input', { class: 'campo', id: 'f-cliente', type: 'text', maxlength: 80, autocomplete: 'name', placeholder: 'Seu nome', value: S.cliente });
    var obs = h('textarea', { class: 'campo', id: 'f-obs', maxlength: 300, placeholder: 'Ex.: preciso para o dia 20, entrega em Fortaleza…' });
    obs.value = S.obs;
    var erro = h('p', { class: 'erro', role: 'alert', hidden: true });
    nome.addEventListener('input', function () { S.cliente = nome.value; salvar(); });
    obs.addEventListener('input', function () { S.obs = obs.value; salvar(); });
    var enviar = h('button', { type: 'button', class: 'btn btn-wa btn-grande', onclick: function () {
      if (nome.value.trim().length < 2) { erro.textContent = 'Informe seu nome para enviar o orçamento.'; erro.hidden = false; nome.focus(); return; }
      enviarOrcamento(enviar);
    } }, icone(IC.wa), 'Solicitar orçamento pelo WhatsApp');
    var corpo = h('div', { class: 'pilha' }, lista,
      h('div', { class: 'bloco' }, h('label', { for: 'f-cliente', text: 'Seu nome' }), nome),
      h('div', { class: 'bloco' }, h('label', { for: 'f-obs' }, 'Observações ', h('span', { class: 'dica', text: '(opcional)' })), obs),
      erro, enviar,
      h('p', { class: 'pequeno', text: 'Ao tocar no botão, o WhatsApp abre com a sua solicitação pronta para enviar à loja. Você também poderá baixar o PDF com as fotos.' }));
    abrirFolha('Meu orçamento (' + totalPecas() + (totalPecas() === 1 ? ' peça)' : ' peças)'), corpo);
  }

  function numeroOrc() {
    var d = new Date(), z = function (n) { return ('0' + n).slice(-2); };
    return 'ORC-' + d.getFullYear() + z(d.getMonth() + 1) + z(d.getDate()) + '-' + ('00' + Math.floor(Math.random() * 1000)).slice(-3);
  }
  function dataHora() { return new Date().toLocaleString('pt-BR', { timeZone: 'America/Fortaleza', dateStyle: 'short', timeStyle: 'short' }).replace(',', ' às'); }
  function baseSite() { try { return new URL('.', location.href).href; } catch (e) { return ''; } }

  // Link que abre a página "orcamento.html" com o pedido completo (fotos, quantidades, observações)
  function b64url(s) { return btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); }
  function linkPedido(q) {
    var dados = { n: q.numero, d: q.data, c: q.cliente, o: q.obs || '', i: q.itens.map(function (it) { return [porCodigo(it.codigo).id, it.cor || '', it.qtd, it.pers || '']; }) };
    return baseSite() + 'orcamento.html#' + b64url(JSON.stringify(dados));
  }
  function montarMensagem(q) {
    var L = [];
    L.push('*Solicitação de orçamento* – ' + (CFG.LOJA_NOME || 'Corte e Cria Decor'));
    L.push('Nº ' + q.numero + ' · ' + q.data);
    L.push('Cliente: ' + q.cliente);
    L.push('');
    q.itens.forEach(function (it, i) {
      var p = porCodigo(it.codigo);
      L.push('*' + (i + 1) + ') ' + p.nome + '*');
      L.push('Cor: ' + (it.cor || 'a combinar') + ' | Quantidade: ' + it.qtd);
      if (it.pers) L.push('Personalização: "' + it.pers + '"');
      if (p.medidas) L.push('Medidas: ' + p.medidas);
      L.push('Código: ' + p.codigo);
      L.push('');
    });
    if (q.obs) { L.push('Observações: ' + q.obs); L.push(''); }
    L.push('Total: ' + q.pecas + (q.pecas === 1 ? ' peça' : ' peças') + ' em ' + q.itens.length + (q.itens.length === 1 ? ' produto' : ' produtos'));
    L.push('');
    L.push('Ver o pedido completo com as fotos:');
    L.push(linkPedido(q));
    L.push('');
    L.push(CFG.MENSAGEM_FINAL || '');
    return L.join('\n').trim();
  }
  function linkWhats(msg) {
    var n = String(CFG.WHATSAPP || '').replace(/\D/g, '');
    return n ? 'https://wa.me/' + n + '?text=' + encodeURIComponent(msg) : '';
  }

  function enviarOrcamento(botao) {
    var q = {
      numero: numeroOrc(), data: dataHora(), cliente: S.cliente.trim(), obs: S.obs.trim(),
      itens: S.itens.map(function (i) { return { codigo: i.codigo, cor: i.cor, qtd: i.qtd, pers: i.pers }; }), pecas: totalPecas()
    };
    var msg = montarMensagem(q);
    q.msg = msg; q.url = linkWhats(msg); S.ultimo = q;
    var janela = null;
    if (q.url) { try { janela = window.open(q.url, '_blank'); } catch (e) { janela = null; } }
    botao.disabled = true;
    mostrarConfirmacao(q, null, !!janela);
    window.OrcPDF.gerar(q).then(function (bytes) { q.pdf = bytes; mostrarConfirmacao(q, bytes, !!janela); }, function () { mostrarConfirmacao(q, 'erro', !!janela); });
  }

  function nomeArquivo(q) { return 'orcamento-' + q.numero.toLowerCase() + '.pdf'; }
  function urlPDF(q) {
    if (!q.pdfUrl) q.pdfUrl = URL.createObjectURL(new Blob([q.pdf], { type: 'application/pdf' }));
    return q.pdfUrl;
  }
  function arquivoPDF(q) {
    try { var f = new File([q.pdf], nomeArquivo(q), { type: 'application/pdf' }); return (navigator.canShare && navigator.canShare({ files: [f] })) ? f : null; } catch (e) { return null; }
  }
  function navegadorInterno() { return /Instagram|FBAN|FBAV|FB_IAB|Line\//i.test(navigator.userAgent || ''); }

  function mostrarConfirmacao(q, pdf, abriu) {
    var linhas = q.itens.map(function (it) { var p = porCodigo(it.codigo); return h('li', { class: 'pequeno', text: it.qtd + '× ' + p.nome + (it.cor ? ' (' + it.cor + ')' : '') + (it.pers ? ' · “' + it.pers + '”' : '') }); });
    var temNum = !!q.url, passo2 = [];
    if (pdf && pdf !== 'erro') {
      var f = arquivoPDF(q);
      if (f) passo2.push(h('button', { type: 'button', class: 'btn btn-wa btn-grande', onclick: function () {
        navigator.share({ files: [f], title: 'Orçamento ' + q.numero, text: 'Orçamento ' + q.numero + ' – ' + q.cliente }).catch(function () { /* cancelado */ });
      } }, icone(IC.comp), 'Enviar o PDF com as fotos'));
      passo2.push(h('a', { class: 'btn btn-sec btn-grande', href: urlPDF(q), download: nomeArquivo(q) }, icone(IC.baixar), 'Baixar PDF'));
      passo2.push(h('a', { class: 'btn btn-sec btn-grande', href: urlPDF(q), target: '_blank', rel: 'noopener' }, 'Abrir PDF para ver'));
      passo2.push(h('p', { class: 'pequeno', text: f ? 'Toque em “Enviar o PDF com as fotos”, escolha o WhatsApp e depois a conversa da ' + (CFG.LOJA_NOME || 'loja') + '.' : 'Depois de baixar, anexe o PDF na conversa do WhatsApp da loja (clipe → Documento).' }));
      if (navegadorInterno()) passo2.push(h('p', { class: 'aviso-env', text: 'Você está no navegador do Instagram. Se o PDF não baixar, toque nos três pontinhos (⋯) e escolha “Abrir no navegador”.' }));
    } else if (pdf === 'erro') passo2.push(h('p', { class: 'erro', text: 'Não foi possível gerar o PDF agora. Mesmo assim, a mensagem com o pedido e o link das fotos já está pronta no WhatsApp.' }));
    else passo2.push(h('p', { class: 'pequeno', text: 'Gerando o PDF com as fotos…' }));
    var corpo = h('div', { class: 'pilha' },
      h('div', { class: 'ok-topo' }, icone(IC.ok), h('span', { text: 'Solicitação ' + q.numero })),
      h('ul', { class: 'itens' }, linhas),
      h('div', { class: 'bloco' }, h('span', { class: 'rot', text: 'Passo 1: enviar o pedido' }),
        temNum ? h('a', { class: 'btn btn-wa btn-grande', href: q.url, target: '_blank', rel: 'noopener' }, icone(IC.wa), abriu ? 'Abrir o WhatsApp de novo' : 'Enviar pelo WhatsApp')
               : h('p', { class: 'aviso-env', text: 'O número de WhatsApp da loja ainda não foi configurado neste site.' }),
        h('p', { class: 'pequeno', text: abriu ? 'O WhatsApp abriu com a mensagem pronta. Falta só tocar em enviar.' : 'A mensagem leva os produtos, quantidades, observações e um link com as fotos.' })),
      h('div', { class: 'bloco' }, [h('span', { class: 'rot', text: 'Passo 2: enviar o PDF com as fotos' })].concat(passo2)),
      h('button', { type: 'button', class: 'lnk', onclick: function () { S.itens = []; S.obs = ''; salvar(); atualizarBarra(); fecharFolha(); aviso('Orçamento limpo'); } }, 'Começar um novo orçamento'));
    var aberta = folhaAberta(); S.foco = S.foco || document.activeElement;
    $('#folha-titulo').textContent = 'Orçamento pronto';
    var c = $('#folha-corpo'); c.textContent = ''; c.appendChild(corpo);
    if (!aberta) $('#folha').hidden = false;
  }

  // ---------- início ----------
  function iniciar() {
    $('#loja-nome').textContent = CFG.LOJA_NOME || 'Corte e Cria Decor';
    $('#loja-slogan').textContent = CFG.SLOGAN || '';
    if (CFG.INSTAGRAM) { var a = $('#lnk-insta'); a.href = CFG.INSTAGRAM; a.hidden = false; }
    carregar(); desenharCats(); desenharGrade(); atualizarBarra();
    $('#busca').addEventListener('input', function (e) { S.busca = e.target.value; desenharGrade(); });
    $('#btn-carrinho').addEventListener('click', abrirCarrinho);
    $('#btn-barra').addEventListener('click', abrirCarrinho);
    $('#folha').addEventListener('click', function (e) { if (e.target.closest('[data-fechar]')) fecharFolha(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && folhaAberta()) fecharFolha();
      if (e.key === 'Tab' && folhaAberta()) { // mantém o foco dentro da janela
        var els = $('#folha .folha-caixa').querySelectorAll('button,input,textarea,a[href]'), v = [];
        Array.prototype.forEach.call(els, function (x) { if (!x.disabled && x.offsetParent !== null) v.push(x); });
        if (!v.length) return;
        var pri = v[0], ult = v[v.length - 1];
        if (e.shiftKey && (document.activeElement === pri || document.activeElement === $('#folha .folha-caixa'))) { e.preventDefault(); ult.focus(); }
        else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); pri.focus(); }
      }
    });
  }
  iniciar();
})();
