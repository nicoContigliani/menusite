// pages/register.tsx
"use client";
import { useState } from 'react';
import { registerUser } from '../../../lib/auth';
import styles from '@/styles/auth.module.css';
const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await registerUser(email, password);
    if (result.success) {
      setMessage('User registered successfully! Please check your email for confirmation.');
    } else {
      setMessage(`Error: ${result.message}`);
    }
  };

  return (
    // <div className="flex items-center justify-center min-h-screen bg-gray-100">
    //   <form onSubmit={handleRegister} className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
    //     <h1 className="mb-6 text-xl font-bold text-center">Register</h1>
    //     <div className="mb-4">
    //       <label htmlFor="email" className="block mb-2 text-sm font-medium">
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         id="email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
    //         required
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label htmlFor="password" className="block mb-2 text-sm font-medium">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         id="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
    //         required
    //       />
    //     </div>
    //     {message && <p className="mb-4 text-sm text-center text-red-500">{message}</p>}
    //     <button
    //       type="submit"
    //       className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
    //     >
    //       Register
    //     </button>
    //   </form>
    // </div>
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

export default RegisterPage;
