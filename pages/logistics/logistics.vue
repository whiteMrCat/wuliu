<template>
	<view class="logistics">
		<u-tabs :list="tab_list" :is-scroll="false" :current="current" @change="change" bar-width="120"></u-tabs>
		<view class="fliters" @click="showFliters=true" v-if="current == 0">
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
				<text>更多</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
		</view>
		
		<view class="fliters" @click="showFliters2=true" v-if="current == 1">
			<view class="fliters-item">
				<text>始发地</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
			<view class="fliters-item">
				<text>目的地</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
			<view class="fliters-item">
				<text>货物类型</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
			<view class="fliters-item">
				<text>更多</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
		</view>

		<view class="list">
			<view class="list-item" v-for="(item, index) in carTopList" :key="index" v-if="current == 0" @click="goUrlAndStorage('/pages/logistics/details','info_car', item)">
				<view class="list-left">
					<view class="list-title">{{item.start_address}} 至 {{item.end_address}}</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">{{item.car_type}}</view>
						<view class="info-item bg-red-light">{{item.load}}吨</view>
						<view class="info-item bg-orange-light">￥{{item.freight}}</view>
					</view>
					<view class="list-other">备注：{{item.info}}</view>
				</view>
				<view class="list-right">
					<image src="../../static/find.png" mode="widthFix"></image>
					<text>查看详情</text>
				</view>
				<image src="../../static/top.png" mode="widthFix" class="is-top" v-if="item.is_top == 1"></image>
			</view>
		</view>
		
		<view class="list">
			<view class="list-item" v-for="(item, index) in carList" :key="index" v-if="current == 0" @click="goUrlAndStorage('/pages/logistics/details','info_car', item)">
				<view class="list-left">
					<view class="list-title">{{item.start_address}} 至 {{item.end_address}}</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">{{item.car_type}}</view>
						<view class="info-item bg-red-light">{{item.load}}吨</view>
						<view class="info-item bg-orange-light">￥{{item.freight}}</view>
					</view>
					<view class="list-other">备注：{{item.info}}</view>
				</view>
				<view class="list-right">
					<image src="../../static/find.png" mode="widthFix"></image>
					<text>查看详情</text>
				</view>
				<!-- <image src="../../static/top.png" mode="widthFix" class="is-top" v-if="item.is_top == 1"></image> -->
			</view>
		</view>
		
		<view class="list">
			<view class="list-item" v-for="(item, index) in goodsTopList" :key="index" v-if="current == 1" @click="goUrlAndStorage('/pages/logistics/goods','info_goods', item)">
				<view class="list-left">
					<view class="list-title">{{item.startAddress}} 至 {{item.endAddress}}</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">{{item.goods_type}}</view>
						<view class="info-item bg-red-light">{{item.weight}}吨</view>
						<view class="info-item bg-orange-light">￥{{item.freight == '' ? '面议' : item.freight}}</view>
					</view>
					<view class="list-other">备注：{{item.info}}</view>
				</view>
				<view class="list-right">
					<image src="../../static/find.png" mode="widthFix"></image>
					<text>查看详情</text>
				</view>
				<image src="../../static/top.png" mode="widthFix" class="is-top" v-if="item.is_top == 1"></image>
			</view>
		</view>
		
		<view class="list">
			<view class="list-item" v-for="(item, index) in goodsList" :key="index" v-if="current == 1" @click="goUrlAndStorage('/pages/logistics/goods','info_goods', item)">
				<view class="list-left">
					<view class="list-title">{{item.startAddress}} 至 {{item.endAddress}}</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">{{item.goods_type}}</view>
						<view class="info-item bg-red-light">{{item.weight}}吨</view>
						<view class="info-item bg-orange-light">￥{{item.freight == '' ? '面议' : item.freight}}</view>
					</view>
					<view class="list-other">备注：{{item.info}}</view>
				</view>
				<view class="list-right">
					<image src="../../static/find.png" mode="widthFix"></image>
					<text>查看详情</text>
				</view>
				<!-- <image src="../../static/top.png" mode="widthFix" class="is-top" v-if="item.is_top == 1"></image> -->
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
					<view class="rect-btn" @click="goUrl('/pages/release/goods')">货源发布</view>
				</view>
			</view>
		</u-mask>

		<u-popup v-model="showFliters" mode="top" height="800rpx">
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
					<view class="fliters-items" :class="[carType_index == index ? 'active': '']" v-for="(item, index) in set.car_type" :key="index" @click="setCarType(index, item.name)">{{item.name}}</view>
				</view>
			</view>
			<view class="fliters-main">
				<view class="fliters-title">路线类型</view>
				<view class="fliters-content">
					<view class="fliters-items" :class="[wayType_index == index ? 'active': '']" v-for="(item, index) in set.way_type" :key="index" @click="setWayType(index, item.name)">{{item.name}}</view>
				</view>
			</view>
			<!-- <view class="fliters-main">
				<view class="fliters-title">运价</view>
				<view class="fliters-content">
					<view class="fliters-items" :class="[freight_index == index ? 'active': '']" v-for="(item, index) in freight_list" :key="index" @click="setfreight(index, item)">{{item}}</view>
				</view>
			</view> -->
			<view class="fliters-btn">
				<u-button @click="reset">重置</u-button>
				<u-button @click="setCarFliters" type="primary">确定</u-button>
			</view>
		</u-popup>
		<u-popup v-model="showFliters2" mode="top" height="800rpx">
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
				<view class="fliters-title">货物类型</view>
				<view class="fliters-content">
					<view class="fliters-items" :class="[goodsType_index == index ? 'active': '']" v-for="(item, index) in set.goods_type" :key="index" @click="setGoodsType(index, item.name)">{{item.name}}</view>
				</view>
			</view>
			<!-- <view class="fliters-main">
				<view class="fliters-title">路线类型</view>
				<view class="fliters-content">
					<view class="fliters-items" :class="[wayType_index == index ? 'active': '']" v-for="(item, index) in set.way_type" :key="index" @click="setWayType(index, item.name)">{{item.name}}</view>
				</view>
			</view> -->
			<!-- <view class="fliters-main">
				<view class="fliters-title">运价</view>
				<view class="fliters-content">
					<view class="fliters-items" :class="[freight_index == index ? 'active': '']" v-for="(item, index) in freight_list" :key="index" @click="setfreight(index, item)">{{item}}</view>
				</view>
			</view> -->
			<view class="fliters-btn">
				<u-button @click="reset">重置</u-button>
				<u-button @click="setGoodsFliters" type="primary">确定</u-button>
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
				showFliters2: false,
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
				index: 1,
				carList: [],
				carTopList: [],
				goodsList: [],
				goodsTopList: [],
				carType_index: -1,
				wayType_index: -1,
				freight_index: -1,
				goodsType_index: -1,
				freight_list: [
					'￥0-￥1000','￥1000-￥2000', '￥2000+'
				],
				filters_car: {
					car_type: '',
					route_type: '',
					freight: [],
					start_address: '',
					end_address: '',
					status: 1
				},
				filters_goods: {
					goods_type: '',
					start_address: '',
					end_address: '',
					status: 1
				},
				page: 1,
				set: []
			};
		},
		onLoad() {
			if (this.current == 0) {
				this.getTopInfoCar(1)
				this.getInfoCar(1)
				
			} else {
				this.getInfoGoods(1)
				this.getTopInfoGoods(1)
				
			}
			this.set = uni.getStorageSync('set')
		},
		onReachBottom() {
			let _this = this
			uni.showLoading({
				title: '加载中'
			})
			if (this.current == 0) {
				// this.getTopInfoCar(this.page)
				this.getInfoCar(this.page)
				
			} else {
				this.getInfoGoods(this.page)
				// this.getTopInfoGoods(1)
				
			}
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
		},
		onPullDownRefresh() {
			this.page = 1
			if (this.current == 0) {
				this.getTopInfoCar(1)
				this.getInfoCar(1)
				
			} else {
				this.getInfoGoods(1)
				this.getTopInfoGoods(1)
				
			}
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		methods: {
			reset() {
				this.showFliters = false
				this.carType_index= -1
				this.wayType_index= -1
				this.freight_index= -1
				this.goodsType_index= -1
				this.filters_car = {
					car_type: '',
					route_type: '',
					freight: [],
					start_address: '',
					end_address: '',
					status: 1
				}
				this.filters_goods = {
					goods_type: '',
					start_address: '',
					end_address: '',
					status: 1
				}
				this.startAddress = ''
				this.endAddress = ''
				this.getInfoCar(1)
				this.getInfoGoods(1)
			},
			setGoodsFliters() {
				this.showFliters2 = false
				this.getInfoGoods(1)
			},
			setCarFliters() {
				this.showFliters = false
				this.getInfoCar(1)
			},
			setfreight(index, name) {
				let _this = this
				
				this.freight_index = index
				switch(index) {
					case 0:
						_this.filters_car.freight = [0,1000]
						break
					case 1:
						_this.filters_car.freight = [1000,2000]
						break
					case 2:
						_this.filters_car.freight = [2000,100000]
						break
				}
						
			},
			setGoodsType(index, name) {
				this.filters_goods.goods_type = name
				this.goodsType_index = index
			},
			setCarType(index, name) {
				this.filters_car.car_type = name
				this.carType_index = index
			},
			setWayType(index, name) {
				this.filters_car.route_type = name
				this.wayType_index = index
			},
			async getInfoCar(page) {
				let _this = this
				this.$api.getInfoCar({
					page: page,
					page_size: 10,
					filters: this.filters_car
				}).then(res => {
					// console.log(res)
					if (page == 1) {
						_this.carList = res.data
					} else {
						for (let x in res.data) {
							_this.carList.push(res.data[x])
						}
						_this.page += 1
					}
				})
			},
			async getTopInfoCar(page) {
				let _this = this
				this.$api.getInfoCar({
					page: page,
					page_size: 10,
					filters: {'is_top': 1}
				}).then(res => {
					// console.log(res)
					if (page == 1) {
						_this.carTopList = res.data
					} else {
						for (let x in res.data) {
							_this.carTopList.push(res.data[x])
						}
					}
				})
			},
			async getTopInfoGoods(page) {
				let _this = this
				this.$api.getInfoGoods({
					page: page,
					page_size: 10,
					filters: {'is_top': 1}
				}).then(res => {
					console.log('top', res)
					if (page == 1) {
						_this.goodsTopList = res.data
					} else {
						for (let x in res.data) {
							_this.goodsTopList.push(res.data[x])
						}
					}
				})
			},
			async getInfoGoods(page) {
				let _this = this
				this.$api.getInfoGoods({
					page: page,
					page_size: 10,
					filters: this.filters_goods
				}).then(res => {
					// console.log(res)
					if (page == 1) {
						_this.goodsList = res.data
					} else {
						for (let x in res.data) {
							_this.goodsList.push(res.data[x])
						}
						_this.page += 1
					}
				})
			},
			goUrlAndStorage(url,name, info) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				})
				uni.setStorageSync(name, info)
			},
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
				this.page = 1
				if(index == 0) {
					this.getTopInfoCar(1)
					this.getInfoCar(1)
				} else {
					this.getTopInfoGoods(1)
					this.getInfoGoods(1)
					
				}
			},
			getAddress(e) {
				console.log(e)
				if (this.current == 0) {
					if (this.index == 1) {
						this.startAddress = e
						this.filters_car.start_address =  e.province.label + '-' + e.city.label + '-' + e.area.label
					} else {
						this.endAddress = e
						this.filters_car.end_address =  e.province.label + '-' + e.city.label + '-' + e.area.label
					}
				} else {
					if (this.index == 1) {
						this.startAddress = e
						this.filters_goods.start_address =  e.province.label + '-' + e.city.label + '-' + e.area.label
					} else {
						this.endAddress = e
						this.filters_goods.end_address =  e.province.label + '-' + e.city.label + '-' + e.area.label
					}
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
					width: 80vw;

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
					width: 20vw;
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
