<template>
	<div class="">
		<comHeader :routes="routes" primary-button="" @primary="primary(1)"></comHeader>
		<div class="searchDiv">
			<!-- {{goodsList}} -->
			<modelForm v-model='postData[item.key]' :size="item.size" :width='item.width' :key='item.key' :title='item.title'
			 :items="getItems(item)" :type='item.type' v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
			<div class="searchBTn">
				<a-button type="primary" class="searchQuery" @click="queryList(1)">查詢</a-button>
				<a-button @click="reQueryList">清除</a-button>
				<!--        <a-button type="primary" class="searchQuery" @click="output">匯出</a-button>
 -->
			</div>
		</div>
		<div class="tab">
			<div class="tab_left">
				<div class="info_list" :class="{'is_select':is_chose==1}" @click="chose_list(1)">列表清單</div>
				<div class="modify_list" :class="{'is_select':is_chose==2}" @click="chose_list(2)">修改記錄</div>
			</div>
			<div class="tab_right">
				<div class="add_access" @click="newHelp()">新增</div>
			</div>
		</div>
		<tableColumn v-if="is_chose==1" :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum"
		 :openExpand="false">
			<span slot="other" slot-scope="props" v-if="sortShow&&columnsData.length > 1">
				<span class="iconfont icon-iconset0414" :class="props.record.sortEnum == 1?'noColor':''" @click="sort_up(props.record.helpId,props.index)"></span>
				<span class="iconfont icon-iconset0413" :class="props.record.sortEnum == 3?'noColor':''" @click="sort_down(props.record.helpId,props.index)"></span>
			</span>
			<span slot="operation" slot-scope="props">
				<a-button @click="edit(props.record.helpId)">修改</a-button>
				<a-button @click="del(props.record)">刪除</a-button>
			</span>
		</tableColumn>
		<tableColumn v-if="is_chose==2" :columns="columnsTwo" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum"
		 :openExpand="false">
			<span slot="operation" slot-scope="props">
				<span v-if="props.record.auditorStatus==3">審核通過</span>
				<span v-if="props.record.auditorStatus==1">待審核</span>
				<span style="color: #196AD4;cursor: pointer;" v-if="props.record.auditorStatus==2" @click="refund(props.record.auditorDescribe)">退件</span>
			</span>
		</tableColumn>
		<a-modal :width='980' :title="isAdd ? '新增友邦幫忙' : '修改友邦幫忙'" :visible="isShowChange" @cancel="isShowChange = false">
			<template slot="footer">
				<a-button type="primary" @click="onSubmit" class="newMar">
					送審
				</a-button>
				<a-button key="back" @click="isShowChange = false">取消</a-button>

			</template>
			<div class="examine">
				<div class="content">
					<a-form-model ref="ruleForm" :layout="form.layout" :model="form" :rules="rules" >
						<a-form-model-item label="問題編號">
							<a-input v-model="form.questionCode" disabled class="w_300" />
						</a-form-model-item>
						<a-form-model-item label="所屬標籤" prop="helpLabel">
							<a-select v-model="form.helpLabel" placeholder="請選擇" :disabled="disabledShow" class="w_300">
								<a-select-option :value="itme.code" v-for="(itme, index) in helpLabelL" :key="index">{{itme.name}}</a-select-option>
							</a-select>
						</a-form-model-item>
						<a-form-model-item label="問題" prop="question">
							<a-input v-model="form.question" class="w_710 " />
						</a-form-model-item>
						<a-form-model-item label="答案" prop="answer">
							<a-input v-model="form.answer" type="textarea" class="w_710 h_450" />
						</a-form-model-item>
					</a-form-model>
				</div>
			</div>
		</a-modal>
		<!-- <a-modal title="審核備註" :visible="visible" @ok="handleOk" @cancel="handleCancel">
			<p>{{ ModalText }}</p>
		</a-modal> -->
	</div>
