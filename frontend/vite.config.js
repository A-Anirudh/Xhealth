import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import proxy from 'http-proxy-middleware';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port:3000,
    proxy: {
      '/api': {
        target: 'https://xhealth-git-jagnathreddy9-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com',
        changeOrigin: true,
        secure: false,
        ws: true,
        pathRewrite: {
          '^/api': '', // Remove the '/api' prefix from the URL before forwarding
        },
      },
    },
  }
})
