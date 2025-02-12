import React, { useState } from 'react'
import axios from "axios";
import { Button, Input } from "antd";
import styles from '@/styles/auth.module.css'
const RegisterAuthB = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("/api/registerdata", { email, password, fullname, birthday, phone });
      if (response.status === 200) {
        console.log("🚀 ~ handleSubmit ~ response:", response)
        // setVerifications(true);
      } else {
        setMessage(response.data?.message || "Registration failed");
      }
    } catch (error: any) {
      setMessage(error.response?.data?.error || "Error registering user");
    }
  };


  return (
    <div className={styles.authContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <Input placeholder="Fullname" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <Input type="date" placeholder="Birthday" value={birthday} onChange={(e) => setBirthday(e.target.value)} required />
          <Button type="primary" htmlType="submit" block>Register</Button>
          {message && <p className={styles.error}>{message}</p>}
        </form>
    </div>
  )
}

export default RegisterAuthB