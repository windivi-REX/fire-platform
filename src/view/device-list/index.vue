<template>
  <el-card :body-style="{ padding: '16px' }">
    <div slot="header">
      <span>我的设备</span>
    </div>
    <el-container>
      <el-header height>
        <el-row type="flex" :gutter="8">
          <el-col :span="4">
            <el-input v-model="searchObj.clientName" placeholder="请输入客户端名称"></el-input>
          </el-col>
          <el-col :span="4">
            <el-input v-model="searchObj.deviceNumer" placeholder="请输入设备编号/ICCID/IMEI"></el-input>
          </el-col>
          <el-col :span="2">
            <el-select v-model="searchObj.deviceStatus" placeholder="切换状态">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-date-picker
              v-model="searchObj.createdTime.value"
              type="daterange"
              :default-value="searchObj.createdTime.default"
              start-placeholder="开始创建日期"
              end-placeholder="结束创建日期"
            ></el-date-picker>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="startSearch" icon="el-icon-search">检索</el-button>
          </el-col>
        </el-row>
        <el-row type="flex" style="paddingTop:16px;">
          <el-button-group>
            <el-button type="primary" @click="downLoadTemplate" icon="el-icon-download">下载模板</el-button>
            <el-button type="primary" @click="importExcel" icon="el-icon-tickets">导入</el-button>
            <el-button type="primary" @click="exportExcel" icon="el-icon-upload">导出</el-button>
            <el-button type="primary" @click="deleteListItem" icon="el-icon-delete">删除</el-button>
          </el-button-group>
        </el-row>
      </el-header>
      <el-main height>
        <el-table
          ref="table"
          tooltip-effect="dark"
          style="width: 100%"
          :data="listData"
          stripe
          highlight-current-row
          @selection-change="listItemSelected"
          @current-change="listItemFocused"
          height="570"
          max-height="600"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <div slot="empty"></div>
          <div slot="append"></div>
          <el-table-column
            v-for="(col,key) in listColumns"
            :prop="key"
            :key="key"
            :label="col.label"
            :width="col.width"
          ></el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-card>
</template>

<script>
import * as RequestApi from '@/api/device-list.js';
export default {
  data() {
    return {
      searchObj: {
        clientName: '',
        deviceNumer: '',
        deviceStatus: '',
        createdTime: {
          value: '',
          default: '',
        },
      },
      statusOptions: [
        { label: '全部', value: 'all' },
        { label: '在线', value: 'onLine' },
        { label: '离线', value: 'offLine' },
      ],
      listData: [
        {
          desc: '12123',
          deviceGroup: null,
          //   id: 1,
          image: 'no',
          insertTime: 1563175937000,
          latitude: 111.222,
          longitude: 444.111,
          model: '11',
          name: 'test1',
          serialNum: 'test-1',
          type: '1',
          vendor: '123',
        },
      ],
      listColumns: {
        desc: {
          label: '描述',
        },
        deviceGroup: {
          label: '设备组',
        },
        image: {
          label: '图片',
        },
        insertTime: {
          label: '生成时间',
        },
        latitude: { label: '纬度' },
        longitude: { label: '经度' },
        model: { label: '模型' },
        name: { label: '名称' },
        serialNum: { label: '序列号' },
        type: { label: '类型' },
        vendor: { label: '供应商' },
      },
    };
  },
  mounted() {
    this.getDeviceListData();
  },
  methods: {
    getDeviceListData(params) {
      RequestApi.getDeviceList(params)
        .then(res => {
          res;
        })
        .catch(err => console.log(err));
    },
    startSearch() {},
    downLoadTemplate() {},
    importExcel() {},
    exportExcel() {},
    deleteListItem() {},
    listItemSelected() {},
    listItemFocused() {},
  },
};
</script>

<style lang="scss" scoped>
</style>
