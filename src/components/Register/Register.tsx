// pages/register.tsx
"use client";
import { useState } from 'react';
import { registerUser } from '../../../lib/auth';
import { useRouter } from 'next/navigation';
import styles from '@/styles/auth.module.css';
const Register = (props: any) => {
    const { redirections } = props
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const router = useRouter();


        const result = await registerUser(email, password);
        redirections && router.push('http://localhost:3000'); // Redirigir a localhost:3000

        if (result.success) {
            setMessage('User registered successfully! Please check your email for confirmation.');
        } else {
            setMessage(`Error: ${result.message}`);
        }
    };

    return (

        <div className={styles.authContainer}>

            <div className={styles.header}>
                <h1 className={styles.title}>Create an account</h1>
                <span className={styles.subtitle}>Start your journey with us today</span>
            </div>

            <form onSubmit={handleRegister} className={styles.form}>
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
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {message && <p className={styles.errorMessage}>{message}</p>}

                <button type="submit" className={styles.button}>
                    Create account
                </button>
            </form>



        </div>
    );
};

export default Register;
