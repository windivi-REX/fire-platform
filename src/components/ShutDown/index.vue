<template>
	<div>
		<div class="container">
			<div style="flex:1"></div>
			<el-button
				:circle="true"
				icon="el-icon-minus"
				type="danger"
				class="shut-down-btn"
				@click="shutDownValidate($event)"
			></el-button>
			<div style="flex-basis:1.5rem"></div>
		</div>
		<div
			:hidden="!keyboardVisible"
			class="keyboard-container"
		>
			<div
				v-if="keyboardVisible"
				class="modal-bg"
				@click="handleClickOutside"
			/>
			<div
				v-if="keyboardVisible"
				class="keyboard-wrapper"
			>
				<el-input
					ref="inputDisplay"
					v-model="password"
					:clearable="true"
					:autocomplete="'off'"
					:auto-complete="'off'"
					class="keyboard-display-panel"
					type="password"
					placeholder="请键入相应的终止程序密钥"
					data-layout="numeric"
					@focus="show"
				></el-input>
				<vue-touch-keyboard
					ref="keyboard"
					:options="options"
					:layout="layout"
					:cancel="hide"
					:next="next"
					:accept="accept"
					:input="input"
					class="keyboard-ref"
				/>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ShutDown',
	props: {},
	data() {
		return {
			keyboardVisible: false,
			layout: 'numeric',
			input: null,
			options: {
				useKbEvents: false,
				preventClickEvent: false
			},
			password: null
		}
	},
	created() {},
	methods: {
		shutDownValidate(e) {
			this.keyboardVisible = true
			if (!this.$refs.inputDisplay) {
				setTimeout(() => {
					this.input = this.$refs.inputDisplay.$el.children[0]
					this.layout = this.$refs.inputDisplay.$el.children[0].dataset.layout
				}, 50)
			}
		},
		accept(text) {
			console.log(this.$refs.keyboard)
			console.log(this.$refs.keyboard.keySet)
			this.hide()
		},
		show(e) {
			this.input = e.target
			this.layout = e.target.dataset.layout

			if (!this.keyboardVisible) {
				this.keyboardVisible = true
			}
		},
		next(t) {
			if (this.password === '123456') {
				// window.location.href = 'about:blank'
				window.close()
			} else {
				this.$message('密码错误,请重新输入')
				this.displayClear()
			}
		},
		displayClear() {
			this.$refs.inputDisplay.clear()
		},
		hide() {
			this.displayClear()
			this.keyboardVisible = false
		},
		handleClickOutside() {
			this.hide()
		}
	}
}
</script>

<style rel="stylesheet/scss" lang="scss">
.container {
	display: flex;
	position: absolute;
	right: 20px;
	z-index: 999;
	overflow: hidden;
}

.shut-down-btn {
	margin-top: 12px;
}

el-input {
	position: absolute;
	bottom: 0;
}

.keyboard-container {
	display: flex;
	justify-content: center;
	z-index: 999;
	width: 100%;
	.keyboard-wrapper {
		position: absolute;
		bottom: 1%;
		left: 33%;
		padding: 1.5rem;
		z-index: 1000;
		width: 35%;
		border-radius: 1.25rem;
		-webkit-box-shadow: 3px 3px 18px 3px rgba(170, 171, 175, 0.91);
		box-shadow: 3px 3px 18px 3px rgba(170, 171, 175, 0.91);
		background-color: grey;
		.keyboard-display-panel {
			margin-bottom: 0.75rem;
			width: 100%;
		}
		.keyboard-ref {
		}
	}
}

.modal-bg {
	background: #000;
	opacity: 0.3;
	width: 100%;
	top: 0;
	left: 0;
	height: 100%;
	position: absolute;
	z-index: 999;
}
</style>
