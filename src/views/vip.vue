<template>
  <div>
    <div >
        <div class="xxxx">恭喜你成为尊贵的会员</div>
        <span class="zxc" @click="goaddVip">返回</span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
      goaddVip() {
          this.$router.push("/orders/addVip")
      }
  },
};
</script>

<style lang="less" scoped>
.xxxx {
margin-top: 330px;
}
.zxc {
    cursor: pointer;
margin-top: 20px;
  
  box-sizing: border-box;
  display: inline-block;
  padding: 10px 50px;
  border: 1px solid #bdb1b1;
  height: 43px;
  border-radius: 6px;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  color: #bdb1b1;
  
}
.zxc:hover {
      color: red;
       border: 1px solid red;
  }
</style>