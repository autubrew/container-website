<template>

    <!-- TODO：添加背景图片 -->
    <b-card overlay
            img-src=""
            img-alt=""
            text-variant="blue"
            :title="$t('title')"
            :sub-title="$t('description')"
    />

</template>

<i18n>
    en:
        title: "RESOURCES"
        description: "Recommended Quality resources Related to Containers"
    zh-CN:
        title: "资源"
        description: "容器相关优质资源推荐"
</i18n>

<script>

    export default {
        name: "Header"
    }

</script>

<style scoped lang="scss">

    @import "../../../styles/common/page-header";

</style>
