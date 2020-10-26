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
		<a-modal :width='1200' :title="isAdd ? '審核友邦幫忙資料' : '審核友邦幫忙資料明細'" :visible="isShowChange" @cancel="isShowChange = false">
			<template slot="footer">
				<a-button v-if="isAdd&&afterData.isDeleted != 'Y'" type="primary" @click="onSubmit" class="newMar">確定</a-button>
				<a-button v-if="isAdd&&afterData.isDeleted == 'Y'" type="primary" @click="onSubmit" class="newMar">確定</a-button>
				<a-button v-if="isAdd" key="back" @click="isShowChange = false">取消</a-button>
				<a-button v-if="!isAdd" key="back" @click="isShowChange = false">返回</a-button>
			</template>
			<div class="examine">
				<div class="content">
					<div v-if="beforeData != null" class="edit">
						<span style="padding-left: 200px;">修改前</span>
						<span>修改後</span>
					</div>
					<div v-if="beforeData == null" class="edit">
						<span style="padding-left: 200px;">刪除</span>
					</div>
					<a-form-model  :label-col="labelCol" :wrapper-col="wrapperCol" v-if="beforeData != null">
						<a-form-model-item label="問題編號">
							<a-input v-model="beforeData.questionCode" disabled class="w_300" />
							<a-input v-model="afterData.questionCode" :class="beforeData.questionCode != afterData.questionCode?'colorRed':''" disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="所屬標籤">
							<a-select v-model="beforeData.helpLabel" disabled class="w_300">
								<a-select-option :value="itme.code" v-for="(itme, index) in helpLabelL" :key="index">{{itme.name}}</a-select-option>
							</a-select>
							<a-select v-model="afterData.helpLabel" disabled class="w_300 marL_200">
								<a-select-option :value="itme.code" v-for="(itme, index) in helpLabelL" :key="index">{{itme.name}}</a-select-option>
							</a-select>
						</a-form-model-item>
						<a-form-model-item label="問題">
							<a-input v-model="beforeData.question" disabled class="w_300" />
							<a-input v-model="afterData.question" :class="beforeData.question != afterData.question?'colorRed':''"
							 disabled class="w_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item  label="答案" >
							<a-input v-model="beforeData.answer" type="textarea" disabled class="w_300 h_300" />
							<a-input v-model="afterData.answer" type="textarea" :class="beforeData.answer != afterData.answer?'colorRed':''" disabled class="w_300 h_300 marL_200" />
						</a-form-model-item>
						<a-form-model-item label="審核">
							<a-radio-group v-model="ruleForm.auditorStatus" v-if="afterData.auditorStatus == '1'" :disabled="modifierShow"  class="w_300">
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
							<a-input :disabled="!isAdd || modifierShow" v-model="ruleForm.auditorDescribe"  type="textarea" />
						</a-form-model-item>
					</a-form-model>
					<a-form-model  :label-col="labelCol" :wrapper-col="wrapperCol" v-if="beforeData == null">
						<a-form-model-item label="問題編號">
							<a-input v-model="afterData.questionCode" disabled class="w_300" />
						</a-form-model-item>
						<a-form-model-item label="所屬標籤">
							<a-select v-model="afterData.helpLabel" disabled class="w_300">
								<a-select-option :value="itme.code" v-for="(itme, index) in helpLabelL" :key="index">{{itme.name}}</a-select-option>
							</a-select>
						</a-form-model-item>
						<a-form-model-item label="問題">
							<a-input v-model="afterData.question" disabled class="w_300" />
						</a-form-model-item>
						<a-form-model-item  label="答案" >
							<a-input v-model="afterData.answer" type="textarea" disabled class="w_300 h_300" />
						</a-form-model-item>
						<a-form-model-item label="審核">
							<a-radio-group v-model="ruleForm.auditorStatus"  v-if="afterData.auditorStatus == '1'" class="w_300">
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
	</div>
</template>
<script>
	import obj from './viewData.js'
	import {
		tempetDownLoad
	} from '@/common/common'
	export default {
		name: "helpExamine",
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
						path: "helpExamine",
						breadcrumbName: "友邦幫忙管理"
					},
					...obj.path

				],
				beforeData: [],
				afterData: [],
				helpLabelL: [],
				userInfo:[],
				ruleForm: {
					auditorDescribe: undefined,
					auditorStatus: 1,
				},
				columns: [], //表头
				channelCode: [],
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
					this.Axios('cmsHelpAudit', tep)
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
					return item.items
			},
			toDetail(obj) {
				//console.log(obj);
				this.isShowChange = true;
				this.isAdd = false;
				this.Axios('cmsHelpAuditDetail', obj)
					.then((res) => {
						//console.log(res.data.data)
						this.beforeData = res.data.data.before;
						this.afterData = res.data.data.after;
						this.ruleForm.auditorDescribe = res.data.data.after.auditorDescribe;
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
				this.Axios('cmsHelpAuditDetail', obj)
					.then((res) => {												
						//console.log(res.data.data.beforeData)
						this.beforeData = res.data.data.before;
						this.afterData = res.data.data.after;
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
				this.Axios('cmsHelpAuditList', tep)
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
					this.$set(this.postData, item.key, item.value)
				})
				// changeArr.forEach(item => {
				//   this.$set(this.changeData, item.key, undefined)
				// })
			}
		},
		computed: {
		},
		created() {
			let self = this
			self.createdSearch()
			self.Axios('cmsHelpDTOService', {})
				.then((res) => {
					self.helpLabelL = res.data.data;
					self.searchArr.map(item => {					  
					  if (item.key == "helpLabel") {
					    let dataArr = [];
					    self.helpLabelL.map(item1 => {
					      let arr = {
					        name: item1.name,
					        value: item1.code
					      };
					      dataArr.push(arr);
					    });
					    item.items = dataArr;
					  }
					});											
					
				})
			this.queryList()
			self.userInfo = self.$longData('1', 'userInfo') || {
			  realName: '--'
			}
		},
		activated() {}
	};
</script>
<style lang="scss" scoped>
	@import "./index.scss";
</style>
