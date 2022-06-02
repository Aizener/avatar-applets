<template>
	<view class="feedback p-30">
		<view v-if="mUser">
			<u-input
				border="1"
				type="textarea"
				height="300"
				placeholder="请输入建议内容(最多200字)"
				maxlength="200"
				v-model="content"
			/>
			<view class="feedback-btn" @click="handleSubmit">提交建议</view>
		</view>
		<view class="not" v-else>
			<NotLogin />
		</view>
	</view>
</template>

<script>
	import NotLogin from '@/components/not-login.vue'
	export default {
		data() {
			return {
				content: ''
			};
		},
		components: {
			NotLogin
		},
		methods: {
			async handleSubmit() {
				if (!this.mUser) {
					this.$toast('请先登录哦~')
					return
				}
				if (this.content.trim() === '') {
					this.$toast('请输入建议内容')
					return
				}
				const res = await this.$u.api.pushUserFeedback({
					uid: this.mUser.uid,
					content: this.content
				})
				if (res.code) {
					this.$toast(res.message)
					setTimeout(() => {
						uni.navigateBack()
					}, 500)
				}
			}
		}
	}
</script>

<style lang="scss">
.feedback {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top) - var(--window-bottom));
	&-btn {
		margin-top: 30rpx;
		width: 100%;
		height: 90rpx;
		background-color: orange;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #fff;
	}
	.not {
		flex: 1;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		&-login {
			transform: translateY(-100rpx);
		}
	}
}
</style>
