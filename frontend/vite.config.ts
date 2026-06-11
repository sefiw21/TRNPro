import tailwindcss from "@tailwindcss/vite";
import path from "path"; // 1. Import the path module
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      // 3. Tell Vite: "Whenever you see '@', replace it with the path to the /src directory"
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
