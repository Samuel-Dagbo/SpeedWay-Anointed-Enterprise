import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const apiUrl = process.env.VITE_API_URL || "http://localhost:4000";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/auth": apiUrl,
      "/products": apiUrl,
      "/orders": apiUrl,
      "/sales": apiUrl,
      "/categories": apiUrl,
      "/brands": apiUrl,
      "/models": apiUrl,
      "/reports": apiUrl,
      "/users": apiUrl,
      "/years": apiUrl,
      "/reviews": apiUrl,
      "/inventory": apiUrl,
      "/stock-subscriptions": apiUrl,
      "/audit-logs": apiUrl
    }
  }
});
