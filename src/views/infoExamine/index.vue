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
			<span slot="other" slot-scope="props">
			  {{props.record.status == '00' ? '開啓' : '關閉'}}
			</span>
			<span slot="operation" slot-scope="props">
				<a-button v-if="props.record.auditorStatus==1" @click="examine(props.record)">審核</a-button>
				<a-button v-if="props.record.auditorStatus != 1" @click="toDetail(props.record)">明細</a-button>
			</span>
		</tableColumn>
		<a-modal :width='1200' :title="isAdd ? '審核會員資料' : '審核會員資料明細'" :visible="isShowChange" @cancel="isShowChange = false">
			<template slot="footer">
				<a-button v-if="isAdd" type="primary" @click="onSubmit" class="newMar">儲存</a-button>
				<a-button v-if="isAdd" key="back" @click="isShowChange = false">取消</a-button>
				<a-button v-if="!isAdd" key="back" @click="isShowChange = false">關閉</a-button>
			</template>
			<div class="examine">
				<div class="content">
					<!-- <h6>{{isAdd ? '審核廣告資料' : '修改權限'}}</h6> -->
					<div class="edit">
						<span style="padding-left: 200px;">修改前</span>
						<span>修改後</span>
					</div>					
					<a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
						<a-form-model-item label="客戶身份">
							<a-input v-model="beforeData.custIdentity" disabled class="w_300" />
							<a-input v-model="afterData.custIdentity"  disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="會員編號">
							<a-input v-model="beforeData.accountCode" disabled class="w_300" />
							<a-input v-model="afterData.accountCode" disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item  label="身份證字號" >
							<a-input v-model="beforeData.certificateNo" disabled class="w_300" />
							<a-input v-model="afterData.certificateNo"  disabled class="w_300 marL_200" />
						</a-form-model-item>	
						<a-form-model-item  label="姓名" >
							<a-input v-model="beforeData.name" disabled class="w_300" />
							<a-input v-model="afterData.accountName" :class="beforeData.name != afterData.accountName?'colorRed':''"
							 disabled class="w_300 marL_200" />
						</a-form-model-item>	
						<a-form-model-item label="生日">
							<a-input v-model="beforeData.birthday" disabled class="w_300" />
							<a-input v-model="afterData.birthday" :class="beforeData.birthday != afterData.birthday?'colorRed':''"
							 disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="手機">
							<a-input v-model="beforeData.phone" disabled class="w_300" />
							<a-input v-model="afterData.phone" :class="beforeData.phone != afterData.phone?'colorRed':''"
							 disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="E-mail">
							<a-input v-model="beforeData.email" disabled class="w_300" />
							<a-input v-model="afterData.email" :class="beforeData.email != afterData.email?'colorRed':''"
							 disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="推薦人會員編號">
							<a-input v-model="beforeData.referrerCode" disabled class="w_300" />
							<a-input v-model="afterData.referrerCode" :class="beforeData.referrerCode != afterData.referrerCode?'colorRed':''"
							  disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="會員註冊日期">
							<a-input v-model="beforeData.registerTimeStr" disabled class="w_300" />
							<a-input v-model="afterData.registerTimeStr"  disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="註冊通路">
							<a-input v-model="beforeData.channelName" disabled class="w_300" />
							<a-input v-model="afterData.channelName"  disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="Media code">
							<a-input v-model="beforeData.mediaCode" disabled class="w_300" />
							<a-input v-model="afterData.mediaCode"  disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="會員狀態">
							<span class="w_300 sw_date">{{beforeData.statusStr}}</span>
							<span class="w_300 sw_date marL_200" :class="beforeData.statusStr != afterData.statusStr?'colorRed':''">{{afterData.statusStr}}</span>
						</a-form-model-item>
						<a-form-model-item label="備註">
							<span class="sw_date">{{afterData.remarks}}</span>
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
		name: "infoExamine",
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
				modifierShow:false,
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
					this.Axios('memberServiceApprove', tep)
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
				this.Axios('memberApproveAfterDetail', obj)
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
				this.Axios('memberApproveDetail', obj)
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
				//console.log(this.postData)
				tep = Object.assign(this.postData, this.pageInfo)
				this.Axios('memberServiceListPage', tep)
					.then((res) => {
						this.columnsData = res.data.data.list;
						this.totalNum = res.data.data.total
					})
			},
			reQueryList() {
				Object.entries(this.postData).forEach(([key, value], index) => {
					this.postData[key] = undefined
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
					this.$set(this.postData, item.key, item.value)
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
