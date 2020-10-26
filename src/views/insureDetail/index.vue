<template>
  <div>
    <div class="detailTitle">
      <span class="">投保內容</span>
    </div>
    <div class="someSubDiv">
      <span class="someSubTitle">要(被)保人資訊</span>
    </div>
    <div class="someTableDiv">
      <table class="someTable">
        <tr class="comTr">
          <td class="title1">姓名</td>
          <td class="content1">{{applicatDTO.name}}</td>
          <td class="title1">身分證字號</td>
          <td class="content1">{{applicatDTO.idNo}}</td>
          <td class="title1">性別</td>
          <td class="content1">{{applicatDTO.sex}}</td>
        </tr>
        <tr class="comTr">
          <td class="title1">生日</td>
          <td class="content1">{{applicatDTO.birthdayStr}}</td>
          <td class="title1">投保年齡</td>
          <td class="content1">{{applicatDTO.age}}</td>
          <td class="title1"></td>
          <td class="content1"></td>
        </tr>
        <tr class="comTr">
          <td class="title1">工作内容</td>
          <td class="content1">{{applicatDTO.jobName}}</td>
          <td class="title1">兼職内容</td>
          <td class="content1">{{applicatDTO.sidelineJobName}}</td>
          <td class="title1">職業類型</td>
          <td class="content1">{{applicatDTO.jobGrade}}</td>
        </tr>
        <tr class="comTr">
          <td class="title1">個人年收入(元)</td>
          <!-- <td class="content1">{{format(applicatDTO.personalIncome * 10000)}}</td> -->
          <td class="content1">{{format(applicatDTO.personalIncome)}}</td>
          <td class="title1">家庭年收入(元)</td>
          <!-- <td class="content1">{{format(applicatDTO.familyIncome * 10000)}}</td> -->
          <td class="content1">{{format(applicatDTO.familyIncome)}}</td>
          <td class="title1">個人資產總額(元)</td>
          <!-- <td class="content1">{{format(applicatDTO.personalAsset * 10000)}}</td> -->
          <td class="content1">{{format(applicatDTO.personalAsset)}}</td>
        </tr>
        <tr class="comTr">
          <td class="title1">身高(cm)</td>
          <td class="content1">{{applicatDTO.height}}</td>
          <td class="title1">體重(kg)</td>
          <td class="content1">{{applicatDTO.weight}}</td>
          <td class="title1"></td>
          <td class="content1"></td>
        </tr>
        <tr class="comTr">
          <td class="title1">手機</td>
          <td class="content1">{{applicatDTO.cellPhone}}</td>
          <td class="title1">E-mail</td>
          <td class="content1">{{applicatDTO.email}}</td>
          <td class="title1">住所電話</td>
          <td class="content1">{{applicatDTO.homePhone}}</td>
        </tr>
        <tr class="comTr">
          <td class="title1">聯絡(住所)地址</td>
          <td colspan="5" class="content1">{{applicatDTO.address}}</td>
        </tr>
      </table>
    </div>
    <div :key="index" v-for="(item,index) in tabledata.benefitDTOS">
      <div class="someSubDiv">
        <span class="someSubTitle">受益人({{index + 1}})資訊</span>
      </div>
      <div class="someTableDiv">
        <table class="someTable">
          <tr class="comTr">
            <td class="title1">受益人類型</td>
            <td class="content1">身故保險金受益人</td>
            <td class="title1">法定/指定</td>
            <td class="content1">{{item.beneficiaryTypeStr}}</td>
            <td class="title1">分配方式</td>
            <td class="content1">{{item.allocationStr}}</td>
          </tr>
          <tr class="comTr">
            <td class="title1">與被保險人關係 </td>
            <td class="content1">{{item.relationToInsuredStr}}</td>
            <td class="title1">姓名</td>
            <!-- <td class="content1">{{item.name}}</td> -->
            <!-- <td class="content1">{{item.beneficiaryType}}</td> -->
            <td class="content1">{{item.relationToInsured=='04'?'法定繼承人':item.name}}</td>
            <td class="title1">身分證字號</td>
            <td class="content1">{{item.idNo}}</td>
          </tr>
          <tr class="comTr">
            <td class="title1">生日</td>
            <td class="content1">{{item.birthdayStr}}</td>
            <td class="title1">{{item.allocation == 1 ? '順位' : '比例'}}</td>
            <td class="content1">{{item.allocation == 1 ? item.benefitsSort : `${item.benefitsRate}%`}}</td>
            <td class="title1">國籍</td>
            <td class="content1">{{item.relationToInsuredStr != '法定繼承人' ? item.nationalityName : ''}}</td>
            
          </tr>
          <tr class="comTr">
            <td class="title1">住所電話</td>
            <td class="content1">{{item.homePhone}}</td>
            <td class="title1">聯絡地址</td>
            <td colspan="5" class="content1">{{item.address}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="someSubDiv">
      <span class="someSubTitle">告知事項</span>
    </div>
    <div class="someTableDiv">
      <table class="someTable">
        <tr :key="index" v-for="(item,index) in tabledata.informs" class="comTr">
          <td v-html="item.question" class="title1"></td>
          <td class="content1">{{item.value}}</td>
        </tr>
      </table>
    </div>
    <div class="someSubDiv">
      <span class="someSubTitle">其他問項</span>
    </div>
    <div class="someTableDiv">
      <table class="someTable">
       <tr :key="index" v-for="(item,index) in tabledata.others" class="comTr">
         <td v-html="item.question" class="title1"></td>
         <td class="content1">{{item.value}}</td>
       </tr>
      </table>
    </div>
    <div class="someSubDiv">
      <span class="someSubTitle">聲明文件</span>
    </div>
    <div class="someTableDiv">

      <table class="someTable thisTablle">
        <tr>
          <th>聲明文件</th>
          <th>閱讀並簽署時間</th>
        </tr>
        <tr :key="index" v-for="(item,index) in tabledata.files" class="comTr">
          <td class="title1">{{item.name}}</td>
          <td class="content1">{{item.agreeTimeStr}}</td>
        </tr>
      </table>
    </div>
    <div class="someSubDiv">
      <span class="someSubTitle">投保內容</span>
    </div>
    <div class="someTableDiv">
      <table class="someTable">
        <tr class="comTr">
          <td class="title1">商品名稱</td>
          <td class="content1">{{tabledata.goodsName}}</td>
          <td class="title1">保單生效日</td>
          <td class="content1">{{tabledata.effectiveDateStr}}</td>
          <td class="title1">保單號碼</td>
          <td class="content1">{{tabledata.policyNo}}</td>
        </tr>
        <tr class="comTr">
          <td class="title1">繳别 </td>
          <td class="content1">{{tabledata.payFlag}}</td>
          <td class="title1">繳費年期</td>
          <td class="content1">{{tabledata.payYear}}</td>
          <td class="title1">保費(元)</td>
          <td class="content1">{{tabledata.premiumStr}}</td>
        </tr>
        <tr class="comTr">
          <td class="title1">保險金額(元)</td>
          <td class="content1">{{tabledata.sumAmountStr}}</td>
          <td class="title1">保險年期</td>
          <td class="content1">{{tabledata.insureYear}}</td>
          <td class="title1"></td>
          <td class="content1"></td>
        </tr>
      </table>
    </div>
    <div class="someSubDiv">
      <span class="someSubTitle">繳費資料</span>
    </div>
    <div class="someTableDiv">
      <table class="someTable">
        <tr class="comTr">
          <td class="title1">首期繳費方式</td>
          <td class="content1">{{tabledata.payMethodStr}}</td>
          <td class="title1">信用卡號</td>
          <td class="content1">{{codeHidden('bankCard',tabledata.bankNo)}}</td>
          <td class="title1">保費</td>
          <td class="content1">{{tabledata.premiumStr}}</td>
        </tr>
        <tr class="comTr">
          <td class="title1">有效期間</td>
          <td class="content1">{{tabledata.validityPeriod}}</td>
          <td class="title1">聲明文件</td>
          <td class="content1">{{tabledata.fileName}}</td>
          <td class="title1">閱讀並簽署時間 </td>
          <td class="content1">{{tabledata.agreeTime}}</td>
        </tr>
      </table>
    </div>
    <div class="someSubDiv">
      <span class="someSubTitle">續期保費</span>
    </div>
    <div class="someTableDiv">
      <table class="someTable">
        <tr class="comTr">
          <td class="title1">繳費方式</td>
          <td class="content1">{{tabledata.renewalWayStr}}</td>
        </tr>
        <!-- <div>繳費方式</div> -->
      </table>
    </div>
		<div class="someSubDiv">
		  <span class="someSubTitle">推薦人資訊</span>
		</div>
		<div class="someTableDiv">
		  <table class="someTable">
		    <tr class="comTr">
		      <td class="title1">推薦人會員編號</td>
		      <td class="content1">{{tabledata.renewalWayStr}}</td>
		    </tr>
		    <!-- <div>繳費方式</div> -->
		  </table>
		</div>
		<div class="someSubDiv">
		  <span class="someSubTitle">投保通路</span>
		</div>
		<div class="someTableDiv">
		  <table class="someTable">
		    <tr class="comTr">
		      <td class="title1">通路名稱</td>
		      <td class="content1">{{channelMgnDTO.channelName}}</td>
		      <td class="title1">通路代碼</td>
		      <td class="content1">{{channelMgnDTO.channelCode}}</td>
		      <td class="title1">Media Code</td>
		      <td class="content1">{{channelMgnDTO.mediaCode}}</td>
		    </tr>
		    <tr class="comTr">
		      <td class="title1">Agent Code</td>
		      <td class="content1">{{channelMgnDTO.agentCode}}</td>
		      <td class="title1">Campaign Code</td>
		      <td class="content1"></td>
		      <td class="title1">保單資料回傳同意書 timestamp </td>
		      <td class="content1"></td>
		    </tr>
		  </table>
		</div>
		<div class="someSubDiv">
		  <span class="someSubTitle">OTP記錄</span>
		</div>
		<div class="someTableDiv">
		  <table class="someTable">
		    <tr class="comTr">
		      <td class="title1">發送時間</td>
		      <td class="content1"></td>
		      <td class="title1">驗證時間</td>
		      <td class="content1">{{tabledata.effectiveDateStr}}</td>
		      <td class="title1">訂單編號</td>
		      <td class="content1"></td>
		    </tr>
		  </table>
		</div>
    <div class="someTableDiv">
     <button class="btn" @click="back">返回</button>
    </div>

  </div>
</template>
<script>
  import {codeHidden} from '@/common/common.js'
  export default {
    name: "insureDetail",
    components: {},
    watch: {},
    data() {
      return {
        applicatDTO: {},
				channelMgnDTO:{},
        tabledata: {
          name0: '--',
        },
      };
    },
 watch:{
        $route:{
            handler(to,from){
            let name = 'getOrderDetail'
            let orderNo = to.query.orderNo
            //下一班發佈
            if(to.query.menu!==undefined) {
             name = 'getOrderDetailOver'
            }
              this.getData(orderNo,name)
            },
            immediate: true,
            deep: true
        }
    },

    methods: {
      back() {
        history.go(-1)
      },
      codeHidden(type,value){
        return codeHidden(type,value)
      },
      format(value){
        value = value + '';
        let num = value-1
        console.log(isNaN(num))
        if(isNaN(num)) {
          console.log(value)
          if(value=='null') {
            return ''
          }else {
          return  value
          }
        }else {
        value = value*10000
        value = value + '';
        let time = parseInt(value.length/3);
        // console.error(time)
        if(time > 0 ){
          for (var i = 0; i < time; i++) {

              let index = value.indexOf(',');
              if(index != -1){
                value =  value.substring(0,index - 3) + ',' + value.substring(index - 3)
              }else{
                value =  value.substring(0,value.length - 3) + ',' + value.substring(value.length - 3)
              }
              // console.error(value)

          }
          // value = value.substring(1)
          if(value[0] == ','){
            value = value.substring(1)
          }
        }


        return value
        }

      },
      getData(orderNo,name){
        let tepData = {
          orderNo: orderNo
        };
        // this.Axios('getOrderDetail',tepData)
        this.Axios(name,tepData)
        .then(res => {
          this.applicatDTO = res.data.data.applicatDTO;
					this.channelMgnDTO = res.data.data.channelMgnDTO;
          this.tabledata = res.data.data;
        })
      }
    },
    created() {
      // let orderNo = this.$route.query.orderNo
      // // let orderNo = 'W100000623'
      //   this.$route
      //   console.log(this.$route)


      // this.getData(orderNo,'getOrderDetail')
    },
    activated() {}
  };
</script>
<style lang="scss" scoped>
  @import "./index.scss";
</style>
