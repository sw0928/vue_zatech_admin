<template>
  <div>
    <comHeader
      :routes="routes"
      primary-button=""
      @primary="primary(1)"
    ></comHeader>
    <div class="tables">
      <div class="table">
        <div class="header">通路訊息</div>
        <div id="add">
          <modelForm
            v-model="postData[item.key]"
            :key="item.key"
            :title="item.title"
            :items="item.items"
            :type="item.type"
            :size="item.size"
            v-for="item in searchArr"
            class="comDiv"
            :required="item.required"
            :isAutoPlacehoder="false"
          ></modelForm>
        </div>
      </div>
      <div class="table">
        <div class="header">商品訊息</div>
        <div id="add">
          <modelForm
            v-model="productData[item.key]"
            :key="item.key"
            :title="item.title"
            :items="item.items"
            :type="item.type"
            :size="item.size"
            v-for="item in productArr"
            class="comDiv"
            :isAutoPlacehoder="false"
          ></modelForm>
          <div class="searchBTn">
            <a-button type="primary" class="searchQuery" @click="queryList(1)"
              >查詢</a-button
            >
            <a-button @click="reQueryList">清除</a-button>
          </div>
        </div>
        <div class="pro_tables" id="box">
          <!-- <tableColumn
            :is_select="need_select"
            :columns="columns"
            :columnsData="columnsData"
            :pageInfo="pageInfo"
            :totalNum="totalNum"
            :openExpand="false"
            @get_list="get_list"
          >
            <span slot="other" slot-scope="props">
              {{ props.record.status == "a" ? "有效" : "無效" }}
            </span>
            <span slot="operation" slot-scope="props">
              <a-button @click="edit(props.record)">修改</a-button>
              <a-button @click="del(props.record)">删除</a-button>
            </span>
          </tableColumn> -->
					<template>
						<a-table 
						:row-selection="rowSelection" 
						:columns="columns" 
						:data-source="columnsData"
						:locale="locale"
						:loading="loading"
						size="small"
						:pagination="false"
						:rowKey="
						  (record) => record.applyId
						"
						class="components-table-demo-size"
						style="color: #09346E; font-weigth: 600;"
						>
						</a-table>
					</template>
        </div>
      </div>
      <div class="table">
        <div class="header">詳細配置訊息</div>
        <collapse
          v-for="(item, index) in collapse_arr"
          :key="index"
          :title="collapse_list[index].title"
          :collapse_arr.sync="item"
          @collapseChange="collapseChange"
        ></collapse>
      </div>
      <div class="btn_box">
        <button class="btn1 btn" @click="post_info">送審</button>
        <button class="btn" @click="backUp">
          取消
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import obj from "./viewData.js";
import { changeDateStyle,changeDateStyleB } from "@/common/common.js";
export default {
  name: "saleProductQuery",
  components: {},
  watch: {
    pageInfo: {
      handler: function(value) {
        this.queryList();
      },
      deep: true
    },
		columnsData: {
		  handler: function(val) {
		   // console.log('watch',val )
		    this.loading = true;
		    setTimeout(() => {
		      this.loading = false;
		    }, 500);
		  },
		  deep: true,
		  immediate: true
		},
    hold_table_list: {
      handler: function(value) {

        // this.$nextTick(() => {
        let titleArr = [];
        let tableArr = [];

        value.map((item, index) => {
          titleArr.push({ title: item.goodsName });
          let arr = [
            {
              title: "商品代碼",
              type: "span",
              key: "goodsCode",
              size: 10,
              width: "240px",
              value: "9012410728",
              items: ""
            },
            {
              title: "商品類別",
              type: "span",
              key: "categoryName",
              size: 10,
              width: "240px",
              value: "健康險，意外險",
              items: ""
            },
            {
              title: "Compagin Code",
              type: "input",
              key: "campaignCode",
              required: true,
              size: 30,
              width: "240px",
              value: "111",
              items: ""
            },
            {
              title: "推薦商品設定",
              type: "select",
              key: "sort",
              regular: "other1",
              value: "",
              error: false,
              size: 10,
              width: "240px",
              items: [
                {
                  name: "順位1",
                  value: "1"
                },
                {
                  name: "順位2",
                  value: "2"
                },
                {
                  name: "順位3",
                  value: "3"
                }
              ]
            },

            {
              title: "銷售開始時間",
              required: true,
              type: "time",
              value: "",
              key: "grantBegStr"
            },
            {
              title: "銷售結束時間",
             // required: true,
              type: "time",
              value: "",
              key: "grantEndStr"
            }
          ];
          // console.log(item.grantBegStr, 'item++')

          arr.map((item1, index1) => {
            // if (itme1["key"]) {
							
              this.$nextTick(()=>{
								// if (item1["key"] == "grantBegStr") {
								//   item1["value"] = changeDateStyle(item.grantBegStr);
								// } else if (item1["key"] == "grantEndStr") {
								//   item1["value"] = changeDateStyle(item.grantBegStr);
								// }
              if(item1["key"] == "sort") {
              item[item1["key"]] == 1
                ? (item1["value"] = "順位1")
                : item[item1["key"]] == 2
                ? (item1["value"] = "順位2")
                : (item1["value"] = "順位3");
            } else {
              item1.value = item[item1["key"]];
            }
              })

            // }
          });
          tableArr.push(arr);
        });
        this.collapse_list = titleArr;
        this.collapse_arr = tableArr;

        // });
      },
      deep: true
    },
    collapse_arr: {
      handler: function(value) {
        let val = JSON.parse(JSON.stringify(value))
        let arr1 = []

      val.map(item=>{
          let arr = {}
        for(var i = 0;i<item.length;i++) {
          let date =JSON.parse(JSON.stringify(item[i].key)) 
          arr[date] = item[i].value
        }
        arr1.push(arr)
        })



      //  console.log(arr1, '__________---')
        this.hole = arr1

      },
      deep: true
    },
    postData: {
      handler: function(value) {
        this.$nextTick(() => {
          if (value.channelName !== undefined) {
            this.hold_vlue.map(item => {
              if (item.name == value.channelName) {
                this.postData.channelCode = item.code;
              }
            });
          }
        });
      },
      deep: true
    }
  },
  data() {
    return {
      need_select: true, //需要全選
      changeArr: [],
      searchArr: [],
      totalNum: 0,
      postData: {},
      productArr: [],
      productData: {},
      hole:[],
      pageInfo: {
        current: 1, //当前页数
        pageSize: 10 //每页条数
      },
      isAdd: true,
      hold_vlue: [],
      collapse_list: [
        //摺叠面板數組
        { title: "123" }
      ],
      collapse_arr: [],
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
			locale: {
			  filterConfirm: "确定",
			  filterReset: "重置",
			  emptyText: "無符合資訊"
			},
			loading: true,
			implement:true,
			selectedRowKeys:[],
      columnsData: [], //表格信息
      hold_table_list: [] //臨時列表
    };
  },
	computed: {
    rowSelection() {
			const { selectedRowKeys } = this;
      return {
				selectedRowKeys,
        onChange: this.onSelectChange,
        getCheckboxProps: record => ({
          props: {
            disabled: record.isChecked == 1, // Column configuration not to be checked
             name: `${record.isChecked}`
          },
        }),
      };
    },
  },
  methods: {
		onSelectChange(selectedRowKeys,selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRows);
			this.selectedRowKeys = selectedRowKeys;
      this.hold_table_list = selectedRows;
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
    collapseChange(data) {
      let val = this.hole
      for(let i = 0;i<=val.length;i++) {
          let lis = val[i]
         // console.log(lis, '2')
          if(lis!==undefined) {
              if(val[i].goodsCode==data.goodsCode) {
          val[i] = data
        }
          }
      
      }
     this.hole = val
      //console.log(val, 'pp')
    },
    backUp() {
     // this.$router.go(-1);
		 this.$router.replace({
		 	name: 'accessProductQuery',
		 });
    },
    post_info() {
      //console.log(this.hole, 'hole')

      let val = this.clone( this.hole)
      if (this.collapse_arr.length >= 1) {
        let arr = [];				
       console.log(val, '888___')
			 val.some((value, index) => {
				 value.goodsId =  this.hold_table_list[index].goodsId;
				 value.channelGoodsId =  this.hold_table_list[index].channelGoodsId;
         if (value.campaignCode == undefined || value.campaignCode.trim() == '') {
           this.$message.error('請填寫Campaign Code');
					 this.implement = false;
           return true;
         }else{
					 this.implement = true
				 }
        if (value.grantBegStr == undefined) {
          this.$message.error('請選擇銷售開始日期');
					 this.implement = false;
          return true;
        }else{
					 if (value.grantBegStr.indexOf('/') > -1) {
					   value.grantBegStr = changeDateStyleB(value.grantBegStr);
					 }
					 this.implement = true
				}
				if(value.grantEndStr != undefined){
				 if(value.grantEndStr.indexOf('/') > -1) {
				   value.grantEndStr = changeDateStyleB(value.grantEndStr);
				 }
				}	
				if(value.sort == "順位1" || value.sort == "順位2" || value.sort == "順位3"){
				 value.sort == '順位1'? value.sort = "1":value.sort == '順位2'? value.sort = '2' : value.sort = '3';
				}
      });
			 //console.log(this.implement)
        let tep = {
          channelCode: this.postData.channelCode,
          channelGoodsApplyDTOs: val
        };
        //console.log(tep, '')
				if(this.implement){
					this.Axios("goodsDtoPost", tep)
					   .then(res => {
					     if (res.data.code == "200") {
					       this.$message.success("送審成功");
					       setTimeout(() => {
					         this.$router.push({
					           name: "saleProductCheck"
					         });
					       }, 1500);
					     }
					   })
					   .catch(e => {
					   });
				}     
      } else {
        this.$message.error("詳細配置訊息列表為空");
      }
    },
    // get_list(data) {
    //   this.hold_table_list = data;
    // },
    getItems(item) {
      // console.error(this.goodsList)
      // if (item.key == "goodsId") {
      //   return this.goodsList;
      // } else if (item.key == "orderStatus") {
      //   return this.orderStatusEnum;
      // } else {
      return item.items;
      // }
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
      let channel_info = this.postData;
      let pro_info = this.productData;
      if (channel_info.channelCode == undefined) {
        this.$message.error("請選擇通路名稱");
      } else {
        let tep = Object.assign(channel_info,pro_info)
        this.Axios("getGoodsDtoGet", tep).then(res => {
          let data = res.data.data;
          this.columnsData = data;
					this.selectedRowKeys = [];
					this.hold_table_list = [];
        });
      }
    },
    reQueryList() {
      Object.entries(this.postData).forEach(([key, value], index) => {
        this.postData[key] = "";
      });
			Object.entries(this.productData).forEach(([key, value], index) => {
			  this.productData[key] = "";
			});
			this.columnsData = [];
			this.selectedRowKeys = [];
			this.hold_table_list = [];
    },
    createdSearch() {
      let { columns, searchArr, changeArr, productArr } = obj;
      this.columns = columns;
      this.searchArr = searchArr;
      this.changeArr = changeArr;
      this.productArr = productArr;
      searchArr.forEach((item, index) => {
        this.$set(this.postData, item.key, undefined);
      });
      productArr.forEach((item, index) => {
        this.$set(this.productData, item.key, undefined);
      });
      changeArr.forEach(item => {
        this.$set(this.changeData, item.key, undefined);
      });
    },

    get_select() {
      this.Axios("getGoodsDtoSelect").then(res => {
        let channelName = res.data.data.channelList;
        this.hold_vlue = channelName;
        let auditorStatusList = res.data.data.auditorStatusList;
        this.searchArr.map(item => {
          if (item.key == "channelName") {
            let dataArr = [];
            channelName.map(item1 => {
              let arr = {
                name: item1.name,
                value: item1.name
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
    // this.queryList()
  },
  activated() {}
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
