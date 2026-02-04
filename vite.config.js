import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001, // Altera a porta
    strictPort: true, // Se a porta 3000 estiver ocupada, ele não tenta outra
  }
})