<template>
  <div class="contanier">
    <div class="copyright"
         :style="{'color':color}">{{copyright}}</div>
  </div>
</template>

<script>
export default {
  props: {
    copyright: {
      type: String,
      default: `Copyright©安全教育在线考试系统 技术支持：四川雷克斯智慧科技股份有限公司`,
    },
    color: {
      type: String,
      default: '#404040',
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/variables.scss';
@import '~@/styles/mixin.scss';
.copyright {
  position: fixed;
  bottom: 1rem;
  width: 100%;
  text-align: center;
  user-select: none;
  z-index: 1999;
}
.contanier {
  z-index: 1999;
}
</style>
