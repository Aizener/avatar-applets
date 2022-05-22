<template>
	<view class="detail p-30" v-if="info">
		<image class="detail-cover" src="https://img2.baidu.com/it/u=3550900606,1592535269&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800" mode="aspectFill"></image>
		<view class="detail-tags my-20">
			<view
				class="tag fs-20 color-333"
				v-for="(item, idx) in info.tagName.split(',')"
				:key="idx"
			># {{ item }}</view>
		</view>
		<view class="detail-operate">
			<view class="operate-item">
				<image class="logo" src="/static/imgs/size.png" mode="aspectFit"></image>
				<text>{{ info.width }}</text>
			</view>
			<view class="operate-item">
				<image class="logo" src="/static/imgs/download-icon.png" mode="aspectFit"></image>
				<text>344次下载</text>
			</view>
			<view class="operate-item">
				<image class="logo" src="/static/imgs/view.png" mode="aspectFit"></image>
				<text>{{ info.viewNum }}次浏览</text>
			</view>
			<view class="operate-item">
				<image class="logo" src="/static/imgs/price.png" mode="aspectFit"></image>
				<text>{{ info.price }}金币</text>
			</view>
		</view>
		<view class="detail-categories">
			<view
				class="category color-fff fs-24"
				v-for="(item, idx) in info.classifyName.split(',')"
				:key="idx"
			>{{ item }}</view>
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
			this.getData()
		},
		onReady() {
			this.$setTitle('图片详情-' + this.info.name)
		},
		methods: {
			async getData() {
				const res = await this.$u.api.getImageInfo({
					imageId: this.info.id
				})
				if (res.code === 200) {
					this.info = res.data
				}
			}
		}
	}
</script>

<style lang="scss">
.detail {
	&-cover {
		width: 690rpx;
		height: 690rpx;
		border-radius: 30rpx;
	}
	&-tags {
		display: flex;
		flex-wrap: wrap;
		.tag {
			padding: 10rpx 20rpx;
			border-radius: 30rpx;
			background-color: #eee;
			margin-right: 20rpx;
		}
	}
	&-operate {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.operate-item {
			width: calc(50% - 10rpx);
			display: flex;
			align-items: center;
			background: rgb(245, 245, 245);
			border-radius: 20rpx;
			padding: 15rpx 30rpx;
			margin-bottom: 20rpx;
			.logo {
				width: 52rpx;
				height: 52rpx;
				margin-right: 20rpx;
			}
		}
	}
	&-categories {
		display: flex;
		flex-wrap: wrap;
		.category {
			padding: 8rpx 20rpx;
			margin-right: 20rpx;
			&:nth-child(3n + 1) {
				background-color: #6A5ACD;
			}
			&:nth-child(3n + 2) {
				background-color: #BA55D3;
			}
			&:nth-child(3n) {
				background-color: #FA8072;
			}
		}
	}
}
</style>
