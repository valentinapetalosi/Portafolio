"""Imprime los datos de tarjeta de productos de petalosi.co para favoritos.json.

Uso: python3 datos-producto.py <url-del-producto> [<url> ...]
"""
import html
import json
import re
import sys
import urllib.request


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def meta(page, prop):
    m = re.search(r'%s" content="([^"]*)"' % re.escape(prop), page)
    return html.unescape(m.group(1)) if m else ""


def product_data(url):
    page = fetch(url)
    image = meta(page, "og:image").replace("http://", "https://")
    image = re.sub(r"-\d+-\d+\.(webp|jpg|png)$", r"-480-0.\1", image)
    # La página trae varios data-variants (productos relacionados); el del
    # producto principal es el que comparte imagen con og:image.
    key = re.sub(r"-\d+-\d+\.\w+$", "", image.rsplit("/", 1)[-1])
    variants = None
    for m in re.finditer(r'data-variants="([^"]*)"', page):
        try:
            v = json.loads(html.unescape(m.group(1)))
        except ValueError:
            continue  # algunos data-variants vienen vacíos
        if v and any(key in (x.get("image_url") or "") for x in v):
            variants = v
            break
    out = {
        "id": None, "name": meta(page, "og:title"), "url": url, "image": image,
        "price": "", "old": "", "en_stock": None,
        "descripcion_tienda": meta(page, "og:description"),
    }
    if variants:
        out["id"] = str(variants[0]["product_id"])
        available = [x for x in variants if x.get("available")]
        out["en_stock"] = bool(available)
        pool = sorted(available or variants, key=lambda x: x["price_number"])
        cheapest = pool[0]
        varies = any(x["price_number"] != cheapest["price_number"] for x in pool)
        out["price"] = ("Desde " if varies else "") + cheapest["price_short"]
        out["old"] = cheapest.get("compare_at_price_short") or ""
    return out


if __name__ == "__main__":
    for u in sys.argv[1:]:
        print(json.dumps(product_data(u), ensure_ascii=False, indent=2))
