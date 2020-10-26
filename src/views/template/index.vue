<template>
  <div>
    <comHeader :routes="routes" primary-button="" @primary="primary(1)"></comHeader>
    <div class="searchDiv">
      <modelForm v-model='postData[item.key]' :key='item.key' :title='item.title' :items='item.items' :type='item.type'
        v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
      <div class="searchBTn">
        <a-button type="primary" class="searchQuery" @click="queryList">查詢</a-button>
        <a-button @click="reQueryList">清除</a-button>
        <a-button type="primary" class="searchQuery" @click="output">匯出</a-button>
      </div>
    </div>
    <tableColumn :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
      <span slot="operation" slot-scope="props">
        <a-button @click="givePower(props.record)">詳情</a-button>
      </span>
    </tableColumn>

  </div>
</template>
<script>
  import obj from './viewData.js'
  import {tempetDownLoad} from '@/common/common'
  export default {
    name: "template",
    components: {},
    watch: {
      pageInfo: {
        handler: function(value) {
          this.queryList()
        },
        deep: true
      },
      postData: {
        handler: function(value) {
          console.log(value)
        },
        deep: true
      },
    },
    data() {
      return {
        changeArr: [],
        searchArr: [],
        totalNum: 0,
        postData: {},
        pageInfo: {
          current: 1, //当前页数
          pageSize: 10, //每页条数
        },
        isAdd: true,
        routes: [
          // 面包屑数据
          {
            path: "MenuContent",
            breadcrumbName: "系統管理"
          },
          ...obj.path

        ],
        columns: [], //表头
        RoleCode: '',
        columnsData: [], //表格信息
      };
    },
    methods: {
      output() {
        tempetDownLoad('exportSysUsers', this.postData)
      },
      givePower(obj){
      },
      queryList() {
        let tep = this.postData;
         tep = Object.assign(this.postData,this.pageInfo)
        this.Axios('selectListPage',tep)
        .then((res) => {
            this.columnsData = res.data.data.list;
            this.totalNum = res.data.data.total
        })
      },

      reQueryList() {
        Object.entries(this.postData).forEach(([key, value], index) => {
          this.postData[key] = ''
        })
        this.queryList()
      },
      createdSearch() {
        let {
          columns,
          searchArr,
          changeArr
        } = obj;
        this.columns = columns;
        this.searchArr = searchArr;
        this.changeArr = changeArr;
        searchArr.forEach(item => {
          this.$set(this.postData, item.key, undefined)
        })
        changeArr.forEach(item => {
          this.$set(this.changeData, item.key, undefined)
        })

      }
    },
    created() {
      this.createdSearch()
      this.queryList()
    },
    activated() {
    }
  };
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
