<template>
  <el-card class="box-card">
    <div class="margin-style">{{title}}</div>
    <EditToolpanel ref="search"></EditToolpanel>
    <EditList ref="list"></EditList>
    <EditDialog ref="dialog"></EditDialog>
    <DialogChild></DialogChild>
  </el-card>
</template>
<script>
import EditList from './list';
import EditDialog from './dialog';
import EditToolpanel from './toolpanel';
import DialogChild from './dialog-child';
export default {
  components: {
    EditList,
    EditToolpanel,
    EditDialog,
    DialogChild,
  },
  provide() {
    return {};
  },
  data() {
    return {
      title: '设备组列表',
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
