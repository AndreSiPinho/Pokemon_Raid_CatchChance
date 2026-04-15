import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/pokemon": "http://localhost:3001",
      "/pokeballs": "http://localhost:3001",
      "/catch-rate": "http://localhost:3001",
    },
  },
})
