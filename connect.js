const mysql = require('mysql')
const express = require('express')
const app = express()
const router = express.Router();
//该作品由网友提供需要各位下载express还有mysql终止json文件里没有的
//都得下，如果要连接另一台机子的mysql（跨域）请用npm install cors
//下载跨域模块并 const cors = require('cors')导入app.mount挂载本人不对傻逼负责如需配置路由请切换app.get/post后得内容
//如有疑问加本人qq2899356288 微信（不长在）19538976521

const bodyParser = require('body-parser')
let login = true;

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))

const option = {
    host: '',
    user: '',
    password: '',
    port: '',
    database: '',
    connectTimeout: 5000, 
    multipleStatements: false 
}
let pool;
repool()
function Result ({ code = 1, msg = '', data = {} }) {
    this.code = code;
    this.msg = msg;
    this.data = data;
}

function repool() {
    
    pool = mysql.createPool({
        ...option,
        waitForConnections: true, //当无连接池可用时，等待（true）还是抛错（false）
        connectionLimit: 100, //连接数限制
        queueLimit: 0 //最大连接等待数（0为不限制）
    })
    pool.on('error', err => {
        err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool, 2000)
    })
    app.all('*', (_,__, next) => {
        pool.getConnection( err => {
            err && setTimeout(repool, 2000) || next()
        })
    })
}

module.exports = { app, pool, Result, router }
