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
        <div class="add_access" @click="post_access">審核</div>
      </div>
    </div>
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
        <a-button @click="access_detail(props.record)">明細</a-button>
      </span>
    </tableColumn>
  </div>
</template>
<script>
import obj from "./viewData.js";
import Bus from '@/common/bus.js';
import { tempetDownLoad } from "@/common/common";
export default {
  name: "MediaCodeCheck",
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
      //  console.log(value);
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
      selectList: [], //列表选中的值
      need_select: true, //需要全選
      is_chose: 1, //選擇tab
      changeArr: [],
      searchArr: [],
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
          path: "MediaCodeQuery",
          breadcrumbName: "Media Code管理"
        },
        ...obj.path
      ],
      columns: [], //表头
      RoleCode: "",
      columnsData: [] //表格信息
    };
  },
  methods: {
    get_list(info) {
      //更新选中的数据
      this.selectList = info;
      //console.log(info, "info");
    },

    post_access() {
      if (this.selectList.length > 0) {
        let columns = obj.columns;
        let arr = [];
        columns.map(item => {
          if (item.dataIndex == "mediaCode") {
            arr.push(item);
          } else if (item.dataIndex == "activityName") {
            arr.push(item);
          } else if (item.dataIndex == "grantBegStr") {
            arr.push(item);
          } else if (item.dataIndex == "grantBegStr") {
            arr.push(item);
          } else if (item.dataIndex == "channelCode") {
            arr.push(item);
          } else if (item.dataIndex == "channelName") {
            arr.push(item);
          }
        });
        this.$popup({
          title: "審核Media Code",
          show_table: "show",
          inner: "mcq",
          post_url:'midia_access',
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
        this.$message.error('請選擇活動')
      }
    },
    getItems(item) {
      return item.items;
    },
    access_detail(props) {
      let postArr = [
          {
            title: "Media Code",
            type: "span",
            size: 10,
             width: "100%",
            value: props.mediaCode,
            items: ""
          },
          
          {
            title: "開始時間",
            type: "span",
             width: "49%",

            value: props.grantBegStr
          },
          {
            title: "結束時間",
            type: "span",
             width: "49%",

            key: "DateRange",
            value: props.grantEndStr
          },
          {
            title: "通路代碼",
            type: "span",
            key: "orderNo",
            size: 10,
             width: "49%",

            value: props.channelCode,
            items: ""
          },
          {
            title: "通路名稱",
            type: "span",
            key: "orderNo",
             width: "49%",

            size: 10,
            value: props.channelName,
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
        title: "Media Code明細",
        content: "我是内容",
        inner: "aq",
        tableTitle:props.activityName,
        postArr: postArr,
				columns:[],
				columnsData:undefined,
				examin:undefined,
				padding:undefined,
				show_table:undefined,
				is_content1:undefined,
				is_content2:undefined,
        width:'50%',
        btnText: "返回"
      });
    },
    output() {
      tempetDownLoad("exportOrders", this.postData, "所有投保紀錄報表");
    },
    queryList(index) {
      let tep = this.postData;
      //console.log(tep, "tpe");
      if (index == 1) {
        this.pageInfo.current = 1;
      }
      tep = Object.assign(this.postData, this.pageInfo);
      this.Axios("mediaCodeApply", tep).then(res => {
        let data = res.data.data;
        data.list.map((item, index) => {
          item.key = index;
        });
        this.columnsData = data.list;
       // console.log(data.list, "111");
        this.totalNum = data.total;
      });
    },
    reQueryList() {
      Object.entries(this.postData).forEach(([key, value], index) => {
        this.postData[key] = "";
      });
       this.pageInfo.current = 1
       this.queryList()
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
      //   this.$set(this.changeData, item.key, item.value);
      // });
    },
    getChannelName() {
      let tep = {
        tab: "list"
      };
      this.Axios("getChannelName", tep).then(res => {
        let data = res.data.data;
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
      });
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
		self.queryList()
    Bus.$on('media', (e) => {
			self.pageInfo.current = 1
			self.queryList()
			//console.log('22222')
			Bus.$emit('selectedRowKeys', '2200')
    })
     
  },
  activated() {}
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
