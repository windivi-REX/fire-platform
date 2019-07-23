<template>
  <el-card class="box-card">
    <div class="margin-style">{{title}}</div>
    <EditToolpanel ref="search"></EditToolpanel>
    <EditList ref="list"></EditList>
  </el-card>
</template>
<script>
import EditList from './list';
import EditToolpanel from './toolpanel';
export default {
  components: {
    EditList,
    EditToolpanel,
  },
  provide() {
    return {};
  },
  data() {
    return {
      title: '历史消息',
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
