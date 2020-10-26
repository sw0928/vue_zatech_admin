<template>
  <div>
    <comHeader :routes="routes" primary-button="" @primary="primary(1)"></comHeader>
    <div class="searchDiv">
      <!-- {{goodsList}} -->
      <modelForm v-model='postData[item.key]' :size="item.size" :width='item.width' :key='item.key' :title='item.title' :items="getItems(item)" :type='item.type'
        v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
      <div class="searchBTn">
        <a-button type="primary" class="searchQuery" @click="queryList(1)">查詢</a-button>
        <a-button @click="reQueryList">清除</a-button>
        <a-button type="primary" class="searchQuery" @click="output">匯出</a-button>
      </div>
    </div>

    <tableColumn :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
      <span slot="operation" slot-scope="props">
        <a-button @click="toDetail(props.record.orderNo)">投保內容</a-button>
      </span>
    </tableColumn>

  </div>
</template>
<script>
  import obj from './viewData.js'
  import {tempetDownLoad} from '@/common/common'
  export default {
    name: "allInsure",
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
      "postData.DateRange": {
        handler: function(value) {
          try{
             this.postData.orderDateStart = value.split(',')[0]
            this.postData.orderDateEnd = value.split(',')[1]
          }catch(e){
            //TODO handle the exception
          }

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
            breadcrumbName: "交易資料查詢"
          },
          ...obj.path

        ],
        columns: [], //表头
        RoleCode: '',
        columnsData: [], //表格信息
      };
    },
    methods: {
      getItems(item){
        // console.error(this.goodsList)
        if(item.key == 'goodsId'){
           return this.goodsList
        }else if(item.key == 'orderStatus'){
          return this.orderStatusEnum
        }else{
          return item.items
        }
      },
      toDetail(value){
        this.$router.push({
        	name: 'insureDetail',
        	query: {
            orderNo: value,
            menu:'allInsure'
        	}
        });
      },
      output() {
        tempetDownLoad('exportOrders', this.postData,'所有投保紀錄報表')
      },
      givePower(obj){
      },
      queryList(index) {

        let tep = this.postData;
        console.log(tep,'tpe')
        if(index == 1){
          this.pageInfo.current = 1
        }
        tep = Object.assign(this.postData,this.pageInfo)
        this.Axios('listOrders',tep)
        .then((res) => {
            this.columnsData = res.data.data.list;
            this.totalNum = res.data.data.total
        })
      },
      reQueryList() {
        Object.entries(this.postData).forEach(([key, value], index) => {
          this.postData[key] = ''
        })
        // this.pageInfo.current = 1
        // this.queryList()
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
        searchArr.forEach((item,index) => {
          this.$set(this.postData, item.key, undefined)
        })
        changeArr.forEach(item => {
          this.$set(this.changeData, item.key, undefined)
        })
      }
    },
    computed:{
      goodsList(){
        return this.$store.state.customer.goodsList
      },
      orderStatusEnum(){
        return this.$store.state.customer.orderStatusEnum
      }
    },
    created() {

      this.createdSearch()
      // this.queryList()
    },
    activated() {
    }
  };
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
