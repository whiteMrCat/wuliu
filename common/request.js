import urlConfig from './config.js'

const request = {}   

request.globalRequest = (url, method, data) => {
	const headers = {
		'XX-Token'	: uni.getStorageSync('xt') ? uni.getStorageSync('xt') : ''
	}
    return uni.request({
        url: urlConfig + url,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
		return res[1].data
  //       if (res[1].data.i && res[1].data.s == 1) {
  //           return res[1].data.d
  //       } else if (res[1].data.s == 0){
		// 	uni.showToast({
		// 	    title: res[1].data.i,
		// 		icon: 'none',
		// 	    duration: 2000
		// 	});
  //           throw res[1].data.d
  //       } else {
		// 	uni.showToast({
		// 	    title: '网络错误',
		// 		icon: 'none',
		// 	    duration: 2000
		// 	});
		// 	throw res[1].data.d
		// }
    }).catch(parmas => {
　　　　　　switch (parmas.code) {
　　　　　　　　case 401:
　　　　　　　　　　uni.clearStorageSync()
　　　　　　　　　　break
　　　　　　　　default:
　　　　　　　　　　uni.showToast({
　　　　　　　　　　　　title: parmas.message,
　　　　　　　　　　　　icon: 'none'
　　　　　　　　　　})
　　　　　　　　　　return Promise.reject()
　　　　　　　　　　break
　　　　　　}
　　})
 } 

export default request