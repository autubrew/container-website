<template>

    <b-container class="project-overview">
        <b-row class="justify-content-center">
            <b-col xm="10" sm="10" md="10" lg="10" xl="10">
                <h4>{{ $t('title') }}</h4>
                <p>{{ $t('description') }}</p>
            </b-col>
        </b-row>
    </b-container>

</template>

<i18n>
    en:
        title: "An Overview of Our Projects"
        description: "Container technology has gained great popularity since containers could provide near-native performance in cloud environment. Compared to virtual machines, containers are lighter and less expensive. Currently, container technology has been widely adopted by industry.In recent years, we have been closely paying attention to the development of container technology. We have also done a lot of related work in the container field, including view isolation of containers, network isolation of containers and rapid construction of containers etc. These work are listed below. If you have interest in our research, please read the following carefully."
    zh-CN:
        title: "项目概述"
        description: "由于容器可以在云环境中提供近乎原声的性能，容器技术变得越来越火。与虚拟机相比，容器更轻量且开销更小。当前，容器技术已被工业接界认可并广泛采用。近年来，我们一直在密切关注着容器技术的发展。我们在容器领域也做了很多相关有意思的工作，包括容器的视图隔离，容器的网络隔离以及容器的快速构建等。这些工作会在下面列出，如果您对我们的工作感兴趣，请仔细阅读下面的内容。"
</i18n>

<script>

    export default {
        name: "Overview"
    }

</script>

<style scoped lang="scss">

    .project-overview {
        padding: 50px 2rem 20px;
        border-bottom: 1px solid $color-split-line;
        h4 {
            font-size: 1.5rem;
        }
        p {
            font-size: 18px;
        }
    }

</style>
