<template>
	<view class="my">
		<view class="my-login">
			<view class="my-login--avatar flex flex-col-center">
				<image :src="mUser ? mUser.avatarUrl : '/static/imgs/avatar.png'" mode="aspectFill"></image>
				<view class="my-login--remark flex flex-col py-20 ml-30">
					<text class="remark1 fs-36 color-333">{{ mUser ? mUser.name : '用户登录' }}</text>
					<text class="remark2 fs-24 color-999 mt-10" v-if="!mUser">点击登录，可以发现更多精彩内容哦~</text>
				</view>
				<button
					class="my-login--btn"
					@click="getUserInfo"
					v-if="!mUser"
				></button>
			</view>
		</view>
		<view
			class="my-list px-30"
			v-for="(items, idx) in list"
			:key="idx"
		>
			<view
				class="my-list--item flex flex-row-between flex-col-center py-20"
				v-for="(item, itemIdx) in items"
				:key="itemIdx"
			>
				<view class="left flex flex-col-center">
					<image :src="item.logo" mode="aspectFit"></image>
					<text class="ml-20">{{ item.title }}</text>
				</view>
				<u-icon class="right" size="24" name="arrow-right"></u-icon>
			</view>
		</view>
		<view class="version color-ccc fs-20 p-fixed w-100i text-center">版本号 v0.0.11</view>
	</view>
</template>

<script>
	import { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				list: [
					[
						{ logo: require('@/static/imgs/score.png'), title: '我的金币' },
						{ logo: require('@/static/imgs/like.png'), title: '我的收藏' }
					],
					[
						{ logo: require('@/static/imgs/download.png'), title: '我的下载' },
						{ logo: require('@/static/imgs/history.png'), title: '最近浏览' }
					],
					[
						{ logo: require('@/static/imgs/report.png'), title: '意见反馈' },
						{ logo: require('@/static/imgs/about.png'), title: '关于我们' }
					]
				]
			};
		},
		onPullDownRefresh() {
			this.$showLoading('刷新中')
			setTimeout(() => {
				this.$hideLoading()
				uni.stopPullDownRefresh()
			})
		},
		methods: {
			...mapMutations('userStore', ['muUpdateUser']),
			getUserInfo() {
				let code = ''
				uni.login({
					provider: 'weixin',
					success: res => {
						code = res.code
					}
				})
				
				uni.getUserProfile({
					desc: '方便系统为你更好的服务~',
					success: async e => {
						if (e.errMsg === 'getUserProfile:ok') {
							const { encryptedData, iv } = e
							const res = await this.$u.api.login({ encryptedData, iv, code })
							
							if (res.code === 200) {
								this.muUpdateUser(res.data)
							}
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
.my-login {
	&--avatar {
		position: relative;
		margin: 30rpx;
		padding: 30rpx;
		box-shadow: 0 0 5px #eee;
		image {
			width: 112rpx;
			height: 112rpx;
			border: 1px solid #eee;
			border-radius: 50%;
		}
		.remark2 {
			
		}
	}
	&--btn {
		position: absolute;
		left: 0; top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
}
.my-list {
	margin: 30rpx;
	box-shadow: 0 0 5px #eee;
	&--item {
		border-bottom: 1px solid rgb(245, 245, 245);
		&:last-child {
			border-bottom: none;
		}
		image {
			width: 52rpx;
			height: 52rpx;
		}
	}
}

.version {
	bottom: 30rpx;
}
</style>
