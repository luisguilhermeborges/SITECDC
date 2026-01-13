// astro.config.mjs
// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap"; // Adicionado pelo comando npx astro add sitemap

// https://astro.build/config
export default defineConfig({
  site: 'https://codigodacarne.com.br', // DOMÍNIO CONFIGURADO
  integrations: [sitemap()]
});

