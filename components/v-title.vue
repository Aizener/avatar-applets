<template>
	<view class="v-title flex flex-row-between flex-col-center">
		<text class="v-title--main">热门头像</text>
		<view class="v-title--operate flex flex-col-center">
			<text>更多</text>
			<u-icon class="logo" size="24" name="arrow-right"></u-icon>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		}
	}
}
</script>

<style lang="scss">
.v-title {
	&--main {
		font-size: 36rpx;
	}
	&--operate {
		color: #666;
		font-size: 28rpx;
		.logo {
			color: gray;
			margin-left: 10rpx;
		}
	}
}
</style>