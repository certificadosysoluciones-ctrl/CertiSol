# CertiSol

Web corporativa de **CertiSol** — certificados digitales y soluciones de firma electrónica.

## Contenido

- `index.html` — estructura y contenido de la página
- `styles.css` — estilos (responsive)
- `script.js` — menú móvil, animaciones y validación del formulario

## Ver la web en local

Abre `index.html` con doble clic, o sirve la carpeta:

```powershell
python -m http.server 5500
```

Luego visita http://localhost:5500

## Publicar cambios

```powershell
git add .
git commit -m "descripcion del cambio"
git push
```

## Personalizar

- **Textos y secciones:** `index.html`
- **Colores:** variables `--brand`, `--brand-2`, `--bg` en `styles.css`
- **Contacto:** busca `info@certisol.example` y `+34 600 000 000` en `index.html`

## Pendiente

- Sustituir datos de contacto de ejemplo por los reales
- Añadir páginas de Aviso legal, Privacidad y Cookies
- Conectar el formulario a un servicio real de envío (Formspree, EmailJS o backend propio)
