import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: false,
    proxy: {
      '/api/gemini': {
        target: 'https://generativelanguage.googleapis.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gemini/, '/v1beta/models/gemini-2.5-flash:generateContent')
      },
      '/api/deploy': {
        target: 'https://negashosting.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
