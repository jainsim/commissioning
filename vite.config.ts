import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The whole app is served from https://seema-jain.com/commissioning/ ,
// not from the root of the domain. `base` tells Vite to prefix every
// generated asset URL with that path. Without it the built index.html
// asks for /assets/index-abc.js and Hostinger returns a 404.
export default defineConfig({
  base: '/commissioning/',
  plugins: [react()],
})
