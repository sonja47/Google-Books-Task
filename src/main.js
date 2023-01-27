import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store.js'
import "/src/scss/main.css";

createApp(App).use(store).mount('#app')
