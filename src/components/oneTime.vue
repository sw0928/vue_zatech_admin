<template>
  <div class>
    <div class="formDiv">
      <calendar
        :calendar_date.sync="calendar_date"
        v-model="value"
        :needSelectHour="selectHour"
      ></calendar>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import calendar from "../components/calendar";

import { formatmyyear, getAge, timeOperation } from "@/common/common.js";
export default {
  components: {
    calendar
  },
  name: "comTime1",
  props: {
    required: {
      type: Boolean,
      required: false,
      default: true
    },
    selectHour: {
      type: Boolean,
      required: false,
      default: false
    },
    disabledDay: {
      type: String,
      required: false
    },
    isRange: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: "打开App, 浏览更多"
    },
    errorDesc: {
      type: String,
      required: false,
      default: "来啦老弟"
    },
    showError: {
      type: Boolean,
      required: false,
      default: false
    },
    tip: {
      required: false
    },
    grey: {
      required: false
    },
    type: {
      required: false,
      default: false
    },

    value: {
      required: false,
    },
    isSome: {
      required: false,
      default: false
    },
    minYear: {
      required: false
    },
    maxYear: {
      required: false
    },
    modefine: {
      required: false,
      default: false
    },
    isHave: {
      required: false,
      default: false
    }
  },
  data() {
    return {
      calendar_date: "",
      moment,
      dateFormat: "tYY/MM/DD",
      isSelect: true,
      IsTrue: false,
      isShow: false,
      isFocus: false,
      autofocus: false,
      disabled: true,
      minYearL: 0,
      placeholder: "",
      pickdate: null,
      // dateFormat: "YYYY/MM/DD",
      defaultValue: "",
      validRange: [
        moment(timeOperation("year", -108)),
        moment(timeOperation("year", 0))
      ],
      ifshow: false,
      mode: "month",
      ifchange: false,
      value1: "",
      t_tag: 0
    };
  },
  watch: {
    ifshow: {
      handler: function(value) {
        let is_ie = this.isIE();
        if (value && this.t_tag == 1) {
          if (is_ie && this.t_tag == 1) {
            this.chose_ie();
          } else {
            this.chose_notIE();
          }
        }
        this.t_tag = 0;
      }
    },
    value: {
      handler: function(val) {
        this.value = val;
				 //console.log(this.selectHour, 'Hour')
        this.$emit("update:value", val);
      },
      deep:true
    },
    calendar_date: {
      handler: function(val, old) {
        console.log(val, '__________-valOone')
        let is_ie = this.isIE();
        this.$emit("update:value", val);
      },
      deep:true
      
    }
  },
  created() {
    let is_ie = this.isIE();
    if (is_ie) {
      this.defaultValue = moment(
        "Sun Mar 29 109 18:40:38 GMT+0800 (中国标准时间)"
      );
    } else {
      this.defaultValue = moment(timeOperation("year", 0));
    }

    this.placeholder = "請选择" + this.title;
  },
  mounted() {},
  methods: {
    chose_calendar() {
      this.$nextTick(() => {
        let doc = document.querySelector(
          ".formDiv .ant-select-selection-selected-value"
        );
        doc.innerText = `109年`;
      });
    },

    chose_notIE() {
      this.chose_calendar();
    },
    chose_ie() {},

    isIE() {
      if (!!window.ActiveXObject || "ActiveXObject" in window) {
        return true;
      } else {
        return false;
      }
    },
    showPicker() {
      if (!this.ifshow) {
        this.ifshow = true;
        this.t_tag = 1;
      } else {
        this.t_tag = 0;
      }
    },
    closePicker() {
      this.ifchange = false;
      this.ifshow = false;
    },
    mingguoValue(value, type = 1) {
      try {
        if (value.length == 0) return "";
        let stringEnd = value.substring(4);
        let stringStart = value.substring(0, 4) - 1911;

        return stringStart + stringEnd;
      } catch (e) {
        return "";
      }
    },
    changeFocus() {
      console.log(`value`);
    },

    onChange(e) {
      console.log(e, "");
      let m = e.format("YYYY-MM-DD").substring(1);
      let m1 = parseInt(m.substring(0, 3)) + 1911;
      let m2 = m.substring(3);
      let time = m1 + m2;
      this.$emit("update:value", time);
    },
    panelChange(value, mode) {
      this.$nextTick(() => {
        let doc = document.querySelector(
          ".formDiv .ant-select-selection-selected-value"
        );
        doc.innerText = `${this.lt100(
          parseInt(value._d.getFullYear()) - 1911
        )}年`;
      });
    },
    select(date, dataStr) {
      this.value1 = this.mingguoValue(formatmyyear(date._d));
      this.$emit("update:value", formatmyyear(date._d));
      this.ifchange = false;
      this.ifshow = false;
    },
    lt10(num) {
      if (num < 10) return `0${num}`;
      return num;
    },
    lt100(num) {
      if (num < 10) {
        return `00${num}`;
      } else if (num < 100) {
        return `0${num}`;
      } else {
        return num;
      }
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
// @import '../form.scss';
.formDiv {
  position: relative;
}
.thisiMg {
  width: 14px;
  height: auto;
  position: absolute;
  top: 10px;
  right: 10px;
}
.closeBtn {
  padding-top: 4px;
  padding-left: 4px;
}
.rihgtThis {
  position: absolute;
  bottom: -366px;
  left: 0;
  background: #fff;
  z-index: 999;
  border-radius: 6px;
  box-shadow: 0 0 8px 0 #666;
}
</style>
