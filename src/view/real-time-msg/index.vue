<template>
  <el-card class="box-card">
    <div class="margin-style">{{title}}</div>
    <!-- <EditToolpanel ref="search"></EditToolpanel> -->
    <EditList ref="list"></EditList>
  </el-card>
</template>
<script>
import EditList from './list';
export default {
  components: {
    EditList,
  },
  data() {
    return {
      title: '告警中心',
    };
  },
  async mounted() {},
  computed: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.margin-style {
  margin-bottom: 10px;
}
</style>
