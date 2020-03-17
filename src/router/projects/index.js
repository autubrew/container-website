export default {
    path: '/projects',
    name: 'route-projects',
    component: () => import('@/views/Projects'),
    children: [
        {
            path: 'page/:number',
            name: 'route-projects-page',
            meta: {
                title: 'Projects'
            },
            component: () => import('@/components/projects/ProjectList')
        },
        {
            path: 'post/:slug',
            name: 'route-projects-post',
            meta: {
                title: 'Projects'
            },
            component: () => import('@/components/projects/ProjectPost'),
            props: true
        }
    ]
}
