<template>
  <div>
    <comHeader
      :routes="routes"
      primary-button=""
      @primary="primary(1)"
    ></comHeader>
    <!-- {{searchArr}} -->
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
        <div
          class="info_list"
          :class="{ is_select: is_chose == 1 }"
          @click="listTable(1)"
        >
          列表清單
        </div>
        <div
          class="modify_list"
          :class="{ is_select: is_chose == 2 }"
          @click="listTable(2)"
        >
          修改記錄
        </div>
      </div>
      <div class="tab_right">
        <div class="add_access" @click="jump_detail('add')">新增Media Code</div>
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
  name: "allInsure",
  components: {},
  watch: {
    pageInfo: {
      handler: function(value) {
       // console.log(value, 'value')
        this.queryList();
      },
      deep: true
    },
    postData: {
      handler: function(value) {
       // console.log(value);
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
    // chose_list(index) {
    //   this.is_chose = index;
    //   let columns = obj.columns;
    //   this.$popup({
    //     title: "審核Media Code",
    //     content: "我是内容",
    //     inner: "mcq",
    //     show_table: "show",
    //     columns: columns,
    //     btnText: "确定"
    //   });

    // },
    getItems(item) {
      // console.error(this.goodsList)
      return item.items;
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

    jump_detail(route, data, index) {
      if (data) {
        let item = JSON.stringify(data);
        window.sessionStorage.setItem("mediaInfo", item);
      }

      this.$router.push({
        name: "mediaCode",
        query: {
          MediaCode: index,
          menu: route
        }
      });
    },

    output() {
      tempetDownLoad("exportOrders", this.postData, "所有投保紀錄報表");
    },
    givePower(obj) {},
    get_list(tep) {
      this.Axios("mediaList", tep).then(res => {
        let data = res.data.data;
        this.columnsData = data.list;
        this.totalNum = data.total;
      });
    },
    listTable(index) {
      this.is_chose = index;
			this.pageInfo.current = 1
			this.queryList()
    },
    queryList() {
      let tep = this.postData;
      let opt = this.columns;
      if (this.is_chose == 1) {
        tep.tab = "list";
        opt.map(item => {
          item.title == "審核狀態" ? (item.title = "操作") : item.title;
        });
      } else if (this.is_chose == 2) {
        tep.tab = "record";
        opt.map(item => {
          item.title == "操作" ? (item.title = "審核狀態") : item.title;
        });
      }
      // this.pageInfo.current = 1;
      tep = Object.assign(this.postData, this.pageInfo);
      this.get_list(tep, this.is_chose);
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
    },
    createdSearch() {
      let { columns, searchArr, changeArr } = obj;
      this.columns = columns;
      this.searchArr = searchArr;
      this.changeArr = changeArr;
      searchArr.forEach((item, index) => {
        // this.$set(this.postData, item.key, undefined);
      });
      changeArr.forEach(item => {
        this.$set(this.changeData, item.key, undefined);
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
