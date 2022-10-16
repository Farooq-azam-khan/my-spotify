import { defineConfig } from 'vite'
import elmPlug from 'vite-plugin-elm'
import path from 'path'
export default defineConfig({
    root: "src", 
    plugins: [elmPlug()],
})

// export default {
//     root: path.join(__dirname, "src"),
// }