<template>
  <div class="calendar_box">
    <div class="date_time" @click="show_date">
      {{ value ? time : "請選擇" }}
    </div>
    <div class="calendar" v-if="calendar_show">
      <!--显示日期部分-->
      <div class="title">
        <a id="left" href="#" ref="left" @click="left_click"><</a>
        <span id="now" ref="now">
          {{ now }}
          <br />
          民國：{{ now_year }}年
        </span>
        <a id="right" href="#" ref="right" @click="rigth_click">></a>
      </div>
      <div class=" select_hour" v-if="needSelectHour">
        時：
        <select
          name="hour"
          id=""
          :value="selec_hour"
          class="select_time"
          @change="changeTime($event, 'hour')"
        >
          <option :value="item" v-for="(item, index1) in 23" :key="index1">{{
            item
          }}</option>
        </select>
        分：
        <select
          name="minute"
          id=""
          :value="selec_minute"
          class="select_time"
          @change="changeTime($event, 'minute')"
        >
          <option :value="item" v-for="(item, index2) in 59" :key="index2">{{
            item
          }}</option>
        </select>
        秒：
        <select
          name="second"
          id=""
          :value="selec_second"
          class="select_time"
          @change="changeTime($event, 'second')"
        >
          <option :value="item" v-for="(item, index3) in 59" :key="index3">{{
            item
          }}</option>
        </select>
      </div>
      <div>
        <div class="week">一</div>
        <div class="week">二</div>
        <div class="week">三</div>
        <div class="week">四</div>
        <div class="week">五</div>
        <div class="week">六</div>
        <div class="week">日</div>
      </div>
      <div id="days" ref="days">
        <div
          class="day"
          :id="`day${item}`"
          v-for="(item, index) in 42"
          :key="index"
          ref="`day${item}"
          @click.stop="day_click(`day${item}`)"
          :class="{ active: chose == item }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    needSelectHour: {
      type: Boolean,
      required: false,
      default: false
    },
    calendar_date: {
      type: String,
      required: false
    },
    palceHolder: {
      type: String,
      required: false
    },
    value: {
      required: false
    }
  },
  data() {
    return {
      selec_hour: "",
      selec_minute: "",
      selec_second: "",
      time: "請選擇",
      calendar_show: false,
      chose: null,
      now: "五月",
      now_year: "109",
      thisYear: new Date().getFullYear() - 1911, //获取当前年份
      thisMonth: new Date().getMonth() + 1, //获取当前月份
      today: new Date().getDate(), //获取当前号数
      dayNum: this.today, //用于变更操作
      changeYear: new Date().getFullYear() - 1911,
      changeMonth: new Date().getMonth() + 1,
      changeDay: new Date().getDate(),
      monthLetter: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
      ]
    };
  },
  watch: {
    value: {
      handler: function(value) {
        let date = value;
        if (this.needSelectHour == true) {
          let hour =
            this.selec_hour < 10 ? `0${this.selec_hour}` : this.selec_hour;
          let minute =
            this.selec_minute < 10
              ? `0${this.selec_minute}`
              : this.selec_minute;
          let second =
            this.selec_second < 10
              ? `0${this.selec_second}`
              : this.selec_second;
          date = `${value} ${hour}:${minute}:${second}`;
        }
				let firstTime = undefined;
				if(value == undefined || value == ''){
					return
				}else{
					if(value.indexOf('/') > -1){
						 firstTime = value.split("/");
					}else{
						 firstTime = value.split("-");
					}  
				}				      
        if (firstTime) {
          if (firstTime[0].length < 4) {
            this.$nextTick(() => {
              this.time = value;
            });
          }
        }

        // this.$emit("update:value", date);
      },
      deep: true
    },
    calendar_date: {
      handler: function(value) {},
      deep: true
    }
  },

  methods: {
    changeTime(e, data) {
      let value = e.target.value;
      if (data == "hour") {
        this.selec_hour = value;
      } else if (data == "minute") {
        this.selec_minute = value;
      } else if (data == "second") {
        this.selec_second = value;
      }
    },
    show_date() {
      this.calendar_show = !this.calendar_show;
      this.printDays(this.changeYear, this.changeMonth);
    },
    day_click(e) {
      let element_id = document.getElementById(e);
      var clickDay = parseInt(element_id.innerHTML);
      if (this.changeYear > this.thisYear) {
        // console.log("this.changeYear > this.thisYear1");
        this.changeDay = clickDay;
      } else if (
        this.changeYear == this.thisYear &&
        this.changeMonth > this.thisMonth
      ) {
        // console.log("this.changeYear < this.thisYear2");
        this.changeDay = clickDay;
      } else if (
        this.changeYear == this.thisYear &&
        this.changeMonth == this.thisMonth &&
        clickDay >= this.today
      ) {
        // console.log("this.changeYear > this.thisYear3");
        this.changeDay = clickDay;
      }
      if (clickDay !== " ") {
        // console.log("clickDay+++++++", clickDay);
        this.calendar_show = false;
				let month = this.changeMonth < 10 ? `0${this.changeMonth}` : this.changeMonth;					
				clickDay = clickDay < 10 ? `0${clickDay}` : clickDay;
        let chose_day = `${parseInt(this.changeYear) + 1911}-${
          month
        }-${clickDay}`;

        if (this.needSelectHour == true) {					
          let hour =
            this.selec_hour < 10 ? `0${this.selec_hour}` : this.selec_hour;
          let minute =
            this.selec_minute < 10
              ? `0${this.selec_minute}`
              : this.selec_minute;
          let second =
            this.selec_second < 10
              ? `0${this.selec_second}`
              : this.selec_second;
          chose_day = `${chose_day} ${hour}:${minute}:${second}`;
          this.time = `${this.changeYear}-${month}-${clickDay} ${hour}:${minute}:${second}`;
        } else {
          this.time = `${this.changeYear}-${month}-${clickDay}`;
        }
        console.log(
          chose_day,
          "+++++++++++++++++++++++++++++",
          `${this.changeYear}-${this.changeMonth}-${clickDay}`
        );

        this.$emit("update:calendar_date", chose_day);
      } else {
        console.log("空");
      }
    },
    left_click() {
      this.refresh();
      if (this.changeMonth == 1) {
        this.changeYear--;
        this.changeMonth = 12;
      } else {
        this.changeMonth--;
      }
      this.changeDay = 0; //翻页的时候将选中的日期清空
      this.printDays(this.changeYear, this.changeMonth); //打印下一个月的日期
    },
    rigth_click() {
      this.refresh();
      if (this.changeMonth == 12) {
        this.changeYear++;
        this.changeMonth = 1;
      } else {
        this.changeMonth++;
      }
      this.changeDay = 0;
      this.printDays(this.changeYear, this.changeMonth);
    },
    refresh() {
      //刷新页面
      for (var i = 1; i <= 42; i++) {
        var Rday = document.getElementById("day" + i);
        Rday.innerHTML = " ";
      }
    },
    get_date() {
      var myDate = new Date(); //实例一个时间对象；
      this.selec_hour = myDate.getHours(); //获取系统时，
      this.selec_minute = myDate.getMinutes(); //分
      this.selec_second = myDate.getSeconds(); //秒
      console.log(this.selec_second, this.selec_minute, this.selec_hour);
    },
    printDays(year, month) {
      //显示当前月的信息
      // this.refresh();
      this.$nextTick(() => {
        var nowMonthStartDay = new Date(year, month - 1, 1).getDay(); //当前月第一天是周几
        // console.log(nowMonthStartDay, "nowMonthStartDay");
        if (nowMonthStartDay == 0) {
          nowMonthStartDay = 7;
        }
        var numberOfDaysInMonth = new Date(year, month, 0).getDate(); //当前月有多少天
        this.now = " ";
        this.now = this.monthLetter[month - 1]; //改变title的内容
        this.now_year = year;

        for (
          var i = 1, j = nowMonthStartDay;
          i <= numberOfDaysInMonth;
          i++, j++
        ) {
          //判断变色的日期
          var Day = document.getElementById("day" + j);
          // console.log(Day!==null, '')
          if (Day !== null) {
            Day.innerText = "" + i;
          }
        }
      });
    }
  },
  created() {},

  mounted() {
    setTimeout(() => {
      this.time = this.value;
      // let date = JSON.parse(JSON.stringify())
    }, 800);
    this.printDays(this.changeYear, this.changeMonth);
    if (this.needSelectHour == true) {
      this.get_date();
    }

    document.addEventListener("click", e => {
      if (!this.$el.contains(e.target)) {
        this.calendar_show = false; //点击其他区域关闭
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.calendar_box {
  position: relative;
}
.date_time {
  width: 120px;
  padding-left: 10px;
  color: #bfbfbf;
  height: 32px;
  line-height: 32px;
  background: #fff;
  border: 1px solid #d9d9d9 !important;
}

.active {
  background: #d31045 !important;
  color: #fff !important;
}

/* @import url(); 引入css类 */
* {
  margin: 0px;
  padding: 0px;
}

.calendar {
  z-index: 99;
  position: absolute;
  width: 350px;
  height: 330px;
  /* margin: 100px auto; */
  font-family: "微软雅黑";
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 60px;
  justify-content: space-between;
  background: #d31045;
  text-align: center;
}
.select_hour {
  background: #fff;
  padding: 10px;
}
.select_time {
  margin-right: 10px;
}

.title #left {
  width: 70px;
  height: 60px;
  color: #ffffff;
  text-decoration: none;
  margin-top: 0px;
  text-align: center;
  line-height: 60px;
}

.title #right {
  width: 70px;
  height: 60px;
  color: #ffffff;
  text-decoration: none;
  margin-top: 0px;
  text-align: center;
  line-height: 60px;
}

.title #left:hover {
  background-color: #d94045;
}

.title #right:hover {
  background-color: #d94045;
}

.title #now {
  margin-left: -20px;
  color: #ffffff;
}

.week {
  width: 50px;
  height: 30px;
  background-color: #dddddd;
  color: #888d91;
  float: left;
  text-align: center;
  line-height: 30px;
}

.day {
  width: 50px;
  height: 30px;
  background-color: #eeeeee;
  color: #8f8d99;
  float: left;
  text-align: center;
  line-height: 30px;
}
.day:hover {
  cursor: pointer;
  background: #fff;
}
</style>
