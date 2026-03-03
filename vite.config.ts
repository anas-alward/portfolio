import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [tailwindcss(), react({
    babel: {
      plugins: [['babel-plugin-react-compiler']],
    },
  }), cloudflare()],
  server: {
    host: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})