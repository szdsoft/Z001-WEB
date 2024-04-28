<template>
  <div class="print-content">
    <div class="print-btn">
      <el-button type="primary" class="btn" v-print="printObj">{{ $t("打印") }}</el-button>
    </div>
    <div id="print">
      <div class="content-text" :id="'printContent' + index" v-for="(item, index) in dataList" :key="index" style="page-break-after: always">
        <div class="title">
          {{ item.title }}
          <div class="QRcode">
            <img :src="'data:image/gif;base64,' + item.qrCode" alt="" style="width: 120px; height: 120px; margin-top: -20px" />
          </div>
        </div>
        <basicItem :objData="item" v-if="item.header != ''"></basicItem>
        <z001Table :objData="item" v-if="item.z001ItemList != ''"></z001Table>
      </div>
    </div>
  </div>
</template>

<script>
  import { printApply } from "../api/z001.js";
  import '@/modules/z001/components/print/styles/print.scss';
  import basicItem from "@/modules/z001/components/print/baisc/basicItem.vue"; //基本信息
  import z001Table from "@/modules/z001/components/print/z001/z001Table.vue"; //项目信息
  export default {
    name: "Z001_01P",
    components: {
      basicItem,
      z001Table
    },
    data() {
      return {
        params: {
          bussId: ""
        },
        printObj: {
          id: "print",
          popTitle: " ",
          extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
        },
        dataList: [],
        paramsArray: []
      };
    },
    created() {
      this.params.bussId = "";
      this.params.bussId = this.$route.query.bussId;
      if (this.params.bussId != "") {
        this.getSplit();
      }
    },
    mounted() {},
    methods: {
      //切割
      getSplit() {
        this.paramsArray = this.params.bussId.split(",");
        this.getData();
      },
      //获取后端数据
      getData() {
        printApply(this.paramsArray).then(res => {
          if (res.code === 200) {
            this.dataList = res.data;
          }
        });
      }
    }
  };
</script>
<style></style>