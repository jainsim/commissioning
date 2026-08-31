import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Preview-only build: everything inlined into one index.html so it can be
// published as a hosted page. The real deploy uses vite.config.ts.
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile()],
  build: { outDir: 'preview', assetsInlineLimit: 100000000, cssCodeSplit: false },
})
