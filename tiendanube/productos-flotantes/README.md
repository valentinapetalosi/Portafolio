# Petalosi · Los favoritos de la semana

Tarjetas de productos que flotan sobre el banner principal de petalosi.co.

## Cómo funciona

| Archivo | Para qué |
|---|---|
| `gtm-etiqueta.html` | Lo único que va en Google Tag Manager (etiqueta "HTML personalizado", activador "DOM listo"). Se pega una sola vez. |
| `productos-flotantes.js` | Dibuja la nube y las tarjetas en el home. |
| `productos-flotantes.css` | Diseño de la nube y las tarjetas. |
| `favoritos.json` | Los 3 productos de la semana. **Es lo único que cambia cada semana.** |

La tienda carga estos archivos directamente desde GitHub, de la rama
`tiendanube-en-vivo` de este repositorio:
`https://raw.githubusercontent.com/valentinapetalosi/Portafolio/tiendanube-en-vivo/tiendanube/productos-flotantes/`

Lo que se sube a esa rama aparece en la tienda en unos 5 minutos (la caché de GitHub).
No se usa jsDelivr: con URLs de rama entregaba versiones viejas y distintas según el servidor.

## Actualización semanal (la hace la tarea programada de Claude cada lunes)

1. **Ventas:** con el conector de Tiendanube, `list_orders` con
   `completed_at_from` = lunes anterior 00:00 (-05:00), `completed_at_to` = domingo 23:59:59 (-05:00),
   `status` = `["open","closed"]`, `payment_status` = `["paid","authorized","partially_paid"]`, `limit` = 100
   (paginar si `total` > 100).
2. **Contar unidades por producto** (`product_id`, sumando `quantity` de todas las variantes).
   No contar:
   - productos genéricos o manuales como **"Varios"**;
   - **Tarjeta de Regalo**;
   - **Pañito Limpiagafas** (la dueña pidió no destacarlo nunca);
   - pedidos que parezcan de prueba (p. ej. "Pepita Perez").
   Los pedidos al por mayor (aunque sean grandes y hechos a mano) **sí se cuentan**.
3. **Orden:** más unidades primero. Si hay empate, gana el que esté en más pedidos distintos;
   si sigue el empate, el de la venta más reciente; y si aún empatan, el que dejó más ingresos (precio × unidades).
4. **Solo productos publicados y con stock:** revisar la página del producto en petalosi.co.
   Si uno no tiene stock, se salta y se toma el siguiente.
   Si se vendieron menos de 3 productos válidos, completar con los de la semana anterior que sigan con stock.
5. **Datos de cada producto:** `python3 datos-producto.py <url-del-producto> ...` imprime
   `id`, `name`, `url`, `image`, `price`, `old` y la descripción de la tienda.
   La `desc` de la tarjeta se escribe a mano: una frase corta (máx. ~75 caracteres), en el tono de Petalosi.
6. **Editar `favoritos.json`:** `periodo`, `actualizado`, y los 3 `productos` (con `vendidos`).
7. **Publicar:** commit en la rama `tiendanube-en-vivo` y `git push origin tiendanube-en-vivo`.
8. **Comprobar** (unos 5 minutos después del push):
   `curl -sS https://raw.githubusercontent.com/valentinapetalosi/Portafolio/tiendanube-en-vivo/tiendanube/productos-flotantes/favoritos.json`
   debe mostrar los productos nuevos.
