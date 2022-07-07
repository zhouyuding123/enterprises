<template>
  <div class="walletboddy">
    <div class="walletline1">
      <div class="Total_amount">
        <div class="Total_amountz">
          <div class="Total_amountzy">总金额（元）</div>
          <div class="Total_amountzy_num">88888.02</div>
        </div>
        <div class="options">
          <div class="Withdrawal"><span>提现</span></div>
          <div class="Withdrawal"><span>充值</span></div>
        </div>
      </div>
      <div class="borderwallet"></div>
      <div class="card">
        <div class="cardd">
          <div class="carddimg">
            <img src="@/assets/myimger/点.png" alt="" />
          </div>
          <div class="cardd_card">银行卡</div>
        </div>
        <div class="cardnum" @click="goAddCard">
          <div class="cardnums">5</div>
          <div>
            <img src="@/assets/myimger/more2.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="detailed">
      <div class="detailedz">资金变动明细</div>
      <div class="detailedy">
        <div class="detailedymore">更多</div>
        <div>
          <img src="@/assets/myimger/more3.png" alt="" />
        </div>
      </div>
    </div>
    <div class="detailed_list">
        <div class="detailed_list_list">
            <div>账务类型</div>
            <div>时间</div>
            <div>收支金额</div>
            <div>账户余额</div>
        </div>
        <div class="list_mun">
            <div>余额提现</div>
            <div>2022-08-04  19:43:23</div>
            <div class="list_mun_num">-500.00</div>
            <div>0.00</div>
        </div>
        <div class="list_mun">
            <div>余额提现</div>
            <div>2022-08-04  19:43:23</div>
            <div class="list_mun_num">-500.00</div>
            <div>0.00</div>
        </div>
        <div class="list_mun">
            <div>余额提现</div>
            <div>2022-08-04  19:43:23</div>
            <div class="list_mun_num">-500.00</div>
            <div>0.00</div>
        </div>
        <div class="list_mun">
            <div>余额提现</div>
            <div>2022-08-04  19:43:23</div>
            <div class="list_mun_num">-500.00</div>
            <div>0.00</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        goAddCard() {
            this.$router.push("/capital/addcard")
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./capital.less");
</style>