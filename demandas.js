/* Painel de demandas (só para a dona da loja). Entra com e-mail e senha do Supabase. */
(function () {
  'use strict';
  var CFG = window.CONFIG || {}, SB = CFG.SUPABASE || {}, raiz = document.getElementById('dem'), SESSAO = 'cec_sessao_demandas';
  var E = { lista: [], tela: 'dash', filtro: 'pendente', busca: '', erro: '',
    perDash: { tipo: '30d' }, per: { tipo: 'todos' }, perEnt: { tipo: 'todos' } };
  var SVG_CAL = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>';

  function h(tag, attrs) {
    var el = document.createElement(tag), i, k, c;
    if (attrs) for (k in attrs) { if (attrs[k] == null) continue; if (k === 'text') el.textContent = attrs[k]; else if (k === 'class') el.className = attrs[k]; else if (k === 'html') el.innerHTML = attrs[k]; else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]); else el.setAttribute(k, attrs[k]); }
    for (i = 2; i < arguments.length; i++) { c = arguments[i]; if (c == null) continue; el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); }
    return el;
  }
  function add(pai, filhos) { filhos.forEach(function (f) { if (f) pai.appendChild(f); }); return pai; }

  /* ---------- Supabase ---------- */
  function base() { return String(SB.URL || '').replace(/\/+$/, ''); }
  function lerSessao() { try { return JSON.parse(localStorage.getItem(SESSAO) || 'null'); } catch (e) { return null; } }
  function gravarSessao(s) { try { if (s) localStorage.setItem(SESSAO, JSON.stringify(s)); else localStorage.removeItem(SESSAO); } catch (e) { /* ok */ } }
  function cab(token) {
    var c = { apikey: SB.CHAVE_PUBLICA, 'Content-Type': 'application/json' };
    if (token) c.Authorization = 'Bearer ' + token; else if (String(SB.CHAVE_PUBLICA).indexOf('sb_') !== 0) c.Authorization = 'Bearer ' + SB.CHAVE_PUBLICA;
    return c;
  }
  function guardar(r) { var s = { access_token: r.access_token, refresh_token: r.refresh_token, expira: Date.now() + (r.expires_in || 3600) * 1000 - 60000 }; gravarSessao(s); return s; }
  function entrar(email, senha) {
    return fetch(base() + '/auth/v1/token?grant_type=password', { method: 'POST', headers: cab(), body: JSON.stringify({ email: email, password: senha }) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.access_token) throw new Error('login'); return guardar(j); }); });
  }
  function renovar(s) {
    return fetch(base() + '/auth/v1/token?grant_type=refresh_token', { method: 'POST', headers: cab(), body: JSON.stringify({ refresh_token: s.refresh_token }) })
      .then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.access_token) throw new Error('sessao'); return guardar(j); }); });
  }
  function sessaoValida() {
    var s = lerSessao(); if (!s) return Promise.reject(new Error('sessao'));
    if (Date.now() < s.expira) return Promise.resolve(s);
    return renovar(s).catch(function (e) { gravarSessao(null); throw e; });
  }
  function api(caminho, opc) {
    return sessaoValida().then(function (s) {
      var o = opc || {}; o.headers = Object.assign(cab(s.access_token), o.headers || {});
      return fetch(base() + '/rest/v1/' + caminho, o).then(function (r) {
        if (r.status === 401 || r.status === 403) { gravarSessao(null); throw new Error('sessao'); }
        if (!r.ok) throw new Error('http ' + r.status);
        return r.status === 204 ? null : r.text().then(function (t) { return t ? JSON.parse(t) : null; });
      });
    });
  }

  /* ---------- datas e períodos ---------- */
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function chave(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function hojeD() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function somaDias(d, n) { var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
  function dePartes(k) { var p = k.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function dataCurta(k) { var p = k.split('-'); return p[2] + '/' + p[1] + '/' + p[0]; }
  function diaMes(k) { var p = k.split('-'); return p[2] + '/' + p[1]; }
  var SEMANA = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  function dataBr(iso) { try { return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return iso || ''; } }
  var PRESETS_PASSADO = [['hoje', 'Hoje'], ['ontem', 'Ontem'], ['7d', 'Últimos 7 dias'], ['30d', 'Últimos 30 dias'], ['mes', 'Este mês'], ['todos', 'Todo o período']];
  var PRESETS_FUTURO = [['hoje', 'Hoje'], ['amanha', 'Amanhã'], ['prox7', 'Próximos 7 dias'], ['prox30', 'Próximos 30 dias'], ['mes', 'Este mês'], ['todos', 'Todo o período']];
  function faixa(p) {
    var h0 = hojeD(), t = p.tipo, de = null, ate = null;
    if (t === 'hoje') { de = ate = h0; }
    else if (t === 'ontem') { de = ate = somaDias(h0, -1); }
    else if (t === 'amanha') { de = ate = somaDias(h0, 1); }
    else if (t === '7d') { de = somaDias(h0, -6); ate = h0; }
    else if (t === '30d') { de = somaDias(h0, -29); ate = h0; }
    else if (t === 'prox7') { de = h0; ate = somaDias(h0, 6); }
    else if (t === 'prox30') { de = h0; ate = somaDias(h0, 29); }
    else if (t === 'mes') { de = new Date(h0.getFullYear(), h0.getMonth(), 1); ate = new Date(h0.getFullYear(), h0.getMonth() + 1, 0); }
    else if (t === 'custom') return { de: p.de || null, ate: p.ate || null };
    return { de: de ? chave(de) : null, ate: ate ? chave(ate) : null };
  }
  function dentro(k, f) { if (!k) return false; if (f.de && k < f.de) return false; if (f.ate && k > f.ate) return false; return true; }
  function rotuloPeriodo(p, presets) {
    if (p.tipo === 'custom') { var f = faixa(p); return (f.de ? dataCurta(f.de) : '…') + ' a ' + (f.ate ? dataCurta(f.ate) : '…'); }
    for (var i = 0; i < presets.length; i++) if (presets[i][0] === p.tipo) return presets[i][1];
    return 'Todo o período';
  }
  /* Botão com ícone de calendário + painel com atalhos e datas livres */
  function seletorPeriodo(p, presets, aoMudar) {
    var painel = h('div', { class: 'per-painel', hidden: true });
    var btn = h('button', { type: 'button', class: 'per-btn', 'aria-expanded': 'false', 'aria-label': 'Filtrar por período: ' + rotuloPeriodo(p, presets), onclick: function () {
      painel.hidden = !painel.hidden; btn.setAttribute('aria-expanded', String(!painel.hidden));
    } });
    btn.innerHTML = SVG_CAL; btn.appendChild(h('span', { text: rotuloPeriodo(p, presets) })); btn.appendChild(h('span', { class: 'seta', text: '▾', 'aria-hidden': 'true' }));
    var chips = h('div', { class: 'per-chips' });
    presets.forEach(function (o) { chips.appendChild(h('button', { type: 'button', class: 'per-chip', 'aria-pressed': String(p.tipo === o[0]), text: o[1], onclick: function () { p.tipo = o[0]; aoMudar(); } })); });
    var fa = faixa(p.tipo === 'custom' ? p : { tipo: 'custom', de: '', ate: '' });
    var de = h('input', { class: 'campo', type: 'date', id: 'per-de-' + (presets === PRESETS_FUTURO ? 'f' : 'p'), value: p.tipo === 'custom' && fa.de ? fa.de : '' });
    var ate = h('input', { class: 'campo', type: 'date', id: 'per-ate-' + (presets === PRESETS_FUTURO ? 'f' : 'p'), value: p.tipo === 'custom' && fa.ate ? fa.ate : '' });
    var aviso = h('p', { class: 'pequeno per-aviso', hidden: true, text: 'Escolha pelo menos uma das datas.' });
    var aplicar = h('button', { type: 'button', class: 'btn btn-pri', text: 'Aplicar', onclick: function () {
      if (!de.value && !ate.value) { aviso.hidden = false; return; }
      var a = de.value, b = ate.value; if (a && b && a > b) { var t = a; a = b; b = t; }
      p.tipo = 'custom'; p.de = a; p.ate = b; aoMudar();
    } });
    add(painel, [chips, h('div', { class: 'per-custom' }, h('label', { for: de.id, text: 'De' }), de, h('label', { for: ate.id, text: 'Até' }), ate, aplicar), aviso]);
    return h('div', { class: 'per' }, btn, painel);
  }

  /* ---------- dados ---------- */
  function rotuloStatus(d) {
    if (d.status === 'aprovado') return 'Aprovado' + (d.pagamento ? ' · ' + d.pagamento + '% pago' : ' · aguardando pagamento');
    return d.status === 'reprovado' ? 'Reprovado' : 'Pendente';
  }
  function diaDe(d) { return chave(new Date(d.criado_em)); }
  function erroSalvar(e) {
    if (e.message === 'sessao') { telaLogin(); return; }
    E.erro = (e.message === 'http 400') ? 'O banco ainda não tem os campos novos. Rode o arquivo supabase_atualizacao_1.sql no SQL Editor do Supabase (veja o LEIA-ME).' : 'Não foi possível salvar agora. Confira a internet e tente de novo.';
    desenhar();
  }
  function patch(d, campos) {
    campos.atualizado_em = new Date().toISOString();
    return api('demandas?id=eq.' + encodeURIComponent(d.id), { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify(campos) })
      .then(function (r) { if (r && r[0]) Object.assign(d, r[0]); else Object.assign(d, campos); E.erro = ''; });
  }
  function mudar(d, campos) { return patch(d, campos).then(desenhar, erroSalvar); }

  /* ---------- cartão de demanda ---------- */
  function cartao(d) {
    var itens = h('ul', { class: 'dm-itens' });
    (d.itens || []).forEach(function (i) {
      itens.appendChild(h('li', { class: 'dm-item' },
        i.foto ? h('img', { src: i.foto, alt: '', loading: 'lazy' }) : h('span'),
        h('div', null,
          h('b', { text: i.qtd + '× ' + i.nome }),
          i.variacao ? h('span', { text: 'Variação: ' + i.variacao }) : null,
          h('span', { text: 'Cor: ' + (i.cor || 'a combinar') + (i.cod ? ' · ' + i.cod : '') }),
          i.pers ? h('span', { class: 'grav', text: 'Gravar: ' + i.pers }) : null,
          i.medidas ? h('span', { text: 'Medidas: ' + i.medidas }) : null)));
    });
    var acoes = h('div', { class: 'dm-acoes' });
    if (d.status !== 'aprovado') acoes.appendChild(h('button', { type: 'button', class: 'btn btn-ok', text: 'Aprovar', onclick: function () { mudar(d, { status: 'aprovado', pagamento: null }); } }));
    if (d.status !== 'reprovado') acoes.appendChild(h('button', { type: 'button', class: 'btn btn-no', text: 'Reprovar', onclick: function () { mudar(d, { status: 'reprovado', pagamento: null }); } }));
    if (d.status !== 'pendente') acoes.appendChild(h('button', { type: 'button', class: 'btn btn-sec', text: 'Voltar para pendente', onclick: function () { mudar(d, { status: 'pendente', pagamento: null }); } }));
    var pag = null;
    if (d.status === 'aprovado') {
      var op = h('div', { class: 'pag-op' });
      [[null, 'Ainda não pago'], ['50', '50% pago'], ['100', '100% pago']].forEach(function (o) {
        op.appendChild(h('button', { type: 'button', 'aria-pressed': String((d.pagamento || null) === o[0]), text: o[1], onclick: function () { mudar(d, { pagamento: o[0] }); } }));
      });
      pag = h('div', { class: 'pag' }, h('span', { class: 'rot', text: 'Pagamento' }), op);
    }
    /* previsão de entrega (opcional) */
    var entrega = h('input', { class: 'campo', type: 'date', id: 'ent-' + d.id, value: d.entrega_prevista || '', 'aria-label': 'Previsão de entrega' });
    entrega.addEventListener('change', function () { mudar(d, { entrega_prevista: entrega.value || null }); });
    var blocoEnt = h('div', { class: 'bloco-ent' }, h('label', { for: entrega.id, class: 'rot', text: 'Previsão de entrega (opcional)' }),
      h('div', { class: 'ent-linha' }, entrega, d.entrega_prevista ? h('button', { type: 'button', class: 'btn btn-sec', text: 'Limpar', onclick: function () { mudar(d, { entrega_prevista: null }); } }) : null));
    /* observações combinadas depois com o cliente */
    var nota = h('textarea', { class: 'campo', id: 'nota-' + d.id, maxlength: 1000, rows: 3, placeholder: 'Ex.: cliente pediu para mudar a cor; combinado entrega no sábado…' });
    nota.value = d.obs_combinadas || '';
    var aviso = h('span', { class: 'salvo', role: 'status' });
    var salvarNota = h('button', { type: 'button', class: 'btn btn-sec', text: 'Salvar observações', onclick: function () {
      salvarNota.disabled = true; aviso.textContent = 'Salvando…';
      patch(d, { obs_combinadas: nota.value.trim() || null }).then(function () { salvarNota.disabled = false; aviso.textContent = 'Salvo ✓'; }, function (e) { salvarNota.disabled = false; aviso.textContent = ''; erroSalvar(e); });
    } });
    nota.addEventListener('input', function () { aviso.textContent = ''; });
    var blocoNota = h('div', { class: 'bloco-nota' }, h('label', { for: nota.id, class: 'rot', text: 'Combinado com o cliente (suas observações)' }), nota, h('div', { class: 'nota-linha' }, salvarNota, aviso));

    var hoje = chave(hojeD()), atraso = d.entrega_prevista && d.entrega_prevista < hoje && d.status !== 'reprovado';
    return h('article', { class: 'dm ' + d.status },
      h('div', { class: 'dm-topo' },
        h('div', null, h('div', { class: 'dm-cliente', text: d.cliente }), h('div', { class: 'dm-meta', text: 'Solicitado em ' + dataBr(d.criado_em) + (d.numero ? ' · ' + d.numero : '') })),
        h('div', { class: 'dm-selos' }, h('span', { class: 'selo ' + d.status, text: rotuloStatus(d) }),
          d.entrega_prevista ? h('span', { class: 'selo entrega' + (atraso ? ' atraso' : ''), text: 'Entrega ' + dataCurta(d.entrega_prevista) + (atraso ? ' · atrasada' : '') }) : null)),
      itens,
      d.obs ? h('div', { class: 'dm-obs' }, h('b', { text: 'Observação do cliente: ' }), d.obs) : null,
      blocoNota, blocoEnt, acoes, pag,
      h('button', { type: 'button', class: 'link-mini', text: 'Excluir esta demanda', onclick: function () {
        if (!confirm('Excluir a demanda de ' + d.cliente + '? Isso não pode ser desfeito.')) return;
        api('demandas?id=eq.' + encodeURIComponent(d.id), { method: 'DELETE' }).then(function () { E.lista = E.lista.filter(function (x) { return x.id !== d.id; }); desenhar(); }, function () { E.erro = 'Não foi possível excluir agora.'; desenhar(); });
      } }));
  }

  /* ---------- telas ---------- */
  function navegacao() {
    var nav = h('nav', { class: 'nav', 'aria-label': 'Telas' });
    [['dash', 'Dashboard'], ['dem', 'Demandas'], ['ent', 'Entregas']].forEach(function (t) {
      nav.appendChild(h('button', { type: 'button', class: 'nav-btn', 'aria-current': E.tela === t[0] ? 'page' : null, text: t[1], onclick: function () { E.tela = t[0]; desenhar(); } }));
    });
    return nav;
  }
  function contagemDem(st, f) { return E.lista.filter(function (d) { return (st === 'todos' || d.status === st) && dentro(diaDe(d), f); }).length; }

  function telaDemandas() {
    var f = faixa(E.per);
    var abas = h('div', { class: 'abas', role: 'group', 'aria-label': 'Filtrar por situação' });
    [['pendente', 'Pendentes'], ['aprovado', 'Aprovados'], ['reprovado', 'Reprovados'], ['todos', 'Todos']].forEach(function (a) {
      abas.appendChild(h('button', { type: 'button', class: 'aba', 'data-f': a[0], 'aria-pressed': String(E.filtro === a[0]), onclick: function () { E.filtro = a[0]; desenhar(); } }, a[1], h('span', { class: 'n', text: String(contagemDem(a[0], f)) })));
    });
    var busca = h('input', { class: 'campo', type: 'search', placeholder: 'Buscar por cliente, número ou produto', value: E.busca, 'aria-label': 'Buscar' });
    busca.addEventListener('input', function () { E.busca = busca.value; desenharLista(); });
    var barra = h('div', { class: 'barra-filtros' }, seletorPeriodo(E.per, PRESETS_PASSADO, desenhar), busca);
    return add(h('div', { class: 'tela' }), [h('h1', { text: 'Demandas' }), abas, barra, h('div', { class: 'lista-dem', id: 'lista-dem' })]);
  }
  function desenharLista() {
    var alvo = document.getElementById('lista-dem'); if (!alvo) return; alvo.textContent = '';
    var f = faixa(E.per), q = E.busca.trim().toLowerCase();
    var v = E.lista.filter(function (d) {
      if (E.filtro !== 'todos' && d.status !== E.filtro) return false;
      if (!dentro(diaDe(d), f)) return false;
      if (!q) return true;
      var tx = (d.cliente + ' ' + (d.numero || '') + ' ' + (d.obs || '') + ' ' + (d.obs_combinadas || '') + ' ' + (d.itens || []).map(function (i) { return i.nome + ' ' + (i.cod || '') + ' ' + (i.variacao || ''); }).join(' ')).toLowerCase();
      return tx.indexOf(q) >= 0;
    });
    if (!v.length) { alvo.appendChild(h('p', { class: 'vazio', text: E.lista.length ? 'Nenhuma demanda nesta situação e período.' : 'Ainda não chegou nenhuma demanda.' })); return; }
    v.forEach(function (d) { alvo.appendChild(cartao(d)); });
  }

  function telaEntregas() {
    var f = faixa(E.perEnt), hoje = chave(hojeD());
    var com = E.lista.filter(function (d) { return d.entrega_prevista && d.status !== 'reprovado'; });
    var v = com.filter(function (d) { return dentro(d.entrega_prevista, f); }).sort(function (a, b) { return a.entrega_prevista < b.entrega_prevista ? -1 : a.entrega_prevista > b.entrega_prevista ? 1 : (a.criado_em < b.criado_em ? -1 : 1); });
    var amanha = chave(somaDias(hojeD(), 1)), t = h('div', { class: 'tela' });
    add(t, [h('h1', { text: 'Entregas previstas' }), h('p', { class: 'pequeno', text: 'Pedidos com data de entrega informada (não mostra os reprovados).' }),
      h('div', { class: 'barra-filtros' }, seletorPeriodo(E.perEnt, PRESETS_FUTURO, desenhar))]);
    var atrasadas = com.filter(function (d) { return d.entrega_prevista < hoje; }).length, hojeN = com.filter(function (d) { return d.entrega_prevista === hoje; }).length;
    add(t, [h('div', { class: 'kpis kpis-peq' },
      h('div', { class: 'kpi' + (atrasadas ? ' alerta' : '') }, h('span', { class: 'kpi-n', text: String(atrasadas) }), h('span', { class: 'kpi-r', text: 'Atrasadas' })),
      h('div', { class: 'kpi' }, h('span', { class: 'kpi-n', text: String(hojeN) }), h('span', { class: 'kpi-r', text: 'Para hoje' })),
      h('div', { class: 'kpi' }, h('span', { class: 'kpi-n', text: String(v.length) }), h('span', { class: 'kpi-r', text: 'No período' })))]);
    if (!v.length) { t.appendChild(h('p', { class: 'vazio', text: com.length ? 'Nenhuma entrega neste período.' : 'Nenhum pedido tem data de entrega ainda. Preencha a “Previsão de entrega” dentro da demanda.' })); return t; }
    var atual = null;
    v.forEach(function (d) {
      if (d.entrega_prevista !== atual) {
        atual = d.entrega_prevista; var dia = dePartes(atual), rot = SEMANA[dia.getDay()] + ', ' + dataCurta(atual);
        if (atual === hoje) rot = 'Hoje · ' + rot; else if (atual === amanha) rot = 'Amanhã · ' + rot; else if (atual < hoje) rot = 'Atrasada · ' + rot;
        t.appendChild(h('h2', { class: 'grupo-data' + (atual < hoje ? ' atraso' : ''), text: rot }));
      }
      t.appendChild(cartao(d));
    });
    return t;
  }

  function telaDashboard() {
    var f = faixa(E.perDash), t = h('div', { class: 'tela' }), hoje = chave(hojeD());
    var v = E.lista.filter(function (d) { return dentro(diaDe(d), f); });
    var n = function (st) { return v.filter(function (d) { return d.status === st; }).length; };
    var pend = n('pendente'), apr = n('aprovado'), rep = n('reprovado');
    var decididos = apr + rep, taxa = decididos ? Math.round(apr * 100 / decididos) + '%' : '—';
    var aprov = v.filter(function (d) { return d.status === 'aprovado'; });
    var semPag = aprov.filter(function (d) { return !d.pagamento; }).length, p50 = aprov.filter(function (d) { return d.pagamento === '50'; }).length, p100 = aprov.filter(function (d) { return d.pagamento === '100'; }).length;
    var pecas = v.reduce(function (s, d) { return s + (d.pecas || 0); }, 0);
    var entAtr = E.lista.filter(function (d) { return d.entrega_prevista && d.entrega_prevista < hoje && d.status === 'aprovado'; }).length;
    var entProx = E.lista.filter(function (d) { return d.entrega_prevista && d.entrega_prevista >= hoje && d.entrega_prevista <= chave(somaDias(hojeD(), 6)) && d.status !== 'reprovado'; }).length;
    function kpi(num, rot, cls) { return h('div', { class: 'kpi' + (cls ? ' ' + cls : '') }, h('span', { class: 'kpi-n', text: String(num) }), h('span', { class: 'kpi-r', text: rot })); }

    add(t, [h('h1', { text: 'Dashboard' }), h('div', { class: 'barra-filtros' }, seletorPeriodo(E.perDash, PRESETS_PASSADO, desenhar)),
      h('div', { class: 'kpis' }, kpi(v.length, 'Pedidos no período'), kpi(pend, 'Pendentes', 'k-pend'), kpi(apr, 'Aprovados', 'k-apr'), kpi(rep, 'Reprovados', 'k-rep'),
        kpi(taxa, 'Taxa de aprovação'), kpi(pecas, 'Peças pedidas'))]);

    /* pagamento e entregas */
    add(t, [h('h2', { class: 'sec', text: 'Aprovados: pagamento' }),
      h('div', { class: 'kpis kpis-peq' }, kpi(semPag, 'Aguardando pagamento', semPag ? 'alerta' : ''), kpi(p50, '50% pago'), kpi(p100, '100% pago')),
      h('h2', { class: 'sec', text: 'Entregas' }),
      h('div', { class: 'kpis kpis-peq' }, kpi(entAtr, 'Aprovados com entrega atrasada', entAtr ? 'alerta' : ''), kpi(entProx, 'Entregas nos próximos 7 dias'))]);

    /* pedidos por dia */
    var ini = f.de, fim = f.ate || hoje;
    if (!ini) { ini = v.length ? v.reduce(function (m, d) { var k = diaDe(d); return k < m ? k : m; }, hoje) : hoje; }
    if (fim > hoje) fim = hoje;
    var dias = [], cur = dePartes(ini), ult = dePartes(fim);
    while (cur <= ult && dias.length < 400) { dias.push(chave(cur)); cur = somaDias(cur, 1); }
    var cortou = false; if (dias.length > 45) { dias = dias.slice(-45); cortou = true; }
    var por = {}; dias.forEach(function (k) { por[k] = { pendente: 0, aprovado: 0, reprovado: 0 }; });
    v.forEach(function (d) { var k = diaDe(d); if (por[k]) por[k][d.status]++; });
    var max = 1; dias.forEach(function (k) { var s = por[k].pendente + por[k].aprovado + por[k].reprovado; if (s > max) max = s; });
    var graf, barras = h('div', { class: 'grafico', role: 'img', 'aria-label': 'Pedidos por dia: ' + v.length + ' no período' });
    dias.forEach(function (k) {
      var c = por[k], tot = c.pendente + c.aprovado + c.reprovado;
      var col = h('div', { class: 'col', title: dataCurta(k) + ': ' + tot + ' pedido(s) — ' + c.pendente + ' pendente(s), ' + c.aprovado + ' aprovado(s), ' + c.reprovado + ' reprovado(s)' });
      var pilha = h('div', { class: 'pilha-b', style: 'height:' + Math.round(tot * 100 / max) + '%' });
      [['reprovado', c.reprovado], ['aprovado', c.aprovado], ['pendente', c.pendente]].forEach(function (s) { if (s[1]) pilha.appendChild(h('i', { class: 'b-' + s[0], style: 'flex:' + s[1] })); });
      col.appendChild(h('span', { class: 'b-n', text: tot ? String(tot) : '' })); col.appendChild(h('div', { class: 'area' }, pilha)); col.appendChild(h('span', { class: 'b-d', text: diaMes(k) }));
      barras.appendChild(col);
    });
    add(t, [h('h2', { class: 'sec', text: 'Pedidos por dia' }),
      (graf = h('div', { class: 'graf-caixa' }, barras)),
      h('p', { class: 'legenda' }, h('span', { class: 'lg b-pendente', text: 'Pendente' }), h('span', { class: 'lg b-aprovado', text: 'Aprovado' }), h('span', { class: 'lg b-reprovado', text: 'Reprovado' })),
      cortou ? h('p', { class: 'pequeno', text: 'O gráfico mostra os últimos 45 dias do período.' }) : null]);

    setTimeout(function () { if (graf) graf.scrollLeft = graf.scrollWidth; }, 0);

    /* produtos mais pedidos */
    var cont = {}; v.forEach(function (d) { (d.itens || []).forEach(function (i) { var k = (i.cod || '') + '|' + i.nome; if (!cont[k]) cont[k] = { nome: i.nome, cod: i.cod, qtd: 0 }; cont[k].qtd += i.qtd || 0; }); });
    var top = Object.keys(cont).map(function (k) { return cont[k]; }).sort(function (a, b) { return b.qtd - a.qtd; }).slice(0, 6);
    var lista = h('ol', { class: 'ranking' });
    top.forEach(function (p) { lista.appendChild(h('li', null, h('span', { class: 'r-nome', text: (p.cod ? p.cod + ' · ' : '') + p.nome }), h('b', { text: p.qtd + (p.qtd === 1 ? ' peça' : ' peças') }))); });
    add(t, [h('h2', { class: 'sec', text: 'Produtos mais pedidos' }), top.length ? lista : h('p', { class: 'vazio', text: 'Nenhum pedido neste período.' })]);

    /* pendentes mais antigos */
    var antigos = E.lista.filter(function (d) { return d.status === 'pendente'; }).sort(function (a, b) { return a.criado_em < b.criado_em ? -1 : 1; }).slice(0, 5);
    if (antigos.length) {
      var la = h('ul', { class: 'ranking' });
      antigos.forEach(function (d) { la.appendChild(h('li', null, h('span', { class: 'r-nome', text: d.cliente + ' · ' + dataBr(d.criado_em) }), h('button', { type: 'button', class: 'link-mini', text: 'Abrir', onclick: function () { E.tela = 'dem'; E.filtro = 'pendente'; E.per = { tipo: 'todos' }; E.busca = d.cliente; desenhar(); } }))); });
      add(t, [h('h2', { class: 'sec', text: 'Pendentes há mais tempo' }), la]);
    }
    return t;
  }

  function desenhar() {
    raiz.textContent = '';
    raiz.appendChild(navegacao());
    if (E.erro) raiz.appendChild(h('div', { class: 'msg-dem', role: 'alert', text: E.erro }));
    raiz.appendChild(E.tela === 'dash' ? telaDashboard() : E.tela === 'ent' ? telaEntregas() : telaDemandas());
    if (E.tela === 'dem') desenharLista();
  }

  function carregar() {
    return api('demandas?select=*&order=criado_em.desc&limit=1000').then(function (l) { E.lista = l || []; E.erro = ''; desenhar(); },
      function (e) { if (e.message === 'sessao') return telaLogin(); E.erro = 'Não foi possível carregar as demandas. Confira a internet e toque em Atualizar.'; desenhar(); });
  }
  function telaLogin(msg) {
    document.getElementById('acoes-topo').hidden = true;
    var email = h('input', { class: 'campo', id: 'f-email', type: 'email', autocomplete: 'username', required: 'required' });
    var senha = h('input', { class: 'campo', id: 'f-senha', type: 'password', autocomplete: 'current-password', required: 'required' });
    var erro = h('p', { class: 'msg-dem', role: 'alert', hidden: true });
    var btn = h('button', { type: 'submit', class: 'btn btn-pri btn-grande', text: 'Entrar' });
    var f = h('form', { class: 'login' }, h('h1', { text: 'Entrar nas demandas' }),
      h('label', { for: 'f-email', text: 'E-mail' }), email, h('label', { for: 'f-senha', text: 'Senha' }), senha, erro, btn);
    if (msg) { erro.textContent = msg; erro.hidden = false; }
    f.addEventListener('submit', function (ev) {
      ev.preventDefault(); btn.disabled = true; erro.hidden = true;
      entrar(email.value.trim(), senha.value).then(iniciar, function () { btn.disabled = false; erro.textContent = 'E-mail ou senha incorretos.'; erro.hidden = false; });
    });
    raiz.textContent = ''; raiz.appendChild(f); email.focus();
  }
  function iniciar() {
    document.getElementById('acoes-topo').hidden = false; raiz.textContent = ''; raiz.appendChild(h('p', { class: 'pequeno', text: 'Carregando demandas…' }));
    return carregar();
  }

  document.getElementById('b-atualizar').addEventListener('click', function () { carregar(); });
  document.getElementById('b-sair').addEventListener('click', function () { gravarSessao(null); telaLogin(); });
  setInterval(function () {
    var a = document.activeElement; if (a && (a.tagName === 'TEXTAREA' || a.tagName === 'INPUT')) return;
    if (!document.hidden && lerSessao() && document.querySelector('.nav')) carregar();
  }, 60000);

  if (!SB.URL || !SB.CHAVE_PUBLICA) {
    raiz.textContent = '';
    raiz.appendChild(h('div', { class: 'login' }, h('h1', { text: 'Falta configurar o sistema' }),
      h('p', { text: 'Preencha SUPABASE.URL e SUPABASE.CHAVE_PUBLICA no arquivo config.js. O passo a passo está no arquivo COMO_CONFIGURAR_DEMANDAS.md.' })));
  } else if (lerSessao()) iniciar(); else telaLogin();
})();
