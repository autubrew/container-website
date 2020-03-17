export default [
    {
        path: '/404',
        name: 'router-404',
        meta: {
            title: '404'
        },
        component: () => import('@/views/404')
    },
    {
        path: '*',
        redirect: '/404',
        name: 'router-error',
    }
]