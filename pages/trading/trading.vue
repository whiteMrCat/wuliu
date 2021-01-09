<template>
	<view class="logistics">
		<u-tabs :list="tab_list" :is-scroll="false" :current="current" @change="change" bar-width="120"></u-tabs>
		<view class="fliters" @click="showFliters=true">
			<view class="fliters-item">
				<text>品牌分类</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
			<view class="fliters-item">
				<text>类型分类</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
			<view class="fliters-item">
				<text>所在地</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
			<view class="fliters-item">
				<text>其他</text>
				<u-icon name="arrow-down"></u-icon>
			</view>
		</view>

		<view class="list">
			<view class="list-item" v-for="(item, index) in listTop" :key="index" @click="goUrlAndStorage('/pages/trading/detail', 'used', item)">
				<view class="list-left">
					<image :src="imgHost + '/upload/' + item.car_img[0]" mode=""></image>
				</view>
				<view class="list-right">
					<view class="list-title">{{item.brand}}-{{item.name}}</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">{{item.year}}年</view>
					</view>
					<view class="list-other">￥{{item.price}}万</view>
				</view>
				<image src="../../static/top.png" mode="widthFix" class="is-top" v-if="item.is_top == 1"></image>
			</view>
		</view>

		<view class="list">
			<view class="list-item" v-for="(item, index) in list" :key="index" @click="goUrlAndStorage('/pages/trading/detail', 'used', item)">
				<view class="list-left">
					<image :src="imgHost+ '/upload/' + item.car_img[0]" mode=""></image>
				</view>
				<view class="list-right">
					<view class="list-title">{{item.brand}}-{{item.name}}</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">{{item.year}}年</view>
					</view>
					<view class="list-other">￥{{item.price}}万</view>
				</view>
				<!-- <image src="../../static/top.png" mode="widthFix" class="is-top" v-if="item.is_top == 1"></image> -->
			</view>
		</view>

		<view class="fabu">
			<!-- <u-button type="primary" :ripple="true" shape="square" class="fabu-btn" @click="showBtn = true"><u-icon name="plus"></u-icon></u-button> -->
			<u-button type="primary" :ripple="true" shape="square" class="fabu-btn" @click="goUrl('/pages/release/used')"><u-icon name="plus"></u-icon></u-button>
		</view>
		
		<u-mask :show="showBtn" @click="showBtn = false">
			<view class="warp">
				<view class="rect" @tap.stop>
					<view class="rect-btn" @click="goUrl('/pages/release/used')">二手车</view>
					<view class="rect-btn" @click="goUrl('/pages/release/used')">新车</view>
					<view class="rect-btn" @click="goUrl('/pages/release/used')">求购车辆</view>
				</view>
			</view>
		</u-mask>

		<u-popup v-model="showFliters" mode="top" height="800rpx">
			<view class="fliters-main">
				<view class="fliters-title">品牌分类</view>
				<view class="fliters-content">
					<view class="fliters-items" :class="[brand_index == index ? 'active': '']" v-for="(item, index) in set.brand" :key="index" @click="setbrand(index, item.name)">{{item.name}}</view>
				</view>
			</view>
			<view class="fliters-main">
				<view class="fliters-title">车辆类型</view>
				<view class="fliters-content">
					<view class="fliters-items" :class="[carType_index == index ? 'active': '']" v-for="(item, index) in set.car_type" :key="index" @click="setCarType(index, item.name)">{{item.name}}</view>
				</view>
			</view>
			<view class="fliters-main">
				<view class="fliters-title">所在地</view>
				<view class="fliters-content">
					<view class="address-list" @click="setMineAddress(1)">{{address.length == 0 ? '选择所在地' : address.province.label + '-' + address.city.label + '-' + address.area.label}}</view>
				</view>
			</view>
			<view class="fliters-btn">
				<u-button @click="reset">重置</u-button>
				<u-button @click="setFliters" type="primary">确定</u-button>
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
				set: [],
				brand_index: -1,
				carType_index: -1,
				showBtn: false,
				showAddress: false,
				imgHost: this.$url,
				tab_list: [{
					name: '二手车'
				}, {
					name: '新车'
				}, {
					name: '车辆求购'
				}, {
					name: '车辆装备'
				}],
				current: 0,
				showFliters: false,
				address: [],
				index: 1,
				list: [],
				filters: {
					status: 1,
					car_type: '',
					media_type: '',
					brand: '',
					models: '',
					type: 0,
					address: ''
				},
				listTop: [],
				page: 1
			};
		},
		onLoad() {
			this.set = uni.getStorageSync('set')
		},
		onShow() {
			this.getListTop(1)
			this.getList(1)
		},
		onReachBottom() {
			let _this = this
			uni.showLoading({
				title: '加载中'
			})
			this.getList(this.page)
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
		},
		onPullDownRefresh() {
			this.page = 1
			this.getList(1)
			this.getListTop(1)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		methods: {
			goUrlAndStorage(url, name, info) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				})
				uni.setStorageSync(name, info)
			},
			reset() {
				this.showFliters = false
				this.brand_index = -1
				this.carType_index = -1
				this.filters = {
					status: 1,
					car_type: '',
					media_type: '',
					brand: '',
					models: '',
					type: 0,
					address: ''
				}
				this.getList(1)
			},
			setFliters() {
				this.showFliters = false
				this.getList(1)
			},
			setMineAddress() {
				this.showAddress = true
			},
			setbrand(index, val) {
				this.filters.brand = val
				this.brand_index = index
			},
			setCarType(index, val) {
				this.filters.car_type = val
				this.carType_index = index
			},
			getListTop(page) {
				let _this = this
				this.$api.getInfoUsed({
					page: page,
					page_size: 10,
					filters: {
						'is_top': 1,
						'type': this.current
					}
				}).then(res => {
					let lists = res.data
					for(let key in lists) {
						// lists[key]['car_img'].replace(/\\/g,'/')
						for(let _key in lists[key]['car_img']) {
							lists[key]['car_img'][_key] = lists[key]['car_img'][_key].replace(/\\/g,"/")
							// console.log(lists[key]['car_img'][_key])
						}
					}
					if (page == 1) {
						_this.listTop = lists
					} else {
						for (let x in lists) {
							_this.listTop.push(lists[x])
						}
					}
				})
			},
			getList(page) {
				let _this = this
				this.$api.getInfoUsed({
					page: page,
					page_size: 10,
					filters: this.filters
				}).then(res => {
					let lists = res.data
					for(let key in lists) {
						// lists[key]['car_img'].replace(/\\/g,'/')
						for(let _key in lists[key]['car_img']) {
							lists[key]['car_img'][_key] = lists[key]['car_img'][_key].replace(/\\/g,"/")
							// console.log(lists[key]['car_img'][_key])
						}
					}
					if (page == 1) {
						_this.list = lists
					} else {
						for (let x in lists) {
							_this.list.push(lists[x])
						}
						_this.page += 1
					}
				})
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
				this.filters.type = index
				this.getList(1)
			},
			getAddress(e) {
				this.address = e
				this.filters.address =  e.province.label + '-' + e.city.label + '-' + e.area.label
			}
		}
	}
</script>

<style lang="less">
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
		.fabu{
			position: fixed;
			right: 20rpx;
			bottom: 100rpx;
			button{
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
			}
		}
		.list{
			margin-top: 10rpx;
			.list-item{
				display: flex;
				position: relative;
				background-color: #fff;
				// margin: 10rpx 0;
				padding: 10rpx;
				border-top: 1px solid #efefef;
				border-bottom: 1px solid #efefef;
				.list-left{
					width: 30vw;
					
					image{
						width: 30vw;
						height: 160rpx;
					}
				}
				.list-right{
					width: 70vw;
					margin-left: 30rpx;
					// text-align: center;
					// display: flex;
					// align-items: center;
					// flex-direction: column;
					// justify-content: center;
					.list-title{
						font-weight: bold;
					}
					.list-info{
						display: flex;
						margin: 20rpx 0;
						.info-item{
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
					.list-other{
						color: #fa3534;
						font-size: 9pt;
						font-weight: bold;
					}
				}
				.is-top{
					width: 10vw;
					position: absolute;
					right: 0px;
					top: 0px;
				}
			}
		}
		.fliters-btn{
			display: flex;
			justify-content: center;
			button{
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
				
				.fliters-items{
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
				.active{
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
