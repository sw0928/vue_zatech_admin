<template>
  <div>
    <comHeader :routes="routes" primary-button="新增" @primary="primary(1)"></comHeader>
    <div class="searchDiv">
      <modelForm v-model='postData[item.key]' :size="item.size" :regular='item.regular' :key='item.key' :title='item.title' :items='item.items'
        :type='item.type' v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
      <div class="searchBTn">
        <a-button type="primary" class="searchQuery" @click="queryList(1)">查詢</a-button>
        <a-button @click="reQueryList">清除</a-button>
        <a-button type="primary" class="searchQuery" @click="output">匯出</a-button>
      </div>
    </div>
    <tableColumn :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
      <span slot="operation" slot-scope="props">
        <a-button @click="givePower(props.record)">授權角色</a-button>
        <a-button @click="edit(props.record)">修改</a-button>
        <a-button @click="del(props.record)">删除</a-button>
      </span>
    </tableColumn>
    <a-modal :title="isAdd ? '新增使用者' : '修改使用者'" :visible="isShowChange" @ok="changeOk()" @cancel="isShowChange = false">
      <template slot="footer">
        <!-- {{isAdd}} -->
        <a-button key="back" @click="isShowChange = false">關閉</a-button>
        <a-button type='primary' key="submit" @click="changeOk">儲存
        </a-button>
      </template>
      <div id="add">
        <modelForm v-model='changeData[item.key]' :size="item.size" :required="item.required" :error.sync="item.error" :regular='item.regular'
          :key='item.key' :dataKey='item.key' :errorMsg="item.errorMsg" :title='item.title' :items='item.items' :type='item.type' v-for="item in changeArr" class='comDiv'
          :isAutoPlacehoder='true'></modelForm>
      </div>
    </a-modal>
    <a-modal title="授權角色" :visible="isShowOther" @ok="OtherOk()" @cancel="isShowOther = false">
      <template slot="footer">
        <a-button key="back" @click="isShowOther = false">關閉</a-button>
        <a-button type='primary' key="submit" @click="OtherOk">儲存
        </a-button>
      </template>
      <div id="power">
        <span class="font1">權限列表:</span>
        <!-- {{powerList}} -->
        <a-radio-group v-model="powerList">
          <!-- <span style="color: red" slot="name" slot-scope="{value}">{{name}}</span> -->
          <a-radio :key="index" v-for="(item,index) in items" :value="item.code">{{item.name}}</a-radio>
        </a-radio-group>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import {tempetDownLoad} from '@/common/common'
  import {codeHidden} from '@/common/common.js'

  import obj from './viewData.js'
  export default {
    name: "userManage",
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
      isShowChange: {
        handler: function(value) {
          if (!value){
            this.isAdd = false
             this.changeArr.forEach((item, index) => {
              this.$set(this.changeArr[index], 'error', false)
            })
          }
        },
      },
      isShowOther: {
        handler: function(value) {
          if(!value) this.powerList = ''
        },
      },
      pageInfo: {
        handler: function(value) {
          this.queryList()
        },
        deep: true
      }

    },
    data() {
      return {
        powerList: '',
        items: [],
        changeArr: [],
        searchArr: [],
        totalNum: 0,
        isShowChange: false,
        isShowOther: false,
        RoleCode: '',
        postData: {},
        changeData: {

        },
        pageInfo: {
          current: 1, //当前页数
          pageSize: 10, //每页条数
        },
        isAdd: true,
        routes: [
          // 面包屑数据
          {
            path: "MenuContent",
            breadcrumbName: "系統管理"
          },
          ...obj.path

        ],
        columns: [], //表头
        columnsData: [{
          name0: 1,
          name1: 2,
          name2: 2,
        }], //表格信息
      };
    },
    methods: {
      givePower(obj) {
        this.isShowOther = true
        this.RoleCode = obj.code;
        this.queryRoleList()
      },
      OtherOk() {
        let tep = {
          "userCode": this.RoleCode,
          "roleCode": this.powerList
        }
        this.Axios('bindUserRole', tep)
          .then((res) => {
            this.isShowOther = false;
            this.queryList()
          })
      },
      changeValue(checkedValues) {
        this.powerList = checkedValues
      },
      del(obj) {
        console.log(obj)
        let self = this;
        this.$confirm({
          title: '確定删除?',
          content: `請確認是否刪除使用者:${obj.realName}`,
          onOk() {
            self.changeData = obj;
            // self.changeOk('Y')
            self.Axios('deletSysUser', obj)
            .then((res) => {
              self.isShowOther = false;
              self.queryList()
            })
          },
          onCancel() {},
        });

      },
      edit(obj) {
        console.log(obj);
        obj = Object.assign({}, obj)
        this.changeData = obj;
        this.isShowChange = true;
        this.isAdd = false;
      },
      output() {
        tempetDownLoad('exportSysUsers', this.postData,'使用者訊息')
      },
      queryList(index) {
        let tep = this.postData;
        if(index == 1){
          this.pageInfo.current = 1
        }
        tep = Object.assign(this.postData, this.pageInfo)
        this.Axios('listSysUsers', tep)
          .then((res) => {
            this.columnsData = res.data.data.list;
            this.totalNum = res.data.data.total
          })
      },
      queryRoleList(data) {
        let tep = {
          "userCode": this.RoleCode,
        }
        this.Axios('getRoleList', tep)
          .then((res) => {
            this.items = res.data.data
            this.powerList = res.data.data.filter(item => item.selectStatus == 9)[0].code
          })
      },
      reQueryList() {
        Object.entries(this.postData).forEach(([key, value], index) => {
          this.postData[key] = ''
        })
        // this.pageInfo.current = 1
        // this.queryList()
      },
      isFillFC() {
        let tep = this.changeData;
        let arr = this.changeArr.filter((item, index) => {
          if (!item.required) return false
          if (item.error || !tep[item.key]) {
            this.$set(this.changeArr[index], 'error', true)
            return true
          } else {
            return false
          }
        })
        console.log(arr)
        return arr.length == 0 ? true : false;
      },
      changeOk(value) {
        console.log('model',value)
        let isFill = this.isFillFC()
        if (!isFill) {
          this.$message.error('請檢查訊息')
          return
        }
        this.changeData.isDeleted = value == 'Y' ? 'Y' : 'N'
        let tep = JSON.parse(JSON.stringify(this.changeData))
        let reg = /^(09)[0-9]{8}$/
        if((!reg.test(tep.phone))&&(tep.phone!== undefined)){
        // alert("請填寫正確電話號碼！");
          this.Axios('saveOrUpdateSysUser', tep)
          .then((res) => {
            if(this.changeData.isDeleted != 'Y') {
              this.$message.success('儲存成功！')
            }else{
              this.$message.success('操作成功！')
            }
            this.isShowChange = false;
            this.queryList()
          })
        // this.isShowChange = false;
      }else {
        if(tep.phone== undefined) {
          tep.phone=''
        }
        this.Axios('saveOrUpdateSysUser', tep)
          .then((res) => {
            if(this.changeData.isDeleted != 'Y') {
              this.$message.success('儲存成功！')
            }else{
              this.$message.success('操作成功！')
            }
            this.isShowChange = false;
            this.queryList()
          })
      }

      },
      primary(value) {
        Object.entries(this.changeData).forEach(([key, value], index) => {
          this.changeData[key] = ''
        })
        this.isAdd = value == 1 ? true : false;
        this.isShowChange = true
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
        searchArr.forEach(item => {
          this.$set(this.postData, item.key, undefined)
        })
        changeArr.forEach(item => {
          this.$set(this.changeData, item.key, undefined)
        })

      }
    },
    created() {
      this.createdSearch()
      this.queryList()
      // this.getTableList();
    },
    activated() {
      // this.insListSearch()
    }
  };
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
