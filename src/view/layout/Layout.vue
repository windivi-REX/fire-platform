<template>
  <div class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <top-info :top-height="topHeight" class="top-info"/>
    <sidebar class="sidebar-container"/>
    <div v-scrollBar class="main-container">
      <!--<navbar style="margin-bottom: 5px"/>-->
      <tags-view style="margin-bottom: 10px"/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components';
import TagsView from './components/TagsView';
import ResizeMixin from './mixin/ResizeHandler';
import topInfo from '../../components/TopInfo/index';
export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView,
    topInfo,
  },
  mixins: [ResizeMixin],
  data() {
    return {
      topHeight: '70px',
    };
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile',
      };
    },
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: calc(100% - $topBarHeight);
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
}
</style>

<style lang="scss" scoped>
.top-info {
  z-index: 1002;
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
