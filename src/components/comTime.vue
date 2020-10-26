<template>
	<span @touchmove.prevent class="dad">

  <a-date-picker  @click.native.stop v-model='valueTime' :defaultValue="defaultValue" :disabled='disabled' :defaultPickerValue="defaultValue" format="YYYY-MM-DD" :picker-options="options" @change="changeValueTime"
	placeholder="請選擇" class="modelInput Specail">
  </a-date-picker>

	</span>
</template>
<script>
  import moment from 'moment'
	export default {
		name: "comHeader",
		props: {
			disabled: {
				required: false
			},
      value: {
      }
		},
    watch: {
    			value: {
    				handler: function(value) {
    					if(!value){
                this.valueTime = ''
              }else{
                console.error(this.mingguoValue(this.value,2))
                this.valueTime = moment(this.mingguoValue(this.value,2),'YYYY-MM-DD')
              }
    				},
    				deep: true,
    				immediate: true
    			}
    		},
		data() {
			return {
        valueTime: '',
        defaultValue: moment().subtract(1911, "years"),
        options: {

        },
      };
		},
		methods: {
      mingguoValue(value,type = 1){
        try{
          let count = type == 1 ? 1911 : -1911;
          if (value.length == 0) return ''
          let stringEnd = value.substring(4)
          let stringStart = value.substring(0, 4)
          stringStart = +stringStart + count
          if(type == 2){
            let obj = {
              1: '000',
              2: '00',
              3: '0'
            }
            let length = stringStart.toString().length;
            stringStart = obj[length] + stringStart
          }

          return stringStart + stringEnd
        }catch(e){
          //TODO handle the exception
          return ''
        }

      },
      changeValueTime(dates, dateStrings) {
      	let date = this.mingguoValue(dateStrings)
        this.$emit('update:value',date)
      	// this.valueTime = dateString;
      }
    },
    created(){
      // this.defaultValue = moment(this.mingguoValue(this.value,2))
      // this.defaultValue = moment(this.mingguoValue(this.value,2))




    }
	};
</script>
<style lang="scss" scoped>

 /deep/ .ant-calendar-picker-container{
   /deep/ .ant-calendar-footer{
     display: none
   }
  }
  .modelInput{
    min-width: 200px;
  }
</style>
