import Vue from 'vue'
import Vuetify from 'vuetify'

import App from './App'

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
