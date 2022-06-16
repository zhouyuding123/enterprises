<template>
  <div class="divBody">
    <el-container>
      <el-header style="height: 80px">
        <a href=""><img src="../../assets/imgers/tx.png" alt="" /></a>
        <p class="headerP">{{ useNames }}</p>
        <el-dropdown>
          <img src="../../assets/imgers/点点.png" alt="" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside
          style="
            width: 279px;
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
                <div>控制台</div></router-link
              >
            </div>
            <el-submenu
              v-for="item in leftNavigationValue"
              :key="item.id"
              :index="item.id + ''"
            >
              <template #title>
                <div class="spoow">&nbsp;</div>
                <i :class="item.icon"></i>
                <div class="textLitle">{{ item.title }}</div>
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
          this.$router.push("/login")
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
        line-height: 90px;
      }
      a {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 20px;
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
      top: 30px;
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
  width: 279px;
  i {
    padding-left: 50px;
    color: white;
  }
  .el-menu-item-group {
    padding-left: 50px;
  }
}
.textLitle {
  display: inline-block;
  position: absolute;
  padding-left: 20px;
}
.indexhomePage {
  width: 100%;
  cursor: pointer;
  height: 30px;
  color: #fff;
  font-size: 14px;
  line-height: 30px;
  div {
    margin-left: -55px;
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
</style>