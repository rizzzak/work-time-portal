import App from './App.vue'
import Vue from "vue"
import store from './vuex/store'
import router from './router/router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    vuetify,
    router
}).$mount('#app')
