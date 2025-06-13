import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    mainFields: []
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        // chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    minify: true,
    target: 'esnext',
    chunkSizeWarningLimit: 800
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
})
