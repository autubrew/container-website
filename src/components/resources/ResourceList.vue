<template>

    <div>
        <ResourceItem v-for="(item, index) in resourcesList" :key="index" v-bind="item"/>
        <PaginationNav v-show="loadOk" :link-gen="!isCategory ? linkGen1 : linkGen2" :number-of-pages="pages"/>
    </div>
    
</template>

<script>

    import ResourceItem from "@/components/resources/ResourceItem";
    import PaginationNav from "@/components/common/PaginationNav";

    export default {
        name: "ResourceList",
        components: {
            PaginationNav,
            ResourceItem
        },
        data() {
            return {
                resourcesList: [],  //当前页的资源列表
                pages: 1,    // 总页数
                loadOk: false
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.goResourcesDestinationPage(to.params.category, to.params.keyword, to.params.number);
            })
        },
        beforeRouteUpdate(to, from, next) {
            const toCategory = to.params.category;
            const toKeyWord = to.params.keyword;
            const toPageNum = to.params.number;
            if(toPageNum >= 1 && toPageNum <= this.pages) {
                this.goResourcesDestinationPage(toCategory, toKeyWord, toPageNum);
                next()
            }
            else {
                next({path: '/404'})
            }
        },
        computed: {
            // 标识是否是点击分类后展示的列表
            isCategory() {
                return  !!this.$route.params.category;
            }
        },
        methods: {
            // 所有资源的页面，跳转到目标页
            _goResourcesPage(pageNum, limit) {
                this.$api.resources.getResourcesList(pageNum, limit)
                    .then(response => {
                        const data = response.data.data;
                        this.resourcesList = data.resources;
                        this.pages = data.pages;
                        this.loadOk = true;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                    })
            },
            // 分类资源的页面，跳转到目标页
            _goResourcesPageByCategory(category, keyword, pageNum, limit) {
                this.$api.resources.getResourcesListByCategory(category, keyword, pageNum, limit)
                    .then(response => {
                        const data = response.data.data;
                        this.resourcesList = data.resources;
                        this.pages = data.pages;
                        this.loadOk = true;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                    })
            },
            // 跳转到目标页。对函数goResourcesPage、goResourcesPageByCategory的简单封装
            goResourcesDestinationPage(category, keyword, pageNum) {
                if(!this.isCategory) {
                    this._goResourcesPage(pageNum, 5)
                } else {
                    this._goResourcesPageByCategory(category, keyword, pageNum, 5)
                }
            },
            linkGen1(pageNum) {
                return {
                    path: `/resources/page/${pageNum}`
                }
            },
            linkGen2(pageNum) {
                return {
                    path: `/resources/${this.$route.params.category}/${this.$route.params.keyword}/page/${pageNum}`
                }
            },
        },
        watch: {
            '$store.state.lang': function () {
                this.goResourcesDestinationPage(this.$route.params.category, this.$route.params.keyword, this.$route.params.number)
            }
        }
    }

</script>

<style scoped>

</style>