import { createApp, watchEffect } from "vue";
import { createPinia } from "pinia";
import App from "@/App.vue";
import router from "@/router";
import i18n from '@/i18n/index';
import '@/main.css';
import '@/config/vee-validate/rules.js'
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
 
watchEffect(() => {
    Pusher.Runtime.createXHR = function () {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        return xhr;
    };
     
    window.Echo = new Echo({
        authEndpoint: `${import.meta.env.VITE_API_BASE_URL}broadcasting/auth`,
        broadcaster: "pusher",
        key: import.meta.env.VITE_PUSHER_APP_KEY,
        cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
        forceTLS: true,
        withCredentials: true,
        enabledTransports: ["ws", "wss"],
      });
    
})

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.use(i18n);
app.component('auth-form');

app.mount("#app");
