<template>
	<view class="download" v-if="info">
		<view class="download-title flex flex-col">
			<text class="main-title fs-40">下载成功</text>
			<text class="sub-title fs-28 mt-10">图片名称：{{ info.name }}</text>
		</view>
		<view class="download-top mt-20">
			<image :src="info.imageUrl" mode="aspectFill"></image>
		</view>
		<view class="download-bottom mt-20">
			<view class="info-top">
				<view class="info-item">
					<text>下载时间</text>
					<text>{{ info.createdTime | formatTime }}</text>
				</view>
				<view class="info-item">
					<text>花费金币</text>
					<text>{{ info.price }}</text>
				</view>
			</view>
			<view class="info-bottom flex flex-col py-20">
				<text class="color-333 fs-38">下载须知</text>
				<text class="color-333 fs-28 mt-10">1. 点击下载后会立即扣除金币，即使下载未成功；</text>
				<text class="color-333 fs-28 mt-10">2. 显示的图片是经过缩略处理，下载的图片将会是原图；</text>
				<text class="color-333 fs-28 mt-10">3. 下载过的图片再次下载依然会扣除金币；</text>
				<text class="color-333 fs-28 mt-10">4. 下载的图片会保存到手机相册中。</text>
			</view>
		</view>
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
.download {
	width: 100%;
	height: calc(100vh - var(--window-top) - var(--window-bottom));
	overflow-x: hidden;
	overflow-y: auto;
	background: linear-gradient(to bottom, orange 30%, #fff, #fff);
	padding: 70rpx 30rpx 30rpx 30rpx;
	&-top {
		border-radius: 20rpx 20rpx 0 0;
		background-color: #fff;
		overflow: hidden;
		padding: 20rpx;
		height: 300rpx;
		display: flex;
		justify-content: center;
		box-shadow: 0 0 5px #ccc;
		image {
			width: 200rpx;
			height: 100%;
		}
	}
	&-bottom {
		padding: 20rpx;
		background-color: #fff;
		border-radius: 0 0 20rpx 20rpx;
		box-shadow: 0 0 5px #ccc;
		.info-top {
			padding: 20rpx 0;
			.info-item {
				display: flex;
				justify-content: space-between;
				font-size: 28rpx;
				color: #333;
				padding: 5rpx 0;
			}
			border-bottom: 1px dashed #eee;
		}
	}
}
</style>
