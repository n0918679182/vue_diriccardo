import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import './assets/all.scss';
import Flipbook from 'flipbook-vue';
import 'bootstrap/dist/js/bootstrap.bundle';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(VueAxios, axios);
app.component('VueFlipbook',Flipbook);
app.component('VueLoading', Loading);
app.use(createPinia());
app.use(router);

app.mount('#app');
