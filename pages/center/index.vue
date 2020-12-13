<template>
	<view class="content">
		<view class="user">
			<view class="user-adv">
				<u-avatar :src="src" mode="square" size="160"></u-avatar>
			</view>
			<view class="user-info">
				<view class="user-name">昵称：XXXXX</view>
				<view class="user-vip">VIP</view>
				<view class="user-is">暂无认证 <text>立即认证</text></view>
			</view>
			<view class="user-btn">
				<u-icon name="setting" size="60" color="#fff"></u-icon>
			</view>
		</view>
		<view class="user-nav" @click="goUrl('/pages/mine/mine')">
			<view class="nav-item">
				<image src="../../static/u1.png" mode="widthFix"></image>
				<text>我的车源</text>
			</view>
			<view class="nav-item">
				<image src="../../static/u2.png" mode="widthFix"></image>
				<text>我的货源</text>
			</view>
			<view class="nav-item">
				<image src="../../static/u3.png" mode="widthFix"></image>
				<text>我的招聘</text>
			</view>
			<view class="nav-item">
				<image src="../../static/u4.png" mode="widthFix"></image>
				<text>我的简历</text>
			</view>
			<view class="nav-item">
				<image src="../../static/u5.png" mode="widthFix"></image>
				<text>我的二手车</text>
			</view>
		</view>
		<image src="../../static/vip.jpg" mode="widthFix" class="vip"></image>
		<view class="user-set">
			<view class="set-item" @click="goUrl('/pages/mine/prove')">
				<image src="../../static/us1.png" mode="widthFix"></image>
				<text>认证信息</text>
				<u-icon name="arrow-right" ></u-icon>
			</view>
			<view class="set-item">
				<image src="../../static/us2.png" mode="widthFix"></image>
				<text>财务明细</text>
				<u-icon name="arrow-right" ></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
			}
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
			}
		}
	}
</script>

<style lang="less" scoped>
	page{
		background-color: #efefef;
	}
	.user-set{
		.set-item{
			background-color: #fff;
			padding: 30rpx;
			display: flex;
			align-items: center;
			image{
				width: 60rpx;
			}
			text{
				width: 78vw;
				margin-left: 20rpx;
			}
		}
	}
	.vip{
		width: 100vw;
	}
	.user-nav{
		display: flex;
		background-color: #fff;
		padding: 30rpx 0;
		.nav-item{
			width: 20vw;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: center;
			image{
				width: 70rpx;
			}
			text{
				font-size: 9pt;
				margin-top: 10rpx;
			}
		}
	}
	.user{
		display: flex;
		justify-content: center;
		padding: 30rpx 0;
		background-color: #2979ff;
		.user-adv{
			width: 30vw;
			text-align: center;
		}
		.user-info{
			width: 60vw;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.user-name{
				font-weight: bold;
				color: #fff;
			}
			.user-vip{
				color: #fff;
				margin: 20rpx 0;
			}
			.user-is{
				font-size: 26rpx;
				color: #fff;
				text{
					color: #fff;
					margin-left: 20rpx;
				}
			}
		}
		.user-btn{
			width: 10vw;
			display: flex;
			align-items: center;
			text-align: center;
		}
	}
</style>
