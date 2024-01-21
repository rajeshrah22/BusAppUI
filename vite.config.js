import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/BusApp/',
  plugins: [react()],
  build: {
    outDir: '/work/eclipse-workspace/BusApp/src/main/webapp',
  },
})