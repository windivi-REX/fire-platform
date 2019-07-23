<template>
  <div>
    <el-form
      class="flex-form"
      :model="formMap"
      :rules="formRules"
      ref="formRef"
      label-width="100px"
    >
      <el-form-item class="form-item" label="设备组名称" prop="name">
        <el-input class="form-item-width" v-model="formMap.name" placeholder="请输入设备组名称"></el-input>
      </el-form-item>
      <el-form-item class="form-item" label="联系人" prop="contactPersonId">
        <el-select class="form-item-width" v-model="formMap.contactPersonId" placeholder="请选择联系人">
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.name"
            :value="item.userId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item" label="巡检人" prop="patrolPersonId">
        <el-select class="form-item-width" v-model="formMap.patrolPersonId" placeholder="请选择巡检人">
          <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="item.name"
            :value="item.userId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="form-item" label="短信提醒" prop="shortMessageSwitch">
        <el-switch
          class="form-item-width"
          v-model="formMap.shortMessageSwitch"
          :active-value="1"
          :inactive-value="0"
        ></el-switch>
      </el-form-item>
      <list-child v-if="formMap.id" ref="list" :formMap="formMap"></list-child>
      <span class="form-footer">
        <el-button icon="el-icon-close" @click="cancelForm">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="submitForm">确 定</el-button>
      </span>
    </el-form>
  </div>
</template>

<script>
import { putList, addList } from '../../api/device-group';
import { getUserList } from '../../api/user-management';
import ListChild from './list-child';
import { EventEntity } from './event';
export default {
  components: {
    ListChild,
  },
  props: {
    formMap: {
      default: () => ({}),
    },
  },
  data() {
    return {
      formRules: {
        // address: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
      userList: [],
      selectedRows: [],
    };
  },
  computed: {
    selectedIds() {
      const ids = [];
      this.selectedRows.forEach(row => {
        ids.push(row.id);
      });
      return ids;
    },
  },
  async mounted() {
    this.handlerGetUserList();
    this.$on(`${EventEntity.childListSelectionChange}`, res => {
      this.selectedRows = res;
    });
  },
  methods: {
    handlerGetUserList() {
      if (!this.userList || (this.userList && this.userList.length <= 0)) {
        getUserList({ paramLimit: 999 })
          .then(res => {
            this.userList = res.data.rows;
          })
          .catch(err => {
            this.$message({
              message: `${err},获取用户列表失败`,
              type: 'error',
            });
          });
      }
    },
    cancelForm() {
      this.$emit(`${EventEntity.afterCancelForm}`);
    },
    submitForm() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.formMap.deviceIds = this.selectedIds;
          this.formMap && this.formMap.id
            ? this.handlerPutList(this.formMap)
            : this.handlerAddList(this.formMap);
        } else {
          return false;
        }
      });
    },
    handlerAddList(form) {
      addList(form)
        .then(res => {
          this.$message({
            message: '新增成功',
            type: 'success',
          });
          this.$emit(`${EventEntity.afterEditSuccess}`);
        })
        .catch(err => {
          this.$message({
            message: `新增失败,错误:${err}`,
            type: 'error',
          });
          this.$emit(`${EventEntity.afterEditError}`);
        });
      this.$emit(`${EventEntity.afterEdit}`);
    },
    handlerPutList(form) {
      putList(form)
        .then(res => {
          this.$message({
            message: '编辑成功',
            type: 'success',
          });
          this.$emit(`${EventEntity.afterEditSuccess}`);
        })
        .catch(err => {
          this.$message({
            message: `编辑失败,错误:${err}`,
            type: 'error',
          });
          this.$emit(`${EventEntity.afterEditError}`);
        });
      this.$emit(`${EventEntity.afterEdit}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.flex-form {
  @include flex(row, center, center);
  flex-wrap: wrap;
  .form-item {
    flex-basis: 50%;
    .form-item-width {
      width: 100%;
    }
  }
}

.form-footer {
  @include flex(row, center, center);
}
</style>
