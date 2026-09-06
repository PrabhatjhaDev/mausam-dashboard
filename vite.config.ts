import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    port: 5173,
    // Allow requests from cloudflared tunnel hostnames (required for public demo)
    allowedHosts: true,
  },
  // Vercel deployment: ensure clean base path
  base: '/',
})