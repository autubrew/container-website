<template>

    <b-img-lazy
            v-if="!failed"
            :src="src"
            :alt="alt"
            :blank-color="blankColor"
            :blank-width="blankWidth"
            :blank-height="blankHeight"
            @error.native="failed = true"
    />
    <b-img-lazy
            v-else
            :src="srcImage"
    />

</template>

/**
* 对 b-img-lazy 组件的进一步封装，主要解决图片默认占位图以及图片加载失败点击重新加载的需求。
* 根据 b-img-lazy 提供的其他功能可以做进一步的封装。详见：https://bootstrap-vue.js.org/docs/components/image
*/

<script>

    // TODO: b-img、b-img-lazy 待支持图片加载失败

    import defaultImg from '@/assets/img/default.svg';

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
        data() {
            return {
                failed : false
            }
        },
        computed: {
            srcImage() {
                return this.failed ? defaultImg : this.src;
            }
        },
        watch: {
            'src': function () {
                this.failed = false
            }
        }
    }

</script>

<style scoped>

</style>
