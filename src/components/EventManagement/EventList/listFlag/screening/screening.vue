<template>
    <div>
        <div class="workBody">
            <ul  v-for="item in worksListValue" :key="item.id">
                <li>{{item}}</li>
                <li>{{item}}</li>
                <li>{{item}}</li>
                <li>{{item}}</li>
                <li>{{item}}</li>
                <li>{{item}}</li>
                <li>{{item}}</li>
                <li>{{item}}</li>
                <li>{{item}}</li>
                <li>{{item}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { postD } from '../../../../../api'
import {MatchWorksApi} from "../matchUrl.js"
export default {
    data() {
        return {
            workId:{
                id:""
            },
            worksListValue:""
        }
    },
    created() {
        this.worksList()
    },
    methods:{
        worksList() {
            this.workId.id = this.$route.params.id;
            console.log( this.workId.id);
            postD(MatchWorksApi(),this.workId).then(res=> {
                console.log(res);
                this.worksListValue = res.list
            })
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./screening.less");
</style>