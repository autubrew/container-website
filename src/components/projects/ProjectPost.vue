<template>

    <b-container>
        <b-row class="project-post justify-content-md-center">
            <b-col xm="12" sm="12" md="9" lg="9" xl="9" v-show="project">
                <h2>{{ project.title }}</h2>
                <hr>
                <p>
                    <em v-if="project.authors">{{ publishInfo }}</em>
                </p>
                <hr>
                <ImgLazy class="project-img" :src="project.thumbnail" alt="" blank-width="600px" blank-height="450px"/>
                <article v-if="project.content" v-html="compiledMarkdown(project.content)"/>
                <div class="post-footer">
                    <div class="pdf-link">
                        <b-icon-download shift-h="-1" shift-v="-1"/>
                        <small>
                            <a v-if="project.pdf" :href="project.pdf" target="_blank">PDF</a>
                        </small>
                    </div>
                    <div class="views">
                        <b-icon-eye shift-h="-1" shift-v="-1"/>
                        <small v-if="project.views > 0" class="views">({{ project.views }})</small>
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>

    import marked from 'marked';
    import ImgLazy from "@/components/common/ImgLazy";

    export default {
        name: "ProjectPost",
        components: {ImgLazy},
        props: ['slug'],
        data() {
            return {
                project: {
                    id: '',
                    title: '',
                    excerpt: '',
                    content: '',
                    authors: '',
                    conference: '',
                    year: '',
                    thumbnail: '',
                    pdf: '',
                    views: '',
                    slug: ''
                },
                code: ''
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.goProjectPost(vm.slug);
            })
        },
        beforeRouteUpdate(to, from, next) {
            this.goProjectPost(this.slug);
            next(this.code === 200 ? true : {path: '/404'});
        },
        computed: {
            publishInfo() {
                let authors = this.project.authors;
                if(this.$store.state.lang === 'zh-CN') {
                    return authors.replace(/,/g, '、').replace(/(.*)、/, '$1 和 ') + ' 发表于 ' + this.project.conference + ' ' + this.project.year;
                } else {    // 默认en
                    return 'by ' + authors.replace(/(.*),/, '$1 and ') + ' Published on ' + this.project.conference + ' ' + this.project.year;
                }
            }
        },
        methods: {
            compiledMarkdown: function(val) {
                return marked(val,  { sanitize: false })
            },
            goProjectPost(slug) {
                this.$api.post.getProjectPost(slug)
                    .then(response => {
                        const data = response.data.data;
                        this.project = data.project;
                        this.code = data.code;
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                    });
            }
        },
        watch: {
            '$store.state.lang': function () {
                this.goProjectPost(this.slug)
            }
        }
    }

</script>

<style scoped lang="scss">

    .container {
        margin: 50px auto 100px;
        padding: 0 40px;
        min-height: 90vh;
    }

    .project-img {
        margin: 50px auto;
    }

    .post-footer {
        display: flex;
        justify-content: space-between;
        .pdf-link {
            a {
                font-weight: bold;
                color: rgb(92,125,157);
            }
        }
        small {
            opacity: .7;
        }
    }

</style>
