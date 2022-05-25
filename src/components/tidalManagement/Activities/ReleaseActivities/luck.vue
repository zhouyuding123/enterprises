<template>
    <div class="General-activities" style="margin-left: 70px">
          <div class="GeneralImg">
            <img src="../../../../assets/imgers/抽奖.png" alt="" />
          </div>
          <div>
            <ul>
              <li>抽奖活动</li>
              <li></li>
              <li><span>发布活动</span></li>
            </ul>
          </div>
        </div>
</template>



<style lang="less" scoped>
.General-activities {
      width: 460px;
      height: 180px;
      background: #ffffff;
      border-radius: 6px 6px 6px 6px;
      display: flex;
      .GeneralImg {
        width: 100px;
        height: 100px;
        background: linear-gradient(180deg, #0c032e 0%, #5b5471 100%);
        border-radius: 50%;
        line-height: 125px;
        margin: 40px;
      }
      ul {
        padding: 40px;
        text-align: left;
        li:nth-child(1) {
          font-size: 28px;
          font-family: PingFang SC-Bold, PingFang SC;
          font-weight: bold;
          color: #333333;
        }
        li:nth-child(2) {
          width: 120px;
          height: 17px;
          font-size: 12px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          margin-top: 5px;
        }
        li:nth-child(3) {
          width: 80px;
          height: 24px;
          background: #ffdc00;
          border-radius: 15px 15px 15px 15px;
          text-align: center;
          margin-top: 10px;
          span {
            font-size: 14px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #ffffff;
            line-height: 24px;
          }
        }
      }
    }
</style>