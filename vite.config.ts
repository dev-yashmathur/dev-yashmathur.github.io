import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { execSync } from 'child_process'

const commit = (() => {
  try { return execSync('git rev-parse --short=7 HEAD').toString().trim() } catch { return '0000000' }
})()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  define: { __COMMIT__: JSON.stringify(commit) },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,
  },
})
