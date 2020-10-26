<template>
  <div>
    <comHeader :routes="routes" primary-button="" @primary="primary(1)"></comHeader>
    <div class="searchDiv">
      <!-- <input type="text" placeholder=""> -->
      <!-- <comTime1 title="生日" placeholder="" ></comTime1> -->
      <modelForm v-model='postData[item.key]' :size="item.size" :key='item.key' :title='item.title' :items='item.items' :type='item.type'
        v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
      <div class="searchBTn">
        <a-button type="primary" class="searchQuery" @click="queryList(1)">查詢</a-button>
        <a-button @click="reQueryList">清除</a-button>
        <a-button type="primary" class="searchQuery" @click="output">匯出</a-button>
      </div>
    </div>
    <tableColumn :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
      <span slot="operation" slot-scope="props">
        <a-button v-if="props.record.isLocked == 'N'" @click="edit(props.record.id)">修改</a-button>
        <a-button @click="showChange(props.record.id)">修改記錄</a-button>
        <a-button @click="givePower(props.record.id)">明細</a-button>
      </span>
      <!-- <span slot="other" slot-scope="props">
        {{props.record.status == '00' ? '開啓' : '關閉'}}
      </span> -->
    </tableColumn>
    <a-modal title="修改會員資料" :visible="isShowChange" @ok="changeOk()" @cancel="isShowChange = false">
      <template slot="footer">
        <!-- {{isAdd}} -->
        <a-button key="back" @click="isShowChange = false">關閉</a-button>
        <a-button type='primary' key="submit" @click="changeOk">儲存
        </a-button>
      </template>
      <div id="add" class="Specail">
        <modelForm 
				v-model='changeData[item.key]' 
				:disabled='item.disabled' 
				:required="item.required" 
				:error.sync="item.error" 
				:regular='item.regular'
          :key='item.key' 
					:dataKey='item.key'
					 :errorMsg="item.errorMsg" 
					 :title='item.title' 
					 :items="getItems(item)"
					 :type='item.type' 
					 v-for="item in changeArr" 
					 class='comDiv'
          :isAutoPlacehoder='true'>
         <span v-if="changeKey == item.key">
             <span class="oRed" v-if='(item.key == "name" || item.key == "birthday") && (changeData.custStatus == 2 || changeData.custStatus == 4)' >請照會POS修改客戶姓名或生日</span>
             <span class="oRed" v-if='(item.key == "name" || item.key == "birthday") && changeData.custStatus == 3' >請協助客戶變更既有的有效保單之姓名或生日並照會POS修改客戶姓名或生日</span>
             <span class="oRed" v-if='(item.key == "name" || item.key == "birthday") && changeData.custStatus == 5' >請協助客戶變更既有的有效保單之姓名或生日</span>
          </span>
          </modelForm>
      </div>
    </a-modal>
    <a-modal title="會員資料修改記錄" :width='1200' :visible="isShowHistory"  @cancel="isShowHistory = false">
      <template slot="footer">
        <!-- {{isAdd}} -->
        <a-button key="back" @click="isShowHistory = false">關閉</a-button>
      </template>
      <div id="add" class="Specail">
        <tableColumn :columns="columnsOther" :columnsData="columnsDataOther" :openExpand="false">
					<span :class="{redCOlr: haveII(props.text)}" slot="other" slot-scope="props">
					  {{addSpace(props.text)}}
					</span>
					<span slot="others" slot-scope="props">
					  {{props.record.auditorTimeStr}} &nbsp; {{props.record.auditorName}}
					</span>	
					<span slot="operation" slot-scope="props">
					  {{props.record.updateTime}} &nbsp; {{props.record.modifier}}
					</span>									          
        </tableColumn>
      </div>
    </a-modal>
    <a-modal title="會員資料明細" :visible="isShowdetail" :width='800' @cancel="isShowdetail = false">
      <template slot="footer">
        <!-- {{isAdd}} -->
        <a-button key="back" @click="isShowdetail = false">關閉</a-button>
        </a-button>
      </template>
      <div id="add">
        <div class="someTableDiv">
          <table class="someTable">
            <tr class="comTr">
              <td class="title1" >客戶身分</td>
              <td class="content1">{{tabledata.custIdentity}}</td>
              <td class="title1">狀態</td>
              <td class="content1">{{tabledata.status == '00' ? '開啓' : '關閉'}}</td>
            </tr>
            <tr class="comTr">
              <td class="title1">會員編號</td>
              <td class="content1">{{tabledata.accountCode}}</td>
              <td class="title1">身分證字號 </td>
              <td class="content1">{{tabledata.certificateNo}}</td>
            </tr>
            <tr class="comTr">
              <!-- <td class="title1">推薦人會員編號</td> -->
              <td class="title1">姓名</td>
              <td class="content1">{{tabledata.name}}</td>
              <td class="title1">性别</td>
              <td class="content1">{{tabledata.sex  == '1' ? '男' : '女'}}</td>
            </tr>
            <tr class="comTr">
              <td class="title1">生日（民國）</td>
              <td class="content1">{{tabledata.birthdayStr}}</td>
              <td class="title1">推薦人會員編號</td>
              <td class="content1">{{tabledata.referrerCode}}</td>
            </tr>
            <tr class="comTr">
              <td class="title1">手機</td>
              <td class="content1">{{tabledata.phone}}</td>
              <td class="title1">email</td>
              <td class="content1">{{tabledata.email}}</td>
            </tr>
            <tr class="comTr">
              <td class="title1">註冊日期/時間</td>
              <td class="content1">{{tabledata.createTime}}</td>
							<td class="title1">Media Code</td>
							<td class="content1">{{tabledata.mediaCode}}</td>
            </tr>
						<tr class="comTr">
						  <td class="title1">註冊通路</td>
						  <td colspan="3" class="content1">{{tabledata.channelName}}</td>							
						</tr>
          </table>
        </div>
        <div class="someTableDiv">

          <table class="someTable thisTablle">
            <tr>
              <th>聲明文件</th>
              <th>閱讀並簽署時間</th>
            </tr>
            <tr :key="index" v-for="(item,index) in agreeList" class="comTr">
              <td class="title1">{{item.name}}</td>
              <td class="content1">{{item.agreeTimeStr}}</td>
            </tr>
          </table>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import obj from './viewData.js'
	import { changeDateStyleB, getDateStyle } from '@/common/common'
  import comTime1 from '@/components/comTime1'
  import {
    tempetDownLoad
  } from '@/common/common'
  export default {
    name: "infoChange",
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
            this.postData.startTime = value.split(',')[0];
            this.postData.endTime = value.split(',')[1];
						if(this.postData.startTime.indexOf('/') > -1){
							this.postData.startTime = changeDateStyleB(this.postData.startTime)
						}
						if(this.postData.endTime.indexOf('/') > -1){
							this.postData.endTime = changeDateStyleB(this.postData.endTime)
						}
          } catch (e) {
            //TODO handle the exception
          }

        },
        deep: true
      },
      "changeData.name": {
        handler: function(value) {
          this.changeKey = 'name'
        },
        deep: true
      },
      "changeData.birthday": {
        handler: function(value) {
          this.changeKey = 'birthday'
        },
        deep: true
      },
      isShowChange: {
        handler: function(value) {
          if (!value) {
            this.isAdd = false
            Object.entries(this.changeData).forEach(([key, value], index) => {
              this.changeData[key] = ''
            })
            // this.changeArr.forEach((item, index) => {
            //   this.$set(this.changeArr[index], 'error', false)
            // })
          }
        },
      },
    },
    data() {
      return {
        agreeList: [],
        aaa: 36554,
        changeData: {},
        tabledata: {
        },
        changeKey: false,
        isShowChange: false,
        isShowHistory: false,
        isShowdetail: false,
        changeArr: [],
        searchArr: [],
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
        columnsOther: [], //表头
        RoleCode: '',
        columnsData: [], //表格信息
        columnsDataOther: [], //表格信息
        arr: [{
            name: '非既有客戶',
            value: 1
          },
          {
            name: '既有客戶無保單資料',
            value: 2
          },
          {
            name: '保單部分有效，部分無效',
            value: 3
          },
          {
            name: '保單皆為無效保單',
            value: 4
          },
          {
            name: '保單皆為有效保單',
            value: 5
          }
        ]
      };
    },
    methods: {
      haveII(value) {
				//console.log(value)
        try {
          return value.indexOf(',') != -1
        } catch (e) {
          //TODO handle the exception
          return false
        }
      },
      haveValue(value) {

        try {
          let isTrue = value.indexOf(',') != -1
          return !isTrue ? value : value.substring(0, value.length - 1)
        } catch (e) {
          //TODO handle the exception
          return value
        }
      },
      addSpace(value){
        value=this.haveValue(value)
        for(let i=0; i<value.length;i++){
          if(value.charAt(i)>'A' && value.charAt(i)<'Z'){
            value = value.substring(0,i)+" "+value.substring(i)
            return value
          }
        }
        return value
      },
      showChange(id) {
        this.isShowHistory = true
        let tep = {
          id: id
        }
        this.Axios('selectUpdateList', tep)
          .then((res) => {	
            res.data.data.forEach((item) => {
						//	console.log(item)
              try{
                item.modifiedFieldsArray.forEach(items => {
									//console.log(item[items])
                  item[items] = item[items] + ','
                })
              }catch(e){
                //TODO handle the exception
              }

              //item['status'] = item['status'] == '00' ? '開啓' : '關閉'
              // item['auditStatus'] = this.arr.filter((item) => item.value == item['auditStatus'])[0].name
            });

            this.columnsDataOther = res.data.data;
						//console.log(this.columnsDataOther,'2222222')
          })
      },
			getItems(item) {
			  return item.items;
			},
      edit(id,lock) {
        // if(lock == 'Y'){
        //   this.$message.error('會員資料變更正在處理中，暫時無法異動')
        //   return
        // }
				this.isShowChange = true;
				 this.changeKey = false
        let tep = {
          id: id
        }
        this.Axios('getMemberInfo', tep)
          .then((res) => {
								//	console.log(res.data.data.accountInfo,'2222222')
                   this.changeData = res.data.data.accountInfo;									  
									this.changeArr.map((item, index) => {
										this.$nextTick(()=>{
											if (item["key"]) {
											  item["value"] =  this.changeData[item["key"]];
											}
										})									  
									});				
								//	console.log(this.changeArr)			
                     setTimeout(() => {
                       this.changeKey = false
                     },0)
              })

      },
      output() {
        tempetDownLoad('exportList', this.postData,'會員資料報表')
      },
      givePower(id) {
        this.isShowdetail = true;
        let tep = {
          id: id
        }
        this.Axios('getMemberInfo', tep)
          .then((res) => {
                  this.tabledata = res.data.data.accountInfo
                  this.agreeList = res.data.data.statementList
              })
          },
          queryList(index) {
            let tep = this.postData;
            if(index == 1){
              this.pageInfo.current = 1
            }
            tep = Object.assign(this.postData, this.pageInfo)
            this.Axios('memberServiceselectListPage', tep)
              .then((res) => {
                let arr = res.data.data.list;
                arr.forEach(item => {
                  Object.entries(item).forEach(([key, value], index) => {
                    if(!item[key]){
                      item[key] = '------------'
                    }
                  })
                })
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
           isFillFC() {
            let tep = this.changeData;
            let arr = this.changeArr.filter(item => {
              if (!item.required) {
                return false
              } if (item.type == 'input') {
                return item.error || !tep[item.key]
              } else {
                return !tep[item.key]
              }
            })
            //console.log(arr)
            return arr.length == 0 ? true : false;
          },
          changeOk(value) {
            let isFill = this.isFillFC()
            if (!isFill) {
              this.$message.error('請檢查訊息')
              return
            }
            let tep = {
							id: this.changeData.id,
							email: this.changeData.email,
							name: this.changeData.name,
							phone: this.changeData.phone,
							birthday: this.changeData.birthday,
							referrerCode: this.changeData.referrerCode,
							status: this.changeData.status,
							remarks: this.changeData.remarks
						};
						if(tep.birthday.indexOf('/') > -1){
							tep.birthday = changeDateStyleB(tep.birthday)
						}
            this.Axios('updateMemberInfo', tep)
              .then((res) => {
                this.isShowChange = false;
                this.queryList()
                this.$message.success('儲存成功！')
              })
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
              changeArr,
              columnsOther
            } = obj;
            this.columns = columns;
            this.searchArr = searchArr;
            this.changeArr = changeArr;
            this.columnsOther = columnsOther;
            searchArr.forEach(item => {
              this.$set(this.postData, item.key, item.value)
            })
            changeArr.forEach(item => {
              this.$set(this.changeData, item.key, item.value)
            })
						this.$set(this.postData, 'DateRange', {
							'start':getDateStyle(this.getDay(-180)),
							'end' :getDateStyle(this.getDay(0)),
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
  @import "../insureDetail/index.scss";
</style>
