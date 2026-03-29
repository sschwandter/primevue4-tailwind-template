import "@fontsource-variable/inter";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";

import App from "./App.vue";
import router from "./router";
import AppPreset from "./theme/preset";

const app = createApp(App);

app.use(createPinia());
app.use(VueQueryPlugin);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: AppPreset,
    options: {
      darkModeSelector: ".dark",
    },
  },
});

app.mount("#app");
