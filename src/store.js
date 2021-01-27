import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import {getAPI} from "@/axios-api";

Vue.use(Vuex)
export default new Vuex.Store({
    // Logowanie/Wylogowanie nadawanie tokenu (Nie zrobilem tylko refreshu)
    plugins: [createPersistedState()],
    state: {
        accessToken: null,
        refreshToken: null,
        APIData: '',
    },
    mutations: {
        updateStorage (state, {access,refresh}) {
            state.accessToken = access
            state.refreshToken = refresh
        },
        destroyToken (state) {
            state.accessToken = null
            state.refreshToken = null
        }
    },
    getters: {
        loggedIn (state) {
            return state.accessToken != null
        }
    },
    actions: {
        userLogout (context) {
            if(context.getters.loggedIn) {
                context.commit('destroyToken')
            }
        },
        userLogin(context, usercredentials) {
            // eslint-disable-next-line no-unused-vars
            return new Promise((resolve,reject) => {
                getAPI.post('api/token/', {
                    username: usercredentials.username,
                    password: usercredentials.password
                })
                    .then(response => {
                        context.commit('updateStorage', { access: response.data.access, refresh: response.data.refresh})
                        resolve();
                    })
                    .catch( () => {
                        reject();
                    })
            })
        },
        // refreshToken: () => {
        //     return new Promise((resolve,reject) => {
        //         getAPI.post('api/token/refresh/')
        //             .then(response => {
        //                 resolve(response);
        //             })
        //             .catch(error => {
        //                 reject(error);
        //             })
        //     })
        // },
        userRegister(context,usercredentials) {
            return new Promise((resolve,reject) => {
                getAPI.post('account/api/register', {
                    username: usercredentials.username,
                    password: usercredentials.password,
                    email: usercredentials.email
                })
                    .then((response) => {
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            });
        }
    }
})

