export default function Ping({ onRetry }) {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.icon}>⚠️</div>
        <h2 style={styles.title}>Unable to contact server</h2>
        <p style={styles.message}>
          Please check your network connection or click the button below to
          reconnect.
        </p>
        <button style={styles.button} onClick={onRetry}>
          Reconnect
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#fff3f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "#ffe6e6",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(255, 0, 0, 0.3)",
    textAlign: "center",
    maxWidth: "400px",
  },
  icon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
  title: {
    color: "#d32f2f",
    marginBottom: "12px",
  },
  message: {
    color: "#b00020",
    marginBottom: "24px",
    fontSize: "16px",
  },
  button: {
    padding: "12px 24px",
    fontSize: "16px",
    backgroundColor: "#d32f2f",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
