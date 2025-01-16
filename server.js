// 管理員登入按鈕邏輯
document.getElementById('admin-login-btn').addEventListener('click', () => {
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  // 發送登入請求
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
        // 驗證成功，顯示管理員面板和投票數據
        document.getElementById('admin-panel').style.display = 'block';
        document.getElementById('votes-data').textContent = JSON.stringify(data.votes, null, 2);
        alert('登入成功，歡迎管理員！');
      } else {
        alert('管理員驗證失敗，請檢查用戶名或密碼！');
      }
    })
    .catch((error) => console.error('登入錯誤:', error));
});

// 清理投票數據按鈕邏輯
document.getElementById('clear-votes-btn').addEventListener('click', () => {
  const username = document.getElementById('admin-username').value;
  const password = document.getElementById('admin-password').value;

  // 發送清理數據請求
  fetch('https://we-are-so-sleep-backend.onrender.com/api/clear-votes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('投票數據已清理！');
        document.getElementById('votes-data').textContent = '{}';
      } else {
        alert('清理數據失敗，請檢查身份驗證！');
      }
    })
    .catch((error) => console.error('清理數據錯誤:', error));
});
