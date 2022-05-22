<template>
	<view class="search p-30">
		<u-search
			placeholder="搜索想要的头像"
			:show-action="false"
			v-model="keyword"
			@search="handleSearch"
		></u-search>
		<view class="search-history">
			<view class="search-history--top flex flex-row-between flex-col-center py-30">
				<text class="fs-32 color-333">搜索历史</text>
				<u-icon size="40" name="trash" @click="handleClearHistory"></u-icon>
			</view>
			<view class="search-history--content">
				<view
					class="history-item fs-24 color-333 px-30 py-10"
					v-for="(item, idx) in searchList"
					:key="idx"
					@click="handleClickItem(item)"
				>
					{{ item }}
				</view>
				<view class="empty py-30" v-if="searchList.length === 0">暂无搜索历史</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		data() {
			return {
				keyword: ''
			};
		},
		computed: {
			...mapState(['searchList'])
		},
		methods: {
			...mapMutations(['updateState']),
			async handleSearch() {
				if (this.keyword.trim() === '') {
					return
				}
				if (!this.searchList.includes(this.keyword.trim())) {
					this.updateState({
						key: 'searchList',
						value: [this.keyword.trim(), ...this.searchList]
					})
				}
				uni.navigateTo({
					url: `/pages/flowlist/flowlist?params=${JSON.stringify({
						name: this.keyword.trim(),
						from: 'search'
					})}`
				})
			},
			handleClickItem(item) {
				this.keyword = item
				this.handleSearch()
			},
			handleClearHistory() {
				uni.showModal({
					title: '操作提醒',
					content: '请确认是否要清空搜索历史？',
					success: () => {
						this.updateState({
							key: 'searchList',
							value: []
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.search {
	&-history {
		&--content {
			display: flex;
			flex-wrap: wrap;
			.history-item {
				border-radius: 30rpx;
				background-color: #eee;
				margin-right: 20rpx;
			}
			.empty {
				width: 100%;
				background-color: #eee;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 24rpx;
			}
		}
	}
}
</style>
