import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/weddstoryid/',
  build: {
    // Chunk size warning threshold (kB)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        // Pisahkan vendor chunks agar browser bisa cache lebih efektif
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/@emailjs')) {
            return 'vendor-emailjs'
          }
        },
      },
    },
  },
})
