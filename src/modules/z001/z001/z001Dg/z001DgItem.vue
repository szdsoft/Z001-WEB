<template>
  <div class="app-sub-container">
    <!-- 页标签信息 -->
    <el-tabs v-model="SR.SRI.Tab" type="border-card">
      <el-tab-pane name="fold">
        <template #label>
          <el-icon style="font-size: 18px; color: #1890ff">
            <FolderRemove />
          </el-icon>
        </template>
      </el-tab-pane>
      <el-tab-pane :label="$t('调整分录')" name="Tab1">
        <z001Tab1 :objData="objData" :SR="SR" :wfOper="wfOper" @updChgRow="updChgRow" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import z001Tab1 from "@/modules/z001/components/z001/z001Tab10.vue";

  export default {
    props: ["objData", "SR", "wfOper"],
    components: {
      z001Tab1
    },
    data() {
      return {};
    },
    methods: {
      // 更新
      updChgRow(fname) {
        switch (fname) {
          case "FCalcAmt":
            this.calcAmt();
            break;
        }
      },
      // 金额汇总
      calcAmt() {
        this.objData.header.wfAmtApply = 0;
        this.objData.header.wfAmtApplyTax = 0;
        this.objData.header.wfAmtActual = 0;
        this.objData.header.wfAmtActualTax = 0;
        // 项目信息汇总
        this.calcAmtItem();
      },
      // 项目信息汇总
      calcAmtItem() {
        for (let i = 0; i < this.objData.itemList.length; i++) {
          this.objData.header.wfAmtApply = this.toNum(this.objData.header.wfAmtApply) + this.toNum(this.objData.itemList[i].amtApply);
          this.objData.header.wfAmtApplyTax = this.toNum(this.objData.header.wfAmtApplyTax) + this.toNum(this.objData.itemList[i].amtApplyTax);
          this.objData.header.wfAmtActual =
            this.toNum(this.objData.header.wfAmtActual) +
            this.toNum(this.objData.itemList[i].amtApply) -
            this.toNum(this.objData.itemList[i].amtDedu);
          this.objData.header.wfAmtActualTax =
            this.toNum(this.objData.header.wfAmtActualTax) +
            this.toNum(this.objData.itemList[i].amtApplyTax) -
            this.toNum(this.objData.itemList[i].amtDeduTax);
        }
      }
    }
  };
</script>