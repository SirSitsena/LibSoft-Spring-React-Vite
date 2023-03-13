import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {fileURLToPath, URL} from 'node:url'

export default defineConfig({
    plugins: [react()],

    appType: "spa",
    cacheDir: "./cache",
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        sourcemap: true,
        manifest: true,
        emptyOutDir: true,
        outDir: "./../src/main/resources/public"
    },
    server: {
        port: 8081,
        preTransformRequests: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                secure: false,
                ws: false,
            }
        }
    }
})
