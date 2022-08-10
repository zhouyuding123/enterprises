<template>
  <div>
    <div class="crumbsStyle">
      <crumbs></crumbs>
      <div class="sjs">
        <div class="vip"><img src="@/assets/imgers/vip.png" alt="" /></div>
        <div class="Open" @click="goaddvip"><span>开通设计师专区VIP</span></div>
        <div class="bd" @click="gophb"><img src="@/assets/imgers/榜单.png" alt="" /></div>
        <div class="sx" @click="screen" :v-model="direction">
          <img src="@/assets/imgers/筛选.png" alt="" />
        </div>

        <div class="seatch" @click="seatchiinput"><img src="@/assets/imgers/搜索.png" alt="" />
        
        </div>
      </div>
    </div>
    <el-drawer :visible.sync="drawer" :direction="direction">
      <div class="drawwer">
        <el-radio-group v-model="seatchid.product_type_id" fill="#5C5673">
          <el-radio-button
            border
            v-for="item in drawerValue"
            :label="item.id"
            :key="item.id"
            >{{ item.title }}</el-radio-button
          >
        </el-radio-group>
      </div>
    </el-drawer>
    <el-drawer :visible.sync="drawers" :direction="direction">
      <div class="drawwer">
        <el-input v-model="keyword" placeholder="请输入内容" @keyup.enter.native="searchbutton"></el-input>
      </div>
    </el-drawer>
    <router-view to="'/'+value.name +" :ListValue= "seatchid.product_type_id" :seatcher="seatchid.keyword"/>
  </div>
</template>
<script>
import { postD } from "@/api";
import crumbs from "../Home/crumbs.vue";
export default {
  components: {
    crumbs,
  },
  data() {
    return {
      drawer: false,
      drawers: false,
      direction: "ttb",
      drawerValue: [],
      seatchid: {
        product_type_id: "",
        keyword:""
      },
      keyword:""
    };
  },
  methods: {
    screen() {
      this.drawer = true;
      postD("https://weisou.chengduziyi.com/designer/product_type/getList").then(
        (res) => {
          this.drawerValue = res.list;
        }
      );
    },
    seatchiinput() {
      this.drawers = true;
    },
    searchbutton() {
      this.seatchid.keyword = this.keyword 
    },
    goaddvip () {
      this.$router.push("/orders/addVip")
    },
    gophb() {
      this.$router.push("/Ranking")
    },
  },
};
</script>

<style lang="less" scoped>
.crumbsStyle {
  height: 80px;
  margin: 0;
  padding: 0;
  background-color: white;
  display: flex;
  .sjs {
    margin-left: auto;
    padding-right: 30px;
    padding-top: 20px;
    display: flex;
    .seatch {
      margin-right: 30px;
      margin-top: 8px;
      cursor: pointer;
    }
    .sx {
      margin-right: 40px;
      margin-top: 8px;
      cursor: pointer;
    }
    .bd {
      margin-right: 40px;
      margin-top: 8px;
      cursor: pointer;
    }
    .vip {
      margin-right: 7px;
      cursor: pointer;
    }
    .Open {
      margin-right: 40px;
      cursor: pointer;
      span {
        font-size: 14px;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 40px;
      }
    }
  }
}
.el-radio-group {
  display: flex;
  padding: 10px 20px;
}
/deep/.el-radio-button {
  background: #5c5673;
  margin-left: 10px;
  border: 1px solid #5c5673;
  border-radius: 3px 3px 3px 3px;
  height: 40px;
  background: linear-gradient(180deg, #0c032e 0%, #5c5673 100%);
  border-radius: 3px 3px 3px 3px;
  font-size: 16px;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  .el-radio-button__inner {
    width: 160px;
  }
}

</style>