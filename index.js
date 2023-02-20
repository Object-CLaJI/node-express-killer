//该作品由网友提供需要各位下载express还有mysql终止json文件里没有的
//都得下，如果要连接另一台机子的mysql（跨域）请用npm install cors
//下载跨域模块并 const cors = require('cors')导入app.mount挂载本人不对傻逼负责如需配置路由请切换app.get/post后得内容
//如有疑问加本人qq2899356288 微信（不长在）19538976521

const { app, pool, Result } =require('./connect')
const login = require('./router/login')
app.all('*', (req, res, next) => {
    
    next()
})
app.all('/', (req, res) => {
    pool.getConnection((err, conn) => {
        res.json({ type: 'test'})
        pool.releaseConnection(conn) 
    })
})
app.use('/login', login)
app.listen(8088, () => {
    console.log('服务启动')
})
