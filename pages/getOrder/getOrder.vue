<template>
	<view>
		<view class="order-list">
			<view class="order-left">订单编号</view>
			<view class="order-right">{{order.out_trade_no}}</view>
		</view>
		<view class="order-list">
			<view class="order-left">订单信息</view>
			<view class="order-right">{{order.body}}</view>
		</view>
		<view class="order-list">
			<view class="order-left">订单类型</view>
			<view class="order-right">置顶{{order.info_type}}</view>
		</view>
		<view class="order-list">
			<view class="order-left">支付方式</view>
			<view class="order-right">{{order.pay_way == 0 ? '微信' : '网页'}}</view>
		</view>
		<view class="order-list">
			<view class="order-left">价格</view>
			<view class="order-right" style="color: red;">{{order.total_fee}}</view>
		</view>
		<view class="order-list">
			<view class="order-left">置顶天数</view>
			<view class="order-right">7天</view>
		</view>
		<view style="padding: 30rpx;">
			<u-button type="primary" @click="submitForm">支付</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: [],
				infos: []
			};
		},
		onLoad() {
			this.infos = uni.getStorageSync('infos')
			this.order = uni.getStorageSync('order')
		},
		methods: {
			topInfoCar() {
				let _this = this
				this.$api.topInfoCar({
					id: this.infos.id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 2000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			topInfoGoods() {
				let _this = this
				this.$api.topInfoGoods({
					id: this.infos.id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 2000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			topInfoInvite() {
				let _this = this
				this.$api.topInfoInvite({
					id: this.infos.id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 2000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			topInfoResume() {
				let _this = this
				this.$api.topInfoResume({
					id: this.infos.id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 2000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			topInfoUsed() {
				let _this = this
				this.$api.topInfoUsed({
					id: this.infos.id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}, 2000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			submitForm() {
				let _this = this
				switch (_this.order.info_type) {
					case '车源':
						_this.topInfoCar()
						break;
					case '货源':
						_this.topInfoGoods()
						break;
					case '汽车':
						_this.topInfoUsed()
						break;
					case '招聘':
						_this.topInfoInvite()
						break;
					case '求职':
						_this.topInfoResume()
						break;
				}
				// this.$api.payOrder({
				// 	body: this.order.body,
				// 	out_trade_no: this.order.out_trade_no,
				// 	total_fee: this.order.total_fee
				// }).then(res => {
				// 	if (res.code == 1) {
				// 		uni.requestPayment({
				// 			provider: 'wxpay',
				// 			timeStamp: res.data.timeStamp,
				// 			nonceStr: res.data.nonceStr,
				// 			package: res.data.package,
				// 			signType: res.data.signType,
				// 			paySign: res.data.paySign,
				// 			success: function(resd) {
				// 				console.log('success:' + JSON.stringify(res));
				// 				uni.showToast({
				// 					title: '支付成功',
				// 					icon: 'none',
				// 					duration: 2000
				// 				});
				// 				setTimeout(function() {
				// 					switch (_this.order.info_type) {
				// 						case '车源':
				// 							_this.topInfoCar()
				// 							break;
				// 						case '货源':
				// 							_this.topInfoGoods()
				// 							break;
				// 						case '汽车':
				// 							_this.topInfoUsed()
				// 							break;
				// 						case '招聘':
				// 							_this.topInfoInvite()
				// 							break;
				// 						case '求职':
				// 							_this.topInfoResume()
				// 							break;
				// 					}
				// 				}, 2000)
				// 			},
				// 			fail: function(errd) {
				// 				console.log('fail:' + JSON.stringify(err));
				// 				uni.showToast({
				// 					title: JSON.stringify(err),
				// 					icon: 'none',
				// 					duration: 2000
				// 				});
				// 			}
				// 		});
						
				// 	} else {
				// 		uni.showToast({
				// 			title: res.msg,
				// 			icon: 'none',
				// 			duration: 2000
				// 		});
				// 	}
				// })
			}
		}
	}
</script>

<style lang="less">
	.order-list {
		display: flex;
		justify-content: space-between;
		width: 100vw;
		padding: 30rpx;

		.order-left {
			font-weight: bold;
		}

		.order-right {
			color: #777;
		}
	}
</style>
