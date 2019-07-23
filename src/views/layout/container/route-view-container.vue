<template>
  <el-container height="100%">
    <el-col :span="24">
      <!-- <nav-bar></nav-bar> -->
        <router-view></router-view>
    </el-col>
  </el-container>
</template>

<script>
// import NavBar from '@/view/layout/components/Navbar';
export default {
  // components: { NavBar },
};
</script>

<style lang="scss" scoped>
</style>
