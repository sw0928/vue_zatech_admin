<template>
	<div class="new_banner">
		<comHeader :routes="routes" primary-button="" @primary="primary(1)"></comHeader>
		<a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
			<a-form-model-item label="標題" prop="title">
				<a-input v-model="form.title" class="w_380" :disabled="disabledShow" placeholder="請填寫" />
			</a-form-model-item>
			<a-form-model-item label="圖片" prop="imgPhoneUrl">
				<a-upload action="https://tst-twaia-backup-admin.zaouter.com/ecadmin/fileEcadminService/uploadFiles" :headers="header"
				 name="files" @change="handleChangeH" class="upload-list-inline w_380">
					<a-button class="bor_ra4">手機上傳 </a-button> <span class="span_col">只支持上傳jpg/png文件，尺寸：{{sizePhone}}px，且不超過5M</span>
				</a-upload>
				<div class="img_sw">
					<a @click="imgSee(form.imgPhoneUrl,'手機上傳')">
						<img id="imgPhone" :src="form.imgPhoneUrl" />
					</a>
			
				</div>
				<!-- <span class="dis_t"></span> -->
			</a-form-model-item>
			<a-form-model-item label="圖片" prop="imgPcUrl" class="disImg">
				<a-upload action="https://tst-twaia-backup-admin.zaouter.com/ecadmin/fileEcadminService/uploadFiles" :headers="header"
				 name="files" @change="handleChangeP" class="upload-list-inline w_380">
					<a-button class="bor_ra4">PC上傳 </a-button><span class="span_col">只支持上傳jpg/png文件，尺寸：{{sizePc}}px，且不超過5M</span>
				</a-upload>
				<div class="img_sw">
					<a @click="imgSee(form.imgPcUrl,'PC上傳')">
						<img id="imgPc" :src="form.imgPcUrl" />
					</a>
				</div>
			</a-form-model-item>
			<a-form-model-item label="跳轉連結" prop="activityUrl">
				<a-input v-model="form.activityUrl" placeholder="請填寫" class="w_380" />
			</a-form-model-item>
			<a-form-model-item label="發佈狀態" prop="isPublish">
				<a-radio-group v-model="form.isPublish" class="w_380">
					<a-radio value="Y">
						上架
					</a-radio>
					<a-radio value="N">
						下架
					</a-radio>
				</a-radio-group>
			</a-form-model-item>
			<a-form-model-item label="發佈時間" prop="DateRange">
				<div class="">
					<modelForm 
					:is_null="item.is_null"
					v-model='postData[item.key]' 
					:size="item.size" 
					:width='item.width' 
					:key='item.key' 
					:title='item.title'
					 :items="getItems(item)"
					:type='item.type' 
					:required="item.required"
					v-for="item in searchArr" 
					class='comDiv' 
					:selectHour = item.selectHour
					:isAutoPlacehoder='true'></modelForm>
				
				</div>
			</a-form-model-item>
			<a-form-model-item label="通路名稱" prop="channelCode">
				<a-select v-model="form.channelCode" placeholder="請選擇" :disabled="disabledShow" class="w_380">
					<a-select-option :value="itme.code" v-for="(itme, index) in channel" :key="index">{{itme.value}}</a-select-option>
				</a-select>
			</a-form-model-item>
			<a-form-model-item label="通路代碼">
				<a-input v-model="form.channelCode" disabled class="w_380" />
			</a-form-model-item>
			<a-form-model-item :wrapper-col="{ span: 9, offset: 3 }">
				<a-button type="primary" @click="onSubmit" class="newMar">
					送審
				</a-button>
				<a-button style="margin-left: 10px;" @click="resetForm">
					取消
				</a-button>
			</a-form-model-item>
		</a-form-model>
		<a-modal title="查看圖片" :visible="isShowChange" @cancel="isShowChange = false">
			<template slot="footer">
				<a-button type="primary" @click="isShowChange = false" class="newMar">確定</a-button>
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
	import { tempetDownLoad, changeDateStyleB } from '@/common/common'
	export default {
		name: "newActivity",
		watch: {
			"postData.DateRange": {
				handler: function(value) {
					try {
						console.log(value)
						this.form.DateRange = value;
						this.postData.grantBegStr = value.split(',')[0];
						this.postData.grantEndStr = value.split(',')[1];
						if(this.postData.grantBegStr.indexOf('/') > -1){
							this.postData.grantBegStr = changeDateStyleB(this.postData.grantBegStr)
						}
						if(this.postData.grantEndStr.indexOf('/') > -1){
							this.postData.grantEndStr = changeDateStyleB(this.postData.grantEndStr)
						}
					} catch (e) {
						//TODO handle the exception
					}

				},
				deep: true
			},
			"form.channelCode": {
				handler: function(value) {
					this.form.channelCode = value;
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
				header: {
					Authorization: localStorage.getItem('token')
				},
				imgShow: true,
				disabledShow: false,
				isShowChange: false,
				sizePhone: '550*220',
				sizePc: '475*190',
				other: '',
				activityId: '',
				seeImg: undefined,
				seeImgName: undefined,
				changeArr: [],
				searchArr: [],
				positionL: [],
				channel: [],
				imgPhoneUrl: undefined,
				imgPcUrl: undefined,
				postData: {},
				routes: [
					// 面包屑数据
					{
						path: "activityManage",
						breadcrumbName: "行銷活動管理"
					},
					...obj.path

				],

				form: {
					DateRange: '',
					activityUrl: '',
					position: undefined,
					isPublish: 'Y',
					channelName: undefined,
					imgPhoneUrl: undefined,
					imgPcUrl: undefined,
					title: '',
					channelCode: '',
					grantEndStr: '',
					grantBegStr: ''
				},
				rules: {
					position: [{
						required: true,
						message: '請選擇所屬欄位！',
						trigger: 'change'
					}],
					isPublish: [{
						required: true,
						message: '',
						trigger: 'change'
					}, ],
					title: [{
							required: true,
							message: '請填寫標題！',
							trigger: 'blur'
						},
						{
							max: 100,
							message: '標題長度不能超過100子元',
							trigger: 'blur'
						},
					],
					activityUrl: [{
						required: true,
						message: '請填寫連結地址！',
						trigger: 'blur'
					}],
					channelCode: [{
						required: true,
						message: '請選擇通路！',
						trigger: 'change'
					}],
					DateRange: [{
						required: true,
						message: '請填寫發佈時間!',
						trigger: 'blur'
					}],
					imgPhoneUrl: [{
						required: true,
						message: '請上傳圖片！',
						trigger: 'blur'
					}],
					imgPcUrl: [{
						required: true,
						message: '請上傳圖片！',
						trigger: 'blur'
					}],
				},
			};
		},
		methods: {
			onSubmit() {
				this.$refs.ruleForm.validate(valid => {

					if (valid) {
						let tep = this.form;
						tep = Object.assign(this.form, this.postData, {
							'activityId': this.activityId
						});
						console.log(tep)
						this.Axios('addOrUpdateActivity', tep)
							.then((res) => {
								//console.log(res)
								this.$message.success('送審成功！');
								setTimeout(() => {
									this.$router.replace({
										name: 'activityManage',
									});
								}, 1500);

							})
					} else {
						this.$message.error('請檢查訊息')
						return false;
					}
				});
			},
			imgSee(img, val) {
				this.isShowChange = true;
				this.seeImg = img;
				this.seeImgName = val;
			},
			resetForm() {
				this.$refs.ruleForm.resetFields();
				this.$router.replace({
					name: 'bannerManage',
				});
			},
			getItems(item) {			
				return item.items;
			},
			handleChangeH({
				file,
				fileList
			}) {
				let self = this;
				if (file.status !== 'uploading') {
					let imgsrc = fileList.pop();
					//console.log(file.response.data)
					if (file.size > 5242880) {
						self.$message.error('圖片尺寸超過5M，請重新上傳！')
						return
					}
					if (self.form.imgPhoneUrl != undefined) {
						this.$confirm({
							title: '替換圖片',
							content: '該欄位已有圖片，再次上傳會覆蓋當前圖片，確認繼續提交嗎?',
							onOk() {
								self.form.imgPhoneUrl = file.response.data[0];
								setTimeout(function() {
									let img = document.getElementById("imgPhone"),
										width, height;
									// HTML5 browsers
									width = img.naturalWidth;
									height = img.naturalHeight;
									//console.log(width)
									if (width != '550' && height != '220') {
										self.$message.error('圖片尺寸：550*220px，請重新上傳！');
										self.form.imgPhoneUrl = undefined;
										return
									}
								}, 500)
							},
							onCancel() {},
						});
					} else {
						self.form.imgPhoneUrl = file.response.data[0];
						setTimeout(function() {
							let img = document.getElementById("imgPhone"),
								width, height;
							// HTML5 browsers
							width = img.naturalWidth;
							height = img.naturalHeight;
							//console.log(width)
							if (width != '550' && height != '220') {
								self.$message.error('圖片尺寸：550*220px，請重新上傳！');
								self.form.imgPhoneUrl = undefined;
								return
							}
						}, 500)
					}



				}
			},
			handleChangeP({
				file,
				fileList
			}) {
				let self = this;
				if (file.status !== 'uploading') {
					let imgsrc = fileList.pop();
					//console.log(file)
					if (file.size > 5242880) {
						self.$message.error('圖片尺寸超過5M，請重新上傳！')
						return
					}
					if (self.form.imgPcUrl != undefined) {
						this.$confirm({
							title: '替換圖片',
							content: '該欄位已有圖片，再次上傳會覆蓋當前圖片，確認繼續提交嗎?',
							onOk() {
								self.form.imgPcUrl = file.response.data[0];
								setTimeout(() => {
									// HTML5 browsers
									let img = document.getElementById("imgPc"),
										width, height;
									width = img.naturalWidth;
									height = img.naturalHeight;
									if (width != '475' && height != '190') {
										self.$message.error('圖片尺寸：475*190px，請重新上傳！');
										self.form.imgPcUrl = undefined;
										return
									}
								}, 500)
							},
							onCancel() {},
						});
					} else {
						self.form.imgPcUrl = file.response.data[0];
						setTimeout(() => {
							// HTML5 browsers
							let img = document.getElementById("imgPc"),
								width, height;
							width = img.naturalWidth;
							height = img.naturalHeight;
							if (width != '475' && height != '190') {
								self.$message.error('圖片尺寸：475*190px，請重新上傳！');
								self.form.imgPcUrl = undefined;
								return
							}
						}, 500)
					}

				}
			},
			createdSearch() {
				let session = JSON.parse(window.sessionStorage.getItem("timeInfo"));
				let {
					searchArr,				
				} = obj;
				this.searchArr = searchArr;
				searchArr.forEach((item, index) => {
					this.$set(this.postData, item.key, item.value)
				})
				if(session == undefined){
					
				}else{
					this.$set(this.postData, 'DateRange', {
						'start':session.grantBegStr,
						'end' :session.grantEndStr,
					})	
				}
			},
		},
		created() {
			this.activityId = this.$route.query.activityId;
			this.createdSearch()
			this.Axios('cmsBannerInitSelect', {})
				.then((res) => {
					this.channel = res.data.data.channelList;
					//console.log(this.positionL)
					//console.log(this.channel)
				})
			
			if (this.activityId != undefined) {
				this.routes[1].breadcrumbName = "修改行銷活動"
				this.Axios('getDetailActivity', {
						activityId: this.activityId
					})
					.then((res) => {
						this.form = {
							activityUrl: res.data.data.activityUrl,
							isPublish: res.data.data.isPublish,
							channelName: res.data.data.channelName,
							imgPhoneUrl: res.data.data.imgPhoneUrl,
							imgPcUrl: res.data.data.imgPcUrl,
							title: res.data.data.title,
							DateRange: res.data.data.grantBegStr + ',' + res.data.data.grantEndStr,
							channelCode: res.data.data.channelCode,
						};
						this.disabledShow = true;
						//this.imgShow = false;						
					})
			} else {
				this.routes[1].breadcrumbName = "新增行銷活動"
				this.form = {
					activityUrl: '',
					isPublish: 'Y',
					channelName: undefined,
					imgPhoneUrl: undefined,
					imgPcUrl: undefined,
					title: '',
					DateRange: '',
					channelCode: '',
				};
				this.disabledShow = false;
				//this.imgShow = true;
			}

		},
	};
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>
