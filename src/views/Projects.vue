<template>

    <div>
        <Header v-show="isDisplay"/>
        <Overview v-show="isDisplay"/>
        <router-view/>
    </div>


</template>

<script>

    import Header from "@/components/projects/Header";
    import Overview from "@/components/projects/Overview";

    export default {
        name: "Projects",
        components: {
            Header,
            Overview
        },
        computed: {
            isDisplay: function () {
                return this.$route.name !== 'route-projects-post'
            }
        }
    }

</script>

<style scoped>

</style>
