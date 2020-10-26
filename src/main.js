// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import ''
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import store from './store/index.js'
import Popup from '@/common/popup.js'

Vue.use(Antd)
    // console.log(Vue.$message)
Vue.config.debug = true;
Vue.config.productionTip = false;
import {
    Axios,
    deepClone,
    Moment,
    longData
} from './common/common.js'
Vue.prototype.$popup = Popup.install
Vue.prototype.$axios = axios;
Vue.prototype.$deepClone = deepClone;
Vue.prototype.$moment = Moment;
Vue.prototype.$longData = longData;
Vue.prototype.Axios = Axios;
// bus
let vm = new Vue();
Vue.prototype.$bus = vm;
import modelForm from "@/components/modelForm";
import collapse from "@/components/Collapse"
import tableColumn from "@/components/tableColumn";
import comHeader from "@/components/comHeader";
import examine from "@/components/examine"
Vue.component('modelForm', modelForm)
Vue.component('tableColumn', tableColumn)
Vue.component('comHeader', comHeader)
Vue.component('collapse', collapse)
Vue.component('examine', examine)
    // 全局变量
console.log(CONFIG)
Vue.prototype.$baseUrl = CONFIG.baseUrl;
console.warn(`版本：2019/11/29 15:14:00 GMT+0800 (中国标准時間)`)
console.warn(`修改使用者管理“删除”接口,修改退出登录网页title变更`)

new Vue({
    el: '#app',
    router,
    store,
    components: {
        App
    },
    template: '<App/>'
})