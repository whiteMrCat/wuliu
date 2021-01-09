<template>
	<view class="approve" style="padding: 30rpx;">
		<u-form :model="form" ref="uForm" label-width="200">
			<u-form-item label="道路运输资格证书" label-position="top" label-align="left" style="padding: 30rpx;">
				<u-upload :action="action" :file-list="form.fileList" @on-success="uploadSuc" @on-remove="removePic" max-count="2"></u-upload>
			</u-form-item>
		</u-form>
		<view style="padding: 30rpx;">
			<u-button type="primary" @click="submitForm">提交审核</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action: this.$url + '/api/wuliu/set/upload',
				form: {
					road: []
				},
				fileList: [],
			};
		},
		methods: {
			submitForm() {
				let _this = this
				let user = uni.getStorageSync('user')
				this.$api.updateRoad({
					id: user.id,
					road: this.form.road,
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '提交成功,正在审核',
							icon: 'none',
						    duration: 2000
						});
						uni.setStorageSync('user', res.data)
						setTimeout(function() {
							uni.navigateBack()
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
			uploadSuc(data, index, lists, name) {
				// console.log(data)
				this.form.road.push(data.data)
			},
			removePic(index, lists, name) {
				this.form.road.splice(index, 1)
			}
		}
	}
</script>

<style lang="less">
	.approve {}
</style>
