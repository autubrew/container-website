import axios from 'axios'
import store from '@/store'
import app from '@/main'

let axiosPromiseCancel = [];

/* TODO：需要测试各组件在网络不好的情况下的功能是否协调且正常，比如点击下一页链接已经跳转但接收不到数据而失败，这时路由或页面不应该访问成功的目标，需要做个处理 */
/* TODO：注册一个数据请求状态的全局变量，以此控制当请求到数据后才使部分组件显示出来。比如项目、资源页请求数据成功后再将页面组件显示出来。 */

//请求拦截器
axios.interceptors.request.use(config => {

    //配置请求全局参数
    config.baseURL = process.env.VUE_APP_HOST;

    /* TODO: 语言切换设置全局拦截，当后端接收到转换后的目标语言数据，前端转换的部分才进行转换。否则在网络不好的情况下，可能会出现显示的BUG */

    config.cancelToken = new axios.CancelToken(cancel => {
        store.state.axiosPromiseCancel.push(cancel)
    });

    app.$Progress.start(); //发起请求，进度条开始
    return config
}, error => {


    app.$Progress.fail();   //请求失败
    return Promise.reject(error)
});

//响应拦截器
axios.interceptors.response.use(response => {

    app.$Progress.finish(); //接收到响应，进度条完成
    return response
}, error => {

    if(axios.isCancel(error)) {
        // 为了终结promise链，就是实际请求不会走到.catch(rej=>{});这样就不会触发错误提示之类了。
        return new Promise(() => {})
    }

    app.$Progress.fail();
    return Promise.reject(error)
});

//项目
const projects = {

    //请求指定页数处的项目列表
    getProjectsList(index, limit) {
        return axios.get('/projects/page', {
            params: {
                index: index,
                limit: limit,
                lang: localStorage.getItem('language') || 'en'
            }
        })
    }

};

//资源
const resources = {

    //请求指定页数的资源列表
    getResourcesList(index, limit) {
        return axios.get('/resources/page', {
            params: {
                index: index,
                limit: limit,
                lang: localStorage.getItem('language') || 'en'
            }
        })
    },

    //请求资源的分类列表
    getResourcesCategoryList() {
        return axios.get('/resources/categoryList', {
            params: {
                lang: localStorage.getItem('language') || 'en'
            }
        })
    },

    //请求某一分类的资源列表
    getResourcesListByCategory(category, keyword, index, limit) {
        return axios.get('/resources/oneCategoryPage', {
            params: {
                category: category,
                keyword: keyword,
                index: index,
                limit: limit,
                lang: localStorage.getItem('language') || 'en'
            }
        })
    },

    // 访问pdf资源
    putVisitPdf(id) {
        return axios.post('/resources/pdf', {
            id: id
        })
    }
};

//文章
const post = {

    //请求某篇文章
    getProjectPost(slug) {
        return axios.get(`/projects/post`, {
            params: {
                slug: slug,
                lang: localStorage.getItem('language') || 'en'
            }
        })
    }
};

//查询
const search = {

    //按关键字查询，返回projects和resources中匹配的内容
    search(query) {
        return axios.get(`/search`, {
            params: {
                query: query,
                lang: localStorage.getItem('language') || 'en'
            }
        })
    }

};

//访问量
const views = {

    //站点总访问量
    getSitePV() {
        return axios.get('/views')
    }
};

export default  {
    axiosPromiseCancel,
    projects,
    resources,
    post,
    search,
    views
}