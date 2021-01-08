import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
import vuetify from './plugins/vuetify';
import VueSimpleAlert from "vue-simple-alert";
import {getAPI} from "@/axios-api";

Vue.config.productionTip = false
Vue.use(VueSimpleAlert);

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

let isRefreshing = false;
let subscribers = [];

getAPI.interceptors.response.use(response => {
    return response
}, err => {
    const {
        config,
        response: {status, data}
    } = err;

    const orginalRequest = config;

    if(data.message === "Missing token") {
        router.push({name: 'Login'});
        return new Promise.rejest(false);
    }

    if(orginalRequest.url.includes('login_check')) {
        return Promise.rejest(err);
    }

    if(status === 401 && data.message === "Expired token") {
        if(!isRefreshing){
            isRefreshing = true;
            store.dispatch("refreshToken")
                .then(({status}) => {
                    if(status===200 || status == 204) {
                        isRefreshing = false;
                    }
                    subscribers = [];
                })
                .catch(error => {
                    console.log(error);
                })
        }
        const requestSubscribers = new Promise(resolve => {
            subscribeTokenRefresh(() => {
                resolve(getAPI(orginalRequest));
            });
        });
        onRefresh();

        return requestSubscribers;
    }
})

function subscribeTokenRefresh(cb) {
    subscribers.push(cb);
}

function  onRefresh() {
    subscribers.map(cb => cb());
}

subscribers = [];

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')
