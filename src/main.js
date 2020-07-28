import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import editor from "mavon-editor";
import editorCss from "mavon-editor/dist/css/index.css"

Vue.use(ElementUI);
Vue.use(editor);



import "@/permission"

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
