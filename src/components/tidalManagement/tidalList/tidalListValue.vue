<template>
  <div>
    <div class="Release">
      <p @click="goAddcreate">创建圈子</p>
      <p>发布活动</p>
    </div>
    <div>
      <div class="borderStyle"></div>
      <div>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="cjqz">我创建的圈子</el-menu-item>
          <el-menu-item index="2" @click="cjqzs">我加入的圈子</el-menu-item>
        </el-menu>
      </div>
      <div class="paddingStyle" v-if="this.flag == 1">
        <ul style="margin-left: 20px">
          <li
            class="listCircle"
            v-for="item in listValue"
            :key="item.id"
            @click="thisCirle(item.id)"
          >
            <div>
              <el-image
                class="headimgStyle"
                :src="imgValue + item.headimg"
                alt=""
              />
            </div>
            <div class="titleStyle">{{ item.title }}</div>
            <div class="titleStyles">
              <div>
                <img src="../../../assets/imgers/组 11937.png" alt="" /><span>{{
                  item.member_count
                }}</span>
              </div>
              <div>
                <img src="../../../assets/imgers/组 11938.png" alt="" /><span>{{
                  item.forum_count
                }}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="this.flag == 2" class="paddingStyle">
        <ul style="margin-left: 20px">
          <li class="listCircle" v-for="item in getCircleList" :key="item.id">
            <div>
              <el-image
                class="headimgStyle"
                :src="imgValue + item.headimg"
                alt=""
              />
            </div>
            <div class="titleStyle">{{ item.title }}</div>
            <div class="titleStyles">
              <div>
                <img src="../../../assets/imgers/组 11937.png" alt="" /><span
                  style="color: #999999"
                  >{{ item.cm_count }}</span
                >
              </div>
              <div>
                <img src="../../../assets/imgers/组 11938.png" alt="" /><span
                  style="color: #999999"
                  >{{ item.f_count }}</span
                >
              </div>
            </div>
            <div class="NumberOfComments">
              <span>99+</span>
            </div>
            <div class="gobutton">
              <i class="el-icon-arrow-right"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { CircleListCircleApi, CircleGetCircleApi } from "./circleUrl.js";
import { imgUrl } from "@/assets/js/modifyStyle.js";
import { postD } from "@/api/index.js";
export default {
  inject: ["reload"],
  data() {
    return {
      activeIndex: "1",
      listValue: [],
      imgValue: "",
      flag: true,
      flax: false,
      CircleId: {
        id: "",
      },
      CircleGetCircleShowValue: [],
      num: 2,
      // 加入的圈子
      getCircleList: [],
    };
  },
  created() {
    this.listCircleValue();
    this.getCircleValue();
  },
  methods: {
    handleSelect() {
      console.log();
    },
    listCircleValue() {
      postD(CircleListCircleApi()).then((res) => {
        this.listValue = res.list;
        this.imgValue = imgUrl();
      });
    },
    getCircleValue() {
      postD(CircleGetCircleApi()).then((res) => {
        this.getCircleList = res.list;
      });
    },
    cjqz() {
      this.flag = 1;
    },
    cjqzs() {
      this.flag = 2;
    },
    goAddcreate() {
      this.$router.push("/Circle/createCircle");
    },
    thisCirle(index) {
      this.CircleId.id = index;
      this.$router.push("/Circle/getCircleShow" + index);
    },
  },
};
</script>

<style lang="less" scoped>
.borderStyle {
  border: 1px solid #dddddd;
}
.paddingStyle {
  padding: 30px;
}
.addCircle {
  width: 460px;
  height: 180px;
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  .el-icon-plus {
    line-height: 180px;
  }
}
.listCircle {
  width: 446px;
  height: 180px;
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  margin-left: 15px;
  margin-right: 40px;
  margin-top: 20px;
  float: left;
  display: flex;
}
.headimgStyle {
  width: 160px;
  height: 160px;
  background: #0c032e;
  border-radius: 6px 6px 6px 6px;
  margin: 10px;
}
.titleStyle {
  padding: 40px 20px;
}
.titleStyles {
  text-align: left;
  margin-left: -95px;
  padding-top: 120px;
  div {
    display: inline-block;
    position: relative;
    margin-right: 50px;
    span {
      color: #999999;
      position: absolute;
      margin-top: 3px;
      margin-left: 5px;
    }
  }
}
.Release {
  position: absolute;
  top: 80px;
  right: 0;
  padding: 20px 30px;
  display: flex;
  p:nth-child(1) {
    width: 200px;
    height: 40px;
    background: #ffffff;
    border-radius: 20px 20px 20px 20px;
    line-height: 40px;
    font-size: 15px;
    margin-right: 20px;
    border: 1px solid #0c032e;
  }
  p:nth-child(2) {
    width: 200px;
    height: 40px;
    background: #ffdc00;
    border-radius: 20px 20px 20px 20px;
    line-height: 40px;
    font-size: 15px;
  }
}
.NumberOfComments {
  width: 25px;
  height: 25px;
  background: #ff0000;
  border-radius: 50%;
  margin-top: 80px;
  span {
    font-size: 2px;
    font-family: PingFang SC-Bold, PingFang SC;
    font-weight: bold;
    color: #ffffff;
    line-height: 25px;
  }
}
.gobutton {
  flex: 1;
  margin-left: auto;
  margin-top: 85px;
}
</style>