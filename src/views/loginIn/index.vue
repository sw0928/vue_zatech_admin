<template>
	<div >
		<div class="thisContent">
			<div id="header">
				<div class="left headerleft-l" style="width: 100%;display: flex;">
					<span class="left border-right-l" style="padding-right: 20px;font-weight: normal;">
						<!-- <img width="120" src="./img/logo.png" /> -->
						<!-- 友邦人壽 -->
            <img style="width: 120px;" src="../../assets/logo1.png" alt="">

					</span>
					<span class="left" style="padding-left: 33%;font-size: 20px;font-weight: normal;min-width: 60%;box-sizing: border-box;">
						網絡投保後台管理系統
						</span>
					</div>
			</div>
			<div class="bigbox-l1">
				<div id="login" class="left" >
          <!-- <span style="display: inline-block;padding: 4px;">
            <img style="width: 200px;" src="../../assets/logo.png" alt="">
          </span> -->

					<div style="padding-top: 40px;">
						<!-- <div style="height: 30px;margin-bottom: 5px;font-size: 14px;line-height: 20px;">
							用户名<span class="Englishname-l">Username</span><i v-show='show0' class="jinggao-l tip1">请输入账號</i>
						</div> -->
						<div class="border-bottom-l">
							<span style="position: relative;display: inline-block;height: 42px;border: 1px solid #e5e5e5;">
                <input @blur='blur(0)' v-model='userInfo.loginName' type="text" placeholder="請填寫帳號" id="a" maxlength="20"></a-input>
                <img class="thisIMg" style="width: 20px;" src="../../assets/img/people.png" alt="">
              </span>
            </div>
					</div>
					<div style="margin-bottom: 40px;margin-top: 20px;font-size: 14px;">
						<!-- <div style="height: 30px;margin-bottom: 5px;">
							密&nbsp;&nbsp;&nbsp;码<span class="Englishname-l">Password</span><i v-show='show1' class="jinggao-l tip2">请输入密码</i>
						</div> -->
						<div class="border-bottom-l">
							<span style="position: relative;display: inline-block;height: 42px;border: 1px solid #e5e5e5;">
                <input @blur='blur(1)' type="text" onfocus="this.type='password'" maxlength="50" v-model='userInfo.password'  @keydown.enter='enterToLogin' placeholder="請填寫密碼" id="password"></a-input>
                <img class="thisIMg" style="width: 20px;" src="../../assets/img/suo.png" alt="">
              </span>
            </div>
					</div>
					<div class="btnDiv">
						<a-button @click='login'  id="button-l" >登入</a-button>
						<!-- <input type="button" value="" > -->
						<!-- <a href="#" class="forget-l">忘记密碼?</a> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "login",
		components: {
		},
		watch: {
		},
		data() {
			return {
				userInfo: {
					loginName: '', //用户名
					password: '', //密碼
				},
				show1: false,
				show0: false,
				obj: {
					0: {
						key: 'loginName',
						name: '帳號'
					},
					1: {
						key: 'password',
						name: '密碼'
					},

				}
			};
		},
		methods: {
			blur(index){
				let {key,name} = this.obj[index];
				if(!this.userInfo[key]){
					// this.$message.error(`请填写${name}`)
					this[`show${index}`]= true
				}else{
					this[`show${index}`]= false
				}
			},
			enterToLogin(){
				this.login()
			},
			login(){
				let self = this;
				for(let i=0;i<2;i++){
					let {key,name} = this.obj[i];
					if(!this.userInfo[key]){
						this.$message.error(`請填寫${name}`)
						this[`show${i}`]= true

						return
					}else{
						this[`show${i}`]= false
					}
				}

				let tep = this.userInfo;
				this.Axios("loginServicelogin", tep).then(res => {
					// conosle.log(res.data.data[0].token);
          this.$store.commit('setUserInfo',res.data.data.userInfo)
					localStorage.setItem('token',res.data.data.token);
					self.$router.replace({
						name: 'welcome',
					});
				});
			}

		},
		created() {
		}
	};
</script>
<style lang="scss" scoped>

	@import "./index.scss";
</style>
