<template>
  <div class="longbj">
    <div class="loginStyle">
      <div class="loginline1">
        <div class="loginzs"><img src="@/assets/钻石.png" alt="" /></div>
        <div class="logintitle"><span>衣品入微</span></div>
      </div>
      <div class="loginline2">
        <span>欢迎回来，我们想念你！</span>
      </div>
      <div class="loginline3">
        <el-form
          label-width="0px"
          class="login_form"
          :model="loginFrom"
          :rules="loginFromRules"
          ref="loginRef"
        >
          <el-form-item prop="username">
            <el-input placeholder="你的用户名" v-model="loginFrom.username">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="你的密码"
              v-model="loginFrom.password"
              type="password"
            >
            </el-input>
          </el-form-item>
          <div class="che">
            <el-checkbox v-model="checked" class="remeberMe"
              >记住我</el-checkbox
            >
            <div class="forget">
              <span>忘记密码？</span>
            </div>
          </div>
        </el-form>
      </div>
      <div class="loginline4" @click="loginer">
        <span>登入</span>
      </div>
      <div class="loginline5">
        <div class="loginline5t"><span>没有账号? </span></div>
        <div @click="reg" class="loginline5l"><span>立即注册</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { postD } from "../api/index.js";
import { users_companyLoginPWApi } from "@/urls/wsUrl.js";
export default {
  data() {
    return {
      loginFrom: {
        username: "",
        password: "",
      },
      loginFromRules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
      checked: false,
    };
  },
  mounted() {
    this.account(); //获取cookie的方法
  },
  created() {
    this.refreshtoken();
  },
  methods: {
    account() {
      this.loginFrom.username = this.getCookie("username");
      this.loginFrom.password = this.getCookie("password");
      if (this.loginFrom.username && this.loginFrom.password) {
        this.checked = true;
      }
    },
    getCookie(name) {
      var arr = document.cookie.split(";");
      for (var i = 0; i < arr.length; i++) {
        var arr2 = arr[i].split("=");
        if (arr2[0].trim() == name) {
          return arr2[1];
        }
      }
    },
    setCookie(c_name, c_pwd, exdate) {
      //账号，密码 ，过期的天数
      var exdate = new Date();
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdate); //保存的天数
      document.cookie =
        "username=" + c_name + ";path=/;expires=" + exdate.toLocaleString();
      document.cookie =
        "password=" + c_pwd + ";path=/;expires=" + exdate.toLocaleString();
    },
    clearCookie() {
      this.setCookie("", "", -1); //清除cookie
    },
    refreshtoken() {
      localStorage.removeItem("token");
    },
    reg() {
      this.$router.replace("/register");
    },
    loginer() {
      this.$refs.loginRef.validate((valid) => {
        if (!valid) return;
        postD(users_companyLoginPWApi(), this.loginFrom)
          .then((res) => {
            if (res.code !== 200) return this.$message.error("登入失败");
            this.$message.success("登入成功");
            localStorage.setItem("token", res.token);
            localStorage.setItem("use", res.data.username);
            localStorage.setItem("work", this.loginFrom.password);
            localStorage.setItem("data", JSON.stringify(res.data));
            this.$router.push("/home");
            if (this.checked == true) {
              //存入cookie
              this.setCookie(
                this.loginFrom.username,
                this.loginFrom.password,
                7
              ); //保存7天
            } else {
              this.clearCookie();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.longbj {
  background: url("@/assets/登入.png");
  width: 100%;
  height: 100%;
}
.loginStyle {
  width: 360px;
  height: 525px;
  background: #ffffff;
  box-shadow: 80px 120px 504px 1px rgba(0, 0, 0, 0.16);
  border-radius: 48px 48px 48px 48px;
  opacity: 1;
  filter: blur(undefinedpx);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .loginline1 {
    display: flex;
    padding-top: 27px;
    justify-content: center;
    .loginzs {
      margin-right: 10px;
    }
    .logintitle {
      span {
        font-size: 18px;
        font-family: Microsoft YaHei-Bold, Microsoft YaHei;
        font-weight: bold;
        color: #000000;
        line-height: 20px;
      }
    }
  }
  .loginline2 {
    padding-top: 30px;
    text-align: center;
    span {
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #8f92a1;
      line-height: 20px;
    }
  }
}
.loginline3 {
  margin-top: 60px;
}
/deep/.el-input__inner {
  width: 296px;
  height: 46px;
  background: #f9fafb;
  border-radius: 16px 16px 16px 16px;
}
/deep/.el-form-item__error {
  margin-left: 35px;
}
.che {
  display: flex;
  margin-left: 38px;
  .remeberMe {
    font-size: 12px;
  }
}
.forget {
  margin-left: auto;
  margin-right: 35px;
  cursor: pointer;
  span {
    color: #0052cc;
    font-size: 12px;
  }
}
.loginline4 {
  margin-left: 32px;
  margin-top: 20px;
  width: 296px;
  height: 40px;
  background: #0052cc;
  border-radius: 16px 16px 16px 16px;
  opacity: 1;
  filter: blur(undefinedpx);
  span {
    font-size: 14px;
    font-family: Microsoft YaHei-Bold, Microsoft YaHei;
    font-weight: bold;
    color: #ffffff;
    line-height: 40px;
  }
}
.loginline5 {
  padding-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginline5t {
    color: #afb5c4;
    font-size: 13px;
  }
  .loginline5l {
    color: #0052cc;
    cursor: pointer;
    font-size: 13px;
  }
}
</style>