</template>
<script>
	import obj from './viewData.js'
	import {
		tempetDownLoad
	} from '@/common/common'
	export default {
		name: "helpManage",
		components: {},
		watch: {
			pageInfo: {
			  handler: function(value) {
			    this.queryList()
			  },
			  deep: true
			},
			
		},
		data() {
			return {
				labelCol: {
					span: 4
				},
				wrapperCol: {
					span: 14
				},
				helpLabelL: [],
				searchArr: [],
				//ModalText:'無記錄',
				totalNum: 0,
				postData: {},
				is_visit: 0,
				isShowChange: false,
				disabledShow:false,
				//visible: false,
				sortShow: false,
				is_chose: 1,
				pageInfo: {
					current: 1, //当前页数
					pageSize: 10, //每页条数
				},
				isAdd: true,
				routes: [
					// 面包屑数据
					{
						path: "helpManage",
						breadcrumbName: "友邦幫忙管理"
					},
					...obj.path

				],
				form: {
					question: '',
					layout: 'inline',
					questionCode: undefined,
					helpLabel: undefined,
					answer: '',
					applyId: '',
				},
				rules: {
					question: [{
						required: true,
						message: '請填寫問題!',
						trigger: 'change'
					}],
					helpLabel: [{
						required: true,
						message: '請選擇所屬標籤!',
						trigger: 'change'
					}],
					answer: [{
						required: true,
						message: '請填寫答案!',
						trigger: 'change'
					}]
				},
				columns: [], //表头
				RoleCode: '',
				columnsData: [], //表格信息
			};
		},
		methods: {
			onSubmit() {
				this.$refs.ruleForm.validate(valid => {							
					if (valid) {
						let tep = this.form;
						tep = Object.assign(this.form);
						//console.log(tep)
						this.Axios('cmsHelpAdd', tep)
							.then((res) => {
								//console.log(res)
								this.$message.success('送審成功！');
								setTimeout(() => {
									this.isShowChange = false;
									this.form = {
										question: '',
										layout: 'inline',
										questionCode: undefined,
										helpLabel: undefined,
										answer: '',
										applyId: '',
									};
								}, 1500);
			
							})
					} else {
						this.$message.error('請檢查訊息')
						return false;
					}
				});
			},
			getItems(item) {
				//console.log(item)
				return item.items
			},
			chose_list(index) {
				this.is_chose = index;
				this.pageInfo.current = 1
				this.queryList()
			},
			refund(value) {
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
			//排序下移
			sort_down(id,index){
				let tep = {
					helpId:id,
					helpLabel:this.postData.helpLabel
				};
				this.Axios('cmsHelpUown',tep)
				.then((res) => {
				    this.$message.success('操作成功！');
					if(index == 9){
						this.pageInfo.current = this.pageInfo.current + 1;
						this.queryList();
					}else{
						this.queryList();
					}						
				})
			},
			//上移
			sort_up(id,index){
				let tep = {
					helpId:id,
					helpLabel:this.postData.helpLabel
				};
				this.Axios('cmsHelpUp',tep)
				.then((res) => {
				    this.$message.success('操作成功！');
						if(index == 0&&this.pageInfo.current > 1){
							this.pageInfo.current = this.pageInfo.current - 1;
							this.queryList();
						}else{
							this.queryList();
						}
				})
			},
			del(obj) {
			  let self = this;
			  this.$confirm({
			    title: '確定刪除?',
			    content: `是否刪除该'${obj.questionCode}'問題編號`,
			    onOk() {
			      let tep = {
					helpId:obj.helpId
				  };
			      self.Axios('cmsHelpDelete', tep)
			        .then((res) => {			          
			          self.$message.success('操作成功！')
			          self.queryList()
			        })
			    },
			    onCancel() {},
			  });
			
			},
			edit(value) {	
				this.isShowChange = true;
				this.Axios('cmsHelpdetail', {
						helpId: value
					})
					.then((res) => {
						//console.log(res.data.data)
						this.form = {
							question: res.data.data.question,
							questionCode: res.data.data.questionCode,
							helpLabel: res.data.data.helpLabel,
							answer: res.data.data.answer,
							helpId: res.data.data.helpId,
							layout: 'inline',
							applyId: ""
						};
						this.disabledShow = true;
						this.isAdd = false;
						//this.imgShow = false;															
					})				
				
			},
			newHelp() {
				this.isShowChange = true;
				this.Axios('cmsHelpCode', {})
					.then((res) => {
						this.form = {
							question: '',
							questionCode: res.data.data.questionCode,
							helpLabel: undefined,
							answer: '',
							helpId: '',
							layout: 'inline',
							applyId: res.data.data.applyId
						};
						this.disabledShow = false;
						this.isAdd = true;
					})
			},
			queryList(index) {
				let tep = this.postData;
				if (index == 1) {
					this.pageInfo.current = 1
				}
				if (tep.helpLabel == undefined || tep.helpLabel == "") {
					this.sortShow = false
				} else {
					this.sortShow = true
				}
				tep = Object.assign(this.postData, this.pageInfo)
				if (this.is_chose == 1) {
					this.Axios('cmsHelpList', tep)
						.then((res) => {
							if(res.data.data == null){
								this.columnsData = [];
								this.totalNum = 0;
							}else{
								this.columnsData = res.data.data.list;
								this.totalNum = res.data.data.total;
							}							
						})
				} else {
					this.Axios('cmsHelpModifier_list', tep)
						.then((res) => {
							if(res.data.data == null){
								this.columnsData = [];
								this.totalNum = 0;
							}else{
								this.columnsData = res.data.data.list;
								this.totalNum = res.data.data.total;
							}
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
				} = obj;
				this.columns = columns;
				this.columnsTwo = columnsTwo;
				this.searchArr = searchArr;
				searchArr.forEach((item, index) => {
					this.$set(this.postData, item.key, undefined)
				})
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
			this.Axios('cmsHelpDTOService', {})
				.then((res) => {
					this.helpLabelL = res.data.data;
					this.searchArr.map(item => {					  
					  if (item.key == "helpLabel") {
					    let dataArr = [];
					    this.helpLabelL.map(item1 => {
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
			// this.queryList()
		},
		activated() {}
	};
</script>
<style lang="scss" scoped>
	@import "./index.scss";
</style>
