// // import React, { useEffect, useState } from 'react'
// // import styles from '@/styles/auth.module.css';
// // import { localhostStorage } from '@/services/localstorage.services';

// // const LoginB = (props: any) => {


// //     const {
// //         redirections,
// //         setOpenResponsive,
// //         fullUrl,
// //         setIsLogin
// //     } = props

// //     const [email, setEmail] = useState("")
// //     const [password, setPassword] = useState("")


// //     const handleLogin = async (e: React.FormEvent) => {
// //         e.preventDefault();
// //         const data = { email, password };

// //         try {
// //             const response = await fetch('/api/loginuser', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 },
// //                 body: JSON.stringify(data)
// //             });

// //             if (!response.ok) {
// //                 throw new Error(`Error: ${response.status} ${response.statusText}`);
// //             }

// //             const result = await response.json(); // Convierte la respuesta a JSON
// //             if (response.status === 200) {
// //                 await localhostStorage(result); // Guarda el resultado correctamente
// //                 await setOpenResponsive(false)
// //                 await setIsLogin(true)
// //             }
// //         } catch (error) {
// //             alert("Error al iniciar sesión: " + (error as Error).message);
// //         }
// //     };


// //     return (
// //         <div className={styles.authContainer}>
// //             <div className={styles.header}>
// //                 <h1 className={styles.title}>Welcome back</h1>
// //                 <span className={styles.subtitle}>Sign in to your account</span>
// //             </div>

// //             <form onSubmit={handleLogin} className={styles.form}>
// //                 <div className={styles.field}>
// //                     <label htmlFor="email" className={styles.label}>
// //                         Email
// //                     </label>
// //                     <input
// //                         id="email"
// //                         type="email"
// //                         className={styles.input}
// //                         placeholder="Enter your email"
// //                         value={email}
// //                         onChange={(e) => setEmail(e.target.value)}
// //                         required
// //                     />
// //                 </div>

// //                 <div className={styles.field}>
// //                     <label htmlFor="password" className={styles.label}>
// //                         Password
// //                     </label>
// //                     <input
// //                         id="password"
// //                         type="password"
// //                         className={styles.input}
// //                         placeholder="Enter your password"
// //                         value={password}
// //                         onChange={(e) => setPassword(e.target.value)}
// //                         required
// //                     />
// //                 </div>

// //                 <button type="submit" className={styles.button}>
// //                     Sign in
// //                 </button>
// //             </form>
// //         </div>
// //     )
// // }

// // export default LoginB


// import React, { useEffect, useState } from 'react'
// import styles from '@/styles/auth.module.css';
// import { localhostStorage } from '@/services/localstorage.services';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../../../store/authSlice';

// const LoginB = (props: any) => {
//     const dispatch = useDispatch();
//     const {
//         redirections,
//         setOpenResponsive,
//         fullUrl,
//         setIsLogin
//     } = props

//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [isLoading, setIsLoading] = useState(false)
//     const [error, setError] = useState<string | null>(null)

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setError(null);
//         setIsLoading(true);

//         const data = { email, password };

//         try {
//             const response = await fetch('/api/loginuser', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(data)
//             });

//             const result = await response.json();
//             console.log("🚀 ~ handleLogin ~ result:", result)

//             if (!response.ok) {
//                 throw new Error(result.message || `Error: ${response.status} ${response.statusText}`);
//             }

//             if (response.status === 200) {
//                 await localhostStorage(result);
//                 await setOpenResponsive(false);
//                 await setIsLogin(true);
//                 await dispatch(loginSuccess(result));
//             }
//         } catch (error) {
//             setError((error as Error).message || "Error al iniciar sesión");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className={styles.authContainer} data-cy="login-container">
//             <div className={styles.header}>
//                 <h1 className={styles.title} data-cy="login-title">Welcome back</h1>
//                 <span className={styles.subtitle} data-cy="login-subtitle">
//                     Sign in to your account
//                 </span>
//             </div>

//             {error && (
//                 <div
//                     className={`${styles.errorMessage}`}
//                     data-cy="login-error-message"
//                     role="alert"
//                 >
//                     {error}
//                 </div>
//             )}

