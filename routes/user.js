const express = require("express");
const router = express.Router();

const users = [
  { id: 1, name: "사용자1" },
  { id: 2, name: "사용자2" },
  { id: 3, name: "사용자3" },
  { id: 4, name: "사용자4" },
  { id: 5, name: "사용자5" },
];

let nextUserId = 6;

// GET select all
router.get("/", (req, res) => {
  res.json({ data: users });
});

// GET select id
router.get("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  } else {
    res.json({ data: user });
  }
});

// POST new item
router.post("/", (req, res) => {
  const newUser = {
    id: nextUserId++,
    name: req.body.name,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT name 수정
router.put("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (!user) {
    res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  } else {
    const updatedUser = req.body;
    user.name = updatedUser.name;
    res.json({ message: "변경완료", data: user });
  }
});

// DELETE
router.delete("/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  } else {
    users.slice(userIndex, 1);
    res.json({ message: "사용자가 삭제 되었습니다.", data: users });
  }
});

module.exports = router;
