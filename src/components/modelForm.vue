<template>
  <div
    style="position: relative;"
    :style="{
      display: display,
      width: width + '!important',
      height: showHtml == 'show' ? 'auto' : 'null'
    }"
    :class="{ rangeTime: type == 'rangeTime', editor: type == 'editor' }"
  >
    <div v-show="is_null !== 'is_null'">
      <div
        :class="{
          upLoad: type == 'upLoad',
          noMar: type == 'checkBox',
          errorT: error,
          isFlex: isFlex,
          show_html: showHtml == 'show'
        }"
        class="modelItem"
      >
        <div
          v-if="title"
          class="leftSpan"
          :class="{ leftSpan1: type == 'upLoad', required: required }"
        >
          <span :class="{ errorRed: error }">{{ title }}</span>
        </div>
        <a-input
          @blur="blur"
          :disabled="disabled"
          v-if="type == 'input'"
          :value="value"
          @input="valueChange($event.target.value)"
          @change="valueChange($event.target.value)"
          :placeholder="placeholder"
          class="modelInput"
        ></a-input>
				<a-input
				  @blur="blur"
				  :disabled="disabled"
				  v-else-if="type == 'textarea'"
				  :value="value"
					type="textarea"
				  @input="valueChange($event.target.value)"
				  @change="valueChange($event.target.value)"
				  :placeholder="placeholder"
				  class="modelInput"
				></a-input>
        <a-select
          :disabled="disabled || items.length == 0"
          :mode="mode"
          showSearch
          v-else-if="type == 'select'"
          :value="value"
          @change="valueChange"
          :placeholder="placeholder"
          class="modelInput"
          :filterOption="filterOption"
        >
          <a-select-option
            v-for="(item, index) in items"
            :value="item.value"
            :key="index"
            >{{ item.name }}</a-select-option
          >
        </a-select>
        <span
          class="form_span"
          v-else-if="type == 'span' && showHtml !== 'show'"
        >
          {{ value }}</span
        >
        <div class="form_data" v-else-if="type == 'span' && showHtml == 'show'">
          <div class="editor_inner" v-html="value"></div>
        </div>
				<div class="form_data sw_input" v-else-if="type == 'input_one'">
				 <a-input 
				 :value="value" 
				 @input="valueChange($event.target.value)"
				 @change="valueChange($event.target.value)"
				 :placeholder="placeholder" class="modelInput"></a-input>
				</div>
				<div class="form_data sw_posi sw_input" v-else-if="type == 'input_two'">
				 <span class="sw_span"> -- </span>
				 <a-input
					:value="value" 
					@input="valueChange($event.target.value)"
					@change="valueChange($event.target.value)"
					:placeholder="placeholder" class="modelInput"></a-input>
				</div>
        <a-radio-group
          :disabled="disabled"
          v-else-if="type == 'radio'"
          :value="value"
          @change="valueChange($event.target.value)"
        >
          <a-radio
            :key="indexS"
            v-for="(itemS, indexS) in items"
            :value="itemS.value"
            >{{ itemS.name }}</a-radio
          >
        </a-radio-group>
        <!-- <Upload :default-file-list="value" v-else-if='type == "upLoad"' class="modelInput" style='display: inline-block'
			 action="//jsonplaceholder.typicode.com/posts/">
				<Button icon="ios-cloud-upload-outline">上传图片</Button>
			</Upload> -->
        <comRangeTime
          :disabled="disabled"
          :value.sync="value"
          v-else-if="type == 'rangeTime'"
          class="modelInput"
          :selectHour="selectHour"
        ></comRangeTime>

        <comTime
          :disabled="disabled"
          :value.sync="value"
          v-else-if="type == 'time'"
          class="modelInput"
          :selectHour="selectHour"
        ></comTime>

        <a-switch
          :disabled="disabled"
          defaultChecked
          :checked="value"
          @change="valueChange"
          v-else-if="type == 'switch'"
          class=""
        ></a-switch>

        <a-checkbox-group
          :disabled="disabled"
          v-else-if="type == 'checkBox'"
          :value="value"
          @change="valueChange"
        >
          <!-- <span style="color: red" slot="name" slot-scope="{value}">{{name}}</span> -->
          <a-checkbox
            :key="index"
            v-for="(item, index) in items"
            :value="item.value"
            >{{ item.name }}</a-checkbox
          >
        </a-checkbox-group>
        <editor-bar
          v-else-if="type == 'editor'"
          v-model="value"
          @change="valueChange"
          :isClear="isClear"
        ></editor-bar>
      </div>
      <slot></slot>
      <!-- {{errorMsg}} -->
      <div
        v-if="isError"
        class="errorRed error"
        :class="{ error1: type == 'upLoad' }"
      >
        {{ placeholder }}
      </div>
      <div
        v-if="error"
        style="color: #f5222d;font-size: 12px;padding-left: 120px;padding-bottom: 10px;"
      >
        {{ errorMsg || `請填寫正確的${title}` }}
      </div>
    </div>
  </div>
