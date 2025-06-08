/********************************************
 * server.js
 * Node + Express 服务器
 * - 托管静态前端资源
 * - 提供安全的 Mapbox Token 接口
 ********************************************/

const express = require('express');
const path = require('path');
require('dotenv').config(); // 加载 .env 中的环境变量

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ 托管整个项目目录中的静态文件（HTML / CSS / JS / 图片等）
app.use(express.static(path.join(__dirname)));

// ✅ 设置首页路由（可选，如果你有 index.html）
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ✅ 提供 Mapbox Token 的接口（前端用 fetch 拿）
app.get('/token', (req, res) => {
  const token = process.env.MAPBOX_TOKEN;

  if (!token) {
    return res.status(500).json({ error: 'Mapbox token not found in .env' });
  }

  res.json({ token });
});

// ✅ 启动服务器
app.listen(PORT, () => {
  console.log(`✅ Server is running at: http://localhost:${PORT}`);
});
