import React, { useState } from "react";
import axios from "axios";
import styles from '@/styles/auth.module.css';
import { localhostStorage } from "@/services/localstorage.services";
import VerifyCodeForm from "./VerifyCodeForm";
import { Button, Input } from "antd";

const ValidateCode = (props: any) => {
    const {
        redirections,
        setOpenResponsive,
        fullUrl,
        setIsLogin
    } = props

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [verifications, setVerifications] = useState(false);

    const handleSubmitCode = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/generateCode", { email });
            setMessage(response.data.message);
            if (response.status === 200) {
                console.log("🚀 ~ handleSubmitCode ~ response:", response)
                setVerifications(true);
                setIsLogin(true);  
            }
        } catch (error: any) {
            setMessage(error.response?.data?.error || "Error logging in");
        }
    };


    return (
        <div className={styles.authContainer}>
            ValidateCode
            {verifications ? (
                <VerifyCodeForm email={email} setOpenResponsive={setOpenResponsive}  setVerifications={setVerifications} />
            ) : (
                <div>
                    <form onSubmit={handleSubmitCode} className={styles.form}>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button type="default" htmlType="submit" block>
                            Validate with code
                        </Button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
            )}
        </div>
    )
}

export default ValidateCode