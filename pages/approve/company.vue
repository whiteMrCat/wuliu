<template>
	<view class="approve" style="padding: 30rpx;">
		<u-form :model="form" ref="uForm" label-width="200">
			<u-form-item label="公司名称">
				<u-input v-model="form.company_name" placeholder="请输入姓名" />
			</u-form-item>
			<u-form-item label="营业执照" label-position="top" label-align="left" style="padding: 30rpx;">
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
					company_name: '',
					idCard: '',
					company_url: []
				},
				fileList: [],
			};
		},
		methods: {
			submitForm() {
				let _this = this
				let user = uni.getStorageSync('user')
				this.$api.updateCompany({
					id: user.id,
					company_name: this.form.company_name,
					company_url: this.form.company_url,
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
				this.form.company_url.push(data.data)
			},
			removePic(index, lists, name) {
				this.form.company_url.splice(index, 1)
			}
		}
	}
</script>

<style lang="less">
	.approve {}
</style>
