"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const vite_plugin_elm_1 = __importDefault(require("vite-plugin-elm"));
exports.default = (0, vite_1.defineConfig)({
    root: "src",
    plugins: [(0, vite_plugin_elm_1.default)()],
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
});
