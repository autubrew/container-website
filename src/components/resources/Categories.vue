<template>

    <div>
        <div v-for="(categoryItem, categoryKey, categoryIndex) in categoryList" :key="categoryIndex">
            <h4>{{ $t(categoryKey) }}</h4>
            <b-list-group>
                <b-list-group-item v-for="(item, index) in categoryItem" :key="index" :to="`/resources/${categoryKey}/${item[categoryKey]}/page/1`">
                    {{ item[categoryKey+"Name"] }} ({{ item.count }})
                </b-list-group-item>
            </b-list-group>
            <hr/>
        </div>
    </div>

</template>

<i18n>
    en:
        year: "YEAR"
        tag: "TAG"
        conference: "CONFERENCE"
    zh-CN:
        year: "年份"
        tag: "标签"
        conference: "会议"
</i18n>

<script>

    export default {
        name: "Categories",
        data() {
            return {
                categoryList: []
            }
        },
        created() {
            this.getCategoryList();
        },
        methods: {
            // 获取分类列表
            getCategoryList() {
                this.$api.resources.getResourcesCategoryList()
                    .then(response => {
                        const data = response.data.data;
                        this.categoryList = data.categoryList;
                        for(const key in this.categoryList) {
                            if(!this.categoryList.hasOwnProperty(key)) continue;
                            let keyGroup = this.categoryList[key];
                            switch (key) {
                                case 'year':
                                    keyGroup.sort((a, b) => { return b.year - a.year; });
                                    break;
                                case 'conference':
                                    keyGroup.sort((a, b) => { return a.conference > b.conference; });
                                    break;
                                case 'tag':
                                    keyGroup.sort((a, b) => { return a.tag > b.tag; });
                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
                    .finally(() => {
                    })
            }
        },
        watch: {
            '$store.state.lang': function () {
                this.getCategoryList()
            }
        }
    }
</script>

<style scoped lang="scss">

    $color-resources-category-list: rgb(70,130,180);

    h4 {
        font-size: 1.4rem;
    }
    a {
        display: block;
        padding: 5px 0;
        border: none;
        color: $color-resources-category-list;
        opacity: .85;
        font-size: 16px;
        font-weight: bold;
        line-height: 28px;
        &:hover{
            color: $color-resources-category-list;
            opacity: 1;
            background-color: transparent;
        }
    }

</style>
