<template>
	<view class="v-title flex flex-row-between flex-col-center">
		<text class="v-title--main">{{ title }}</text>
		<view class="v-title--operate flex flex-col-center" @click="$emit('click')">
			<text>{{ operateTitle }}</text>
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
		},
		operateTitle: {
			type: String,
			required: false
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