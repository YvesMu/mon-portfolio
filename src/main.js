import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

// Ajout du routeur
app.use(router);

// Montage de l'application
app.mount('#app');
