<template>
  <div>
    <comHeader
      :routes="routes"
      primary-button=""
      @primary="primary(1)"
    ></comHeader>
    <div class="searchDiv">
      <!-- {{goodsList}} -->
      <modelForm
        v-model="postData[item.key]"
        :size="item.size"
        :width="item.width"
        :key="item.key"
        :title="item.title"
        :display="item.display"
        :items="getItems(item)"
        :type="item.type"
        v-for="item in searchArr"
        class="comDiv"
        :isAutoPlacehoder="false"
      ></modelForm>
      <div class="searchBTn">
        <a-button type="primary" class="searchQuery" @click="queryList(1)"
          >查詢</a-button
        >
        <a-button @click="reQueryList">清除</a-button>
        <!-- <a-button type="primary" class="searchQuery" @click="output">匯出</a-button> -->
      </div>
    </div>

    <tableColumn
      :columns="columns"
      :columnsData="columnsData"
      :pageInfo="pageInfo"
      :totalNum="totalNum"
      :openExpand="false"
    >
      <span slot="operation" slot-scope="props">
        <a-button
          @click="toDetail(props.record, 1)"
          v-show="props.record.auditorStatus == 1"
          >審核</a-button
        >
        <!-- <div v-show="props.record.auditorStatus !== 1" style="width:50px;display:inline-block;height:2px"></div> -->
				<!-- :style="[
				  { marginLeft: props.record.auditorStatus !== 1 ? '65px' : '0' }
				]" -->
        <a-button
          @click="toDetail(props.record, 2)"
					v-show="props.record.auditorStatus != 1"          
          >明細</a-button
        >
      </span>
    </tableColumn>
  </div>
