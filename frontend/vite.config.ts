import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        adminDemo: fileURLToPath(new URL('./admin-demo.html', import.meta.url)),
        userDemo: fileURLToPath(new URL('./user-demo.html', import.meta.url)),
        a9k4m7qx2vld: fileURLToPath(new URL('./a9k4m7qx2vld.html', import.meta.url)),
        p6w2r8tn5hcz: fileURLToPath(new URL('./p6w2r8tn5hcz.html', import.meta.url)),
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
