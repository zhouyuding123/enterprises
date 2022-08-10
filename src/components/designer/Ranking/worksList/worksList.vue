<template>
  <div style="padding-top: 30px">
    <div class="bodylist" v-for="(item, index) in workList" :key="index">
      <div
        class="work_num"
        :class="{
          desred: index == 0,
          desorange: index == 1,
          desyellow: index == 2,
        }"
      >
        {{ index + 1 }}
      </div>
      <div class="works_img">
        <img :src="imagesValue + item.img" alt="" />
      </div>
      <div class="works_title">
        <div class="works_title_text">{{ item.title }}</div>
        <div class="works_title_time">{{ item.time }}</div>
        <div class="works_my">
          <div class="works_myhead">
            <img :src="imagesValue + item.headerimages" alt="" />
          </div>
          <div class="works_myname">{{ item.name }}</div>
          <div class="works_mydj">
            <img src="@/assets/imgers/list.png" alt="" />
          </div>
        </div>
      </div>
      <div style="margin: 0 40px 30px auto; align-items: flex-end" class="dis">
        <div>
          <div class="aixingimg">
            <img src="@/assets/imgers/cr爱心.png" alt="" />
          </div>
          <div class="aixingnum">{{ nummore(item.aixing) }}</div>
        </div>
        <div>
          <div class="aixingimg">
            <img src="@/assets/imgers/cr评论.png" alt="" />
          </div>
          <div class="aixingnum">{{ nummore(item.aixing) }}</div>
        </div>
        <div>
          <div class="aixingimg">
            <img src="@/assets/imgers/cr收藏.png" alt="" />
          </div>
          <div class="aixingnum">{{ nummore(item.aixing) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      workList: [
        {
          headerimages:
            "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          title: "暗夜的黑天鹅-高贵与优雅只为取悦自己",
          name: "设计师昵称",
          img: "images/20220806/1659754744c406d1e49f9bfc5b31a5cf927a9c7769.png",
          time: "2022-05-17",
          aixing: "999999",
        },
        {
          headerimages:
            "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          title: "暗夜的黑天鹅-高贵与优雅只为取悦自己",
          name: "设计师昵称",
          img: "images/20220806/1659754744c406d1e49f9bfc5b31a5cf927a9c7769.png",
          time: "2022-05-17",
          aixing: "99999",
        },
        {
          headerimages:
            "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          title: "暗夜的黑天鹅-高贵与优雅只为取悦自己",
          name: "设计师昵称",
          img: "images/20220806/1659754744c406d1e49f9bfc5b31a5cf927a9c7769.png",
          time: "2022-05-17",
          aixing: "99999",
        },
      ],
    };
  },
  created() {
    this.imagesValue = imgUrl();
  },
  methods: {
      nummore(val) {
          if(String(val).length>=4) {
              return val.substring(0,String(val).length-4)+ "万"
          }else {
            return val
          }
      }
  },
};
</script>

<style lang="less" scoped>
.bodylist {
  width: 1660px;
  height: 360px;
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  margin: 10px auto;
  display: flex;

  .work_num {
    margin: auto 40px;
    width: 40px;
    height: 40px;
    background: linear-gradient(180deg, #0d042f 0%, #5d5774 100%);
    border-radius: 50%;
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    line-height: 40px;
  }
}
.works_img {
  width: 440px;
  height: 300px;
  margin-top: 30px;
  img {
    width: 440px;
    height: 300px;
  }
}
.works_title {
  margin-top: 60px;
  text-align: left;
  margin-left: 40px;
  .works_title_text {
    width: 352px;
    height: 28px;
    font-size: 20px;
    font-weight: bold;
    color: #333333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .works_title_time {
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    margin-top: 25px;
  }
}
.works_my {
  margin-top: 155px;
  display: flex;
  .works_myhead {
    width: 40px;
    height: 40px;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .works_myname {
    font-size: 18px;
    font-weight: bold;
    color: #333333;
    margin-left: 10px;
    margin-top: 10px;
  }
  .works_mydj {
    margin-left: 10px;
    margin-top: 10px;
  }
}
.aixingimg {
    margin-left: 65px;
    cursor: pointer;
}
.aixingnum {
    margin-left: 65px;
  font-size: 14px;
  font-weight: 400;
  color: #999999;
  cursor: pointer;
}
</style>