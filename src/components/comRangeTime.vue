<template>
	<span style="display: flex;">
  <!-- <a-range-picker v-model='valueTime' :disabled='disabled' :defaultPickerValue="defaultValue" :ranges="ranges" format="YYYY-MM-DD" :picker-options="options" @change="changeValueTime"
	:placeholder="['开始时间','结束时间']" class="modelInput"></a-range-picker> -->
<!--  {{valueTime}}
  {{value}} -->
	
  <comTime :isRange='true' :selectHour="selectHour" :value.sync="valueTime.start"  grey="開始時間"></comTime>
  <div style="margin-left: 10px;" class="alignCenter">-</div>
  <div style="margin-right: 10px;" class="alignCenter">-</div>
  <comTime :isRange='true' :selectHour="selectHour" :value.sync="valueTime.end" grey="結束時間"></comTime>
	</span>
</template>
<script>
  import moment from 'moment'
  import comTime from './comTime1'
	export default {
		name: "comHeader",
    components:{
      comTime
    },
		props: {
			disabled: {
				required: false
			},
			selectHour: {
			  type: Boolean,
			  required: false,
			  default: false
			},
      value: {
				required: false

      }
		},
    watch: {
    			value: {
    				handler: function(value) {
               // console.log(value,'val==')
								

    					if(!value){
                this.valueTime.start = ''
                this.valueTime.end = ''
					
              }
									
							 this.valueTime.start = JSON.parse(value).start
							this.valueTime.end = JSON.parse(value).end
    				},
    				deep: true,
    				immediate: true
    			},
          valueTime: {
    				handler: function(value) {
    					//console.log(value.end,value.start)
						//console.log(value,'val')

              if(value.end && value.start){
                if(+ new Date(value.end) - +new Date(value.start) < 0){
                  this.$message.error('結束時間大於開始時間')
                 this.valueTime.start = ''
                 this.valueTime.end = ''
                  this.$emit('update:value','')
                  return
                }
                this.$emit('update:value',value.start + ',' + value.end)
              }
    				},
    				deep: true,
    				immediate: true
    			}
    		},
		data() {
			return {
        valueTime: {
          start: '',
          end: '',
        },
        defaultValue:[moment().subtract(1911, "years"), moment().subtract(1911, "years")],
        options: {

        },
        ranges: {
        	'今天': [moment().subtract(1911, "years"), moment().subtract(1911, "years")],
        	'近一月': [moment().subtract(1, 'months').subtract(1911, "years"), moment().subtract(1911, "years")],
        	'近俩月': [moment().subtract(2, 'months').subtract(1911, "years"), moment().subtract(1911, "years")],
        	'近三月': [moment().subtract(3, 'months').subtract(1911, "years"), moment().subtract(1911, "years")]
        },
      };
		},
		methods: {
      mingguoValue(value){
        try{
          if (value.length == 0) return ''
          let stringEnd = value.substring(4)
          let stringStart = value.substring(0, 4)
          stringStart = +stringStart + 1911
          return stringStart + stringEnd
        }catch(e){
          //TODO handle the exception
          return ''
        }

      },
      changeValueTime(dates, dateStrings) {
      	let date = this.mingguoValue(dateStrings[0]) + ',' + this.mingguoValue(dateStrings[1])
        this.$emit('update:value',date)
      	// this.valueTime = dateString;
      }
    },
    created(){
      //console.log('111111111111111')
    },
		mounted(){
						
			// 
					 this.valueTime.start = this.value.start
					this.valueTime.end = this.value.end
		}
	};
</script>
<style lang="scss" scoped>
.modelInput{
    // min-width: 240px;
  }
  .alignCenter{
    display: flex;
    justify-content: center;
    align-items: center
  }
</style>
