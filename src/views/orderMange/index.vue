<template>
  <div>
    <comHeader :routes="routes" primary-button="新增" @primary="primary(1)"></comHeader>
    <div class="searchDiv">
      <modelForm v-model='postData[item.key]' :key='item.key' :title='item.title' :items='item.items' :type='item.type' :size="item.size"
        v-for="item in searchArr" class='comDiv' :isAutoPlacehoder='false'></modelForm>
      <div class="searchBTn">
        <a-button type="primary" class="searchQuery" @click="queryList(1)">查詢</a-button>
        <a-button @click="reQueryList">清除</a-button>
      </div>
    </div>
    <tableColumn :columns="columns" :columnsData="columnsData" :pageInfo="pageInfo" :totalNum="totalNum" :openExpand="false">
      <span slot="other" slot-scope="props">
        {{props.record.status == 'a' ? '有效' : '無效'}}
      </span>
      <span slot="operation" slot-scope="props">
        <a-button @click="edit(props.record)">修改</a-button>
        <a-button @click="del(props.record)">删除</a-button>
      </span>
    </tableColumn>
    <a-modal :title="isAdd ? '新增選單' : '修改選單'" :visible="isShowChange" @ok="changeOk()" @cancel="isShowChange = false">
      <template slot="footer">
        <a-button key="back" @click="isShowChange = false">關閉</a-button>
        <a-button type='primary' key="submit" @click="changeOk">儲存
        </a-button>
      </template>
      <div id="add">
        <modelForm :errorMsg="item.errorMsg" v-model='changeData[item.key]' :size="item.size" :disabled="item.disabled" :required="item.required" :error.sync="item.error" :regular='item.regular' :key='item.key' :title='item.title' :items='item.items' :type='item.type'
          v-for="item in changeArr" class='comDiv' :isAutoPlacehoder='true'></modelForm>
      </div>
    </a-modal>

  </div>
</template>
<script>
  import obj from './viewData.js'
  import moment from 'moment'
  export default {
    name: "orderMange",
    components: {},
    watch: {
      pageInfo: {
        handler: function(value) {
          this.queryList()
        },
        deep: true
      },
      isAdd: {
        handler: function(value) {
            // this.changeArr.forEach((item,index) => {
            //   if(item.key == 'parentCode'){
            //     // item.required = false
            //     this.$set(this.changeArr[index],'disabled',!value)
            //   }else if(item.key == 'funLevel'){
            //     this.$set(this.changeArr[index],'disabled',!value)
            //   }
            // })
        },
        deep: true
      },
      'changeData.funLevel': {
        handler: function(value) {

          this.changeArr.forEach((item,index) => {
            if(item.key == 'parentCode'){
              // item.required = false
              this.$set(this.changeArr[index],'required',value == 1 ? false : true)
              if(value == 1){
                this.$set(this.changeArr[index],'items',[])
              }
            }
          })

          value == 2 && this.getParentList()
          // this.changeArr.parentCode.required = false
        },
        immediate: true
      },
      isShowChange: {
        handler: function(value) {
          if (!value){
            this.changeArr.forEach((item, index) => {
              this.$set(this.changeArr[index], 'error', false)
            })
            this.isAdd = false
          }
        },
      },
      isShowOther: {
        handler: function(value) {
          if(!value) this.checkedKeys = []
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
        checkedKeys: ['3','4','5'],
        treeData: [],
        powerList: [],
        items: [],
        changeArr: [],
        searchArr: [],
        totalNum: 0,
        isShowChange: false,
        isShowOther: false,
        postData: {},
        changeData: {},
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
      getParentList(){
        let tep = {
          "funLevel": 2
        }
        this.Axios('functiongetFunctionLevelList',tep)
        .then(res => {
            let arr = res.data.data.map(item => {
              return {
                name: item.title,
                value: item.code
              }
            })
            this.changeArr.forEach((item,index) => {
              if(item.key == 'parentCode'){
                // item.required = false
                this.$set(this.changeArr[index],'items',arr)
              }
              console.log('arr',arr)
            })
        })

      },
      onSelect(value) {
        console.log(value)
      },
      changeValue(checkedValues) {
        this.powerList = checkedValues
      },
      givePower(obj) {
        this.isShowOther = true
        this.RoleCode = obj.code;
        this.queryRoleList()
      },
      del(obj) {
        let self = this;
        this.$confirm({
          title: '確定删除?',
          content: `是否删除${obj.name}菜单`,
          onOk() {
            let tep = obj;
            self.Axios('functiondeleteFun', tep)
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
        this.Axios('functionselectListPage', tep)
          .then((res) => {
            this.columnsData = res.data.data.list;
            this.totalNum = res.data.data.total
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
        // let tep = this.changeData;
        let tep = JSON.parse(JSON.stringify(this.changeData))


        console.log(this.isAdd)
        //  let reg = /^[\u4e00-\u9fa5\\.\\,\\ ]{0,20}$|^[a-zA-Z0-9\\.\\,\\ ]{0,40}$/;
        //  // alert(reg.test(this.changeData.content))
        // if(!reg.test(this.changeData.content)){
        //   this.$message.error('選單描述40字元')
        //   return
        // }
        let isFill = this.isFillFC()
         if(!isFill){
           this.$message.error('請檢查訊息')
           return
         }
         console.log('tep------',tep)
           if(tep.content==undefined) {
          tep.content= ''
        }
         
        this.Axios('functionsaveOrUpdateFunction', tep)
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
        this.changeData.funLevel = 1
        this.changeData.status = 'a'
        this.isAdd = value == 1 ? true : false;
        this.isShowChange = true
      },
      createdSearch() {
        let {
          columns,
          searchArr,
          changeArr
        } = obj;
        console.log(obj, '++++++++++++++')
        this.columns = columns;
        this.searchArr = searchArr;
        this.changeArr = changeArr;
        searchArr.forEach(item => {
          console.log(item.key,item.value)
          this.$set(this.postData, item.key, item.value || undefined)
        })
        changeArr.forEach(item => {
          this.$set(this.changeData, item.key,  item.value || undefined)
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
