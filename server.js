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

// 用於驗證用戶輸入的暗號
app.post('/api/login', (req, res) => {
  const { username, password } = req.body; // 用戶輸入的名稱和暗號
  const validPassword = 'your_password'; // 這裡替換為你的暗號

  if (password === validPassword) {
    const isAdmin = ['朝朝', '昭昭', '淮朝'].includes(username); // 判定是否為管理員
    res.json({ success: true, isAdmin }); // 回傳結果
  } else {
    res.status(401).json({ success: false, message: '暗號錯誤' }); // 回傳錯誤
  }
});

const admins = ["朝朝", "昭昭", "淮朝"]; // 管理員列表

// 管理員專用：獲取所有投票數據
app.post('/api/admin/votes', (req, res) => {
  const { username, password } = req.body;

  // 驗證管理員身份
  if (admins.includes(username) && password === "admin_password") {
    res.json({ success: true, votes });
  } else {
    res.status(403).json({ success: false, message: '管理員驗證失敗！' });
  }
});

document.getElementById('admin-login-btn').addEventListener('click', () => {
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  // 發送管理員登入請求
  fetch('https://we-are-so-sleep-backend.onrender.com/api/admin/votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // 驗證成功，顯示投票數據
        document.getElementById('votes-display').style.display = 'block';
        document.getElementById('votes-data').textContent = JSON.stringify(data.votes, null, 2);
      } else {
        alert('管理員驗證失敗，請檢查用戶名或密碼！');
      }
    })
    .catch((error) => console.error('錯誤:', error));
});


// 啟動伺服器
app.listen(PORT, () => {
  console.log(`伺服器正在運行，端口號: ${PORT}`);
});
