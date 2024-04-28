<template>
  <div className="basic-table">
    <div className="basic-title back">
      {{ $t("基本信息") }}
    </div>
    <div className="basic-title">
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("业务单号") }}</div>
        <div className="basic-item-content">{{ objData.header.wfBussDocId }}</div>
      </div>
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("承担公司") }}</div>
        <div className="basic-item-content">{{ objData.header.cmpyNameExp }}</div>
      </div>
    </div>
    <div className="basic-title">
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("报账人") }}</div>
        <div className="basic-item-content">{{ objData.header.userName }}</div>
      </div>
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("业务类型") }}</div>
        <div className="basic-item-content">{{ objData.header.bstpName }}</div>
      </div>
    </div>
    <div className="basic-title">
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("动态流程") }}</div>
        <div className="basic-item-content">{{ objData.header.wfDyName }}</div>
      </div>
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("业务日期") }}</div>
        <div className="basic-item-content">{{ objData.header.bussDate }}</div>
      </div>
    </div>
    <div className="basic-title">
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("币种") }}</div>
        <div className="basic-item-content">{{ objData.header.currName }}</div>
      </div>
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("单据状态") }}</div>
        <div className="basic-item-content">{{ objData.header.statusName }}</div>
      </div>
    </div>
    <div className="basic-title">
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("业务标题") }}</div>
        <div className="basic-item-content">{{ objData.header.wfTitle }}</div>
      </div>
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("付款方式") }}</div>
        <div className="basic-item-content">{{ objData.header.paymentTypeName }}</div>
      </div>
    </div>
    <div className="basic-title">
      <div className="basic-item">
        <div className="basic-item-title back">{{ $t("计划票据金额") }}</div>
        <div className="basic-item-content">{{ objData.header.amtBillApply }}</div>
      </div>
    </div>
    <div className="basic-title">
      <div className="basic-item">
        <div className="basic-item-title back" style="border-bottom: none">{{ $t("费用说明") }}</div>
        <div className="basic-item-content">{{ objData.header.remark }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["objData"]
  };
</script>

<style></style>