<template>
	<view>
		<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration"
		 style="height: 400rpx;">
			<swiper-item v-for="(item, index) in info.car_img" :key="index">
				<image :src="imgHost + '/upload/' + item" mode="" style="width: 100vw;height: 400rpx;"></image>
			</swiper-item>
		</swiper>
		<view class="info-list">
			<view class="info-left" style="font-weight: bold;">{{info.type == 0? '二手车': info.type==1?'新车': '车辆求购'}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">车辆名称</view>
			<view class="info-right">{{info.name}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">车辆类型</view>
			<view class="info-right">{{info.car_type}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">品牌</view>
			<view class="info-right">{{info.brand}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">所在地</view>
			<view class="info-right">{{info.address}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">车辆长度</view>
			<view class="info-right">{{info.length}}/米</view>
		</view>
		<view class="info-list">
			<view class="info-left">售价</view>
			<view class="info-right text-red">￥{{info.price == '' ? '面议' : info.price}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">年限</view>
			<view class="info-right">{{info.year}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">联系人</view>
			<view class="info-right">{{info.contact}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">联系方式</view>
			<view class="info-right">{{info.mobile}}</view>
		</view>
		<view class="info-other">
			<view class="other-title">简介</view>
			<view class="other-main">{{info.info}}</view>
		</view>
		<view class="info-btn" @click="tellPhone(info.mobile)">立即联系</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				imgHost: this.$url,
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				info: []
			}
		},
		onLoad() {
			this.info = uni.getStorageSync('used')
		},
		methods: {
			tellPhone(phone) {
				let user = uni.getStorageSync('user')
				if (user.personal_status == 0) {
					uni.showModal({
					    title: '提示',
					    content: '您还未进行实名认证，请先实名认证并通过审核后拨打电话',
					    success: function (res) {
					        if (res.confirm) {
					            uni.navigateTo({
					            	url: '/pages/mine/prove'
					            })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				} else {
					uni.makePhoneCall({
					    phoneNumber: phone
					});
				}
				
			}
		}
	}
</script>

<style lang="less">
	.info-list {
		display: flex;
		padding: 30rpx;
		font-size: 32rpx;
		border-bottom: 1px solid #efefef;

		.info-left {
			width: 30vw;
			text-align: left;
		}

		.info-right {
			width: 70vw;
			text-align: right;
			font-weight: bold;
		}

		.text-red {
			color: red;
		}

	}

	.info-other {
		padding: 30rpx;

		.other-title {
			font-weight: bold;
		}

		.other-main {
			font-size: 32rpx;
			margin-top: 20rpx;
		}
	}

	.info-btn {
		position: fixed;
		bottom: 20rpx;
		width: 90vw;
		left: 5vw;
		background-color: #2979FF;
		text-align: center;
		padding: 20rpx 0;
		color: #fff;
		border-radius: 10rpx;
	}
</style>
