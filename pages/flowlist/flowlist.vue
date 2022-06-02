<template>
	<view class="loadmore px-30 py-10" :style="{ height: pageHeight + 'px' }">
		<view class="loadmore-top" v-if="from === 'top'">
			<view class="list">
				<view class="list-item download" :class="[activeCategory === '下载榜' && 'active']" @click="handleSwitchCategory(0)">下载榜</view>
				<view class="list-item hot" :class="[activeCategory === '热度榜' && 'active']" @click="handleSwitchCategory(1)">热度榜</view>
				<view class="list-item like" :class="[activeCategory === '收藏榜' && 'active']" @click="handleSwitchCategory(2)">收藏榜</view>
			</view>
		</view>
		<view class="loadmore-list" :style="{ marginTop: from === 'top' ? '112rpx' : '0', transform: `translateY(${tTop}px)` }">
			<view
				class="loadmore-list--item"
				v-for="(item, idx) in virtualList"
				:key="item.id"
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
				virtualList: [],
				status: 'loadmore',
				pageHeight: 0,
				info: null,
				pageIndex: 0,
				size: 30,
				query: {},
				from: '',
				tTop: 0,
				activeCategory: ''
			};
		},
		async onLoad(e) {
			this.params = JSON.parse(decodeURIComponent(e.params))
			this.from = this.params.from
			this.activeCategory = this.params.name
			this.lastScrollTop = -1
			await this.getData()
		},
		async onReady() {
			this.$setTitle(this.params.name)
			this.rowHeight = 115
			this.pageHeight = uni.getSystemInfoSync().windowHeight
			this.pageRowNums = Math.ceil((this.pageHeight - (this.from === 'top' ? 56 : 0)) / this.rowHeight)
			this.scrollTop = 0
			this.lastStart = -1
			this.safeRowNums = this.pageRowNums
			this.handle = this.throttle(this.setVirtualList)
		},
		async onPageScroll(e) {
			this.scrollTop = e.scrollTop
			// this.setVirtualList()
			this.handle()
		},
		onReachBottom(e) {
			this.pageIndex ++
			this.setQuery()
			this.getImageList()
		},
		methods: {
			throttle(func, delay = 50) {
				let timer = null
				return function () {
					if (timer) {
						return
					}
					this.listTimer = setTimeout(() => {
						func.apply(this, arguments)
						this.listTimer && clearTimeout(this.listTimer)
						this.listTimer = null
					}, delay)
				}
			},
			async setVirtualList() {
				if (this.lastScrollTop === this.scrollTop) {
					return
				}
				const notFloortStart = this.scrollTop / this.rowHeight
				const start = Math.floor(notFloortStart)
				if (Math.abs(notFloortStart - this.lastStart) < 1) {
					if (this.scrollTop <= 10) {
						this.tTop = 0
					}
					return
				}
				this.lastScrollTop = this.scrollTop
				this.lastStart = notFloortStart
				const end = start + this.safeRowNums
				this.sliceStart = start < this.safeRowNums ? 0 : start - this.safeRowNums
				this.sliceEnd = end > this.totalRowNums - this.safeRowNums ? this.totalRowNums : start + this.pageRowNums + this.safeRowNums
				this.virtualList = this.flowList.slice(this.sliceStart * 3, this.sliceEnd * 3)
				this.tTop = Math.round(this.scrollTop) - (start > this.safeRowNums ? this.safeRowNums * this.rowHeight : start * this.rowHeight)
				console.log(this.scrollTop, start, end, this.tTop, this.lastStart, start)
			},
			async getPageHeight() {
				const res = await this.$getBounding('.loadmore')
				return res.height
			},
			async getData() {
				await this.setQuery()
				await this.getImageList()
			},
			setQuery() {
				this.query = {
					pageIndex: this.pageIndex,
					pageSize: 30
				}
				this.requestMethod = this.$u.api.getImageList
				if (this.params.from === 'search') {
					Object.assign(this.query, {
						queryJson: JSON.stringify([{
							paramName: 'fuzzyQuery',
							paramValue: this.params.name.split('-')[1],
							operator: 6
						}])
					})
				} else if (this.params.from === 'top') {
					Object.assign(this.query, {
						queryJson: JSON.stringify([{
							direction: 'desc',
							sortName: this.params.field,
							operator: 0
						}])
					})
				} else if (this.params.from === 'tag') {
					Object.assign(this.query, {
						queryJson: JSON.stringify([{
							paramName: 'tagId',
							paramValue: this.params.tagId,
							operator: 0
						}])
					})
				} else if (this.params.from === 'category') {
					this.requestMethod = this.$u.api.getClassifyImageList
					Object.assign(this.query, {
						queryJson: JSON.stringify([{
							paramName: 'classifyId',
							paramValue: this.params.classifyId,
							operator: 0
						}])
					})
				}
			},
			async getImageList() {
				this.status = 'loading'
				const res = await this.requestMethod(this.query)
				if (res.code === 200) {
					if (this.flowList.length >= res.data.totalElements) {
						this.status = 'nomore'
					} else {
						this.status = 'loadmore'
					}
					if (!this.totalRowNums) {
						this.totalRowNums = Math.ceil(res.data.totalElements / 3)
					}
					this.flowList = [...this.flowList, ...res.data.content]
					if (this.pageIndex > 0) {
						this.pageHeight += Math.ceil(res.data.content.length / 3) * 115
					} else {
						this.setVirtualList()
					}
				}
			},
			handleClickItem(item) {
				uni.navigateTo({
					url: `/pages/detail/detail?info=${encodeURIComponent(JSON.stringify(item))}`
				})
			},
			handleSwitchCategory(type) {
				this.activeCategory = ['下载榜', '热度榜', '收藏榜'][type]
				this.params.field = ['downloadNum', 'hotNum', 'collectionNum'][type]
				this.pageHeight = uni.getSystemInfoSync().windowHeight
				this.pageRowNums = Math.ceil((this.pageHeight - (this.from === 'top' ? 56 : 0)) / this.rowHeight)
				this.lastStart = -1
				this.safeRowNums = this.pageRowNums
				this.virtualList = []
				this.flowList = []
				this.pageIndex = 0
				this.getImageList()
			},
			redirectToIndexPage() {
				uni.switchTab({
					url: '/pages/category/category',
					fail: err => {
						console.log(err)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.loadmore {
	overflow-x: hidden;
	&-list {
		display: flex;
		flex-wrap: wrap;
		position: absolute;
		overflow-x: hidden;
		width: 100%;
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
