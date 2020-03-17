<template>

    <div class="project-list">
        <ProjectItem v-for="(item, index) in projectList" :key="index" v-bind="item"/>
        <PaginationNav v-show="loadOk" :link-gen="linkGen" :number-of-pages="pages"/>
    </div>

</template>

<script>

    import ProjectItem from "@/components/projects/ProjectItem";
    import PaginationNav from "@/components/common/PaginationNav";

    export default {
        name: "ProjectList",
        components: {
            PaginationNav,
            ProjectItem
        },
        data() {
            return {
                projectList: [],    // 当前页的项目列表
                pages: 1,   // 项目的总页数
                loadOk: false
            }
        },
        // 从其他路由进入该路由时触发（包括页面刷新，因为刷新时的from.$route.name为null），因此点击翻页按钮在同一路由内进行页面跳转不会触发。
        // 注：beforeRouteEnter守卫不能访问this，但可以通过传一个回调给next来访问组件实例
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.goProjectsDestinationPage(to.params.number);
            })
        },
        // 同一路由内页面跳转
        beforeRouteUpdate(to, from, next) {
            const toPageNum = to.params.number;
            if(toPageNum >= 1 && toPageNum <= this.pages) {
                this.goProjectsDestinationPage(toPageNum);
                next()
            }
            else {
                next({path: '/404'})
            }
        },
        methods: {
            linkGen(pageNum) {
                return {
                    path: `/projects/page/${pageNum}`
                }
            },
            goProjectsDestinationPage(pageNum) {
                this.$api.projects.getProjectsList(pageNum, 5)
                    .then(response => {
                        const data = response.data.data;
                        this.projectList = data.projects;
                        this.pages = data.pages;
                        this.loadOk = true
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                    })
            }
        },
        watch: {
            // 监控语言切换
            '$store.state.lang': function () {
                this.goProjectsDestinationPage(this.$route.params.number)
            }
        }
    }

</script>

<style scoped lang="scss">

    .project-list {
        margin-bottom: 0;
    }

</style>