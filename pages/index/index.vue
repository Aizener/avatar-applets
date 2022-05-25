<template>
	<view class="index bg-fff u-skeleton" :style="{ paddingTop: navbarHeight }">
		<view class="navbar" :style="{ height: navbarHeight }">
			<view class="flex flex-col-center">
				<text class="navbar-title">头像屋</text>
				<view class="share">
					<image class="navbar-logo" src="/static/imgs/forward.png" mode="aspectFill"></image>
					<button class="share-btn" open-type="share"></button>
				</view>
				
			</view>
			<view class="navbar-content u-skeleton-fillet">
				<view class="search flex flex-col-center" v-show="!fixedTab" @click.stop="navigatorSearchPage">
					<image class="search-logo" src="/static/imgs/search.png" mode="aspectFill"></image>
					<text class="search-text">搜索想要的头像</text>
				</view>
				<view
					class="fixed-tab"
					:class="[fixedTab ? 'fixed-tab--show' : '']"
					@click.stop
				>
					<u-tabs
						bar-width="0"
						:active-item-style="{	
							color: '#000 !important',
							background: 'linear-gradient(to right, rgb(255, 236, 38), rgb(255, 212, 4))'
						}"
						:list="tabList"
						:current="current"
						@change="change"
					></u-tabs>
				</view>	
			</view>
		</view>
		<view class="swiper u-skeleton-fillet">
			<u-swiper
				height="300"
				border-radius="16"
				bg-color="#fff"
				name="coverUrl"
				:list="list"
				:effect3d="true"
				@click="handleClickBanner"
			></u-swiper>
		</view>
		<view class="hot mt-30 px-30 u-skeleton-fillet">
			<v-title title="热门头像" operate-title="更多" @click="handleClickHotTitle"></v-title>
			<view class="hot-swiper">
				<u-swiper
					mode="none"
					height="240"
					border-radius="20"
					bg-color="#fff"
					name="imageUrl"
					:circular="false"
					:list="hotList"
					:autoplay="false"
					@click="handleClickHot"
				></u-swiper>
			</view>
		</view>
		<view class="tab px-30 u-skeleton-fillet">
			<u-tabs
				:class="[!fixedTab && 'fixed-tab--show']"
				bar-width="0"
				:active-item-style="{
					color: '#000 !important',
					background: 'linear-gradient(to right, rgb(255, 236, 38), rgb(255, 212, 4))'
				}"
				:list="tabList"
				:current="current"
				@change="change"
			></u-tabs>
		</view>
		<view class="loadmore px-30 u-skeleton-fillet">
			<view class="loadmore-list">
				<view
					class="loadmore-list--item"
					v-for="(item, idx) in flowList"
					:key="idx"
				>
					<view class="before">
						<u-loading mode="circle"></u-loading>
						<text>加载中</text>
					</view>
					<image
						:src="item.imageUrl"
						mode="aspectFill"
						@click="handleClickImage(item)"
					></image>
				</view>
			</view>
			<u-loadmore :status="status" class="flex flex-row-center py-30" />
		</view>
		<u-skeleton :loading="loadingSkeleton" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script src="./index.js"></script>

<style lang="scss">
@import './index.scss';
</style>
