<template>
  <el-table :data="objData.z001ItemList" border style="width: 800px; margin-top: 30px; margin-bottom: 30px">
    <el-table-column :label="$t('调整信息')">
      <el-table-column prop="itemNo" :label="$t('序号')" width="50" />
      <el-table-column prop="accs" :label="$t('会计科目')" />
      <el-table-column prop="debitCreditFlag" :label="$t('借贷标识')" />
      <el-table-column prop="amt" :label="$t('金额')" />
      <el-table-column prop="cstcName" :label="$t('成本中心')" />
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    props: ["objData"]
  };
</script>

<style></style>