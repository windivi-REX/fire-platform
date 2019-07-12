<template>
	<!--eslint-disable-next-line-->
	<div class="mask"></div>
</template>

<script>
export default {
	name: 'Index'
}
</script>

<style scoped lang="scss">
.mask {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 450;
}
</style>
