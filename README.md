# Aquí Diseñamos

Sitio estático completo. Los archivos publicables, incluidos HTML, CSS, JavaScript, imágenes y tipografías, están en `dist/`. No requiere base de datos, variables de entorno ni dependencias externas.

## Desarrollo y verificación

Requiere Node.js 22 o superior.

```sh
npm run build
npm run dev
```

La vista local está en http://localhost:4173. El comando de build valida el archivo de entrada, los recursos locales y la sintaxis JavaScript; `dist/` ya contiene la versión publicable.

## Despliegue en Vercel

Importar este repositorio con **Root Directory = raíz del repositorio** (dejar vacío). `vercel.json` configura el proyecto como estático, ejecuta `npm run build` y publica `dist/`. Si el proyecto existente tiene ajustes manuales, usar Framework Preset **Other**, Build Command **npm run build** y Output Directory **dist**. Volver a desplegar el último commit.

Para otro hosting estático, publicar el contenido de `dist/` y usar `index.html` como entrada. La navegación entre secciones usa anclas; no necesita reescrituras de SPA.

## Funciones

Incluye menú móvil, servicios desplegables, mesa creativa con descarga PNG y preparación de brief descargable. El formulario no envía correos ni almacena datos en un servidor.

La configuración `.openai/hosting.json` corresponde a la publicación adicional en Sites; Vercel utiliza `vercel.json`.
