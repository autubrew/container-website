<template>

    <b-img-lazy
            :src="src"
            :alt="alt"
            :blank-color="blankColor"
            :blank-width="blankWidth"
            :blank-height="blankHeight"
            @click.native="reloadImg"
            @error.native="errorImg"
    />

</template>

/**
* 对 b-img-lazy 组件的进一步封装，主要解决图片默认占位图以及图片加载失败点击重新加载的需求。
* 根据 b-img-lazy 提供的其他功能可以做进一步的封装。详见：https://bootstrap-vue.js.org/docs/components/image
*/

<script>

    export default {
        name: "ImgLazy",
        props: {
            src: String,
            alt: {
                type: String,
                default: ''
            },
            blankColor: {
                type: String,
                default: 'rgb(230, 230, 230)'
            },
            blankWidth: String,
            blankHeight: String,
        },
        methods: {
            errorImg(e) {
                e.target.src = require(`../../assets/img/error/reload.svg`)
            },
            reloadImg(e) {
                e.target.src = null;
                e.target.src = this.src;
            }
        }
    }

</script>

<style scoped>

</style>