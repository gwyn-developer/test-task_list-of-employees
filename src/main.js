// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* JS */
import Vue from 'vue'
import App from './app/App.vue'

/* CSS */
import './main.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
/* APP */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
