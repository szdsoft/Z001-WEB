<template>
  <!-- 预算行项目 -->
  <div
    v-szd-fst="['objData', 'SEXP_COST_ACC_ADJUST', 'objData.z001ItemList', 'listCtrl']"
    class="app-sub-container szd__tb__wrapper"
    style="margin-top: 0px; overflow: auto">
    <!-- 功能按钮 -->
    <div class="main-table-title">
      <div class="main-table-title-left" style="width: 50%">
        <div>{{ $t("调整分录") }}</div>
      </div>
      <div class="main-table-title-right" style="width: 50%">
        <el-button :disabled="SR.GH1" type="primary" link @click="addRow" szdfst="add" icon="Plus">{{ $t("新增") }} </el-button>
        <el-button :disabled="SR.GH1" type="primary" link @click="delRow" szdfst="delete" icon="Delete">{{ $t("删除") }} </el-button>
      </div>
    </div>
    <!-- 表格输出 -->
    <el-table border stripe :data="objData.z001ItemList" @selection-change="handleSelRow" class="flex-1">
      <el-table-column align="center" type="selection" width="40" fixed="left" />
      <el-table-column :label="$t('行项目')" prop="itemNo" min-width="60" align="center" fixed="left">
        <template v-slot="scope">
          <el-button type="primary" link @click="handleUpdRow(scope.row)">{{ scope.row.itemNo }}</el-button>
        </template>
      </el-table-column>
      <!-- 会计科目 -->
      <el-table-column szdfst="accs" v-if="!listCtrl.accs" :label="$t('会计科目')" prop="accs" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.accs" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_ACCS', 3, scope.row, ['accs', 'accsName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.accsName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 借贷标识 -->
      <el-table-column szdfst="debitCreditFlag" v-if="!listCtrl.debitCreditFlag" :label="$t('借贷标识')" prop="debitCreditFlag" min-width="120">
        <template #header><span class="main-required">*</span>{{ $t("借贷标识") }}</template>
        <template v-slot="scope">
          <szd-select :disabled="SR.GI1" v-model="scope.row.debitCreditFlag" dict="CORE_SYS_ACSH" clearable="false" />
        </template>
      </el-table-column>
      <!-- 金额 -->
      <el-table-column szdfst="amt" v-if="!listCtrl.amt" prop="amt" :label="$t('金额')" min-width="120">
        <template #header><span class="main-required">*</span>{{ $t("金额") }}</template>
        <template v-slot="scope">
          <el-input
            v-szd-dot="[scope.row, 'amt']"
            :disabled="SR.GI1"
            v-model.number="scope.row.amt"
            :controls="false"
            :precision="2"
            :max="100000000000"
            :min="0" />
        </template>
      </el-table-column>
      <!-- 供应商 -->
      <el-table-column szdfst="supp" v-if="!listCtrl.supp" :label="$t('供应商')" prop="supp" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.supp" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_SUPP', 3, scope.row, ['supp', 'suppName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.suppName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 客户 -->
      <el-table-column szdfst="cust" v-if="!listCtrl.cust" :label="$t('客户')" prop="cust" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.cust" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_CUST', 3, scope.row, ['cust', 'custName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.custName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 特别总账标识 -->
      <el-table-column szdfst="accSubjectFlag" v-if="!listCtrl.accSubjectFlag" :label="$t('特别总账标识')" prop="accSubjectFlag" min-width="120">
        <template v-slot="scope">
          <szd-select :disabled="SR.GI1" v-model="scope.row.accSubjectFlag" dict="CORE_SYS_ACGL" />
        </template>
      </el-table-column>
      <!-- 摘要 -->
      <el-table-column szdfst="summary" v-if="!listCtrl.summary" :label="$t('摘要')" prop="summary" min-width="150">
        <template v-slot="scope">
          <el-input :disabled="SR.GI1" v-model="scope.row.summary" maxlength="150" />
        </template>
      </el-table-column>
      <!-- 成本中心 -->
      <el-table-column szdfst="cstc" v-if="!listCtrl.cstc" :label="$t('成本中心')" prop="cstc" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.cstc" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_CSTC', 3, scope.row, ['cstc', 'cstcName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.cstcName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 内部订单 -->
      <el-table-column szdfst="orderCode" v-if="!listCtrl.orderCode" :label="$t('内部订单')" prop="orderCode" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.orderCode" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_SUPP', 3, scope.row, ['orderCode-supp', 'orderName-suppName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.orderName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 利润中心 -->
      <el-table-column szdfst="prfc" v-if="!listCtrl.prfc" :label="$t('利润中心')" prop="prfc" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.prfc" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_PRFC', 3, scope.row, ['prfc', 'prfcName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.prfcName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 贸易伙伴 -->
      <el-table-column szdfst="tradePartnerCode" v-if="!listCtrl.tradePartnerCode" :label="$t('贸易伙伴')" prop="tradePartnerCode" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.tradePartnerCode" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_SUPP', 3, scope.row, ['tradePartnerCode-supp', 'tradePartnerName-suppName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.tradePartnerName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 业务范围 -->
      <el-table-column szdfst="busc" v-if="!listCtrl.busc" :label="$t('业务范围')" prop="busc" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.busc" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_BUSC', 3, scope.row, ['busc', 'buscName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.buscName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 段 -->
      <el-table-column szdfst="segmentCode" v-if="!listCtrl.segmentCode" :label="$t('段')" prop="segmentCode" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.segmentCode" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_SEGM', 3, scope.row, ['segmentCode-segm', 'segmentName-segmName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.segmentName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 分配号 -->
      <el-table-column szdfst="assignNo" v-if="!listCtrl.assignNo" :label="$t('分配号')" prop="assignNo" min-width="150">
        <template v-slot="scope">
          <el-input :disabled="SR.GI1" v-model="scope.row.assignNo" maxlength="20" />
        </template>
      </el-table-column>
      <!-- 税码 -->
      <el-table-column szdfst="taxr" v-if="!listCtrl.taxr" :label="$t('税码')" prop="taxr" min-width="120">
        <template v-slot="scope">
          <szd-select :disabled="SR.GI1" v-model="scope.row.taxr" baseField="CORE_TAXR" clearable="false" />
        </template>
      </el-table-column>
      <!-- 原因代码 -->
      <el-table-column szdfst="reas" v-if="!listCtrl.reas" :label="$t('原因代码')" prop="reas" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.reas" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_REAS', 3, scope.row, ['reas', 'reasName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.reasName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 功能范围 -->
      <el-table-column szdfst="funcAreaCode" v-if="!listCtrl.funcAreaCode" :label="$t('功能范围')" prop="funcAreaCode" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.funcAreaCode" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_FUSC', 3, scope.row, ['funcAreaCode-fusc', 'funcAreaName-fuscName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.funcAreaName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 采购凭证 -->
      <el-table-column szdfst="purchaseDoc" v-if="!listCtrl.purchaseDoc" :label="$t('采购凭证')" prop="purchaseDoc" min-width="150">
        <template v-slot="scope">
          <el-input :disabled="SR.GI1" v-model="scope.row.purchaseDoc" maxlength="100" />
        </template>
      </el-table-column>
      <el-table-column szdfst="taxr" v-if="!listCtrl.taxr" :label="$t('采购凭证行号')" prop="purchaseDocItem" min-width="100">
        <template v-slot="scope">
          <el-input-number :disabled="SR.GI1" v-model="scope.row.purchaseDocItem" :controls="false" :precision="0" :max="10000" :min="0" />
        </template>
      </el-table-column>
      <!-- 固定资产 -->
      <el-table-column szdfst="assetCode" v-if="!listCtrl.assetCode" :label="$t('固定资产')" prop="assetCode" min-width="150">
        <template v-slot="scope">
          <el-input :disabled="SR.GI1" v-model="scope.row.assetCode" maxlength="20" />
        </template>
      </el-table-column>
      <el-table-column szdfst="assetCodeNo" v-if="!listCtrl.assetCodeNo" :label="$t('资产编号')" prop="assetCodeNo" min-width="100">
        <template v-slot="scope">
          <el-input :disabled="SR.GI1" v-model="scope.row.assetCodeNo" maxlength="20" />
        </template>
      </el-table-column>
      <!-- 收付条件 -->
      <el-table-column szdfst="payTermCode" v-if="!listCtrl.payTermCode" :label="$t('收付条件')" prop="payTermCode" min-width="250">
        <template v-slot="scope">
          <el-row>
            <el-col :span="10">
              <el-input v-model="scope.row.payTermCode" :disabled="SR.GI1">
                <template #suffix>
                  <el-icon v-if="!SR.GI1" @click="szdSh('CORE_SUPP', 3, scope.row, ['payTermCode-supp', 'payTermName-suppName'])">
                    <Search />
                  </el-icon>
                </template>
              </el-input>
            </el-col>
            <el-col :span="14">
              <szd-desc v-model="scope.row.payTermName" />
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 基准日期 -->
      <el-table-column szdfst="baseDate" v-if="!listCtrl.baseDate" :label="$t('基准日期')" prop="baseDate" min-width="150">
        <template v-slot="scope">
          <el-date-picker :disabled="SR.GI1" v-model="scope.row.baseDate" type="date" value-format="YYYY-MM-DD" />
        </template>
      </el-table-column>
      <el-table-column szdfst="days" v-if="!listCtrl.days" :label="$t('天数')" prop="days" min-width="100">
        <template v-slot="scope">
          <el-input-number :disabled="SR.GI1" v-model="scope.row.days" :controls="false" :precision="0" :max="1000" :min="0" />
        </template>
      </el-table-column>
      <!-- 反记帐 -->
      <el-table-column szdfst="reverseFlag" v-if="!listCtrl.reverseFlag" :label="$t('反记帐')" prop="reverseFlag" min-width="60" align="center">
        <template v-slot="scope">
          <el-checkbox v-model="scope.row.reverseFlag" :disabled="SR.GI1" />
        </template>
      </el-table-column>
      <!-- 参考码 -->
      <el-table-column szdfst="reference01" v-if="!listCtrl.reference01" :label="$t('参考码1')" prop="reference01" min-width="150">
        <template v-slot="scope">
          <el-input :disabled="SR.GI1" v-model="scope.row.reference01" maxlength="20" />
        </template>
      </el-table-column>
      <el-table-column szdfst="reference02" v-if="!listCtrl.reference02" :label="$t('参考码2')" prop="reference02" min-width="150">
        <template v-slot="scope">
          <el-input :disabled="SR.GI1" v-model="scope.row.reference02" maxlength="20" />
        </template>
      </el-table-column>
      <el-table-column szdfst="reference03" v-if="!listCtrl.reference03" :label="$t('参考码3')" prop="reference03" min-width="150">
        <template v-slot="scope">
          <el-input :disabled="SR.GI1" v-model="scope.row.reference03" maxlength="20" />
        </template>
      </el-table-column>
    </el-table>

    <z001Tab10Info :objData="objData" :SR="SR" :wfOper="wfOper" ref="z001Tab10Info" />
  </div>
