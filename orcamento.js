/* Página do pedido: mostra o orçamento que o cliente enviou (dados vão no endereço, depois do #). */
(function () {
  'use strict';
  var CFG = window.CONFIG || {}, LISTA = window.PRODUTOS || [], raiz = document.getElementById('ped');
  function h(tag, attrs) {
    var el = document.createElement(tag), i, k, c;
    if (attrs) for (k in attrs) { if (attrs[k] == null) continue; if (k === 'text') el.textContent = attrs[k]; else if (k === 'class') el.className = attrs[k]; else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), attrs[k]); else el.setAttribute(k, attrs[k]); }
    for (i = 2; i < arguments.length; i++) { c = arguments[i]; if (c == null) continue; el.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); }
    return el;
  }
  function porId(id) { for (var i = 0; i < LISTA.length; i++) if (LISTA[i].id === id) return LISTA[i]; return null; }
  function decodificar(hash) {
    var b = hash.replace(/^#/, '').replace(/-/g, '+').replace(/_/g, '/'); while (b.length % 4) b += '=';
    var o = JSON.parse(decodeURIComponent(escape(atob(b))));
    if (!o || !Array.isArray(o.i) || !o.i.length || o.i.length > 100) throw new Error('vazio');
    var q = { numero: String(o.n || '').slice(0, 30), data: String(o.d || '').slice(0, 40), cliente: String(o.c || '').slice(0, 80), obs: String(o.o || '').slice(0, 300), itens: [], faltando: 0 };
    o.i.forEach(function (r) {
      var p = porId(r[0]); var qt = Math.min(999, Math.max(1, parseInt(r[2], 10) || 1));
      if (!p) { q.faltando++; return; }
      q.itens.push({ codigo: p.codigo, cor: String(r[1] || '').slice(0, 30), qtd: qt, pers: String(r[3] || '').slice(0, 60) });
    });
    q.pecas = q.itens.reduce(function (s, i) { return s + i.qtd; }, 0);
    return q;
  }
  function mostrar(q) {
    document.title = 'Pedido ' + q.numero + ' | Corte e Cria Decor';
    raiz.textContent = '';
    raiz.appendChild(h('h1', { text: 'Pedido de orçamento ' + q.numero }));
    raiz.appendChild(h('div', { class: 'meta' }, h('span', null, 'Cliente: ', h('b', { text: q.cliente })), h('span', { text: q.data })));
    q.itens.forEach(function (it, n) {
      var p = LISTA.filter(function (x) { return x.codigo === it.codigo; })[0];
      var dl = h('dl', null,
        h('dt', { text: 'Quantidade' }), h('dd', null, h('span', { class: 'qtd-g', text: String(it.qtd) })),
        h('dt', { text: 'Cor' }), h('dd', { text: it.cor || 'a combinar' }));
      if (it.pers) { dl.appendChild(h('dt', { text: 'Gravar' })); dl.appendChild(h('dd', null, h('span', { class: 'grav', text: it.pers }))); }
      if (p.medidas) { dl.appendChild(h('dt', { text: 'Medidas' })); dl.appendChild(h('dd', { text: p.medidas })); }
      dl.appendChild(h('dt', { text: 'Código' })); dl.appendChild(h('dd', { text: p.codigo }));
      raiz.appendChild(h('article', { class: 'p-item' }, h('img', { src: p.foto, alt: p.nome }), h('div', null, h('h2', { text: (n + 1) + ') ' + p.nome }), dl)));
    });
    if (q.faltando) raiz.appendChild(h('p', { class: 'aviso-env', text: q.faltando + ' item(ns) deste pedido não foram encontrados no catálogo atual. Confira a mensagem do WhatsApp.' }));
    if (q.obs) raiz.appendChild(h('div', { class: 'p-obs' }, h('b', { text: 'Observações: ' }), q.obs));
    raiz.appendChild(h('p', null, h('b', { text: 'Total: ' + q.pecas + (q.pecas === 1 ? ' peça' : ' peças') + ' em ' + q.itens.length + (q.itens.length === 1 ? ' produto' : ' produtos') })));
    var acoes = h('div', { class: 'p-acoes' });
    var btn = h('button', { type: 'button', class: 'btn btn-pri', text: 'Gerar PDF do pedido', onclick: function () {
      btn.disabled = true; btn.textContent = 'Gerando PDF…';
      window.OrcPDF.gerar(q).then(function (bytes) {
        var url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' })), nome = 'orcamento-' + q.numero.toLowerCase() + '.pdf';
        btn.remove();
        acoes.insertBefore(h('a', { class: 'btn btn-pri', href: url, download: nome, text: 'Baixar PDF' }), acoes.firstChild);
        acoes.insertBefore(h('a', { class: 'btn btn-sec', href: url, target: '_blank', rel: 'noopener', text: 'Abrir PDF' }), acoes.children[1]);
      }, function () { btn.disabled = false; btn.textContent = 'Não foi possível gerar o PDF. Tentar de novo'; });
    } });
    acoes.appendChild(btn); acoes.appendChild(h('a', { class: 'btn btn-sec', href: './', text: 'Abrir o catálogo' })); raiz.appendChild(acoes);
  }
  try { mostrar(decodificar(location.hash)); }
  catch (e) {
    raiz.textContent = '';
    raiz.appendChild(h('h1', { text: 'Pedido não encontrado' }));
    raiz.appendChild(h('p', { text: 'O link do pedido está incompleto ou foi alterado. Peça ao cliente para enviar a solicitação de novo pelo catálogo.' }));
    raiz.appendChild(h('a', { class: 'btn btn-pri', href: './', text: 'Abrir o catálogo' }));
  }
})();
