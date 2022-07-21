import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://arch-site-2e08gqt3g-dchueri.vercel.app/'
})
