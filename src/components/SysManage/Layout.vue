<template>
	<div class="layout">
		<div class="info-box">
			<div class="info-box-title">
				<span style="margin-right: 3px">
					<slot name="title" />
				</span>
				<slot name="icon" />
			</div>
			<slot name="content" />
		</div>
		<div class="info-box-big">
			<div :class="[{isBorder: isShow === 1},{isPoint: isPlural}]" class="info-box-title" @click="changeIsShow(1)">
				<span>
					<slot name="big-title" />
				</span>
				<slot name="big-icon" />
			</div>
			<slot v-if="isShow === 1" name="big-content" class="big-content" />
			<div v-if="isPlural">
				<div :class="[{isBorder: isShow === 2},{isPoint: isPlural}]" class="info-box-title2" @click="changeIsShow(2)">
					<span>
						<slot name="big-title2" />
					</span>
					<slot name="big-icon2" />
				</div>
				<slot v-if="isShow === 2" name="big-content2" class="big-content" />
			</div>
		</div>
		<div v-if="showBtn" class="info-button-bar">
			<el-button size="small" type="primary" @click="handleSave">保存</el-button>
			<el-button size="small" type="info" style="margin-left: 15px" @click="clearSave">取消</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Layout',
	props: {
		isPlural: {
			default: false,
			type: Boolean
		},
		showBtn: {
			default: false,
			type: Boolean
		}
	},
	data() {
		return {
			isShow: 1
		}
	},
	methods: {
		// 改变显示的tab
		changeIsShow(val) {
			this.isShow = val
			this.$emit('isShow', val)
		},
		// 保存设置
		handleSave() {
			this.$emit('saveBtn')
		},
		// 取消设置
		clearSave() {
			this.$emit('clearBtn')
		}
	}
}
</script>

<style scoped lang="scss">
.layout {
	position: relative;
	width: 100%;
	display: flex;
	margin-top: 40px;
	height: calc(78vh);
	font-size: 14px;
	.info-box {
		position: relative;
		padding-top: 26px;
		height: 100%;
		width: 16.7%;
		border: 1px solid #959595;
		border-right: none;
		.info-box-title {
			position: absolute;
			left: -1px;
			top: -37px;
			width: 120px;
			height: 37px;
			border: 1px solid #959595;
			border-bottom: 1px solid #fff;
			line-height: 37px;
			text-align: center;
			font-size: 14px;
			color: #202020;
		}
	}
	.info-box-big {
		width: 83.3%;
		position: relative;
		padding: 26px 27px 0 26px;
		height: 100%;
		border: 1px solid #959595;
		.info-box-title {
			position: absolute;
			left: -1px;
			top: -37px;
			width: 120px;
			height: 37px;
			border: 1px solid #959595;
			line-height: 37px;
			text-align: center;
			font-size: 14px;
			color: #202020;
		}
		.info-box-title2 {
			position: absolute;
			left: 118px;
			top: -37px;
			width: 120px;
			height: 37px;
			border: 1px solid #959595;
			line-height: 37px;
			text-align: center;
			font-size: 14px;
			color: #202020;
		}
		.isBorder {
			border-bottom: 1px solid #fff;
		}
		.isPoint {
			cursor: pointer;
		}
		.big-content {
			height: 100%;
		}
	}
	.info-button-bar {
		position: absolute;
		top: -31px;
		right: 0;
	}
}
</style>
