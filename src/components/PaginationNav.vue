<template>

    <b-pagination-nav align="center" :link-gen="linkGen" :number-of-pages="numberOfPages" use-router/>

</template>

/**
* 对 b-pagination-nav 组件的进一步封装。详见：https://bootstrap-vue.js.org/docs/components/pagination-nav
*/

<script>

    export default {
        name: "PaginationNav",
        props: {
            linkGen: Function,
            numberOfPages: [Number, String],
        }
    }

</script>

<style scoped lang="scss">

    $color-pagination-nav-item-able: #6CA6CD;
    $color-pagination-nav-item-disable: #666666;

    nav {
        margin: 1.5rem auto;
        ::v-deep .pagination {
            .page-item {
                margin: auto 5px;
                a, span {
                    border: none;
                    border-radius: 2px;
                }
                a {
                    min-height: 33px;
                    min-width: 33px;
                    color: $color-pagination-nav-item-disable !important;
                    border: 1px solid $color-pagination-nav-item-able;
                    transition: background-color .3s;
                    &:hover {
                        color: white !important;
                        background-color: $color-pagination-nav-item-able;
                    }
                }
                span {
                    color: $color-pagination-nav-item-disable;
                }
                .router-link-exact-active {
                    color: white !important;
                    background-color: $color-pagination-nav-item-able;
                }
            }
        }
    }

</style>