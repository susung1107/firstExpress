const express = require("express");
const app = express();

app.use(express.json()); // post 요청 본문을 JSON으로 파싱

const users = [
  { id: 1, name: "사용자1" },
  { id: 2, name: "사용자2" },
  { id: 3, name: "사용자3" },
  { id: 4, name: "사용자4" },
  { id: 5, name: "사용자5" },
];

let nextUserId = 6;

// select all
app.get("/api/users", (req, res) => {
  res.json(users);
});

// select id
app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  } else {
    res.json(user);
  }
});

// add new Item
app.post("/api/users", (req, res) => {
  const newUser = {
    id: nextUserId++,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// put
app.put("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  } else {
    const updatedUser = req.body;
    user.name = updatedUser.name;
    res.json(user);
  }
});

// 삭제
app.delete("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  } else {
    users.slice(userIndex, 1);
    res.json({ message: "사용자가 삭제 되었습니다.", data: users });
  }
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
