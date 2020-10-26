<template>
	<div class="">
		<comHeader :routes="routes" primary-button="" @primary="primary(1)"></comHeader>
		<div class="searchDiv">
			<!-- {{goodsList}} -->
			<modelForm v-model='postData[item.key]' :size="item.size" :width='item.width' :key='item.key' :title='item.title'
			 :items="getItems(item)" :type='item.type' v-for="item in searchArr" class='comDiv' :selectHour = item.selectHour :isAutoPlacehoder='false'></modelForm>
			<div class="searchBTn">
				<a-button type="primary" class="searchQuery" @click="queryList(1)">查詢</a-button>
				<a-button @click="reQueryList">清除</a-button>
				<!--        <a-button type="primary" class="searchQuery" @click="output">匯出</a-button>
 -->
			</div>
		</div>

		<tableColumn :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
			<span slot="operation" slot-scope="props">
				<a-button v-if="props.record.auditorStatus==1" @click="examine(props.record)">審核</a-button>
				<a-button v-if="props.record.auditorStatus != 1" @click="toDetail(props.record)">明細</a-button>
			</span>
		</tableColumn>
		<a-modal :width='1200' :title="isAdd ? '審核邀請好友資料' : '邀請好友明細'" :visible="isShowChange" @cancel="isShowChange = false">
			<template slot="footer">
				<a-button v-if="isAdd&&afterData.isDeleted != 'Y'" type="primary" @click="onSubmit" class="newMar">確定</a-button>
				<a-button v-if="isAdd&&afterData.isDeleted == 'Y'" type="primary" @click="onSubmit" class="newMar">確定</a-button>
				<a-button v-if="isAdd" key="back" @click="isShowChange = false">取消</a-button>
				<a-button v-if="!isAdd" key="back" @click="isShowChange = false">返回</a-button>
			</template>
			<div class="examine">
				<div class="content">
					<!-- <h6>{{isAdd ? '審核廣告資料' : '修改權限'}}</h6> -->
					<div v-if="beforeData != null" class="edit">
						<span style="padding-left: 200px;">修改前</span>
						<span>修改後</span>
					</div>
					<div v-if="beforeData == null" class="edit">
						<span style="padding-left: 200px;">刪除</span>
					</div>
					<a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" v-if="beforeData != null">
						<a-form-model-item label="標題">
							<a-input v-model="beforeData.title" disabled class="w_300" />
							<a-input v-model="afterData.title" :class="beforeData.title != afterData.title?'colorRed':''" disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="圖片">
							<div class="sw_date imgSize" style="width: 50%;">
								<a @click="imgSee(beforeData.imgPhoneUrl,'手機上傳')">
									<img :src="beforeData.imgPhoneUrl" />
								</a>
								<p>手機</p>
								<a @click="imgSee(beforeData.imgPcUrl,'PC上傳')">
									<img :src="beforeData.imgPcUrl" />
								</a>
								<p>PC</p>
							</div>
							<div class="sw_date imgSize sw_img" style="width: 47%;margin-left: 3%;">
								<a @click="imgSee(afterData.imgPhoneUrl,'手機上傳')">
									<img :src="afterData.imgPhoneUrl" />
								</a>								
								<p>手機</p>
								<a @click="imgSee(afterData.imgPcUrl,'PC上傳')">
									<img :src="afterData.imgPcUrl" />
								</a>
								<p>PC</p>
							</div>
						</a-form-model-item>
						<a-form-model-item label="內文標題">
							<a-input v-model="beforeData.innerTitle" disabled class="w_300" />
							<a-input v-model="afterData.innerTitle" :class="beforeData.innerTitle != afterData.innerTitle?'colorRed':''"
							 disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item  label="內文" >
							<a-input v-model="beforeData.innerContent" type="textarea" disabled class="w_300" />
							<a-input v-model="afterData.innerContent" type="textarea" :class="beforeData.innerContent != afterData.innerContent?'colorRed':''" disabled class="w_300 marL_200" />
						</a-form-model-item>	
						<a-form-model-item  label="備註" >
							<a-input v-model="beforeData.remarks" type="textarea" disabled class="w_300" />
							<a-input v-model="afterData.remarks" type="textarea" :class="beforeData.remarks != afterData.remarks?'colorRed':''" disabled class="w_300 marL_200" />
						</a-form-model-item>	
						<a-form-model-item label="推薦連結">
							<a-input v-model="beforeData.recommendationUrl" disabled class="w_300" />
							<a-input v-model="afterData.recommendationUrl" :class="beforeData.recommendationUrl != afterData.recommendationUrl?'colorRed':''"
							 disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="發佈狀態">
							<span class="w_300 sw_date">{{beforeData.isPublish =='Y'?'上架':'下架'}}</span>
							<span class="w_300 sw_date marL_200" :class="beforeData.isPublish != afterData.isPublish?'colorRed':''">{{afterData.isPublish =='Y'?'上架':'下架'}}</span>
						</a-form-model-item>
						<a-form-model-item label="發佈時間">
							<div class="sw_date marR_100">
								<a-input v-model="beforeData.grantBegStr" disabled style="width: 36%;" />--
								<a-input v-model="beforeData.grantEndStr" disabled style="width: 36%;" />
							</div>
							<div class="sw_date">

								<a-input v-model="afterData.grantBegStr" :class="beforeData.grantBegStr != afterData.grantBegStr?'colorRed':''"
								 disabled style="width: 36%;" />--
								<a-input v-model="afterData.grantEndStr" :class="beforeData.grantEndStr != afterData.grantEndStr?'colorRed':''"
								 disabled style="width: 36%;" />
							</div>
						</a-form-model-item>
						<a-form-model-item label="審核">
							<a-radio-group v-model="ruleForm.auditorStatus" v-if="afterData.auditorStatus == '1'" :disabled="modifierShow" class="w_300">
								<a-radio value="3">
									通過
								</a-radio>
								<a-radio value="2">
									退件
								</a-radio>
							</a-radio-group>
							<span v-else>{{afterData.auditorStatus=='1'?'待審核':afterData.auditorStatus=='2'?'退件':'審核通過'}}</span>
						</a-form-model-item>
						<a-form-model-item label="審核備註">
							<a-input :disabled="!isAdd || modifierShow" v-model="ruleForm.auditorDescribe" type="textarea" />
						</a-form-model-item>
					</a-form-model>
					<a-form-model :label-col="labelCol" :wrapper-col="wrapperCol" v-if="beforeData == null">						
						<a-form-model-item label="標題">
							<a-input v-model="afterData.title" disabled class="w_300 " />
						</a-form-model-item>
						<a-form-model-item label="圖片">
							<div class="sw_date imgSize" style="width: 50%;">
								<a @click="imgSee(afterData.imgPhoneUrl,'手機上傳')">
									<img :src="afterData.imgPhoneUrl" />
								</a>								
								<p>手機</p>
								<a @click="imgSee(afterData.imgPcUrl,'PC上傳')">
									<img :src="afterData.imgPcUrl" />
								</a>
								<p>PC</p>
							</div>
						</a-form-model-item>
						<a-form-model-item label="內文標題">
							<a-input v-model="afterData.innerTitle" disabled class="w_300" />
						</a-form-model-item>
						<a-form-model-item  label="內文" >
							<a-input v-model="afterData.innerContent" type="textarea" disabled class="w_300" />
						</a-form-model-item>	
						<a-form-model-item  label="備註" >
							<a-input v-model="afterData.remarks" type="textarea" disabled class="w_300" />
						</a-form-model-item>	
						<a-form-model-item label="推薦連結">
							<a-input v-model="afterData.recommendationUrl" disabled class="w_300" />							
						</a-form-model-item>
						<a-form-model-item label="發佈狀態">
							<span class="w_300 sw_date ">{{afterData.isPublish =='Y'?'上架':'下架'}}</span>
						</a-form-model-item>
						<a-form-model-item label="發佈時間">
							<div class="sw_date">
								<a-input v-model="afterData.grantBegStr" disabled style="width: 36%;" />--
								<a-input v-model="afterData.grantEndStr" disabled style="width: 36%;" />
							</div>
						</a-form-model-item>
						<a-form-model-item label="審核">
							<a-radio-group v-model="ruleForm.auditorStatus" v-if="afterData.auditorStatus == '1'" class="w_300">
								<a-radio value="3">
									通過
								</a-radio>
								<a-radio value="2">
									退件
								</a-radio>
							</a-radio-group>
							<span v-else>{{afterData.auditorStatus=='1'?'待審核':afterData.auditorStatus=='2'?'退件':'審核通過'}}</span>
						</a-form-model-item>
						<a-form-model-item label="審核備註">
							<a-input :disabled="!isAdd" v-model="ruleForm.auditorDescribe" type="textarea" />
						</a-form-model-item>
					</a-form-model>
				</div>
			</div>
		</a-modal>
		<a-modal :width='748' title="查看圖片" :visible="isShowChangeB" @cancel="isShowChangeB = false">
		  <template slot="footer">	
			<a-button type="primary"  @click="isShowChangeB = false" class="newMar">確定</a-button>
		    <!-- <a-button key="back" @click="isShowChange = false">取消</a-button>	 -->			
		  </template>
			<div class="see_img">
				<div class="content">
					<img :src="seeImg" />	
					<h6>{{seeImgName}}</h6>				
				</div>			
			</div>	
		</a-modal>
	</div>
