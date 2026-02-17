import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/voice_command_shopping_assistant/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})