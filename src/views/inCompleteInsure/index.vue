<template>
  <div>
    <comHeader :routes="routes" primary-button="" @primary="primary(1)"></comHeader>
    <div class="searchDiv">
      <modelForm v-model='postData[item.key]' :size="item.size" :width='item.width' :key='item.key' :title='item.title' :items="getItems(item)" :type='item.type'
        v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
      <div class="searchBTn">
        <a-button type="primary" class="searchQuery" @click="queryList(1)">查詢</a-button>
        <a-button @click="reQueryList">清除</a-button>
      </div>
    </div>
    <tableColumn :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
      <span slot="operation" slot-scope="props">
        <a-button @click="givePower(props.record)">檢核訊息</a-button>
        <a-button @click="toDetail(props.record.orderNo)">投保內容</a-button>
      </span>
    </tableColumn>
    <a-modal :width='700' title="檢核訊息" :visible="isShowChange" @cancel="isShowChange = false">
      <template slot="footer">
        <!-- {{isAdd}} -->
        <a-button key="back" @click="isShowChange = false">關閉</a-button>
        </a-button>
      </template>


          <div class="no_info" v-if="orderCheckRecordDTOS==false">無檢核訊息</div>

      <div id="add" v-else>
        <div class="titiit">
          <span>
            投保頁面： <span>{{pageName}}</span>
          </span>
          <span>
            顯示日期/時間： <span>{{time}}</span>
          </span>
        </div>
				<!-- <div class="titiit">
					<span>
					  不可繼續投保： <span>是</span>
					</span>
				</div> -->
        <div class="someTableDiv">
          <!-- <div class="no_info" v-if="orderCheckRecordDTOS==false">無檢核訊息</div> -->
          <table class="someTable thisTablle" >
            <tr>
              <th>客戶訊息</th>
              <th>後台訊息</th>
            </tr>
            <tr :key="index" v-for="(item,index) in orderCheckRecordDTOS" class="comTr">
              <td class="title1">{{item.checkFaceMsg}}</td>
              <td class="content1">{{item.checkMsg}}</td>
            </tr>
          </table>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import obj from './viewData.js'
  import {tempetDownLoad} from '@/common/common'
  export default {
    name: "inCompleteInsure",
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
      isShowChange: {
        handler: function(value) {
          if (!value){
              this.orderCheckRecordDTOS= [];
              this.pageName= ''
              this.time = ''
          }
        },
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
        isShowChange: false,
        orderCheckRecordDTOS: [],
        pageName: '',
        time: ''
      };
    },
    computed:{
      goodsList(){
        return this.$store.state.customer.goodsList
      }
    },
    methods: {
      getItems(item){
        return item.key == 'goodsId' ? this.goodsList : item.items
      },
      toDetail(value){
        this.$router.push({
        	name: 'insureDetail',
        	query: {
            orderNo: value,
            menu:'inCompleteInsure'
        	}
        });
      },
      changeOk(){

      },
      output() {
        tempetDownLoad('exportSysUsers', this.postData,'未完成保單')
      },
      givePower(obj) {
				console.log(obj)
        try{
          // this.time = obj.checkTimeStr.split(' ')[0]
          // alert(obj.checkTimeStr)
          this.time = obj.checkTimeStr
        }catch(e){
          //TODO handle the exception
          console.log(e)
        }

        this.isShowChange = true;
        this.Axios('getOrderChecKRecord',obj)
        .then((res) => {
          let {pageName,orderCheckRecordDTOS} = res.data.data
            this.pageName = pageName
            this.orderCheckRecordDTOS = orderCheckRecordDTOS

        })
      },
      queryList(index) {
        let tep = this.postData;
        if(index == 1){
          this.pageInfo.current = 1
        }
         tep = Object.assign(this.postData,this.pageInfo)
        this.Axios('listOrderExcludePolicy',tep)
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
  @import "../insureDetail/index.scss";
</style>
