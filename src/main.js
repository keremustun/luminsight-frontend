import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import 'bootstrap'

import './assets/main.css'
import {skillsService} from "@/services/SkillsService";

const app = createApp(App)

app.use(router)

app.mount('#app')
app.provide('skillsService', skillsService)
