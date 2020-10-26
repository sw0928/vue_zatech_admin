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
        <!-- <a-button type="primary" class="searchQuery" @click="output">匯出</a-button> -->
      </div>
    </div>
    <tableColumn :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
      <span slot="operation" slot-scope="props">
        <a-button @click="edit(props.record.friendInviteId,props.record)">修改</a-button>
        <a-button v-if="props.record.isPublish != 'Y'" @click="del(props.record)">刪除</a-button>
      </span>
    </tableColumn>
		<!-- <a-modal
		  title="審核備註"
		  :visible="visible"
		  @ok="handleOk"
		  @cancel="handleCancel"
		>
		  <p>{{ ModalText }}</p>
		</a-modal> -->
  </div>
</template>
<script>
  import obj from './viewData.js'
  import {tempetDownLoad, changeDateStyleB, getDateStyle} from '@/common/common'
  export default {
    name: "userRecord",
    components: {},
    watch: {
      pageInfo: {
        handler: function(value) {
          this.queryList()
        },
        deep: true
      },
      "postData.functionModelId": {
        handler: function(value) {
          try{
						this.postData.functionProId = undefined
						if(value == '00'){
							 this.$nextTick(()=>{
								 this.searchArr.map(item => {
								   if (item.key == "functionProId") {										               			  		
								     item.items = this.recordTotal;
								   }
								 });
							 });
						
						}else{
							this.recordSelect.map((item1, index1) => {             		
							    this.$nextTick(()=>{
										if (item1["code"] == value) {
										  this.searchArr.map(item => {
										    if (item.key == "functionProId") {
										      let dataArr = [];
										      item1["children"].map(item1 => {
										        let arr = {
										          name: item1.value,
										          value: item1.code
										        };
										        dataArr.push(arr);
										      });            			  		
										      item.items = dataArr;
										    }
										  });
										}
							    })            
							});
						}
             
          }catch(e){
            //TODO handle the exception
          }
        },
        deep: true
      },
      "postData.DateRange": {
        handler: function(value) {
          try{
             this.postData.modifiedStart = value.split(',')[0];
            this.postData.modifiedEnd = value.split(',')[1];
						if(this.postData.modifiedStart.indexOf('/') > -1){
							this.postData.modifiedStart = changeDateStyleB(this.postData.modifiedStart)
						}
						if(this.postData.modifiedEnd.indexOf('/') > -1){
							this.postData.modifiedEnd = changeDateStyleB(this.postData.modifiedEnd)
						}
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
				recordSelect:[],
				recordTotal:[],
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
            path: "infoChange",
            breadcrumbName: "會員資料管理"
          },
          ...obj.path

        ],
        columns: [], //表头
				columnsTwo: [], //表头
        RoleCode: '',
        columnsData: [], //表格信息
      };
    },
    methods: {
      getItems(item){
          return item.items
      },
      queryList(index) {
				if(index == 1){
				  this.pageInfo.current = 1
				}	
      	let tep = {
					current: this.pageInfo.current,
					functionModelId: this.postData.functionModelId =='00'? undefined:this.postData.functionModelId,
					functionProId: this.postData.functionProId,
					loginName: this.postData.loginName,
					modifiedEnd: this.postData.modifiedEnd,
					modifiedStart: this.postData.modifiedStart,
					pageSize: this.pageInfo.pageSize,
					strokeCountEnd: this.postData.strokeCountEnd,
					strokeCountStart: this.postData.strokeCountStart
				};				      	      				
      	//tep = Object.assign(this.postData,this.pageInfo)				
				console.log(tep)
      	this.Axios('userDataRecordListPage',tep)
      	.then((res) => {
      	    this.columnsData = res.data.data.list;
      	    this.totalNum = res.data.data.total
      	})              
      },
      reQueryList() {
        Object.entries(this.postData).forEach(([key, value], index) => {				
          this.postData[key] = undefined
        })
				this.searchArr.map(item => {
				  if (item.key == "functionProId") {				    					
				    item.items = [];
				  }
					
				});
         this.pageInfo.current = 1
         this.queryList()
      },
			//获取时间
			getDay(day) {
			    //Date()返回当日的日期和时间。
			    var days = new Date();
			    //getTime()返回 1970 年 1 月 1 日至今的毫秒数。
			    var gettimes = days.getTime() + 1000 * 60 * 60 * 24 * day;
			    //setTime()以毫秒设置 Date 对象。
			    days.setTime(gettimes);
			    var year = days.getFullYear();
			    var month = days.getMonth()+1;
			    if(month<10){
			        month="0"+month;
			    }
			    var today = days.getDate();
			    if(today<10){
			        today="0"+today;
			    }
			    return year + "/" + month + "/" + today;
			},
      createdSearch() {
        let {
          columns,
          searchArr,
        } = obj;
        this.columns = columns;
        this.searchArr = searchArr;
        searchArr.forEach((item,index) => {
          this.$set(this.postData, item.key, item.value)
        })    
				this.$set(this.postData, 'DateRange', {
					'start':getDateStyle(this.getDay(-180)),
					'end' :getDateStyle(this.getDay(0)),
				})		
      }
    },
    computed:{
      // goodsList(){
      //   return this.$store.state.customer.goodsList
      // },
      // orderStatusEnum(){
      //   return this.$store.state.customer.orderStatusEnum
      // }
    },
    created() {
      this.createdSearch();
			this.Axios('initUserDataRecordSelect', {})
			  .then((res) => {
			    this.recordSelect = res.data.data;					
					this.searchArr.map(item => {
					  if (item.key == "functionModelId") {
					    let dataArr = [{
								name:'全部',
								value:'00'
							}];
					    this.recordSelect.map(item1 => {
					      let arr = {
					        name: item1.value,
					        value: item1.code
					      };
					      dataArr.push(arr);
					    });
							
					    item.items = dataArr;
					  }
						
					});
					 this.recordTotal = [];
					this.recordSelect.map(item => {
					  item.children.map(item1 => {
					    let arr = {
					      name: item1.value,
					      value: item1.code
					    };
					    this.recordTotal.push(arr);
					  });
					});
			  })
      // this.queryList()
    },
    activated() {
    }
  };
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
