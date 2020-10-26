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
    <div class="tab">
      <div class="tab_left">
        <div></div>
      </div>
      <div class="tab_right">
        <div class="add_access" @click="access_list">審核</div>
      </div>
    </div>
    <!-- {{columnsData[0]}} -->
    <!-- <tableColumn
      :is_select="need_select"
      :columns="columns"
      :columnsData="columnsData"
      :pageInfo="pageInfo"
      :totalNum="totalNum"
    > -->
    <tableColumn
      :is_select="need_select"
      :columns="columns"
      :columnsData="columnsData"
      :pageInfo="pageInfo"
      :totalNum="totalNum"
      :openExpand="false"
      @get_list="get_list"
    >
      <span slot="operation" slot-scope="props">
        <a-button @click="access_info(props.record)">明細</a-button>
      </span>
    </tableColumn>
  </div>
</template>
<script>
import obj from "./viewData.js";
import Bus from '@/common/bus.js';
import { tempetDownLoad } from "@/common/common";
export default {
  name: "saleProductCheck",
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
        console.log(value);
      },
      deep: true
    },
  },
  data() {
    return {
      need_select: true, //需要全選
      is_chose: 1, //選擇tab
      changeArr: [],
      searchArr: [],
      selectList: [], //選中按鈕
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
          path: "accessProductQuery",
          breadcrumbName: "通路商品管理"
        },
        ...obj.path
      ],
      columns: [], //表头
      RoleCode: "",
      columnsData: [] //表格信息
    };
  },
  methods: {
    
    access_info(data) {
      let Arr = [
        {
          title: "商品代碼",
          type: "span",
          key: "goodsCode",
          width: "49%",
          value: data.goodsCode
        },
        {
          title: "商品類別",
          type: "span",
          key: "goodsCode",
          width: "49%",
          value: data.categoryName
        },
        {
          title: "銷售開始時間",
          type: "span",
          width: "49%",
          value: data.grantBegStr
        },
        {
          title: "銷售終止時間",
          type: "span",
          width: "49%",
          value: data.grantEndStr
        },
        {
          title: "Campaign Code",
          type: "span",
          width: "100%",
          value: data.campaignCode
        },
        {
          title: "通路代碼",
          type: "span",
          width: "49%",
          value: data.channelCode
        },
        {
          title: "通路名稱",
          type: "span",
          width: "49%",
          value: data.channelName
        },
        {
          title: "審核狀態",
          type: "span",
          width: "100%",
          value: data.auditorStatusStr
        },
        {
          title: "審核備注",
          type: "span",
          width: "100%",
          value: data.auditorDescribe
        }
      ];

      this.$popup({
        title: "銷售商品設定明細",
        content: "我是内容",
        tableTitle: data.goodsName,
				columns:[],
				columnsData:undefined,
				examin:undefined,
				padding:undefined,
				show_table:undefined,
				is_content1:undefined,
				is_content2:undefined,
        inner: "aq",
        postArr: Arr,
        width: "60%",
       // padding: "40px",
        btnText: "返回"
      });
    },
    get_list(info) {
      //更新选中的数据
      this.selectList = info;
     // console.log(info, "info");
    },
    access_list() {
        if (this.selectList.length > 0) {
        let columns = obj.columns;
        let arr = [];
        columns.map(item => {
          if (item.dataIndex == "channelName") {
            arr.push(item);
          } else if (item.dataIndex == "goodsCode") {
            arr.push(item);
          } else if (item.dataIndex == "goodsName") {
            arr.push(item);
          } else if (item.dataIndex == "categoryName") {
            arr.push(item);
          } else if (item.dataIndex == "campaignCode") {
            arr.push(item);
          } else if (item.dataIndex == "grantBegStr") {
            arr.push(item);
          } else if (item.dataIndex == "grantEndStr") {
            arr.push(item);
          } else if (item.dataIndex == "gmtModifiedStr") {
            arr.push(item);
          } else if (item.dataIndex == "auditorDescribe") {
            arr.push(item);
          }
        });
        this.$popup({
          title: "銷售商品設定審核",
          show_table: "show",
          inner: "mcq",
          is_content1:'1',
          post_url:'saleProductCheck',
          columns: arr,
          columnsData: this.selectList,
					tableTitle:undefined,
					postArr:undefined,
					content:undefined,
					padding:undefined,
					width:undefined,
					is_content2:undefined,
          examin: "1",
          is_content1: 1,
          btnText: "確定"
        });
      }else {
        this.$message.error('請選擇商品')
      }







      // this.selectList
      // this.$popup({
      //   title: "審核備注",
      //   content: "我是内容",
      //   inner: "mcq",
      //   show_table: "show",
      //   columns: columns,
      //   is_content2: "1",
      //   btnText: "确定"
      // });
    },
    chose_list(index) {
      this.is_chose = index;
    },
    getItems(item) {
      // console.error(this.goodsList)
      if (item.key == "goodsId") {
        return this.goodsList;
      } else if (item.key == "orderStatus") {
        return this.orderStatusEnum;
      } else {
        return item.items;
      }
    },
    toDetail(value) {
      this.$router.push({
        name: "insureDetail",
        query: {
          orderNo: value,
          menu: "allInsure"
        }
      });
    },
    output() {
      tempetDownLoad("exportOrders", this.postData, "所有投保紀錄報表");
    },
    givePower(obj) {},
    queryList(index) {
      let tep = {};
      if (index == 1) {
        this.pageInfo.current = 1;
      }
      Object.assign(tep, this.postData, this.pageInfo);
      tep.channelCode = tep.channelName

      this.Axios("goodsDtoAuditList", tep).then(res => {
       // console.log(res.data.data.list, "res");
        let data = res.data.data.list;
        data.map((item, index) => {
          item.key = index;
        });
        this.columnsData = data;
				this.totalNum = res.data.data.total;
       // console.log(data, "");
      });
    },
    reQueryList() {
      Object.entries(this.postData).forEach(([key, value], index) => {
        this.postData[key] = undefined;
      });
			this.pageInfo.current = 1
			this.queryList();
    },
    createdSearch() {
      let { columns, searchArr, changeArr } = obj;
      this.columns = columns;
      this.searchArr = searchArr;
      this.changeArr = changeArr;
      searchArr.forEach((item, index) => {
        this.$set(this.postData, item.key, item.value);
      });
      // changeArr.forEach(item => {
      //   this.$set(this.changeData, item.key, undefined);
      // });
    },
    get_select() {
      this.Axios("getGoodsDtoSelect").then(res => {
        let data = res.data.data;
       // console.log(data, "");
        // this.hold_vlue = channelName;
        // let auditorStatusList = res.data.data.auditorStatusList;
        // data.map(item=>{
        //   console.log(item, 'item')
        // })

        this.searchArr.map(item => {
          if (item.key == "auditorStatus") {
            let dataArr = [];
            data.auditorStatusList.map(item1 => {
              let arr = {
                name: item1.name,
                value: item1.code
              };
              dataArr.push(arr);
            });
            item.items = dataArr;
          }
          if (item.key == "channelName") {
            let dataArr = [];
            data.channelList.map(item1 => {
              let arr = {
                name: item1.name,
                value: item1.code
              };
              dataArr.push(arr);
            });
            item.items = dataArr;
          }
          if (item.key == "goodsType") {
            let dataArr = [];
            data.goodsTypeList.map(item1 => {
              let arr = {
                name: item1.name,
                value: item1.code
              };
              dataArr.push(arr);
            });
            item.items = dataArr;
          }
        });
      });
    }
  },
  // computed: {
  //   goodsList() {
  //     return this.$store.state.customer.goodsList;
  //   },
  //   orderStatusEnum() {
  //     return this.$store.state.customer.orderStatusEnum;
  //   }
  // },
  created() {
		let self = this;
    self.createdSearch();
    self.get_select();
	  self.queryList()
		Bus.$on('goods', (e) => {
			self.pageInfo.current = 1
			self.queryList()
			Bus.$emit('selectedRowKeys', '2200')
		})
    
  },
  activated() {}
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
