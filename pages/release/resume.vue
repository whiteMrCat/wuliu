<template>
	<view class="release">
		<u-form :model="form" ref="uForm" label-width="200" label-align="center">
			<!-- <u-form-item label="始发地">
				<u-input v-model="form.startAddress.address" disabled @click="setAddress(1)" placeholder="请选择始发地" />
			</u-form-item>
			<u-form-item label="目的地">
				<u-input v-model="form.endAddress.address" disabled @click="setAddress(2)" placeholder="请选择目的地" />
			</u-form-item> -->
			<u-form-item label="职位名称" prop="user">
				<u-input v-model="form.name" placeholder="请输入职位名称" />
			</u-form-item>
			<u-form-item label="最低薪资" prop="user">
				<u-input v-model="form.start_salary" placeholder="请输入最低薪资" />
			</u-form-item>
			<u-form-item label="最高薪资" prop="user">
				<u-input v-model="form.end_salary" placeholder="请输入最高薪资" />
			</u-form-item>
			<u-form-item label="年龄" prop="user">
				<u-input v-model="form.born" placeholder="请输入年龄" />
			</u-form-item>
			<u-form-item label="工作年限" prop="user">
				<u-input v-model="form.number_year" placeholder="请输入工作年限/年" />
			</u-form-item>
			<u-form-item label="工作地址">
				<u-input v-model="form.address.address" disabled @click="setAddress" placeholder="请选择工作地址" />
			</u-form-item>
			<u-form-item label="学历">
				<u-input v-model="form.school" disabled @click="showSchool = true" placeholder="请选择学历" />
			</u-form-item>
			<u-form-item label="联系人" prop="user">
				<u-input v-model="form.contact" placeholder="请输入联系人" />
			</u-form-item>
			<u-form-item label="联系电话" prop="mobile">
				<u-input v-model="form.mobile" placeholder="请输入联系电话" />
			</u-form-item>
			<u-form-item>
				<view style="padding-left: 30rpx;">自我介绍</view>
				<view style="padding-left: 30rpx;">
					<u-input v-model="form.info" type="textarea" :border="false" :auto-height="false" />
				</view>
			</u-form-item>
			<!-- <u-form-item>
				<view style="padding-left: 30rpx;">职位福利</view>
				<view style="padding-left: 30rpx;">
					<u-input v-model="form.welfare" type="textarea" :border="false" :auto-height="false" />
				</view>
			</u-form-item> -->
			<u-form-item label="是否置顶">
				<u-switch v-model="form.isTop" slot="right" style="margin-right: 30rpx;"></u-switch>
			</u-form-item>

		</u-form>
		<view style="padding: 30rpx;">
			<u-button type="primary" @click="submitForm">{{form.isTop ? '发布并支付置顶费用：￥10' : '发布'}}</u-button>
		</view>
		<!-- 地点选择 -->
		<u-picker mode="region" v-model="showAddress" @confirm="getAddress"></u-picker>
		<!-- 车辆类型选择 -->
		<u-picker mode="selector" v-model="showSchool" :range="selector" range-key="name" @confirm="setSchool"></u-picker>
		<!-- 路线类型 -->
		<u-picker mode="selector" v-model="showWayType" :range="selectorWay" range-key="name" @confirm="setWayType"></u-picker>
		<!-- 出发时间 -->
		<u-picker mode="time" v-model="showTime" :params="params" @confirm="getTime"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSchool: false,
				showTime: false,
				showType: false,
				selector: [{
						name: '无',
						id: 1
					},
					{
						name: '小学',
						id: 2
					},
					{
						name: '中学',
						id: 3
					},
					{
						name: '中专',
						id: 4
					},
					{
						name: '高中',
						id: 5
					},
					{
						name: '大专',
						id: 6
					},
					{
						name: '本科',
						id: 7
					}
				],
				showWayType: false,
				selectorWay: [{
						name: '专程车',
						id: 1
					},
					{
						name: '回程车',
						id: 2
					}
				],
				showAddress: false,
				addressIndex: 1,
				form: {
					address: [],
					name: '',
					start_salary: '',
					end_salary: '', 
					born: '',
					number_year: '',
					school: '',
					info: '',
					contact: '',
					mobile: '',
					isTop: false
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false,
					timestamp: true
				},
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submitForm() {
				let _this = this
				this.$api.addInfoResume({
					'name': this.form.name,
					'start_salary': this.form.start_salary,
					'end_salary': this.form.end_salary,
					'born': this.form.born,
					'number_year': this.form.number_year,
					'school': this.form.school,
					'address': this.form.address.address,
					'info': this.form.info,
					'contact': this.form.contact,
					'mobile': this.form.mobile
				}).then(res => {
					console.log(res)
					// if (res.code == 1) {
					// 	uni.showToast({
					// 		title: '保存成功',
					// 		duration: 2000
					// 	});
					// 	setTimeout(function() {
					// 		uni.navigateBack()
					// 	}, 2000)
					// }
					if (res.code == 1) {
						if (_this.form.isTop == true) {
							uni.showToast({
								title: '保存成功，正在创建支付订单',
								icon: 'none',
								duration: 2000
							});
							_this.$api.makeOrder({
								pay_way: 0,
								body: '求职信息置顶费用',
								day_size: 7,
								info_id: res.data.id,
								info_type: '求职'
							}).then(resd => {
								if (resd.code == 1) {
									uni.showToast({
										title: '订单创建成功，正在跳转订单页面',
										icon: 'none',
										duration: 2000
									});
									uni.setStorageSync('order', resd.data)
									uni.setStorageSync('infos', res.data)
									setTimeout(function() {
										uni.redirectTo({
											url: '/pages/getOrder/getOrder'
										})
									}, 2000)
								} else {
									uni.showToast({
										title: '订单创建失败，置顶失败',
										icon: 'none',
										duration: 2000
									});
								}
							})
						} else {
							uni.showToast({
								title: '保存成功',
								duration: 2000
							});
							setTimeout(function() {
								uni.navigateBack()
							}, 2000)
						}
					
					}
					
				})
			},
			getTime(e) {
				// console.log(e)
				this.form.time = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
				this.form.timeStamp = e.timestamp
			},
			setWayType(e) {
				this.form.wayType = this.selectorWay[e].name
			},
			setSchool(e) {
				this.form.school = this.selector[e].name
			},
			setType(e) {
				// console.log(e)
				this.form.goods_type = this.selector[e].name
			},
			setAddress() {
				this.showAddress = true
			},
			getAddress(e) {
				this.form.address = {
					address: e.province.label + '-' + e.city.label + '-' + e.area.label,
					province: e.province,
					city: e.city,
					area: e.area
				}
			}
		}
	}
</script>

<style lang="less">

</style>
