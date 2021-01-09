<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			let user = uni.getStorageSync('user')
			if (user) {
				this.$api.getUserInfo({
					id: user.id
				}).then(res => {
					if (res.code == 1) {
						uni.setStorageSync('user', res.data)
					}
				})
			}
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	
</style>
