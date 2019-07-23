<template>
  <div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="showDialog"
      width="85%"
      :before-close="handleClose"
    >
      <DialogChildList :tableData="tableData"></DialogChildList>
    </el-dialog>
  </div>
</template>

<script>
import { EventEntity } from './event';
import DialogChildList from './dialog-child-list';
export default {
  components: {
    DialogChildList,
  },
  data() {
    return {
      dialogTitle: '已选设备信息',
      showDialog: false,
      formMap: {},
      tableData: {},
    };
  },
  beforeMount() {},
  async mounted() {
    this.registerListeners();
  },
  methods: {
    handleClose() {
      this.showDialog = false;
    },
    registerListeners() {
      this.$on(
        `${EventEntity.afterCancelChildDialog}`,
        this.onAfterCancelChildDialog,
      );
      this.$on(`${EventEntity.viewListInfo}`, this.onViewListInfo);
    },
    onAfterCancelChildDialog() {
      this.showDialog = false;
    },
    onViewListInfo(map) {
      this.tableData = map.deviceInfos;
      this.showDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
