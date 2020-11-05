import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import Vant from 'vant';
Vue.use(Vant);
import Acomponent from '@/plugin/Acomponent';
Vue.use(Acomponent);
import ChartsModelList from "@/plugin/ChartsModel";
Vue.use(ChartsModelList);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')