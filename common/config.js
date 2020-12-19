let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'http://127.0.0.4'
}else{
    // 生产环境
    // url_config = 'https://zltonline.dycckj.com'
    url_config = 'https://127.0.0.4'
}

export default url_config