<template>

    <b-container class="page-404" fluid>
        <b-row class="text-center">
            <b-col>
                <h1>404</h1>
                <p>Page not found</p>
                <p>back to <b-link to="/">homepage</b-link> in {{ count }} seconds . . .</p>
            </b-col>
        </b-row>
    </b-container>
    
</template>

<script>

    export default {
        name: "error404",
        data() {
            return {
                timer: null,
                count: 5
            }
        },
        created() {
            this.countDown()
        },
        methods: {
            countDown() {
                this.count = 5;
                this.timer = setInterval(() => {
                    this.count--;
                    if(this.count === 0) {
                        clearInterval(this.timer);
                        this.$router.push({path: '/'})
                    }
                    // 若提前转至其他页面，则取消计时
                    if(this.$route.name !== 'error-404' && this.count > 0) {
                        clearInterval(this.timer);
                    }
                }, 1000)
            }
        }
    }

</script>

<style scoped lang="scss">

    .page-404 {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 150px;
        height: 100vh;
        background-color: rgb(241, 241, 241);
        h1 {
            font-size: 5rem;
            color: #555555;
        }
        p {
            font-size: 20px;
            font-family: $font-family-sans-serif;
            color: rgb(120, 120, 120);
        }
    }

</style>