</template>
<script>
import { regTemplate } from "@/common/common.js";
import moment from "moment";
import comRangeTime from "./comRangeTime";
import comTime from "./oneTime";
import EditorBar from "@/components/WangEditor";
export default {
  name: "modelForm",
  components: {
    comRangeTime,
    comTime,
    EditorBar
  },
  props: {
    title: {
      type: String,
      required: false,
      default: "打开App, 浏览更多"
    },
    required: {
      type: Boolean,
      required: false,
      default: false
    },
    selectHour: {
      type: Boolean,
      required: false,
      default: false
    },
    type: {
      type: String,
      required: false,
      default: "input"
    },
    showHtml: {
      type: String,
      required: false
    },
    isError: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    items: {
      required: false
    },
    keyS: {
      required: false
    },
    is_null: {
      required: false
    },
    minYD: {
      required: false
    },
    display: {
      required: false
    },
    maxYD: {
      required: false
    },
    value: {
      required: false
    },
		value2: {
		  required: false
		},
    includeKey: {
      required: false,
      default: ""
    },
    isFlex: {
      required: false,
      default: false
    },
    mode: {
      required: false,
      default: ""
    },
    regular: {
      required: false,
      default: ""
    },
    disabled: {
      required: false,
      default: false
    },
    isAutoPlacehoder: {
      required: false,
      default: true
    },
    dataKey: {
      required: false
    },
    errorMsg: {
      required: false
    },
    width: {
      required: false
    },
    size: {
      required: false
    }
  },
  data() {
    return {
      valueTime: "",
      minYear: "",
      editor: {
        info: ""
      },
      isClear: false,
      defaultValue: [moment(), moment()],
      ranges: {
        今天: [moment(), moment()],
        近一月: [moment().subtract(1, "months"), moment()],
        近俩月: [moment().subtract(2, "months"), moment()],
        近三月: [moment().subtract(3, "months"), moment()]
      },
      options: {},
      MaxTime: new Date("2019-04-18"),
      itemsLabel: "",
      placeholder: "",
      showError: false,
      regErr: false
    };
  },
  computed: {
    valueIN() {
      // alert(this.value)
      let result =
        this.value === undefined || this.value === null || this.value === ""
          ? true
          : false;
      return result;
    }
  },
  watch: {
    minYD: {
      handler: function(value) {
        this.changeOption();
      },
      immediate: true
    },
    maxYD: {
      handler: function(value) {
        this.changeOption();
      },
      immediate: true
    },
    value: {
      handler: function(value) {
        this.$emit("input", value);
        if (!value && value !== 0 && value !== "0") {
          this.$emit("input", undefined);
        } else {
          this.$emit("input", value);
        }
      },
      deep: true,
      // immediate: true
    },
		value2: {
		  handler: function(value) {
				console.log(value)
		    this.$emit("input", value);
		    if (!value && value !== 0 && value !== "0") {
		      this.$emit("input", undefined);
		    } else {
		      this.$emit("input", value);
		    }
		  },
		  deep: true,
		  // immediate: true
		},
    valueTime: {
      handler: function(value) {
        this.$emit("input", value);
        this.$emit("change", this.keyS, value);
      },
      deep: true
    }
  },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    maxStr(str, maxLength) {
      str = str + "";
      var len = 0;
      for (var i = 0; i < str.length; i++) {
        var c = str.charCodeAt(i);
        //单字节加1
        if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
          len++;
        } else {
          len += 2;
        }
        if (len > maxLength) {
          return str.substring(0, i);
        }
      }
      return str;
    },
    checkRegular() {},
    // input: function() {
    //   if(this.size && this.value) {
    //     this.maxStr(this.value,this.size)
    //   }
    // },
    blur: function() {
      let tempStr = "";
      // if(this.size && this.value) {
      //   console.log('输出字符串',this.maxStr(this.value,this.size))
      //   this.$emit('input', this.maxStr(this.value,this.size))
      //   tempStr = this.maxStr(this.value,this.size);
      //   // return
      // }
      if (!this.required) {
        return;
      }
      if (!this.value) {
        this.$emit("update:error", true);
        return;
      } else {
        this.$emit("update:error", false);
      }
      // console.log(this.regular)
      if (!this.regular) return;
      if (!regTemplate(tempStr || this.value, this.regular)) {
        this.$emit("update:error", true);
      } else {
        if (this.regular == "email" && this.value.length > 50) {
          this.$emit("update:error", true);
        } else {
          this.$emit("update:error", false);
        }
      }
    },
    valueChange(value) {
      if (this.size) {
        console.log("输出字符串", this.maxStr(value, this.size));
        this.$emit("input", value);
        // tempStr = this.maxStr(value,this.size);
        return;
      }

      this.$emit("input", value);
      if (value && this.type != "input") {
        this.$emit("update:error", false);
      }
    },
    // changeValueTime(value) {
    //   // console.log(dateStrings);
    //   console.log(value,'date');
    //   this.$emit("input", value);
    // },
    changeOption() {}
  },
  created() {
    if (this.isAutoPlacehoder) {
      this.placeholder =
        this.type == "input" ? `請填寫${this.title}` : `請選擇`;
    } else {
      this.placeholder = this.type == "input" ? `請填寫` : `請選擇`;
    }
  }
};
</script>

