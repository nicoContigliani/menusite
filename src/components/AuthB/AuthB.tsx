// import { Button } from 'antd';
// import React, { useEffect, useState } from 'react'

// import RegisterB from '../Register/RegisterB';
// import LoginB from '../Login/LoginB';
// import { getLocalhostStorage } from '@/services/localstorage.services';

// const AuthB = (props: any) => {
//     const [activeForm, setActiveForm] = useState<'login' | 'register' | 'validateCode'>('login');

//     const {
//         redirections,
//         setOpenResponsive,
//         fullUrl,
//         setIsLogin
//     } = props

//     useEffect(() => {
//         const storedData = getLocalhostStorage()
//         if (storedData?.aud != null) {
//             const { aud, email, _id, access_token, expires_at, userid } = storedData
//             // setIsLogin(true)
//             setOpenResponsive(false)

//         } else {
//             // setOpenResponsive(true)
//         }
//     }, [])


//     return (
//         <div >
//             {activeForm === 'register' && (
//                 <RegisterB 
//                 redirections={redirections}
//                 setOpenResponsive={setOpenResponsive}
//                 fullUrl={fullUrl}
//                 setIsLogin={setIsLogin}
//                 />
//             )}
//             {activeForm === 'login' && (
//                 <LoginB 
//                 redirections={redirections}
//                 setOpenResponsive={setOpenResponsive}
//                 fullUrl={fullUrl}
//                 setIsLogin={setIsLogin}
//                 />
//             )}

//             <hr /><br />
//             <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>

//                 {activeForm === 'register' && <Button block type="primary" onClick={() => setActiveForm('login')}>Login</Button>}
//                 {activeForm === 'login' && <Button block type="primary" onClick={() => setActiveForm('register')}>Register</Button>}
//             </div>
//         </div>
//     )
// }

// export default AuthB


import { Button } from 'antd';
import React, { useEffect, useState } from 'react'

import RegisterB from '../Register/RegisterB';
import LoginB from '../Login/LoginB';
import { getLocalhostStorage } from '@/services/localstorage.services';

const AuthB = (props: any) => {
    const [activeForm, setActiveForm] = useState<'login' | 'register' | 'validateCode'>('login');

    const {
        redirections,
        setOpenResponsive,
        fullUrl,
        setIsLogin
    } = props

    useEffect(() => {
        const storedData = getLocalhostStorage()
        if (storedData?.aud != null) {
            const { aud, email, _id, access_token, expires_at, userid } = storedData
            setOpenResponsive(false)
        }
    }, [])

    return (
        <div data-cy="auth-container">
            {activeForm === 'register' && (
                <div data-cy="register-form-container">
                    <RegisterB 
                        redirections={redirections}
                        setOpenResponsive={setOpenResponsive}
                        fullUrl={fullUrl}
                        setIsLogin={setIsLogin}
                        data-cy="register-form"
                    />
                </div>
            )}
            {activeForm === 'login' && (
                <div data-cy="login-form-container">
                    <LoginB 
                        redirections={redirections}
                        setOpenResponsive={setOpenResponsive}
                        fullUrl={fullUrl}
                        setIsLogin={setIsLogin}
                        data-cy="login-form"
                    />
                </div>
            )}

            <hr /><br />
            <div 
                style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}
                data-cy="auth-switch-buttons"
            >
                {activeForm === 'register' && (
                    <Button 
                        block 
                        type="primary" 
                        onClick={() => setActiveForm('login')}
                        data-cy="switch-to-login-btn"
                    >
                        Login
                    </Button>
                )}
                {activeForm === 'login' && (
                    <Button 
                        block 
                        type="primary" 
                        onClick={() => setActiveForm('register')}
                        data-cy="switch-to-register-btn"
                    >
                        Register
                    </Button>
                )}
            </div>
        </div>
    )
}

export default AuthB