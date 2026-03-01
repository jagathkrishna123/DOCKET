import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 5173
  },

  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}']
      },
      manifest: {
        name: 'SAFA Event Management',
        short_name: 'SAFA',
        description: 'Employee Attendance QR Scanner',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/pwa-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/pwa-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})