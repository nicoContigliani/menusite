
import React, { useState } from "react";
import { Input, Button, message as antdMessage } from "antd";
import { localhostStorage } from "@/services/localstorage.services";
import styles from '@/styles/auth.module.css';

const VerifyCodeForm = (props: any) => {
    const { email, 
        // setOpenResponsive, setVerifications
     } = props;
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
                // setOpenResponsive(false);
                // setVerifications(false);
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
        <div className={styles.authContainer}>

            <form onSubmit={handleSubmit}
                style={{ display: "flex-start", flexDirection: "column", gap: "10px" }}
            >
                <div className={styles.field}>
                    <label htmlFor="verification" className={styles.label}>Verification Code</label>

                    <Input
                        type="text"
                        placeholder="Verification Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>
                <Button className={styles.button} type="primary" htmlType="submit" loading={loading}>
                    Verify Code
                </Button>
            </form>
        </div>
    );
};

export default VerifyCodeForm;
