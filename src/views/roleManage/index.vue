<template>
  <div>
    <comHeader :routes="routes" primary-button="新增" @primary="primary(1)"></comHeader>
    <div class="searchDiv">
      <modelForm v-model='postData[item.key]' :size="item.size" :key='item.key' :title='item.title' :items='item.items' :type='item.type'
        v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
      <div class="searchBTn">
        <a-button type="primary" class="searchQuery" @click="queryList(1)">查詢</a-button>
        <a-button @click="reQueryList">清除</a-button>
      </div>
    </div>
    <tableColumn :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
      <span slot="operation" slot-scope="props">
        <a-button @click="givePower(props.record)">授權權限</a-button>
        <a-button @click="edit(props.record)">修改</a-button>
        <a-button @click="del(props.record)">删除</a-button>
      </span>
    </tableColumn>
    <a-modal :title="isAdd ? '新增角色' : '修改角色'" :visible="isShowChange" @ok="changeOk()" @cancel="isShowChange = false">
      <template slot="footer">
        <a-button key="back" @click="isShowChange = false">關閉</a-button>
        <a-button type='primary' key="submit" @click="changeOk">儲存
        </a-button>
      </template>
      <div id="add">
        <modelForm v-model='changeData[item.key]' :required="item.required" :error.sync="item.error" :regular='item.regular' :size="item.size"
          :key='item.key' :title='item.title' :items='item.items' :type='item.type' v-for="item in changeArr" class='comDiv'
          :isAutoPlacehoder='true'></modelForm>
      </div>
    </a-modal>
    <a-modal title="授權權限" :visible="isShowOther" @ok="OtherOk()" @cancel="isShowOther = false">
      <template slot="footer">
        <a-button key="back" @click="isShowOther = false">關閉</a-button>
        <a-button type='primary' key="submit" @click="OtherOk">儲存
        </a-button>
      </template>
      <div id="power">
        <span class="font1">權限列表:</span>
        <a-checkbox-group v-model="powerList">
          <!-- <span style="color: red" slot="name" slot-scope="{value}">{{name}}</span> -->
          <a-checkbox :key="index" :checked="item.selectStatus == 9" v-for="(item,index) in items" :value="item.code">{{item.name}}</a-checkbox>
        </a-checkbox-group>
      </div>
    </a-modal>

  </div>
</template>
<script>
  import obj from './viewData.js'
  export default {
    name: "roleManage",
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

    },
    watch: {
      isShowChange: {
        handler: function(value) {
          if (!value) {
            this.isAdd = false
            this.changeArr.forEach((item, index) => {
              this.$set(this.changeArr[index], 'error', false)
            })
          }
        },
      },
      isShowOther: {
        handler: function(value) {
          if (!value) this.powerList = []
        },
      },
      pageInfo: {
        handler: function(value) {
          this.queryList()
        },
        deep: true
      },

    },
    data() {
      return {
        powerList: [],
        items: [],
        changeArr: [],
        searchArr: [],
        totalNum: 0,
        isShowChange: false,
        isShowOther: false,
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
        RoleCode: '',
        columnsData: [{
          name0: 1,
          name1: 2,
          name2: 2,
        }], //表格信息
      };
    },
    methods: {
      changeValue(checkedValues) {
        this.powerList = checkedValues
      },
      givePower(obj) {
        this.isShowOther = true
        this.RoleCode = obj.code;
        this.queryRoleList()
      },
      OtherOk() {
        console.log('othjer')
        let tep = {
          "roleCode": this.RoleCode,
          "perCodes": this.powerList
        }
        this.Axios('authorization', tep)
          .then((res) => {
            this.isShowOther = false;
            this.queryList()
            this.$message.success('儲存成功！')
          })
      },
      del(obj) {
        let self = this;
        this.$confirm({
          title: '確定删除?',
          content: `是否删除${obj.name}角色`,
          onOk() {
            let tep = obj;
            self.Axios('deleteRole', tep)
              .then((res) => {
                self.isShowChange = false;
                self.queryList()
                this.$message.success('操作成功！')
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
      queryList(index) {
        let tep = this.postData;
        if(index == 1){
          this.pageInfo.current = 1
        }
        tep = Object.assign(this.postData, this.pageInfo)
        this.Axios('roleselectListPage', tep)
          .then((res) => {
            this.columnsData = res.data.data.list;
            this.totalNum = res.data.data.total
          })
      },
      queryRoleList(data) {
        let tep = {
          "roleCode": this.RoleCode,
        }
        this.Axios('getPermissionsList', tep)
          .then((res) => {
            this.items = res.data.data
            this.powerList = res.data.data.filter(item => item.selectStatus == 9).map(item => item.code)
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
        console.log('user++++',value)
        let isFill = this.isFillFC()
        if (!isFill) {
          this.$message.error('請檢查訊息')
          return
        }
        let reg = /^[\u4e00-\u9fa5\\.\\,\\ ]{0,20}$|^[a-zA-Z0-9\\.\\,\\ ]{0,40}$/;
         // alert(reg.test(this.changeData.content))
        if(!reg.test(this.changeData.remark)){
          this.$message.error('角色描述40字元')
          return
        }
        let tep = JSON.parse(JSON.stringify(this.changeData))
        console.log('zhuanyizhihou ',tep)
        console.log(this.isAdd)
        if(tep.remark==undefined) {
          tep.remark = ''
        }
        let mock = this.isAdd ? 'insert' : 'updateByPrimaryKey';
        this.Axios(mock, tep)
          .then((res) => {
            this.$message.success('儲存成功！')
            this.isShowChange = false;
            this.queryList()
          })

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
