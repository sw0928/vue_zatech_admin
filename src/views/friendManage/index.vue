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
  <div class="tab">
    <div class="tab_left">
      <div class="info_list" :class="{'is_select':is_chose==1}" @click="chose_list(1)">列表清單</div>
      <div class="modify_list" :class="{'is_select':is_chose==2}" @click="chose_list(2)">修改記錄</div>							
    </div>
    <div class="tab_right">
      <div class="add_access" @click="newActivity()">新增</div>
    </div>
  </div>
    <tableColumn v-if="is_chose==1" :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
      <span slot="operation" slot-scope="props">
        <a-button @click="edit(props.record.friendInviteId,props.record)">修改</a-button>
        <a-button v-if="props.record.isPublish != 'Y'" @click="del(props.record)">刪除</a-button>
      </span>
    </tableColumn>
		<tableColumn v-if="is_chose==2"  :columns="columnsTwo" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
      <span slot="operation" slot-scope="props">
        <span v-if="props.record.auditorStatus==3">審核通過</span>
        <span v-if="props.record.auditorStatus==1">待審核</span>					
        <span style="color: #196AD4;cursor: pointer;" v-if="props.record.auditorStatus==2" @click="refund(props.record.auditorDescribe)">退件</span>
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
  import {tempetDownLoad} from '@/common/common'
  export default {
    name: "friendManage",
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
        need_select:true,//需要全選
        is_chose:1,//選擇tab
        changeArr: [],
        searchArr: [],
        totalNum: 0,
				//ModalText:'無記錄',
				//visible: false,
        postData: {},
        pageInfo: {
          current: 1, //当前页数
          pageSize: 10, //每页条数
        },
        isAdd: true,
        routes: [
          // 面包屑数据
          {
            path: "friendManage",
            breadcrumbName: "邀請好友管理"
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
      chose_list(index) {
        this.is_chose = index;
				this.pageInfo.current = 1
				this.queryList()
      },
			refund(value){
				//this.visible = true;
				//this.ModalText = value;
				this.$popup({
				  title: "審核備注",
				  inner: "mcq",
				  is_content: 1,
				  content:value,
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
			},
			handleOk(e) {								
					this.visible = false;					
			},
			handleCancel(e) {
				this.visible = false;
			},
			newActivity(){
				let self = this;
				window.sessionStorage.removeItem("timeInfo");
				self.$router.replace({
					name: 'newFriend',
				});
			},
			del(obj) {
			  let self = this;
			  this.$confirm({
			    title: '確定刪除?',
			    content: `是否刪除${obj.title}`,
			    onOk() {
			      let tep = obj;
			      self.Axios('deleteFriendInvite', tep)
			        .then((res) => {			          
			          self.$message.success('操作成功！')
			          self.queryList()
			        })
			    },
			    onCancel() {},
			  });
			
			},
			edit(value,data) {
				let item = JSON.stringify(data)
				window.sessionStorage.setItem('timeInfo',item)
				this.$router.push({
					name: 'newFriend',
					query: {
				    friendInviteId: value,
					}
				});		
			},
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
      	//console.log(tep)
      	if(index == 1){
      	  this.pageInfo.current = 1
      	}
      	tep = Object.assign(this.postData,this.pageInfo)
      	if(this.is_chose == 1){
      		this.Axios('friendListPage',tep)
      		.then((res) => {
      		    this.columnsData = res.data.data.list;
      		    this.totalNum = res.data.data.total
      		})
      	}else{
      		this.Axios('friendModifListPage',tep)
      		.then((res) => {
      		    this.columnsData = res.data.data.list;
      		    this.totalNum = res.data.data.total
      		})
      	}               
      },
      reQueryList() {
        Object.entries(this.postData).forEach(([key, value], index) => {
          this.postData[key] = ''
        })
         this.pageInfo.current = 1
         this.queryList()
      },
      createdSearch() {
        let {
          columns,
					columnsTwo,
          searchArr,
          changeArr
        } = obj;
        this.columns = columns;
				this.columnsTwo = columnsTwo;
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
