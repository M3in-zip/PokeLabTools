import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite' /* used for project and SHADCN */
import path from "path" /* used for SHADCN */
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),
    react(), 
    tailwindcss()
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@components': path.resolve(__dirname, 'src/components'),
    },
  },
})