//             <form
//                 onSubmit={handleLogin}
//                 className={styles.form}
//                 data-cy="login-form"
//             >
//                 <div className={styles.field}>
//                     <label
//                         htmlFor="email"
//                         className={styles.label}
//                         data-cy="login-email-label"
//                     >
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
//                         data-cy="login-email-input"
//                         aria-label="Email address"
//                         disabled={isLoading}
//                     />
//                 </div>

//                 <div className={styles.field}>
//                     <label
//                         htmlFor="password"
//                         className={styles.label}
//                         data-cy="login-password-label"
//                     >
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
//                         data-cy="login-password-input"
//                         aria-label="Password"
//                         disabled={isLoading}
//                     />
//                 </div>

//                 <button
//                     type="submit"
//                     className={`${styles.button} ${isLoading ? styles.loading : ''}`}
//                     data-cy="login-submit-button"
//                     disabled={isLoading}
//                 >
//                     {isLoading ? 'Signing in...' : 'Sign in'}
//                 </button>
//             </form>
//         </div>
//     )
// }

// export default LoginB

import React, { useEffect, useState } from 'react'
import styles from '@/styles/auth.module.css';
import { localhostStorage } from '@/services/localstorage.services';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../store/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';

const LoginB = (props: any) => {
    const dispatch = useDispatch();
    const {
        redirections,
        setOpenResponsive,
        fullUrl,
        setIsLogin
    } = props

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        return () => setIsMounted(false)
    }, [])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        const data = { email, password };

        try {
            const response = await fetch('/api/loginuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || `Error: ${response.status} ${response.statusText}`);
            }

            if (response.status === 200) {
                await localhostStorage(result);
                await setOpenResponsive(false);
                await setIsLogin(true);
                await dispatch(loginSuccess(result));
            }
        } catch (error) {
            setError((error as Error).message || "Error al iniciar sesión");
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1]
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: 0.1 * i,
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1]
            }
        })
    }

    const buttonVariants = {
        initial: { scale: 1 },
        tap: { scale: 0.98 },
        hover: { 
            scale: 1.02,
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.2)"
        }
    }

    return (
        <motion.div 
            className={styles.authContainer} 
            data-cy="login-container"
            variants={containerVariants}
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
        >
            <motion.div 
                className={styles.header}
                variants={itemVariants}
                custom={0}
            >
                <motion.h1 
                    className={styles.title} 
                    data-cy="login-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    Welcome back
                </motion.h1>
                <motion.span 
                    className={styles.subtitle} 
                    data-cy="login-subtitle"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Sign in to your account
                </motion.span>
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        className={`${styles.errorMessage}`}
                        data-cy="login-error-message"
                        role="alert"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.form
                onSubmit={handleLogin}
                className={styles.form}
                data-cy="login-form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div 
                    className={styles.field}
                    variants={itemVariants}
                    custom={1}
                >
                    <label
                        htmlFor="email"
                        className={styles.label}
                        data-cy="login-email-label"
                    >
                        Email
                    </label>
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileFocus={{ scale: 1.01 }}
                    >
                        <input
                            id="email"
                            type="email"
                            className={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            data-cy="login-email-input"
                            aria-label="Email address"
                            disabled={isLoading}
                        />
                    </motion.div>
                </motion.div>

                <motion.div 
                    className={styles.field}
                    variants={itemVariants}
                    custom={2}
                >
                    <label
                        htmlFor="password"
                        className={styles.label}
                        data-cy="login-password-label"
                    >
                        Password
                    </label>
                    <motion.div
                        className={styles.passwordContainer}
                        whileHover={{ scale: 1.01 }}
                        whileFocus={{ scale: 1.01 }}
                    >
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            className={styles.input}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            data-cy="login-password-input"
                            aria-label="Password"
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    custom={3}
                >
                    <motion.button
                        type="submit"
                        className={`${styles.button} ${isLoading ? styles.loading : ''}`}
                        data-cy="login-submit-button"
                        disabled={isLoading}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        {isLoading ? (
                            <motion.span
                                animate={{ rotate: 0 }}
                                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                style={{ display: 'inline-flex', alignItems: 'center' }}
                            >
                                <FiLoader style={{ marginRight: 8 }} />
                                Signing in...
                            </motion.span>
                        ) : (
                            'Sign in'
                        )}
                    </motion.button>
                </motion.div>
            </motion.form>
        </motion.div>
    )
}

export default LoginB