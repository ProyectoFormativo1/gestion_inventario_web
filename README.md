# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```


#### Create APPS
1. npm create vite@latest theorder-web -- --template react-ts
2. npm install -D tailwindcss@3 postcss autoprefixer
3. npm install react-router-dom  --save
5. npx tailwindcss init -p
- DOCS:  https://tailwindcss.com/docs/guides/vite#react
* 	Tailwind CSS:
    * Marco de diseño de utilidad para construir interfaces de usuario.
    * Proporciona clases utilitarias predefinidas para diseñar componentes y páginas.
    * Se centra en un enfoque de "bajo nivel" que te permite construir estilos rápidamente.
* 		PostCSS:
    * Herramienta de procesamiento de CSS que transforma estilos con JavaScript y plugins.
    * Utilizado para aplicar transformaciones como la incorporación de variables, autoprefijado, y más.
    * Tailwind utiliza PostCSS para procesar su configuración y clases utilitarias en estilos CSS.
* 		Autoprefixer:
    * Plugin de PostCSS que agrega automáticamente prefijos de proveedores a reglas CSS.
    * Mejora la compatibilidad entre navegadores al evitar la escritura manual de prefijos de proveedores.
    * Ayuda a garantizar que los estilos generados sean consistentes en diferentes navegadores.

6. Configuration file tailwind.config.js: 
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 
```

7. Configuration file tailwind css:
- Create file name index.css
- Add content:

```css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

8. Configuration file postcss.config.js
```js
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default {
  plugins: [
    tailwindcss,
    autoprefixer,
    // Otros plugins de PostCSS si los necesitas
  ],
};
```

9. Configuration HeroUI - Reemplazo de NextUI
```bash
npm install @heroui/react    
```
Agregar la configuracion de HeroUI en tailwind.config.js agregando el plugin heroui() con la configuracion del tema

```js
/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    heroui({
      prefix: "heroui", // prefix for themes variables
      addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
      defaultTheme: "light", // default theme from the themes object
      defaultExtendTheme: "light", // default theme to extend on custom themes
      layout: {}, // common layout tokens (applied to all themes)
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {}, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
        // ... custom themes
      },
    }),
  ],
}
```

Actualizar main.tsx agregando HeroUIProvider
```js
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { HeroUIProvider } from '@heroui/react'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeroUIProvider>
      <App />
    </HeroUIProvider>
  </StrictMode>,
)
```

10. Icons
https://heroicons.com/solid
install icons:
```bash
npm install @heroicons/react
```

 
11. Run Project
```bash
npm install
npm run dev
```

12. Icons
https://heroicons.com/


13. Correr Simulacion Backend
json-server --watch db.json --port 3001