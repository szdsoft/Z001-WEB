<template>
  <div class="main-wf-app" v-loading="SR.loading">
    <div class="main-wf-main">
      <!-- 工具栏 -->
      <szd-wf-button
        ref="szdWfButton"
        wfButShow="GJRSM"
        :wfRouterCode="routerCode"
        :wfOper="wfOper"
        :bussObj="objData.header"
        @wfSubmit="submitForm" />
      <szd-tabs-wrap :top-height="SR.height_head" v-model:top="SR.SRH.Tab" v-model:bottom="SR.SRI.Tab">
        <template v-slot:top>
          <!-- 抬头 -->
          <z001DgHeader :objData="objData" :SR="SR" :wfOper="wfOper" />
        </template>
        <template v-slot:bottom>
          <!-- 项目信息 -->
          <z001DgItem :objData="objData" :SR="SR" :wfOper="wfOper" />
        </template>
      </szd-tabs-wrap>
    </div>
    <!-- 状态栏 -->
    <szd-foot-status v-model="footStatus" />
  </div>
</template>
<script>
  import { getApply, saveApply, checkApply } from "../api/z001.js";
  import z001DgHeader from "./z001DgHeader.vue";
  import z001DgItem from "./z001DgItem.vue";

  export default {
    name: "Z001_01A",
    components: {
      z001DgHeader,
      z001DgItem
    },
    data() {
      return {
        routerCode: "Z001_01A",
        wfOper: this.szdWfOperType(this.routerCode),
        SR: {
          loading: false,
          height_head: 220, //抬头高度
          SRH: {
            Tab: "Tab1"
          },
          SRI: {
            Tab: "Tab1"
          },
          GH0: false,
          GH1: false,
          GI1: false
        },
        objData: {
          header: {},
          bank: {},
          itemList: [],
          invList: [],
          z001ItemList: [],
          accDocList: []
        },
        footStatus: []
      };
    },
    mounted() {
      this.initData();
      this.szdTLWfGetRouter(this.wfOper);
      if (this.szdTLIsNull(this.wfOper.bussId)) {
        this.szdSh("CORE_BSTP", 3, this.objData.header, ["bstp", "bstpName", "wfDyId-wfId"], 0, [["routerCode", this.routerCode]]).then(res => {
          if (res && res.length>0) {
            this.szdWfInit(this.routerCode, this.objData.header.bstp).then(res => {
              this.wfOper = res;
              this.initDataDef();
            });
          } else {
            this.szdTLCloseSelectedTag();
          }
        });
      } else {
        this.getData();
      }
    },
    methods: {
      getData() {
        this.SR.loading = true;
        let json = {
          bussId: this.wfOper.bussId,
          userId: this.wfOper.userId,
          option: this.wfOper.option
        };
        // 获取数据
        getApply(json).then(response => {
          if (response.code === 200) {
            this.objData = response.data.data;
            this.wfOper = response.data.wfOper;
            this.objData.header1 = this.objData.header;
            this.objData.header2 = this.objData.header;
            this.objData.config = response.data.wfOper.wfFst;
          }
          this.setStatus();
          this.SR.loading = false;
        });
      },
      //设置屏幕编辑状态
      setStatus() {
        this.SR.GH0 = false;
        this.SR.GH1 = false;
        this.SR.GI1 = false;
        if (this.wfOper.option == "V" || this.wfOper.wfBut.but_save != "U") {
          this.SR.GH0 = true;
          this.SR.GH1 = true;
          this.SR.GI1 = true;
        } else {
          if (!this.szdTLIsNull(this.wfOper.bussDocId)) {
            this.SR.GH0 = true;
          }
        }
      },
      //保存数据
      submitForm(wfEvt) {
        if (this.szdWfButCheck(wfEvt) || this.submitFormCheck()) {
          // this.SR.loading = true;
          if (wfEvt.operate == "but_check") {
            checkApply(this.objData, wfEvt).then(response => {
              if (response.status === "S") {
                this.$message.success(response.msg);
              } else if (response.status === "E") {
                this.$message.error(response.msg);
              } else if (response.status === "W") {
                this.szdMsgBox(response.data);
              }
              this.SR.loading = false;
            });
          } else {
            saveApply(this.objData, wfEvt).then(response => {
              if (response.code === 200) {
                this.wfOper.bussId = response.data.bussId;
                this.szdWfrs(response.data).then(() => {
                  this.getData();
                });
              }
              this.SR.loading = false;
            });
          }
        }
      },
      //检查提交数据
      submitFormCheck() {
        // 检查抬头数据
        if (!this.submitFormCheckHead()) return false;
        // 检查调整分录
        if (!this.submitFormCheckAdjust()) return false;
        return true;
      },
      // 检查抬头数据
      submitFormCheckHead() {
        if (this.szdTLIsNullMsg(this.objData.header.cmpyExp, this.$t("公司代码") + "不能为空")) return false;
        if (this.szdTLIsNullMsg(this.objData.header.userId, this.$t("调账人") + "不能为空")) return false;
        if (this.szdTLIsNullMsg(this.objData.header.bstp, this.$t("业务类型") + "不能为空")) return false;
        if (this.szdTLIsNullMsg(this.objData.header.wfDyNo, this.$t("动态流程") + "不能为空")) return false;
        if (this.szdTLIsNullMsg(this.objData.header.bussDate, this.$t("调账日期") + "不能为空")) return false;
        if (this.szdTLIsNullMsg(this.objData.header.curr, this.$t("币种") + "不能为空")) return false;
        return true;
      },
      // 检查调整分录
      submitFormCheckAdjust() {
        for (let i = 0; i < this.objData.z001ItemList.length; i++) {
          if (this.szdTLIsNullMsg(this.objData.z001ItemList[i].debitCreditFlag, this.$t("调整分录") + "-" + this.$t("借贷标识") + "不能为空"))
            return false;
          if (this.szdTLCheckNumMsg(this.objData.z001ItemList[i].amt, this.$t("调整分录") + "-" + this.$t("金额") + "不能为空")) return false;
        }
        return true;
      },
      //初始化数据
      initData() {
        this.szdTLcalcTabHeight(this.SR, "");
      },
      initDataDef() {
        const userData = this.$store.state.frmUser.userData;
        this.objData.header = {
          bstp: this.objData.header.bstp,
          bstpName: this.objData.header.bstpName,
          wfDyId: this.objData.header.wfDyId,
          userId: userData.userId,
          userName: userData.userName,
          bussDate: this.szdTLFmtDtB(),
          curr: "CNY",
          paymentType: "2",
          wfStatus: "0",
          status: "A",
          wfDyNo: this.wfOper.wfDef.wfDyNo,
          wfDyName: this.wfOper.wfDef.wfDyName,
          cmpyExp: userData.cmpy,
          cmpyNameExp: userData.cmpyName,
          cstcExp: userData.cstc,
          cstcNameExp: userData.cstcName,
          cmpyCreate: userData.cmpy,
          cmpyNameCreate: userData.cmpyName,
          cstcCreate: userData.cstc,
          cstcNameCreate: userData.cstcName
        };
        this.objData.header1 = this.objData.header;
        this.objData.header2 = this.objData.header;
        this.objData.config = this.wfOper.wfFst;
      }
    }
  };
</script>