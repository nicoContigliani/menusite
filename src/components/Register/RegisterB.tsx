import React, { useState } from 'react';
import styles from '@/styles/auth.module.css';
import VerifyCodeForm from './RegisterValidate';

const RegisterB = () => {
    const [verificationCode, setVerificationCode] = useState(false);
    const [formData, setFormData] = useState<any | undefined>({
        // email: 'nico.contigliani@gmail.com',
        // password: '$2a$10$NhPfBmS90CrA24Hm1dE07OjlDKZbmQ3G/84I0DdZNHiAEUVS4jUfS',
        // fullname: 'Nicolas Contigliani',
        // birthday: '1988-03-06',
        // phone: '+5492612444106',
        // score_user: 0,
        // benefits: false,
        // status_user: true,
        // createAt: new Date().toISOString(),
        // updateAt: new Date().toISOString(),
        // verificationCode: 'ZwlBtW'
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

            if (dataResult.status === 200) setCreateNotValidate(true)

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
            {
                !createNotValidate &&

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
            }
            {/* } */}
        </div>
    );
};

export default RegisterB;
