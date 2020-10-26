<template>
	<div>
		<comHeader :routes="routes" primary-button="" @primary="primary(1)"></comHeader>
		<div class="searchDiv">
			<!-- <input type="text" placeholder=""> -->
			<!-- <comTime1 title="生日" placeholder="" ></comTime1> -->
			<modelForm v-model='postData[item.key]' :size="item.size" :key='item.key' :title='item.title' :items='item.items'
			 :type='item.type' v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
			<div class="searchBTn">
				<a-button type="primary" class="searchQuery" @click="output">匯出</a-button>
				<a-button @click="reQueryList">清除</a-button>				
			</div>
		</div>
		<div class="record">
			<p>
				備註階段代碼說明：<br />
				１０註冊/登入 <br />
				１１投保成功 <br />
				１２投保未成功－可再次投保（錯誤代碼判斷可再次投保） <br />
				１３投保未成功－不可繼續投保（錯誤代碼判斷不可再次投保） <br />
				１４投保失敗－資料確認後跳出（包含資料確認頁之後，沒有投保成功跳出者） <br />
				１５投保跳出（包含投保資格確認、資料填寫頁面未完成跳出者）
			</p>
		</div>
	</div>
</template>
<script>
	import obj from './viewData.js'
	import {
		changeDateStyleB
	} from '@/common/common'
	import comTime1 from '@/components/comTime1'
	import {
		tempetDownLoad
	} from '@/common/common'
	export default {
		name: "behaviorRecord",
		components: {
			comTime1
		},
		watch: {
			pageInfo: {
				handler: function(value) {
					this.queryList()
				},
				deep: true
			},
			postData: {
				handler: function(value) {
					//console.log(value)
				},
				deep: true
			},

			"postData.DateRange": {
				handler: function(value) {
					try {
						this.postData.createDateBeg = value.split(',')[0]
						this.postData.createDateEnd = value.split(',')[1]
					} catch (e) {
						//TODO handle the exception
					}

				},
				deep: true
			},
		},
		data() {
			return {
				changeData: {},
				tabledata: {},
				changeArr: [],
				searchArr: [],
				totalNum: 0,
				postData: {},				
				routes: [
					// 面包屑数据
					{
						path: "infoChange",
						breadcrumbName: "會員資料管理"
					},
					...obj.path

				],
				columns: [], //表头
				RoleCode: '',
				columnsData: [], //表格信息
			};
		},
		methods: {
			getItems(item) {
				return item.items;
			},
			output() {
				tempetDownLoad('memberBehavior', this.postData, '客戶行為記錄')
			},
// 			queryList(index) {
// 				let tep = this.postData;				
// 				tep = Object.assign(this.postData)
// 				this.Axios('memberBehavior', tep)
// 					.then((res) => {
// 						this.columnsData = res.data.data.list;
// 						this.totalNum = res.data.data.total
// 					})
// 			},
// 
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
				} = obj;
				this.columns = columns;
				this.searchArr = searchArr;
				searchArr.forEach(item => {
					this.$set(this.postData, item.key, item.value)
				})				
			}
		},
		created() {
			this.createdSearch();
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
			// this.queryList()
		},
		activated() {}
	};
</script>
<style lang="scss" scoped>
	@import "./index.scss";
	// @import "../insureDetail/index.scss";
</style>
