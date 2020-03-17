<template>

    <b-card class="mb-3">
        <ImgLazy class="resource-img" :src="thumbnail" alt="" blank-width="600px" blank-height="450px"/>
        <b-card-header>
            <a :href="pdf" target="_blank">
                <h4 class="mb-0">{{ title }}</h4>
            </a>
        </b-card-header>
        <b-card-text v-html="compiledMarkdown(introduction)"/>
        <b-card-footer>
            <div class="resource-meta">
                <div>
                    <b-icon-people-fill shift-v="-1"/>
                    <small>{{ conferenceName }} {{ yearName }}</small>
                </div>
                <div>
                    <b-icon-graph-up/>
                    <small>{{ citations }}</small>
                </div>
            </div>
            <div class="resource-link">
                <b-icon-download shift-v="-1"/>
                <a :href="pdf" target="_blank" @click="visitPdf">
                    <small>{{ $t('download') }}</small>
                </a>
                <small>({{ views }})</small>
            </div>
        </b-card-footer>
    </b-card>

</template>

<i18n>
    en:
        download: "Download"
    zh-CN:
        download: "下载"
</i18n>

<script>

    import marked from "marked";
    import ImgLazy from "@/components/common/ImgLazy";

    export default {
        name: "ResourceItem",
        components: {
            ImgLazy
        },
        props: {
            id: [Number, String],
            title: String,
            introduction: String,
            conference: String,
            conferenceName: String,
            year: [Number, String],
            yearName: String,
            tag: String,
            tagName: String,
            citations: [Number, String],
            thumbnail: String,
            pdf: String,
            views: [Number, String]
        },
        methods: {
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
        }
    }

</script>

<style scoped lang="scss">

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

    .resource-img {
        margin: 10px auto;
        width: 90%;
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