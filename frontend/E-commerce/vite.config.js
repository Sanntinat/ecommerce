import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Asegura que Vite escuche en todas las interfaces
    port: 5173, // Puerto para evitar conflictos
  },
  optimizeDeps: {
    exclude: ['react', 'react-dom'], // Excluir para evitar conflictos
  },
})