<style lang="scss" scoped>
.isFlex {
  display: flex;
  align-items: center;

  .leftSpan {
    min-width: 70px;
    margin-bottom: 0;
  }
}

.comDiv {
  width: 120px;
  margin-right: 8px;
  .show_html {
    display: -webkit-box !important;
  }
}

/deep/ .errorT {
  .ant-input {
    border: 1px solid #f5222d;
  }

  .ant-select-selection {
    border: 1px solid #f5222d;
  }
}

.noMar {
  margin-bottom: 0 !important;
}

.modelItem {
  // display: flex;
  // justify-content: center;
  // align-item: center
  text-align: left;
  min-width: 120px;
  margin-bottom: 10px;

  .modelInput {
    width: 100%;
  }
}
.form_data {
  height: auto;
  overflow: auto;
	word-break:break-all;
}
.sw_input{
	.sw_span{
		float: left;
		padding: 5px;
	}
	.modelInput{
		float: left;
		width: 80%;
		
	}
}
.sw_posi{
	position: absolute;
	bottom: 10px;
}
.tableCom {
  border-top: 3px solid #d2d6de;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
  padding: 10px;
  background: #fff;
}

.error {
  margin-left: 132px;
  // margin-top: 8px;
  margin-top: -10px;
  margin-bottom: 10px;
}

.error1 {
  margin-top: 0px;
}

.errorRed {
  color: #dd4b39;
}

.leftSpan {
  display: inline-block;
  // text-align: right
  color: #494949;
  font-size: 12px;
  margin-bottom: 4px;
}

.required::before {
  display: inline-block;
  margin-right: 4px;
  content: "*";
  font-family: SimSun;
  line-height: 1;
  font-size: 14px;
  color: #f5222d;
}

.leftSpan1 {
  position: relative;
  top: 6px;
}

.upLoad {
  display: flex;
  margin-bottom: 0;

  .upSpan {
    position: relative;
    top: 6px;
  }
}

.rangeTime {
  width: 273px !important;
}
</style>
