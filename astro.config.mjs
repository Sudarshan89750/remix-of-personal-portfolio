import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import path from "path";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    optimizeDeps: {
      exclude: [
        'react-hook-form',
        '@hookform/resolvers',
        'embla-carousel-react'
      ]
    },
    ssr: {
      noExternal: [
        'react-hook-form',
        '@hookform/resolvers',
        'embla-carousel-react'
      ]
    }
  },

  integrations: [react()]
});