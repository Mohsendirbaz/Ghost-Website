import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    // Inline all assets so the output is one self-contained HTML file
    assetsInlineLimit: 100_000_000,
    cssCodeSplit: false,
  },
})
