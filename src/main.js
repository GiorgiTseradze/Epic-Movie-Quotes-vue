import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import i18n from '@/i18n/index';
import '@/main.css';
import '@/config/vee-validate/rules.js'


const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.component('auth-form');

app.mount("#app");
