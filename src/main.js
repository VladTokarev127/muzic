import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

// Global components
import ThePageTitle from './components/ThePageTitle';
import BaseButton from './components/UI/BaseButton';
import BaseTag from './components/UI/BaseTag';

const app = createApp(App);

app.component('ThePageTitle', ThePageTitle);
app.component('BaseButton', BaseButton);
app.component('BaseTag', BaseTag);

app.use(router).use(createPinia()).mount('#app');
