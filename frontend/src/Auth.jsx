import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import Ping from "./Ping";

import { BASE_URL } from "./config";

export default function Auth() {
  const [page, setPage] = useState("login");
  const [isPing, setIsPing] = useState(false); // 用boolean更合理

  const ping = async () => {
    try {
      await fetch(`${BASE_URL}/ping`);
      console.log("ping ok");
      setIsPing(false);
    } catch {
      setIsPing(true);
      console.error("ping wrong");
    }
  };

  useEffect(() => {
    ping();
  }, []);

  return (
    <div>
      {isPing ? (
        <Ping onRetry={ping} />
      ) : page === "login" ? (
        <Login setPage={setPage} />
      ) : page === "register" ? (
        <Register setPage={setPage} />
      ) : null}
    </div>
  );
}
