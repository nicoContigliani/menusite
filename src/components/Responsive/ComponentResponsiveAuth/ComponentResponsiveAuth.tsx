import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    IconButton,
    Button,
    useTheme,
    Paper,
    Fade,
    Grow,
    Slide,
    CircularProgress,
    useMediaQuery
} from '@mui/material';
import {
    Visibility,
    VisibilityOff,
    Login,
    PersonAdd,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useAuth } from '../../../../hooks/useAuth';


interface ComponentResponsiveAuthProps {
    login: (email: string, password: string) => Promise<any>;
    register: (data: AuthData) => Promise<any>;
    error: string | null;
    isLoading: boolean;
    isRegistering: boolean;
    toggleAuthMode: () => void;
}

interface AuthData {
    email: string;
    password: string;
    fullname: string;
    birthday: string;
    phone: string;
}


interface AuthFormProps {
    isRegistering: boolean;
    isLoading: boolean;
    error: string | null;
    email: string;
    password: string;
    fullname: string;
    birthday: string;
    phone: string;
    showPassword: boolean;
    onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFullnameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBirthdayChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTogglePassword: () => void;
    onToggleAuthMode: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
    isRegistering,
    isLoading,
    error,
    email,
    password,
    fullname,
    birthday,
    phone,
    showPassword,
    onEmailChange,
    onPasswordChange,
    onFullnameChange,
    onBirthdayChange,
    onPhoneChange,
    onTogglePassword,
    onToggleAuthMode,
    onSubmit
}) => {
    const theme = useTheme();

    return (
        <Box
            component={Paper}
            elevation={6}
            sx={{
                width: '100%',
                maxWidth: 450,
                p: { xs: 3, sm: 4 },
                borderRadius: 2,
                backgroundColor: 'background.paper',
                mx: 'auto',
                my: { xs: 2, md: 0 }
            }}
        >
            <Box sx={{ textAlign: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {isRegistering ? 'Create Account' : 'Welcome Back'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {isRegistering ? 'Join us today' : 'Sign in to continue'}
                </Typography>
            </Box>

            <AnimatePresence>
                {error && (
                    <Slide direction="down" in={!!error} mountOnEnter unmountOnExit>
                        <Box
                            sx={{
                                backgroundColor: 'error.light',
                                color: 'error.contrastText',
                                p: 2,
                                mb: 3,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Typography variant="body2">{error}</Typography>
                        </Box>
                    </Slide>
                )}
            </AnimatePresence>

            <Box component="form" onSubmit={onSubmit}>
                {isRegistering && (
                    <>
                        <Grow in={isRegistering} style={{ transformOrigin: '0 0 0' }} timeout={500}>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Full Name"
                                    variant="outlined"
                                    value={fullname}
                                    onChange={onFullnameChange}
                                    required
                                    disabled={isLoading}
                                    placeholder="Enter your full name"
                                    sx={{ mb: 2 }}
                                />
                            </Box>
                        </Grow>

                        <Grow in={isRegistering} style={{ transformOrigin: '0 0 0' }} timeout={600}>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Birthday"
                                    type="date"
                                    variant="outlined"
                                    value={birthday}
                                    onChange={onBirthdayChange}
                                    required
                                    disabled={isLoading}
                                    InputLabelProps={{ shrink: true }}
                                />
                            </Box>
                        </Grow>

                        <Grow in={isRegistering} style={{ transformOrigin: '0 0 0' }} timeout={700}>
                            <Box sx={{ mb: 2 }}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    type="tel"
                                    variant="outlined"
                                    value={phone}
                                    onChange={onPhoneChange}
                                    required
                                    disabled={isLoading}
                                    placeholder="Enter your phone number"
                                />
                            </Box>
                        </Grow>
                    </>
                )}

                <Fade in timeout={800}>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            value={email}
                            onChange={onEmailChange}
                            required
                            disabled={isLoading}
                            placeholder="Enter your email"
                        />
                    </Box>
                </Fade>

                <Fade in timeout={900}>
                    <Box sx={{ mb: 3 }}>
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={password}
                            onChange={onPasswordChange}
                            required
                            disabled={isLoading}
                            placeholder={isRegistering ? 'Create password' : 'Enter password'}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={onTogglePassword}
                                            edge="end"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Box>
                </Fade>

                <Fade in timeout={1000}>
                    <Box sx={{ mb: 2 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={isLoading}
                            size="large"
                            startIcon={
                                isLoading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : isRegistering ? (
                                    <PersonAdd />
                                ) : (
                                    <Login />
                                )
                            }
                            sx={{
                                height: 48,
                                boxShadow: theme.shadows[2],
                                '&:hover': {
                                    boxShadow: theme.shadows[4],
                                    transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {isLoading
                                ? isRegistering
                                    ? 'Creating account...'
                                    : 'Signing in...'
                                : isRegistering
                                    ? 'Register'
                                    : 'Login'}
                        </Button>
                    </Box>
                </Fade>

                <Fade in timeout={1100}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Typography variant="body2">
                            {isRegistering ? 'Already have an account? ' : "Don't have an account? "}
                            <Button
                                variant="text"
                                onClick={onToggleAuthMode}
                                disabled={isLoading}
                                sx={{ textTransform: 'none', fontWeight: 600 }}
                            >
                                {isRegistering ? 'Login' : 'Register'}
                            </Button>
                        </Typography>
                    </Box>
                </Fade>
            </Box>
        </Box>
    );
};

const ComponentResponsiveAuth: React.FC<ComponentResponsiveAuthProps> = ({
    login,
    register,
    error,
    isLoading,
    isRegistering,
    toggleAuthMode,
}) => {
 

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register({ email, password, fullname, birthday, phone });
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    const handleToggleAuthMode = () => {
        // Clear form fields when toggling
        if (isRegistering) {
            setFullname('');
            setBirthday('');
            setPhone('');
        }
        setEmail('');
        setPassword('');
        setShowPassword(false);
        toggleAuthMode();
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: { xs: 'flex-start', md: 'space-between' },
                position: 'relative',
                overflow: 'hidden',
                mx: 'auto',
                px: { xs: 2, sm: 0 }
            }}
        >
            {/* Video Background */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                    overflow: 'hidden',
                    '&:after': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.6)'
                    }
                }}
            >
                <Box
                    component="video"
                    autoPlay
                    muted
                    loop
                    playsInline
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'cover',
                        opacity: 0.8,
                        '@media (max-aspect-ratio: 16/9)': {
                            width: 'auto',
                            height: '100%'
                        },
                        '@media (min-aspect-ratio: 16/9)': {
                            width: '100%',
                            height: 'auto'
                        }
                    }}
                >
                    <source src="/videos/DeliveryMan.mp4" type="video/mp4" />
                    Your browser does not support videos.
                </Box>
            </Box>

            {/* Brand Section */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: { xs: 0, sm: 0 },
                    zIndex: 1,
                    color: 'common.white',
                    textAlign: 'center',
                    mt: { xs: 4, md: 0 },
                    mb: { xs: 2, md: 0 }
                }}
            >
                <motion.div
                    whileHover={{ rotate: 2 }}
                    style={{ display: 'flex', justifyContent: 'center' }}
                >
                    <Image
                        src="/images/flama.png"
                        alt="LlakaScript"
                        width={isMobile ? 120 : 160}
                        height={isMobile ? 90 : 120}
                        quality={100}
                        priority
                    />
                </motion.div>
                <Typography
                    variant={isMobile ? 'h4' : 'h3'}
                    component="h1"
                    sx={{
                        mt: 2,
                        fontWeight: 'bold',
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                    }}
                >
                    LlakaScript
                </Typography>
                {!isMobile && (
                    <Typography
                        variant="h6"
                        sx={{
                            mt: 1,
                            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                            maxWidth: 400,
                            px: 0
                        }}
                    >
                        La mejor solución para tus entregas
                    </Typography>
                )}
            </Box>

            {/* Auth Form Section */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '30vh',
                    px: 1,
                    zIndex: 1,
                    width: '100%',
                    maxWidth: 500,
                    mb: { xs: 4, md: 0 }
                }}
            >
                <AuthForm
                    isRegistering={isRegistering}
                    isLoading={isLoading}
                    error={error}
                    email={email}
                    password={password}
                    fullname={fullname}
                    birthday={birthday}
                    phone={phone}
                    showPassword={showPassword}
                    onEmailChange={(e) => setEmail(e.target.value)}
                    onPasswordChange={(e) => setPassword(e.target.value)}
                    onFullnameChange={(e) => setFullname(e.target.value)}
                    onBirthdayChange={(e) => setBirthday(e.target.value)}
                    onPhoneChange={(e) => setPhone(e.target.value)}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                    onToggleAuthMode={handleToggleAuthMode}
                    onSubmit={isRegistering ? handleRegister : handleLogin}
                />
            </Box>
        </Box>
    );
};

export default ComponentResponsiveAuth;