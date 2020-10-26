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
			<div v-if="is_chose==1&&timeShow">
				<span>banner輪播時長</span>
				  <a-input class="time" v-model="time" />
					<span>秒</span>
					<a-button type="primary" class="carousel" @click="setTime()">确定</a-button>
			</div>
				
    </div>
    <div class="tab_right">
      <div class="add_access" @click="newBanner()">新增</div>
    </div>
  </div>
    <tableColumn v-if="is_chose==1" :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">      
			<span slot="other" slot-scope="props" v-if="props.record.isPublish == 'Y'&&sortShow&&columnsData.length > 1">
        <span class="iconfont icon-iconset0414" :class="props.record.sortFlag == 1?'noColor':''" @click="upperShelf(props.record.bannerId,1,props.index)"></span>
        <span class="iconfont icon-iconset0413" :class="props.record.sortFlag == 3?'noColor':''" @click="upperShelf(props.record.bannerId,2,props.index)"></span>
      </span>
			<span slot="operation" slot-scope="props">
        <a-button @click="edit(props.record.bannerId,props.record)">修改</a-button>
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
    name: "bannerManage",
    components: {},
    watch: {
      pageInfo: {
        handler: function(value) {
          this.queryList()
        },
        deep: true
      },			
      'postData.position': {
        handler: function(value) {
          if(value == '001' || value == '002'){
						this.timeShow = true;
					}else{
						this.timeShow = false;
					}
        },
        deep: true
      },
//       "postData.DateRange": {
//         handler: function(value) {
//           try{
//              this.postData.orderDateStart = value.split(',')[0]
//             this.postData.orderDateEnd = value.split(',')[1]
//           }catch(e){
//             //TODO handle the exception
//           }
// 
//         },
//         deep: true
//       },
    },
    data() {
      return {
        need_select:true,//需要全選
        is_chose:1,//選擇tab
        changeArr: [],
        searchArr: [],
				//ModalText:'無記錄',
				//visible: false,
				timeShow:false,
        confirmLoading: false,
				sortShow:false,
        totalNum: 0,
				time:'',
        postData: {},
        pageInfo: {
          current: 1, //当前页数
          pageSize: 10, //每页条数
        },
        isAdd: true,
        routes: [
          // 面包屑数据
          {
            path: "bannerManage",
            breadcrumbName: "廣告管理"
          },
          ...obj.path

        ],
				channelCode:[],
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
			newBanner(){
				let self = this;
				window.sessionStorage.removeItem("timeInfo");
				self.$router.replace({
					name: 'newBanner',
				});
			},
			//排序
			upperShelf(id,num,index){
				if(this.postData.channelCode == undefined){
				  this.$message.error('請選擇通路！')
				  return
				}
				if(this.postData.position == undefined){
				  this.$message.error('請選擇所屬欄位！')
				  return
				}
				let tep = {
					channelCode:this.postData.channelCode,
					position:this.postData.position,
					id:id,
					sortStatus:num
				};
				this.Axios('sortBanner',tep)
				.then((res) => {
				    this.$message.success('操作成功！');
						if(num == 1&&index == 0&&this.pageInfo.current > 1){
							this.pageInfo.current = this.pageInfo.current - 1;
							this.queryList();
						}else if(num == 2&&index == 9){
							this.pageInfo.current = this.pageInfo.current + 1;
							this.queryList();
						}else{
							this.queryList();
						}						
				})
			},
			//設定時間
			setTime(){
				if(this.postData.channelCode ==undefined || this.postData.position ==undefined){
				  this.$message.error('請選擇通路和banner所屬欄位！')
				  return
				}
				
				let r = /^\+?[0-9][0-9]*$/;　　//正整数		
				if(!r.test(this.time)){
					this.$message.error('請填寫正整數！')
					return
				}		
				let tep = {
					channelCode:this.postData.channelCode,
					position:this.postData.position,
					carousel:this.time
				};
				this.Axios('setBannerTime',tep)
				.then((res) => {
				    this.$message.success('操作成功！');
				})
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
			
      queryList(index) {
				let tep = this.postData;
				if(index == 1){
				  this.pageInfo.current = 1
				}
				if(tep.position == undefined || tep.position == "" || tep.channelCode == undefined || tep.channelCode == ""){
					this.sortShow = false
				}else{
					this.sortShow = true
				}
				tep = Object.assign(this.postData,this.pageInfo)
				if(this.is_chose == 1){
					this.Axios('cmsBannerListPage',tep)
					.then((res) => {
					    this.columnsData = res.data.data.pageInfo.list;							
					    this.totalNum = res.data.data.pageInfo.total;
							if(res.data.data.bannerConfig != null){
								this.time = res.data.data.bannerConfig.carousel;
							}else{
								this.time = '';
							}
					})
				}else{
					this.Axios('cmsBannerModifListPage',tep)
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
			del(obj) {
			  let self = this;
			  this.$confirm({
			    title: '確定刪除?',
			    content: `是否刪除${obj.title}`,
			    onOk() {
			      let tep = obj;
			      self.Axios('deleteBanner', tep)
			        .then((res) => {			          
			          self.$message.success('操作成功！')
			          self.queryList()
			        })
			    },
			    onCancel() {},
			  });
			
			},
			edit(value,data) {
				console.log(data)
				let item = JSON.stringify(data)
				window.sessionStorage.setItem('timeInfo',item)
				this.$router.push({
					name: 'newBanner',
					query: {
				    bannerId: value,
					}
				});		
			},
      createdSearch() {
        let {
          columns,
					columnsTwo,
          searchArr,
        } = obj;
        this.columns = columns;
				this.columnsTwo = columnsTwo;
        this.searchArr = searchArr;
        searchArr.forEach((item,index) => {					
          this.$set(this.postData, item.key, undefined)
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
			this.Axios('cmsBannerInitSelect', {})
			  .then((res) => {
			    let channel = res.data.data.channelList;									
					
					this.searchArr.map(item => {
					  if (item.key == "channelCode") {
					    let dataArr = [];
					    channel.map(item1 => {
					      let arr = {
					        name: item1.value,
					        value: item1.code
					      };
					      dataArr.push(arr);
					    });
					    item.items = dataArr;
					  }
					});
			  })
     // this.bannerSelect()
     		
     //  this.queryList()
    },
    activated() {
    }
  };
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
