<template>
	<view>
		<view class="info-list">
			<view class="info-left">职位名称</view>
			<view class="info-right">{{info.name}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">薪资</view>
			<view class="info-right">{{info.start_salary}}-{{info.end_salary}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">招聘人数</view>
			<view class="info-right">{{info.people_nums}}人</view>
		</view>
		<view class="info-list">
			<view class="info-left">工作年限</view>
			<view class="info-right">{{info.number_year}}年</view>
		</view>
		<view class="info-list">
			<view class="info-left">学历</view>
			<view class="info-right">{{info.school}}</view>
		</view>
		<view class="info-list">
			<view class="info-left">工作地址</view>
			<view class="info-right">{{info.address}}</view>
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
			<view class="other-title">职位福利</view>
			<view class="other-main">{{info.welfare}}</view>
		</view>
		<view class="info-other">
			<view class="other-title">岗位描述</view>
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
				info: []
			}
		},
		onLoad() {
			this.info = uni.getStorageSync('invite')
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
	
	.info-list{
		display: flex;
		padding: 30rpx;
		font-size: 32rpx;
		border-bottom: 1px solid #efefef;
		.info-left{
			width: 30vw;
			text-align: left;
		}
		.info-right{
			width: 70vw;
			text-align: right;
			font-weight: bold;
		}
		.text-red{
			color: red;
		}
		
	}
	.info-other{
		padding: 30rpx;
		.other-title{
			font-weight: bold;
		}
		.other-main{
			font-size: 32rpx;
			margin-top: 20rpx;
		}
	}
	.info-btn{
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
