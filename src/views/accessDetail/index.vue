<template>
  <div class="detail">
    <div class="boxs">{{ title }}</div>
    <!-- {{postArr}} -->
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
          :required="item.required"
          v-for="item in postArr"
          class="comDiv"
          :isAutoPlacehoder="true"
        ></modelForm>
      </div>
      <div class="btn_box">
        <button class="btn1 btn" @click="post_info">送審</button>
        <button class="btn" @click="backup">取消</button>
      </div>
    </div>
    <div class="boxs d_info" v-else>
      <div class="detail_info">
        <div class="info_title">通路資訊</div>
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
            v-for="item in t_info"
            class="comDiv"
            :isAutoPlacehoder="true"
          ></modelForm>
        </div>
      </div>
      <div class="detail_info">
        <div class="info_title">Media Code資訊</div>
        <collapse
          v-for="(item, index) in m_info"
          :key="index"
          :title="m_title[index].title"
          :collapse_arr="item"
        ></collapse>
      </div>
      <div class="detail_info">
        <div class="info_title">商品資訊</div>
        <collapse
          v-for="(item, index) in p_info"
          :key="index"
          :title="p_title[index].title"
          :collapse_arr="item"
        ></collapse>
      </div>
      <div class="btn_box">
        <button class="btn btn1" @click="backup">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import { changeDateStyle,changeDateStyleB } from "@/common/common.js";
