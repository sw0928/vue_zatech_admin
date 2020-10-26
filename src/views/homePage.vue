<template>
  <div>
    <div class="headerDiv">
      <div class="left">
        <img src="@/assets/logo1.png" alt="">
      </div>
      <div class="right">
        <div class="rightLeft">友邦人壽後台管理</div>
        <div class="rightRight">歡迎您，{{userInfo.realName}} <span class="line">|</span> <span class="loginOut" @click="loginOut">登出</span></div>
      </div>
    </div>
    <div class="contentDiv">
      <div class="left">
        <!-- {{openKeys}} -->
        <a-menu class='menu' mode="inline" :openKeys="openKeys" @openChange="onOpenChange">
          <a-sub-menu v-for='(item,index) in tabArr' :key="'key' + index">
            <span slot="title">{{item.title}}</span>
            <!-- {{item_s.url}} -->
            <a-menu-item @click.native="toView(item_s.url)" v-for='item_s in item.children' :key="item_s.url">{{item_s.title}}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
      <div class="right">
        <transition>
          <keep-alive include="completeInsure,inCompleteInsure,allInsure">
            <router-view></router-view>
          </keep-alive>

        </transition>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    name: "homePage",
    components: {},
    data() {
      return {
        userInfo: {},
        openKeys: [],
        userName: 'userName',
        tabArr: [{
            title: '系統管理',
            key: 'userManage1',
            children: [{
                title: '使用者管理',
                url: 'userManage'
              },
              {
                title: '角色管理',
                url: 'roleManage'
              },
              {
                title: '權限管理',
                url: 'powerManage'
              },
              {
                title: '選單管理',
                url: 'orderMange'
              },
							 {
							  title: '使用者記錄查詢',
							  url: 'userRecord'
							}
            ]
          },
          {
            title: '交易資料查詢',
            url: '6',
            children: [{
                url: 'allInsure',
                title: '所有投保紀錄查詢',
              },
              {
                url: 'inCompleteInsure',
                title: '未完成投保紀錄查詢',
              },
              {
                url: 'completeInsure',
                title: '已完成投保紀錄查詢',
              }
            ]
          },
          {
            title: '通路管理',
            url: '8',
            children: [{
                url: 'accessQuery',
                title: '通路查詢',
              },
              {
                url: 'accessCheck',
                title: '通路審核',
              }
            ]
          },
          {
            title: 'Media Code管理',
            url: '10',
            children: [{
                url: 'MediaCodeQuery',
                title: 'MediaCode查詢',
              },
              {
                url: 'MediaCodeCheck',
                title: 'MediaCode審核',
              }
            ]
          },
          {
            title: '廣告管理',
            url: '11',
            children: [{
                url: 'bannerManage',
                title: '廣告查询',
              },
							{
							    url: 'bannerExamine',
							    title: '廣告審核',
							  },
            ]
          },
					{
					  title: '行銷活動管理',
					  url: '12',
					  children: [{
					      url: 'activityManage',
					      title: '行銷活動查询',
					    },
							{
							    url: 'activityExamine',
							    title: '行銷活動審核',
							  },
					  ]
					},
					{
					  title: '邀請好友管理',
					  url: '13',
					  children: [{
					      url: 'friendManage',
					      title: '邀請好友查询',
					    },
							{
							    url: 'friendExamine',
							    title: '邀請好友审核',
							  },
					  ]
					},
					{
					  title: '友邦幫忙管理',
					  url: '14',
					  children: [{
					      url: 'helpManage',
					      title: '友邦幫忙查询',
					    },
							{
							    url: 'helpExamine',
							    title: '友邦幫忙审核',
							  },
					  ]
					},
          {
            title: '通路商品管理',
            url: '9',
            children: [{
                url: 'accessProductQuery',
                title: '通路商品查詢',
              },
              {
                url: 'saleProductQuery',
                title: '銷售商品設定管理',
              },
              {
                url: 'saleProductCheck',
                title: '銷售商品設定審核',
              },
            ]
          },
          {
            title: '會員資料管理',
            url: '7',
            children: [{
                url: 'infoChange',
                title: '會員資料查詢',
              },
							{
							    url: 'infoExamine',
							    title: '會員資料審核',
							  },
							{
							    url: 'otpRecord',
							    title: 'OTP記錄查詢',
							  },
							{
							    url: 'behaviorRecord',
							    title: '客戶行為記錄查詢',
							  }		
            ]
          },

        ],
        temporary_router:'',
      };
    },
    computed: {},
    methods: {
      toView(view) {
        console.log(view)
        this.temporary_router = view
        this.$router.push({
          name: view,
        });
      },
      loginOut() {
        this.Axios("loginout", {}).then(res => {
          this.$longData(2, 'userInfo')
          this.$longData(2, 'token')
          this.$router.push({
            name: 'loginIn',
          });
        })

      },
      onOpenChange(openKeys) {
        console.log(openKeys)
        // const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
        // let arr = this.tabArr.map(item => item.key);
        // if (arr.indexOf(latestOpenKey) === -1) {
        //   this.openKeys = openKeys
        // } else {
        //   this.openKeys = latestOpenKey ? [latestOpenKey] : []
        // }
        // let index = this.openKeys.indexOf(openKeys);
        // const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
        // if(index != -1){
        //   this.openKeys.splice(index,1)
        // }else{
        //   this.openKeys.push(openKeys)
        // }openKeys
        this.openKeys = openKeys
      },
      getMenuData(){
         this.Axios("getMenuList", {}).then(res => {
           //console.log(res, '999')
           // this.tabArr = res.data.data;
            this.openKeys = res.data.data.map((item,index) => `key${index}`)
        })

      }
    },
    created() {
      this.getMenuData()
      this.$store.dispatch('getGoodsList')

      this.userInfo = this.$longData('1', 'userInfo') || {
        realName: '--'
      }


    }
  };
</script>
<style lang="scss" scoped>
  $leftWidth: 180px;
  $headerHeight: 59px;

  /deep/ .ant-menu-submenu-title {
    padding-left: 14px !important;
  }

  /deep/ .ant-menu-item {
    padding-left: 24px !important;
    margin-bottom: 0 !important;
  }

  .menu {
    width: $leftWidth;
    height: 100%;
    overflow-x: hidden;
  }
  .loginOut{
    color: $primary-color;
    cursor: pointer
  }
  .headerDiv {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: $headerHeight;
    background: #fff;
    display: flex;

    z-index: 999;

    .left {
      width: $leftWidth;

      background: #f3f3f3;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      font-weight: bold;
      color: #d81f49;
      background: $primary-color;

      img {
        width: 120px;
        // height: 100%;
      }
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;

      padding: 0 20px;
      padding-right: 40px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      .rightLeft {
        font-size: 18px;
        letter-spacing: 2px;
        color:#5f5f5f;
      }

      .line {
        display: inline-block;
        margin-left: 20px;
        margin-right: 6px;
      }
    }
  }

  .contentDiv {
    // min-width: 1280px;
    // margin-top: $headerHeight;
    position: absolute;
    width: 100%;
    top: 59px;
    left: 0;
    height: calc(100% - 59px);
    display: flex;
    box-sizing: border-box;
    background: #f3f3f3;

    .left {
      width: $leftWidth;
      background: #fff;
      height: calc(100%);
      box-shadow: 3px 0px 6px rgba(0, 0, 0, 0.16);

    }

    .right {
      flex: 1;
      margin: 10px;
      margin-right: 0;
      height: calc(100% - 20px);
      box-sizing: border-box;
      overflow: auto;
    }
  }
</style>
