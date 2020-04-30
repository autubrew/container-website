<template>

    <div>
        <Header v-show="isDisplay"/>
        <Overview v-show="isDisplay"/>
        <router-view/>
    </div>


</template>

<script>

    import Header from "@/views/projects/components/Header";
    import Overview from "@/views/projects/components/Overview";

    export default {
        name: "Projects",
        components: {
            Header,
            Overview
        },
        computed: {
            isDisplay: function () {
                return this.$route.name !== 'projects-post'
            }
        }
    }

</script>

<style scoped>

</style>
