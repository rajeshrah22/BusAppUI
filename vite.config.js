import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { rimraf } from 'rimraf'

// Custom Rollup plugin
const preBuildCleanupPlugin = {
  name: 'pre-build-cleanup',
  buildStart() {
    rimraf.sync('/work/eclipse-workspace/BusApp/src/main/webapp/assets');
    rimraf.sync('/work/eclipse-workspace/BusApp/src/main/webapp/index.html');
    console.log('Pre-build cleanup complete!')
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/BusApp/',
  plugins: [react(), preBuildCleanupPlugin],
  build: {
    outDir: '/work/eclipse-workspace/BusApp/src/main/webapp',
  },
})