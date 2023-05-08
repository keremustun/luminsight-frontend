import msal from 'vue-msal';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Emitter from 'tiny-emitter';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap'
import './assets/main.css'

const app = createApp(App)

app.use(router)

app.config.unwrapInjectedRef = true
app.config.globalProperties.$msalInstance = {};
app.config.globalProperties.$emitter = new Emitter();

app.use(store).mount('#app');