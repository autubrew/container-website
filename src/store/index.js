import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {   //要设置的全局访问的state对象
    //language
    lang: localStorage.getItem('language') || 'en', // localStorage+vuex，这样就不用自己实现方法来监听localStorage存储的值的变化
    //axios的请求列表
    axiosPromiseCancel: [],
};

const getters = {   //实时监听state值的变化(最新状态)
    //getLang: state => () => state.lang
};

const mutations = {
    setLang(state, val) {
        state.lang = val
    }
};

const actions = {

};

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions
});

export default store;
