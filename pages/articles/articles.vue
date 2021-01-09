<template>
	<view>
		<u-tabs :list="tab_list" :is-scroll="true" :current="current" @change="change" bar-width="120"></u-tabs>
		<view class="list">
			<view class="list-item" v-for="(item, index) in 6" :key="index" @click="goUrlAndStorage()">
				<view class="list-left">
					<image src="../../static/banner.jpg" mode=""></image>
				</view>
				<view class="list-right">
					<view class="list-title">文章标题</view>
					<view class="list-other">文章简介</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				tab_list: [{
					name: '商会简介'
				}, {
					name: '商会动态'
				}, {
					name: '商会掠影'
				}, {
					name: '商务中心'
				}, {
					name: '联系我们'
				}, {
					name: '招纳贤士'
				}, {
					name: '行业资讯'
				}],
			};
		},
		onLoad(options) {
			// console.log(options)
			this.current = options.index
		},
		methods: {
			change(e) {
				this.current = e
			}
		}
	}
</script>

<style lang="less">
	.list {
		margin-top: 10rpx;

		.list-item {
			display: flex;
			position: relative;
			background-color: #fff;
			// margin: 10rpx 0;
			padding: 10rpx;
			border-top: 1px solid #efefef;
			border-bottom: 1px solid #efefef;

			.list-left {
				width: 20vw;

				image {
					width: 20vw;
					height: 100rpx;
				}
			}

			.list-right {
				width: 80vw;
				margin-left: 30rpx;

				// text-align: center;
				// display: flex;
				// align-items: center;
				// flex-direction: column;
				// justify-content: center;
				.list-title {
					font-weight: bold;
					font-size: 13pt;
				}

				.list-info {
					display: flex;
					margin: 20rpx 0;

					.info-item {
						padding: 10rpx 20rpx;
						background-color: #efefef;
						font-size: 8pt;
						margin-right: 20rpx;
						border-radius: 5rpx;
					}

					.bg-blue-light {
						background-color: #a0cfff;
						color: #fff;
					}
				}

				.list-other {
					color: #777;
					font-size: 11pt;
					font-weight: bold;
					margin-top: 14rpx;
				}
			}

			.is-top {
				width: 10vw;
				position: absolute;
				right: 0px;
				top: 0px;
			}
		}
	}
</style>
