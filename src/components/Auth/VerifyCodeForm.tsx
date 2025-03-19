import React, { useState } from "react";
import { Input, Button, message as antdMessage } from "antd";
import { localhostStorage } from "@/services/localstorage.services";

const VerifyCodeForm = (props: any) => {
  const { email, setOpenResponsive, setVerifications } = props;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/verifyCode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      localhostStorage(data);

      if (response.ok) {
        localStorage.setItem("isLogin", "true");
        setOpenResponsive(false);
        setVerifications(false);
        antdMessage.success(data.message);
      } else {
        antdMessage.error(data.message || "Verification failed");
      }
    } catch (error) {
      antdMessage.error("Error verifying code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Input 
        type="text" 
        placeholder="Verification Code" 
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        required
      />
      <Button type="primary" htmlType="submit" loading={loading}>
        Verify Code
      </Button>
    </form>
  );
};

export default VerifyCodeForm;
