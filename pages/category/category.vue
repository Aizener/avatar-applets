<template>
	<view class="category p-30">
		<view class="category-list">
			<view class="category-list--item px-30 py-15">
				<text class="main-title fs-28">下载榜</text>
				<text class="sub-title fs-24 mt-10">Top download</text>
			</view>
			<view class="category-list--item px-30 py-15">
				<text class="main-title fs-28">热度榜</text>
				<text class="sub-title fs-24 mt-10">Top download</text>
			</view>
			<view class="category-list--item px-30 py-15">
				<text class="main-title fs-28">收藏榜</text>
				<text class="sub-title fs-24 mt-10">Top download</text>
			</view>
			<view class="category-list--item px-30 py-15">
				<text class="main-title fs-28">浏览榜</text>
				<text class="sub-title fs-24 mt-10">Top download</text>
			</view>
		</view>
		<view class="category-tag">
			<view class="category-title mt-30 fs-32 color-333">标签</view>
			<view class="category-tag--list">
				<view class="tag-item">可爱</view>
				<view class="tag-item">情头</view>
				<view class="tag-item">国王排名</view>
				<view class="tag-item">冬日头像</view>
				<view class="tag-item">冰墩墩</view>
				<view class="tag-item">一闪一闪亮晶晶</view>
				<view class="tag-item">天使</view>
			</view>
		</view>
		<view class="category-content">
			<view class="category-title mt-30 fs-32 color-333">分类</view>
			<view class="category-content--list">
				<view class="category-item" v-for="(item, idx) in 21" :key="idx">
					<image src="https://img1.baidu.com/it/u=1966616150,2146512490&fm=253&fmt=auto&app=138&f=JPEG?w=751&h=500" mode="aspectFill"></image>
					<text class="remark">女生头像</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.category {
	&-list {
		display: flex;
		flex-wrap: wrap;
		&--item {
			width: 320rpx;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin: 10rpx;
			&:nth-child(1) {
				background: linear-gradient(120deg, #2E8B57 20%, green 50%, #2E8B57 80%);
			}
			&:nth-child(2) {
				background: linear-gradient(120deg, #1E90FF	20%, #4169E1 50%, #1E90FF 80%);
			}
			&:nth-child(3) {
				background: linear-gradient(120deg, #FF69B4	20%, #FF1493 50%, #FF69B4 80%);
			}
			&:nth-child(4) {
				background: linear-gradient(120deg, #F4A460	20%, #FF8C00 50%, #F4A460 80%);
			}
		}
	}
	&-tag {
		&--list {
			display: flex;
			flex-wrap: wrap;
			.tag-item {
				font-size: 24rpx;
				padding: 15rpx 30rpx;
				margin-right: 20rpx;
				background-color: #eee;
				border-radius: 30rpx;
				margin-top: 20rpx;
			}
		}
	}
	&-content {
		&--list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.category-item {
				width: calc(50% - 10rpx);
				height: 130rpx;
				border-radius: 20rpx;
				overflow: hidden;
				position: relative;
				margin-top: 20rpx;
				image {
					width: 100%;
					height: 100%;
				}
				.remark {
					font-size: 24rpx;
					position: absolute;
					left: 20rpx;
					bottom: 20rpx;
					color: #fff;
					z-index: 10;
				}
			}
		}
	}
}
</style>
