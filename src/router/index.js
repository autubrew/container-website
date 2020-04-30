import Vue from 'vue'
import Router from 'vue-router'
import homeRouter from '@/router/home'
import projectsRouter from '@/router/projects'
import resourcesRouter from '@/router/resources'
import othersRouter from '@/router/others'
import _404Router from '@/router/404'
import store from "@/store";

Vue.use(Router);

const router = new Router({
/*    mode: 'history',*/
    base: process.env.BASE_URLE,
    routes: [
        homeRouter,
        projectsRouter,
        resourcesRouter,
        othersRouter,
        ..._404Router
    ],
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else if(to.hash) {
            return {
                selector: to.hash
            }
        } else {
            return { x: 0, y: 0 }
        }
    }
});


router.beforeEach((to, from, next) => {

    // 路由切换时中断上一个页面发起的但还未接收到响应的请求
    store.state.axiosPromiseCancel.forEach(e => {
        e && e()
    });
    store.state.axiosPromiseCancel = [];

    // 标签页信息
    const WebName = 'Container Community';
    if(to.meta.title) {
        document.title = `${to.meta.title} | ${WebName}`
    } else {
        document.title = WebName
    }

    next()
});

export default router;
