import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/reducers/userSlice";
import { UserState } from "../types";
import api from "../api/auth";
import Modal from "./Modal";

function Login() {
  const dispatch = useDispatch();
  const [memberId, setMemberId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", {
        memberId,
        password,
      });

      // Save the token in sessionStorage
      sessionStorage.setItem("accessToken", response.data.accessToken);
      sessionStorage.setItem("refreshToken", response.data.refreshToken);

      // Dispatch the login action
      dispatch(login(response.data));
      console.log(response.data);
    } catch (error: any) {
      console.error("Login failed:", error.message);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Username"
        value={memberId}
        onChange={(e) => setMemberId(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
    // <Modal option="login"></Modal>
  );
}

export default Login;
