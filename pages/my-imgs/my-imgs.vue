<template>
	<view class="my-imgs">
		<view class="w-100 flex flex-wrap" v-if="mUser">
			<view
				class="img-wrapper"
				v-for="(item, idx) in list"
				:key="idx"
				@click="handleClickItem(item)"
			>
				<image :src="item.imageUrl" mode="aspectFill" class="img"></image>
			</view>
			<u-loadmore :status="status" class="w-100 flex flex-row-center py-30" />
		</view>
		<view class="not" v-else>
			<NotLogin />
		</view>
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
				pageIndex: 0,
				list: [],
				status: 'loading'
			};
		},
		onLoad(e) {
			this.title = e.title
			const [toPage, userImageType] = this.getInfo(this.title)
			this.toPage = toPage
			this.userImageType = userImageType
			if (this.mUser) {
				this.getData()
			} else {
				this.status = 'nomore'
			}
		},
		onShow() {
			const [toPage, userImageType] = this.getInfo(this.title)
			this.toPage = toPage
			this.userImageType = userImageType
		},
		onReady() {
			this.$setTitle(this.title)
		},
		onReachBottom() {
			this.status = 'loading'
			this.pageIndex ++
			this.getData()
		},
		methods: {
			getInfo(title) {
				return {
					'我的收藏': ['/pages/like/like', 1],
					'我的下载': ['/pages/download/download', 0],
					'最近浏览': ['/pages/detail/detail', 2]
				}[title]
			},
			async getData() {
				const res = await this.$u.api.getMyImageList({
					pageIndex: this.pageIndex,
					pageSize: 30,
					uid: this.mUser.uid,
					queryJson: JSON.stringify([{
						paramName: 'userImageType',
						paramValue: this.userImageType
					}])
				})
				if (res.code === 200) {
					this.list = [...this.list, ...res.data.content]
					if (this.list.length >= res.data.totalElements) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore'
					}
				}
			},
			handleClickItem(item) {
				if (this.userImageType === 0) {
					this.toPage += `?info=${encodeURIComponent(JSON.stringify(item))}`
				} else if (this.userImageType === 1) {
					this.toPage += `?info=${encodeURIComponent(JSON.stringify(item))}`
				} else if (this.userImageType === 2) {
					this.toPage += `?info=${encodeURIComponent(JSON.stringify(item))}`
				}
				uni.navigateTo({
					url: this.toPage
				})
			}
		}
	}
</script>

<style lang="scss">
.my-imgs {
	display: flex;
	flex-direction: column;
	padding: 10rpx;
	min-height: calc(100vh - var(--window-top) - var(--window-bottom));
	.img-wrapper {
		width: 33.3%;
		height: 300rpx;
		padding: 10rpx;
		.img {
			width: 100%;
			height: 100%;
		}
	}
	.not-wrapper {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.not {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		&-login {
			transform: translateY(-100rpx);
		}
	}
}
</style>
