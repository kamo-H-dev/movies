import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import './assets/styles.css' // Ensure you are using css-loader
Vue.config.productionTip = false

Vue.use(Vuetify, {
  iconfont: 'md'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
