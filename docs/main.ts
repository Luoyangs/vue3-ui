import { createApp } from 'vue';
import router from './router';
import DemoBlock from './components/DemoBlock.vue';
import DemoBox from './components/DemoBox.vue';
import SingleDemo from './components/SingleDemo.vue';
import * as components from '../src/components';
import App from './App.vue';
import './styles/index.scss';

const app = createApp(App);
app.component(DemoBlock.name, DemoBlock);
app.component(DemoBox.name, DemoBox);
app.component(SingleDemo.name, SingleDemo);
Object.values(components).forEach(component => {
  app.component(component.name, component);
});
app.use(router);

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    document.documentElement.scrollTop = 0;
  }
});

app.mount('#app');
