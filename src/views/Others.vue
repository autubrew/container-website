<template>

    <div>

        <Header/>
        <CommunityList/>

    </div>

</template>

<script>

    import Header from "@/components/others/Header";
    import CommunityList from "@/components/others/CommunityList";

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
