const express = require("express");
const app = express();

app.use(express.json());

// 라우트 파일 연결
const usersRouter = require("./routes/user");
app.use("/api/users", usersRouter);

// server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
