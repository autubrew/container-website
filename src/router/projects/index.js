export default {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/projects/index'),
    children: [
        {
            path: 'page/:number',
            name: 'projects-page',
            meta: {
                title: 'Projects'
            },
            component: () => import('@/views/projects/components/ProjectList')
        },
        {
            path: 'post/:slug',
            name: 'projects-post',
            meta: {
                title: 'Projects'
            },
            component: () => import('@/views/projects/components/ProjectPost'),
            props: true
        }
    ]
}
