<template>
	<view class="index">
		<u-swiper :list="list" height="400"></u-swiper>
		<view class="top-nav">
			<view class="nav-item" v-for="(item, index) in nav" :key="index">
				<image :src="item.icon" mode="widthFix"></image>
				<text>{{item.text}}</text>
			</view>
		</view>
		<image src="../../static/banner.jpg" mode="widthFix" class="banner"></image>
		<u-tabs :list="tab_list" :is-scroll="true" :current="current" @change="change" bar-width="120"></u-tabs>
		<view class="list">
			<view class="list-item" v-for="(item, index) in 6" :key="index">
				<view class="list-left">
					<view class="list-title">东营市 至 广州市</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">不锈钢罐</view>
						<view class="info-item bg-red-light">40m2</view>
						<view class="info-item bg-orange-light">￥1600</view>
					</view>
					<view class="list-other">备注：XXXXXXXXXXX</view>
				</view>
				<view class="list-right">
					<image src="../../static/find.png" mode="widthFix"></image>
					<text>查看详情</text>
				</view>
				<image src="../../static/top.png" mode="widthFix" class="is-top"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nav: [{
						icon: '../../static/nav1.png',
						text: '商会简介',
						url: ''
					},
					{
						icon: '../../static/nav2.png',
						text: '商会动态',
						url: ''
					},
					{
						icon: '../../static/nav3.png',
						text: '商会掠影',
						url: ''
					},
					{
						icon: '../../static/nav4.png',
						text: '商务中心',
						url: ''
					},
					{
						icon: '../../static/nav5.png',
						text: '联系我们',
						url: ''
					},
					{
						icon: '../../static/nav6.png',
						text: '招贤纳士',
						url: ''
					},
					{
						icon: '../../static/nav7.png',
						text: '行业资讯',
						url: ''
					},
					{
						icon: '../../static/nav8.png',
						text: '更多',
						url: ''
					}
				],
				tab_list: [{
					name: '车源信息'
				}, {
					name: '货源信息'
				}, {
					name: '二手车源信息'
				}, {
					name: '新车信息'
				}, {
					name: '车辆求购信息'
				}, {
					name: '招聘信息'
				}, {
					name: '求职信息'
				}],
				current: 0,
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		onLoad() {

		},
		methods: {
			change(index) {
				this.current = index;
			}
		}
	}
</script>

<style lang="less" scoped>
	page {
		background-color: #efefef;
	}

	.index {
		.top-nav {
			display: flex;
			flex-wrap: wrap;
			background-color: #fff;

			.nav-item {
				width: 25vw;
				text-align: center;
				margin: 30rpx 0;

				image {
					width: 70rpx;
					display: block;
					margin: auto;
				}

				text {
					display: block;
					margin-top: 10rpx;
					font-size: 9pt;
				}
			}
		}

		.banner {
			width: 100vw;
			display: block;
			margin: 10rpx auto;
		}

		.list {
			margin-top: 10rpx;

			.list-item {
				display: flex;
				position: relative;
				background-color: #fff;
				// margin: 10rpx 0;
				padding: 30rpx;
				border-top: 1px solid #efefef;
				border-bottom: 1px solid #efefef;

				.list-left {
					width: 70vw;

					.list-title {
						font-weight: bold;
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
						
						.bg-red-light {
							background-color: #fab6b6;
							color: #fff;
						}
						
						.bg-orange-light {
							background-color: #fcbd71;
							color: #fff;
						}
					}

					

					.list-other {
						color: #777;
						font-size: 9pt;
					}
				}

				.list-right {
					width: 30vw;
					text-align: center;
					display: flex;
					align-items: center;
					flex-direction: column;
					justify-content: center;

					image {
						width: 6vw;
						display: block;
					}

					text {
						color: #999;
						font-size: 8pt;
						margin-top: 10rpx;
						letter-spacing: 2px;
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
	}
</style>
