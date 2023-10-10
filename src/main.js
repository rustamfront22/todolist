import '@/assets/style/style.scss'
import vClickOutside from "click-outside-vue3"
import { createApp } from 'vue'
import App from './App.vue'
import dropdonwEvent from '@/components/utils/dropdonw-event.js'
createApp(App).use(dropdonwEvent).use(vClickOutside).mount('#app')


