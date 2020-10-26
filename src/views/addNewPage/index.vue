<template>
  <div>
    <Header :routes="routes" primaryButton="确定" @primary="saveData"></Header>

    <div class="contentThis">
      <div class="titleThis">
        <div class="titleFont">页面信息</div>
        <div class="searchDiv">
          <modelForm v-model='postData[item.key]' :key='item.key' :title='item.title' :items='item.items' :type='item.type'
            v-for="item in searchArr" class='comDiv'></modelForm>
        </div>
      </div>
      <div class="titleThis">
        <div class="titleFont">
          <span>搜索条件</span>
          <div>
            <a-button type='primary' class='primary' @click="primary">新增搜索条件</a-button>
            <a-button type='primary' class='primary' @click="fileOPen('file')">OCR识别</a-button>
            <input ref='file' class="fileThis" type="file" @change="handleChange($event)">
            <a-button type='primary' class='primary'>从库中选择</a-button>
          </div>
        </div>
        <div class="searchDivOther">
          <div @mouseenter="changeShowKey(index)" @mouseleave="changeShowKey('')" :key='item.key' v-for="(item,index) in searchData">
            <modelForm @click.native="changeSearchData(index)" :class="{rangeTime: item.type == 'rangeTime'}" :key='item.key'
              :disabled="true" :title='item.title' :items='item.items' :type='item.type' class='comDiv'>
              <img @click="delSearchData(index)" v-if="showKey === index" class="DelImg" src="@/assets/img/error.png"
                alt="">
            </modelForm>
          </div>
        </div>
      </div>
      <div class="titleThis">
        <div class="titleFont">
          <span>新增元素</span>
          <div>
            <a-button type='primary' class='primary' @click="isAddAdd = true">新增新增条件</a-button>
            <a-button type='primary' class='primary' @click="fileOPen('add')">OCR识别</a-button>
            <input ref='add' class="fileThis" type="file" @change="handleAddChange($event)">
            <a-button type='primary' class='primary'>从库中选择</a-button>
          </div>
        </div>
        <div class="searchDivOther">
          <div @mouseenter="changeAddKey(index)" @mouseleave="changeAddKey('')" :key='item.key' v-for="(item,index) in addArr">
            <modelForm @click.native="changeAddData(index)" :class="{rangeTime: item.type == 'rangeTime'}" :key='item.key'
              :disabled="true" :title='item.title' :items='item.items' :type='item.type' class='comDiv'>
              <img @click="delAddData(index)" v-if="addKey === index" class="DelImg" src="@/assets/img/error.png"
                alt="">
            </modelForm>
          </div>
        </div>
      </div>

      <div class="titleThis">
        <div class="titleFont">
          <span>表头数据</span>
          <div>
            <a-button type='primary' class='primary' @click="isAddTable = true">新增表头数据</a-button>
            <a-button type='primary' class='primary' @click="fileOPen('table')">OCR识别</a-button>
            <input ref='table' class="fileThis" type="file" @change="handletableChange($event)">
            <a-button type='primary' class='primary'>从库中选择</a-button>
          </div>
        </div>
        <div class="searchDivOther">
          <table class="someTable">
            <tr>
              <th @mouseenter="changeShowTableKey(index)" @mouseleave="changeShowTableKey('')" style="position: relative;"
                v-for='(item,index) in thList' :key="index">
                :::::::
                <img @click="delTableData(index)" v-if="tableKey === index" class="DelImg IMGDEL" src="@/assets/img/error.png"
                  alt="">
              </th>
            </tr>
            <draggable draggable='.draggable' tag='tr' class="dragArea list-group other" :list="thList" group="people"
              @change="log">
              <td @click="changeTableData(index)" class="draggable" v-for='(item,index) in thList' :key="item.value">{{item.name}}</td>
            </draggable>
          </table>
        </div>
        <div class="btnDiv">
          <a-button type='primary' class='primary' @click="saveData">确定</a-button>
        </div>
      </div>

    </div>

    <!-- 复制弹窗 -->
    <!-- 作废弹窗 -->
    <a-modal title="新增库元素" :visible="isShowAdd" @ok="delectOk" @cancel="isShowAdd = false">
      <template slot="footer">
        <a-button key="back" @click="isShowAdd = false">取消</a-button>
        <a-button type='primary' key="submit" @click="addOK">确定
        </a-button>
      </template>
      <div id="searchDiv" class="test">
        <modelForm v-model='otherData.title' key='name' title='元素名称' type='input' class='comDiv'></modelForm>
        <modelForm v-model='otherData.key' key='key' title='键名' type='input' class='comDiv'></modelForm>
        <modelForm v-model='otherData.type' key='type' title='类型' type='select' :items='TYPE_LIST' class='comDiv'></modelForm>
        <!-- <modelForm v-model='otherData.arrList' key='arrList' title='枚举' type='select' :items='TYPE_LIST' class='comDiv' :isAutoPlacehoder='true' ></modelForm> -->
      </div>
    </a-modal>
    <a-modal title="新增表头元素" :visible="isAddTable" @ok="delectOk" @cancel="isAddTable = false">
      <template slot="footer">
        <a-button key="back" @click="isAddTable = false">取消</a-button>
        <a-button type='primary' key="submit" @click="tableOK">确定
        </a-button>
      </template>
      <div id="searchDiv" class="test">
        <modelForm v-model='tableData.name' key='name1' title='元素名称' type='input' class='comDiv'></modelForm>
        <modelForm v-model='tableData.value' key='key2' title='键名' type='input' class='comDiv'></modelForm>
        <modelForm v-model='tableData.isFixed' key='key3' title='是否固定左侧' type='switch' class='comDiv'></modelForm>
        <!-- <modelForm v-model='otherData.type' key='type' title='类型' type='select' :items='TYPE_LIST' class='comDiv'></modelForm> -->
        <!-- <modelForm v-model='otherData.arrList' key='arrList' title='枚举' type='select' :items='TYPE_LIST' class='comDiv' :isAutoPlacehoder='true' ></modelForm> -->
      </div>
    </a-modal>
  <a-modal title="新增新增元素" :visible="isAddAdd" @ok="delectOk" @cancel="isAddAdd = false">
      <template slot="footer">
        <a-button key="back" @click="isAddAdd = false">取消</a-button>
        <a-button type='primary' key="submit" @click="addADDOK">确定
        </a-button>
      </template>
      <div id="searchDiv" class="test">
        <modelForm v-model='addData.title' key='name' title='元素名称' type='input' class='comDiv'></modelForm>
        <modelForm v-model='addData.key' key='key' title='键名' type='input' class='comDiv'></modelForm>
        <modelForm v-model='addData.type' key='type' title='类型' type='select' :items='TYPE_LIST' class='comDiv'></modelForm>
        <!-- <modelForm v-model='otherData.type' key='type' title='类型' type='select' :items='TYPE_LIST' class='comDiv'></modelForm> -->
        <!-- <modelForm v-model='otherData.arrList' key='arrList' title='枚举' type='select' :items='TYPE_LIST' class='comDiv' :isAutoPlacehoder='true' ></modelForm> -->
      </div>
    </a-modal>


  </div>
