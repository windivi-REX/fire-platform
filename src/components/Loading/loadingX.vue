<template>
  <div class="scene">
    <div class="one">
      <div class="two">
        <div class="three">
          <div class="four">
            <div class="five">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="title">{{info}}</div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    info: {
      type: String,
      default: '系统程序初始化...',
    },
    textPositionX: {
      type: String,
      default: '14',
    },
    textPositionY: {
      type: String,
      default: '21',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '~@/styles/mixin.scss';
.scene {
  width: 100%;
  height: calc(100vh - #{$topBarHeight});
  @include flex(column, center, center);
  @include backgroundImg(url('../../assets/image/background-a.png'));
  .one {
    height: 454px;
    width: 454px;
    // animation: arrow-spin 2.5s 0s cubic-bezier(1,1,1,1) infinite;
    @include flex(column, center, center);
    // @include backgroundImg(url('../../assets/image/wi1.png'), false);
  }
  .two {
    height: 330px;
    width: 330px;
    animation: arrow-spin 3s 0s cubic-bezier(1, 1, 1, 1) infinite;
    @include flex(column, center, center);
    @include backgroundImg(url('../../assets/image/wi2.png'), false);
  }
  .three {
    height: 306px;
    width: 306px;
    animation: arrow-spin 6s 0s cubic-bezier(1, 1, 1, 1) infinite;
    @include flex(column, center, center);
    @include backgroundImg(url('../../assets/image/wi3.png'), false);
  }
  .four {
    height: 264px;
    width: 264px;
    animation: arrow-spin 8s 0s cubic-bezier(1, 1, 1, 1) infinite;
    @include flex(column, center, center);
    @include backgroundImg(url('../../assets/image/wi4.png'), false);
  }
  .five {
    height: 142px;
    width: 142px;
    animation: arrow-spin 12s 0s cubic-bezier(1, 1, 1, 1) infinite;
    @include flex(column, center, center);
    @include backgroundImg(url('../../assets/image/wi5.png'), false);
  }
  .title {
    color: rgb(255, 255, 255);
    font-size: 36px;
    letter-spacing: 4px;
    opacity: 0.4;
    animation: hidden 3s 0s cubic-bezier(1, 1, 1, 1) infinite;
  }
}
@keyframes arrow-spin {
  50% {
    transform: rotateZ(360deg);
  }
}
@keyframes hidden {
  50% {
    opacity: 1;
  }
}
</style>
