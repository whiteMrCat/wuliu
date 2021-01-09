<template>
	<view class="release">
		<u-form :model="form" ref="uForm" label-width="200" label-align="center">
			<u-form-item label="信息类型">
				<u-input v-model="form.type_name" disabled @click="showInfoType = true" placeholder="请选择信息类型" />
			</u-form-item>
			<u-form-item label="信息标题" prop="intro">
				<u-input v-model="form.name" placeholder="请输入信息标题" />
			</u-form-item>
			<u-form-item label="车辆品牌" prop="intro">
				<u-input v-model="form.brand" disabled @click="showBrandType = true" placeholder="请选择车辆品牌" />
			</u-form-item>
			<u-form-item label="车辆所在地" prop="intro">
				<u-input v-model="form.address.address" disabled @click="setAddress" placeholder="请选择车辆所在地" />
			</u-form-item>
			<u-form-item label="联系人" prop="user">
				<u-input v-model="form.contact" placeholder="请输入联系人" />
			</u-form-item>
			<u-form-item label="联系电话" prop="mobile">
				<u-input v-model="form.mobile" placeholder="请输入联系电话" />
			</u-form-item>
			<u-form-item label="罐体分类">
				<u-input v-model="form.car_type" disabled @click="showType = true" placeholder="请选择罐体分类" />
			</u-form-item>

			<!-- <u-form-item label="介质分类">
				<u-input v-model="form.media_type" disabled placeholder="请选择介质分类" />
			</u-form-item> -->
			<u-form-item label="预估价格">
				<u-input v-model="form.price" placeholder="请输入预估价格/万元" />
			</u-form-item>
			<u-form-item label="车长">
				<u-input v-model="form.length" placeholder="请输入车长/米" />
			</u-form-item>
			<u-form-item label="年限">
				<u-input v-model="form.year" placeholder="请输入年限/年" />
			</u-form-item>
			<u-form-item label="车辆图片" label-position="top" label-align="left" style="padding: 30rpx;">
				<u-upload :action="action" :file-list="form.fileList" @on-success="uploadSuc" @on-remove="removePic"></u-upload>
			</u-form-item>
			<u-form-item label="车辆介绍" label-position="top" label-align="left" style="padding: 30rpx;">
				<u-input v-model="form.info" type="textarea" :border="false" :auto-height="false" />
			</u-form-item>
			<u-form-item label="车辆视频 *需开通VIP" label-position="top" label-align="left" style="padding: 30rpx;">
				<u-upload :action="action" :file-list="form.car_video" disabled></u-upload>
			</u-form-item>
			<u-form-item label="是否置顶">
				<u-switch v-model="form.isTop" slot="right" style="margin-right: 30rpx;"></u-switch>
			</u-form-item>

		</u-form>
		<view style="padding: 30rpx;">
			<u-button type="primary" @click="submitForm">{{form.isTop ? '发布并支付置顶费用：￥10' : '发布'}}</u-button>
		</view>
		<!-- 地点选择 -->
		<u-picker mode="region" v-model="showAddress" @confirm="getAddress"></u-picker>
		<!-- 信息类型选择 -->
		<u-picker mode="selector" v-model="showInfoType" :range="selectorInfo" range-key="name" @confirm="setInfoType"></u-picker>
		<!-- 车辆类型选择 -->
		<u-picker mode="selector" v-model="showType" :range="selector" range-key="name" @confirm="setType"></u-picker>
		<!-- 车辆品牌 -->
		<u-picker mode="selector" v-model="showBrandType" :range="selectorBrand" range-key="name" @confirm="setBrandType"></u-picker>
		<!-- 出发时间 -->
		<u-picker mode="time" v-model="showTime" :params="params" @confirm="getTime"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showInfoType: false,
				showTime: false,
				showType: false,
				showBrandType: false,
				selectorInfo: [{
						name: '二手车',
						id: 0
					},
					{
						name: '新车',
						id: 1
					},
					{
						name: '车辆求购',
						id: 2
					}
				],
				selector: [],
				selectorBrand: [],
				showAddress: false,
				form: {
					name: '',
					car_type: '',
					car_img: [],
					media_type: '',
					brand: '',
					address: '',
					models: '',
					length: '',
					contact: '',
					mobile: '',
					price: '',
					year: '',
					info: '',
					type: 0,
					type_name: '',
					car_video: [],
					isTop: false
				},
				params: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					timestamp: true
				},
				action: this.$url + '/api/wuliu/set/upload',
				fileList: [],
				rules: {
					user: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式
						trigger: 'blur,change'
					}],
					intro: [{
						min: 3,
						message: '标题不能少于3个字',
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
		onLoad() {
			let set = uni.getStorageSync('set')
			this.selector = set.car_type
			this.selectorBrand = set.brand
		},
		onShow() {
			
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			removePic(index, lists, name) {
				this.form.car_img.splice(index, 1)
			},
			submitForm() {
				let _this = this
				this.$api.addInfoUsed({
					'name': this.form.name,
					'address': this.form.address.address,
					'contact': this.form.contact,
					'mobile': this.form.mobile,
					'car_type': this.form.car_type,
					'car_img': this.form.car_img,
					'media_type': this.form.media_type,
					'brand': this.form.brand,
					'models': this.form.models,
					'length': this.form.length,
					'price': this.form.price,
					'year': this.form.year,
					'info': this.form.info,
					'car_video': this.form.car_video,
					'type': this.form.type,
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
								body: '汽车信息置顶费用',
								day_size: 7,
								info_id: res.data.id,
								info_type: '汽车'
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
			uploadSuc(data, index, lists, name) {
				// console.log(data)
				this.form.car_img.push(data.data)
			},
			getTime(e) {
				// console.log(e)
				this.form.time = e.year + '-' + e.month + '-' + e.day
				this.form.timeStamp = e.timestamp
			},
			setBrandType(e) {
				this.form.brand = this.selectorBrand[e].name
			},
			setInfoType(e) {
				console.log(e)

				this.form.type_name = this.selectorInfo[e].name
				this.form.type = e[0]
			},
			setWayType(e) {
				this.form.wayType = this.selectorWay[e].name
			},
			setType(e) {
				// console.log(e)
				this.form.car_type = this.selector[e].name
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
