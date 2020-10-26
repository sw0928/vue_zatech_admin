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
        <div
          class="info_list"
          :class="{ is_select: is_chose == 1 }"
          @click="chose_list(1)"
        >
          列表清單
        </div>
        <div
          class="modify_list"
          :class="{ is_select: is_chose == 2 }"
          @click="chose_list(2)"
        >
          修改記錄
        </div>
      </div>
      <div class="tab_right">
        <div class="add_access" @click="addAccess()">銷售商品設定</div>
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
        <span :class="{'is_tui':props.record.auditorStatus==2}" @click="show_content(props.record)">{{props.record.auditorStatus==1?'待審核':props.record.auditorStatus==2?'退件':'審核通過'}}</span>
      </span>
    </tableColumn>
  </div>
</template>
<script>
import obj from "./viewData.js";
import { tempetDownLoad } from "@/common/common";
export default {
  name: "accessProductQuery",
  components: {},
  watch: {
		// $route: {
		// 	handler: function(val, oldVal){
		// 		console.log(val);
		// 	},
		// 	// 深度观察监听
		// 	deep: true
		// },
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
    chose_list(index) {
      this.is_chose = index;
      if (index == 2) {
        let tep = {
          title: "審核狀態",
          key: "operation",
          fixed: "right",
          width: 200,
          scopedSlots: {
            customRender: "operation"
          }
        };
        this.$nextTick(()=>{
        console.log(this.columns, "this.columns");
        let temp = this.clone(this.columns);
        temp.push(tep)
        this.columns = temp
        })
        this.queryList()
      } else if (index == 1) {
        this.columns = obj.columns;
				this.queryList()
      }
    },
    show_content(data) {
      console.log(data, 'data')
      if(data.auditorStatus==2) {
         this.$popup({
          title: "審核備注",
          inner: "mcq",
          is_content: 1,
         content:data.auditorDescribe,
        is_content1:'2',
        is_content2:'1',
        width:'40%',
          btnText: "返回"
        });

      }

    },
		addAccess(){
			let self = this;
			self.$router.replace({
				name: 'saleProductQuery',
			});
		},
    clone(obj) {
      var o;
      // 如果  他是对象object的话  , 因为null,object,array  也是'object';
      if (typeof obj === "object") {
        // 如果  他是空的话
        if (obj === null) {
          o = null;
        } else {
          // 如果  他是数组arr的话
          if (obj instanceof Array) {
            o = [];
            for (var i = 0, len = obj.length; i < len; i++) {
              o.push(this.clone(obj[i]));
            }
          }
          // 如果  他是对象object的话
          else {
            o = {};
            for (var j in obj) {
              o[j] = this.clone(obj[j]);
            }
          }
        }
      } else {
        o = obj;
      }
      return o;
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
    queryList(index) {
      let tep = this.postData;
      if(index == 1){
        this.pageInfo.current = 1
      }
      tep = Object.assign(this.postData,this.pageInfo)
      if(this.is_chose==1) {
        this.Axios("getGoodsDtoList", tep).then(res => {
        console.log(res.data.data.list, "res");
        let list = res.data.data.list;
        this.columnsData = list;
				this.totalNum = res.data.data.total;
      });


      }else if(this.is_chose==2){
        this.Axios("getGoodsDtoModifyList", tep).then(res => {
        console.log(res.data.data.list, "res");
        let list = res.data.data.list;
        this.columnsData = list;
				this.totalNum = res.data.data.total;
      });
        
      }
      
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
        this.$set(this.postData, item.key, undefined);
      });
      changeArr.forEach(item => {
        this.$set(this.changeData, item.key, undefined);
      });
    },
    get_select() {
      this.Axios("getGoodsDtoSelect").then(res => {
				console.log(res)
        let channelName = res.data.data.channelList;
        let goodsType = res.data.data.goodsTypeList;
        this.searchArr.map(item => {
          if (item.key == "channelCode") {
            let dataArr = [];
            channelName.map(item1 => {
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
            goodsType.map(item1 => {
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
  created() {
    this.createdSearch();
    this.get_select();		
  },
  activated() {}
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
