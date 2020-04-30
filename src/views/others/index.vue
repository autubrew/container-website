<template>

    <div>
        <Header/>
        <CommunityList/>
    </div>

</template>

<script>

    import Header from "@/views/others/components/Header";
    import CommunityList from "@/views/others/components/CommunityList";

    export default {
        name: "Others",
        components: {
            Header,
            CommunityList
        }
    }

</script>

<style scoped>

</style>
