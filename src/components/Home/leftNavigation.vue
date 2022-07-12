<template>
  <div class="divBody">
    <el-container>
      <el-header style="height: 60px">
        <div class="logoImg">
          <img src="@/assets/imgers/logo.png" alt="" />
        </div>
        <a href=""><img src="../../assets/imgers/tx.png" alt="" /></a>
        <p class="headerP">{{ useNames }}</p>
        <el-dropdown>
          <img src="../../assets/imgers/点点.png" alt="" />
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>我的主页</el-dropdown-item>
              <el-dropdown-item @click.native="goAccount">账号设置</el-dropdown-item>
              <el-dropdown-item @click.native="gocapital"
                >钱包管理</el-dropdown-item
              >
              <el-dropdown-item>平台服务</el-dropdown-item>
              <el-dropdown-item>投诉建议</el-dropdown-item>
              <el-dropdown-item @click.native="signOut"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside
          style="
            width: 220px;
            background: linear-gradient(180deg, #0b022d 0%, #5c5572 100%);
            overflow: hidden;
          "
        >
          <el-menu
            default-active="2"
            text-color="#fff"
            background-color="#0B022D"
            active-text-color="#FFDC00"
            router
          >
            <div class="indexhomePageStyle">
              <router-link
                class="indexhomePage"
                to="/pageHome"
                style="text-decoration: none"
              >
                <div>
                  <img src="@/assets/strollimg/控制.png" alt="" />控制台
                </div></router-link
              >
            </div>
            <el-submenu
              v-for="item in leftNavigationValue"
              :key="item.id"
              :index="item.id + ''"
            >
              <template #title>
                <div class="spoow">&nbsp;</div>
                <i :class="item.icon" style="width: 15px; height: 15px"></i>
                <div class="textLitle">
                  <span>{{ item.title }}</span>
                </div>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="value in item.children"
                  :key="value.id"
                  :index="'/' + value.name"
                >
                  <div style="font-size: 12px">
                    {{ value.title }}
                  </div></el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view to="'/'+value.name" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { postD } from "../../api/index.js";
import { users_companyListRuleApi } from "./usersCompany.js";
export default {
  data() {
    return {
      leftNavigationValue: "",
      icons: "",
      useNames: "",
    };
  },
  created() {
    this.usersList();
    this.useName();
  },
  methods: {
    usersList() {
      postD(users_companyListRuleApi()).then((res) => {
        if (res.code == "200") {
          this.leftNavigationValue = res.list;
        } else if (res.code == "-200") {
          this.$message.error("参数错误，或暂无数据");
        } else if (res.code == "-201") {
          this.$message.error("重新登入");
          this.$router.push("/about");
        } else if (res.code == "-203") {
          this.$message.error("对不起，你没有此操作权限");
        } else {
          this.$message.error("注册失败，账号已存在");
        }
      });
    },
    useName() {
      this.useNames = localStorage.use;
    },
    // 退出功能
    signOut() {
      window.sessionStorage.clear();
      //跳转到登录页
      this.$router.push("/login");
    },
    gocapital() {
      this.$router.push("/capital");
    },
    goAccount() {
      this.$router.push("/personal");

    }
  },
};
</script>

<style lang="less" scoped>
.divBody {
  height: 100vh;
  .el-container {
    width: 100%;
    height: 100vh;
    .el-header {
      background: #0c032e;
      text-align: right;
      .el-dropdown {
        top: -42px;
      }
      a {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 10px;
        right: 150px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
    }
    .headerP {
      position: absolute;
      color: white;
      right: 65px;
      top: 22px;
    }
  }
}
.spoow {
  display: inline-block;
  width: 4px;
  height: 50px;
  border-radius: 2px 2px 2px 2px;
  position: absolute;
  left: 0;
}
.el-submenu {
  text-align: left;
  width: 218px;
  i {
    padding-left: 10px;
    color: white;
  }
  .el-menu-item-group {
    padding-left: 27px;
  }
}
.textLitle {
  display: inline-block;
  position: absolute;
  padding-left: 30px;
  span {
    font-size: 14px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }
}
.indexhomePage {
  width: 100%;
  cursor: pointer;
  height: 30px;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
  div {
    display: flex;
    margin-left: 30px;
    img {
      width: 16px;
      height: 16px;
      margin-top: 6px;
      margin-right: 20px;
    }
  }
}
.el-main {
  padding: 0;
  background-color: #f9f9f9;
}
.indexhomePageStyle {
  width: 280px;
  border-right: 2px black solid;
}
.logoImg {
  // position: absolute;
  display: flex;
  margin-left: 30px;
  margin-top: 10px;
  img {
    width: 120px;
  }
}
.el-submenu .el-menu-item {
  min-width: 185px;
}
</style>