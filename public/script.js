let attempts = 0;
        let wrongAttempts = 0;
        let votes = { "應用方面": 0, "純數據分析": 0, "我都可以": 0 };
        let userVoteDetails = [];

        document.addEventListener('DOMContentLoaded', () => {
            const animationDuration = 2000;
            setTimeout(() => {
                document.getElementById('animationPage').classList.add('hidden');
                document.getElementById('namePage').classList.remove('hidden');
            }, animationDuration);
        });

        function validateName() {
            const username = document.getElementById('username').value.trim();
            if (username) {
                sessionStorage.setItem('username', username);
                document.getElementById('namePage').classList.add('hidden');
                document.getElementById('votePage').classList.remove('hidden');
                return;
            }
            attempts++;
            if (attempts === 1) alert('｡ﾟヽ(ﾟ´Д`)ﾉﾟ｡不可以不留名！');
            else if (attempts === 2) alert('(((ﾟДﾟ;)))！你壞壞!請重新輸入!');
            else closePage();
        }

        function closePage() {
            alert('再見！(╯°Д°)╯︵ ┻━┻');
            document.body.innerHTML = '<div id="goodbyePage">再見！(╯°Д°)╯︵ ┻━┻</div>';
            setTimeout(() => window.location.href = "about:blank", 5000);
        }

        function vote(choice) {
            const username = sessionStorage.getItem('username');
            if (!username) {
                alert('請先輸入名字！');
                return;
            }
            userVoteDetails.push({ username, choice });
            votes[choice]++;
            document.querySelectorAll('#votePage button:not(#viewResultsButton)').forEach(button => button.disabled = true);
            alert(`${username}，你選擇了「${choice}」，投票已記錄！\nヾ(●゜▽゜●)♡ 謝謝你！辛苦了！請多多指教！`);
        }

        function adminAccess() {
            const password = prompt('請輸入密碼：');
            const correctPassword = 'If you shed tears when you miss the sun, you also miss the stars.';
            if (wrongAttempts === 0) {
                alert('QAQ你也想偷看嗎?');
                wrongAttempts++;
                return;
            }
            if (wrongAttempts === 1) {
                if (password === correctPassword) {
                    viewResults();
                } else {
                    alert('暗號錯誤！不給你看!');
                    wrongAttempts++;
                }
            } else {
                alert('┳━┳ノ( OωOノ)');
                closePage();
            }
        }

        function viewResults() {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = '<h2>總票數：</h2>';
            for (const [choice, count] of Object.entries(votes)) {
                resultsContainer.innerHTML += `<p>${choice}：${count} 票</p>`;
            }
            resultsContainer.innerHTML += '<h2>用戶投票記錄：</h2>';
            userVoteDetails.forEach(({ username, choice }) => {
                resultsContainer.innerHTML += `<p>${username} 選擇了：${choice}</p>`;
            });
            document.getElementById('votePage').classList.add('hidden');
            document.getElementById('resultsPage').classList.remove('hidden');
        }

        function backToVotePage() {
            document.getElementById('resultsPage').classList.add('hidden');
            document.getElementById('votePage').classList.remove('hidden');
        }
