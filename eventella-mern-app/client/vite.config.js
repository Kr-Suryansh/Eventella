// Vite config for the React client. Environment variables prefixed with VITE_
// are exposed to the client bundle (see client/.env.sample for VITE_API_URL).
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
