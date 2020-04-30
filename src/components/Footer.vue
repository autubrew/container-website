<template>

    <footer class="web-info">
        <div class="row-1">
            <a href="https://github.com/CGCL-codes" target="_blank">
                <svg-icon icon-class="github" width="32px" height="32px"/>
            </a>
        </div>
        <div class="row-2">
            <div class="views">
                <b-icon-person shift-v="-3" class="h5 icon"/> <small>: {{ pv }}</small>
            </div>
            <div>
                <p>Copyright &copy; Container Community {{ new Date().getFullYear() }}</p>
            </div>
        </div>
    </footer>

</template>

<script>

    export default {
        name: "WebInfo",
        data() {
            return {
                pv: ''
            }
        },
        created() {
            this.getSitePV()
        },
        methods: {
            getSitePV() {
                this.$api.views.getSitePV()
                    .then(response => {
                        const data = response.data.data;
                        this.pv = data.pv
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

    .web-info {
        padding: 10px;
        background-color: rgb(247, 251, 253);
        color: #555555;
    }

    .row-1, .row-2 {
        display: flex;
        justify-content: center;
        margin: 8px 0;
    }

    .row-2 {
        flex-wrap: wrap;
        div {
            margin: 0 10px;
        }
        .views {
            small {
                position: relative;
                top: -5px;
            }
        }
    }

</style>
