<template>

    <b-container>
        <b-row class="banner">
            <div class="banner-body">
                <h2>{{ $t('title') }}</h2>
                <p>{{ $t('introduction') }}</p>
            </div>
        </b-row>
        <b-row class="introduction">
            <b-col xm="12" sm="12" md="4" lg="4" xl="4" v-for="(item, index) in cardsList" :key="index">
                <b-card>
                    <b-card-header>
                        <svg-icon :icon-class="item.svgName"/>
                    </b-card-header>
                    <b-card-body>
                        <h5>{{ $t(item.h) }}</h5>
                        <p>{{ $t(item.p) }}</p>
                    </b-card-body>
                </b-card>
                <hr>
            </b-col>
        </b-row>
        <b-row class="about">
            <div class="about-us">
                <h2>{{ $t('about_title') }}</h2>
                <p v-html="$t('about_introduction')"/>
            </div>
        </b-row>
    </b-container>

</template>

<i18n>
    en:
        title: "Welcome to Container Community"
        introduction: "A platform of sharing news, resources and our projects about containers"
        project_title: "Team project"
        project_introduction: "Our research work including view isolation of containers, network isolation of containers and rapid construction of containers etc."
        resource_title: "Resource recommendation"
        resource_introduction: "The latest articles and resources on container security, image management, container network, container I/O etc."
        plan_title: "Open source plan"
        plan_introduction: "In the near future, we will integrate our container projects and open source them."
        about_title: "About us"
        about_introduction: >
            "We are the container team from <a href="http://grid.hust.edu.cn/index.htm" target="_blank"> Laboratory of Cluster and Grid Computing(CGCL)</a>, Huazhong University of Science and Technology. We have done a lot of research work in the field of containers. In the future, we will post more research work of our team to jointly promote the development of container technology."
    zh-CN:
        title: "欢迎来到容器社区"
        introduction: "一个分享有关容器新闻、资源和我们所做的容器相关工作的平台"
        project_title: "团队项目"
        project_introduction: "我们的研究工作包含了容器的视图隔离，容器的网络隔离以及容器的快速构建等内容。"
        resource_title: "资源推荐"
        resource_introduction: "有关容器安全性，映像管理，容器网络，容器I / O等的最新文章和资源。"
        plan_title: "开源计划"
        plan_introduction: "在不久的将来，我们会整合我们在容器方面所做的工作，并将之开源以共同推动容器技术的发展。"
        about_title: "我们是谁"
        about_introduction: >
            "我们是来自<a href="http://grid.hust.edu.cn/index.htm" target="_blank">华中科技大学集群与网格计算实验室(CGCL)</a>的容器团队，我们已经在容器领域做了很多研究工作。将来，我们会在此平台发布更多我们团队的容器最新研究进展，让我们一起携手推动容器技术的繁荣与发展。"
</i18n>

<script>

    export default {
        name: "Home",
        data() {
            return {
                cardsList: [
                    { h: 'project_title', p: 'project_introduction', svgName: 'project'},
                    { h: 'resource_title', p: 'resource_introduction', svgName: 'resource'},
                    { h: 'plan_title', p: 'plan_introduction', svgName: 'plan'}
                ]
            }
        }
    }

</script>

<style scoped lang="scss">

    .banner {
        padding-top: 20vh;
        width: 100%;
        height: 92vh;
        background: linear-gradient(to right, #ffffff, #f8f8ff, #ffffff);
        .banner-body {
            margin: auto;
            height: 450px;
        }
        h2, p {
            display: block;
            margin: 50px auto;
            text-align: center;
        }
        h2 {
            font-size: 2.8em;
            color: rgb(70, 70, 70);
        }
        p {
            font-size: 1.5em;
            color: rgb(100, 100, 100);
        }
        a {
            display: block;
            position: absolute;
            bottom: 0;
            width: 100%;
            color: rgb(120, 120, 120);
            .angle-down {
                display: block;
                margin: auto;
                cursor: pointer;
            }
        }
    }

    .introduction {
        margin: 50px 0;
        padding: 0;
        .card {
            height: auto;
            min-height: 450px;
            border: none;
            border-radius: 0;
            .card-header {
                background: transparent;
                border: none;
                &::after {
                    display: inline-block;
                    position: relative;
                    bottom: -20px;
                    left: 30%;
                    content: '';
                    height: 5px;
                    width: 38%;
                    background-color: rgb(176, 196, 222);
                }
            }
            .card-body {
                padding: 30px 10px 10px;
                h5 {
                    text-align: center;
                }
            }
        }
    }

    .about {
        padding: 50px 30px 100px;
    }

    p {
        font-family: $font-family-sans-serif;
        letter-spacing: 0;
    }

</style>
