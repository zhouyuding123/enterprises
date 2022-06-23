<template>
  <div>
    <div class="listPadding">
      <div class="seatch_list">
        <i
          class="el-icon-search"
          style="position: absolute; margin: 12px 0 0 20px; color: #dddddd"
        ></i>
        <el-input v-model="seatch.keyword" placeholder="请输入内容"></el-input>
        <div class="buttom_seatch">
          <span> 搜索 </span>
        </div>
      </div>
    </div>
    <div class="listpad">
        <div class="listent" v-for="item in entvalue" :key="item.id" @click="JumpDetails(item)">
            <div class="listentImg"><img :src="imagesValue + item.thumb" alt=""></div>
            <div class="listvalue">
                <div class="listvaluetitle"><span>{{item.title}}</span></div>
                <div class="listvaluedescription"><span>{{item.description}}</span></div>
            </div>
            <div class="listvalueright">
                <div class="listvaluerighttime"><span>投稿截止至{{ fullTime(item.sign_end_time)}}</span></div>
                <div class="listvaluerightnum"><span>{{item.part_num}}人已参与</span></div>
            </div>
        </div>
        <div class="pager">
      <vxe-pager
        :current-page="entId.offset"
        :page-size="entId.limit"
        :total="entId.totalResult"
        :layouts="[
          'PrevPage',
          'JumpNumber',
          'NextPage',
          'FullJump',
         
          'Total',
        ]"
        align="center"
        @page-change="handlePageChangeActivity"
      ></vxe-pager>
    </div>
    </div>
  </div>
</template>


<script> 
import {matchListMacthApi} from "@/urls/wsUrl.js"
import { postD } from '@/api';
import { imgUrl } from '@/assets/js/modifyStyle';
export default {
  data() {
    return {
        imagesValue:"",
      seatch: {
        keyword: "",
      },
      entId:{
          is_platform:"2",
          limit:3,
          offset:1,
          totalResult: 0,
      },
      entvalue:[],
    };
  },
  created() {
      this.entList();
      this.imagesValue = imgUrl()
  },
  methods: {
      entList() {
          postD(matchListMacthApi(),this.entId).then(res=> {
            this.entvalue = res.list;
            this.entId.totalResult = res.count;
            console.log(this.entvalue);
          })
      },
      fullTime(val) {
      let newDate = /\d{4}-\d{1,2}-\d{1,2}/g.exec( val )
      return newDate[0]
    },
    handlePageChangeActivity({ currentPage, pageSize }) {
      this.entId.offset = currentPage;
      this.entId.limit = pageSize;
      postD(matchListMacthApi(), this.entId).then((res) => {
        this.entvalue = res.list;
        this.entId.totalResult = res.count;
      });
    },
    JumpDetails(val) {
      this.$router.push("/match/detial" + val.id); 
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./enterpriseEvents.less");
</style>