</template>
<script>
  import draggable from "vuedraggable";
  import obj from './viewData.js';
  import {
    TYPE_LIST
  } from '@/common/common.js'
  export default {
    name: "addNewPage",
    components: {
      draggable
    },
    watch: {
      thList: {
        handler: function(value) {
          console.log(value)
        },
        deep: true
      },
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
      isAddTable: {
        handler: function(value) {
          if (!value) {
            this.changeTableIndex = -1;
            this.tableData = {
              name: '',
              value: '',
              isFixed: false
            }
          }
        },
        deep: true
      },

      isShowAdd: {
        handler: function(value) {
          if (!value) {
            this.changeIndex = -1;
            this.otherData = {
              title: '',
              key: '',
              type: ''
            }
          }
        },
        deep: true
      },

    },
    data() {
      return {
        isAddTable: false,
        isAddAdd: false,
        thList: [],
        showKey: '',
        tableKey: '',
        addKey: '',
        searchData: [],
        changeData: [],
        TYPE_LIST: TYPE_LIST,
        tableData: {
          name: '',
          value: '',
          isFixed: false
        },
        otherData: {
          title: '',
          key: '',
          type: ''
        },
        addData: {
          title: '',
          key: '',
          type: ''
        },
        isShowAdd: false,
        searchArr: [],
        addArr: [],
        totalNum: 0,
        isShowDelete: false,
        postData: {},
        pageInfo: {
          current: 1, //当前页数
          pageSize: 10, //每页条数
        },
        routes: [
          // 面包屑数据
          {
            path: "MenuContent",
            breadcrumbName: "产品管理"
          },
          {
            path: "insurProduct",
            breadcrumbName: "产品列表"
          },

        ],
        columns: [],
        columnsData: [], //主表信息
        src: '',
        changeIndex: -1,
        changeTableIndex: -1,
        changeAddIndex: -1,
      };
    },
    methods: {
      changeTableData(index) {
        this.changeTableIndex = index;
        this.tableData = this.thList[index];
        console.log(this.tableData)
        this.isAddTable = true
      },
      changeSearchData(index) {
        this.changeIndex = index;
        this.otherData = this.searchData[index];
        this.isShowAdd = true
      },
      changeAddData(index) {
        this.changeAddIndex = index;
        this.addData = this.addArr[index];
        this.isAddAdd = true
      },

      fileOPen(value) {
        this.$refs[value].click()
      },
      handletableChange(e) {
        let self = this;
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          let index = dataURL.indexOf(',')
          SERVER_METHODS.getFont(dataURL.substring(index + 1))
            .then(res => {
              let number = res.words_result_num;
              let result = res.words_result;
              let trueResult = []
              for (let i = 0; i < number; i++) {
                trueResult.push({
                  name: result[i].words,
                  value: 'key' + i,
                  isFixed: ''
                })
              }
              self.thList.push(...trueResult)

            })
          // 下面逻辑处理
        };
      },
      handleAddChange(e) {
        let self = this;
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          let index = dataURL.indexOf(',')
          SERVER_METHODS.getFont(dataURL.substring(index + 1))
            .then(res => {
              let number = res.words_result_num;
              let result = res.words_result;
              let trueResult = []
              for (let i = 0; i < number; i++) {
                let type = 'input' ;
                let items = type == 'input' ? '' : [{
                  name: '测试',
                  value: 1
                }]
                trueResult.push({
                  title: result[i].words,
                  type: type,
                  key: 'name' + i,
                  items: items
                })
              }
              self.addArr.push(...trueResult)

            })
          // 下面逻辑处理
        };
      },

      handleChange(e) {
        console.log(666)
        let self = this;
        let file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result;
          let index = dataURL.indexOf(',')
          SERVER_METHODS.getFont(dataURL.substring(index + 1))
            .then(res => {
              let type = 'input';
              let number = res.words_result_num;
              let result = res.words_result;
              let trueResult = []
              for (let i = 0; i < number; i++) {
                let items = type == 'input' ? '' : [{
                  name: '测试',
                  value: 1
                }]
                trueResult.push({
                  title: result[i].words,
                  type: 'input',
                  key: 'name' + i,
                  items: items
                })
              }
              self.searchData.push(...trueResult)

            })
          // 下面逻辑处理
        };
      },
      saveData() {

        console.log(666612)
        // this.addNewPage()
        let {
          viewPath,
          viewTitle
        } = this.postData;
        let data = {
          path: [{
            path: viewPath,
            breadcrumbName: viewTitle
          }],
          changeArr: this.addArr,
          searchArr: this.searchData,
          columns: this.thList.map(item => {
            return {
              title: item.name,
              dataIndex: item.value,
              fixed: item.isFixed ? "left" : ''
            }
          }),
        }
        data = JSON.stringify(data)
        console.error(this.postData)

        this.addNewPage(viewPath, viewTitle, data)
      },
      addNewPage(viewPath, viewTitle, data) {
        // 调用 node 项目 函数 创建 路由页面
        try {
          SERVER_METHODS.addNewPage(process.env.PATH_DEV,viewPath, viewTitle, data)
        } catch (e) {
          console.error(e)
        }
      },
      tableOK() {
        var {
          name,
          value,
          isFixed
        } = this.tableData;
        let item = {
          name: name,
          value: value,
          isFixed: isFixed
        }
        // console.log(this.thList)
        if (this.changeTableIndex != -1) {
          this.thList[this.changeTableIndex] = item
        } else {
          this.thList.push(item)
        }
        this.isAddTable = false
      },
      log() {

      },
      closeYhis() {
        this.isShowAdd = false;
        this.isAddTable = false
      },
      delSearchData(index) {
        this.searchData.splice(index, 1)
      },
      delAddData(index) {
        this.addArr.splice(index, 1)
      },
      delTableData(index) {
        this.thList.splice(index, 1)
      },
      changeShowKey(index) {
        this.showKey = index
      },
      changeShowTableKey(index) {
        this.tableKey = index
      },
      changeAddKey(index) {
        this.addKey = index
      },
      addOK() {
        let {
          title,
          type,
          key
        } = this.otherData;
        let items = type == 'input' ? '' : [{
          name: '测试',
          value: 1
        }]
        let item = {
          title: title,
          type: type,
          key: key,
          items: items
        }
        if (this.changeIndex != -1) {
          this.searchData[this.changeIndex] = item
        } else {
          this.searchData.push(item)
        }
        this.isShowAdd = false;
      },
      addADDOK() {
        let {
          title,
          type,
          key
        } = this.addData;
        let items = type == 'input' ? '' : [{
          name: '测试',
          value: 1
        }]
        let item = {
          title: title,
          type: type,
          key: key,
          items: items
        }
        if (this.changeAddIndex != -1) {
          this.addArr[this.changeAddIndex] = item
        } else {
          this.addArr.push(item)
        }
        this.isAddAdd = false;
      },
      queryList() {

      },
      reQueryList() {

      },
      delectOk() {

      },
      primary() {
        this.isShowAdd = true
        // this.$router.push({
        // 	name: "newInsurance",
        // });
      },
      createdSearch() {

        let {
          columns,
          searchArr
        } = obj;
        this.columns = columns;
        this.searchArr = searchArr;
        obj.searchArr.forEach(item => {
          this.$set(this.postData, item.key, item.value)
        })

      }
    },
    created() {
      this.createdSearch()
      // this.getTableList();
      // moment("20111031", "YYYYMMDD").fromNow(); // 8 年前
      // moment("20120620", "YYYYMMDD").fromNow(); // 7 年前
      // moment().startOf('day').fromNow();        // 9 小时前
      // moment().endOf('day').fromNow();          // 15 小时内
      // moment().startOf('hour').fromNow();       // 31 分钟前
      // console.log(moment().subtract(1, 'months').format('YYYY-MM-DD'));
    },
    activated() {
      // this.insListSearch()
    }
  };
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
