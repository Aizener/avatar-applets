<template>
	<view class="loadmore px-30 py-10" :style="{ paddingTop: from === 'top' ? '112rpx' : '' }">
		<view class="loadmore-top" v-if="from === 'top'">
			<view class="list">
				<view class="list-item download" :class="[activeCategory === '下载榜' && 'active']" @click="handleSwitchCategory(0)">下载榜</view>
				<view class="list-item hot" :class="[activeCategory === '热度榜' && 'active']" @click="handleSwitchCategory(1)">热度榜</view>
				<view class="list-item like" :class="[activeCategory === '收藏榜' && 'active']" @click="handleSwitchCategory(2)">收藏榜</view>
			</view>
		</view>
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
				flowList: [],
				status: 'loadmore',
				info: null,
				page: 0,
				size: 30,
				query: {},
				from: '',
				activeCategory: ''
			};
		},
		onLoad(e) {
			this.params = JSON.parse(decodeURIComponent(e.params))
			this.from = this.params.from
			this.activeCategory = this.params.name
			this.getData()
		},
		onReady() {
			this.$setTitle(this.params.name)
		},
		onReachBottom() {
			this.page ++
			this.getImageList()
		},
		methods: {
			async getData() {
				this.setQuery()
				this.getImageList()
			},
			setQuery() {
				if (this.params.from === 'search') {
					this.query = {
						queryJson: JSON.stringify([{
							paramName: 'fuzzyQuery',
							paramValue: this.params.name,
							operator: 6
						}])
					}
				} else if (this.params.from === 'top') {
					this.query = {
						pageIndex: 0,
						pageSize: 30,
						direction: 'desc',
						sortName: this.params.field
					}
				} else if (this.params.from === 'tag') {
					this.query = {
						queryJson: JSON.stringify([{
							paramName: 'tagId',
							paramValue: this.params.tagId,
							operator: 0
						}])
					} 
				} else if (this.params.from === 'category') {
					this.query = {
						queryJson: JSON.stringify([{
							paramName: 'categoryId',
							paramValue: this.params.categoryId,
							operator: 0
						}])
					} 
				}
			},
			async getImageList() {
				this.status = 'loading'
				const res = await this.$u.api.getImageList(this.query)
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
					url: `/pages/detail/detail?info=${JSON.stringify(item)}`
				})
			},
			handleSwitchCategory(type) {
				this.activeCategory = ['下载榜', '热度榜', '收藏榜'][type]
				this.params.field = ['downloadNum', 'hotNum', 'collectionNum'][type]
				this.flowList = []
				this.getImageList()
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
	
	&-top {
		position: fixed;
		left: 0; top: 0;
		width: 100%;
		background-color: #fff;
		z-index: 10;
		display: flex;
		justify-content: center;
		padding: 30rpx 0;
		height: 112rpx;	
		.list {
			display: flex;
			justify-content: center;
			&-item {
				padding: 10rpx 30rpx;
				font-size: 24rpx;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 10rpx;
				border-radius: 30rpx;
				background-color: #ccc;
				transition: all .3s;
				&.active.download {
					background: linear-gradient(120deg, #2E8B57 20%, green 50%, #2E8B57 80%);
				}
				&.active.hot {
					background: linear-gradient(120deg, #1E90FF	20%, #4169E1 50%, #1E90FF 80%);
				}
				&.active.like {
					background: linear-gradient(120deg, #FF69B4	20%, #FF1493 50%, #FF69B4 80%);
				}
			}
		}
	}
}
</style>
