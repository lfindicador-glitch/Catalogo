/* Painel de demandas (só para a dona da loja). Entra com e-mail e senha do Supabase. */
(function () {
  'use strict';
  var CFG = window.CONFIG || {}, SB = CFG.SUPABASE || {}, raiz = document.getElementById('dem'), SESSAO = 'cec_sessao_demandas';
  var E = { lista: [], filtro: 'pendente', busca: '', erro: '' };
  function h(tag, attrs) {
    var el = document.createElement(tag), i, k, c;
    if (attrs) for (k in attrs) { if (attrs[k] == null) continue; if (k === 'text') el.textContent = attrs[k]; else if (k === 'class') el.className = attrs[k]; else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]); else el.setAttribute(k, attrs[k]); }
    for (i = 2; i < arguments.length; i++) { c = arguments[i]; if (c == null) continue; el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); }
    return el;
  }
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

  function dataBr(iso) { try { return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch (e) { return iso || ''; } }
  function rotuloStatus(d) {
    if (d.status === 'aprovado') return 'Aprovado' + (d.pagamento ? ' · ' + d.pagamento + '% pago' : ' · aguardando pagamento');
    return d.status === 'reprovado' ? 'Reprovado' : 'Pendente';
  }
  function contagem(st) { return E.lista.filter(function (d) { return st === 'todos' || d.status === st; }).length; }
  function visiveis() {
    var q = E.busca.trim().toLowerCase();
    return E.lista.filter(function (d) {
      if (E.filtro !== 'todos' && d.status !== E.filtro) return false;
      if (!q) return true;
      var tx = (d.cliente + ' ' + (d.numero || '') + ' ' + (d.itens || []).map(function (i) { return i.nome + ' ' + (i.cod || '') + ' ' + (i.variacao || ''); }).join(' ')).toLowerCase();
      return tx.indexOf(q) >= 0;
    });
  }

  function mudar(d, campos) {
    campos.atualizado_em = new Date().toISOString();
    return api('demandas?id=eq.' + encodeURIComponent(d.id), { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify(campos) })
      .then(function (r) { if (r && r[0]) Object.assign(d, r[0]); else Object.assign(d, campos); E.erro = ''; desenhar(); },
            function (e) { if (e.message === 'sessao') return telaLogin(); E.erro = 'Não foi possível salvar agora. Confira a internet e tente de novo.'; desenhar(); });
  }

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
    return h('article', { class: 'dm ' + d.status },
      h('div', { class: 'dm-topo' },
        h('div', null, h('div', { class: 'dm-cliente', text: d.cliente }), h('div', { class: 'dm-meta', text: 'Solicitado em ' + dataBr(d.criado_em) + (d.numero ? ' · ' + d.numero : '') })),
        h('span', { class: 'selo ' + d.status, text: rotuloStatus(d) })),
      itens,
      d.obs ? h('div', { class: 'dm-obs' }, h('b', { text: 'Observações: ' }), d.obs) : null,
      acoes, pag,
      h('button', { type: 'button', class: 'link-mini', text: 'Excluir esta demanda', onclick: function () {
        if (!confirm('Excluir a demanda de ' + d.cliente + '? Isso não pode ser desfeito.')) return;
        api('demandas?id=eq.' + encodeURIComponent(d.id), { method: 'DELETE' }).then(function () { E.lista = E.lista.filter(function (x) { return x.id !== d.id; }); desenhar(); }, function () { E.erro = 'Não foi possível excluir agora.'; desenhar(); });
      } }));
  }

  function desenhar() {
    var busca = h('input', { class: 'campo', type: 'search', placeholder: 'Buscar por cliente, número ou produto', value: E.busca, 'aria-label': 'Buscar' });
    busca.addEventListener('input', function () { E.busca = busca.value; var pos = busca.selectionStart; desenharLista(); });
    var abas = h('div', { class: 'abas', role: 'group', 'aria-label': 'Filtrar por situação' });
    [['pendente', 'Pendentes'], ['aprovado', 'Aprovados'], ['reprovado', 'Reprovados'], ['todos', 'Todos']].forEach(function (a) {
      abas.appendChild(h('button', { type: 'button', class: 'aba', 'data-f': a[0], 'aria-pressed': String(E.filtro === a[0]), onclick: function () { E.filtro = a[0]; desenhar(); } }, a[1], h('span', { class: 'n', text: String(contagem(a[0])) })));
    });
    raiz.textContent = '';
    raiz.appendChild(h('h1', { text: 'Demandas' }));
    if (E.erro) raiz.appendChild(h('div', { class: 'msg-dem', role: 'alert', text: E.erro }));
    raiz.appendChild(abas); raiz.appendChild(busca);
    raiz.appendChild(h('div', { class: 'lista-dem', id: 'lista-dem' }));
    desenharLista();
  }
  function desenharLista() {
    var alvo = document.getElementById('lista-dem'); if (!alvo) return; alvo.textContent = '';
    var v = visiveis();
    if (!v.length) { alvo.appendChild(h('p', { class: 'vazio', text: E.lista.length ? 'Nenhuma demanda nesta situação.' : 'Ainda não chegou nenhuma demanda.' })); return; }
    v.forEach(function (d) { alvo.appendChild(cartao(d)); });
  }

  function carregar() {
    return api('demandas?select=*&order=criado_em.desc&limit=500').then(function (l) { E.lista = l || []; E.erro = ''; desenhar(); },
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
  setInterval(function () { if (!document.hidden && lerSessao() && document.getElementById('lista-dem')) carregar(); }, 60000);

  if (!SB.URL || !SB.CHAVE_PUBLICA) {
    raiz.textContent = '';
    raiz.appendChild(h('div', { class: 'login' }, h('h1', { text: 'Falta configurar o sistema' }),
      h('p', { text: 'Preencha SUPABASE.URL e SUPABASE.CHAVE_PUBLICA no arquivo config.js. O passo a passo está no arquivo COMO_CONFIGURAR_DEMANDAS.md.' })));
  } else if (lerSessao()) iniciar(); else telaLogin();
})();
