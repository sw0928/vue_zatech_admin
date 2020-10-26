<template>
  <div class="toas" v-show="show">
    <!-- <div>{{title}}</div> -->
    <!-- {{width}} -->
    <div class="e_from" :style="{ width: width + '!important' }">
      <div class="title">
        {{ title }}
      </div>
      <div class="media" v-show="inner == 'mcq'">
        <div class="form" v-show="is_content1 == 1">
          <tableColumn
            :columns="columns"
            :columnsData="columnsData"
            :openExpand="false"
          >
          </tableColumn>
        </div>
      </div>
      <div class="content" v-show="is_content2 == 1">{{ content }}</div>
      <div
        class="access"
        :class="{ examin_chang: examin == 1 }"
        v-show="inner == 'aq'"
      >
        <div id="add" :style="{ padding: padding + '!important' }">
          <div class="tableTitle" v-show="tableTitle">{{ tableTitle }}</div>
          <modelForm
            :is_null="item.is_null"
            v-model="item.value"
            :size="item.size"
            :width="item.width"
            :key="item.key"
            :title="item.title"
            :items="getItems(item)"
            :type="item.type"
            :showHtml="item.showHtml"
            :required="item.required"
            v-for="item in postArr"
            class="comDiv"
            :class="{ needchang: examin == 1 }"
            :isAutoPlacehoder="true"
          ></modelForm>
        </div>
      </div>
      <div class="access_box" v-show="show_table == 'show'">
        <div class="access_radio">
          <div class="access_left">審核</div>
          <div class="access_right">
            <a-radio-group @change="onChange" v-model="chose_radio">
              <a-radio :value="1">通過</a-radio>
              <a-radio :value="2">退件</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="access_area">
          <div class="access_left">審核備註</div>
          <div class="access_right">
            <a-textarea
              @change="areaChange"
              v-model="form_value"
              :autoSize="{ minRows: 3, maxRows: 5 }"
            />
          </div>
        </div>
      </div>

      <div class="btn_box">
        <button class="btn1 btn" @click="post_info">{{ btnText }}</button>
        <button class="btn" @click="show = false" v-if="btnText !== '返回'">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from '@/common/bus.js'
export default {
  data() {
    return {
      show: false,
      chose_radio: 0,
      form_value: ""
    };
  },
  methods: {
    post_info() {
      if (this.chose_radio > 0) {
        if (this.post_url == "midia_access") {
          let arr = [];
          this.columnsData.map((item, index) => {
            let data = {};
            data.applyId = item.applyId;
            arr.push(data);
          });
       //   console.log(arr, "arr");
          let tep = {
            auditorStatus: this.chose_radio == 1 ? 3 : 2,
            auditorDescribe: this.form_value,
            mediaCodeApplyDTOList: arr
          };
          this.Axios("mediaApproval", tep).then(res => {
          //  console.log(res, "");
            if (res.data.code == 200) {
              this.$message.success("送審成功");							
              Bus.$emit('media', '200');
							setTimeout(() => {
							  this.show = false;						  
							}, 500); 
            } else {
              this.$message.error("送審失敗");
            }
          });
        } else if (this.post_url == "saleProductCheck") {
          let arr = [];
          this.columnsData.map((item, index) => {
            let data = {};
            data.applyId = item.applyId;
            arr.push(data);
          });

          let tep = {
            auditorStatus: this.chose_radio == 1 ? 3 : 2,
            auditorDescribe: this.form_value,
            channelGoodsApplyDTOs: arr
          };
          this.Axios("goodsDtoAudit", tep).then(res => {
          //  console.log(res, "");
            if (res.data.code == 200) {
              this.$message.success("送審成功");
              Bus.$emit('goods', '200');
							setTimeout(() => {
							  this.show = false;						  
							}, 500); 
            } else {
              this.$message.error("送審失敗");
            }
          });
        } else {
          let tep = {
            applyId: this.applyId,
            auditorStatus: this.chose_radio == 1 ? 3 : 2,
            auditorDescribe: this.form_value
          };
          this.Axios("approval", tep).then(res => {
           // console.log(res, "");
            if (res.data.code == 200) {
              this.$message.success("送審成功");
							Bus.$emit('approval', '200')
							setTimeout(() => {
							  this.show = false;						  
							}, 500);             
              // setTimeout(() => {
              //   _this.$router.go(-1);
              // }, 1500);
            } else {
              this.$message.error("送審失敗");
            }
          });
        }
      } else {
        if (this.btnText == "返回") {
          this.show = false;
        } else {
          // alert('請選擇審核類型')
          this.$message.error("請選擇審核狀態");
        }
      }
    },
    onChange(e) {
     // console.log(e, "");
    },
    areaChange(e) {
    //  console.log(e, "");
      // this.form_value = e.data
    },
    getItems(item) {
      // console.error(this.goodsList)
      if (item.key == "goodsId") {
        return this.goodsList;
      } else if (item.key == "orderStatus") {
        return this.orderStatusEnum;
      } else {
        return item.items;
      }
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.toas {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  top: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.4);
  .e_from {
    border-radius: 10px;
    width: 75%;
    min-height: 20%;
    background: #fff;
    .title {
      padding: 0 20px;
      border-bottom: 2px solid #e1e1e1;
      font-size: 20px;
      font-weight: 600;
      line-height: 58px;
    }
    .content {
      padding: 10px 20px;
      font-size: 17px;
    }
    .access {
      #add {
				border: 1px solid #bbb;
				margin: 50px 30px 0;
				box-sizing: border-box;
				font-size: 16px;								
        .comDiv {
          display: inline-block;
          width: 49% !important;
        }
        .needchang {
          // background: red;
          width: 32% !important;
          &:nth-child(7),
          &:nth-child(8) {
            // background: red;
            width: 100% !important;
          }
        }
      }
    }
    .examin_chang {
      margin: 30px;
      border: 1px solid #e1e1e1;
      padding: 0 40px !important;
    }
    .tableTitle {
      margin: 10px 20px;
			font-size: 16px;
			font-weight: 600;
			padding-bottom: 10px;
			border-bottom: 1px solid #bbb;
    }
    .form {
      padding: 20px;
      min-height: 50px;
      // border: 1px solid #e1e1e1;
    }
    .access_box {
      margin: 0 auto;
      padding: 30px;
      border-radius: 5px;
      width: 80%;
      min-height: 20%;
      border: 1px solid #e1e1e1;
      background: #f1f1f1;
      .access_radio {
        margin-bottom: 20px;
        display: flex;
        .access_right {
          margin-left: 80px;
        }
      }
      .access_left {
        font-size: 16px;
      }
    }
    .access_area {
      display: flex;
      .access_right {
        width: 50%;
        margin-left: 50px;
      }
    }
    .btn_box {
      padding: 40px 0;
      display: flex;
      margin: 0 auto;
      justify-content: center;
      .btn {
        width: 100px;
        height: 30px;
        border: none;
        border: 10px !important;
        border: 1px solid #d8dadc;
        border-radius: 3px;
        line-height: 29px;
      }
      .btn1 {
        margin-right: 20px;
        // border-radius: 3px;

        background: #d81f49;
        color: #fff;
      }
    }
  }
}
#add >>> .modelItem{
					height: auto;
				}
#add >>> .leftSpan{
					display: inline-block;
					min-width: 150px;
					margin-bottom: 0;
					text-align: right;
					margin-right: 20px;
					font-size: 16px;
				}
</style>
