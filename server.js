const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let votes = {
  "應用方面": 0,
  "純數據分析": 0,
  "我都可以": 0
};

// 根路由
app.get('/', (req, res) => {
  res.send('Welcome to the Voting API! 使用 /api/votes 查看投票數據，或使用 /api/vote 進行投票。');
});

// 獲取投票數據
app.get('/api/votes', (req, res) => {
  res.json(votes);
});

// 投票
app.post('/api/vote', (req, res) => {
  const { choice } = req.body;
  if (votes[choice] !== undefined) {
    votes[choice]++;
    res.json({ message: `你選擇了 ${choice}，謝謝你的投票！`, votes });
  } else {
    res.status(400).json({ error: '選項無效' });
  }
});
"Add root route to server.js"

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`伺服器正在運行，端口號: ${PORT}`);
});
