<template>
	<view class="detail p-30 u-skeleton">
		<view>
			<image class="detail-cover u-skeleton-fillet" :src="info.imageUrl" mode="aspectFill"></image>
			<view class="detail-tags mt-20 u-skeleton-fillet" v-if="info.tagList">
				<view
					class="tag fs-20 color-333"
					v-for="(item, idx) in info.tagList"
					:key="idx"
					@click="handleClickTag(item)"
				># {{ item.name }}</view>
			</view>
			<view class="detail-operate mt-20 u-skeleton-fillet">
				<view class="operate-item">
					<image class="logo" src="/static/imgs/size.png" mode="aspectFit"></image>
					<text>{{ info.width || '-' }} × {{ info.height || '-' }}</text>
				</view>
				<view class="operate-item">
					<image class="logo" src="/static/imgs/download-icon.png" mode="aspectFit"></image>
					<text>{{ info.downloadNum || '0' }}次下载</text>
				</view>
				<view class="operate-item">
					<image class="logo" src="/static/imgs/view.png" mode="aspectFit"></image>
					<text>{{ info.viewNum || '0' }}次浏览</text>
				</view>
				<view class="operate-item">
					<image class="logo" src="/static/imgs/price.png" mode="aspectFit"></image>
					<text>{{ info.price || '0' }}金币</text>
				</view>
			</view>
			<view class="detail-categories u-skeleton-fillet" v-if="info.classifyList">
				<view
					class="category color-fff fs-24"
					v-for="(item, idx) in info.classifyList"
					:key="idx"
				>{{ item.name }}</view>
			</view>
			<view class="download-btn u-skeleton-fillet" @click="handleDownload">下载图片</view>
		</view>
		<u-skeleton :loading="loadingSkeleton" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: null,
				loadingSkeleton: true
			};
		},
		onLoad(e) {
			console.log(e.info)
			const info = JSON.parse(decodeURIComponent(e.info))
			this.id = info.id
			this.name = info.name
			this.getData()
		},
		onReady() {
			this.$setTitle('图片详情-' + this.name)
		},
		methods: {
			async getData() {
				const res = await this.$u.api.getImageInfo({
					imageId: this.id
				})
				this.loadingSkeleton = false
				if (res.code === 200) {
					this.info = res.data
				}
			},
			handleClickTag(item) {
				uni.navigateTo({
					url: `/pages/flowlist/flowlist?params=${JSON.stringify({
						name: '标签-' + item.name,
						from: 'tag',
						tagId: item.id
					})}`
				})
			},
			async handleDownload() {
				const res = await this.$u.api.downloadCheck({
					imageId: this.info.id,
					uid: this.mUser.uid
				})
				if (res.code !== 200) {
					this.$toast(res.message)
					return
				}
				this.$showLoading('保存中')
				uni.downloadFile({
					url: this.info.imageUrl,
					success: file => {
						uni.saveImageToPhotosAlbum({
							filePath: file.tempFilePath,
							success: res => {
								this.getData()
								this.$toast('保存成功')
							},
							fail: err => {
								setTimeout(() => {
									this.$toast('保存失败：' + err.errMsg)
								}, 500)
							},
							complete: () => {
								this.$hideLoading()
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.detail {
	min-height: calc(100vh - var(--window-top) - var(--window-bottom));
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
	.download-btn {
		position: fixed;
		width: calc(100% - 30rpx);
		height: 90rpx;
		transform: translateX(-50%);
		left: 50%;
		bottom: 30rpx;
		background-color: orange;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
		font-size: 32rpx;
	}
}
</style>
