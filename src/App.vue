<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>

    </div>
   </a-locale-provider>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
export default {
  name: "App",
  data() {
    return {
      locale:zh_CN
    };
  },
  mounted() {

  }
};
</script>

<style lang="scss">
  .ant-table td { white-space: nowrap;}
.ant-calendar-picker-container{
 /deep/ .ant-calendar-footer{
    display: none
  }
  /deep/ .ant-calendar-range-bottom{
    display: block
  }

}
#app {
  // font-family: Microsoft YaHei UI;
  font-family: Microsoft JhengHei !important;

  // background-color: #ebf0f3;
  width: 100%;
  height: 100%;
  overflow: hidden;

}
.ant-table-thead > tr > th{
	color: #09346e;
	font-weight: 600;
}
.copy .ant-modal-body{
	padding: 0 !important;
}


* {
    outline: none;
    // font-family: Microsoft YaHei UI;
  font-family: Microsoft JhengHei !important;

    
}

body{
    margin: 0;
    padding: 0;
}

ul, ol, li {
    margin: 0px;
    padding: 0px;
    list-style: none;
}

a {
    text-decoration: none;
}

img {
    border: none;
}

p {
    margin: 0;
    padding: 0;
}

</style>
