<template>
	<el-scrollbar wrap-class="scrollbar-wrapper">
		<el-menu :show-timeout="200" :default-active="$route.path" mode="vertical" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
			<router-link to="/home/platform" style="margin-bottom: 25px">
				<el-menu-item index="s1">
					<span slot="title" class="title">双流地震应急指挥平台</span>
				</el-menu-item>
			</router-link>
			<sidebar-item v-for="(route, index) in permission_routers" :key="index" :item="route" :base-path="route.path" />
			<!--封装的关于弹出框-->
			<!--<el-menu-item index="s1" @click="showAbout = true">-->
			<!--<svg class="icon about" aria-hidden="true">-->
			<!--<use xlink:href="#icon-guanyu"/>-->
			<!--</svg>-->
			<!--<span>关于</span>-->
			<!--</el-menu-item>-->
			<!--<div v-show="showAbout" class="about-content">-->
			<!--<svg class="icon about-close" aria-hidden="true" @click="showAbout = false">-->
			<!--<use xlink:href="#icon-close_icon"/>-->
			<!--</svg>-->
			<!--<div>-->
			<!--&lt;!&ndash;eslint-disable-next-line&ndash;&gt;-->
			<!--<img src="../../../../assets/image/about-logo.png"/>-->
			<!--<span>2018.12.10版本</span>-->
			<!--</div>-->
			<!--<p>©2018-2019 Rex Incorporated. All rights reserved.</p>-->
			<!--<p>技术支持：四川雷克斯智慧科技股份有限公司</p>-->
			<!--<p>售后网址：<a href="http://www.screx.com.cn" style="width: auto">http://www.screx.com.cn</a></p>-->
			<!--<p>售后联系人：邓胡非</p>-->
			<!--<p>售后电话：12545689654</p>-->
			<!--</div>-->
		</el-menu>
	</el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
	components: { SidebarItem },
	data() {
		return {
			showAbout: false
		}
	},
	computed: {
		...mapGetters(['permission_routers', 'sidebar']),
		routes() {
			return this.$router.options.routes
		},
		isCollapse() {
			return !this.sidebar.opened
		}
	},
	mounted() {
		// console.log(this.permission_routers)
	}
}
</script>

<style scoped lang="scss">
.title {
	font-weight: bold;
	font-size: 19px;
	color: #f4f4f5;
}
.about {
	margin-right: 16px;
}
.about-content {
	position: fixed;
	left: 50%;
	top: 35%;
	transform: translateX(-50%);
	width: 400px;
	height: 310px;
	padding: 32px 35px 44px 42px;
	background: #fff;
	border-radius: 4px;
	box-shadow: 0px 0px 10px #202020;
	font-size: 15px;
	color: #202020;
}
.about-close {
	position: absolute;
	top: 10px;
	right: 10px;
	width: 15px;
	height: 15px;
	color: #303133;
	cursor: pointer;
}
</style>
