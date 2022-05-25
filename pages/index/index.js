import VTitle from '@/components/v-title.vue'
export default {
	components: {
		VTitle
	},
	data() {
		return {
			title: 'Hello',
			navbarHeight: '160rpx',
			fixedTab: false,
			list: [],
			hotList: [],
			tabParams: {
				page: 0,
				size: 30
			},
			tabList: [{
				name: '最新头像'
			}],
			current: 0,
			flowList: [],
			status: 'loadmore',
			loadingSkeleton: true
		}
	},
	onPullDownRefresh() {
		this.tabList = [{
			name: '最新头像'
		}]
		this.$showLoading('刷新中')
		this.initState()
		setTimeout(() => {
			uni.stopPullDownRefresh()
			this.$hideLoading()
		}, 500)
	},
	onPageScroll(e) {
			if (e.scrollTop >= this.tabTop) {
			this.sTop = this.sTop === 0 ? e.scrollTop : this.sTop
			this.fixedTab = true
		} else {
			this.sTop = 0
			this.fixedTab = false
		}
	},
	onReachBottom() {
		if (this.status === 'nomore') {
			return
		}
		if (this.current === 0) {
			this.newPageIndex ++
			this.getNewImageList()
		} else {
			this.tabParams.page ++
			this.getFlowList()
		}
	},
	onLoad() {
		this.initState()
	},
	methods: {
		async initState() {
			this.newPageIndex = 0
			this.oldCurrent = this.current
			this.initPage()
			await this.getData()
		},
		navigatorSearchPage() {
			uni.navigateTo({
				url: '/pages/search/search'
			})
		},
		initPage() {
			const info = uni.getSystemInfoSync()
			const menuButton = uni.getMenuButtonBoundingClientRect()
			this.navbarHeight = menuButton.bottom + (menuButton.top - info.statusBarHeight) * 2 + info.statusBarHeight + 160 + 'rpx'
			uni.createSelectorQuery().in(this).select('.tab').boundingClientRect(res => {
				this.tabTop = res.top - res.height
			}).exec()
		},
		async getData() {
			Promise.all([
				this.getCurrentGroupBannerList(),
				this.getHotImageList(),
				this.getRecommendClassify(),
			]).then(() => {
				this.getNewImageList()
				this.loadingSkeleton = false
			})
		},
		async getCurrentGroupBannerList() {
			const res = await this.$u.api.getCurrentGroupBannerList()
			if (res.code === 200) {
				this.list = res.data.bannerList
			}
		},
		async getHotImageList() {
			const res = await this.$u.api.getImageList({
				pageIndex: 0,
				pageSize: 5,
				direction: 'desc',
				sortName: 'viewNum'
			})
			if (res.code === 200) {
				this.hotList = res.data.content
				this.hotList.push({
					imageUrl: '/static/imgs/more.png'
				})
			}
		},
		async getNewImageList() {
			if (this.newPageIndex > 5) {
				this.status = 'nomore'
				return
			}
			this.status = 'loading'
			const res = await this.$u.api.getImageList({
				pageIndex: this.newPageIndex,
				pageSize: 30,
				direction: 'desc',
				sortName: 'updatedTime'
			})
			if (res.code === 200) {
				if (this.newPageIndex === 0) {
					this.flowList = res.data.content
				} else {
					this.flowList = [...this.flowList, ...res.data.content]
				}
				if (this.flowList.length >= res.data.totalElements) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore'
				}
			}
		},
		async getRecommendClassify() {
			const res = await this.$u.api.getRecommendClassify()
			if (res.code === 200) {
				this.tabList.push(...res.data.list)
			}
		},
		async getFlowList() {
			if (this.tabParams.pageIndex > 5) {
				this.status = 'nomore'
				return
			}
			this.status = 'loading'
			const res = await this.$u.api.getClassifyImageList({
				pageIndex: this.tabParams.page,
				pageSize: this.tabParams.size,
				queryJson: JSON.stringify([{
					paramName: 'classifyId',
					paramValue: this.tabList[this.current].id,
					operator: 0
				}])
			})
			if (res.code === 200) {
				if (this.tabParams.pageIndex === 0) {
					this.flowList = res.data.content
				} else {
					this.flowList = [...this.flowList, ...res.data.content]
				}
				if (this.flowList.length >= res.data.totalElements) {
					this.status = 'nomore'
				} else {
					this.status = 'loadmore'
				}
				uni.pageScrollTo({
					scrollTop: this.sTop + Math.random() * .1,
					duration: 300
				})
			}
		},
		async handleClickBanner(e) {
			const target = this.list[e]
			switch(target.type) {
				case 0:
					uni.navigateTo({
						url: `/pages/detail/detail?info=${JSON.stringify(target)}`
					})
					break
				case 1:	
				case 2:
				case 3:
					// uni.navigateTo({
					// 	url: `/pages/flowlist/flowlist?info=${JSON.stringify(target)}`
					// })
				case 4:
					this.$toast('暂无' + target.name + '功能')
					break
			}
		},
		handleClickHotTitle() {
			uni.navigateTo({
				url: `/pages/flowlist/flowlist?params=${JSON.stringify({
					name: '热度榜',
					from: 'top',
					field: 'viewNum'
				})}`
			})
		},
		handleClickImage(target) {
			uni.navigateTo({
				url: `/pages/detail/detail?info=${encodeURIComponent(JSON.stringify(target))}`
			})
		},
		async handleClickHot(e) {
			if (e === this.hotList.length - 1) {
				this.handleClickHotTitle()
				return
			}
			const target = this.hotList[e]
			uni.navigateTo({
				url: `/pages/detail/detail?info=${encodeURIComponent(JSON.stringify(target))}`
			})
		},
		async change(index) {
			this.status = 'loading'
			this.current = index
			this.newPageIndex = 0
			this.tabParams.pageIndex = 0
			if (this.current === 0) {
				await this.getNewImageList()
				return
			}
			await this.getFlowList()
			uni.pageScrollTo({
				scrollTop: this.sTop + Math.random() * .1,
				duration: 300
			})
		}
	}
}
	