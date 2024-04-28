<template>
  <div class="app-sub-container" style="margin-top: 0px">
    <!-- 页标签信息 -->
    <el-tabs v-szd-fst="['objData', 'SEXP_ADJUST_HEAD']" v-model="SR.SRH.Tab" type="border-card">
      <el-tab-pane name="fold">
        <template #label>
          <el-icon style="font-size: 18px; color: #1890ff">
            <FolderRemove />
          </el-icon>
        </template>
      </el-tab-pane>
      <el-tab-pane szdfst="SEXP_ADJUST_HEAD_TAB1,objData.header1" :label="$t('基本信息')" name="Tab1">
        <z001HeaderTab11 :objData="objData" :SR="SR" :wfOper="wfOper" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import z001HeaderTab11 from "./z001HeaderTab11.vue";

  export default {
    props: ["objData", "SR", "wfOper"],
    components: {
      z001HeaderTab11
    },
    data() {
      return {};
    }
  };
</script>