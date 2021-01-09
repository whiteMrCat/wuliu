<template>
	<view class="index">
		<u-swiper :list="list" height="400" name="url"></u-swiper>
		<view class="top-nav">
			<view class="nav-item" v-for="(item, index) in nav" :key="index" @click="goUrl('/pages/articles/articles?index='+index)">
				<image :src="item.icon" mode="widthFix"></image>
				<text>{{item.text}}</text>
			</view>
		</view>
		<image src="../../static/banner.jpg" mode="widthFix" class="banner"></image>
		<u-tabs :list="tab_list" :is-scroll="true" :current="current" @change="change" bar-width="120"></u-tabs>
		<view class="list" v-if="current == 0">
			<view class="list-item" v-for="(item, index) in carTopList" :key="index" @click="goUrlAndStorage('/pages/logistics/details','info_car', item)">
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
		<view class="list" v-if="current == 1">
			<view class="list-item" v-for="(item, index) in goodsTopList" :key="index" @click="goUrlAndStorage('/pages/logistics/goods','info_goods', item)">
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
		<view class="list" v-if="current == 2 || current == 3 || current == 4">
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
		<view class="list" v-if="current == 5">
			<view class="list-item" v-for="(item, index) in inviteListTop" :key="index" @click="goUrlAndStorage('/pages/position/details', 'invite', item)">
				<view class="list-item-main">
					<view class="list-div do-flex">
						<view class="list-top-item title">{{item.name}}</view>
						<view class="list-top-item" style="color: #fa3534;">{{item.start_salary}}-{{item.end_salary}}/月</view>
					</view>
					<view class="list-div">
						<view class="list-top-item info">{{item.address}}</view>
						<view class="list-top-item info">{{item.number_year}}年</view>
						<view class="list-top-item info">{{item.school}}</view>
					</view>
					<view class="list-div do-flex">
						<view class="list-top-item" style="color: #c8c9cc;font-size: 9pt;">{{item.contact}}</view>
						<!-- <view class="list-top-item">2020-10-25</view> -->
					</view>
				</view>
				<image src="../../static/top.png" mode="widthFix" class="is-top"></image>
			</view>
		</view>
		<view class="list" v-if="current == 6">
			<view class="list-item" v-for="(item, index) in resumeListTop" :key="index" @click="goUrlAndStorage('/pages/position/resume', 'resume', item)">
				<view class="list-item-main">
					<view class="list-div do-flex">
						<view class="list-top-item title">{{item.name}}</view>
						<view class="list-top-item" style="color: #fa3534;">{{item.start_salary}}-{{item.end_salary}}/月</view>
					</view>
					<view class="list-div">
						<view class="list-top-item info">{{item.address}}</view>
						<view class="list-top-item info">{{item.number_year}}年</view>
						<view class="list-top-item info">{{item.school}}</view>
					</view>
					<view class="list-div do-flex">
						<view class="list-top-item" style="color: #c8c9cc;font-size: 9pt;">{{item.contact}}</view>
						<!-- <view class="list-top-item">2020-10-25</view> -->
					</view>
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
				list: [],
				carTopList: [],
				goodsTopList: [],
				listTop: [],
				inviteListTop: [],
				resumeListTop: [],
				type: 0
			}
		},
		onLoad() {
			this.getSet()
			this.getTopInfoCar(1)
		},
		onShow() {
			console.log(11111)
		},
		onPullDownRefresh() {
			this.page = 1
			this.change(this.current)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		onShow() {},
		methods: {
			goUrl(url) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			goUrlAndStorage(url, name, info) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				})
				uni.setStorageSync(name, info)
			},
			getTopInfoResume(page) {
				let _this = this
				this.$api.getInfoResume({
					page: page,
					page_size: 10,
					filters: {
						is_top: 1,
						status: 1
					}
				}).then(res => {
					if (page == 1) {
						_this.resumeListTop = res.data
					} else {
						for (let x in res.data) {
							_this.resumeListTop.push(res.data[x])
						}
					}
				})
			},
			getTopInfoInvite(page) {
				let _this = this
				this.$api.getInfoInvite({
					page: page,
					page_size: 10,
					filters: {
						is_top: 1,
						status: 1
					}
				}).then(res => {
					if (page == 1) {
						_this.inviteListTop = res.data
					} else {
						for (let x in res.data) {
							_this.inviteListTop.push(res.data[x])
						}
					}
				})
			},
			getListTop(page) {
				let _this = this
				this.$api.getInfoUsed({
					page: page,
					page_size: 10,
					filters: {
						'is_top': 1,
						'type': this.type
					}
				}).then(res => {
					let lists = res.data
					for (let key in lists) {
						// lists[key]['car_img'].replace(/\\/g,'/')
						for (let _key in lists[key]['car_img']) {
							lists[key]['car_img'][_key] = lists[key]['car_img'][_key].replace(/\\/g, "/")
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
			getTopInfoCar(page) {
				let _this = this
				this.$api.getInfoCar({
					page: page,
					page_size: 10,
					filters: {
						'is_top': 1
					}
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
			getTopInfoGoods(page) {
				let _this = this
				this.$api.getInfoGoods({
					page: page,
					page_size: 10,
					filters: {
						'is_top': 1
					}
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
			getSet() {
				let _this = this
				this.$api.getSet().then(res => {
					// console.log(res)
					_this.list = res.data.banner
					uni.setStorageSync('set', res.data)
				})
			},
			change(index) {
				this.current = index;
				switch (index) {
					case 0:
						this.getTopInfoCar(1)
						break
					case 1:
						this.getTopInfoGoods(1)
						break
					case 2:
						this.type = 0
						this.getListTop(1)

						break
					case 3:
						this.type = 1
						this.getListTop(1)

						break
					case 4:
						this.type = 2
						this.getListTop(1)

						break
					case 5:
						this.getTopInfoInvite(1)
						break
					case 6:
						this.getTopInfoResume(1)
						break
				}
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
