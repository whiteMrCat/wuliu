<template>
	<view class="release">
		<u-form :model="form" ref="uForm" label-width="200" label-align="center">
			<u-form-item label="信息标题" prop="intro">
				<u-input v-model="form.title" placeholder="请输入信息标题" />
			</u-form-item>
			<u-form-item label="车辆所在地" prop="intro">
				<u-input v-model="form.address.address" disabled @click="setAddress" placeholder="请选择车辆所在地" />
			</u-form-item>
			<u-form-item label="联系人" prop="user">
				<u-input v-model="form.user" placeholder="请输入联系人" />
			</u-form-item>
			<u-form-item label="联系电话" prop="mobile">
				<u-input v-model="form.mobile" placeholder="请输入联系电话" />
			</u-form-item>
			<u-form-item label="罐体分类">
				<u-input v-model="form.carType" disabled @click="showType = true" placeholder="请选择罐体分类" />
			</u-form-item>
			<u-form-item label="介质分类">
				<u-input v-model="form.media" disabled placeholder="请选择介质分类" />
			</u-form-item>
			<u-form-item label="预估价格">
				<u-input v-model="form.price" placeholder="请输入预估价格/万元" />
			</u-form-item>
			<u-form-item label="上牌时间">
				<u-input v-model="form.time" disabled @click="showTime = true" placeholder="请选择上牌时间" />
			</u-form-item>
			<u-form-item label="车长">
				<u-input v-model="form.carSize" placeholder="请输入车长/米" />
			</u-form-item>
			<u-form-item label="缩略图" label-position="top" label-align="left" style="padding: 30rpx;">
				<u-upload :action="action" :file-list="fileList"></u-upload>
			</u-form-item>
			<u-form-item label="车辆图片" label-position="top" label-align="left" style="padding: 30rpx;">
				<u-upload :action="action" :file-list="fileList"></u-upload>
			</u-form-item>
			<u-form-item label="车辆介绍" label-position="top" label-align="left" style="padding: 30rpx;">
				<u-input v-model="form.info" type="textarea" :border="false" :auto-height="false" />
			</u-form-item>
			<u-form-item label="车辆视频 *需开通VIP" label-position="top" label-align="left" style="padding: 30rpx;">
				<u-upload :action="action" :file-list="fileList"></u-upload>
			</u-form-item>
			<u-form-item label="是否置顶">
				<u-switch v-model="form.isTop" slot="right" style="margin-right: 30rpx;"></u-switch>
			</u-form-item>

		</u-form>
		<view style="padding: 30rpx;">
			<u-button type="primary">{{form.isTop ? '发布并支付置顶费用：￥10' : '发布'}}</u-button>
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
				form: {
					title: '',
					address: [],
					user: '',
					mobile: '',
					carType: '',
					media: '',
					time: '',
					timeStamp: '',
					carSize: '',
					info: '',
					price: '',
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
				action: 'http://www.example.com/upload',
				fileList: [{
					url: 'http://pics.sc.chinaz.com/files/pic/pic9/201912/hpic1886.jpg',
				}],
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
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			getTime(e) {
				// console.log(e)
				this.form.time = e.year + '-' + e.month + '-' + e.day
				this.form.timeStamp = e.timestamp
			},
			setWayType(e) {
				this.form.wayType = this.selectorWay[e].name
			},
			setType(e) {
				// console.log(e)
				this.form.carType = this.selector[e].name
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
