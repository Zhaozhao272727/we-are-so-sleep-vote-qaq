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

<script>
    // 定義管理員列表
    const admins = ["朝朝", "昭昭", "淮朝"];
    let username = ""; // 保存用戶名稱

    function validateName() {
        username = document.getElementById("username").value.trim();

        if (!username) {
            alert("請輸入名稱！");
            return;
        }

        sessionStorage.setItem("username", username); // 儲存用戶名稱

        // 判斷是否為管理員
        const isAdmin = admins.includes(username);

        if (isAdmin) {
            // 如果是管理員，顯示管理員介面
            document.getElementById("admin-section").classList.remove("hidden");
        } else {
            // 如果不是管理員，確保管理員介面被隱藏
            document.getElementById("admin-section").classList.add("hidden");
        }

        // 顯示投票頁面
        document.getElementById("namePage").classList.add("hidden");
        document.getElementById("votePage").classList.remove("hidden");
    }

    // 綁定清空投票數據按鈕事件
    document.getElementById("clear-votes-btn").addEventListener("click", () => {
        const password = prompt("請輸入管理員密碼以清空數據：");

        if (!password) {
            alert("未輸入密碼，操作取消！");
            return;
        }

        fetch("https://we-are-so-sleep-backend.onrender.com/api/admin/clear", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("投票數據已成功清空！");
                } else {
                    alert("管理員驗證失敗，無法清空數據！");
                }
            })
            .catch((error) => console.error("錯誤:", error));
    });
</script>


// 啟動伺服器
app.listen(PORT, () => {
  console.log(`伺服器正在運行，端口號: ${PORT}`);
});
