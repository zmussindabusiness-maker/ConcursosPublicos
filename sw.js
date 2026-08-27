const CACHE = "simulador-provas-v12";
const FILES = [
  ".",
  "index.html",
  "simulador_prova_MININT.html",
  "guia_estudo_MININT.html",
  "guia_estudo_MINSA.html",
  "guia_estudo_aptidao.html",
  "guia_estudo_minint2026.html",
  "guia_estudo_minsa2026.html",
  "guia_estudo_med2026.html",
  "manifest.json",
  "icon-192.png",
  "icon-512.png",
  "icon-180.png",
  "questoes.js",
  "dados/index.js",
  "dados/base-geral.js",
  "dados/base-geral-cultura.js",
  "dados/base-geral-minint.js",
  "dados/base-minint.js",
  "dados/base-saude.js",
  "dados/base-educacao.js",
  "dados/base-psicotecnico.js",
  "dados/base-aptidao-fisica.js",
  "dados/educacao-base-lp.js",
  "dados/minint-sic.js",
  "dados/minint-pn.js",
  "dados/minint-sme.js",
  "dados/minint-sp.js",
  "dados/minint-spcb.js",
  "dados/minint-base-bonus.js",
  "dados/minint-concurso-bonus.js",
  "dados/minint-sic-bonus.js",
  "dados/saude-enfermagem.js",
  "dados/saude-medicina.js",
  "dados/saude-tdt.js",
  "dados/saude-tdt-analises-clinicas.js",
  "dados/saude-tdt-radiologia.js",
  "dados/saude-tdt-anatomia-patologica.js",
  "dados/saude-tdt-cardiopneumologia.js",
  "dados/saude-tdt-medicina-nuclear.js",
  "dados/saude-tdt-farmacia.js",
  "dados/saude-tdt-fisioterapia.js",
  "dados/saude-tdt-psicologia.js",
  "dados/saude-tdt-nutricao.js",
  "dados/saude-tdt-estomatologia.js",
  "dados/saude-tdt-eletromedicina.js",
  "dados/saude-apoio-hospitalar.js",
  "dados/saude-regime-geral.js",
  "dados/saude-assistentes-sociais.js",
  "dados/educacao-professores.js",
  "dados/educacao-regime-geral.js",
  "dados/educacao-disciplina-matematica.js",
  "dados/educacao-disciplina-fisica.js",
  "dados/educacao-disciplina-quimica.js",
  "dados/educacao-disciplina-biologia.js",
  "dados/educacao-disciplina-historia.js",
  "dados/educacao-disciplina-geografia.js",
  "dados/educacao-disciplina-portugues.js",
  "dados/educacao-disciplina-ingles.js",
  "dados/educacao-disciplina-informatica/index.js",
  "dados/educacao-disciplina-informatica/tic.js",
  "dados/educacao-disciplina-informatica/tlp.js",
  "dados/educacao-disciplina-informatica/redes.js",
  "dados/educacao-disciplina-informatica/seac.js",
  "dados/educacao-disciplina-informatica/trei.js",
  "dados/educacao-disciplina-filosofia.js",
  "dados/educacao-disciplina-educacao-fisica.js"
];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(FILES); })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; }).map(function(k) { return caches.delete(k); })
      );
    })
  );
});

self.addEventListener("fetch", function(e) {
  var url = new URL(e.request.url);
  var cacheKey = url.origin + url.pathname;
  e.respondWith(
    caches.match(cacheKey).then(function(r) {
      return r || fetch(e.request).then(function(res) {
        if (res && res.ok && url.origin === location.origin) {
          var copy = res.clone();
          caches.open(CACHE).then(function(c) { c.put(cacheKey, copy); });
        }
        return res;
      });
    })
  );
});
