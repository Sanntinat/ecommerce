import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Escucha en todas las interfaces
    port: 3000, // Cambié el puerto para evitar posibles conflictos
    hmr: {
      host: 'ecommerce-production-0212.up.railway.app', // Dominio de tu aplicación en Railway
      port: 443, // Mantén el puerto 443 para WebSocket seguro (WSS)
      protocol: 'wss', // Usa WebSocket seguro
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
