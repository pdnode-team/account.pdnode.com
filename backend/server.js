const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(cookieParser());

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",") // 多个用逗号分隔
  : ["https://account.pdnode.com"];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("CORS origin:", origin);
      console.log("Allowed origins:", allowedOrigins);

      if (!origin) {
        // 非浏览器或无 Origin 请求，直接允许
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.post("/api/set-session", (req, res) => {
  const { jwt } = req.body;

  if (!jwt) {
    return res.status(400).json({ error: "Missing JWT" });
  }

  const cookieDomain = process.env.COOKIE_DOMAIN || undefined;
  const cookieSecure = process.env.COOKIE_SECURE === "true";
  const cookieSameSite = process.env.COOKIE_SAMESITE || "None";
  const cookieMaxAge = process.env.COOKIE_MAXAGE
    ? parseInt(process.env.COOKIE_MAXAGE, 10)
    : 7 * 24 * 60 * 60 * 1000; // 默认7天

  res.cookie("pdnode_jwt", jwt, {
    // httpOnly 也可以用环境变量控制
    httpOnly: process.env.COOKIE_HTTPONLY !== "false",
    secure: cookieSecure,
    sameSite: cookieSameSite,
    path: "/",
    maxAge: cookieMaxAge,
    domain: cookieDomain,
  });

  res.json({ success: true });
});

app.get("ping", (req, res) => {
  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 25562;
app.listen(PORT, () => {
  console.log(`JWT server running on http://localhost:${PORT}`);
});
