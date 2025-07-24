import { useState } from "react";
import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("68818c2a0030f23462fe")
  .setDevKey(
    "acc8608412c42553a31f85e9dd9276d954f2e971adccfea496ed2c09399f8557128703977ad265123d1caee180a81da1f7f38018abc1b980e9c57cdda8688d7a51d9950af586659000084704d99818489824fb347dbfa8043434a55db18fa25a6cecab5516074a6443e74eac1656d76351f846d14a97e792b785255460e8ce8b"
  );

const account = new Account(client);

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      await account.deleteSessions();
      // 1. 登录用户会话
      await account.createEmailPasswordSession(email, password);

      // 2. 创建用户 JWT
      const jwtResponse = await account.createJWT();

      // 3. 发送 JWT 给后端，让后端设置 HttpOnly Cookie
      await fetch("http://localhost:25562/api/set-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ jwt: jwtResponse.jwt }),
      });

      // 4. 重定向
      const redirect =
        new URLSearchParams(window.location.search).get("redirect") ||
        "http://localhost:5500/";
      window.location.href = redirect;
    } catch (err) {
      alert("登录失败");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Pdnode 登录中心</h2>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={login}>登录</button>
    </div>
  );
}

export default App;
