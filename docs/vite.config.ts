import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/nwindows',
  build: {
    chunkSizeWarningLimit: 1024,
    outDir: '../build/docs', 
    emptyOutDir: true, // also necessary
  }
})
