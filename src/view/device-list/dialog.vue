<template>
  <el-dialog
    :title="operationTitle"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <EditForm :formMap="formMap"></EditForm>
  </el-dialog>
</template>

<script>
import EditForm from './form';
import { EventEntity } from './event';
export default {
  components: {
    EditForm,
  },
  data() {
    return {
      operationTitle: '编辑列表',
      dialogVisible: false,
      formMap: {},
    };
  },
  mounted() {
    this.registerListeners();
  },
  methods: {
    handleClose() {
      this.dialogVisible = false;
    },
    registerListeners() {
      this.$on(`${EventEntity.afterCancelForm}`, this.onAfterCancelForm);
      this.$on(`${EventEntity.listEditItem}`, this.onListEditItem);
      this.$on(`${EventEntity.afterEdit}`, this.onAfterEdit);
    },
    onAfterCancelForm() {
      this.dialogVisible = false;
    },
    onListEditItem(item) {
      this.dialogVisible = true;
      this.formMap = item;
    },
    onAfterEdit() {
      this.formMap = {};
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
