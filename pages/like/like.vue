<template>
	<view class="like" v-if="info">
		<view class="like-bg" :style="{
			background: `url(${info.imageUrl})`
		}"></view>
		<view class="like-info">
			<text class="time color-fff">{{ info.createdTime | formatTime('HH:mm') }}</text>
			<text class="date color-fff mt-10">{{ info.createdTime | formatTime('YYYY/MM/DD') }}</text>
		</view>
		<image :src="info.imageUrl" class="like-img" mode="aspectFill"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: null
			};
		},
		onLoad(e) {
			this.info = JSON.parse(decodeURIComponent(e.info))
		},
		onReady() {
			this.$setTitle('我的下载-' + this.info.name)
		}
	}
</script>

<style lang="scss">
.like {
	width: 100%;
	height: calc(100vh - var(--window-top) - var(--window-bottom));
	overflow: hidden;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	&-bg {
		position: absolute;
		left: -10%;
		top: -10%;
		width: 120%;
		height: 120%;
		filter: blur(10px);
	}
	&-info {
		position: absolute;
		left: 50%;
		top: 50rpx;
		transform: translateX(-50%);
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 30rpx;
		border-bottom: 1px solid #fff;
		.time {
			font-size: 60rpx;
		}
		.date {
			font-size: 28rpx;
		}
	}
	&-img {
		position: relative;
		z-index: 10;
		box-shadow: 0 0 5px #333;
	}
}
</style>
