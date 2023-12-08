import { resolve } from "path";
import { defineConfig } from "vite";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        type: resolve(__dirname, "src/pokemonByType/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
        register: resolve(__dirname, "src/register/index.html"),
        pokemon: resolve(__dirname, "src/pokemonPage/index.html"),
      },
    },
  },
});
