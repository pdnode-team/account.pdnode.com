const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "https://account.pdnode.com", // 你的前端地址，修改为实际
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/set-session", (req, res) => {
  const { jwt } = req.body;

  if (!jwt) {
    return res.status(400).json({ error: "Missing JWT" });
  }

  // 设置 HttpOnly、Secure、SameSite=None 的 Cookie，适用于跨站点
  res.cookie("pdnode_jwt", jwt, {
    // httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
    domain: "pdnode.com", // 注意：Cookie 的 domain 需要与你访问的域匹配，否则 Cookie 不会被浏览器保存
  });

  res.json({ success: true });
});

app.listen(25562, () => {
  console.log("JWT server running on http://localhost:25562");
});
