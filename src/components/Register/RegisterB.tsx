import React, { useState } from 'react';
import styles from '@/styles/auth.module.css';
import VerifyCodeForm from './RegisterValidate';
import { localhostStorage } from '@/services/localstorage.services';

const RegisterB = (props: any) => {

    const {
        redirections,
        setOpenResponsive,
        fullUrl,
        setIsLogin
    } = props

    const [verificationCode, setVerificationCode] = useState(false);
    const [formData, setFormData] = useState<any | undefined>({
    });

    const [createNotValidate, setCreateNotValidate] = useState<boolean>(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState: any) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("🚀 ~ handleLogin ~ formData:", formData);
        try {
            const dataResult = await fetch('/api/registerdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (dataResult.status === 201) {
                setCreateNotValidate(true)
                await localhostStorage(dataResult)
                await setOpenResponsive(false)
                await setIsLogin(true)
            }

        } catch (error) {
            alert("Error al iniciar sesión: " + (error as Error).message);
        }
    };

    return (
        <div>
            {/* 
            {
                createNotValidate &&
                <div className={styles.authContainer}>
                    <VerifyCodeForm
                        email={formData.email}
                    />
                </div>
            } */}

            {/* {
                createNotValidate ?
                    <div className={styles.authContainer}>
                      <VerifyCodeForm
                        email={formData.email}
                      />
                    </div>
                    : */}


            <div className={styles.authContainer}>


                <div className={styles.header}>
                    <h1 className={styles.title}>Welcome back</h1>
                    <span className={styles.subtitle}>Sign in to your account</span>
                </div>

                <form onSubmit={handleLogin} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={styles.input}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className={styles.field}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={styles.input}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="fullname" className={styles.label}>fullname</label>
                        <input
                            id="fullname"
                            name="fullname"
                            type="text"
                            className={styles.input}
                            placeholder="Enter your fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="phone" className={styles.label}>phone</label>
                        <input
                            id="phone"
                            name="phone"
                            type="text"
                            className={styles.input}
                            placeholder="Enter your phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="birthday" className={styles.label}>birthday</label>
                        <input
                            id="birthday"
                            name="birthday"
                            type="date"
                            className={styles.input}
                            placeholder="Enter your birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className={styles.button}>Sign in</button>
                </form>
            </div>

            {/* } */}
        </div>
    );
};

export default RegisterB;
