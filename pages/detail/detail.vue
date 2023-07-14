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
			<view class="operate-btn u-skeleton-fillet">
				<template v-if="!loadingSkeleton">
					<view class="download-btn btn" @click="handleDownload">下载</view>
					<view class="btn" :class="[info.isUserCollect === 1 && 'like-btn']" @click="handleLikeOrUnLike">{{ info.isUserCollect === 1 ? '已收藏' : '收藏' }}</view>
				</template>
			</view>
		</view>
		<NotLogin v-model="isNotLogin" />
		<u-skeleton :loading="loadingSkeleton" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	import NotLogin from '@/components/not-login.vue'
	export default {
		components: {
			NotLogin
		},
		data() {
			return {
				info: null,
				loadingSkeleton: true,
				isNotLogin: false
			};
		},
		onLoad(e) {
			const info = JSON.parse(decodeURIComponent(e.info))
			console.log('ready', info)
			this.id = info.id || info.imageId
			this.name = info.name || ''
			this.getData()	
		},
		onReady() {
			this.$setTitle('图片详情-' + this.name)
		},
		methods: {
			async getData() {
				const query = {
					imageId: this.id
				}
				if (this.mUser) {
					query.uid = this.mUser.uid
				}
				const res = await this.$u.api.getImageInfo(query)
				this.loadingSkeleton = false
				if (res.code === 200) {
					this.info = res.data
					this.name = this.info.name
					this.$setTitle('图片详情-' + this.name)
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
				if (!this.mUser) {
					this.isNotLogin = true
					return
				}
				const query = {
					imageId: this.info.id
				}
				if (this.mUser) {
					query.uid = this.mUser.uid
				}
				const res = await this.$u.api.downloadCheck(query)
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
			},
			async handleLikeOrUnLike() {
				if (!this.mUser) {
					this.isNotLogin = true
					return
				}
				const type = this.info.isUserCollect === 1 ? 0 : 1
				const res = await this.$u.api.collectImage({
					uid: this.mUser.uid,
					imageId: this.info.id,
					isCollect: type
				})
				if (res.code === 200) {
					this.info.isUserCollect = type
				} else {
					this.$toast(res.message)
				}
			}
		}
	}
</script>

<style lang="scss">
.detail {
	overflow-y: auto;
	height: calc(100vh - var(--window-top) - var(--window-bottom) - 100rpx);
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
	.operate-btn {
		position: fixed;
		width: calc(100% - 30rpx);
		left: 50%;
		transform: translateX(-50%);
		height: 90rpx;
		bottom: 30rpx;
		display: flex;
		justify-content: space-between;
		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			font-size: 32rpx;
			flex: 1;
			border-radius: 10rpx;
			color: gray;
			border: 1px solid gray;
			transition: all .3s;
		}
		.download-btn {
			color: #fff;
			border: none;
			background-color: orange;
			margin-right: 20rpx;
		}
		.like-btn {
			color: #fff;
			border: none;
			background-color: green;
		}
	}
}
</style>
