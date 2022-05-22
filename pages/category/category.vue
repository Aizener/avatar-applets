<template>
	<view class="category p-30 skeleton">
		<view class="category-list u-skeleton-fillet">
			<view class="category-list--item px-30 py-15" @click="navigatorFlowList(0)">
				<text class="main-title fs-28">下载榜</text>
				<text class="sub-title fs-24 mt-10">Top download</text>
			</view>
			<view class="category-list--item px-30 py-15" @click="navigatorFlowList(1)">
				<text class="main-title fs-28">热度榜</text>
				<text class="sub-title fs-24 mt-10">Top download</text>
			</view>
			<view class="category-list--item px-30 py-15" @click="navigatorFlowList(2)">
				<text class="main-title fs-28">收藏榜</text>
				<text class="sub-title fs-24 mt-10">Top download</text>
			</view>
		</view>
		<view class="category-tag u-skeleton-fillet">
			<view class="category-title mt-30 fs-32 color-333">标签</view>
			<view class="category-tag--list">
				<view
					class="tag-item"
					v-for="(item, idx) in categories"
					:key="idx"
					@click="handleClickTag(item)"
				>{{ item.name }}</view>
			</view>
		</view>
		<view class="category-content u-skeleton-fillet">
			<view class="category-title mt-30 fs-32 color-333">分类</view>
			<view class="category-content--list">
				<view
					class="category-item"
					v-for="(item, idx) in categories"
					:key="idx"
					@click="handleClickCategory(item)"
				>
					<image :src="item.coverUrl || '/static/imgs/category-bg.jpeg'" mode="aspectFill"></image>
					<text class="remark">{{ item.name }}</text>
				</view>
			</view>
		</view>
		<u-skeleton :loading="loadingSkeleton" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				categories: [],
				tags: [],
				loadingSkeleton: true
			};
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData() {
				Promise.all([
					this.getAllClassify(),
					this.getTagList()
				]).finally(() => {
					this.loadingSkeleton = false
				})
			},
			async getAllClassify() {
				const res = await this.$u.api.getAllClassify()
				if (res.code === 200) {
					this.categories = res.data.list
				}
			},
			async getTagList() {
				const res = await this.$u.api.getTagList()
				if (res.code === 200) {
					this.tags = res.data.list
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
			handleClickCategory(item) {
				uni.navigateTo({
					url: `/pages/flowlist/flowlist?params=${JSON.stringify({
						name: '分类-' + item.name,
						from: 'category',
						categoryId: item.id
					})}`
				})
			},
			navigatorFlowList(type) {
				const names = ['下载榜', '热度榜', '收藏榜']
				const fields = ['downloadNum', 'viewNum', 'collectNum']
				uni.navigateTo({
					url: `/pages/flowlist/flowlist?params=${JSON.stringify({
						name: names[type],
						from: 'top',
						field: fields[type]
					})}`
				})
			}
		}
	}
</script>

<style lang="scss">
.category {
	min-height: calc(100vh - var(--window-top) - var(--window-bottom));
	&-list {
		display: flex;
		flex-wrap: wrap;
		&--item {
			flex: 1;
			color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin: 10rpx;
			&:nth-child(1) {
				background: linear-gradient(120deg, #2E8B57 20%, green 50%, #2E8B57 80%);
			}
			&:nth-child(2) {
				background: linear-gradient(120deg, #1E90FF	20%, #4169E1 50%, #1E90FF 80%);
			}
			&:nth-child(3) {
				background: linear-gradient(120deg, #FF69B4	20%, #FF1493 50%, #FF69B4 80%);
			}
			&:nth-child(4) {
				background: linear-gradient(120deg, #F4A460	20%, #FF8C00 50%, #F4A460 80%);
			}
		}
	}
	&-tag {
		&--list {
			display: flex;
			flex-wrap: wrap;
			.tag-item {
				font-size: 24rpx;
				padding: 15rpx 30rpx;
				margin-right: 20rpx;
				background-color: #eee;
				border-radius: 30rpx;
				margin-top: 20rpx;
			}
		}
	}
	&-content {
		&--list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			.category-item {
				width: calc(50% - 10rpx);
				height: 130rpx;
				border-radius: 20rpx;
				overflow: hidden;
				position: relative;
				margin-top: 20rpx;
				&::after {
					content: '';
					position: absolute;
					left: 0; top: 0;
					width: 100%;
					height: 100%;
					box-shadow: 0 -15px 20px inset #333;
				}
				image {
					width: 100%;
					height: 100%;
				}
				.remark {
					font-size: 24rpx;
					position: absolute;
					left: 20rpx;
					bottom: 20rpx;
					color: #fff;
					z-index: 10;
				}
			}
		}
	}
}
</style>
