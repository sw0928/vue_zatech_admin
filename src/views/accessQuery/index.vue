<template>
  <div>
    <comHeader
      :routes="routes"
      primary-button=""
      @primary="primary(1)"
    ></comHeader>
    <div class="searchDiv">
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
        <a-button type="primary" class="searchQuery" @click="queryList()"
          >查詢</a-button
        >
        <a-button @click="reQueryList">清除</a-button>
        <!-- <a-button type="primary" class="searchQuery" @click="output">匯出</a-button> -->
      </div>
    </div>
    <div class="tab">
      <div class="tab_left">
        <div
          class="info_list"
          :class="{ is_select: is_chose == 1 }"
          @click="change_list(1)"
        >
          列表清單
        </div>
        <!-- @click="chose_list(2)" 明細 -->

        <div
          class="modify_list"
          :class="{ is_select: is_chose == 2 }"
          @click="change_list(2)"
        >
          修改記錄
        </div>
      </div>
      <div class="tab_right">
        <div class="add_access" @click="toDetail(1)">新增通路</div>
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
          @click="jump_detail('modify', props.record, props.record.channelId)"
          :disabled="props.record.updateFlag == false"
          v-show="is_chose == 1"
          >修改</a-button
        >
        <a-button
          @click="jump_detail('info', props.record, props.record.channelId)"
          v-show="is_chose == 1"
          >明細</a-button
        >
        <span
          :class="{ is_tui: props.record.auditorStatus == '2' }"
          @click="get_info(props.record)"
          v-show="is_chose == 2"

        >
          {{ props.record.auditorStatusStr }}</span
        >
      </span>
    </tableColumn>
  </div>
</template>
<script>
import obj from "./viewData.js";
import { tempetDownLoad } from "@/common/common";
export default {
  name: "accessQuery",
  components: {},
  watch: {
    pageInfo: {
      handler: function(value) {
        let tep = Object.assign(this.postData, this.pageInfo);
        console.log(this.is_chose, 'is_chose')
        if(this.is_chose ==1) {
          tep.tab = "list";
        }else if(this.is_chose ==2) {
          tep.tab = "record";

        }
        console.log(tep, 'tep')
          this.list_type = tep;
        // this.queryList();
      },
      deep: true
    },
    postData: {
      handler: function(value) {
        console.log(value, "");
      },
      deep: true
    },
    table_tag: {
      handler: function(value) {
        let tep = this.postData;
        let opt = this.columns;
        if (value == 1) {
          tep.tab = "list";
          opt.map(item => {
            item.title == "審核狀態" ? (item.title = "操作") : item.title;
          });
        } else if (value == 2) {
          tep.tab = "record";
          opt.map(item => {
            item.title == "操作" ? (item.title = "審核狀態") : item.title;
          });
        }
          this.pageInfo.current = 1;

          tep = Object.assign(this.postData, this.pageInfo);
          this.list_type = tep;
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
      list_type: {},
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
      table_tag: 0,
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
    chose_list(props) {
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
          // value: "109/02/27"
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
          title: "交換聲明名稱",
          type: "span",
          key: "orderNo",
          size: 10,
          value: props.gmtModifiedStr,
          items: ""
        }
      ];

      this.$popup({
        title: "通路申請明細",
        content: "我是内容",
        inner: "aq",
        postArr: postArr,
        btnText: "返回"
      });
    },
    jump_detail(route, data, index) {
      let item = JSON.stringify(data);
      window.sessionStorage.setItem("accessInfo", item);
      this.$router.push({
        name: "accessDetail",
        query: {
          channelId: index,
          menu: route
        }
      });
    },
    get_info(data) {
      if(data.auditorStatus==2) {
         this.$popup({
          title: "審核備注",
          inner: "mcq",
          is_content: 1,
          content:data.auditorDescribe,
					columns:[],
					columnsData:undefined,
					examin:undefined,
					padding:undefined,
					tableTitle:undefined,
					postArr:undefined,
					show_table:undefined,
         is_content1:'2',
         is_content2:'1',
          width:'40%',
          btnText: "返回"
        });
      
      }
    },
    getItems(item) {
      return item.items;
    },
    change_list(index) {
      this.table_tag = index;
      this.is_chose = index;
			this.pageInfo.current = 1
			this.queryList()
    },
    toDetail(value) {
      let val;
      if (value == 1) {
        val = "add";
      } else if (value == 2) {
        val = "modify";
      }
      this.$router.push({
        name: "accessDetail",
        query: {
          menu: val
        }
      });
    },
    output() {
      tempetDownLoad("exportOrders", this.postData, "所有投保紀錄報表");
    },
    givePower(obj) {},
    queryList(index) {
      
      this.get_list(this.list_type);
    },

    //清除输入栏位
    reQueryList() {
      Object.entries(this.postData).forEach(([key, value], index) => {
        this.postData[key] = "";
      });
     let tep = Object.assign(this.postData, this.pageInfo);
       if(this.is_chose ==1) {
          tep.tab = "list";
        }else if(this.is_chose ==2) {
          tep.tab = "record";

        }
          this.list_type = tep;
          this.pageInfo.current = 1
          this.queryList()
    },
    createdSearch() {
      let { columns, searchArr, changeArr } = obj;
      this.columns = columns;
      this.searchArr = searchArr;
      this.changeArr = changeArr;
      searchArr.forEach((item, index) => {
        // this.$set(this.postData, item.key, item.value || undefined);
      });
      changeArr.forEach(item => {
        this.$set(this.changeData, item.key, undefined);
      });
    },
    get_list(tep) {
      this.Axios("getList", tep).then(res => {
        let data = res.data.data;
        this.columnsData = data.list;
        this.totalNum = data.total;
      });
    },
    //获取channelName
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
  activated() {
    this.getChannelName();
  },
  created() {
    this.table_tag = 1
    // this.get_list();
    this.createdSearch();
    this.getChannelName();

    // this.queryList()
  },
  activated() {}
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
