<template>
	<div>
    中转页面
  </div>
</template>
<script>
	export default {
		name: "white",
		components: {
		},
		watch: {},
		data () {
		  return {}
		},
		methods: {},
		created() {
      console.log(this.$route.query.token);
      let ssoToken = this.$route.query.token;
      // localStorage.setItem('Authorization',ssoToken);
      if(!ssoToken){
        alert('ssoToken为空')
        return
      }
      let tep = {
      		token: ssoToken
      };
      this.Axios("ssoToken", tep,2).then(res => {
        console.log(res)
        // this.
        localStorage.setItem('token',res.data.data[0].token);
        this.$store.commit('setUserInfo',res.data.data[0])
        this.$router.replace({
        	name: 'productList',
        });
      });
    },
	};
</script>
<style lang="scss" scoped>
	@import "./index.scss";
</style>
