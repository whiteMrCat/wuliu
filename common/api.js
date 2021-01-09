import request from '@/common/request.js'

const api = {}
// 登录
api.login = params => request.globalRequest('/api/wuliu/user/login', 'POST', params)
// 获取网站信息
api.getSet = params => request.globalRequest('/api/wuliu/set/index', 'POST', params)
// 上传图片
api.uploadImg = params => request.globalRequest('/api/wuliu/set/upload', 'POST', params)

/*
 *车源相关
 */
//获取
api.getInfoCar = params => request.globalRequest('/api/wuliu/info_car/index', 'POST', params)
//添加
api.addInfoCar = params => request.globalRequest('/api/wuliu/info_car/addInfo', 'POST', params)
//置顶
api.topInfoCar = params => request.globalRequest('/api/wuliu/info_car/topCarInfo', 'POST', params)
//更新
api.updateInfoCar = params => request.globalRequest('/api/wuliu/info_car/update_info', 'POST', params)
//删除
api.delInfoCar = params => request.globalRequest('/api/wuliu/info_car/del_info', 'POST', params)


/*
 *货源相关
 */
//获取
api.getInfoGoods = params => request.globalRequest('/api/wuliu/info_goods/index', 'POST', params)
//添加
api.addInfoGoods = params => request.globalRequest('/api/wuliu/info_goods/addInfo', 'POST', params)
//置顶
api.topInfoGoods = params => request.globalRequest('/api/wuliu/info_goods/topCarInfo', 'POST', params)
//更新
api.updateInfoGoods = params => request.globalRequest('/api/wuliu/info_goods/update_info', 'POST', params)
//删除
api.delInfoGoods = params => request.globalRequest('/api/wuliu/info_goods/del_info', 'POST', params)

/*
 *招聘相关
 */
//获取
api.getInfoInvite = params => request.globalRequest('/api/wuliu/info_invite/index', 'POST', params)
//添加
api.addInfoInvite = params => request.globalRequest('/api/wuliu/info_invite/addInfo', 'POST', params)
//置顶
api.topInfoInvite = params => request.globalRequest('/api/wuliu/info_invite/topCarInfo', 'POST', params)
//更新
api.updateInfoInvite = params => request.globalRequest('/api/wuliu/info_invite/update_info', 'POST', params)
//删除
api.delInfoInvite = params => request.globalRequest('/api/wuliu/info_invite/del_info', 'POST', params)

/*
 *求职相关
 */
//获取
api.getInfoResume = params => request.globalRequest('/api/wuliu/info_resume/index', 'POST', params)
//添加
api.addInfoResume = params => request.globalRequest('/api/wuliu/info_resume/addInfo', 'POST', params)
//置顶
api.topInfoResume = params => request.globalRequest('/api/wuliu/info_resume/topCarInfo', 'POST', params)
//更新
api.updateInfoResume = params => request.globalRequest('/api/wuliu/info_resume/update_info', 'POST', params)
//删除
api.delInfoResume = params => request.globalRequest('/api/wuliu/info_resume/del_info', 'POST', params)

/*
 *汽车相关
 */
//获取
api.getInfoUsed = params => request.globalRequest('/api/wuliu/info_used/index', 'POST', params)
//添加
api.addInfoUsed = params => request.globalRequest('/api/wuliu/info_used/addInfo', 'POST', params)
//置顶
api.topInfoUsed = params => request.globalRequest('/api/wuliu/info_used/topCarInfo', 'POST', params)
//更新
api.updateInfoUsed = params => request.globalRequest('/api/wuliu/info_used/update_info', 'POST', params)
//删除
api.delInfoUsed = params => request.globalRequest('/api/wuliu/info_used/del_info', 'POST', params)

/*
 *订单相关
 */
//预创建订单
api.makeOrder = params => request.globalRequest('/api/wuliu/order/makeOrder', 'POST', params)
//支付订单
api.payOrder = params => request.globalRequest('/api/wuliu/order/pay_order', 'POST', params)

/*
 *文章相关
 */
//列表
api.getArticle = params => request.globalRequest('/api/wuliu/article/getArticle', 'POST', params)
//文章分类
api.getArticleType = params => request.globalRequest('/api/wuliu/article/getArticleType', 'POST', params)
//文章详情
api.getArticleInfo = params => request.globalRequest('/api/wuliu/article/getArticleInfo', 'POST', params)

/*
 *用户相关
 */
//开通会员
api.openVip = params => request.globalRequest('/api/wuliu/user/open_vip', 'POST', params)
//更新信息
api.updateUser = params => request.globalRequest('/api/wuliu/user/update_user', 'POST', params)
//个人实名认证
api.updatePersonal = params => request.globalRequest('/api/wuliu/user/update_personal', 'POST', params)
//企业实名认证
api.updateCompany = params => request.globalRequest('/api/wuliu/user/update_company', 'POST', params)
//道路运输资格认证
api.updateRoad = params => request.globalRequest('/api/wuliu/user/update_road', 'POST', params)
//驾照认证
api.updateDriver = params => request.globalRequest('/api/wuliu/user/update_driver', 'POST', params)
//获取用户信息
api.getUserInfo = params => request.globalRequest('/api/wuliu/user/getUserInfo', 'POST', params)

export default api