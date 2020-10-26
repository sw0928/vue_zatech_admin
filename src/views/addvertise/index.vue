<template>
    <div>
        <comHeader :routes="routes" primary-button="新增" @primary="primary(1)"></comHeader>
        <div class="searchDiv">
            <modelForm v-model='postData[item.key]' :size="item.size" :regular='item.regular' :key='item.key' :title='item.title' :items='item.items'
                :type='item.type' v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
            <div class="searchBTn">
                <a-button type="primary" class="searchQuery" @click="queryList(1)">查詢</a-button>
            </div>
        </div>
        <tableColumn :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
            <span slot="operation" slot-scope="props">
                <a-button @click="edit(props.record)">修改</a-button>
                <a-button @click="del(props.record)">删除</a-button>
            </span>
        </tableColumn>
    </div>
</template>
<script>
import obj from './viewData.js'
export default {
    data () {
        return {
            searchArr: [],
            items: [],
            routes: [
                {
                    path: "Addvertise",
                    breadcrumbName: "广告管理"
                },
            ...obj.path
            ],
            columns: [],
            columnsData: [{name0: 1, name1: 2, name2: 2}],
            totalNum: 0,
            pageInfo: {
                current: 1, //当前页数
                pageSize: 10, //每页条数
            },
        }
    },
    methods: {
        primary(value) {
            console.log(value)
        },
        queryList (type) {
            console.log(type)
        }
    }
}
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
