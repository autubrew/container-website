<template>

    <div class="project-list">
        <b-card no-body class="overflow-hidden" v-for="(item, index) in projectList" :key="index">
            <b-row no-gutters>
                <b-col class="project-img" md="6">
                    <img-lazy :src="item.thumbnail" alt="" blank-width="600px" blank-height="450px"/>
                </b-col>
                <b-col md="6">
                    <b-card-body>
                        <b-card-title>
                            <b-link :to="{ path: `/projects/post/${item.slug}` }" >{{ item.title }}</b-link>
                        </b-card-title>
                        <b-card-text v-html="compiledMarkdown(item.excerpt)"/>
                        <b-card-footer>
                            <b-row>
                                <b-col>
                                    <small>{{ item.conference }} {{ item.year }}</small>
                                </b-col>
                                <b-col class="read-more">
                                    <b-link :to="{ path: `/projects/post/${item.slug}` }" >{{ $t('readMore') }} »</b-link>
                                </b-col>
                            </b-row>
                            <b-row v-if="item.code">
                                <b-col>
                                    <div class="github">
                                        <a :href="item.code" target="_blank">
                                            <svg-icon icon-class="github" width="20px" height="20px"/>
                                        </a>
                                    </div>
                                </b-col>
                            </b-row>
                        </b-card-footer>
                    </b-card-body>
                </b-col>
            </b-row>
        </b-card>
        <PaginationNav v-show="loadOk" :link-gen="linkGen" :number-of-pages="pages"/>
    </div>

</template>

<i18n>
    en:
        readMore: "Read more"
    zh-CN:
        readMore: "阅读更多"
</i18n>

<script>

    import ImgLazy from "@/components/ImgLazy";
    import PaginationNav from "@/components/PaginationNav";
    import marked from "marked";

    export default {
        name: "ProjectList",
        components: {
            ImgLazy,
            PaginationNav
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
            },
            compiledMarkdown: function (val) {
                return marked(val, {sanitize: false})
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

    .card {
        margin: 20px auto;
        padding: 10px;
        max-width: 900px;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid $color-split-line;
        border-radius: 0;
    }

    .project-img {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .card-title {
        a {
            font-size: 24px;
            color: $color-card-title;
        }
    }

    .card-footer {
        padding-left: 0;
        background-color: transparent;
        border: none;

        .read-more {
            text-align: right;
        }

        .github {
            margin: 8px 0;
        }

        small {
            opacity: .85;
        }

        a {
            color: rgb(49, 118, 192);
            font-weight: bold;

            &:hover {
                transition: opacity .3s;
                cursor: pointer;
            }
        }

    }

</style>
