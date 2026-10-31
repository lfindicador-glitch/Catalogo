/* Envia cada pedido do catálogo para o sistema de demandas (Supabase). Se não estiver configurado, não faz nada. */
(function () {
  'use strict';
  var CFG = window.CONFIG || {}, SB = CFG.SUPABASE || {}, FILA = 'cec_fila_demandas';
  function ativo() { return !!(SB.URL && SB.CHAVE_PUBLICA); }
  function base() { return String(SB.URL).replace(/\/+$/, ''); }
  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) { var r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); });
  }
  function produto(codigo) { var L = window.PRODUTOS || []; for (var i = 0; i < L.length; i++) if (L[i].codigo === codigo) return L[i]; return null; }
  function variacao(p, n) { var L = (p && p.variacoes) || []; for (var i = 0; i < L.length; i++) if (L[i].n === n) return L[i]; return null; }
  function textoVar(v) { if (!v) return ''; if (!v.foto && v.nome) return v.nome; return v.n + (v.nome ? ' – ' + v.nome : ''); }
  function montar(q) {
    if (!q.demandaId) q.demandaId = uuid();
    return {
      id: q.demandaId, numero: q.numero, cliente: String(q.cliente || '').slice(0, 80), obs: q.obs ? String(q.obs).slice(0, 300) : null, pecas: q.pecas,
      itens: q.itens.map(function (it) {
        var p = produto(it.codigo) || {}, v = variacao(p, it.vari | 0);
        return { cod: p.cod || p.codigo || it.codigo, nome: p.nome || it.codigo, variacao: textoVar(v), cor: it.cor || '', qtd: it.qtd, pers: it.pers || '', medidas: p.medidas || '', foto: (v && v.foto) || p.foto || '' };
      })
    };
  }
  // Chaves novas do Supabase (sb_publishable_...) não são JWT: vão só no cabeçalho apikey.
  function cabecalho() {
    var h = { apikey: SB.CHAVE_PUBLICA, 'Content-Type': 'application/json', Prefer: 'return=minimal' };
    if (String(SB.CHAVE_PUBLICA).indexOf('sb_') !== 0) h.Authorization = 'Bearer ' + SB.CHAVE_PUBLICA;
    return h;
  }
  function postar(d) {
    var ctl = ('AbortController' in window) ? new AbortController() : null, t = ctl ? setTimeout(function () { ctl.abort(); }, 15000) : null;
    return fetch(base() + '/rest/v1/demandas', {
      method: 'POST', signal: ctl ? ctl.signal : undefined,
      headers: cabecalho(),
      body: JSON.stringify(d)
    }).then(function (r) { if (t) clearTimeout(t); if (r.ok || r.status === 409) return true; throw new Error('http ' + r.status); },
            function (e) { if (t) clearTimeout(t); throw e; });
  }
  function lerFila() { try { var f = JSON.parse(localStorage.getItem(FILA) || '[]'); return Array.isArray(f) ? f : []; } catch (e) { return []; } }
  function gravarFila(f) { try { localStorage.setItem(FILA, JSON.stringify(f.slice(-20))); } catch (e) { /* sem armazenamento */ } }
  function enviar(q) {
    if (!ativo()) return Promise.resolve(false);
    var d = montar(q);
    return postar(d).then(function () { return true; }, function () { var f = lerFila(); f.push(d); gravarFila(f); return false; });
  }
  function reenviarPendentes() {
    if (!ativo()) return Promise.resolve();
    var f = lerFila(); if (!f.length) return Promise.resolve();
    var restantes = [];
    return f.reduce(function (p, d) { return p.then(function () { return postar(d).catch(function () { restantes.push(d); }); }); }, Promise.resolve()).then(function () { gravarFila(restantes); });
  }
  window.Demandas = { ativo: ativo, enviar: enviar, montar: montar, reenviarPendentes: reenviarPendentes };
})();
