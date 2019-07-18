<template>
	<div class="list">
		<el-input v-model="filterText" class="filter-input" size="mini" style="width:80%;" clearable prefix-icon="el-icon-search" />
		<ul v-scrollBar class="list-ul">
			<li v-for="(item, index) in filterList" :key="item.roleId" class="role-list">
				<span :class="{weight: choseIndex === index}" style="cursor: pointer" @click="handleTree(item, index)">{{ item.roleName }}</span>
				<span class="role-operate">
					<svg class="icon operate-icon" aria-hidden="true" style="margin-right: 15px" @click="handleRemove(item)">
						<use xlink:href="#icon-shanchu"></use>
					</svg>
					<svg class="icon operate-icon" aria-hidden="true" @click="handleEdit(item)">
						<use xlink:href="#icon-xiugai"></use>
					</svg>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
import scrollBar from '../../directive/scrollbar/index.js'
export default {
	name: 'List',
	directives: { scrollBar },
	props: {
		list: {
			type: Array,
			default: function() {
				return [
					{
						id: 1,
						label: '权限管理员'
					},
					{
						id: 2,
						label: '运维管理员'
					},
					{
						id: 3,
						label: '测试员'
					},
					{
						id: 4,
						label: '普通用户'
					}
				]
			}
		}
	},
	data() {
		return {
			filterText: '',
			choseIndex: null
		}
	},
	computed: {
		filterList() {
			return this.list.filter(
				item => item.roleName.indexOf(this.filterText) !== -1
			)
		}
	},
	methods: {
		// 编辑弹出框,像父组件传递1这个参数
		handleEdit(item) {
			this.$emit('listEdit', item)
		},
		// 删除某个list
		handleRemove(item) {
			this.$emit('listRemove', item)
		},
		// 获取id
		handleTree(item, index) {
			this.$emit('listTree', item)
			this.choseIndex = index
		}
	}
}
</script>

<style scoped lang="scss">
.filter-input {
	margin-bottom: 10px;
	margin-left: 22px;
}
.role-list {
	padding: 11px 32px 11px 22px;
	&:hover {
		background: #eee;
		.role-operate {
			display: inline;
		}
	}
	.role-operate {
		float: right;
		display: none;
		.operate-icon {
			cursor: pointer;
		}
	}
	.weight {
		font-weight: bold;
	}
}
.list-ul {
	padding: 0;
	max-height: calc(70vh);
	position: relative;
}
</style>
