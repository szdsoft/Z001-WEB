<template>
  <div v-szd-fst="['objData', moduleName, 'objData.header1']" class="app-sub-container" style="margin-top: 0px; overflow: auto">
    <el-form class="app-el-form">
      <el-row>
        <szd-input-form-item-col
          :label="$t('业务单号')"
          :span="8"
          v-model="objData.header.wfBussDocId"
          disabled
          :descSpan="12"
          szdfst="wfBussDocId" />
        <szd-input-form-item-col
          :label="$t('公司代码')"
          :span="8"
          required
          :descSpan="12"
          :desc="objData.header.cmpyNameExp"
          v-model="objData.header.cmpyExp"
          :disabled="SR.GH0"
          szdfst="cmpyExp"
          :show-help="!SR.GH0"
          @help="szdSh('CORE_CMPY', 3, objData.header, ['cmpyExp-cmpy', 'cmpyNameExp-cmpyName'])" />
        <szd-input-form-item-col
          :label="$t('部门代码')"
          :span="8"
          required
          :descSpan="12"
          :desc="objData.header.cstcNameExp"
          v-model="objData.header.cstcExp"
          :disabled="SR.GH1"
          szdfst="cstcExp"
          :show-help="!SR.GH1"
          @help="szdSh('CORE_CSTC', 3, objData.header, ['cstcExp-cstc', 'cstcNameExp-cstcName'], 0, [['cmpy', objData.header.cmpyExp]])" />
      </el-row>
      <el-row>
        <szd-input-form-item-col
          :label="$t('调账人')"
          :span="8"
          required
          :descSpan="12"
          :desc="objData.header.userName"
          v-model="objData.header.userId"
          :disabled="SR.GH1"
          szdfst="userId"
          :show-help="!SR.GH1"
          @help="szdSh('CORE_USER', 3, objData.header, ['userId', 'userName'])" />
        <szd-input-form-item-col
          :label="$t('业务类型')"
          :span="8"
          required
          :descSpan="12"
          :desc="objData.header.bstpName"
          v-model="objData.header.bstp"
          szdfst="bstp"
          disabled />
        <szd-input-form-item-col
          :label="$t('动态流程')"
          :span="8"
          required
          :descSpan="12"
          :desc="objData.header.wfDyName"
          v-model="objData.header.wfDyNo"
          :disabled="objData.header.wfStatus != '0' || SR.GH1"
          szdfst="wfDyNo"
          :show-help="!(objData.header.wfStatus != '0' || SR.GH1)"
          @help="szdShWfDyNo(objData.header, wfOper.wfBut.but_dyWfId, objData.header.wfCreateBy)" />
      </el-row>
      <el-row>
        <szd-date-form-item-col
          :label="$t('调账日期')"
          :span="8"
          :descSpan="12"
          v-model="objData.header.bussDate"
          type="date"
          clearable="false"
          :disabled="SR.GH1"
          required
          szdfst="bussDate" />

        <szd-select-form-item-col
          :span="8"
          :label="$t('币种')"
          :descSpan="12"
          v-model="objData.header.curr"
          baseField="CORE_CURR"
          clearable="false"
          :disabled="SR.GH1"
          required
          szdfst="curr" />

        <szd-select-form-item-col
          :label="$t('单据状态')"
          :span="8"
          :descSpan="12"
          v-model="objData.header.status"
          dict="SEXP_DOC_STAU"
          disabled
          szdfst="status"
          clearable="false" />
      </el-row>
      <el-row>
        <szd-textarea-form-item-col
          :label="$t('调账说明')"
          :span="16"
          label-width="12.5%"
          v-model="objData.header.remark"
          :disabled="SR.GH1"
          szdfst="remark"
          :maxlength="150"
          rows="2" />
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    props: ["objData", "SR", "wfOper"],
    data() {
      return {
        moduleName: "SEXP_SUPPAY_HEAD_BASE"
      };
    },
    methods: {}
  };
</script>