<template>
	<u-popup mode="center" border-radius="30" v-model="value">
		<view class="not">
			<image src="/static/imgs/score.png" mode="aspectFit" class="not-logo"></image>
			<view class="not-content">
				<text class="not-tip">为了更好的用户体验，请先登录吧~</text>
				<view class="not-confirm" @click="redirectToIndexPage">去登录</view>
				<view class="not-cancel" @click="$emit('input', false)">暂不登录</view>
			</view>
		</view>
	</u-popup>
</template>

<script>
	export default {
		name:"not-login",
		props: {
			value: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			redirectToIndexPage() {
				uni.switchTab({
					url: '/pages/my/my'
				})
			}
		}
	}
</script>

<style lang="scss">
.not {
	padding: 60rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	&-tip {
		color: #333;
		font-size: 24rpx;
		margin: 30rpx 0;
	}
	&-logo {
		width: 128rpx;
		height: 128rpx;
		margin-top: -90rpx;
		position: fixed;
		z-index: 10;
		transform: translateY(-120rpx);
	}
	&-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 50rpx;
	}
	&-confirm {
		padding: 20rpx 50rpx;
		font-size: 24rpx;
		color: #fff;
		border-radius: 50rpx;
		background: linear-gradient(135deg, orange, darkorange);
	}
	&-cancel {
		font-size: 24rpx;
		color: gray;
		margin-top: 30rpx;
	}
}
</style>