export default {
  name: "accessDetail",
  data() {
    return {
      route_name: "",
      title: "",
      postData: {},
      postArr: [
        {
          title: "通路名稱",
          type: "input",
          key: "channelName",
          size: 10,
          width: "240px",
          value: "",
          required: true,
          items: ""
        },
        {
          title: "通路代碼",
          type: "input",
          key: "channelCode",
          required: true,
          size: 10,
          width: "240px",
          value: "",
          items: ""
        },
        {
          title: "合作開始時間",
          required: true,
          type: "time",
          key: "grantBegStr"
        },
        {
          title: "合作結束時間",
          required: true,
          type: "time",
          key: "grantEndStr"
        },
        {
          title: "Agent Code",
          type: "input",
          key: "agentCode",
          required: true,
          size: 10,
          width: "240px",
          value: "",
          items: ""
        },
        {
          is_null: "is_null"
        },
        {
          title: "交換聲明文件名稱",
          type: "input",
          key: "title",
          size: 10,
          width: "240px",
          value: "",
          items: ""
        },
        {
          title: "資料交換聲明內容",
          type: "editor",
          key: "content",
          size: 10,
          width: "240px",
          value: "",
          items: ""
        }
      ],
      // ----------- 通路明細
      t_info: [
        //通路資訊
        {
          title: "通路名稱",
          type: "span",
          key: "channelName",
          size: 10,
          width: "240px",
          value: "花旗銀行",
          items: ""
        },
        {
          title: "通路代碼",
          type: "span",
          key: "channelCode",
          size: 10,
          width: "240px",
          value: "AL09753",
          items: ""
        },
        {
          title: "合作開始時間",
          type: "span",
          key: "grantBegStr",
          value: "109/08/08"
        },
        {
          title: "合作結束時間",
          type: "span",
          key: "grantEndStr",
          value: "109/08/08"
        },
        {
          title: "Agent Code",
          type: "span",
          key: "agentCode",
          size: 10,
          width: "240px",
          value: "D86253",
          items: ""
        },
        {
          is_null: "is_null"
        },
        {
          title: "異動時間",
          type: "span",
          key: "gmtModifiedStr",
          size: 10,
          width: "240px",
          value: "108/08/08 13:20:21",
          items: ""
        }
      ],
      m_title: [
        //mediacode 資訊title
        //摺叠面板數組
      ],
      m_info: [],
      demo_template: [
        //midiacode資訊模板
      ],
      product_template: [
        //product資訊模板
      ],
      p_title: [
        //mediacode 資訊title
        //摺叠面板數組
      ],
      p_info: [
        //商品資訊
      ],
      channelId: ""
    };
  },
  watch: {
    postData: {
      handler: function(value) {
        this.$nextTick(() => {
          if (value.channelName !== undefined) {
						//console.log(value,this.channelList)
            // this.channelList.map(item => {
            //   if (value.channelName == item.channelName) {
            //     this.postData.channelCode = item.channelCode;
            //   }
            // });
          }
        });
      },
      deep: true
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.customer.goodsList;
    },
    orderStatusEnum() {
      return this.$store.state.customer.orderStatusEnum;
    }
  },
  methods: {
    backup() {
      this.$router.go(-1);
    },
    post_info() {
      let tep = this.postData;
      tep.channelId = this.channelId;			
			if(tep.grantBegStr.indexOf('/') > -1){
				tep.grantBegStr = changeDateStyleB(tep.grantBegStr)
			}
			if(tep.grantEndStr.indexOf('/') > -1){
				tep.grantEndStr = changeDateStyleB(tep.grantEndStr)
			}
			//console.log(tep)
      this.Axios("channelApply", tep).then(res => {
        if (res.data.code == 200) {
          this.$message.success("送審成功");
          setTimeout(() => {
            this.$router.push({
              name: "accessQuery"
            });
          }, 1500);
        } else {
          this.$message.err("送審失敗");
        }
       // console.log(res, "++_+_+");
      });
    },
    getItems(item) {
      return item.items;
    },

    get_detail(id) {
      let tep = {
        channelId: id
      };
      this.Axios("channelDetail", tep).then(res => {
        let data = res.data.data;
        this.t_info.map((item, index) => {
          if (item["key"]) {
            item["value"] = data[item["key"]];
          }
        });
        let _this = this;

        //處理mediaCode資訊
        data.mediaCodeDTOList.map(item1 => {
          _this.m_title.push({
            title: item1.activityName
          });
          let arr = [
            //midiacode資訊模板
            {
              title: "Media Code",
              type: "span",
              key: "mediaCode",
              width: "100%",
              value: "109/08/08"
            },
            {
              is_null: "is_null"
            },
            {
              title: "合作開始時間",
              type: "span",
              key: "grantBegStr",
              value: "109/08/08"
            },
            {
              title: "合作結束時間",
              type: "span",
              key: "grantEndStr",
              value: "109/08/08"
            },
            {
              title: "異動時間",
              type: "span",
              key: "gmtModifiedStr",
              size: 10,
              width: "240px",
              value: "108/08/08 13:20:21",
              items: ""
            }
          ];
          arr.map(item3 => {
            if (item3["key"] !== undefined) {
              item3["value"] = item1[item3["key"]];
            }
          });
          _this.m_info.push(arr);
        });
        //處理商品咨詢
        data.channelGoodsList.map(item1 => {
          _this.p_title.push({ title: item1.goodsName });
          let arr = [
            //product資訊模板
            {
              title: "商品代碼",
              type: "span",
              key: "goodsCode",
              width: "100%",
              value: "109/08/08"
            },
            {
              is_null: "is_null"
            },
            {
              title: "Campaign Code",
              type: "span",
              key: "campaignCode",
              value: "109/08/08"
            },
            {
              title: "商品類別",
              type: "span",
              key: "categoryName",
              value: "109/08/08"
            },
            {
              title: "銷售開始時間",
              type: "span",
              key: "grantBegStr",
              value: "109/08/08"
            },
            {
              title: "銷售終止日期",
              type: "span",
              key: "grantEndStr",
              value: "109/08/08"
            },
            {
              title: "異動時間",
              type: "span",
              key: "gmtModifiedStr",
              size: 10,
              width: "240px",
              value: "108/08/08 13:20:21",
              items: ""
            }
          ];
          arr.map(item3 => {
            console.log(item1[item3["key"]], "item1");

            if (item3["key"] !== undefined) {
              item3["value"] = item1[item3["key"]];
            }
          });
          this.p_info.push(arr);
        });
      });
    },

    // getChannelName() {
    //   let tep = {
    //     tab: "list"
    //   };
    //   this.Axios("getChannelName", tep).then(res => {
    //     let data = res.data.data;
    //     this.totalNum = data.total;
    //     this.channelList = data;
    //     this.postArr.map(item => {
    //       if (item.key == "channelName") {
    //         let dataArr = [];
    //         data.map(item1 => {
    //           let arr = {
    //             name: item1.channelName,
    //             value: item1.channelName
    //           };
    //           dataArr.push(arr);
    //         });
    //         item.items = dataArr;
    //       }
    //     });
    //   });
    // },
    get_input() {
      let session = JSON.parse(window.sessionStorage.getItem("accessInfo"));
      if (this.route_name == "modify") {
        this.postArr.map((item, index) => {
          if (item["key"]) {
            item["value"] = session[item["key"]];
          }
        });
      }
      //this.getChannelName();

      this.postArr.forEach((item, index) => {
        if (item.key) {
          this.$set(this.postData, item.key, item.value);
        }
      });
    }
  },

  created() {
    let tab = this.$route.query.menu;
    this.route_name = tab;
    this.get_input();

    if (tab == "add") {
      this.title = "新增通路";
    } else if (tab == "modify") {
      this.title = "修改通路";
      this.channelId = this.$route.query.channelId;
      console.log(this.postArr, "postArrpostArr");
      this.postArr.map(item => {
        if (item["key"] == "channelName") {
          item["type"] = "input";
        } else if (item["key"] == "channelCode") {
          item["type"] = "span";
        }
      });
    } else if (tab == "info") {
      this.title = "通路明細";
      this.channelId = this.$route.query.channelId;
      this.get_detail(this.channelId);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>
