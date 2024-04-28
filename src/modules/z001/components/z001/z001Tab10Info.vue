<template>
  <!-- 信息维护对话框 -->
  <el-dialog
    v-szd-fst="['objData', 'SEXP_COST_ACC_ADJUST_INFO', 'item']"
    :title="DG.title"
    v-model="DG.open"
    append-to-body
    :close-on-click-modal="false"
    class="app-dialog-container"
    align-center
    draggable>
    <div v-szd-dialog="['90%', 650]"></div>
    <el-form class="app-el-form">
      <el-row>
        <szd-input-form-item-col
          :label="$t('会计客户')"
          :span="12"
          v-model="item.accs"
          :disabled="SR.GI1"
          szdfst="accs"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.accsName"
          @help="szdSh('CORE_ACCS', 3, item, ['accs', 'accsName'])" />
        <el-col :span="12">
          <el-row>
            <szd-input-form-item-col
              :label="$t('金额')"
              :span="15"
              required
              label-width="40%"
              type="number"
              :numDot="true"
              :numDec="2"
              :numMin="0"
              :numMax="100000000000"
              v-model="item.amt"
              :disabled="SR.GI1"
              szdfst="amt" />
            <szd-select-form-item-col
              :span="9"
              :label="$t('借贷标识')"
              v-model="item.debitCreditFlag"
              dict="CORE_SYS_ACSH"
              :disabled="SR.GI1"
              szdfst="debitCreditFlag" />
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <szd-input-form-item-col
          :label="$t('供应商')"
          :span="12"
          v-model="item.supp"
          :disabled="SR.GI1"
          szdfst="supp"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.suppName"
          @help="szdSh('CORE_SUPP', 3, item, ['supp', 'suppName'])" />
        <szd-input-form-item-col
          :label="$t('客户')"
          :span="12"
          v-model="item.cust"
          :disabled="SR.GI1"
          szdfst="cust"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.custName"
          @help="szdSh('CORE_CUST', 3, item, ['cust', 'custName'])" />
      </el-row>
      <el-row>
        <szd-select-form-item-col
          :span="12"
          :label="$t('特别总账标识')"
          v-model="item.accSubjectFlag"
          :descSpan="12"
          dict="CORE_SYS_ACGL"
          :disabled="SR.GI1"
          szdfst="accSubjectFlag" />
        <szd-input-form-item-col
          :label="$t('摘要')"
          :span="12"
          v-model="item.summary"
          :disabled="SR.GI1"
          :descSpan="12"
          szdfst="summary"
          maxLength="50" />
      </el-row>
      <el-row>
        <szd-input-form-item-col
          :label="$t('成本中心')"
          :span="12"
          v-model="item.cstc"
          :disabled="SR.GI1"
          szdfst="cstc"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.cstcName"
          @help="szdSh('CORE_CSTC', 3, item, ['cstc', 'cstcName'])" />
        <szd-input-form-item-col
          :label="$t('内部订单')"
          :span="12"
          v-model="item.orderCode"
          :disabled="SR.GI1"
          szdfst="orderCode"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.orderName"
          @help="szdSh('CORE_SUPP', 3, item, ['orderCode-supp', 'orderName-suppName'])" />
      </el-row>

      <el-row>
        <szd-input-form-item-col
          :label="$t('利润中心')"
          :span="12"
          v-model="item.prfc"
          :disabled="SR.GI1"
          szdfst="prfc"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.prfcName"
          @help="szdSh('CORE_PRFC', 3, item, ['prfc', 'prfcName'])" />
        <szd-input-form-item-col
          :label="$t('贸易伙伴')"
          :span="12"
          v-model="item.tradePartnerCode"
          :disabled="SR.GI1"
          szdfst="tradePartnerCode"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.tradePartnerName"
          @help="szdSh('CORE_SUPP', 3, item, ['tradePartnerCode-supp', 'tradePartnerName-suppName'])" />
      </el-row>
      <el-row>
        <szd-input-form-item-col
          :label="$t('业务范围')"
          :span="12"
          v-model="item.busc"
          :disabled="SR.GI1"
          szdfst="busc"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.buscName"
          @help="szdSh('CORE_BUSC', 3, item, ['busc', 'buscName'])" />
        <szd-input-form-item-col
          :label="$t('段')"
          :span="12"
          v-model="item.segmentCode"
          :disabled="SR.GI1"
          szdfst="segmentCode"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.segmentNamef"
          @help="szdSh('CORE_SEGM', 3, item, ['segmentCode-segm', 'segmentName-segmName'])" />
      </el-row>

      <el-row>
        <szd-select-form-item-col
          :label="$t('税码')"
          :span="12"
          required
          v-model="item.taxr"
          :disabled="SR.GI1"
          :descSpan="12"
          szdfst="taxr"
          baseField="CORE_TAXR" />
        <el-col :span="12">
          <el-row>
            <szd-input-form-item-col
              :label="$t('分配号')"
              :span="15"
              label-width="40%"
              v-model="item.assignNo"
              :disabled="SR.GI1"
              szdfst="assignNo"
              maxlength="20" />
            <el-col :span="9" style="padding-left: 20px">
              <el-checkbox v-model="item.reverseFlag" :disabled="SR.GI1" :label="$t('反记帐')" />
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <szd-input-form-item-col
          :label="$t('原因代码')"
          :span="12"
          v-model="item.reas"
          :disabled="SR.GI1"
          szdfst="reas"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.reasName"
          @help="szdSh('CORE_REAS', 3, item, ['reas', 'reasName'])" />
        <el-col :span="12">
          <el-row>
            <szd-input-form-item-col
              :label="$t('采购凭证')"
              :span="15"
              label-width="40%"
              v-model="item.purchaseDoc"
              :disabled="SR.GI1"
              szdfst="purchaseDoc"
              maxlength="50" />
            <szd-input-form-item-col
              :label="$t('采购凭证')"
              :span="9"
              type="number"
              :numDec="0"
              :numMin="0"
              :numMax="100000"
              v-model="item.purchaseDocItem"
              :disabled="SR.GI1"
              szdfst="purchaseDocItem" />
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <szd-input-form-item-col
          :label="$t('功能范围')"
          :span="12"
          v-model="item.funcAreaCode"
          :disabled="SR.GI1"
          szdfst="funcAreaCode"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.funcAreaName"
          @help="szdSh('CORE_FUSC', 3, item, ['funcAreaCode-fusc', 'funcAreaName-fuscName'])" />
        <el-col :span="12">
          <el-row>
            <szd-input-form-item-col
              :label="$t('固定资产')"
              :span="15"
              label-width="40%"
              v-model="item.assetCode"
              :disabled="SR.GI1"
              szdfst="assetCode"
              maxlength="20" />
            <szd-input-form-item-col
              :label="$t('资产编号')"
              :span="9"
              v-model="item.assetCodeNo"
              :disabled="SR.GI1"
              szdfst="assetCodeNo"
              maxlength="20" />
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <szd-input-form-item-col
          :label="$t('收付条件')"
          :span="12"
          v-model="item.payTermCode"
          :disabled="SR.GI1"
          szdfst="payTermCode"
          :show-help="!SR.GI1"
          :descSpan="12"
          :desc="item.payTermName"
          @help="szdSh('CORE_SUPP', 3, item, ['payTermCode-supp', 'payTermName-suppName'])" />
        <el-col :span="12">
          <el-row>
            <szd-date-form-item-col
              :label="$t('基准日期')"
              :span="15"
              label-width="40%"
              v-model="item.baseDate"
              :disabled="SR.GI1"
              szdfst="baseDate"
              type="date"
              clearable />
            <szd-input-form-item-col
              :label="$t('天数')"
              :span="9"
              v-model="item.days"
              :disabled="SR.GI1"
              szdfst="days"
              type="number"
              :numDec="0"
              :numMin="0"
              :numMax="100000" />
          </el-row>
        </el-col>
      </el-row>

      <el-row>
        <szd-input-form-item-col
          :label="$t('参考码1')"
          :span="12"
          v-model="item.reference01"
          :disabled="SR.GI1"
          szdfst="reference01"
          :descSpan="12"
          maxlength="20" />
        <szd-input-form-item-col
          :label="$t('参考码2')"
          :span="12"
          v-model="item.reference02"
          :disabled="SR.GI1"
          :descSpan="12"
          szdfst="reference02"
          maxlength="20" />
      </el-row>
      <el-row>
        <szd-input-form-item-col
          :label="$t('参考码3')"
          :span="12"
          v-model="item.reference03"
          :disabled="SR.GI1"
          :descSpan="12"
          szdfst="reference03"
          maxlength="20" />
      </el-row>
      <el-row>
        <szd-textarea-form-item-col
          :label="$t('备注')"
          :span="12"
          label-width="24.5%"
          v-model="item.remark"
          :disabled="SR.GI1"
          szdfst="remark"
          :maxlength="150"
          rows="2" />
      </el-row>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="colseForm">{{ $t("关闭") }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    props: ["objData", "SR", "wfOper"],
    data() {
      return {
        DG: {
          title: "",
          open: false
        },
        item: {}
      };
    },
    methods: {
      //接受参数
      acceptData(itemParam) {
        this.DG.open = true;
        this.DG.title = this.$t("调整分录") + " " + this.$t("行项目") + "：" + itemParam.itemNo;
        this.item = itemParam;
      },
      //关闭
      colseForm() {
        this.DG.open = false;
      }
    }
  };
</script>