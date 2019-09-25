// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'

FastClick.attach(document.body);
// rem转化
import 'lib-flexible/flexible'
//vuex
import store from './store'
// 全局vux组件
import { ConfigPlugin } from 'vux'
// 防止模态框出现页面可以滚动
// Vue.use(ConfigPlugin, {
//   $layout: 'VIEW_BOX'
// })
import {
  ConfirmPlugin,
  ToastPlugin,
  LoadingPlugin,
  AlertPlugin
} from 'vux'
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)
// mint-ui
import 'mint-ui/lib/style.css'
import {
  InfiniteScroll,
  Indicator
} from "mint-ui";
Vue.use(InfiniteScroll,Indicator);
// ***剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.prototype.$http = instance;
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import cn from "./base/lang/cn"
import ct from "./base/lang/ct"
import en from "./base/lang/en"
const i18n = new VueI18n({
  locale: store.state.lang,
  messages: {
    'cn': cn,
    'ct': ct,
    'en': en,
  }
});
Vue.$i18n = i18n;
Vue.prototype.setLang = function (l) {
    this.$i18n.locale = l;
    store.state.lang=l;
    localStorage.setItem("lang",l);
};
// axios
import axios from 'axios'
import Qs from "qs"
axios.defaults.transformRequest = [function(data) {
  if(data.toString()=="[object FormData]"){
    return data;
  }else{
    return Qs.stringify(data)
  }
}];
const host = process.env.NODE_ENV === 'development' ? '/' : 'http://btsq.qilinpz.com/api/' // 根据 process.env.NODE_ENV 的值判断当前是什么环境
const instance = axios.create({
  baseURL: host,
  timeout: 10000,
  withCredentials: true,
})
// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if(response.data.code==0){
    // alert(response.data.msg);
  }
  return response;
}, function (error) {
  // 对响应错误做点什么
  if(response.data.code==1){
	   Vue.$vux.loading.hide();
	   Vue.$vux.toast.show({
	   text: "该账号在别处登录，请重新登录！",
	   type: "cancel",
	   position: "middle",
	   time: 1200
	 });
  }
  return Promise.reject(error);
});
Vue.prototype.$http = instance;
// Vue.prototype.axios = instance;
// 全局函数


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: {
    App
  },
  template: '<App/>'
})
