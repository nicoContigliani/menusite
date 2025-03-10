// // app/login/page.tsx
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { signIn, signInWithGoogle } from '../../../lib/auth';
// import styles from '@/styles/auth.module.css';
// import { localhostStorage } from '@/services/localstorage.services';

// const Login = (props: any) => {
//     const { redirections,fullUrl } = props
//     console.log("🚀 ~ Login ~ fullUrl:", fullUrl)
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const router = useRouter();

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             const todo = await signIn(email, password);
//             const si = localhostStorage(todo);

       
//             const redirectUrl = fullUrl || "/"; // Redirige a home si está undefined
//             router.push(redirectUrl); // Redirigir a localhost:3000
//         } catch (error) {
//             alert('Error al iniciar sesión: ' + (error as Error).message);
//         }
//     };

//     const handleGoogleLogin = async () => {
//         try {
//             await signInWithGoogle();
//             router.push('http://localhost:3000'); // Redirigir a localhost:3000
//         } catch (error) {
//             alert('Error al iniciar sesión con Google: ' + (error as Error).message);
//         }
//     };



//     return (

//         <div className={styles.authContainer}>
//             <div className={styles.header}>
//                 <h1 className={styles.title}>Welcome back</h1>
//                 <span className={styles.subtitle}>Sign in to your account</span>
//             </div>

//             <form onSubmit={handleLogin} className={styles.form}>
//                 <div className={styles.field}>
//                     <label htmlFor="email" className={styles.label}>
//                         Email
//                     </label>
//                     <input
//                         id="email"
//                         type="email"
//                         className={styles.input}
//                         placeholder="Enter your email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <div className={styles.field}>
//                     <label htmlFor="password" className={styles.label}>
//                         Password
//                     </label>
//                     <input
//                         id="password"
//                         type="password"
//                         className={styles.input}
//                         placeholder="Enter your password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>

//                 <button type="submit" className={styles.button}>
//                     Sign in
//                 </button>
//             </form>
//         </div>

//     );
// };

// export default Login;


"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, signInWithGoogle } from "../../../lib/auth"
import styles from '@/styles/auth.module.css';
import { localhostStorage } from "@/services/localstorage.services"

interface LoginProps {
  redirections: boolean
  setOpenResponsive?: (value: boolean) => void
  fullUrl?: string
}

const Login: React.FC<LoginProps> = ({ redirections, setOpenResponsive, fullUrl }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const todo = await signIn(email, password)
      localhostStorage(todo)

      const redirectUrl = fullUrl || "/"
      if (setOpenResponsive) {
        setOpenResponsive(false)
      }
      router.push(redirectUrl)
    } catch (error) {
      alert("Error al iniciar sesión: " + (error as Error).message)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle()
      router.push("http://localhost:3000")
    } catch (error) {
      alert("Error al iniciar sesión con Google: " + (error as Error).message)
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

export default Login

