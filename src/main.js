import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import vuetify from './plugins/vuetify';
import VueSimpleAlert from "vue-simple-alert";
import {getAPI} from "@/axios-api";

Vue.config.productionTip = false
Vue.use(VueSimpleAlert); // plugin od alertow

// Jeśli użytkownik nie jest zalogowany przekieruj go na strone logowania
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresLogin)) {
        if (!store.getters.loggedIn) {
            next({name: 'Login'})
        } else {
            next()
        }
    } else {
        next()
    }
})

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
