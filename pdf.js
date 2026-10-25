/* Gerador de PDF mínimo (sem bibliotecas externas).
   Texto em Helvetica (acentos do português) e imagens JPEG. Página A4. */
(function () {
  'use strict';
  var W = 595.28, H = 841.89;
  // larguras da Helvetica (unidades de 1/1000 do corpo) para os caracteres ASCII 32..126
  var LW = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,
    1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,
    333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
  var BASE = {};
  'ÀÁÂÃÄÅàáâãäå'.split('').forEach(function (c, i) { BASE[c] = i < 6 ? 'A' : 'a'; });
  'ÈÉÊËèéêë'.split('').forEach(function (c, i) { BASE[c] = i < 4 ? 'E' : 'e'; });
  'ÌÍÎÏìíîï'.split('').forEach(function (c, i) { BASE[c] = i < 4 ? 'I' : 'i'; });
  'ÒÓÔÕÖòóôõö'.split('').forEach(function (c, i) { BASE[c] = i < 5 ? 'O' : 'o'; });
  'ÙÚÛÜùúûü'.split('').forEach(function (c, i) { BASE[c] = i < 4 ? 'U' : 'u'; });
  BASE['Ç'] = 'C'; BASE['ç'] = 'c'; BASE['Ñ'] = 'N'; BASE['ñ'] = 'n';
  var WIN = { '–': 150, '—': 151, '‘': 145, '’': 146, '“': 147, '”': 148, '•': 149, '…': 133, '€': 128 };

  function code(ch) {
    var c = ch.charCodeAt(0);
    if (c < 256) return c < 32 ? 32 : c;
    return WIN[ch] || 63;
  }
  function charW(ch) {
    var b = BASE[ch] || ch, c = b.charCodeAt(0);
    if (c >= 32 && c <= 126) return LW[c - 32];
    return WIN[ch] ? 556 : 556;
  }
  function textW(s, size, bold) {
    var t = 0; for (var i = 0; i < s.length; i++) t += charW(s[i]);
    return t * size / 1000 * (bold ? 1.07 : 1);
  }
  function wrap(s, size, bold, maxW) {
    var words = String(s).replace(/\s+/g, ' ').trim().split(' '), lines = [], cur = '';
    words.forEach(function (w) {
      var t = cur ? cur + ' ' + w : w;
      if (textW(t, size, bold) <= maxW) { cur = t; return; }
      if (cur) lines.push(cur);
      while (textW(w, size, bold) > maxW && w.length > 1) { // palavra muito longa
        var k = w.length; while (k > 1 && textW(w.slice(0, k), size, bold) > maxW) k--;
        lines.push(w.slice(0, k)); w = w.slice(k);
      }
      cur = w;
    });
    if (cur) lines.push(cur);
    return lines;
  }
  function esc(s) {
    var o = '';
    for (var i = 0; i < s.length; i++) {
      var c = code(s[i]);
      if (c === 40 || c === 41 || c === 92) o += '\\' + String.fromCharCode(c);
      else if (c > 126 || c < 32) o += '\\' + ('00' + c.toString(8)).slice(-3);
      else o += String.fromCharCode(c);
    }
    return o;
  }
  function f(n) { return (Math.round(n * 100) / 100).toString(); }

  function Doc() { this.pages = []; this.images = []; this.cur = null; this.newPage(); }
  Doc.prototype.newPage = function () { this.cur = []; this.pages.push(this.cur); };
  Doc.prototype.rect = function (x, y, w, h, rgb) {
    this.cur.push(f(rgb[0] / 255) + ' ' + f(rgb[1] / 255) + ' ' + f(rgb[2] / 255) + ' rg ' + f(x) + ' ' + f(H - y - h) + ' ' + f(w) + ' ' + f(h) + ' re f');
  };
  Doc.prototype.line = function (x1, y, x2, rgb, wd) {
    this.cur.push(f(rgb[0] / 255) + ' ' + f(rgb[1] / 255) + ' ' + f(rgb[2] / 255) + ' RG ' + f(wd || 0.6) + ' w ' + f(x1) + ' ' + f(H - y) + ' m ' + f(x2) + ' ' + f(H - y) + ' l S');
  };
  // y = linha de base, medida a partir do topo da página
  Doc.prototype.text = function (x, y, s, size, bold, rgb) {
    rgb = rgb || [34, 34, 34];
    this.cur.push('BT /' + (bold ? 'F2' : 'F1') + ' ' + f(size) + ' Tf ' + f(rgb[0] / 255) + ' ' + f(rgb[1] / 255) + ' ' + f(rgb[2] / 255) + ' rg ' + f(x) + ' ' + f(H - y) + ' Td (' + esc(String(s)) + ') Tj ET');
  };
  // jpegBytes: Uint8Array; pw/ph em pixels
  Doc.prototype.addImage = function (jpegBytes, pw, ph) { this.images.push({ bytes: jpegBytes, w: pw, h: ph }); return this.images.length - 1; };
  Doc.prototype.image = function (idx, x, y, w, h) {
    this.cur.push('q ' + f(w) + ' 0 0 ' + f(h) + ' ' + f(x) + ' ' + f(H - y - h) + ' cm /Im' + idx + ' Do Q');
  };

  function strBytes(s) { var a = new Uint8Array(s.length); for (var i = 0; i < s.length; i++) a[i] = s.charCodeAt(i) & 255; return a; }

  Doc.prototype.build = function () {
    var parts = [], len = 0, offs = [];
    function push(u8) { parts.push(u8); len += u8.length; }
    function obj(n, body) { offs[n] = len; push(strBytes(n + ' 0 obj\n')); if (typeof body === 'string') push(strBytes(body)); else body.forEach(function (b) { push(typeof b === 'string' ? strBytes(b) : b); }); push(strBytes('\nendobj\n')); }
    var nImg = this.images.length, nPg = this.pages.length;
    // numeração: 1 catálogo, 2 páginas, 3 F1, 4 F2, 5.. imagens, depois (página, conteúdo)
    var firstImg = 5, firstPg = firstImg + nImg, total = firstPg + nPg * 2 - 1;
    push(strBytes('%PDF-1.4\n'));
    obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
    var kids = []; for (var p = 0; p < nPg; p++) kids.push((firstPg + p * 2) + ' 0 R');
    obj(2, '<< /Type /Pages /Kids [' + kids.join(' ') + '] /Count ' + nPg + ' >>');
    obj(3, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    obj(4, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');
    this.images.forEach(function (im, i) {
      obj(firstImg + i, ['<< /Type /XObject /Subtype /Image /Width ' + im.w + ' /Height ' + im.h + ' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ' + im.bytes.length + ' >>\nstream\n', im.bytes, '\nendstream']);
    });
    var xo = ''; this.images.forEach(function (_, i) { xo += '/Im' + i + ' ' + (firstImg + i) + ' 0 R '; });
    for (p = 0; p < nPg; p++) {
      var pn = firstPg + p * 2, cn = pn + 1, stream = this.pages[p].join('\n');
      obj(pn, '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ' + f(W) + ' ' + f(H) + '] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> /XObject << ' + xo + '>> >> /Contents ' + cn + ' 0 R >>');
      obj(cn, '<< /Length ' + stream.length + ' >>\nstream\n' + stream + '\nendstream');
    }
    var xref = len;
    var x = 'xref\n0 ' + (total + 1) + '\n0000000000 65535 f \n';
    for (var n = 1; n <= total; n++) x += ('0000000000' + offs[n]).slice(-10) + ' 00000 n \n';
    x += 'trailer\n<< /Size ' + (total + 1) + ' /Root 1 0 R >>\nstartxref\n' + xref + '\n%%EOF';
    push(strBytes(x));
    var out = new Uint8Array(len), pos = 0;
    parts.forEach(function (u) { out.set(u, pos); pos += u.length; });
    return out;
  };

  window.MiniPDF = { Doc: Doc, wrap: wrap, textW: textW, W: W, H: H };

  /* ---------- PDF do orçamento (usado pelo catálogo e pela página do pedido) ---------- */
  (function () {
    var CFG = window.CONFIG || {};
    function porCodigo(c) { var L = window.PRODUTOS || []; for (var i = 0; i < L.length; i++) if (L[i].codigo === c) return L[i]; return null; }
  function imagemJpeg(src, lado) {
    return new Promise(function (resolve) {
      var im = new Image();
      im.onload = function () {
        try {
          var cv = document.createElement('canvas'); cv.width = cv.height = lado;
          var cx = cv.getContext('2d'); cx.fillStyle = '#fff'; cx.fillRect(0, 0, lado, lado);
          var r = Math.min(lado / im.naturalWidth, lado / im.naturalHeight), w = im.naturalWidth * r, hh = im.naturalHeight * r;
          cx.drawImage(im, (lado - w) / 2, (lado - hh) / 2, w, hh);
          var b64 = cv.toDataURL('image/jpeg', 0.85).split(',')[1], bin = atob(b64), u = new Uint8Array(bin.length);
          for (var i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
          resolve({ bytes: u, w: lado, h: lado });
        } catch (e) { resolve(null); }
      };
      im.onerror = function () { resolve(null); };
      im.src = src;
    });
  }
  function gerarPDF(q) {
    var codigos = {}; q.itens.forEach(function (i) { codigos[i.codigo] = 1; });
    var lista = Object.keys(codigos);
    return Promise.all([imagemJpeg('assets/logo.jpg', 160)].concat(lista.map(function (c) { return imagemJpeg(porCodigo(c).foto, 200); }))).then(function (imgs) {
      var P = window.MiniPDF, d = new P.Doc(), M = 40, LARG = P.W - 2 * M;
      var laranja = [184, 79, 8], cinza = [107, 90, 69], escuro = [43, 33, 24], fundo = [244, 236, 216];
      var idx = {}, logo = imgs[0] ? d.addImage(imgs[0].bytes, imgs[0].w, imgs[0].h) : null;
      lista.forEach(function (c, i) { if (imgs[i + 1]) idx[c] = d.addImage(imgs[i + 1].bytes, imgs[i + 1].w, imgs[i + 1].h); });
      function cabecalho() {
        d.rect(0, 0, P.W, 78, fundo);
        if (logo !== null) d.image(logo, M, 12, 54, 54);
        d.text(M + 66, 38, CFG.LOJA_NOME || 'Corte e Cria Decor', 18, true, laranja);
        d.text(M + 66, 56, 'Solicitação de orçamento', 11, false, cinza);
      }
      cabecalho();
      var y = 104;
      d.text(M, y, 'Orçamento ' + q.numero, 13, true, escuro);
      d.text(P.W - M - P.textW(q.data, 10, false), y, q.data, 10, false, cinza);
      y += 18; d.text(M, y, 'Cliente: ' + q.cliente, 11, false, escuro);
      y += 12; d.line(M, y, P.W - M, [227, 214, 184], 1); y += 14;
      var LIM = P.H - 80;
      q.itens.forEach(function (it, n) {
        var p = porCodigo(it.codigo), tx = M + 78, tw = LARG - 78;
        var nomeL = P.wrap((n + 1) + ') ' + p.nome, 11, true, tw).slice(0, 3);
        var det = ['Cor: ' + (it.cor || 'a combinar') + '   ·   Quantidade: ' + it.qtd];
        if (it.pers) P.wrap('Personalização: "' + it.pers + '"', 10, true, tw).slice(0, 2).forEach(function (l) { det.push({ b: l }); });
        if (p.medidas) P.wrap('Medidas: ' + p.medidas, 10, false, tw).slice(0, 2).forEach(function (l) { det.push(l); });
        det.push({ g: 'Código: ' + p.codigo });
        var alt = Math.max(70, nomeL.length * 13 + det.length * 12.5 + 10);
        if (y + alt > LIM) { d.newPage(); cabecalho(); y = 104; }
        if (idx[it.codigo] !== undefined) d.image(idx[it.codigo], M, y, 68, 68);
        else d.rect(M, y, 68, 68, fundo);
        var ty = y + 12;
        nomeL.forEach(function (l) { d.text(tx, ty, l, 11, true, escuro); ty += 13; });
        det.forEach(function (l) {
          if (typeof l === 'string') d.text(tx, ty, l, 10, false, escuro);
          else if (l.b) d.text(tx, ty, l.b, 10, true, laranja);
          else d.text(tx, ty, l.g, 8.5, false, cinza);
          ty += 12.5;
        });
        y += alt; d.line(M, y - 4, P.W - M, [227, 214, 184], 0.6); y += 8;
      });
      if (q.obs) {
        var ol = P.wrap('Observações: ' + q.obs, 10, false, LARG);
        if (y + ol.length * 12 + 20 > LIM) { d.newPage(); cabecalho(); y = 104; }
        ol.forEach(function (l) { d.text(M, y + 4, l, 10, false, escuro); y += 12; }); y += 10;
      }
      if (y + 40 > LIM) { d.newPage(); cabecalho(); y = 104; }
      d.text(M, y + 6, 'Total: ' + q.pecas + (q.pecas === 1 ? ' peça' : ' peças') + ' em ' + q.itens.length + (q.itens.length === 1 ? ' produto' : ' produtos'), 11, true, escuro);
      d.text(M, y + 24, 'Valores e prazo serão informados pela loja por WhatsApp.', 9.5, false, cinza);
      var total = d.pages.length;
      d.pages.forEach(function (pg, i) {
        d.cur = pg; d.line(M, P.H - 44, P.W - M, [227, 214, 184], 0.6);
        d.text(M, P.H - 30, (CFG.LOJA_NOME || '') + ' · ' + q.numero, 8.5, false, cinza);
        var t = 'Página ' + (i + 1) + ' de ' + total; d.text(P.W - M - P.textW(t, 8.5, false), P.H - 30, t, 8.5, false, cinza);
      });
      return d.build();
    });
  }


    window.OrcPDF = { gerar: gerarPDF };
  })();
})();
