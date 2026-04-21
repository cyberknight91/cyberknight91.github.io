# portfolio-web

Web one-page del portfolio de `cyberknight91`. Estilo terminal, modo oscuro, acentos morados. HTML + CSS + JS vanilla — sin frameworks, sin build step.

Desplegada en **https://cyberknight91.github.io/**

## Desarrollo local

```bash
# cualquier servidor estático
python -m http.server 8080
# o
npx serve .
```

Abre `http://localhost:8080`.

## Deploy a GitHub Pages

1. Crea un repo con el nombre **exacto** `cyberknight91.github.io` (user page).
2. Sube el contenido de esta carpeta a la raíz del repo.
3. Settings → Pages → Source = Deploy from a branch, Branch = `main`, folder = `/`.
4. El primer deploy tarda ~60s. URL: `https://cyberknight91.github.io/`.

## Estructura

```
portfolio-web/
├── index.html          una page, HTML semántico
├── assets/
│   ├── style.css       todo el estilado, custom props CSS
│   ├── app.js          typing effect + reveal + konami
│   └── img/            (vacío — añade og.png aquí para link previews)
└── README.md
```

## Ajustes probables

- **OG image** — añade `assets/img/og.png` (1200×630). Actualiza el meta tag en `index.html`.
- **Dominio custom** — crea `CNAME` en el repo con tu dominio, configura CNAME DNS hacia `cyberknight91.github.io`.
- **LinkedIn / socials** — añade los links en la sección de contacto de `index.html`.
- **Frases del typing** — edita el array en `assets/app.js` → `phrases`.
- **Colores de acento** — cambia las custom props CSS en `:root` (`--accent`, `--accent-2`, `--accent-3`).

## Licencia

MIT.
