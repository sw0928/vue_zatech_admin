<template>
  <div class="detail">
    <div class="boxs">{{ title }}</div>
    <div class="boxs" v-if="route_name != 'info'">
      <div id="add">
        <modelForm
          :is_null="item.is_null"
          v-model="postData[item.key]"
          :size="item.size"
          :width="item.width"
          :key="item.key"
          :title="item.title"
          :items="getItems(item)"
          :type="item.type"
          :disabled="item.disabled"
          :required="item.required"
          v-for="item in postArr"
          class="comDiv"
          :isAutoPlacehoder="true"
        ></modelForm>
      </div>
      <div class="box" v-if="route_name == 'add'">
        <div class="add_active">
          <div class="add_title">新增活動</div>
          <div class="demo">
            <!-- <div class="btn">匯入模板下載</div> -->
            <div class="upElsx">
              <div class="ex_btn" @click="get_template">匯入下載模板</div>
            </div>

            <!-- <div class="btn" @click="get_template">匯入Media Code</div> -->
            <div class="upElsx">
              <div class="ex_btn">匯入Media Code</div>
              <input
                id="filed"
                type="file"
                ref="upload"
                class="real_up"
                @change="post_file"
              />
            </div>
          </div>
        </div>
        <div class="box_form">
          <div id="add">
            <modelForm
              :is_null="item.is_null"
              v-model="item.value"
              :size="item.size"
              :width="item.width"
              :key="item.key"
              :title="item.title"
              :items="getItems(item)"
              :type="item.type"
              :required="item.required"
              v-for="item in activeArr"
              class="comDiv"
              :selectHour="item.selectHour"
              :isAutoPlacehoder="true"
            ></modelForm>
          </div>
          <div class="tem_box">
            <button class="temporary" @click="save_info">暫存</button>
          </div>
        </div>
      </div>
      <div class="box" v-if="route_name == 'add'">
        <div class="add_active">
          <div class="add_title">暫存活動</div>
        </div>
        <div class="temporaryActive">
          <tableColumn
            :columns="columns"
            :columnsData="columnsData"
            :openExpand="false"
          >
            <span slot="operation" slot-scope="props">
              <a-button @click="tableList('modify', props)">修改</a-button>
              <a-button @click="tableList('del', props)">删除</a-button>
            </span>
          </tableColumn>
        </div>
      </div>
      <div class="btn_box">
        <button class="btn1 btn" @click="post_info">送審</button>
        <button class="btn" @click="bacn_url">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import obj from "./viewData.js";
