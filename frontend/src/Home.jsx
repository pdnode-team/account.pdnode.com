import { useState, useEffect } from "react";
import "./Home.css";
import { Client, Account, Storage, ID, Permission, Role } from "appwrite";

const client = new Client()
  .setEndpoint("https://nyc.cloud.appwrite.io/v1")
  .setProject("68818c2a0030f23462fe");

const account = new Account(client);
// const storage = new Storage(client);

// const files = await storage.listFiles(
//   "688319b80005c0e2015a" // bucketId
// );

// console.log(files);

export default function Home() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [phone, setPhone] = useState("");

  const [nameDisabled, setNameDisabled] = useState(false);
  const [emailDisabled, setEmailDisabled] = useState(false);
  // const [phoneDisabled, setPhoneDisabled] = useState(false);
  const [passwordDisabled, setPasswordDisabled] = useState(false);
  const [oldPasswordDisabled] = useState(false);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailVerifyPassword, setEmailVerifyPassword] = useState("");

  // const [avatarFile, setAvatarFile] = useState(null);
  // const [avatarError, setAvatarError] = useState("");

  // const handleAvatarChange = (e) => {
  //   const file = e.target.files[0];
  //   setAvatarError("");
  //   if (!file) return;

  //   // 限制大小 <= 1MB
  //   if (file.size > 1 * 1024 * 1024) {
  //     setAvatarError("File size must be 1MB or less");
  //     setAvatarFile(null);
  //     return;
  //   }

  //   // 限制格式 jpg/png
  //   if (!["image/jpeg", "image/png"].includes(file.type)) {
  //     setAvatarError("Only JPG and PNG files are allowed");
  //     setAvatarFile(null);
  //     return;
  //   }

  //   // 检查图片宽高为整数
  //   const img = new Image();
  //   img.onload = () => {
  //     const { width, height } = img;
  //     if (!Number.isInteger(width) || !Number.isInteger(height)) {
  //       setAvatarError("Image width and height must be integers");
  //       setAvatarFile(null);
  //     } else {
  //       setAvatarFile(file);
  //     }
  //   };
  //   img.onerror = () => {
  //     setAvatarError("Invalid image file");
  //     setAvatarFile(null);
  //   };

  //   img.src = URL.createObjectURL(file);
  // };

  // // 头像上传提交
  // const handleAvatarUpload = async () => {
  //   if (!avatarFile) {
  //     setAvatarError("Please select a valid avatar image first");
  //     return;
  //   }
  //   setAvatarError("");
  //   try {
  //     const user = await account.get();

  //     // 这里写你的上传逻辑，示例：
  //     // const response = await storage.createFile('bucketId', ID.unique(), avatarFile);
  //     // console.log("Upload success", response);
  //     await storage.createFile(
  //       "688319b80005c0e2015a", // bucketId
  //       ID.unique(), // fileId
  //       avatarFile,
  //       [Permission.read(Role.any()), Permission.delete(Role.user(user.$id))] // permissions (optional)
  //     );
  //     alert("Upload interface placeholder — implement your own logic.");
  //   } catch (e) {
  //     setAvatarError("Upload failed: " + e.message);
  //     console.log();
  //   }
  // };

  useEffect(() => {
    const jwt = document.cookie
      .split("; ")
      .find((row) => row.startsWith("pdnode_jwt="))
      ?.split("=")[1];

    if (!jwt) {
      console.warn("pdnode_jwt cookie not found, redirecting to login");
      window.location.pathname = "/auth";
      return;
    }

    client.setJWT(jwt);

    async function fetchUser() {
      try {
        const user = await account.get();
        console.log("Current logged-in user:", user);
        setEmail(user.email || "user@example.com");
        setUsername(user.name || "Username");
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        window.location.pathname = "/auth";
      }
    }
    fetchUser();
  }, []);

  const updateName = async () => {
    setNameDisabled(true);
    try {
      await account.updateName(name);
      alert("Name is update!");
    } catch (e) {
      alert("Name updated Failed:" + e);
    }
    setNameDisabled(false);

    console.log("Name updated to:", name);
  };

  const updateEmail = () => {
    setEmailDisabled(true);

    if (!newEmail) return alert("Email cannot be empty");
    setShowEmailModal(true);
  };

  // const updatePhone = async () => {
  //   setPhoneDisabled(true);
  //   try {
  //     // await account.updatePhone(password);
  //   } catch (e) {
  //     alert("Password updated Failed:" + e);
  //   }
  // };

  const updatePassword = async () => {
    setPasswordDisabled(true);
    try {
      await account.updatePassword(password, oldPassword);
      alert("Password is update!");
    } catch (e) {
      alert("Password updated Failed:" + e);
    }
    setPasswordDisabled(false);
  };

  const confirmEmailChange = async () => {
    if (!emailVerifyPassword) return alert("Please enter your password");
    try {
      // 实际上应该是 await account.updateEmail(newEmail, emailVerifyPassword);
      //   console.log("Email updated:", newEmail, emailVerifyPassword);

      await account.updateEmail(
        newEmail, // email
        emailVerifyPassword // password
      );
      alert("Email updated successfully!");
      setEmail(newEmail);
      setShowEmailModal(false);
      setEmailDisabled(false);
    } catch (err) {
      alert("Failed to update email: " + err.message);
    }
  };

  return (
    <div className="user-center-container">
      <div className="main-content">
        <h1>Pdnode Account</h1>

        <div className="card">
          <div className="user-info">
            <div className="avatar" />
            <div>
              <p className="username">{username}</p>
              <p className="email">{email}</p>
            </div>
          </div>
          <hr />
          {/* 头像上传部分
          <div className="form-group">
            <label htmlFor="avatar">Upload Avatar</label>
            <div className="input-button-row">
              <input
                id="avatar"
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleAvatarChange}
              />
              <button
                className="submit-button"
                onClick={handleAvatarUpload}
                disabled={!avatarFile}
              >
                Upload
              </button>
            </div>
            {avatarError && (
              <p style={{ color: "red", marginTop: "4px" }}>{avatarError}</p>
            )}
          </div> */}

          <div className="form">
            <div className="form-group">
              <label htmlFor="name">Update Name</label>
              <div className="input-button-row">
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={nameDisabled}
                />
                <button
                  className="submit-button"
                  onClick={updateName}
                  disabled={nameDisabled}
                >
                  Confirm
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Update Email</label>
              <div className="input-button-row">
                <input
                  id="email"
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={emailDisabled}
                />
                <button
                  className="submit-button"
                  onClick={updateEmail}
                  disabled={emailDisabled}
                >
                  Confirm
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Update Phone</label>
              <div className="input-button-row">
                <input
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Not Support"
                  disabled={true}
                />
                <button className="submit-button" disabled={true}>
                  Confirm
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Update Password</label>

              <div className="input-button-row">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={passwordDisabled}
                />
                <input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter old password"
                  disabled={oldPasswordDisabled}
                />
                <button
                  className="submit-button"
                  onClick={updatePassword}
                  disabled={oldPasswordDisabled}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card placeholder">Other page content placeholder</div>
      </div>

      {showEmailModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Email Change Verification</h2>
            <p>
              To change your email, please verify your identity by entering your
              current password.
            </p>
            <input
              type="password"
              placeholder="Enter your password"
              value={emailVerifyPassword}
              onChange={(e) => setEmailVerifyPassword(e.target.value)}
              className="modal-input"
            />
            <div className="modal-actions">
              <button onClick={confirmEmailChange} className="submit-button">
                Confirm
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                className="submit-button"
                style={{ background: "#ccc", color: "#000" }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
