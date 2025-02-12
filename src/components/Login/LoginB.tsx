import React, { useState } from 'react'
import styles from '@/styles/auth.module.css';

const LoginB = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            email,
            password
        }
        console.log("🚀 ~ handleLogin ~ data:", data)
        try {
            fetch('/api/loginuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        } catch (error) {
            alert("Error al iniciar sesión: " + (error as Error).message)
        }
    }


    return (
        <div className={styles.authContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Welcome back</h1>
                <span className={styles.subtitle}>Sign in to your account</span>
            </div>

            <form onSubmit={handleLogin} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="email" className={styles.label}>
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className={styles.input}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="password" className={styles.label}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className={styles.input}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className={styles.button}>
                    Sign in
                </button>
            </form>
        </div>
    )
}

export default LoginB


