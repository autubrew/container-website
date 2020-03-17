export default {
    path: '/resources',
    name: 'route-resources',
    component: () => import('@/views/Resources'),
    children: [
        {
            path: 'page/:number',
            name: 'route-resources-page',
            meta: {
                title: 'Resources'
            },
            component: () => import('@/components/resources/ResourceList')
        },
        {
            path: ':category/:keyword/page/:number',
            name: 'route-resources-category-page',
            meta: {
                title: 'Resources'
            },
            component: () => import('@/components/resources/ResourceList')
        }
    ]
}
