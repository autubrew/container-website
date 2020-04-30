<template>

    <div id="containeros">
        <vue-progress-bar/>
        <component :is="currentLayout"></component>
    </div>

</template>

<script>

    export default {
        name: 'app',
        computed: {
            currentLayout() {
                return (this.$route.meta.layout || 'default') + '-layout';
            }
        }
    }

</script>

<style lang="scss">

    body {
        font-family: $font-family-global;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: $font-family-title;
        font-weight: bold !important;
        margin-bottom: 1rem !important;
        outline: none;
    }

    p {
        font-family: $font-family-content;
        font-size: inherit;
        line-height: 28px;
        letter-spacing: .01em;
        margin-bottom: 1rem;
        text-rendering: optimizeLegibility;
    }

    small {
        font-family: $font-family-sans-serif;
    }

    a {
        color: $color-link !important;
        &:hover {
            text-decoration: none !important;
            opacity: .8;
        }
        &:focus {
            outline: none;
        }
    }

    button {
        &:focus {
            outline: none;
        }
    }

    img {
        width: 100%;
        height: auto;
    }

</style>
