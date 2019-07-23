<template>
  <div>
    <el-dialog
      :title="editDialogTitle"
      :visible.sync="showEditDialog"
      width="85%"
      :before-close="handleClose"
    >
      <EditForm :formMap="formMap"></EditForm>
    </el-dialog>
  </div>
</template>

<script>
import { EventEntity } from './event';
import EditForm from './form';
export default {
  components: {
    EditForm,
  },
  data() {
    return {
      editDialogTitle: '编辑设备组',
      showEditDialog: false,
      formMap: {},
    };
  },
  beforeMount() {},
  async mounted() {
    this.registerListeners();
  },
  methods: {
    handleClose() {
      this.showEditDialog = false;
    },
    registerListeners() {
      this.$on(`${EventEntity.afterCancelForm}`, this.onAfterCancelForm);
      this.$on(`${EventEntity.listEditItem}`, this.onListEditItem);
      this.$on(`${EventEntity.afterEdit}`, this.onAfterEdit);
      this.$on(`${EventEntity.listAddItem}`, this.onListAddItem);
    },
    onAfterCancelForm() {
      this.showEditDialog = false;
    },
    onAfterEdit() {
      this.showEditDialog = false;
    },
    onListEditItem(item) {
      this.formMap = {...item};
      this.editDialogTitle = '编辑设备组';
      this.showEditDialog = true;
    },
    onListAddItem() {
      this.formMap = {};
      this.editDialogTitle = '新增设备组';
      this.showEditDialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
