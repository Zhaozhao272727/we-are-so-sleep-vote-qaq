    const admins = ["朝朝", "昭昭", "淮朝"]; // 管理員列表
    let username = ""; // 保存用戶名
    let attempts = 0; // 輸入名稱的嘗試次數
    let wrongAttempts = 0; // 管理員密碼輸入錯誤次數
    let votes = { "應用方面": 0, "純數據分析": 0, "我都可以": 0 }; // 投票數據
    let userVoteDetails = []; // 記錄用戶的投票選擇

    document.addEventListener('DOMContentLoaded', () => {
        const animationDuration = 2000; // 動畫時長
        setTimeout(() => {
            document.getElementById('animationPage').classList.add('hidden'); // 隱藏動畫頁
            document.getElementById('namePage').classList.remove('hidden'); // 顯示輸入名稱頁
        }, animationDuration);
    });

    function validateName() {
        username = document.getElementById("username").value.trim();

        if (!username) {
            attempts++;
            if (attempts === 1) alert("｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡ 不可以不留名！");
            else if (attempts === 2) alert("(((ﾟДﾟ;)))！你壞壞!請重新輸入!");
            else closePage();
            return;
        }

        sessionStorage.setItem("username", username);

        // 判斷是否為管理員
        if (admins.includes(username)) {
            document.getElementById("admin-section").classList.remove("hidden"); // 顯示管理員介面
        } else {
            document.getElementById("admin-section").classList.add("hidden"); // 確保隱藏管理員介面
        }

        document.getElementById("namePage").classList.add("hidden");
        document.getElementById("votePage").classList.remove("hidden");
    }

    function closePage() {
        alert("再見！(╯°Д°)╯︵ ┻━┻");
        document.body.innerHTML = '<div id="goodbyePage">再見！(╯°Д°)╯︵ ┻━┻</div>';
        setTimeout(() => window.location.href = "about:blank", 5000);
    }

    function vote(choice) {
        if (!username) {
            alert("請先輸入名字！");
            return;
        }

        userVoteDetails.push({ username, choice });
        votes[choice]++;
        document.querySelectorAll("#votePage button").forEach(button => button.disabled = true);
        alert(`${username}，你選擇了「${choice}」，投票已記錄！\nヾ(●゜▽゜●)♡ 謝謝你！辛苦了！請多多指教！`);
    }

    function adminAccess() {
        const password = prompt("請輸入密碼：");
        const correctPassword = "If you shed tears when you miss the sun, you also miss the stars.";

        if (wrongAttempts === 0) {
            alert("QAQ你也想偷看嗎?");
            wrongAttempts++;
            return;
        }

        if (password === correctPassword) {
            viewResults();
        } else {
            alert("暗號錯誤！不給你看!");
            wrongAttempts++;
            if (wrongAttempts >= 3) closePage();
        }
    }

    function viewResults() {
        const resultsContainer = document.getElementById("results");
        resultsContainer.innerHTML = "<h2>總票數：</h2>";

        for (const [choice, count] of Object.entries(votes)) {
            resultsContainer.innerHTML += `<p>${choice}：${count} 票</p>`;
        }

        resultsContainer.innerHTML += "<h2>用戶投票記錄：</h2>";
        userVoteDetails.forEach(({ username, choice }) => {
            resultsContainer.innerHTML += `<p>${username} 選擇了：${choice}</p>`;
        });

        document.getElementById("votePage").classList.add("hidden");
        document.getElementById("resultsPage").classList.remove("hidden");
    }

    function backToVotePage() {
        document.getElementById("resultsPage").classList.add("hidden");
        document.getElementById("votePage").classList.remove("hidden");
    }

    document.getElementById("clearVotesButton").addEventListener("click", () => {
    const password = prompt("請輸入管理員密碼以清空數據：");
    const correctPassword = "管理員專用密碼"; // 替換為你的清空數據密碼

    if (password === correctPassword) {
        fetch("https://we-are-so-sleep-backend.onrender.com/api/admin/clear", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: "管理員", password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    alert("數據已成功清空！");
                    // 清空前端顯示的數據
                    document.getElementById("results").innerHTML = "<p>目前沒有數據。</p>";
                } else {
                    alert("密碼錯誤，無法清空數據！");
                }
            })
            .catch((error) => console.error("清空數據失敗：", error));
    } else {
        alert("密碼錯誤，操作取消！");
    }
});
