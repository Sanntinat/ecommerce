import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,   // Asegura que Docker detecte cambios en los archivos
    },
  },
  optimizeDeps: {
    exclude: [
      '@mui/material',
      '@mui/icons-material',
      'react-router-dom',
      '@react-google-maps/api'
    ],
  },
})