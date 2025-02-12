import { Button } from 'antd';
import React, { useState } from 'react'
import RegisterAuthB from './RegisterAuthB/RegisterAuthB';
import LoginAuthB from './LoginAuthB/LoginAuthB';
import ValidateCodeAuthB from './ValidateCodeAuthB/ValidateCodeAuthB';

const AuthB = () => {
    const [activeForm, setActiveForm] = useState<'login' | 'register' | 'validateCode'>('login');
    return (
        <div >
            {activeForm === 'register' && (
                <RegisterAuthB />
            )}
            {activeForm === 'login' && (
                <LoginAuthB />
            )}

            {activeForm === 'validateCode' && (
                <ValidateCodeAuthB/>
            )}
            <hr /><br />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
                <Button block type="primary" onClick={() => setActiveForm('login')}>Login</Button>
                <Button block type="primary" onClick={() => setActiveForm('register')}>Register</Button>
                <Button block type="primary" onClick={() => setActiveForm('validateCode')}>Verify Code</Button>
            </div>
        </div>
    )
}

export default AuthB