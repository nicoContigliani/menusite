// app/login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, signInWithGoogle } from '../../../lib/auth';
import styles from '@/styles/auth.module.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const todo = await signIn(email, password);
      console.log("🚀 ~ handleLogin ~ todo:", todo)
      router.push('http://localhost:3000'); // Redirigir a localhost:3000
    } catch (error) {
      alert('Error al iniciar sesión: ' + (error as Error).message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push('http://localhost:3000'); // Redirigir a localhost:3000
    } catch (error) {
      alert('Error al iniciar sesión con Google: ' + (error as Error).message);
    }
  };

  return (
    //     <div className="flex flex-col gap-4">
    //       <form onSubmit={handleLogin} className="flex flex-col gap-4">
    //         <input
    //           type="email"
    //           placeholder="Email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           required
    //           className="border p-2 rounded"
    //         />
    //         <input
    //           type="password"
    //           placeholder="Password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           required
    //           className="border p-2 rounded"
    //         />
    //         <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
    //           Iniciar Sesión
    //         </button>
    //       </form>
    // {/* 
    //       <button
    //         onClick={handleGoogleLogin}
    //         className="bg-red-500 text-white py-2 px-4 rounded"
    //       >
    //         Iniciar Sesión con Google
    //       </button> */}
    //     </div>
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

  );
};

export default LoginPage;