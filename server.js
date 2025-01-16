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

app.get('/api/votes', (req, res) => {
  res.json(votes);
});

app.post('/api/vote', (req, res) => {
  const { choice } = req.body;
  if (votes[choice] !== undefined) {
    votes[choice]++;
    res.json({ message: `你選擇了 ${choice}，謝謝你的投票！`, votes });
  } else {
    res.status(400).json({ error: '選項無效' });
  }
});

app.listen(PORT, () => {
  console.log(`伺服器正在運行，端口號: ${PORT}`);
});
