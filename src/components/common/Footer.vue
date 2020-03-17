<template>

    <footer class="web-info">
        <div class="visitor">
            <b-icon-person class="h5 icon"/>
            <small>: {{ pv }}</small>
        </div>
        <div>
            <p>Copyright &copy; Container Community 2019</p>
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
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        padding: 20px;
        background-color: rgb(247, 251, 253);
        div {
            margin: auto 20px;
            p {
                display: inline-block;
                margin: auto;
                font-family: Lato, sans-serif;
            }
        }
    }

    p, .visitor {
        color: #666666;
        white-space: pre;
    }

    .visitor {
        display: flex;
        align-items: center;
        position: relative;
        .icon {
            position: absolute;
            top: -1px;
            left: -20px;
        }

    }

</style>
