export default [
    {
        path: '/404',
        name: 'error-404',
        meta: {
            title: '404',
            layout: 'blank'
        },
        component: () => import('@/views/error-page/404')
    },
    {
        path: '*',
        redirect: '/404',
        name: 'error-redirect',
    }
]