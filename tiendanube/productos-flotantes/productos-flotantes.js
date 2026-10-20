/*
  Petalosi · "Los favoritos de la semana" flotando sobre el banner principal
  -----------------------------------------------------------------------
  Lo carga la etiqueta de Google Tag Manager (ver gtm-etiqueta.html)
  directamente desde GitHub (rama tiendanube-en-vivo). Los productos salen de favoritos.json, que se actualiza cada
  semana con los más vendidos; este archivo casi nunca cambia.

  Si un producto también aparece en alguna lista del home, se usan el
  precio y la foto de la página (siempre al día). Si no, los de favoritos.json.
*/
(function () {
  // GitHub sirve la última versión de la rama con solo 5 minutos de caché.
  var BASE = 'https://raw.githubusercontent.com/valentinapetalosi/Portafolio/tiendanube-en-vivo/tiendanube/productos-flotantes/';

  function get(file) {
    return fetch(BASE + file, { cache: 'no-cache' }).then(function (r) {
      if (!r.ok) throw new Error(file + ' ' + r.status);
      return r.text();
    });
  }

  // Algunos nombres vienen con entidades HTML (p. ej. 11&quot;).
  function decode(text) {
    var t = document.createElement('textarea');
    t.innerHTML = text || '';
    return t.value;
  }

  function readFromPage(id) {
    var item = document.querySelector('.js-item-product[data-product-id="' + id + '"]');
    if (!item) return null;
    var data = {};
    try {
      var ld = item.querySelector('script[type="application/ld+json"]');
      var info = JSON.parse(ld.textContent);
      data.name = decode(info.name);
      data.url = info.offers && info.offers.url;
      data.image = info.image;
    } catch (e) { return null; }
    try {
      var variants = JSON.parse(item.getAttribute('data-variants') || '[]');
      var available = variants.filter(function (v) { return v.available; });
      var list = available.length ? available : variants;
      list.sort(function (a, b) { return a.price_number - b.price_number; });
      var cheapest = list[0];
      if (cheapest) {
        var varies = list.some(function (v) { return v.price_number !== cheapest.price_number; });
        data.price = (varies ? 'Desde ' : '') + cheapest.price_short;
        data.old = cheapest.compare_at_price_short || '';
      }
    } catch (e) {}
    return data.name && data.url ? data : null;
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function buildCard(p) {
    var a = el('a', 'pf-card');
    a.href = p.url;
    var img = el('img', 'pf-card__img');
    img.src = p.image;
    img.alt = p.name;
    img.loading = 'lazy';
    var body = el('div', 'pf-card__body');
    body.appendChild(el('h3', 'pf-card__name', p.name));
    if (p.desc) body.appendChild(el('p', 'pf-card__desc', p.desc));
    if (p.price) {
      var price = el('div', 'pf-card__price', p.price);
      if (p.old) price.appendChild(el('span', 'pf-card__old', p.old));
      body.appendChild(price);
    }
    a.appendChild(img);
    a.appendChild(body);
    return a;
  }

  function render(config) {
    if (document.querySelector('.pf-floating')) return;
    // Se inserta justo después del carrusel (antes de apps como las reseñas).
    var hero = document.querySelector('.section-slideshow [data-store="home-slider"]') ||
               document.querySelector('[data-store="home-slider"]') ||
               document.querySelector('.section-slideshow');
    if (!hero) return; // solo en el home

    var track = el('div', 'pf-floating__track');
    (config.productos || []).forEach(function (saved) {
      var live = readFromPage(saved.id);
      var p = live || saved;
      // El texto corto de la tarjeta siempre sale de favoritos.json.
      p.desc = saved.desc;
      if (p.name && p.url) track.appendChild(buildCard(p));
    });
    if (!track.children.length) return;

    var title = config.titulo || 'Los favoritos de la semana';
    var wrap = el('section', 'pf-floating');
    wrap.setAttribute('aria-label', title);
    var head = el('div', 'pf-floating__head');
    var cloud = el('div', 'pf-cloud');
    cloud.appendChild(el('h2', 'pf-cloud__text', title));
    head.appendChild(cloud);
    wrap.appendChild(head);
    wrap.appendChild(track);
    function place() {
      if (hero.nextElementSibling !== wrap) hero.parentNode.insertBefore(wrap, hero.nextSibling);
    }
    place();
    document.body.classList.add('pf-on');

    // Algunas apps (p. ej. reseñas) se insertan después y empujarían las
    // tarjetas hacia abajo: durante unos segundos las devolvemos a su lugar.
    if (window.MutationObserver) {
      var moves = 0;
      var obs = new MutationObserver(function () {
        if (hero.nextElementSibling !== wrap && moves++ < 20) place();
      });
      obs.observe(hero.parentNode, { childList: true });
      setTimeout(function () { obs.disconnect(); }, 15000);
    }
  }

  function start() {
    if (!document.querySelector('[data-store="home-slider"], .section-slideshow')) return;

    // Se dibuja cuando ya cargaron los estilos y la lista, para que las
    // tarjetas no aparezcan un instante sin diseño.
    var config = null, cssReady = false;
    function maybeRender() { if (config && cssReady) render(config); }

    // GitHub entrega el CSS como texto plano, así que se inserta como <style>.
    get('productos-flotantes.css')
      .then(function (text) {
        var style = document.createElement('style');
        style.textContent = text;
        document.head.appendChild(style);
      })
      .catch(function () {})
      .then(function () { cssReady = true; maybeRender(); });

    get('favoritos.json')
      .then(function (text) { config = JSON.parse(text); maybeRender(); })
      .catch(function () {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
