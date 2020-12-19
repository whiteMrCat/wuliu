<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view v-if="isCanUse">
			<view>
				<view class='header'>
					<image src='../../static/wei.png'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>
				<button :disabled="OpenId != ''" class="bottom" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx">{{OpenId != "" && OpenId != undefined ? "已授权,获取手机号后即可下一步" : "小程序授权"}}</button>
				<button :disabled="OpenId == ''" class='bottom' type='primary' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	var WXBizDataCrypt = require('../../js_sdk/WXBizDataCrypt.js');  
	export default {
		data() {
			return {
				apiHost: this.$url,
				appId: 'wx7a8004ea2b312e31',
				authorization: '',
				user: [],
				SessionKey: '',
				OpenId: '',
				nickName: null,
				avatarUrl: null,
				isCanUse: uni.getStorageSync('isCanUse') || true //默认为true
			};
		},
		methods: {
			getPhoneNumber: function(e) {
				let _this = this
				// console.log(e)
				if (e.detail.iv == undefined) {
					_this.userLogin()
				} else {
					let encryptedData = e.detail.encryptedData
					let iv = e.detail.iv
					let pc = new WXBizDataCrypt(this.appId, this.SessionKey);  
					let data = pc.decryptData(encryptedData, iv);
					_this.userLogin(data.phoneNumber)
				}
				
			},
			//登录
			appLoginWx() {
				// #ifdef MP-WEIXIN
				let _this = this
				uni.getProvider({
					service: 'oauth',
					success: function(res) {
						console.log(res)
						if (~res.provider.indexOf('weixin')) {
							uni.login({
								provider: 'weixin',
								success: (loginRes) => {
									console.log(loginRes)
									_this.authorization = loginRes.code;
									uni.request({
										url: _this.apiHost + '/api/wuliu/user/wxInfo',
										data: {
											code: loginRes.code,
										},
										method: 'GET',
										header: {
											'content-type': 'application/json',
											'XX-Device-Type': 'wxapp'
										},
										success: (res) => {
											if (res.data.data.openid) {
												_this.OpenId = res.data.data.openid
												_this.SessionKey = res.data.data.session_key
												uni.getUserInfo({
													provider: 'weixin',
													success: (info) => { 
														_this.user = info.userInfo
													},
													fail: () => {
														uni.showToast({
															title: "微信登录授权失败",
															icon: "none"
														});
													}
												})
											} else {
												uni.showToast({
													title: "微信登录授权失败",
													icon: "none"
												});
											}
											
										},
										fail:function(){
											uni.showToast({
												title: "微信登录授权失败",
												icon: "none"
											});
										}
									});


								},
								fail: () => {
									uni.showToast({
										title: "微信登录授权失败",
										icon: "none"
									});
								}
							})

						} else {
							uni.showToast({
								title: '请先安装微信或升级版本',
								icon: "none"
							});
						}
					}
				});
				//#endif
			},
			
			userLogin(mobile) {
				let _this = this
				this.$api.login({
					open_id: this.OpenId,
					username: this.user.nickName,
					mobile: mobile,
					avatar: this.user.avatarUrl
				}).then(res => {
					console.log(res)
					uni.setStorageSync('user', res.data)
					uni.setStorageSync('xt', res.data.token)
					uni.showToast({
					    title: '登录成功',
					    duration: 1000
					});
					setTimeout(function () {
						uni.navigateBack({
							
						})
					}, 1000)
				})
			}
		},
		onLoad() { //默认加载
			
		}
	}
</script>

<style lang="less">
	.header { 
		margin: 90rpx 0 90rpx 50rpx;
		border-bottom: 1px solid #ccc;
		text-align: center;
		width: 650rpx;
		height: 300rpx;
		line-height: 450rpx;
	}

	.header image {
		width: 200rpx;
		height: 200rpx;
	}

	.content {
		margin-left: 50rpx;
		margin-bottom: 90rpx;
	}

	.content text {
		display: block;
		color: #9d9d9d;
		margin-top: 40rpx;
	}

	.bottom {
		border-radius: 80rpx;
		margin: 70rpx 50rpx;
		font-size: 35rpx;
	}
</style>