import { tempetDownLoad, changeDateStyleB } from '@/common/common'
export default {
  name: "mediaCode",
  data() {
    return {
      route_name: "",
      title: "",
      postArr: [
        {
          title: "通路名稱",
          type: "select",
          key: "channelName",
          size: 10,
          width: "240px",
          required: true,

          value: "1",
          items: [
            {
              name: "投保資格確認",
              value: 1
            },
            {
              name: "資料填寫",
              value: 2
            },
            {
              name: "資料確認",
              value: 3
            },
            {
              name: "待繳費",
              value: 4
            }
          ]
        },
        {
          title: "通路代碼",
          type: "span",
          key: "channelCode",
          disabled: true,
          size: 10,
          width: "240px",
          value: "",
          items: ""
        }
      ],
      postData: {},
      columns: [],
      columnsData: [],
      channelList: [], //通路代碼
      activeArr: [
        {
          title: "活動名稱",
          type: "input",
          key: "activityName",
          size: 10,
          width: "240px",
          required: true,
          value: "",
          items: ""
        },
        {
          title: "Media Code",
          type: "input",
          key: "mediaCode",
          size: 10,
          width: "240px",
          required: true,
          value: "",
          items: ""
        },
        {
          title: "開始時間",
          type: "time",
          key: "grantBegStr",
          size: 10,
          width: "240px",
          required: true,
          value: "",
          items: ""
        },
        {
          title: "結束時間",
          type: "time",
          key: "grantEndStr",
          size: 10,
          width: "240px",
          required: true,
          // selectHour:true,
          value: "",
          items: ""
        },
        {
          is_null: "is_null",
          num: -1
        }
      ]
    };
  },
  watch: {
    postData: {
      handler: function(value) {
     //   this.$nextTick(() => {
				//	console.log(value,'wwwwwwww')
				//	console.log(this.channelList,'wwwwwwww')
          if (value.channelName !== undefined) {
            this.channelList.map(item => {
              if (value.channelName == item.channelName) {
                this.postData.channelCode = item.channelCode;
              }
            });
          }
    //      console.log(this.postData, "");
      //  });
      },
      deep: true,
		//	immediate: true
    },
    columnsData: {
      handler: function(value) {
      //  console.log(value, "columnsData");
      },
      deep: true
    }
  },

  methods: {
    bacn_url() {
      this.$router.go(-1);
    },
    get_template() {
      this.Axios("downFile").then(res => {
        window.open(res.data.data);
      });
    },
    post_file(e) {
      var test = document.getElementById("filed");

      let code = this.postData.channelCode;
      if (code !== undefined) {
        var forms = new FormData();
        forms.append("file", e.target.files[0]);
        let config = {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token")
          }
        };
        let that = this;
        that.$axios
          .post(
            `https://tst-twaia-backup-admin.zaouter.com/ecadmin/ecadminMedia/importMediaCodeTemplate?channelCode=${code}`,
            forms,
            config
          )
          .then(function(res) {
            let data = res.data.data;
            // console.log(data, "");
            if ((res.data.code = "200")) {
              let columArr = [];
              data.map(item => {
                let datas = item.grantBegStr.split("/");
                datas[1] > 9
                  ? (datas[1] = parseInt( `0${datas}`))
                  : (datas[1] = `${datas[1]}`);
                let datas2 = item.grantEndStr.split("/");
                datas2[1] > 9
                  ? (datas2[1] = parseInt( `0${datas2}`))
                  : (datas2[1] = `${datas2[1]}`);
                item.grantBegStr = datas.join("-");
                item.grantEndStr = datas2.join("-");
                let {
                  activityName,
                  grantBegStr,
                  grantEndStr,
                  mediaCode
                } = item;
                let arr = {
                  activityName,
                  grantBegStr,
                  grantEndStr,
                  mediaCode
                };
                columArr.push(arr);
              });
              columArr.map(item => {
                that.columnsData.push(item);
              });
              that.$message.success("匯入成功");
              test.value = "";
            } else if (res.data.code == "500") {
              that.$message.error(res.data.message);
            }
            test.value = ""; //虽然test的value不能设为有字符的值，但是可以设置为空值
          });
      } else {
        this.$message.error("請選擇通路名稱");
        test.value = ""; //虽然test的value不能设为有字符的值，但是可以设置为空值
      }
    },
    post_api() {
			// if(this.postData.grantBegStr.indexOf('/') > -1){
			// 	this.postData.grantBegStr = changeDateStyleB(this.postData.grantBegStr)
			// }else if(this.postData.grantEndStr.indexOf('/') > -1){
			// 	this.postData.grantEndStr = changeDateStyleB(this.postData.grantEndStr)
			// }
      let tep = {
        channelName: this.postData.channelName,
        channelCode: this.postData.channelCode,
        mediaCodeApplyDTOList: this.columnsData
      };
      if (this.route_name == "modify") {
        tep.mediaCodeApplyDTOList = [this.postData];
      }
      if (this.route_name == "add") {
        // tep.mediaCodeApplyDTOList = [this.postData];

        let data = this.columnsData;
        data.map(item => {
          let startTime = item.grantBegStr.split("-");
          let endTime = item.grantEndStr.split("-");
        startTime[1] = startTime[1] < 10 ? `0${parseInt(startTime[1])}` : startTime[1];
          startTime[2]= startTime[2] < 10 ? `0${parseInt(startTime[2])}` : startTime[2];
         endTime[1]= endTime[1] < 10 ? `0${parseInt(endTime[1])}` : endTime[1];
         endTime[2]=  endTime[2] < 10 ? `0${parseInt(endTime[2])}` : endTime[2];
          if (startTime[0].length < 4) {
            startTime[0] = parseInt(startTime[0]) + 1911;
            item.grantBegStr = startTime.join("-");
          }
          if (endTime[0].length < 4) {
            endTime[0] = parseInt(endTime[0]) + 1911;
            item.grantEndStr = endTime.join("-");
          }
        });
        console.log(data, "++++++++");
        tep.mediaCodeApplyDTOList = data;
      }
      this.Axios("addMediaCode", tep).then(res => {
        if (res.data.code == "200") {
          this.$message.success("新增成功");
          setTimeout(() => {
            this.$router.push({
              name: "MediaCodeCheck"
            });
          }, 1500);
        }
      });
    },
    post_info() {
      console.log(this.postData, "postData");
      if (this.postData.channelName !== undefined) {
        console.log(this.columnsData, "this.columnsData");
        if (this.route_name == "modify") {
          this.post_api();
        } else {
          if (this.columnsData.length >= 1) {
            this.post_api();
          } else {
            this.$message.error("無暫存活動");
          }
        }
      } else {
        this.$message.error("請選擇通路名稱");
      }
    },
    tableList(opt, data) {
      console.log(data, "data");
      let index = data.index;
      let datas = data.record;

      if (opt == "modify") {
        if (this.activeArr[4].num != index) {
          this.activeArr.map((item, index1) => {
            if (item["key"] !== undefined) {
              item["value"] = datas[item["key"]];
            }
            if (item["key"] == "grantBegStr") {
              let time = datas[item["key"]];
              // time[0] = time[0] - 1911;
              // item["value"] = time.join("-");
            }
            if (item["key"] == "grantEndStr") {
              let time = datas[item["key"]];
              // time[0] = time[0] - 1911;
              // item["value"] = time.join("-");
            }
            if (item.is_null == "is_null") {
              item.num = index;
            }
          });
        }

        console.log(this.activeArr, "activeArr");
      } else if (opt == "del") {
        let acArr = [
          {
            title: "活動名稱",
            type: "input",
            key: "activityName",
            size: 10,
            width: "240px",
            required: true,
            value: "",
            items: ""
          },
          {
            title: "Media Code",
            type: "input",
            key: "mediaCode",
            size: 10,
            width: "240px",
            required: true,
            value: "",
            items: ""
          },
          {
            title: "開始時間",
            type: "time",
            key: "grantBegStr",
            size: 10,
            width: "240px",
            required: true,
            value: "",
            items: ""
          },
          {
            title: "結束時間",
            type: "time",
            key: "grantEndStr",
            size: 10,
            width: "240px",
            required: true,
            value: "",
            items: ""
          }
        ];

        let tag = 0;
        let arr = this.activeArr;
        arr.map((item, index) => {
          if (item.num >= 0) {
            tag = 1;
          }
        });
        if (tag == 1) {
          this.activeArr = acArr;
        } else {
          this.columnsData.splice(index, 1);
        }
      }
    },
    save_info() {
      //暫存
      console.log(this.activeArr, "123");
      let error = undefined;
      let arr = {};
      let idx;
      this.activeArr.map((item, index) => {
        if (item.num >= 0) {
          idx = item.num;
          if (item.is_null != "is_null") {
            if (item.value == "" && item.value == undefined) {
              error = 1;
            } else {
              arr[item["key"]] = item["value"];
              item["value"] = "";
            }
          }
        } else {
          if (item.is_null != "is_null") {
            if (item.value !== "" && item.value !== undefined) {
              arr[item["key"]] = item["value"];
              item["value"] = "";
            } else {
              error = 1;
            }
          }
        }
      });
      if (error == 1) {
        this.$message.error("請填寫完整活動表單");
        error = 0;
      } else {
        if (idx >= 0) {
          this.columnsData.splice(idx, 1, arr);
          this.activeArr.map(item => {
            if (item.is_null == "is_null") {
              item.num = undefined;
            }
          });
          this.columnsData.map(item => {
            let startTime = item.grantBegStr.split("-");
            let endTime = item.grantEndStr.split("-");
            if (startTime[0].length > 3) {
              startTime[0] = startTime[0] - 1911;
              item.grantBegStr = startTime.join("-");
            }
            if (endTime[0].length > 3) {
              endTime[0] = endTime[0] - 1911;
              item.grantEndStr = endTime.join("-");
            }
          });
        } else {
          this.columnsData.push(arr);
          this.columnsData.map(item => {
            let startTime = item.grantBegStr.split("-");
            let endTime = item.grantEndStr.split("-");
            if (startTime[0].length > 3) {
              startTime[0] = startTime[0] - 1911;
              item.grantBegStr = startTime.join("-");
            }
            if (endTime[0].length > 3) {
              endTime[0] = endTime[0] - 1911;
              item.grantEndStr = endTime.join("-");
            }
          });
        }
      }
    },

    getChannelName() {
      let tep = {
        tab: "list"
      };
      this.Axios("getChannelName", tep).then(res => {
        let data = res.data.data;
        this.totalNum = data.total;
        this.channelList = data;
        this.postArr.map(item => {
          if (item.key == "channelName") {
            let dataArr = [];
            data.map(item1 => {
              let arr = {
                name: item1.channelName,
                value: item1.channelName
              };
              dataArr.push(arr);
            });
            item.items = dataArr;
          }
        });
      });
    },
    get_input() {
      let session = JSON.parse(window.sessionStorage.getItem("mediaInfo"));				
      if (this.route_name == "modify") {
        this.postArr.map((item, index) => {
          item["value"] = session[item["key"]];
          this.$set(this.postData, item["key"], session[item["key"]]);
          console.log(this.postData, "postData");

          // }
        });
      }
    },
    getItems(item) {
      return item.items;
    },
    createdSearch() {
      let { columns } = obj;
      this.columns = columns;
    }
  },

  created() {
    this.getChannelName();

    this.createdSearch();
    console.log(this.$route, "");
    let tab = this.$route.query.menu;
    this.route_name = tab;
    if (tab == "add") {
      this.title = "新增Media Code";
    } else if (tab == "modify") {
      this.title = "修改Media Code";

      this.postArr = [
        {
          title: "通路名稱",
          type: "select",
          key: "channelName",
          width: "300px",
          required: true,

          items: [
            {
              name: "投保資格確認",
              value: 1
            },
            {
              name: "資料填寫",
              value: 2
            },
            {
              name: "資料確認",
              value: 3
            }
          ]
        },
        {
          title: "通路代碼",
          type: "input",
          key: "channelCode",
          size: 10,
          width: "240px",
          value: "F05827",
          items: ""
        },
        {
          title: "活動名稱",
          type: "input",
          key: "activityName",
          required: true,
          size: 10,
          width: "240px",
          value: "S04427",
          items: ""
        },
        {
          title: "Media Code",
          type: "input",
          key: "mediaCode",
          required: true,
          size: 10,
          width: "240px",
          value: "0001",
          items: ""
        },
        {
          title: "開始時間",
          type: "time",
          key: "grantBegStr",
          required: true,
          size: 10,
          width: "240px",
          items: ""
        },
        {
          title: "結束時間",
          type: "time",
          key: "grantEndStr",
          required: true,
          width: "240px",
          items: ""
        }
      ];
      this.get_input();
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
