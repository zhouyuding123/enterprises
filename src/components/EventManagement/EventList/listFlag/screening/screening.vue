<template>
  <div>
    <div class="workBody">
      <ul v-for="item in worksListValue" :key="item.id">
        <li>
          <div class="xxValue" @click="WorkDetails(item)">
            <el-image
              :src="imagesValue + item.thumb"
              alt=""
              class="thumbStyle"
            />

            <div class="titleser">
              <span>{{ item.title }}</span>
            </div>
            <div class="uservalue">
              <el-image
                :src="imagesValue + item.headimage"
                alt=""
                :preview-src-list="[imagesValue + item.headimage]"
                class="headimageStyle"
              />
              <span>{{ item.nickname }}</span>
            </div>
          </div>
          <div class="votosome">
            <div><span>投票</span></div>
            <div class="appropriate"><span>合适</span></div>
            <div class="appropriate"><span>不合适</span></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { imgUrl } from "@/assets/js/modifyStyle";
import { postD } from "../../../../../api";
import { MatchWorksApi } from "../matchUrl.js";
export default {
  provide() {
    return {
      WorkDetails: this.WorkDetails,
    };
  },
  data() {
    return {
      workId: {
        id: "",
      },
      imagesValue: "",
      worksListValue: "",
      paramsId: {
        works_id: "",
        id: "",
      },
      valser: {
        paramsId: "",
      },
    };
  },
  created() {
    this.worksList();
  },
  methods: {
    worksList() {
      this.workId.id = this.$route.params.id;
      postD(MatchWorksApi(), this.workId).then((res) => {
        this.worksListValue = res.list;
        this.imagesValue = imgUrl();
      });
    },
    WorkDetails(val) {
      this.valser.paramsId = this.$route.params.id;
      this.paramsId.works_id = val.works_id;
      this.paramsId.id = val.id;
      this.$router.push({
        name: "worksShow",
        params: {
          works_id: this.paramsId.works_id,
          id: this.paramsId.id,
          paramsId: this.valser.paramsId,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./screening.less");
</style>