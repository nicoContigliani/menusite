import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ValidateCode from './ValidateCode';
import ModalComponents from '../ModalComponents/ModalComponents';
import { Button } from 'antd';
import styles from '@/styles/auth.module.css';

interface AuthProps {
    redirections: any;
    setOpenResponsive: (open: boolean) => void;
    fullUrl: string;
    setIsLogin: (login: boolean) => void;
}

const Auth: React.FC<AuthProps> = ({ redirections, setOpenResponsive, fullUrl, setIsLogin }) => {
    const [activeForm, setActiveForm] = useState<'login' | 'register' | 'validateCode'>('login');

    return (
        <div >


            {activeForm === 'login' && (
                <LoginForm
                    redirections={redirections}
                    setOpenResponsive={setOpenResponsive}
                    fullUrl={fullUrl}
                    setIsLogin={setIsLogin}
                />
            )}

            {activeForm === 'validateCode' && (
                <ValidateCode
                    redirections={redirections}
                    setOpenResponsive={setOpenResponsive}
                    fullUrl={fullUrl}
                    setIsLogin={setIsLogin}
                />
            )}

            {activeForm === 'register' && (
                <RegisterForm
                    redirections={redirections}
                    setOpenResponsive={setOpenResponsive}
                    fullUrl={fullUrl}
                    setIsLogin={setIsLogin}
                />
            )}
            <hr /><br />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                <Button block type="primary" onClick={() => setActiveForm('login')}>Login</Button>
                <Button block type="primary" onClick={() => setActiveForm('register')}>Register</Button>
                <Button block type="primary" onClick={() => setActiveForm('validateCode')}>Verify Code</Button>
            </div>
        </div>
    );
};

export default Auth;
