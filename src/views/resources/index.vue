<template>

    <div>
        <Header/>
        <b-container class="container" fluid>
            <b-row>
                <b-col sm="12" md="12" lg="9" xl="9">
                    <router-view/>
                </b-col>
                <b-col sm="12" md="12" lg="3" xl="3">
                    <Categories/>
                </b-col>
            </b-row>
        </b-container>
    </div>

</template>

<script>

    import Header from "@/views/resources/components/Header";
    import Categories from "@/views/resources/components/Categories";

    export default {
        name: "Resources",
        components: {
            Header,
            Categories,
        }
    }

</script>

<style scoped lang="scss">

    .container {
        padding: 0;
        min-height: 500px;
    }

    .row {
        margin: 50px 2%;
    }


</style>
