<template>
	<view class="prove">
		<view class="prove-item" @click="goUrl('/pages/approve/approve', user.personal_status)">
			<image src="../../static/r1.png" mode="widthFix"></image>
			<text class="prove-title">个人实名认证</text>
			<text class="prove-info">{{user.personal_status == 0 ? '未认证' : user.personal_status == 1 ? '审核中' : '已认证'}}</text>
			<u-icon name="arrow-right" ></u-icon>
		</view>
		<view class="prove-item" @click="goUrl('/pages/approve/company', user.company_status)">
			<image src="../../static/r2.png" mode="widthFix"></image>
			<text class="prove-title">企业实名认证</text>
			<text class="prove-info">{{user.company_status == 0 ? '未认证' : user.company_status == 1 ? '审核中' : '已认证'}}</text>
			<u-icon name="arrow-right" ></u-icon>
		</view>
		<view class="prove-item" @click="goUrl('/pages/approve/road', user.road_status)">
			<image src="../../static/r3.png" mode="widthFix"></image>
			<text class="prove-title">道路运输资格认证</text>
			<text class="prove-info">{{user.road_status == 0 ? '未认证' : user.road_status == 1 ? '审核中' : '已认证'}}</text>
			<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="prove-item" @click="goUrl('/pages/approve/driver', user.driver_status)">
			<image src="../../static/r4.png" mode="widthFix"></image>
			<text class="prove-title">驾照认证</text>
			<text class="prove-info">{{user.driver_status == 0 ? '未认证' : user.driver_status == 1 ? '审核中' : '已认证'}}</text>
			<u-icon name="arrow-right" ></u-icon>
		</view>
		<view class="prove-item">
			<image src="../../static/r5.png" mode="widthFix"></image>
			<text class="prove-title">手机号认证</text>
			<text class="prove-info">{{user.mobile}}</text>
			<u-icon name="arrow-right" ></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: []
			}
		},
		onLoad() {
			this.user = uni.getStorageSync('user')
		},
		methods: {
			goUrl(url, status) {
				if (status == 0) {
					uni.navigateTo({
						url: url,
						animationType: 'pop-in',
						animationDuration: 200
					})
				}
				
			}
		}
	}
</script>

<style lang="less">
	.prove{
		.prove-item{
			padding: 30rpx;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #efefef;
			image{
				width: 60rpx;
			}
			.prove-title{
				width: 60vw;
				margin-left: 20rpx;
			}
			.prove-info{
				width: 40vw;
				text-align: right;
				color: #999;
			}
		}
	}
</style>
