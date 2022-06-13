 <template>
	<view class="" id="app" :style="{paddingTop:paddingTop+'px'}">
		<navBar v-cloak :statusBarHeight="statusBarHeight" background="none">
			<view class="flex ju-b al-c color333" style="height: 44px;">
				<u-icon name="arrow-left" color="#333" @click="back" size="18"></u-icon>
				<view class="">设计大赛</view>
				<u-icon name="search" style="visibility: hidden;" color="#fff" size="18"></u-icon>
			</view>
		</navBar>
		<view class="box" >
			<view class="bg-box flex ju-c flex-s" >
				<view class="bg-list fontw ">
					我要参赛
				</view>
			</view>
			<u-sticky :offset-top="paddingTop" id="stick">
				<view class="btn-box flex ju-b  flex-s">
					<view class="btn colorfff" @click="select(1)" :class="{actived:index==1}">赛事主题</view>
					<view class="btn colorfff" @click="select(2)" :class="{actived:index==2}">赛事介绍</view>
					<view class="btn colorfff" @click="select(3)" :class="{actived:index==3}">赛事详情</view>
				</view>
			</u-sticky>
			<!-- <scroll-view @scroll="scroll" scroll-y="true" scroll-with-animation> -->
				<view class="" id="big-box">
					<view class="" id="bgbox">
						<view class="title fontw" >
							<view class="">赛事主题</view>
							<image style="width: 85rpx;height: 127rpx;position: absolute;right: 0;top: 10rpx;" src="/static/my/2a.png" mode=""></image>
						</view>
						<view class="title-box">
							<view class="content-box">
								<view class="content">

								</view>
							</view>
						</view>
					</view>
					<view class="" id="bg">
						<view class="title fontw">
							<view class="">赛事介绍</view>
							<image style="width: 77rpx;height: 53rpx;position: absolute;left: 16rpx;top: -30rpx;" src="/static/my/@2x.png" mode=""></image>
						</view>
						<view class="title-box">
							<view class="content-box">
								<view class="content">

								</view>
							</view>
						</view>
					</view>
					<view class="">
						<view class="title fontw">
							<view class="">赛事详情</view>
							<image style="width: 157rpx;height: 108rpx;position: absolute;left: 16rpx;top: -60rpx;" src="/static/my/@2x.png" mode=""></image>
						</view>
						<view class="title-box">
							<view class="title-detail" id="box" :style="{backgroundSize:'100%'+bgheight+'px'}">
								<view class="small-box">
									<view class="padding20 text-c font12 colorfff margin-left20 small-image">
										奖金设置
									</view>
									<view class="detail-box bgfff ju-a flex">
										<view class="detail margin-bot40 font12 fontw" v-for="(item,i) in [1,2,3,4,5]"
											:key="i">一等奖100万</view>
									</view>
								</view>
								<view class="small-box margin-top40">
									<view class="padding20 text-c font12 colorfff margin-left20 small-image">
										赛事进程
									</view>
									<view class="detail-box bgfff  ">
										<view class="flex ju-b">
											<view class="flex-c al-c" v-for="(item,i) in [1,2,3]" :key="i">
												<view class="detail font12 fontw">一等奖100万</view>
												<view class="fontw font12 colorec9 margin-top12">01月01号</view>
												<view class="  colorec9">|</view>
												<view class="fontw font12 colorec9">01月01号</view>
											</view>
										</view>
										<view class="font12 colorec9 margin-bot20 margin-top40">
											评选规则：时代造就经典，经典见证时代！2021年，北京越野第一届再创经典计划，百大搞笑高校联动，高燃“脑洞”百出。评选规则：时代造就经典，经典见证时代！
											2021年，北京越野第一届再创经典计划 百大搞笑高校联动，高燃“脑洞”百出，征集数百幅佳作， 掀起全名服装热潮。
										</view>
									</view>
								</view>
								<view class="small-box margin-top40">
									<view class="padding20 text-c font12 colorfff margin-left20 small-image">
										设计说明
									</view>
									<view class="detail-box bgfff  " style="padding-bottom: 20rpx;">
										<view class="explain-list flex al-c margin-bot20"
											v-for="(item,i) in [1,2,3,4,5]" :key="i">
											<view class="colorec9 fontw">{{i+1}}</view>
											<view class="colorec9 font12 margin-left20">时代造就经典，经典见证时代！</view>
										</view>
									</view>
								</view>
								<view class="small-box margin-top40">
									<view class="padding20 text-c font12 colorfff margin-left20 small-image">
										评选标准
									</view>
									<view class="detail-box ju-a flex bgfff " style="padding-bottom: 20rpx;">
										<view class="standard-list flex-c al-c margin-bot20"
											v-for="(item,i) in [1,2,3,4,5]" :key="i">
											<view class="colorec9 fontw">{{i+1}}</view>
											<view class="colorec9 font12 margin-left20">时代造就经典，经典见证时代！</view>
										</view>
									</view>
								</view>
								<view class="small-box margin-top40">
									<view class="padding20 text-c font12 colorfff margin-left20 small-image">
										参赛须知
									</view>
									<view class="detail-box bgfff font12 colorec9 " style="padding-bottom: 40rpx;">
										评选规则：时代造就经典，经典见证时代！2021年，北京越野第一届再创经典计划，百大搞笑高校联动，高燃“脑洞”百出。评选规则：时代造就经典，经典见证时代！
										2021年，北京越野第一届再创经典计划 百大搞笑高校联动，高燃“脑洞”百出，征集数百幅佳作， 掀起全名服装热潮。
									</view>
								</view>
								<view class="small-box margin-top40">
									<view class="padding20 text-c font12 colorfff margin-left20 small-image">
										获奖通知
									</view>
									<view class="detail-box bgfff font12 colorec9 " style="padding-bottom: 40rpx;">
										评选规则：时代造就经典，经典见证时代！2021年，北京越野第一届再创经典计划，百大搞笑高校联动，高燃“脑洞”百出。评选规则：时代造就经典，经典见证时代！
										2021年，北京越野第一届再创经典计划 百大搞笑高校联动，高燃“脑洞”百出，征集数百幅佳作， 掀起全名服装热潮。
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="host-box">
						<view class="fontw color333 host font36 text-c">
							主办方
						</view>
					</view>
				</view>
			<!-- </scroll-view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statusBarHeight: 0,
				paddingTop: 0,
				id: '',
				bgheight: 1370,
				index: 1,
				bg:0,
				scrollTop:0,
				bgbox:0,
				stick:0
			}
		},
		onLoad(e) {
			this.id = e.id
			// this.getdata(e.id)
		},
		onReady() {
			var that = this
			const view = uni.createSelectorQuery();
			view.select('#bg').boundingClientRect(res=>{
				that.bg=res.height
			}).exec()
			view.select('#bgbox').boundingClientRect(res=>{
				that.bgbox=res.height
			}).exec()
			view.select("#box").boundingClientRect(data => {
				that.bgheight = data.height
			}).exec();
			view.select("#stick").boundingClientRect(data => {
				that.stick = data.height
			}).exec();
		},
		onPageScroll(e) {
			this.scrollTop=e.scrollTop
		},
		onShow() {
			var that = this
			uni.getSystemInfo({
				success(e) {
					that.statusBarHeight = e.statusBarHeight
					that.paddingTop = 44 + e.statusBarHeight
				}
			})
		},
		watch:{
			scrollTop(newval){
				if(newval<213+this.paddingTop){
					this.index=1
				}else if(newval>213+this.paddingTop && newval<213+this.paddingTop+this.bgbox){
					this.index=2
				}else if(newval>213+this.paddingTop+this.bgbox ){
					this.index=3
				}
			}
		},
		methods: {
			
			select(e) {
				this.index = e
				var number=0
				if(e==2){
					number=this.bgbox
				}else if(e==3){
					number=this.bg+this.bgbox
				}else{
					number=0
				}
				uni.pageScrollTo({
					scrollTop:213+this.paddingTop+number-this.stick+37,
					duration: 500,
				})
			},
			async getdata(e) {
				await this.$server.showMatch({
					id: e
				}).then(res => {

				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg-box {
		height: 213px;
		background: #666;
		padding: 24rpx;
		align-items: flex-end;

		// background-image: url('/static/icon/bg.png');
		// background-size: 100%;
		.bg-list {
			border-radius: 8rpx;
			width: 280rpx;
			height: 70rpx;
			color: #127AB7;
			text-align: center;
			line-height: 70rpx;
			background-image: url('/static/my/14713@2x.png');
			background-size: 100%;
		}
	}

	#big-box {
		padding-bottom: 32rpx;
		box-sizing: border-box;
	}

	.btn-box {
		padding: 12rpx 44rpx 52rpx 44rpx;

		.btn {
			width: 196rpx;
			height: 86rpx;
			box-sizing: border-box;
			text-align: center;
			line-height: 86rpx;
			background-image: url('/static/my/13742@2x.png');
			background-size: 100%;
			background-repeat: no-repeat;
			background-position: center;
			font-weight: bold;

		}

		.actived {
			color: #305EC9;
			background-image: url('/static/my/14053@2x.png');
		}
	}

	.box {
		// overflow-y: scroll;

		.title {
			height: 74rpx;
			text-align: center;
			line-height: 74rpx;
			color: #305EC9;
			position: relative;
			background-image: linear-gradient(to right, #B789F6, #B7E7FC);

		}

		.host-box {

			padding: 16rpx 44rpx;
			background: linear-gradient(91deg, #A6B4FE 0%, #FAFBFF 100%);
			box-shadow: 0px 0px 12rpx 2rpx rgba(168, 181, 254, 0.41);

			.host {
				border-radius: 8rpx;
				width: 100%;
				padding: 16rpx 0;
				text-align: center;
				background: linear-gradient(180deg, #B3E0FF 0%, #DBEEFF 100%);
			}
		}

		.title-box {
			padding: 32rpx;
			padding-bottom: 40rpx;

			.content-box {
				height: 572rpx;
				box-sizing: border-box;
				padding: 14rpx 12rpx;
				border-radius: 8rpx;
				border: 6rpx solid #6899E8;

				.content {
					width: 100%;
					height: 100%;
					// background: linear-gradient(0deg, #A8CDF9 0%, #DEF0FC 50%,  #98C5FB 100%);
					background-image: radial-gradient(#DEF0FC 10%, #A8CDF9 60%, #98C5FB 100%);
				}
			}

			.title-detail {
				background-image: url('/static/my/14021@2x.png');
				background-size: 100%;
				background-repeat: no-repeat;
				padding: 120rpx 42rpx 48rpx 42rpx;
				box-sizing: border-box;

				.small-box {
					.small-image {
						width: 146rpx;
						height: 50rpx;
						line-height: 55rpx;
						background-size: 100% 50rpx;
						background-image: url('/static/my/14054@2x.png');
						background-repeat: no-repeat;
					}

					.detail-box {
						border-radius: 20rpx;
						padding: 40rpx 20rpx 0 20rpx;
						flex-wrap: wrap;
						box-sizing: border-box;
						height: 100%;

						.detail {
							width: 160rpx;
							text-align: center;
							padding: 14rpx 0;
							border-radius: 4rpx;
							color: #305EC9;
							background: linear-gradient(90deg, #82C5FD 0%, #A2FAFD 100%);
						}

						.standard-list {
							width: 176rpx;
							height: 146rpx;
							border-radius: 4rpx;
							background: linear-gradient(90deg, #82C5FD 0%, #A2FAFD 100%);
						}

						.explain-list {
							border-radius: 4rpx;
							padding: 8rpx 20rpx 8rpx 28rpx;
							background: linear-gradient(90deg, #82C5FD 0%, #A2FAFD 100%);
						}
					}
				}
			}
		}
	}

	page {
		background-image: url('/static/my/14083@2x.png');
		background-size: 105%;
	}
</style>
