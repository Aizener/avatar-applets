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
		if (this.status = 'nomore') {
			return
		}
		this.tabParams.page ++
		this.getFlowList()
	},
	onLoad() {
		this.initPage()
		this.getData()
	},
	methods: {
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
			await this.getCurrentGroupBannerList()
			await this.getHotImageList()
			await this.getRecommendClassify()
			await this.getNewImageList()
			this.loadingSkeleton = false
			// Promise.all([
			// 	this.getCurrentGroupBannerList(),
			// 	this.getHotImageList(),
			// 	this.getRecommendClassify(),
			// 	this.getNewImageList()
			// ]).then(() => {
			// 	this.loadingSkeleton = false
			// })
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
				pageSize: 10,
				direction: 'desc',
				sortName: 'viewNum'
			})
			if (res.code === 200) {
				this.hotList = res.data.content
			}
		},
		async getNewImageList() {
			this.status = 'loading'
			const res = await this.$u.api.getImageList({
				pageIndex: 0,
				pageSize: 10,
				direction: 'desc',
				sortName: 'updatedTime'
			})
			if (res.code === 200) {
				this.flowList = res.data.content
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
		async getRecommendClassify() {
			const res = await this.$u.api.getRecommendClassify()
			if (res.code === 200) {
				this.tabList.push(...res.data.list)
			}
		},
		async getFlowList() {
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
				this.flowList = res.data.content
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
		async handleClickHot(e) {
			const target = this.hotList[e]
			uni.navigateTo({
				url: `/pages/detail/detail?info=${JSON.stringify(target)}`
			})
		},
		async change(index) {
			this.current = index
			if (this.current === 0) {
				this.getNewImageList()
				return
			}
			this.getFlowList()
		}
	}
}
	