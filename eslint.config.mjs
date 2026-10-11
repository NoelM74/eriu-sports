import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Reading localStorage after the first render (cart, currency, cookie choice) is intentional.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([".next/**", ".open-next/**", ".wrangler/**", "out/**", "build/**", "next-env.d.ts", "process_products.js"]),
]);
