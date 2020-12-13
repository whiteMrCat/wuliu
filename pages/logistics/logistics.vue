<template>
	<view class="logistics">
		<u-tabs :list="tab_list" :is-scroll="false" :current="current" @change="change" bar-width="120"></u-tabs>
		<view class="fliters" @click="showFliters=true">
			<view class="fliters-item">
				<text>起始地点</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
			<view class="fliters-item">
				<text>车辆类型</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
			<view class="fliters-item">
				<text>路线类型</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
			<view class="fliters-item">
				<text>运价</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
		</view>

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

		<view class="fabu">
			<u-button type="primary" :ripple="true" shape="square" class="fabu-btn" @click="showBtn = true">
				<u-icon name="plus"></u-icon>
			</u-button>
		</view>

		<u-mask :show="showBtn" @click="showBtn = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="rect-btn" @click="goUrl('/pages/release/release')">车源发布</view>
					<view class="rect-btn">货源发布</view>
				</view>
			</view>
		</u-mask>

		<u-popup v-model="showFliters" mode="top" height="1200rpx">
			<view class="fliters-main">
				<view class="fliters-title">起始地点</view>
				<view class="fliters-content">
					<view class="fliters-address">
						<view class="address-list" @click="setMineAddress(1)">{{startAddress.length == 0 ? '选择始发地' : startAddress.province.label + '-' + startAddress.city.label + '-' + startAddress.area.label}}</view>
						<text>-</text>
						<view class="address-list" @click="setMineAddress(2)">{{endAddress.length == 0 ? '选择目的地' : endAddress.province.label + '-' + endAddress.city.label + '-' + endAddress.area.label}}</view>
					</view>
				</view>
			</view>
			<view class="fliters-main">
				<view class="fliters-title">车辆类型</view>
				<view class="fliters-content">
					<view class="fliters-items active">不锈钢罐体</view>
					<view class="fliters-items">不锈钢罐体</view>
					<view class="fliters-items">不锈钢罐体</view>
					<view class="fliters-items">不锈钢罐体</view>
				</view>
			</view>
			<view class="fliters-main">
				<view class="fliters-title">路线类型</view>
				<view class="fliters-content">
					<view class="fliters-items active">回程车</view>
					<view class="fliters-items">专程车</view>
				</view>
			</view>
			<view class="fliters-main">
				<view class="fliters-title">运价</view>
				<view class="fliters-content">
					<view class="fliters-items active">￥0-￥1000</view>
					<view class="fliters-items">￥1000-￥2000</view>
					<view class="fliters-items">￥2000+</view>
				</view>
			</view>
			<view class="fliters-btn">
				<u-button @click="showFliters = false">取消</u-button>
				<u-button @click="showFliters = false" type="primary">确定</u-button>
			</view>
		</u-popup>
		<u-picker mode="region" v-model="showAddress" @confirm="getAddress"></u-picker>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				showBtn: false,
				showAddress: false,
				tab_list: [{
					name: '车源信息'
				}, {
					name: '货源信息'
				}],
				current: 0,
				showFliters: false,
				startAddress: [],
				endAddress: [],
				index: 1
			};
		},
		onLoad() {

		},
		methods: {
			goUrl(url) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			setMineAddress(index) {
				this.index = index
				this.showAddress = true
			},
			change(index) {
				this.current = index;
			},
			getAddress(e) {
				console.log(e)
				if (this.index == 1) {
					this.startAddress = e
				} else {
					this.endAddress = e
				}
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #efefef;
	}

	.warp{
		.rect{
			position: fixed;
			right: 20rpx;
			bottom: 240rpx;
			.rect-btn{
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				background-color: #2979ff;
				color: #fff;
				line-height: 140rpx;
				text-align: center;
				margin-bottom: 30rpx;
			}
		}
	}

	.logistics {
		.fabu {
			position: fixed;
			right: 20rpx;
			bottom: 100rpx;

			button {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
			}
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

		.fliters-btn {
			display: flex;
			justify-content: center;

			button {
				width: 40vw;
				margin: 0 20rpx;
			}
		}

		.fliters-main {
			padding: 30rpx;

			.fliters-title {
				font-weight: bold;
			}

			.fliters-content {
				display: flex;
				flex-wrap: wrap;
				margin-top: 20rpx;

				.fliters-items {
					padding: 10rpx 30rpx;
					border: 1px solid #dddddd;
					border-radius: 10rpx;
					margin: 20rpx 10rpx;
				}

				.fliters-address {
					display: flex;
					justify-content: center;
					align-items: center;
					margin: 30rpx 0;

					.address-list {
						padding: 10rpx 0rpx;
						border: 1px solid #dddddd;
						border-radius: 10rpx;
						width: 40vw;
						text-align: center;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						word-break: break-all;
					}

					text {
						margin: 0 40rpx;
					}
				}

				.active {
					border: 1px solid #2979ff;
					color: #2979ff;
				}
			}
		}

		.fliters {
			display: flex;
			justify-content: center;
			background-color: #fff;
			align-items: center;
			height: 80rpx;
			margin-top: 5rpx;

			.fliters-item {
				width: 25vw;
				text-align: center;

				text {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
