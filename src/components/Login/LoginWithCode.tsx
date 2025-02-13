import React, { useState } from 'react'
import styles from '@/styles/auth.module.css';
// import { localhostStorage } from '@/services/localstorage.services';
// import VerifyCodeForm from '../Register/RegisterValidate';
// import LoginVerifyCodeForm from './LoginValidate';

const LoginWithCode = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [createNotValidate, setCreateNotValidate] = useState<boolean>(false)



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        const data = {
            email,
            password
        }
        console.log("🚀 ~ handleLogin ~ data:", data)
        try {
            const getData = fetch('/api/loginwithcode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            console.log("🚀 ~ handleLogin ~ getData:", await getData)
            if ((await getData).status === 200) {
                //    await localhostStorage(getData);
                setCreateNotValidate(true)
            }
        } catch (error) {
            alert("Error al iniciar sesión: " + (error as Error).message)
        }
    }


    return (
        <div>
            {/* {
                createNotValidate ?
                    <div className={styles.authContainer
                    } >
                        <LoginVerifyCodeForm
                            email={email}
                        />
                    </div >
                    : */}
                    <div className={styles.authContainer}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>Welcome back</h1>
                            <span className={styles.subtitle}>Loogin with your email and a code</span>
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

                            <button type="submit" className={styles.button}>
                                Sign in
                            </button>
                        </form>
                    </div>
            {/* } */}
        </div>
    )
}

export default LoginWithCode


