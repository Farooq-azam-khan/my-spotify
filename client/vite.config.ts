import { defineConfig } from 'vite'
import elmPlug from 'vite-plugin-elm'
import path from 'path'
export default defineConfig({
    root: "src", 
    plugins: [elmPlug()],
    server: {
        proxy: {
          "/api": {
            target: "http://localhost:3001",
            changeOrigin: true,
            secure: false,
            // rewrite: (path) => path.replace(/^\/api/, ""),
          },
        },
      },
})