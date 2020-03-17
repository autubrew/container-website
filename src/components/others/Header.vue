<template>

    <!-- TODO：添加背景图片 -->
    <b-card

            img-src=""
            img-alt=""
            text-variant="blue"
            :title="$t('title')"
            :sub-title="$t('description')"
    />

</template>

<i18n>
    en:
        title: "OTHERS"
        description: "Other Communities Related to Container"
    zh-CN:
        title: "其他社区"
        description: "其他容器相关的社区"
</i18n>

<script>
    export default {
        name: "Header"
    }
</script>

<style scoped lang="scss">

    @import "src/assets/scss/common/page-header.scss";

</style>
