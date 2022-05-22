<template>
	<view class="loadmore px-30 py-10">
		<view class="loadmore-list">
			<view
				class="loadmore-list--item"
				v-for="(item, idx) in flowList"
				:key="idx"
			>
				<view class="before">
					<u-loading mode="circle"></u-loading>
					<text>加载中</text>
				</view>
				<image
					:src="item.imageUrl"
					mode="aspectFill"
					@click="handleClickItem(item)"
				></image>
			</view>
		</view>
		<view class="empty" v-if="!(flowList.length > 0 || status !== 'nomore')">
			<u-empty mode="list"></u-empty>
			<view class="back-btn" @click="redirectToIndexPage">去分类找找</view>
		</view>
		<u-loadmore v-if="flowList.length > 0 || status !== 'nomore'" :status="status" class="flex flex-row-center py-30" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				flowList: [
					// { imageUrl: 'https://img0.baidu.com/it/u=3594725999,1437276298&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281' },
					// { imageUrl: 'https://img2.baidu.com/it/u=1305248331,3698728375&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500' },
					// { imageUrl: 'https://img1.baidu.com/it/u=1335955050,3868593504&fm=253&fmt=auto&app=120&f=JPEG?w=1200&h=502' },
					// { imageUrl: 'https://img1.baidu.com/it/u=1875739781,4152007440&fm=253&fmt=auto&app=120&f=JPEG?w=1024&h=576' },
					// { imageUrl: 'https://img2.baidu.com/it/u=924133470,1725987117&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=281' },
					// { imageUrl: 'https://img0.baidu.com/it/u=155276595,173864794&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500' },
				],
				status: 'loadmore',
				info: null,
				page: 0,
				size: 30
			};
		},
		onLoad(e) {
			this.params = JSON.parse(decodeURIComponent(e.params))
			this.getData()
		},
		onReady() {
			this.$setTitle(this.params.name)
		},
		methods: {
			async getData() {
				this.getImageList()
			},
			async getImageList() {
				this.status = 'loading'
				const res = await this.$u.api.getImageList({
					queryJson: JSON.stringify([{
						paramName: 'fuzzyQuery',
						paramValue: this.params.name,
						operator: 6
					}])
				})
				if (res.code === 200) {
					if (this.flowList.length >= res.data.totalElements) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore'
					}
					this.flowList = [...this.flowList, ...res.data.content]
				}
			},
			handleClickItem(item) {
				uni.navigateTo({
					url: '/pages/detail/detail',
					info: JSON.stringify(item)
				})
			},
			redirectToIndexPage() {
				uni.redirectTo({
					url: '/pages/category/category'
				})
			},
		}
	}
</script>

<style lang="scss">
.loadmore {
	&-list {
		display: flex;
		flex-wrap: wrap;
		&--item {
			width: 230rpx;
			height: 230rpx;
			position: relative;
			padding: 10rpx;
			position: relative;
			.before {
				position: absolute;
				left: 10rpx;
				top: 10rpx;
				right: 10rpx;
				bottom: 10rpx;
				border-radius: 20rpx;
				background-color: rgb(245, 245, 245);
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				text {
					color: gray;
					margin-top: 10rpx;
				}
			}
			image {
				width: 100%;
				height: 100%;
				border-radius: 20rpx;
				position: relative;
				z-index: 2;
			}
		}
	}
	
	.empty {
		width: 100%;
		height: calc(100vh - var(--window-top) - var(--window-bottom));
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.back-btn {
			width: 240rpx;
			height: 70rpx;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50rpx;
			margin-top: 20rpx;
			background-color: orange;
		}
	}
}
</style>
