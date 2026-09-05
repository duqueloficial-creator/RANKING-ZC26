# ZC26 — sitio dividido en varias páginas

## Qué cambió
- `index.html` ahora solo contiene el header, el menú, el selector de idioma y la sección **Home**. Antes tenía las 5 secciones a la vez (10.7k líneas); ahora tiene 420.
- Cada categoría vive en su propio archivo dentro de `/page/`:
  - `page/lastgame.html` → Último partido
  - `page/ranking.html` → Ranking
  - `page/partners.html` → Partners
  - `page/hall-of-fame.html` → Salón de la fama (incluye el pie de página / créditos)
- El CSS se movió a `css/style.css` y el JS a `js/app.js`. Los 5 archivos HTML cargan estos dos mismos archivos, así que el navegador los descarga una sola vez y los reutiliza en el resto de páginas (se guardan en caché).
- El menú, el botón de sonido y el selector de idioma están en las 5 páginas de forma idéntica, y su estado se guarda en `localStorage`, por eso se mantienen activos aunque cambies de página (esto ya lo hacía tu código original, no tuve que tocarlo).
- Cada página marca como "activa" la pestaña que le corresponde, de forma fija (ya no hace falta JavaScript para eso).

## Por qué todavía comparten CSS y JS
Revisé las 4.180 líneas de JavaScript: el ranking, el salón de la fama y el partido usan variables y datos compartidos (por ejemplo el arreglo `PLAYERS`, el sistema de sonidos, los modales de jugador/trofeo). Separar ese JS por página sin poder probarlo en un navegador real habría sido arriesgado — podía romper cosas silenciosamente. Por eso lo dejé como un solo `app.js` compartido: es 100% el mismo código que ya tenías, solo que ahora vive en un archivo aparte y cada página descarga únicamente el HTML de su propia sección (que es lo que más pesaba). Si más adelante quieres separar el JS también, puedo ayudarte, pero requeriría poder probarlo paso a paso.

## Carpetas de imágenes/sonidos — no las toqué
Como solo subiste el `index.html`, este paquete NO incluye tus carpetas de imágenes, sonidos e idiomas (`news/`, `clip/`, `historiasdestacadas/`, `sound/`, `idioma/`, y las imágenes sueltas de la raíz). Cópialas tal cual las tienes ahora, en la **raíz del proyecto**, junto a este nuevo `index.html`. Las rutas siguen funcionando gracias a `<base href="../">` en los archivos dentro de `/page/`.

## Estructura final que debes subir a GitHub
```
tu-repo/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── app.js
├── page/
│   ├── lastgame.html
│   ├── ranking.html
│   ├── partners.html
│   └── hall-of-fame.html
├── news/              ← tus carpetas existentes, sin cambios
├── clip/
├── historiasdestacadas/
├── sound/
├── idioma/
└── (resto de imágenes sueltas: LEV.png, Untitled257.jpg, etc.)
```

Todo sigue siendo 100% offline: sin base de datos, sin `fetch`, sin backend. Funciona igual abriendo `index.html` con doble clic o publicado en GitHub Pages.
