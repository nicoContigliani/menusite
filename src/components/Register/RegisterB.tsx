// import React, { useState } from 'react';
// import styles from '@/styles/auth.module.css';
// import VerifyCodeForm from './RegisterValidate';
// import { localhostStorage } from '@/services/localstorage.services';

// const RegisterB = (props: any) => {

//     const {
//         redirections,
//         setOpenResponsive,
//         fullUrl,
//         setIsLogin
//     } = props

//     const [verificationCode, setVerificationCode] = useState(false);
//     const [formData, setFormData] = useState<any | undefined>({
//     });

//     const [createNotValidate, setCreateNotValidate] = useState<boolean>(false)

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value, type, checked } = e.target;
//         setFormData((prevState: any) => ({
//             ...prevState,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("🚀 ~ handleLogin ~ formData:", formData);
//         try {
//             const dataResult = await fetch('/api/registerdata', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (dataResult.status === 201) {
//                 setCreateNotValidate(true)
//                 await localhostStorage(dataResult)
//                 await setOpenResponsive(false)
//                 await setIsLogin(true)
//             }

//         } catch (error) {
//             alert("Error al iniciar sesión: " + (error as Error).message);
//         }
//     };

//     return (
//         <div>
//             {/* 
//             {
//                 createNotValidate &&
//                 <div className={styles.authContainer}>
//                     <VerifyCodeForm
//                         email={formData.email}
//                     />
//                 </div>
//             } */}

//             {/* {
//                 createNotValidate ?
//                     <div className={styles.authContainer}>
//                       <VerifyCodeForm
//                         email={formData.email}
//                       />
//                     </div>
//                     : */}


//             <div className={styles.authContainer}>


//                 <div className={styles.header}>
//                     <h1 className={styles.title}>Welcome back</h1>
//                     <span className={styles.subtitle}>Sign in to your account</span>
//                 </div>

//                 <form onSubmit={handleLogin} className={styles.form}>
//                     <div className={styles.field}>
//                         <label htmlFor="email" className={styles.label}>Email</label>
//                         <input
//                             id="email"
//                             name="email"
//                             type="email"
//                             className={styles.input}
//                             placeholder="Enter your email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>


//                     <div className={styles.field}>
//                         <label htmlFor="password" className={styles.label}>Password</label>
//                         <input
//                             id="password"
//                             name="password"
//                             type="password"
//                             className={styles.input}
//                             placeholder="Enter your password"
//                             value={formData.password}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <div className={styles.field}>
//                         <label htmlFor="fullname" className={styles.label}>fullname</label>
//                         <input
//                             id="fullname"
//                             name="fullname"
//                             type="text"
//                             className={styles.input}
//                             placeholder="Enter your fullname"
//                             value={formData.fullname}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className={styles.field}>
//                         <label htmlFor="phone" className={styles.label}>phone</label>
//                         <input
//                             id="phone"
//                             name="phone"
//                             type="text"
//                             className={styles.input}
//                             placeholder="Enter your phone"
//                             value={formData.phone}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className={styles.field}>
//                         <label htmlFor="birthday" className={styles.label}>birthday</label>
//                         <input
//                             id="birthday"
//                             name="birthday"
//                             type="date"
//                             className={styles.input}
//                             placeholder="Enter your birthday"
//                             value={formData.birthday}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>

//                     <button type="submit" className={styles.button}>Sign in</button>
//                 </form>
//             </div>

//             {/* } */}
//         </div>
//     );
// };

// export default RegisterB;


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

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [createNotValidate, setCreateNotValidate] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullname: '',
        phone: '',
        birthday: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setError(null);
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/registerdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.status === 201) {
                setCreateNotValidate(true);
                await localhostStorage(result);
                await setOpenResponsive(false);
                await setIsLogin(true);
            } else {
                throw new Error(result.message || 'Error en el registro');
            }
        } catch (error) {
            setError((error as Error).message || "Error en el registro");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div data-cy="register-container">
            <div className={styles.authContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title} data-cy="register-title">Create Account</h1>
                    <span className={styles.subtitle} data-cy="register-subtitle">
                        Sign up for your account
                    </span>
                </div>

                {error && (
                    <div 
                        className={`${styles.errorMessage}`}
                        data-cy="register-error-message"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                <form 
                    onSubmit={handleRegister} 
                    className={styles.form}
                    data-cy="register-form"
                >
                    <div className={styles.field}>
                        <label 
                            htmlFor="email" 
                            className={styles.label}
                            data-cy="register-email-label"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className={styles.input}
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            data-cy="register-email-input"
                            disabled={isLoading}
                            aria-label="Email address"
                        />
                    </div>

                    <div className={styles.field}>
                        <label 
                            htmlFor="password" 
                            className={styles.label}
                            data-cy="register-password-label"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            className={styles.input}
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            data-cy="register-password-input"
                            disabled={isLoading}
                            aria-label="Password"
                            minLength={6}
                        />
                    </div>

                    <div className={styles.field}>
                        <label 
                            htmlFor="fullname" 
                            className={styles.label}
                            data-cy="register-fullname-label"
                        >
                            Full Name
                        </label>
                        <input
                            id="fullname"
                            name="fullname"
                            type="text"
                            className={styles.input}
                            placeholder="Enter your full name"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                            data-cy="register-fullname-input"
                            disabled={isLoading}
                            aria-label="Full name"
                        />
                    </div>

                    <div className={styles.field}>
                        <label 
                            htmlFor="phone" 
                            className={styles.label}
                            data-cy="register-phone-label"
                        >
                            Phone
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            className={styles.input}
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            data-cy="register-phone-input"
                            disabled={isLoading}
                            aria-label="Phone number"
                            pattern="[0-9]*"
                        />
                    </div>

                    <div className={styles.field}>
                        <label 
                            htmlFor="birthday" 
                            className={styles.label}
                            data-cy="register-birthday-label"
                        >
                            Birthday
                        </label>
                        <input
                            id="birthday"
                            name="birthday"
                            type="date"
                            className={styles.input}
                            value={formData.birthday}
                            onChange={handleChange}
                            required
                            data-cy="register-birthday-input"
                            disabled={isLoading}
                            aria-label="Birthday"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className={`${styles.button} ${isLoading ? styles.loading : ''}`}
                        data-cy="register-submit-button"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterB;