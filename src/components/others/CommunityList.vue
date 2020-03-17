<template>

    <b-container>
        <b-row class="community-list">
            <b-col class="community-list-item" xm="12" sm="12" md="4" lg="4" xl="4" v-for="(item, index) in communities" :key="index">
                <CommunityCard v-bind="item"  v-bind:intro="$t(item.name)"/>
            </b-col>
        </b-row>
    </b-container>

</template>

<!-- TODO：部分翻译修改 -->
<i18n>
    en:
        moby: "Moby is an open framework created by Docker to assemble specialized container systems without reinventing the wheel."
        kubernetes: "Kubernetes is an open-source container-orchestration system for automating application deployment, scaling, and management."
        containerd: "An industry-standard container runtime with an emphasis on simplicity, robustness and portability."
        rkt: "Rkt is a pod-native container engine for Linux. It is composable, secure, and built on standards."
        gVisor: "A container sandbox runtime focused on security, efficiency, and ease of use."
        cri-o: "Open Container Initiative-based implementation of Kubernetes Container Runtime Interface."
        docker: "Docker is a set of platform-as-a-service products that use OS-level virtualization to deliver software in packages called containers."
        OCI: "Creating open standards around container technology."
        mesos: "Apache Mesos abstracts CPU, memory, storage, and other compute resources away from machines."
    zh-CN:
        moby: "Moby是一个由Docker公司创建的组装专门容器系统的开源框架，避免了重复造轮子。"
        kubernetes: "Kubernetes是一个用于自动化应用程序部署、扩展和管理的开源容器编排系统。"
        containerd: "一个强调简单性、健壮性和可移植性的行业标准容器运行时。"
        rkt: "rkt是一个用于Linux的pod-native容器引擎。它是可组合的、安全的和基于标准的。"
        gVisor: "一个集安全性、高效性和易用性于一身的容器沙箱运行时。"
        cri-o: "基于开放容器初始化的Kubernetes容器运行时接口实现。"
        docker: "Docker是一组平台即服务（Paas）产品，它使用操作系统级虚拟化以称为容器的软件包来交付软件。"
        OCI: "围绕容器技术创建开放标准。"
        mesos: "Apache Mesos将CPU、内存、存储和其他计算资源从机器中抽象出来。"
</i18n>

<script>

    import CommunityCard from "@/components/others/CommunityCard";

    export default {
        name: "CommunityList",
        components: {
            CommunityCard
        },
        data() {
            return {
                communities: [
                    { name: 'moby', link: 'https://mobyproject.org/', logoLink: require(`../../assets/img/communities/moby-logo.svg`)},
                    { name: 'kubernetes', link: 'https://kubernetes.io/', logoLink: require(`../../assets/img/communities/kubernetes-logo.svg`)},
                    { name: 'containerd', link: 'https://containerd.io', logoLink: require(`../../assets/img/communities/containerd-logo.svg`)},
                    { name: 'rkt', link: 'https://coreos.com/rkt/', logoLink: require(`../../assets/img/communities/rkt-logo.svg`)},
                    { name: 'gVisor', link: 'https://gvisor.dev/', logoLink: require(`../../assets/img/communities/gVisor-logo.svg`)},
                    { name: 'cri-o', link: 'https://cri-o.io/', logoLink: require(`../../assets/img/communities/crio-logo.svg`)},
                    { name: 'docker', link: 'https://www.docker.com/', logoLink: require(`../../assets/img/communities/docker-logo.svg`)},
                    { name: 'OCI', link: 'https://www.opencontainers.org/', logoLink: require(`../../assets/img/communities/OCI-logo.svg`)},
                    { name: 'mesos', link: 'http://mesos.apache.org/', logoLink: require(`../../assets/img/communities/mesos-logo.svg`)}
                ]
            }
        }
    }

</script>

<style scoped lang="scss">

    .community-list {
        display: flex;
        flex-wrap: wrap;
        margin: 50px auto 100px;
    }

    .community-list-item {
        border-bottom: 1px solid #cccccc;
        &:hover {
            background-color: rgb(246, 246, 255);
        }
        transition: all .3s;
    }

</style>