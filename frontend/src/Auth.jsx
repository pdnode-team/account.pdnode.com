import { useEffect, useState } from "react";
import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("68818c2a0030f23462fe");

const account = new Account(client);

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true); // 初始状态为加载中
  const redirect = getQueryParam("redirect");

  useEffect(() => {
    // 页面加载后检查是否已有会话
    const checkSession = async () => {
      try {
        await account.get(); // 获取当前会话，如果成功表示已登录
        const jwtResponse = await account.createJWT();
        // https://api.account.pdnode.com/api/set-session
        //
        await fetch("http://localhost:25562/api/set-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ jwt: jwtResponse.jwt }),
        });

        window.location.href = redirect || "/";
      } catch (err) {
        // 没有会话，允许用户登录
        console.log("未检测到会话，等待用户登录");
        console.log(err);

        setLoading(false);
      }
    };

    checkSession();
  }, [redirect]);

  const login = async () => {
    setLoading(true);
    try {
      await account.createEmailPasswordSession(email, password);

      const jwtResponse = await account.createJWT();

      await fetch("http://localhost:25562/api/set-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ jwt: jwtResponse.jwt }),
      });

      window.location.href = redirect || "/";
    } catch (err) {
      alert("登录失败，请检查账号密码。");
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>🕐 正在检查会话...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🎯 Pdnode 登录中心</h2>

        <input
          style={styles.input}
          placeholder="📧 Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="🔒 Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={login} disabled={loading}>
          {loading ? "登录中..." : "登录"}
        </button>

        <p style={styles.hint}>
          {redirect ? `登录成功后将跳转到：${redirect}` : "未设置跳转参数"}
        </p>
      </div>
    </div>
  );
}

// 样式略（不变）

const styles = {
  container: {
    height: "100vh",
    background: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    padding: "30px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  },
  hint: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#666",
  },
};
