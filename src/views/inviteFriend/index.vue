<template>
    <div>
        <comHeader :routes="routes" primary-button="新增" @primary="primary(1)"></comHeader>
        <div class="searchDiv">
            <modelForm v-model='postData[item.key]' :size="item.size" :width='item.width' :key='item.key' :title='item.title' :items="getItems(item)" :type='item.type'
        v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
            <div class="searchBTn">
                <a-button type="primary" class="searchQuery" @click="queryList(1)">查詢</a-button>
                <a-button @click="reQueryList">清除</a-button>
            </div>
        </div>
        <div class="tab">
            <div class="tab_left">
                <div class="info_list" :class="{'is_select':is_chose==1}" @click="chose_list(1)">列表清單</div>
                <div class="modify_list" :class="{'is_select':is_chose==2}" @click="chose_list(2)">修改記錄</div>
            </div>
            <div class="tab_right">
                <div class="add_access">新增</div>
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
                    path: "inviteFriend",
                    breadcrumbName: "CMS內容管理"
                },
            ...obj.path
            ],
            postData: {},
            is_chose:1,//選擇tab
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
        chose_list(index) {
            this.is_chose = index
        },
        getItems(item){
            console.log(item)
        },
        primary(value) {
            console.log(value)
        },
        queryList (type) {
            console.log(type)
        },
        reQueryList() {
            Object.entries(this.postData).forEach(([key, value], index) => {
                this.postData[key] = ''
            })
        },
        createdSearch() {
            let { columns, searchArr, changeArr } = obj;
            this.columns = columns;
            this.searchArr = searchArr;
            this.changeArr = changeArr;
            searchArr.forEach((item,index) => {
                this.$set(this.postData, item.key, undefined)
            })
            changeArr.forEach(item => {
                this.$set(this.changeData, item.key, undefined)
            })
        }
    },
    created () {
        this.createdSearch()
    }
}
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
