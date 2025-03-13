/********************************************
 * server.js
 * 启动 Node + Express 服务器，托管静态资源
 ********************************************/
const express = require('express');
const path = require('path');
// 如果需要使用 .env 文件来存放密钥，可解开下面这行
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 1) 如果你想让所有前端静态文件(HTML/CSS/JS等)直接被访问，
//   可以将项目根目录或某个指定文件夹作为静态资源目录:
app.use(express.static(path.join(__dirname)));

// 2) 如果你有多个文件夹，比如 src/styles、src/js，也可以这样：
/*
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/js', express.static(path.join(__dirname, 'src', 'js')));
*/

// 3) 若你的 index.html 放在根目录，直接在 “/” 路由中返回它:
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
