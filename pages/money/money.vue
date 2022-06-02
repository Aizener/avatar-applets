<template>
	<view class="money">
		<image src="/static/imgs/score.png" mode="aspectFit" class="logo"></image>
		<view class="content">
			<view class="value">{{ coin }}</view>
			<view class="remark">当前可用金币</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				coin: 0
			};
		},
		onLoad() {
			this.totalTime = 1000
			this.time = 0
			this.times = Math.ceil(this.totalTime / 16)
			this.a = this.mUser.coin / (this.times * this.times)
			this.coin = this.mUser.coin
			// this.countUp()
		},
		methods: {
			countUp() {
				this.timer = setInterval(() => {
					this.time += 16
					if (this.time > this.totalTime) {
						this.coin = this.mUser.coin
						clearInterval(this.timer)
						return
					}
				}, 16)
			}
		}
	}
</script>

<style lang="scss">
.money {
	position: relative;
	padding: 30rpx;
	display: flex;
	justify-content: center;
	top: 60rpx;
	.logo {
		width: 120rpx;
		height: 120rpx;
		position: absolute;
		transform: translateY(-50%);
	}
	.content {
		width: 100%;
		color: #fff;
		height: 280rpx;
		background: linear-gradient(140deg, rgb(116, 161, 252) 30%, rgb(131, 113, 241));
		border-radius: 30rpx;
		box-shadow: 0 0 5px #eee;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		.value {
			font-size: 52rpx;
		}
		.remark {
			font-size: 26rpx;
			margin-top: 10rpx;
		}
	}
}
</style>
