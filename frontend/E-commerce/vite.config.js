import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces
    port: 5173, // Puerto para evitar conflictos
    hmr: {
      // Configura el HMR para que use el mismo dominio que el cliente
      host: 'ecommerce-production-0212.up.railway.app',
      port: 443, // Usa el puerto 443 para HTTPS
      protocol: 'wss', // Usa WebSocket seguro (WSS) en producción
    },
  },
  optimizeDeps: {
    exclude: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      'react-router-dom',
      'prop-types',
      'react-swipeable-views-utils',
    ],
  },
});