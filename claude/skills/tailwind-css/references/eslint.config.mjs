import js from "@eslint/js";
import globals from "globals";

export default [
  // Lint ONLY team-authored JS (assets/custom*.js). Dawn's original JS is never linted or edited.
  // "**/*.js" ignores every JS file, then the "!" pattern re-includes custom.js AND custom-*.js
  // (the glob has no dash on purpose — see the shopify-javascript skill).
  {
    ignores: ["**/*.js", "!assets/custom*.js", "**/*.mjs", "**/*.cjs", "node_modules/**"],
  },
  js.configs.recommended,
  {
    files: ["assets/custom*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      // custom.js is loaded as a classic <script defer>, not a module.
      sourceType: "script",
      globals: {
        ...globals.browser,
        // Globals provided by Dawn (global.js, constants.js, pubsub.js) and theme.liquid.
        Shopify: "readonly",
        theme: "readonly",
        routes: "readonly",
        debounce: "readonly",
        throttle: "readonly",
        fetchConfig: "readonly",
        trapFocus: "readonly",
        removeTrapFocus: "readonly",
        subscribe: "readonly",
        publish: "readonly",
        PUB_SUB_EVENTS: "readonly",
        ON_CHANGE_DEBOUNCE_TIMER: "readonly",
        // Swiper 11 (loaded from its own script tag).
        Swiper: "readonly",
      },
    },
  },
];
