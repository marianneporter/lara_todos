import './bootstrap';
import { createApp, h } from 'vue';
import { createInertiaApp, Link } from '@inertiajs/vue3';
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/index.esm";
import { createPinia } from 'pinia'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import PrimeVue from 'primevue/config';

import ToastService from 'primevue/toastservice';

import 'primevue/resources/themes/saga-blue/theme.css'; 
import 'primevue/resources/primevue.min.css'; 
import 'primeicons/primeicons.css'; 

import '../css/app.css';

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./Pages/**/*.vue', { eager: true });
    return pages[`./Pages/${name}.vue`];
  },
  setup({ el, App, props, plugin }) {
    const app = createApp({ render: () => h(App, props) });
    const pinia = createPinia(); 
    
    app.use(plugin)
      .use(pinia) 
      .use(ZiggyVue, Ziggy)
      .use(PrimeVue)
      .use(ToastService)
      .component('Link', Link)
      .mount(el);
  }
});