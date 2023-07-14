<template>
	<view class="about p-30">
		<u-parse class="about-content" :html="content"></u-parse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content: ''
			};
		},
		onLoad() {
			this.content = `
				喵呜头像社正式起航啦！<br /><br />
				你可以在这里找到属于你的头像，找到适合你心情的文案，找到你喜欢的壁纸！<br /><br />
				希望你在使用过程中有任何问题可以向我们反馈，我们会在第一时间修复！<br /><br />
				祝愿我们未来越来越好！<br /><br />
			`
		}
	}
</script>

<style lang="scss">

</style>
