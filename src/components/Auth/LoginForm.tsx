import React, { useState } from "react";
import styles from '@/styles/auth.module.css';
import { localhostStorage } from "@/services/localstorage.services";
import { Button, Input } from "antd";

const LoginForm = (props: any) => {
  const { setOpenResponsive, setIsLogin } = props;
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localhostStorage(data);
        setOpenResponsive(false);
        setMessage(data.message);
        localStorage.setItem("isLogin", "true");
        setIsLogin(true);
      } else {
        setMessage(data.error || "Error logging in");
      }
    } catch (error) {
      setMessage("Error logging in");
    }
  };

  return (
    <div className={styles.authContainer}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="primary" htmlType="submit" block>
          Login
        </Button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;