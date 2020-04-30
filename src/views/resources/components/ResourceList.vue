<template>

    <div >
        <b-card class="mb-3" v-for="(item, index) in resourcesList" :key="index">
            <img-lazy class="resource-img" :src="item.thumbnail" alt="" blank-width="600px" blank-height="380px"/>
            <b-card-header>
                <a :href="item.pdf" target="_blank">
                    <h4 class="mb-0">{{ item.title }}</h4>
                </a>
            </b-card-header>
            <b-card-text v-html="compiledMarkdown(item.introduction)"/>
            <b-card-footer>
                <div class="resource-meta">
                    <div>
                        <b-icon-people-fill shift-v="-1"/>
                        <small>{{ item.conferenceName }} {{ item.yearName }}</small>
                    </div>
                    <div>
                        <b-icon-graph-up/>
                        <small>{{ item.citations }}</small>
                    </div>
                </div>
                <div class="resource-link">
                    <b-icon-download shift-v="-1"/>
                    <a :href="item.pdf" target="_blank" @click="visitPdf">
                        <small>{{ $t('download') }}</small>
                    </a>
                    <small>({{ item.views }})</small>
                </div>
            </b-card-footer>
        </b-card>
        <PaginationNav v-show="loadOk" :link-gen="!isCategory ? linkGen1 : linkGen2" :number-of-pages="pages"/>
    </div>
    
</template>

<i18n>
    en:
        download: "Download"
    zh-CN:
        download: "下载"
</i18n>

<script>

    import ImgLazy from "@/components/ImgLazy";
    import PaginationNav from "@/components/PaginationNav";
    import marked from "marked";

    export default {
        name: "ResourceList",
        components: {
            ImgLazy,
            PaginationNav
        },
        data() {
            return {
                resourcesList: [],  // 当前页的资源列表
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
            compiledMarkdown: function(val) {
                return marked(val,  { sanitize: false })
            },
            visitPdf() {
                this.$api.resources.putVisitPdf(this.id)
                    .then(() => {
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                    })
            }
        },
        watch: {
            '$store.state.lang': function () {
                this.goResourcesDestinationPage(this.$route.params.category, this.$route.params.keyword, this.$route.params.number)
            }
        }
    }

</script>

<style scoped lang="scss">

    .resource-img {
        margin: 10px auto;
        width: 90%;
    }

    .card {
        margin: 20px 1% !important;
        padding: 10px 0;
        border: none;
        border-radius: 0;
        border-bottom: 1px solid $color-split-line;
        .card-body {
            padding: 0;
        }
        .card-header, .card-footer {
            border: none;
            background-color: transparent;
            padding: 10px 0;
        }
    }

    .el-image {
        margin: 20px auto;
        .image-slot {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 600px;
            height: 400px;
            background-color: rgb(245,247,250);
            i {
                font-size: 3rem;
                color: #ebecf0;
            }
        }
    }

    .card-header {
        a {
            h4 {
                font-weight: bold;
                color: $color-card-title;
            }
        }
    }

    .card-footer {
        small {
            margin-left: 5px;
        }
        .resource-meta {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
        }
        .resource-link {
            a {
                color: rgb(92,125,157);
                small {
                    font-weight: bold;
                }
            }
            padding-right: 0;
        }
    }

</style>