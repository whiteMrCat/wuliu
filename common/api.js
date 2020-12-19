import request from '@/common/request.js'

const api = {}
// 登录
api.login = params => request.globalRequest('/api/wuliu/user/login', 'POST', params)
// 获取网站信息
api.getSet = params => request.globalRequest('/api/wuliu/set/index', 'POST', params)


export default api