<template style="overflow:hidden;">
    <div class="detialBody">
        <div class="detialImg">
            <img :src="imagesValue + detialValueList.poster" alt="">
            <div class="sxgj">
                <span>筛选稿件</span>
            </div>
        </div>
        <div class="eventbackground">
            <div>
                123
            </div>
        </div>
    </div>
</template>

<script>
import {matchShowMatchApi} from "@/urls/wsUrl.js"
import { postD } from '@/api'
import { imgUrl } from '@/assets/js/modifyStyle'
export default {
    data() {
        return {
            detialId:{
                id:""
            },
            detialValueList:[],
            imagesValue:""
        }
    },
    created() {
        this.detialValue()
    },
    methods:{
        detialValue() {
            this.detialId.id = this.$route.params.id
            postD(matchShowMatchApi(),this.detialId).then(res=> {
                this.detialValueList = res.data
                this.imagesValue = imgUrl()
                console.log(res);
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./detial.less");
</style>