const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// 投票數據
let votes = {
  "應用方面": 0,
  "純數據分析": 0,
  "我都可以": 0
};

// 投票記錄 (防止重複投票)
let voteRecords = {};

// 管理員列表
const admins = ["朝朝", "昭昭", "淮朝"];
const adminPassword = "998827"; // 替換為你的管理員密碼

// 根路由 (顯示歡迎訊息)
app.get('/', (req, res) => {
  res.send('Welcome to the Voting API! 使用 /api/votes 查看投票數據，或使用 /api/vote 進行投票。');
});

// 獲取投票數據
app.get('/api/votes', (req, res) => {
  res.json(votes);
});

// 投票功能
app.post('/api/vote', (req, res) => {
  const { username, choice } = req.body;

  // 檢查是否提供用戶名和選項
  if (!username || !choice) {
    return res.status(400).json({ error: '必須提供用戶名和投票選項' });
  }

  // 防止重複投票 (相同用戶名/IP 不可再次投票)
  if (voteRecords[username]) {
    return res.status(403).json({ error: '此用戶已經投過票' });
  }

  // 檢查投票選項是否有效
  if (!votes.hasOwnProperty(choice)) {
    return res.status(400).json({ error: '無效的投票選項' });
  }

  // 記錄投票
  votes[choice]++;
  voteRecords[username] = choice; // 記錄用戶的投票
  res.json({ message: `投票成功！${username} 選擇了 ${choice}`, votes });
});

// 管理員登入驗證
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (admins.includes(username) && password === adminPassword) {
    res.json({ success: true, isAdmin: true });
  } else {
    res.status(401).json({ success: false, message: '登入失敗：用戶名或密碼錯誤' });
  }
});

// 管理員查看投票數據並清理
app.post('/api/admin/votes', (req, res) => {
  const { username, password } = req.body;

  // 驗證管理員身份
  if (admins.includes(username) && password === adminPassword) {
    res.json({ success: true, votes, voteRecords });
  } else {
    res.status(403).json({ success: false, message: '管理員驗證失敗' });
  }
});

// 清理所有投票數據 (僅限管理員)
app.post('/api/admin/clear', (req, res) => {
  const { username, password } = req.body;

  // 驗證管理員身份
  if (admins.includes(username) && password === adminPassword) {
    votes = { "應用方面": 0, "純數據分析": 0, "我都可以": 0 };
    voteRecords = {};
    res.json({ success: true, message: '所有投票數據已被清理' });
  } else {
    res.status(403).json({ success: false, message: '管理員驗證失敗，無法清理數據' });
  }
});

// 啟動伺服器
app.listen(PORT, () => {
  console.log(`伺服器正在運行，端口號: ${PORT}`);
});
