<template>
  <div class="app-container szd__tb__wrapper">
    <!-- 查询条件 -->
    <el-form :model="queryParams" ref="queryForm" class="app-el-form">
      <el-row>
        <szd-sch-form-item-col
          :label="$t('公司代码')"
          :span="8"
          type="string"
          prop="ranges.cmpyExp"
          v-model="queryParams.ranges.cmpyExp"
          :help="['CORE_CMPY', 'cmpy', []]" />
        <szd-sch-form-item-col
          :label="$t('部门代码')"
          :span="8"
          type="string"
          prop="ranges.cstcExp"
          v-model="queryParams.ranges.cstcExp"
          :help="['CORE_CSTC', 'cstc', []]" />
        <szd-sch-form-item-col
          :label="$t('调账人')"
          :span="8"
          type="string"
          prop="ranges.userId"
          v-model="queryParams.ranges.userId"
          :help="['CORE_USER', 'userId', []]" />
      </el-row>
      <el-row v-show="winPama.advSearch">
        <szd-sch-form-item-col :label="$t('调账日期')" :span="8" type="date" prop="ranges.bussDateTR" v-model="queryParams.ranges.bussDateTR" />
        <szd-sch-form-item-col
          :label="$t('业务类型')"
          :span="8"
          type="string"
          noTo
          prop="ranges.wfBstp"
          v-model="queryParams.ranges.wfBstp"
          :help="['CORE_BSTP', 'bstp', []]" />
        <szd-sch-form-item-col
          :label="$t('单据状态')"
          :span="8"
          type="string"
          noTo
          prop="ranges.status"
          v-model="queryParams.ranges.status"
          :help="['CORE_DIDT', 'value', [['type', 'SEXP_DOC_STAU']]]" />
      </el-row>
      <el-row v-show="winPama.advSearch">
        <szd-sch-form-item-col :label="$t('创建日期')" :span="8" type="date" prop="ranges.wfCreateTR" v-model="queryParams.ranges.wfCreateTR" />
        <szd-sch-form-item-col :label="$t('业务单号')" :span="8" type="string" prop="ranges.bussDocId" v-model="queryParams.ranges.bussDocId" />
      </el-row>
    </el-form>
    <!-- 功能按钮 -->
    <div class="main-button">
      <div class="main-button-left" style="width: 50%">
        <el-button type="primary" @click="handleAdd" icon="Plus">{{ $t("新增") }}</el-button>
      </div>
      <div class="main-button-right" style="width: 50%">
        <el-button type="primary" @click="handleQuery" icon="Search">{{ $t("搜索") }}</el-button>
        <el-button type="primary" @click="resetQuery" icon="Refresh">{{ $t("重置") }}</el-button>
        <el-button type="primary" @click="advSearch" icon="DCaret">{{ $t("更多筛选") }}</el-button>
      </div>
    </div>
    <!-- 表单输出 -->
    <el-table
      ref="refTable"
      border
      stripe
      show-summary
      v-szd-table-resize
      :summary-method="handleSumTable"
      v-loading="winPama.loading"
      :data="dataList"
      id="dataList"
      class="flex-1">
      <el-table-column :label="$t('业务单号')" prop="wfBussDocId" min-width="180" />
      <el-table-column :label="$t('公司代码')" prop="cmpyExp" min-width="100" />
      <el-table-column :label="$t('公司名称')" prop="cmpyNameExp" min-width="200" />
      <el-table-column :label="$t('部门代码')" prop="cstcExp" min-width="100" />
      <el-table-column :label="$t('部门名称')" prop="cstcNameExp" min-width="200" />
      <el-table-column :label="$t('调账人')" prop="userName" min-width="100" />
      <el-table-column :label="$t('业务类型')" prop="wfBstpName" min-width="150" />
      <el-table-column :label="$t('调账日期')" prop="bussDate" min-width="100" />
      <el-table-column :label="$t('单据状态')" prop="statusName" min-width="100" />
      <el-table-column :label="$t('制单人')" prop="wfCreateByName" min-width="150" />
      <el-table-column :label="$t('制单时间')" align="center" prop="wfCreateTime" min-width="150" />
      <el-table-column :label="$t('提交人')" prop="wfCommitByName" min-width="150" />
      <el-table-column :label="$t('提交时间')" align="center" prop="wfCommitTime" min-width="150" />
      <el-table-column :label="$t('更改人')" prop="wfUpdateByName" min-width="150" />
      <el-table-column :label="$t('更改时间')" align="center" prop="wfUpdateTime" min-width="150" />
      <el-table-column :label="$t('业务ID')" prop="wfBussId" min-width="180" />
      <el-table-column :label="$t('操作')" align="center" width="150" fixed="right">
        <template v-slot="scope">
          <el-button type="primary" link icon="View" @click="handleRow(scope.row, 'V')">{{ $t("显示") }}</el-button>
          <el-button type="primary" link icon="Edit" @click="handleRow(scope.row, 'U')">{{ $t("修改") }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <szd-paginatione :total="winPama.total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
  </div>
</template>

<script>
  import { listApply } from "../api/z001.js";

  export default {
    name: "Z001_01B",
    data() {
      return {
        winPama: {
          total: 0, //总页数
          loading: true, //遮罩层
          advSearch: false
        },
        //查询参数
        queryParams: {
          pageNum: 1, //当前页
          pageSize: 20, //每页大小
          ranges: {
            cmpyExp: [],
            cstcExp: [],
            userId: [],
            bussDateTR: [],
            wfBstp: [],
            status: [],
            wfCreateTime: [],
            bussDocId: []
          }
        },
        //数据列表
        dataList: []
      };
    },
    created() {
      this.getList();
    },
    methods: {
      //查询列表
      getList() {
        this.winPama.loading = true;
        listApply(this.queryParams).then(response => {
          this.dataList = response.rows;
          this.winPama.total = response.total;
          this.winPama.loading = false;
        });
      },
      //查询数据
      handleQuery() {
        this.queryParams.pageNum = 1;
        this.getList();
      },
      //重置操作
      resetQuery() {
        this.szdTLResetForm("queryForm");
        this.handleQuery();
      },
      //更多筛选
      advSearch() {
        this.winPama.advSearch = !this.winPama.advSearch;
      },
      //新增
      handleAdd() {
        this.szdTLWfReqRouterNew("Z001_01A");
      },
      //修改
      handleRow(row, option) {
        this.szdTLWfReqRouter("Z001_01A", row.wfBussId, "", option);
      },
      handleSumTable(param) {
        this.$nextTick(() => {
          this.$refs.refTable.doLayout();
        });
        return this.szdTLTableSum(param, "wfBussDocId", ["wfAmtApply", "wfAmtApplyTax", "wfAmtActual", "wfAmtActualTax"], 2);
      }
    }
  };
</script>