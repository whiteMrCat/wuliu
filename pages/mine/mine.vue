<template>
	<view>
		<u-tabs :list="tab_list" :is-scroll="true" :current="current" @change="change" bar-width="120"></u-tabs>
		<view class="list" v-if="current == 0">
			<view class="list-item" v-for="(item, index) in carTopList" :key="index">
				<view class="list-left" @click="goUrlAndStorage('/pages/logistics/details','info_car', item)">
					<view class="list-title">{{item.start_address}} 至 {{item.end_address}}</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">{{item.car_type}}</view>
						<view class="info-item bg-red-light">{{item.load}}吨</view>
						<view class="info-item bg-orange-light">￥{{item.freight}}</view>
					</view>
					<view class="list-other">备注：{{item.info}}</view>
				</view>
				<view class="list-right">
					<view class="right-btn">
						<u-icon name="more-dot-fill" color="#000" size="40" @click="setItem(item)"></u-icon>
					</view>
					<view class="right-info" v-if="item.is_top == 1">
						已置顶
					</view>
				</view>
				<image src="../../static/xia.png" mode="widthFix" class="xia" v-if="item.status == 0"></image>
			</view>
		</view>
		<view class="list" v-if="current == 1">
			<view class="list-item" v-for="(item, index) in goodsTopList" :key="index">
				<view class="list-left" @click="goUrlAndStorage('/pages/logistics/goods','info_goods', item)">
					<view class="list-title">{{item.startAddress}} 至 {{item.endAddress}}</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">{{item.goods_type}}</view>
						<view class="info-item bg-red-light">{{item.weight}}吨</view>
						<view class="info-item bg-orange-light">￥{{item.freight == '' ? '面议' : item.freight}}</view>
					</view>
					<view class="list-other">备注：{{item.info}}</view>
				</view>
				<view class="list-right">
					<view class="right-btn">
						<u-icon name="more-dot-fill" color="#000" size="40" @click="setItem(item)"></u-icon>
					</view>
					<view class="right-info" v-if="item.is_top == 1">
						已置顶
					</view>
				</view>
				<image src="../../static/xia.png" mode="widthFix" class="xia" v-if="item.status == 0"></image>
			</view>
		</view>
		<view class="list" v-if="current == 2 || current == 3 || current == 4">
			<view class="list-item" v-for="(item, index) in listTop" :key="index">
				<view class="list-left" @click="goUrlAndStorage('/pages/trading/detail', 'used', item)">
					<view class="item-left">
						<image :src="imgHost + '/upload/' + item.car_img[0]" mode=""></image>
					</view>
					<view class="item-right">
						<view class="list-title">{{item.brand}}-{{item.name}}</view>
						<view class="list-info">
							<view class="info-item bg-blue-light">{{item.year}}年</view>
						</view>
						<view class="list-other">￥{{item.price}}万</view>
					</view>
				</view>
				<view class="list-right">
					<view class="right-btn">
						<u-icon name="more-dot-fill" color="#000" size="40" @click="setItem(item)"></u-icon>
					</view>
					<view class="right-info" v-if="item.is_top == 1">
						已置顶
					</view>
				</view>
				<image src="../../static/xia.png" mode="widthFix" class="xia" v-if="item.status == 0"></image>
			</view>
		</view>

		<view class="list" v-if="current == 5">
			<view class="list-item" v-for="(item, index) in inviteListTop" :key="index">
				<view class="list-left" @click="goUrlAndStorage('/pages/position/details', 'invite', item)">
					<view class="list-title">职位名称：{{item.name}}</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">{{item.address}}</view>
						<view class="info-item bg-red-light">{{item.number_year}}年</view>
						<view class="info-item bg-orange-light">{{item.school}}</view>
					</view>
					<view class="list-other" style="color: #fa3534;">{{item.start_salary}}-{{item.end_salary}}/月</view>
				</view>
				<view class="list-right">
					<view class="right-btn">
						<u-icon name="more-dot-fill" color="#000" size="40" @click="setItem(item)"></u-icon>
					</view>
					<view class="right-info" v-if="item.is_top == 1">
						已置顶
					</view>
				</view>
				<image src="../../static/xia.png" mode="widthFix" class="xia" v-if="item.status == 0"></image>
			</view>
		</view>

		<view class="list" v-if="current == 6">
			<view class="list-item" v-for="(item, index) in resumeListTop" :key="index">
				<view class="list-left" @click="goUrlAndStorage('/pages/position/resume', 'resume', item)">
					<view class="list-title">求职名称：{{item.name}}</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">{{item.address}}</view>
						<view class="info-item bg-red-light">{{item.number_year}}年</view>
						<view class="info-item bg-orange-light">{{item.school}}</view>
					</view>
					<view class="list-other" style="color: #fa3534;">{{item.start_salary}}-{{item.end_salary}}/月</view>
				</view>
				<view class="list-right">
					<view class="right-btn">
						<u-icon name="more-dot-fill" color="#000" size="40" @click="setItem(item)"></u-icon>
					</view>
					<view class="right-info" v-if="item.is_top == 1">
						已置顶
					</view>
				</view>
				<image src="../../static/xia.png" mode="widthFix" class="xia" v-if="item.status == 0"></image>
			</view>
		</view>

		<u-action-sheet :list="list" v-model="show" @click="click"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgHost: this.$url,
				list: [{
					text: '置顶',
					color: 'blue'
				}, {
					text: '上架'
				}, {
					text: '下架'
				}, {
					text: '删除',
					color: 'red'
				}, ],
				show: false,
				tab_list: [{
					name: '我的车源'
				}, {
					name: '我的货源'
				}, {
					name: '我的二手车'
				}, {
					name: '我的新车'
				}, {
					name: '我的求购'
				}, {
					name: '我的招聘'
				}, {
					name: '我的求职'
				}],
				current: 0,
				carTopList: [],
				goodsTopList: [],
				listTop: [],
				inviteListTop: [],
				resumeListTop: [],
				type: 0,
				user: [],
				itemInfo: [],
				page: 1
			};
		},
		onLoad(options) {
			this.user = uni.getStorageSync('user')
			this.change(parseInt(options.index))
		},
		onReachBottom() {
			let _this = this
			uni.showLoading({
				title: '加载中'
			})
			switch (index) {
				case 0:
					this.getTopInfoCar(this.page)
					break
				case 1:
					this.getTopInfoGoods(this.page)
					break
				case 2:
					this.type = 0
					this.getListTop(this.page)
			
					break
				case 3:
					this.type = 1
					this.getListTop(this.page)
			
					break
				case 4:
					this.type = 2
					this.getListTop(this.page)
			
					break
				case 5:
					this.getTopInfoInvite(this.page)
					break
				case 6:
					this.getTopInfoResume(this.page)
					break
			}
			setTimeout(function() {
				uni.hideLoading();
			}, 2000);
		},
		onPullDownRefresh() {
			this.page = 1
			this.change(this.current)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 2000);
		},
		methods: {
			setItem(item) {
				if (item.is_top == 1) {
					if (item.status == 0) {
						this.list = [{
							text: '上架'
						}, {
							text: '删除',
							color: 'red'
						}, ]
					} else {
						this.list = [{
							text: '下架'
						}, {
							text: '删除',
							color: 'red'
						}, ]
					}
				} else {
					if (item.status == 0) {
						this.list = [{
							text: '置顶',
							color: 'blue'
						}, {
							text: '上架'
						}, {
							text: '删除',
							color: 'red'
						}, ]
					} else {
						this.list = [{
							text: '置顶',
							color: 'blue'
						}, {
							text: '下架'
						}, {
							text: '删除',
							color: 'red'
						}, ]
					}
				}
				this.show = true
				this.itemInfo = item
			},
			goUrlAndStorage(url, name, info) {
				uni.navigateTo({
					url: url,
					animationType: 'pop-in',
					animationDuration: 200
				})
				uni.setStorageSync(name, info)
			},
			getTopInfoResume(page) {
				let _this = this
				this.$api.getInfoResume({
					page: page,
					page_size: 10,
					filters: {
						uid: this.user.id,
						status: 1
					}
				}).then(res => {
					if (page == 1) {
						_this.resumeListTop = res.data
					} else {
						_this.page += 1
						for (let x in res.data) {
							_this.resumeListTop.push(res.data[x])
						}
					}
				})
			},
			getTopInfoInvite(page) {
				let _this = this
				this.$api.getInfoInvite({
					page: page,
					page_size: 10,
					filters: {
						uid: this.user.id,
						status: 1
					}
				}).then(res => {
					if (page == 1) {
						_this.inviteListTop = res.data
					} else {
						_this.page += 1
						for (let x in res.data) {
							_this.inviteListTop.push(res.data[x])
						}
					}
				})
			},
			getListTop(page) {
				let _this = this
				this.$api.getInfoUsed({
					page: page,
					page_size: 10,
					filters: {
						uid: this.user.id,
						type: this.type
					}
				}).then(res => {
					let lists = res.data
					for (let key in lists) {
						// lists[key]['car_img'].replace(/\\/g,'/')
						for (let _key in lists[key]['car_img']) {
							lists[key]['car_img'][_key] = lists[key]['car_img'][_key].replace(/\\/g, "/")
							// console.log(lists[key]['car_img'][_key])
						}
					}
					if (page == 1) {
						_this.listTop = lists
					} else {
						_this.page += 1
						for (let x in lists) {
							_this.listTop.push(lists[x])
						}
					}
				})
			},
			getTopInfoCar(page) {
				let _this = this
				this.$api.getInfoCar({
					page: page,
					page_size: 10,
					filters: {
						uid: this.user.id,
					}
				}).then(res => {
					// console.log(res)
					if (page == 1) {
						_this.carTopList = res.data
					} else {
						_this.page += 1
						for (let x in res.data) {
							_this.carTopList.push(res.data[x])
						}
					}
				})
			},
			getTopInfoGoods(page) {
				let _this = this
				this.$api.getInfoGoods({
					page: page,
					page_size: 10,
					filters: {
						uid: this.user.id,
					}
				}).then(res => {
					console.log('top', res)
					if (page == 1) {
						_this.goodsTopList = res.data
					} else {
						_this.page += 1
						for (let x in res.data) {
							_this.goodsTopList.push(res.data[x])
						}
					}
				})
			},
			change(index) {
				this.current = index;
				switch (index) {
					case 0:
						this.getTopInfoCar(1)
						break
					case 1:
						this.getTopInfoGoods(1)
						break
					case 2:
						this.type = 0
						this.getListTop(1)

						break
					case 3:
						this.type = 1
						this.getListTop(1)

						break
					case 4:
						this.type = 2
						this.getListTop(1)

						break
					case 5:
						this.getTopInfoInvite(1)
						break
					case 6:
						this.getTopInfoResume(1)
						break
				}
			},
			changeCarInfo(data) {
				let _this = this
				this.$api.updateInfoCar(data).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '成功',
						    duration: 2000
						});
					} else {
						uni.showToast({
						    title: '失败',
							icon: 'none',
						    duration: 2000
						});
					}
				})
			},
			changeGoodsInfo(data) {
				let _this = this
				this.$api.updateInfoGoods(data).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '成功',
						    duration: 2000
						});
					} else {
						uni.showToast({
						    title: '失败',
							icon: 'none',
						    duration: 2000
						});
					}
				})
			},
			changeInviteInfo(data) {
				let _this = this
				this.$api.updateInfoInvite(data).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '成功',
						    duration: 2000
						});
					} else {
						uni.showToast({
						    title: '失败',
							icon: 'none',
						    duration: 2000
						});
					}
				})
			},
			changeResumeInfo(data) {
				let _this = this
				this.$api.updateInfoResume(data).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '成功',
						    duration: 2000
						});
					} else {
						uni.showToast({
						    title: '失败',
							icon: 'none',
						    duration: 2000
						});
					}
				})
			},
			changeUsedInfo(data) {
				let _this = this
				this.$api.updateInfoUsed(data).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '成功',
						    duration: 2000
						});
					} else {
						uni.showToast({
						    title: '失败',
							icon: 'none',
						    duration: 2000
						});
					}
				})
			},
			delCarInfo(id) {
				let _this = this
				this.$api.delInfoCar({
					id: id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '成功',
						    duration: 2000
						});
					} else {
						uni.showToast({
						    title: '失败',
							icon: 'none',
						    duration: 2000
						});
					}
				})
			},
			delGoodsInfo(id) {
				let _this = this
				this.$api.delInfoGoods({
					id: id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '成功',
						    duration: 2000
						});
					} else {
						uni.showToast({
						    title: '失败',
							icon: 'none',
						    duration: 2000
						});
					}
				})
			},
			delUsedInfo(id) {
				let _this = this
				this.$api.delInfoUsed({
					id: id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '成功',
						    duration: 2000
						});
					} else {
						uni.showToast({
						    title: '失败',
							icon: 'none',
						    duration: 2000
						});
					}
				})
			},
			delInviteInfo(id) {
				let _this = this
				this.$api.delInfoInvite({
					id: id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '成功',
						    duration: 2000
						});
					} else {
						uni.showToast({
						    title: '失败',
							icon: 'none',
						    duration: 2000
						});
					}
				})
			},
			delResumeInfo(id) {
				let _this = this
				this.$api.delInfoResume({
					id: id
				}).then(res => {
					if (res.code == 1) {
						uni.showToast({
						    title: '成功',
						    duration: 2000
						});
					} else {
						uni.showToast({
						    title: '失败',
							icon: 'none',
						    duration: 2000
						});
					}
				})
			},
			click(index) {
				console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`)
				let text = this.list[index].text
				let _this = this
				let datad = {}
				switch (this.current) {
					case 0:
						switch (text) {
							case '置顶':
								
								break;
							case '上架':
								datad = {
									id: _this.itemInfo.id,
									status: 1
								}
								_this.changeCarInfo(datad)
								break;
							case '下架':
								datad = {
									id: _this.itemInfo.id,
									status: 0
								}
								_this.changeCarInfo(datad)
								break;
							case '删除':
								_this.delCarInfo(_this.itemInfo.id)
								break;
						}
						this.getTopInfoCar(1)
						break;
					case 1:
						switch (text) {
							case '置顶':
								break;
							case '上架':
								datad = {
									id: _this.itemInfo.id,
									status: 1
								}
								_this.changeGoodsInfo(datad)
								break;
							case '下架':
								datad = {
									id: _this.itemInfo.id,
									status: 0
								}
								_this.changeGoodsInfo(datad)
								break;
							case '删除':
								_this.delGoodsInfo(_this.itemInfo.id)
								break;
						}
						this.getTopInfoGoods(1)
						break;
					case 2:
						switch (text) {
							case '置顶':
								break;
							case '上架':
								datad = {
									id: _this.itemInfo.id,
									status: 1
								}
								_this.changeUsedInfo(datad)
								break;
							case '下架':
								datad = {
									id: _this.itemInfo.id,
									status: 0
								}
								_this.changeUsedInfo(datad)
								break;
							case '删除':
								_this.delUsedInfo(_this.itemInfo.id)
								break;
						}
						this.type = 0
						this.getListTop(1)
						break;
					case 3:
						switch (text) {
							case '置顶':
								break;
							case '上架':
								datad = {
									id: _this.itemInfo.id,
									status: 1
								}
								_this.changeUsedInfo(datad)
								break;
							case '下架':
								datad = {
									id: _this.itemInfo.id,
									status: 0
								}
								_this.changeUsedInfo(datad)
								break;
							case '删除':
								_this.delUsedInfo(_this.itemInfo.id)
								break;
						}
						this.type = 1
						this.getListTop(1)
						break;
					case 4:
						switch (text) {
							case '置顶':
								break;
							case '上架':
								datad = {
									id: _this.itemInfo.id,
									status: 1
								}
								_this.changeUsedInfo(datad)
								break;
							case '下架':
								datad = {
									id: _this.itemInfo.id,
									status: 0
								}
								_this.changeUsedInfo(datad)
								break;
							case '删除':
								_this.delUsedInfo(_this.itemInfo.id)
								break;
						}
						this.type = 2
						this.getListTop(1)
						break;
					case 5:
						switch (text) {
							case '置顶':
								break;
							case '上架':
								datad = {
									id: _this.itemInfo.id,
									status: 1
								}
								_this.changeInviteInfo(datad)
								break;
							case '下架':
								datad = {
									id: _this.itemInfo.id,
									status: 0
								}
								_this.changeInviteInfo(datad)
								break;
							case '删除':
								_this.delInviteInfo(_this.itemInfo.id)
								break;
						}
						this.getTopInfoInvite(1)
						break;
					case 6:
						switch (text) {
							case '置顶':
								break;
							case '上架':
								datad = {
									id: _this.itemInfo.id,
									status: 1
								}
								_this.changeResumeInfo(datad)
								break;
							case '下架':
								datad = {
									id: _this.itemInfo.id,
									status: 0
								}
								_this.changeResumeInfo(datad)
								break;
							case '删除':
								_this.delResumeInfo(_this.itemInfo.id)
								break;
						}
						this.getTopInfoResume(1)
						break;
				}
				
			}
		}
	}
</script>

<style lang="less">
	.list {
		margin-top: 10rpx;

		.list-item {
			display: flex;
			position: relative;
			background-color: #fff;
			// margin: 10rpx 0;
			padding: 30rpx;
			border-top: 1px solid #efefef;
			border-bottom: 1px solid #efefef;

			.xia {
				position: absolute;
				right: 30rpx;
				top: 30%;
				width: 100rpx;
			}

			.list-left {
				width: 80vw;
				overflow: hidden;

				.item-left {
					float: left;
					width: 30%;

					image {
						width: 100%;
						height: 160rpx;
					}
				}

				.item-right {
					float: left;
					width: 60%;
					margin-left: 20rpx;
				}

				.list-title {
					font-weight: bold;
				}

				.list-info {
					display: flex;
					margin: 20rpx 0;

					.info-item {
						padding: 10rpx 20rpx;
						background-color: #efefef;
						font-size: 8pt;
						margin-right: 20rpx;
						border-radius: 5rpx;
					}

					.bg-blue-light {
						background-color: #a0cfff;
						color: #fff;
					}

					.bg-red-light {
						background-color: #fab6b6;
						color: #fff;
					}

					.bg-orange-light {
						background-color: #fcbd71;
						color: #fff;
					}
				}



				.list-other {
					color: #777;
					font-size: 9pt;
				}
			}

			.list-right {
				width: 20vw;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.right-btn {
					text-align: right;
				}

				.right-info {
					text-align: right;
					color: red;
				}
			}

			.is-top {
				width: 10vw;
				position: absolute;
				right: 0px;
				top: 0px;
			}
		}
	}
</style>
