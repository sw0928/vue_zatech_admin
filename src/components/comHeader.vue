<template>
	<div class="topHeader">
		<div class="left">
			<a-breadcrumb :routes="routes">
				<template slot="itemRender" slot-scope="{route, params, routes, paths}">
					<span v-if="routes.indexOf(route) === routes.length - 1">
						{{route.breadcrumbName}}
					</span>
					<router-link v-else :to="paths.join('/')">
						{{route.breadcrumbName}}
					</router-link>
					<div  class='thisTitle' v-if="routes.indexOf(route) === routes.length - 1">{{route.breadcrumbName}}</div>
				</template>
			</a-breadcrumb>
		</div>

		<div class="right" v-if="primaryButton">
			<!-- <a-button @click="subOne()">副按钮1</a-button>
      <a-button @click="subTwo()">副按钮2</a-button> -->
			<a-button class="primary" type="primary" @click="primary()">{{primaryButton}}</a-button>
		</div>
		<!-- <div class="marginBottom"></div> -->
	</div>
</template>
<script>
	export default {
		name: "comHeader",
		props: {
			routes: {
				// 头部标题路由
				type: Array
				// required: true
			},
			primaryButton: {
				// 主按钮功能
				type: String,
				required: true
			},
			isApiBtn: {
				type: Boolean,
				required: false,
				default: true
			}
		},
		data() {
			// const { lang } = this.$route.params;
			return {
				// basePath: `/${lang}/components`,
				// routes: [{
				//   path: 'Home',
				//   breadcrumbName: '首页'
				// }, {
				//   path: 'MenuContent',
				//   breadcrumbName: '险种列表'
				// }, {
				//   path: 'ProductAdd',
				//   breadcrumbName: '新增险种'
				// }],
			};
		},
		methods: {
			subOne() {
				this.$message.info("This is 副按钮1");
			},
			subTwo() {
				this.$message.info("This is 副按钮2");
			},
			primary() {
				// this.$message.info("This is 主按钮");
				this.$emit("primary");
			}
		}
	};
</script>
<style lang="scss" scoped>
	/deep/ .ant-breadcrumb{
		font-size: 12px;
	}
	.topHeader {
		/* width: 100%; */
		height: 60px;
		border: 1px solid #d8dadc;
		background-color: #ffffff;
		// background-color: red;
		/* margin: 20px 16px 0px 16px; */
		box-sizing: border-box;
		padding: 0 18px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.topHeader .left {
		color: #777777;
		// font-weight: bold;
		font-size: 12px !important;
		float: left;
	}

	.topHeader .left>div {
		// line-height: 60px;
		// padding-top: 9px;

	}

	.topHeader .left .first {
		color: $primary-color;
	}
	.thisTitle{
		font-weight: bold;
		font-size: 14px;
		color: #000000;
		margin-top: 2px;
	}
	/* .topHeader .left .next{
  color: @button-color;
} */

	.topHeader .right button {
		padding-left: 15px;
		padding-right: 15px;
		margin-left: 12px;
	}

	.topHeader .right .primary {
		background-color: $primary-color;
	}

	.topHeader .marginBottom {
		width: calc(100% + 46px);
		height: 10px;
		background-color: #ebf0f3;
		float: left;
		margin-left: -23px;
		margin-top: -1px;
	}
</style>
