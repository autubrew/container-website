export default {
    path: '/resources',
    name: 'resources',
    component: () => import('@/views/resources/index'),
    children: [
        {
            path: 'page/:number',
            name: 'resources-page',
            meta: {
                title: 'Resources'
            },
            component: () => import('@/views/resources/components/ResourceList')
        },
        {
            path: ':category/:keyword/page/:number',
            name: 'resources-category-page',
            meta: {
                title: 'Resources'
            },
            component: () => import('@/views/resources/components/ResourceList')
        }
    ]
}
