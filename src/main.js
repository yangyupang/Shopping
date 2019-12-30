import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vant from 'vant';
import 'vant/lib/index.css';
import service from "./http"
import dayjs from 'dayjs'
import FastClick from 'fastclick'
import './globalRegistration'
import Api from './http/Api'


FastClick.attach(document.body);
Vue.use(Vant);
Vue.use(ElementUI);
// Vue.prototype.$axios = service
Vue.prototype.$api = Api
Vue.prototype.$dayjs = dayjs
    // Vue.prototype.Api = Api
Vue.config.productionTip = false


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')