<template>
	<view class="prove">
		<view class="prove-item">
			<image src="../../static/r1.png" mode="widthFix"></image>
			<text class="prove-title">个人实名认证</text>
			<text class="prove-info">未认证</text>
			<u-icon name="arrow-right" ></u-icon>
		</view>
		<view class="prove-item">
			<image src="../../static/r2.png" mode="widthFix"></image>
			<text class="prove-title">企业实名认证</text>
			<text class="prove-info">未认证</text>
			<u-icon name="arrow-right" ></u-icon>
		</view>
		<view class="prove-item">
			<image src="../../static/r3.png" mode="widthFix"></image>
			<text class="prove-title">道路运输资格认证</text>
			<text class="prove-info">未认证</text>
			<u-icon name="arrow-right"></u-icon>
		</view>
		<view class="prove-item">
			<image src="../../static/r4.png" mode="widthFix"></image>
			<text class="prove-title">驾照认证</text>
			<text class="prove-info">未认证</text>
			<u-icon name="arrow-right" ></u-icon>
		</view>
		<view class="prove-item">
			<image src="../../static/r5.png" mode="widthFix"></image>
			<text class="prove-title">手机号认证</text>
			<text class="prove-info">未认证</text>
			<u-icon name="arrow-right" ></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
				width: 20vw;
				text-align: center;
				color: #999;
			}
		}
	}
</style>
