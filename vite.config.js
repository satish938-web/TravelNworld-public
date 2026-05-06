import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiTarget = env.VITE_API_BASE || "http://localhost:3000";
  return defineConfig({
    plugins: [react()],
    server: {
      port: 5174,      // Enforces the port
      strictPort: true, // 🛑 Stops Vite from automatically switching to 5174
      host: true,      // Optional: Exposes the project on your local network
      proxy: {
        "/api": {
          target: apiTarget, // 👈 YOUR BACKEND PORT
          changeOrigin: true,
          secure: false,
        }
      }
    }
  })
}
