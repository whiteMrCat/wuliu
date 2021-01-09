<template>
	<view class="release">
		<u-form :model="form" ref="uForm" label-width="200" label-align="center">
			<u-form-item label="始发地">
				<u-input v-model="form.startAddress.address" disabled @click="setAddress(1)" placeholder="请选择始发地" />
			</u-form-item>
			<u-form-item label="目的地">
				<u-input v-model="form.endAddress.address" disabled @click="setAddress(2)" placeholder="请选择目的地" />
			</u-form-item>
			<u-form-item label="联系人" prop="user">
				<u-input v-model="form.user" placeholder="请输入联系人" />
			</u-form-item>
			<u-form-item label="联系电话" prop="mobile">
				<u-input v-model="form.mobile" placeholder="请输入联系电话" />
			</u-form-item>
			<u-form-item label="车辆载重" prop="load">
				<u-input v-model="form.load" placeholder="请输入车辆载重/吨" />
			</u-form-item>
			<u-form-item label="运费">
				<u-input v-model="form.freight" placeholder="请输入车辆运费/元,不填写为面议" />
			</u-form-item>
			<u-form-item label="车辆类型">
				<u-input v-model="form.carType" disabled @click="showType = true" placeholder="请选择车辆类型" />
			</u-form-item>
			<u-form-item label="路线类型">
				<u-input v-model="form.wayType" disabled @click="showWayType = true" placeholder="请选择路线类型" />
			</u-form-item>
			<u-form-item label="出发时间">
				<u-input v-model="form.time" disabled @click="showTime = true" placeholder="请选择出发时间" />
			</u-form-item>
			<u-form-item>
				<view style="padding-left: 30rpx;">备注</view>
				<view style="padding-left: 30rpx;">
					<u-input v-model="form.info" type="textarea" :border="false" :auto-height="false" />
				</view>
			</u-form-item>
			<u-form-item label="是否置顶">
				<u-switch v-model="form.isTop" slot="right" style="margin-right: 30rpx;"></u-switch>
			</u-form-item>

		</u-form>
		<view style="padding: 30rpx;">
			<u-button type="primary" @click="submitForm">{{form.isTop ? '发布并创建置顶订单' : '发布'}}</u-button>
		</view>
		<!-- 地点选择 -->
		<u-picker mode="region" v-model="showAddress" @confirm="getAddress"></u-picker>
		<!-- 车辆类型选择 -->
		<u-picker mode="selector" v-model="showType" :range="selector" range-key="name" @confirm="setType"></u-picker>
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
				showTime: false,
				showType: false,
				selector: [{
						name: '不锈钢罐',
						id: 1
					},
					{
						name: '压力罐',
						id: 2
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
					startAddress: [],
					endAddress: [],
					user: '',
					mobile: '',
					load: '', // 车辆载重
					freight: '', // 运费
					carType: '',
					wayType: '',
					time: '',
					timeStamp: '',
					info: '',
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
				rules: {
					user: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur,change'
					}],
					intro: [{
						min: 5,
						message: '简介不能少于5个字',
						trigger: 'change'
					}],
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					load: [{
						required: true,
						message: '请输入载重',
						trigger: ['change', 'blur'],
					}, {
						message: '请输入正确格式',
						type: 'number',
						trigger: ['change', 'blur'],
					}]
				}
			};
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submitForm() {
				let _this = this
				this.$api.addInfoCar({
					'start_address': this.form.startAddress.address,
					'end_address': this.form.endAddress.address,
					'contact': this.form.user,
					'mobile': this.form.mobile,
					'load': this.form.load,
					'freight': this.form.freight,
					'car_type': this.form.carType,
					'route_type': this.form.wayType,
					'start_time': this.form.timeStamp,
					'info': this.form.info
				}).then(res => {
					// console.log(res)
					if (res.code == 1) {
						if (_this.form.isTop == true) {
							uni.showToast({
								title: '保存成功，正在创建支付订单',
								icon: 'none',
								duration: 2000
							});
							_this.$api.makeOrder({
								pay_way: 0,
								body: '车源信息置顶费用',
								day_size: 7,
								info_id: res.data.id,
								info_type: '车源'
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
			setType(e) {
				// console.log(e)
				this.form.carType = this.selector[e].name
			},
			setAddress(index) {
				this.addressIndex = index
				this.showAddress = true
			},
			getAddress(e) {
				if (this.addressIndex == 1) {
					this.form.startAddress = {
						address: e.province.label + '-' + e.city.label + '-' + e.area.label,
						province: e.province,
						city: e.city,
						area: e.area
					}
				} else {
					this.form.endAddress = {
						address: e.province.label + '-' + e.city.label + '-' + e.area.label,
						province: e.province,
						city: e.city,
						area: e.area
					}
				}
			}
		}
	}
</script>

<style lang="less">

</style>
