<template>
  <div class="container">
    <span style="letter-spacing:30px;">智慧消防平台</span>
  </div>
</template>

<script>
export default {
  name: 'TopToolBar',

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '~@/styles/mixin.scss';
$sign-board-text-color: #00b5fc;
div.container {
  font-family: 'SimHei';
  height: $topBarHeight;
  width: 100vw;
  position: relative;
  font-size: 2rem;
  color: #00b4ff;
  z-index: 1002;
  text-align: center;
  vertical-align: baseline;
  @include backgroundImg(url('../../assets/image/toptoolbar-bg.jpg'));
  span {
    position: relative;
    top: 18%;
    letter-spacing: 4px;
    font-weight: 600;
    user-select: none;
  }
}
</style>
