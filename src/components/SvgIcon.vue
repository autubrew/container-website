<template>

    <svg :class="svgClass" :width="width" :height="height" aria-hidden="true">
        <use :href="iconName"/>
    </svg>

</template>

<script>

    export default {
        name: 'SvgIcon',
        props: {
            iconClass: {
                type: String,
                required: true
            },
            className: {
                type: String,
                default: ''
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: 'auto'
            }
        },
        computed: {
            iconName() {
                return `#icon-${this.iconClass}`
            },
            svgClass() {
                return 'svg-icon' + (this.className ? ' ' + this.className : '');
            }
        }
    }

</script>

<style scoped lang="scss">

    .svg-icon {
        fill: currentColor;
        overflow: hidden;
    }

</style>