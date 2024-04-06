import './bootstrap';
import { createApp, h } from 'vue';
import { createInertiaApp, Link } from '@inertiajs/vue3';
import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/index.esm";
import { createPinia } from 'pinia'; 
import '@fortawesome/fontawesome-free/css/all.min.css';

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
      .component('Link', Link)
      .mount(el);
  }
});

// import './bootstrap';
// import { createApp, h } from 'vue'
// import { createInertiaApp, Link } from '@inertiajs/vue3'
// import { ZiggyVue } from "../../vendor/tightenco/ziggy/dist/index.esm";
// import '../css/app.css'

// createInertiaApp({
//   resolve: name => {
//     const pages = import.meta.glob('./Pages/**/*.vue', { eager: true })
//     return pages[`./Pages/${name}.vue`]
//   },
//   setup({ el, App, props, plugin }) {
//     createApp({ render: () => h(App, props) })
//       .use(plugin)
//       .use(ZiggyVue, Ziggy)
//       .component('Link', Link)
//       .mount(el)
//   }
// })