</template>
<script>
  import z001Tab10Info from "./z001Tab10Info.vue";

  export default {
    props: ["objData", "SR", "wfOper"],
    components: {
      z001Tab10Info
    },
    data() {
      return {
        listSel: [],
        listCtrl: {}
      };
    },
    methods: {
      toNum(num) {
        if (!num || isNaN(num)) {
          return 0;
        }
        return Number(num);
      },
      addRow() {
        let itemNo_max = 0;
        if (this.objData.z001ItemList != undefined && this.objData.z001ItemList != null && this.objData.z001ItemList.length > 0) {
          for (let i = 0; i < this.objData.z001ItemList.length; i++) {
            if (itemNo_max < this.toNum(this.objData.z001ItemList[i].itemNo)) {
              itemNo_max = this.toNum(this.objData.z001ItemList[i].itemNo);
            }
          }
        }
        itemNo_max = itemNo_max + 1;
        let item = {
          itemNo: itemNo_max
        };
        this.objData.z001ItemList.push(item);
      },
      delRow() {
        this.objData.z001ItemList = this.objData.z001ItemList.filter(item => !this.listSel.some(ele => ele === item));
      },
      handleSelRow(selection) {
        this.listSel = selection;
      },
      handleUpdRow(row) {
        this.$refs.z001Tab10Info.acceptData(row);
      }
    }
  };
</script>