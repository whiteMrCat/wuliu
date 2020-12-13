<template>
	<view>
		<u-tabs :list="tab_list" :is-scroll="true" :current="current" @change="change" bar-width="120"></u-tabs>
		<view class="list">
			<view class="list-item" v-for="(item, index) in 6" :key="index">
				<view class="list-left">
					<view class="list-title">东营市 至 广州市</view>
					<view class="list-info">
						<view class="info-item bg-blue-light">不锈钢罐</view>
						<view class="info-item bg-red-light">40m2</view>
						<view class="info-item bg-orange-light">￥1600</view>
					</view>
					<view class="list-other">备注：XXXXXXXXXXX</view>
				</view>
				<view class="list-right">
					<view class="right-btn">
						<u-icon name="more-dot-fill" color="#000" size="40" @click="show = true"></u-icon>
					</view>
					<view class="right-info">
						已置顶
					</view>
				</view>
			</view>

		</view>

		<u-action-sheet :list="list" v-model="show" @click="click"></u-action-sheet>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					text: '置顶',
					color: 'blue'
				}, {
					text: '编辑'
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
					name: '我的招聘'
				}, {
					name: '我的简历'
				}, {
					name: '我的二手车'
				}],
				current: 0,
			};
		},
		methods: {
			change(index) {
				this.current = index;
			},
			click(index) {
				console.log(`点击了第${index + 1}项，内容为：${this.list[index].text}`)
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

			.list-left {
				width: 80vw;

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
				.right-btn{
					text-align: right;
				}
				.right-info{
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