</template>
<script>
	import obj from './viewData.js'
	import {
		tempetDownLoad
	} from '@/common/common'
	export default {
		name: "friendExamine",
		components: {},
		watch: {
			pageInfo: {
			  handler: function(value) {
			    this.queryList()
			  },
			  deep: true
			},
			"postData.DateRange": {
				handler: function(value) {
					try {
						//console.log(value)
						this.postData.modifiedStart = value.split(',')[0];
						this.postData.modifiedEnd = value.split(',')[1];
					} catch (e) {
						//TODO handle the exception
					}
			
				},
				deep: true
			},
		},
		data() {
			return {
				labelCol: {
					span: 3
				},
				wrapperCol: {
					span: 20
				},
				changeArr: [],
				searchArr: [],
				totalNum: 0,
				postData: {},
				is_chose: 0,
				isShowChange: false,
				isShowChangeB: false,
				modifierShow:false,
				seeImg:undefined,
				seeImgName:undefined,
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
				beforeData: [],
				afterData: [],
				//positionL: [],
				ruleForm: {
					auditorDescribe: undefined,
					auditorStatus: 1,
				},
				columns: [], //表头
				//channelCode: [],
				approveStatus: [],
				RoleCode: '',
				columnsData: [], //表格信息
			};
		},
		methods: {
			onSubmit() {
				let tep = Object.assign(this.afterData, this.ruleForm);
				if(this.modifierShow){
					this.$message.error('不可以審核自己的修改訊息!')
					return false;
				}else{
					this.Axios('approveFriend', tep)
						.then((res) => {
							//console.log(res)
							this.$message.success('操作成功！');
							setTimeout(() => {
							  this.isShowChange = false;
							  this.queryList()
							}, 1000);
							
						})
				}
				

			},
			getItems(item) {
				// console.error(this.goodsList)
				if (item.key == 'goodsId') {
					return this.goodsList
				} else if (item.key == 'orderStatus') {
					return this.orderStatusEnum
				} else {
					return item.items
				}
			},
			toDetail(obj) {
				//console.log(obj);
				this.isShowChange = true;
				this.isAdd = false;
				this.Axios('getApproveFriendDetail', obj)
					.then((res) => {
						//console.log(res.data.data)
						this.beforeData = res.data.data.beforeData;
						this.afterData = res.data.data.afterData;
						this.ruleForm.auditorDescribe = res.data.data.afterData.auditorDescribe;
						if(this.beforeData != null){
							
						}else{							
							this.ruleForm.auditorStatus = undefined;
						}
					})
			},
			imgSee(img,val){
				this.isShowChangeB = true;
				this.seeImg = img;
				this.seeImgName = val;
			},
			examine(obj) {
				//console.log(obj);
				// obj = Object.assign({}, obj)
				// this.changeData = obj;
				if(obj.operationStatus == 0){
					this.modifierShow = true;
				}else{
					this.modifierShow = false;	
				}	
				this.isAdd = true;
				this.isShowChange = true;
				this.Axios('getApproveFriendDetail', obj)
					.then((res) => {
						//console.log(res.data.data.beforeData)
						this.beforeData = res.data.data.beforeData;
						this.afterData = res.data.data.afterData;
						this.ruleForm.auditorStatus = 1;
						this.ruleForm.auditorDescribe = undefined;
					})
			},			
			queryList(index) {

				let tep = this.postData;
				if (index == 1) {
					this.pageInfo.current = 1
				}
				tep = Object.assign(this.postData, this.pageInfo)
				this.Axios('friendApproveListPage', tep)
					.then((res) => {
						this.columnsData = res.data.data.list;
						this.totalNum = res.data.data.total
					})
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
					searchArr,
					changeArr
				} = obj;
				this.columns = columns;
				this.searchArr = searchArr;
				this.changeArr = changeArr;
				searchArr.forEach((item, index) => {
					this.$set(this.postData, item.key, item.value || undefined)
				})
				// changeArr.forEach(item => {
				//   this.$set(this.changeData, item.key, undefined)
				// })
			}
		},
		computed: {
			goodsList() {
				return this.$store.state.customer.goodsList
			},
			orderStatusEnum() {
				return this.$store.state.customer.orderStatusEnum
			}
		},
		created() {
			this.createdSearch()
			this.Axios('cmsBannerInitSelect', {})
				.then((res) => {
					this.approveStatus = res.data.data.approveStatusList;
					this.searchArr.map(item => {					  
					  if (item.key == "auditorStatus") {
					    let dataArr = [];
					    this.approveStatus.map(item1 => {
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
			this.queryList()
		},
		activated() {}
	};
</script>
<style lang="scss" scoped>
	@import "./index.scss";
</style>
