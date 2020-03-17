<template>

    <b-card no-body class="overflow-hidden">
        <b-row no-gutters>
            <b-col class="project-img" md="6">
                <ImgLazy :src="thumbnail" alt="" blank-width="600px" blank-height="450px"/>
            </b-col>
            <b-col md="6">
                <b-card-body>
                    <b-card-title>
                        <b-link :to="{ path: `/projects/post/${slug}` }" >{{ title }}</b-link>
                    </b-card-title>
                    <b-card-text v-html="compiledMarkdown(excerpt)"/>
                    <b-card-footer>
                        <small>{{ conference }} {{ year }}</small>
                        <b-link :to="{ path: `/projects/post/${slug}` }" >{{ $t('readMore') }} »</b-link>
                    </b-card-footer>
                </b-card-body>
            </b-col>
        </b-row>
    </b-card>

</template>

<i18n>
    en:
        readMore: "Read more"
    zh-CN:
        readMore: "阅读更多"
</i18n>

<script>

    import marked from "marked";
    import ImgLazy from "@/components/common/ImgLazy";

    export default {
        name: "ProjectItem",
        components: {
            ImgLazy
        },
        props: {
            id: [Number, String],
            title: String,
            excerpt: String,
            conference: String,
            year: [Number, String],
            thumbnail: String,
            slug: String
        },
        methods: {
            compiledMarkdown: function (val) {
                return marked(val, {sanitize: false})
            }
        }
    }

</script>

<style scoped lang="scss">

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
        display: flex;
        padding-left: 0;
        justify-content: space-between;
        background-color: transparent;
        border: none;

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