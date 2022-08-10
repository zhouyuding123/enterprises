<template>
  <div style="margin-bottom:20px">
    <div class="des_List" v-for="(item, index) in derLists" :key="index">
      <div
        class="list_index"
        :class="{
          desred: index == 0,
          desorange: index == 1,
          desyellow: index == 2,
        }"
      >
        {{ index + 1 }}
      </div>
      <div class="des_Listimg">
        <img :src="imagesValue + item.img" alt="" />
      </div>
      <div class="des_Listname">{{ derList.name }}</div>
      <div style="margin-top: 38px">
        <img
          src="@/assets/imgers/list.png"
          alt=""
        />
      </div>
      <div class="cur des_listzl">助力</div>
    </div>
  </div>
</template>
<script>
import { imgUrl } from "@/assets/js/modifyStyle";
export default {
  data() {
    return {
      imagesValue: "",
      derList: {
        img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
        mylist: 1,
        name: "设计师昵称",
        grade: "@/assets/imgers/设计师等级.png",
      },
      derLists: [
        {
          img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          name: "设计师昵称",
          grade: "",
        },
        {
          img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          name: "设计师昵称",
          grade: "",
        },
        {
          img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          name: "设计师昵称",
          grade: "",
        },
        {
          img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          name: "设计师昵称",
          grade: "",
        },
        {
          img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          name: "设计师昵称",
          grade: "",
        },
        {
          img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          name: "设计师昵称",
          grade: "",
        },
        {
          img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          name: "设计师昵称",
          grade: "",
        },
        {
          img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          name: "设计师昵称",
          grade: "",
        },
        {
          img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          name: "设计师昵称",
          grade: "",
        },
        {
          img: "images/20220806/16597489830107a2677f091b40a49b4364f5403e46.png",
          name: "设计师昵称",
          grade: "",
        },
      ],
    };
  },
  created() {
    this.imagesValue = imgUrl();
  },
};
</script>
<style lang="less" scoped>
.des_List {
  width: 1660px;
  height: 100px;
  background: #ffffff;
  border-radius: 6px 6px 6px 6px;
  margin: 20px auto 0 auto;
  display: flex;
  .des_Listimg {
    margin: 10px 0px 0px 20px;
    width: 80px;
    height: 80px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }
  .list_index {
    width: 40px;
    height: 40px;
    background: linear-gradient(180deg, #0d042f 0%, #5d5774 100%);
    border-radius: 60%;
    line-height: 40px;
    font-size: 28px;
    font-weight: 800;
    color: #ffffff;
    margin-top: 30px;
    margin-left: 50px;
  }
  .des_Listname {
    margin: 40px 10px 0 16px;
  }
  .des_listzl {
    margin-left: auto !important;
    margin: 30px 40px;
    width: 120px;
    height: 40px;
    background: #483198;
    border-radius: 20px 20px 20px 20px;
    font-size: 14px;
    font-weight: 400;
    color: #ffffff;
    line-height: 40px;
    margin-left: auto;;
  }
}
.desred {
  background: #ff0000 !important;
}
.desorange {
  background: #ff8000 !important;
}
.desyellow {
  background: #ffdc00 !important;
}
</style>