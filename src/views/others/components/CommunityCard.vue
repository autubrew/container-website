<template>

    <b-card>
        <a class="community-logo" :href="link" target="_blank">
            <svg-icon :icon-class="svgName"/>
        </a>
        <b-link class="community-title" :href="link" target="_blank">
            <b-card-title :title="name" title-tag="h4"/>
        </b-link>
        <b-card-text>{{ intro }}</b-card-text>
    </b-card>

</template>

<script>

    export default {
        name: "CommunityCard",
        props: {
            name: String,
            link: String,
            svgName: String,
            intro: String
        }
    }

</script>

<style scoped lang="scss">

    $margin-tb: 2%;

    .card {
        margin: $margin-tb 0;
        height: calc(100% - #{$margin-tb});
        background-color: transparent;
        border: none;
    }

    .card-body {
        display: flex;
        flex-direction: column;
    }

    .community-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 150px;
    }

    .community-title {
        margin: 15px auto 0;
        color: $color-card-title;
    }

</style>