</template>
<script>
import obj from "./viewData.js";
import Bus from '@/common/bus.js';
import { tempetDownLoad } from "@/common/common";
export default {
  name: "accessCeck",
  components: {},
  watch: {
    pageInfo: {
      handler: function(value) {
        this.queryList();
      },
      deep: true
    },
 postData: {
      handler: function(value) {
        this.$nextTick(() => {
          if (value.channelName !== undefined) {
            this.channelList.map(item => {
              if (value.channelName == item.channelName) {
                this.postData.channelCode = item.channelCode;
              }
            });
          }
        });
      },
      deep: true
    },
    "postData.DateRange": {
      handler: function(value) {
        try {
          this.postData.orderDateStart = value.split(",")[0];
          this.postData.orderDateEnd = value.split(",")[1];
        } catch (e) {
          //TODO handle the exception
        }
      },
      deep: true
    }
  },
  data() {
    return {
      changeArr: [],
      searchArr: [],
      channelList: [], //通路代碼
      totalNum: 0,
      postData: {},
      pageInfo: {
        current: 1, //当前页数
        pageSize: 10 //每页条数
      },
      isAdd: true,
      routes: [
        // 面包屑数据
        {
          path: "accessQuery",
          breadcrumbName: "通路管理"
        },
        ...obj.path
      ],
      columns: [], //表头
      RoleCode: "",
      columnsData: [] //表格信息
    };
  },
  methods: {
    getItems(item) {
      return item.items;
    },
    toDetail(value, index) {
      console.log(value, "222");
      let props = value;
      if (index == 1) {
        let postArr = [
          {
            title: "通路名稱",
            type: "span",
            key: "orderNo",
            size: 10,
            value: props.channelName,
            items: ""
          },
          {
            title: "通路代碼",
            type: "span",
            key: "orderNo",
            size: 10,
            value: props.channelCode,
            items: ""
          },
          {
            title: "合作開始時間",
            type: "span",
            key: "DateRange",
            value: props.grantBegStr
          },
          {
            title: "合作結束時間",
            type: "span",
            key: "DateRange",
            value: props.grantEndStr
          },
          {
            title: "Agent Code",
            type: "span",
            key: "orderNo",
            size: 10,
            value: props.agentCode,
            items: ""
          },
          {
            is_null: "is_null"
          },
          {
            title: "資料交換聲明名稱",
            type: "span",
            key: "orderNo",
            size: 10,
            value: props.title,
            items: ""
          },
          {
            title: "資料交換聲明內容",
            type: "span",
            key: "orderNo",
            showHtml:'show',
            size: 10,
            value: props.content,
            items: ""
          }
        ];
        this.$popup({
          title: "審核通路",
          show_table: "show",
          content: props.auditorStatusStr,
          inner: "aq",
          showHtml:true,
          postArr: postArr,
					columns:[],
					columnsData:undefined,
					tableTitle:undefined,
					padding:undefined,
					width:undefined,
					is_content1:undefined,
					is_content2:undefined,
          examin: "1",
          is_content: 1,
          applyId: props.applyId,
          btnText: "確定"
        });
      } else if (index == 2) {
        let postArr = [
          {
            title: "通路名稱",
            type: "span",
            key: "orderNo",
            size: 10,
            value: props.channelName,
            items: ""
          },
          {
            title: "通路代碼",
            type: "span",
            key: "orderNo",
            size: 10,
            value: props.channelCode,
            items: ""
          },
          {
            title: "合作開始時間",
            type: "span",
            key: "DateRange",
            value: props.grantBegStr
          },
          {
            title: "合作結束時間",
            type: "span",
            key: "DateRange",
            value: props.grantEndStr
          },
          {
            title: "Agent Code",
            type: "span",
            key: "orderNo",
            size: 10,
            value: props.agentCode,
            items: ""
          },
          {
            is_null: "is_null"
          },
          {
            title: "資料交換聲明名稱",
            type: "span",
            key: "title",
            size: 10,
            // needblock:true,
            width: "100%",
            value: props.title,
            items: ""
          },
          {
            title: "資料交換聲明內容",
            type: "span",
            showHtml:'show',
            key: "content",
            width: "100%",
            value: props.content,
            items: ""
          },
          {
            title: "審核狀態",
            type: "span",
            key: "orderNo",
            width: "100%",
            value: props.auditorStatusStr,
            items: ""
          },
          {
            title: "審核備註",
            type: "span",
            key: "orderNo",
            width: "100%",
            value: props.auditorDescribe,
            items: ""
          }
        ];
        this.$popup({
          title: "通路申請明細",
          inner: "aq",
          padding: "40px",
					content: undefined,
					columns:[],
					columnsData:undefined,
					tableTitle:undefined,
					examin:undefined,
					padding:undefined,
					show_table:undefined,
					is_content1:undefined,
					is_content2:undefined,
          postArr: postArr,
          // examin: "1",
          is_content: 1,
          width: "60%",
          btnText: "返回"
        });
      }
    },
    output() {
      tempetDownLoad("exportOrders", this.postData, "所有投保紀錄報表");
    },
    givePower(obj) {},
    queryList(index) {
      let tep = this.postData;
      tep.type = "list";
      console.log(tep, "tpe");
      if (index == 1) {
        this.pageInfo.current = 1;
      }
      tep = Object.assign(this.postData, this.pageInfo);

      this.Axios("channelApplyList", tep).then(res => {
        this.columnsData = res.data.data.list;
        this.totalNum = res.data.data.total;
      });
    },
    reQueryList() {
      Object.entries(this.postData).forEach(([key, value], index) => {
        this.postData[key] = "";
      });
       this.pageInfo.current = 1
       this.queryList()
    },
    getChannelName() {
      let tep = {
        tab: "list"
      };
      this.Axios("getChannelName", tep).then(res => {
        let data = res.data.data;
        this.channelList = data
        this.columnsData = data.list;
        this.totalNum = data.total;
        this.searchArr.map(item => {
          if (item.key == "channelName") {
            let dataArr = [];
            data.map(item1 => {
              let arr = {
                name: item1.channelName,
                value: item1.channelName
              };
              dataArr.push(arr);
            });
            item.items = dataArr;
          }
        });
        console.log(this.searchArr, "+++++++++++++++++++++++==");
      });
    },
    createdSearch() {
      let { columns, searchArr, changeArr } = obj;
      this.columns = columns;
      this.searchArr = searchArr;
      console.log(searchArr, "");
      this.changeArr = changeArr;
      searchArr.forEach((item, index) => {
       // console.log(item, "222");
        this.$set(this.postData, item.key, item.value || undefined);
      });
      //console.log(this.postData, "+++++++++++");
      // changeArr.forEach(item => {
      //   this.$set(this.changeData, item.key, undefined);
      // });
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.customer.goodsList;
    },
    orderStatusEnum() {
      return this.$store.state.customer.orderStatusEnum;
    }
  },
  created() {
		let self = this;
    self.createdSearch();
    self.getChannelName();
		Bus.$on('approval', (e) => {
			self.pageInfo.current = 1;
			self.queryList()
			//Bus.$emit('selectedRowKeys', '2200')
		})
     this.queryList()
  },
  activated() {}
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
