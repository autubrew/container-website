<template>

    <b-navbar toggleable="lg">

        <b-navbar-brand to="/">
            <svg-icon class-name="logo" icon-class="logo" height="40px"/>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" ref="collapse"/>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto nav-items-list">

                <b-nav-item class="nav-list-item nav-item-page-link" :class="{ 'underline': isUnderLine(item.name) }" v-for="(item, index) in navItemsPageLink" :key="index" :to="item.url">
                    {{ $t(item.name) }}
                </b-nav-item>

                <b-nav-item-dropdown class="nav-list-item nav-item-language" :text="$t('language')" right>
                    <b-dropdown-item-button value="en" @click=switchLanguage($event)>English</b-dropdown-item-button>
                    <b-dropdown-item-button value="zh-CN" @click=switchLanguage($event)>中文</b-dropdown-item-button>
                </b-nav-item-dropdown>

                <b-button class="btn-search" size="sm" v-b-modal.search-box>
                    <b-icon-search font-scale="1.5" variant="dark"/>
                </b-button>

                <b-modal id="search-box" centered hide-footer scrollable size="xl"> <!--开发模式下，热更新会多次$on，造成多次弹框；生产模式下则不会-->
                    <template slot="modal-header">
                        <b-form-input id="input-default" class="input-box" v-model="input" :placeholder="$t('search')" @keyup.enter="submit" autocomplete="off" autofocus required trim/>
                    </template>
                    <b-card v-for="(item, index) in searchResult" :key="index" :header="$t(item.name)" header-tag="h6">
                        <b-list-group v-if="item.name === 'projects'" v-show="item.data !== []">
                            <b-list-group-item v-for="(v, i) in item.data" :key="i" :to="'/projects/post/' + item.data[i].slug" target="_blank">{{ v.title }}</b-list-group-item>
                        </b-list-group>
                        <b-list-group v-else-if="item.name === 'resources'" v-show="item.data !== []">
                            <b-list-group-item v-for="(v, i) in item.data" :key="i" :href="item.data[i].pdf" target="_blank">{{ v.title }}</b-list-group-item>
                        </b-list-group>
                    </b-card>
                </b-modal>

            </b-navbar-nav>
        </b-collapse>

    </b-navbar>

</template>

<i18n>
    en:
        projects: "Projects"
        resources: "Resources"
        others: "Others"
        language: "Language"
        search: "Search ..."
    zh-CN:
        projects: "项目"
        resources: "资源"
        others: "其他"
        language: "语言"
        search: "搜索 ..."
</i18n>

<script>

    export default {
        name: "NavBar",
        data() {
            return {
                navItemsPageLink: [
                    { url: '/projects/page/1', name: 'projects' },
                    { url: '/resources/page/1', name: 'resources' },
                    { url: '/others', name: 'others' },
                ],
                input: '',   // 搜索框输入内容
                searchResult: {
                    projects: { name: 'projects', data: [] },
                    resources: { name: 'resources', data: [] }
                }
            }
        },
        computed: {
            isUnderLine: function () {
                return function (itemName) {
                    return this.$route.meta.title && itemName === this.$route.meta.title.toLowerCase()
                }
            }
        },
        methods: {
            submit() {
                // 只有在导航栏展开状态下才收回，防止提交查询时导航栏处于收回状态从而造成闪烁
                const collapseState = this.$refs.collapse.$el.getAttribute('aria-expanded');
                if(collapseState === 'true') {
                    this.$root.$emit('bv::toggle::collapse', 'nav-collapse');   // toggling collapses via $root events
                }
                // 提交非空查询
                // TODO: [未知错误，暂不影响体验]重复提交控制台会显示“uncaught exception: Object”
                if (this.input !== '') {
                    this._search(this.input)
                }
            },
            // TODO：[用户体验] 对搜索过程以及返回结果（是否为空）给出显式化反馈
            _search(keyword) {
                this.$api.search.search(keyword)
                    .then(response => {
                        const data = response.data.data;
                        const code = response.data.code;
                        if(code === 204) {
                            //alert('empty!')
                        } else {
                            this.searchResult.projects.data = data.projects;
                            this.searchResult.resources.data = data.resources;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                    })
            },
            switchLanguage(event) {
                const lang = event.target.value;
                this.$root.$i18n.locale = lang;   // i18n使用单文件组件<i18n/>的情况下，需使用$root来改变全局locale
                this.$store.commit('setLang', lang);
                localStorage.setItem('language', lang);    //语言改变，持久化存储
                document.querySelector('html').setAttribute('lang', lang)
            }
        }
    }

</script>

<style scoped lang="scss">

    $color-navbar-item: #404040;
    $color-navbar-item-underline: rgb(81, 84, 86);
    $color-navbar-item-language-subitem: #354c63;

    .navbar {
        padding: 1.5% 2%;
        min-height: 60px;
    }

    .navbar-brand {
        width: 60%;
        max-width: 350px;
    }

    .nav-list-item {
        width: fit-content;
        height: 100%;
        padding: 0 15px 0 5px;
        /* <b-nav-item-dropdown/>标签使用了slot，需使用::v-deep来作用于子组件。具体见vue loader的深度选择器及bootstrap-vue源码。*/
        a, ::v-deep span:not(.search-icon), ::v-deep .dropdown-toggle::after {
            font-size: 1.1rem;
            font-weight: bold;
            color: $color-navbar-item !important;
        }
    }

    .nav-item-page-link {
        position: relative;
        &::before {
            content: "";
            width: 0;
            height: 4px;
            position: absolute;
            top: 0;
            //right: 50%;
            background: $color-navbar-item-underline;
        }
        &:hover::before {
            //@include underline-position;
            width: 100%;
            //transition: all .3s;
        }
    }

    /* 页面链接悬停下划线 */
    @mixin underline-position {
        right: 30%;
        width: 50%;
    }

    .nav-item-page-link {
        position: relative;
        &::before {
            content: "";
            width: 0;
            position: absolute;
            top: 100%;
            right: 50%;
            height: 3px;
            background: $color-navbar-item-underline;
        }
        &:hover::before {
            @include underline-position;
            transition: all .3s;
        }
    }

    .underline {
        &::before {
            @include underline-position
        }
    }

    .nav-item-language {
        ::v-deep ul {
            padding: 0;
            border: none;
            border-radius: 5px;
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            max-width: 200px;
            li {
                button {
                    font-size: .9rem;
                    height: 40px;
                    outline: none;
                    color: $color-navbar-item-language-subitem;
                    &:active {
                        background-color: rgb(245, 245 ,245);
                    }
                }
            }
        }
    }

    .btn-search {
        border: none;
        background-color: transparent;
        &:hover {
            background-color: transparent;
        }
        &:focus {
            background-color: transparent !important;
            box-shadow: none !important;
        }
    }

    .input-box {
        border: none;
        border-radius: 0;
        box-shadow: none;
        opacity: .6;
        &, &:focus {
            border-bottom: 1px solid #acacac;
        }
        &:focus {
            box-shadow: none;
            opacity: 1;
        }
    }

    .card {
        border: none;
        border-radius: 0;
        .card-header {
            border-bottom: none;
        }
        .card-body {
            .list-group {
                a {
                    color: #696969 !important;
                    border: none;
                    &:hover {
                        background-color: transparent;
                        text-decoration: underline !important;
                        opacity: 1;
                    }
                }
            }
        }
    }

</style>
