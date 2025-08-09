// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Este prefijo debe coincidir con el nombre del repositorio
  base: '/calculator-per-hour/'
});