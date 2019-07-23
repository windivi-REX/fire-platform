<template>
  <div>
    <el-form :model="formMap" :rules="formRules" ref="formRef" label-width="80px">
      <el-form-item label="地址" prop="address">
        <el-input v-model="formMap.address" placeholder="请输入地址"></el-input>
      </el-form-item>
      <el-form-item label="类型名称" prop="typeName">
        <el-select style="width:100%" v-model="formMap.typeName" placeholder="请选择类型名称">
          <el-option
            v-for="(item, index) in deviceTypeList"
            :key="index"
            :label="item.name"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="formMap.longitude" placeholder="请输入经度"></el-input>
      </el-form-item>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="formMap.latitude" placeholder="请输入纬度"></el-input>
      </el-form-item>
      <span class="form-footer">
        <el-button icon="el-icon-close" @click="cancelForm">取 消</el-button>
        <el-button type="primary" icon="el-icon-check" @click="submitForm">确 定</el-button>
      </span>
    </el-form>
  </div>
</template>

<script>
import { putList } from '../../api/device-list';
import { getList as getTypeList } from '../../api/device-type-list';
import { EventEntity } from './event';
export default {
  props: {
    formMap: {
      default: {},
    },
  },
  data() {
    return {
      deviceTypeList: [
        { id: null, name: '独立式烟感火灾探测报警器', type: null, value: 1 },
      ],
      formRules: {
        address: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
      formMap: {
        address: '',
        typeName: '',
        latitude: '',
        longitude: '',
      },
    };
  },
  async mounted() {
    await this.handlerTypeList();
  },
  methods: {
    handlerTypeList() {
      getTypeList({ type: 'device_type' })
        .then(res => {
          this.deviceTypeList = res.data;
        })
        .catch(err => console.log(err));
    },
    cancelForm() {
      this.$emit(`${EventEntity.afterCancelForm}`);
    },
    submitForm() {
      this.$refs.formRef.validate(valid => {
        if (valid) {
          this.formMap.type = this.formMap.typeName;
          this.handlerPutList();
        } else {
          return false;
        }
      });
    },
    handlerPutList() {
      putList(this.formMap)
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
.form-footer {
  @include flex(row, center, center);
}
</style>
