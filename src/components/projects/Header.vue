<template>

    <!-- TODO：添加背景图片 -->
    <b-card
            overlay
            img-src=""
            img-alt=""
            text-variant="blue"
            :title="$t('title')"
            :sub-title="$t('description')"
    />

</template>

<i18n>
    en:
        title: "PROJECTS"
        description: "Overview of team projects"
    zh-CN:
        title: "项目"
        description: "团队项目总览"
</i18n>

<script>

    export default {
        name: "Header"
    }

</script>

<style scoped lang="scss">

    @import "src/assets/scss/common/page-header";

</style>
