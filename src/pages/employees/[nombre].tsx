import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiLoader, FiLogIn, FiUserPlus } from 'react-icons/fi';
import {
  loginSuccess,
  registerSuccess,
  authFailure,
  clearError
} from '../../../store/authSlice';
import { fetchData } from '@/services/fetch.services';
import { Skeleton } from 'antd';
import styles from './employes.module.css';
import { getLocalhostStorage, localhostStorage } from '@/services/localstorage.services';
import Image from 'next/image';
import { setChExcelData } from '../../../store/chExcelDataSlice';
import { GeolocationService } from '@/services/locationUser.services';
import { LocationDiffService } from '@/services/locationDiff.services';

interface Location {
  lat: number;
  lng: number;
}
// Dynamic imports with loading animations
const MenuEmploees = dynamic(() => import('@/components/MenuEmployees/MenuEmploees'), {
  loading: () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Skeleton active paragraph={{ rows: 8 }} />
    </motion.div>
  ),
});

const OrdersSpeed = dynamic(() => import('@/components/OrdersSpeed/OrdersSpeed'), {
  loading: () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Skeleton active paragraph={{ rows: 5 }} />
    </motion.div>
  ),
});

const CustomSpeedDial = dynamic(() => import('@/components/SpeedDial/SpeedDial'), {
  loading: () => null,
});

// Icons
import {
  FileCopy as FileCopyIcon,
  Grading as GradingIcon,
  Tv as TvIcon
} from '@mui/icons-material';


import Footer from '@/components/Footer/Footer';
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from 'next/link';
import OrdersSpeedPresentation from '@/components/OrdersSpeedPresentation/OrdersSpeedPresentation';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const buttonHover = {
  hover: {
    boxShadow: "0 10px 20px rgba(99, 102, 241, 0.4)",
    y: -3,
    transition: { duration: 0.3, ease: "easeOut" }
  },
  tap: { y: 1 }
};

export async function getServerSideProps({ params }: { params: { nombre: string } }) {
  const { nombre } = params;
  return nombre ? { props: { nombre } } : { redirect: { destination: '/notfound', permanent: false } };
}

const EmpresaPage = ({ nombre }: { nombre: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  // State
  const [data, setData] = useState<any>(null);
  const [dataResum, setDataResum] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Auth form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [menuShow, setMenuShow] = useState(true);
  const [orderShow, setOrderShow] = useState(false);
  const [orderPresentationShow, setOrderPresentationShow] = useState(false);

  // Check initial auth state
  useEffect(() => {
    const storedData: any = getLocalhostStorage();
    if (storedData?.token) {
      setIsAuthenticated(true);
      dispatch(loginSuccess(storedData));
    }
  }, [dispatch]);

  // Fetch business data
  const fetchExcelData = useCallback(async (folder: string) => {
    try {
      const response = await fetchData(
        { folder, file: `${folder}.xlsx` },
        'POST',
        '/api/readFile'
      );

      if (response.ok) {
        setData(response.data);
        setDataResum(response.data.hojas);
        setIsLoaded(true);
        dispatch(setChExcelData({
          ok: true,
          data: response.data,
          error: null,
          message: 'Datos cargados correctamente',
        }));
      } else {
        throw new Error(response.error || 'Failed to load data');
      }
    } catch (error) {
      console.error("Data loading error:", error);
      router.push('/notfound');
    }
  }, [router, dispatch]);

  useEffect(() => {
    if (nombre && !isLoaded) fetchExcelData(nombre);
  }, [nombre, isLoaded, fetchExcelData]);

  // Convertir ubicación a formato compatible
  const convertToLocation = (position: any): Location => {
    return {
      lat: position.latitude || position.lat,
      lng: position.longitude || position.lng
    };
  };

  // // Auth handlers
  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   dispatch(clearError());
  //   setError(null);
  //   setIsLoading(true);

  //   try {
  //     const response = await fetch('/api/loginuser', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password })
  //     });

  //     const result = await response.json();

  //     if (!response.ok) {
  //       throw new Error(result.message || 'Login failed');
  //     }

  //     // Location verification
  //     const businessData = dataResum?.Info[0]?.coordinates;
  //     if (!businessData) {
  //       alert('Business location data missing');
  //       throw new Error('Business location data missing');
  //     }

  //     // const userPosition = await GeolocationService.getPreciseLocation();
  //     // const isNear = LocationDiffService.isWithinRange(
  //     //   { lat: businessData?.latitude, lng: businessData?.longitude },
  //     //   { lat: userPosition?.latitude, lng: userPosition?.longitude },
  //     //   50 // 50 meter radius
  //     // );

  //     const userPosition = await GeolocationService.getPreciseLocation();
  //     const businessLocation = convertToLocation(businessData);
  //     const userLocation = convertToLocation(userPosition);

  //     const isNear = LocationDiffService.isWithinRange(
  //       businessLocation,
  //       userLocation,
  //       50 // 50 metros de radio
  //     );

  //     alert(`${isNear}`)
  //     if (!isNear) {
  //       // throw new Error('You must be near the business to log in');
  //       alert("You must be near the business to log in")
  //     }

  //     await localhostStorage(result);
  //     dispatch(loginSuccess(result));
  //     setIsAuthenticated(true);

  //   } catch (error) {
  //     const message = error instanceof Error ? error.message : 'Login failed';
  //     alert(`${error}`)
  //     setError(message);
  //     dispatch(authFailure(message));
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Auth handlers
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/loginuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      // Location verification (COMENTADO PARA PERMITIR LOGIN SIN VERIFICACIÓN DE UBICACIÓN)
      // Si quieres volver a habilitar la verificación de ubicación, descomenta este bloque:
      /*
      const businessData = dataResum?.Info[0]?.coordinates;
      if (!businessData) {
        alert('Business location data missing');
        throw new Error('Business location data missing');
      }
  
      const userPosition = await GeolocationService.getPreciseLocation();
      const businessLocation = convertToLocation(businessData);
      const userLocation = convertToLocation(userPosition);
  
      const isNear = LocationDiffService.isWithinRange(
        businessLocation,
        userLocation,
        50 // 50 metros de radio
      );
  
      if (!isNear) {
        throw new Error('You must be near the business to log in');
      }
      */

      await localhostStorage(result);
      dispatch(loginSuccess(result));
      setIsAuthenticated(true);

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setError(message);
      dispatch(authFailure(message));
    } finally {
      setIsLoading(false);
    }
  };


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/registerdata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullname, birthday, phone })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }

      await localhostStorage(result);
      dispatch(registerSuccess(result));
      setIsAuthenticated(true);
      setIsRegistering(false);

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      setError(message);
      dispatch(authFailure(message));
    } finally {
      setIsLoading(false);
    }
  };

  // UI handlers
  const handleAuthModeToggle = () => {
    dispatch(clearError());
    setError(null);
    setIsRegistering(!isRegistering);
  };

  const handleSpeedDialAction = (type: string) => {
    setOrderShow(type === "OrderSpeed");
    setMenuShow(type === "MenuSpeed");
    setOrderPresentationShow(type === "PresentationSpeed");
  };

  // Speed dial actions
  // const speedDialActions = [
  //   {

  //     icon: <TvIcon />,
  //     name: "Presentation",
  //     onclick: () => handleSpeedDialAction("PresentationSpeed"),
  //   },
  //   {
  //     icon: <GradingIcon />,
  //     name: 'Orderskichen',
  //     onClick: () => handleSpeedDialAction("OrderSpeed"),
  //   },
  //   {
  //     icon: <FileCopyIcon />,
  //     name: 'Orders',
  //     onClick: () => handleSpeedDialAction("MenuSpeed"),
  //   },
  // ];

  const speedDialActions = [
    {
      icon: <TvIcon />,
      name: "Presentation",
      onClick: () => handleSpeedDialAction("PresentationSpeed"), // Cambiado de onclick a onClick
    },
    {
      icon: <GradingIcon />,
      name: 'Orderskichen',
      onClick: () => handleSpeedDialAction("OrderSpeed"),
    },
    {
      icon: <FileCopyIcon />,
      name: 'Orders',
      onClick: () => handleSpeedDialAction("MenuSpeed"),
    },
  ];


  // Render loading state
  if (!isLoaded) {
    return (
      <div className={styles.loadingContainer}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  // Render authenticated state
  if (isAuthenticated) {
    return (
      <div className={styles.authenticatedContainer}>
        <AnimatePresence mode="wait">
          {menuShow && (
            <motion.div
              key="menu"
              className={styles.menuContainer}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <MenuEmploees menuItems={data} namecompanies={nombre} />
            </motion.div>
          )}

          {orderShow && (
            <motion.div
              key="orders"
              className={styles.ordersContainer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrdersSpeed />
            </motion.div>
          )}

          {orderPresentationShow && (
            <motion.div
              key="ordersPresentation"
              className={styles.ordersContainer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrdersSpeedPresentation />
            </motion.div>
          )}




        </AnimatePresence>

        <div className={styles.speedDialWrapper}>
          <CustomSpeedDial
            actions={speedDialActions}
            position={{ vertical: 'bottom', horizontal: 'right' }}
            direction="up"
            ariaLabel="App actions"
          />
        </div>

        {/* Elegant Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.logoSection}>
              <Link href="/" className={styles.logo}>
                <Image
                  alt=""
                  src="/images/flama.png"
                  width={60}
                  height={60}
                  quality={100}
                />
                Llakascript
              </Link>
            </div>
            <nav className={styles.linksSection}>
              <Link href="/about" className={styles.link}>
                About
              </Link>
              <Link href="/services" className={styles.link}>
                Services
              </Link>
              <Link href="/contact" className={styles.link}>
                Contact
              </Link>
              <Link href="/privacy" className={styles.link}>
                Privacy
              </Link>
              <Link href="/terms" className={styles.link}>
                Terms
              </Link>
            </nav>
            <div className={styles.socialSection}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          <div className={styles.bottomBar}>
            <p>&copy; {new Date().getFullYear()}  Llakascript Technologies. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }

  // Render auth form
  return (
    <div className={styles.authPageContainer}>
      <div className={styles.heroSection}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className={styles.heroVideo}
        >
          <source src="/videos/menu.mp4" type="video/mp4" />
          Your browser does not support videos.
        </video>
        <div className={styles.heroOverlay} />

        <div className={styles.brandContainer}>
          <motion.div
            className={styles.brandLogo}
            whileHover={{ rotate: 2 }}
          >
            <Image
              src="/images/flama.png"
              alt="LlakaScript"
              width={160}
              height={120}
              quality={100}
              priority
            />
          </motion.div>
          <h1 className={styles.brandTitle}>
            LlakaScript
          </h1>
        </div>

        <motion.div
          className={styles.authFormContainer}
          initial="hidden"
          animate="visible"
          variants={slideUp}
        >
          <div className={styles.authHeader}>
            <h2 className={styles.authTitle}>
              {isRegistering ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className={styles.authSubtitle}>
              {isRegistering ? 'Join us today' : 'Sign in to continue'}
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                className={styles.errorMessage}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className={styles.authForm}>
            {isRegistering && (
              <>
                <motion.div className={styles.formField} variants={slideUp}>
                  <label className={styles.fieldLabel}>Full Name</label>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="Enter your full name"
                  />
                </motion.div>

                <motion.div className={styles.formField} variants={slideUp}>
                  <label className={styles.fieldLabel}>Birthday</label>
                  <input
                    type="date"
                    className={styles.formInput}
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </motion.div>

                <motion.div className={styles.formField} variants={slideUp}>
                  <label className={styles.fieldLabel}>Phone Number</label>
                  <input
                    type="tel"
                    className={styles.formInput}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="Enter your phone number"
                  />
                </motion.div>
              </>
            )}

            <motion.div className={styles.formField} variants={slideUp}>
              <label className={styles.fieldLabel}>Email</label>
              <input
                type="email"
                className={styles.formInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your email"
              />
            </motion.div>

            <motion.div className={styles.formField} variants={slideUp}>
              <label className={styles.fieldLabel}>Password</label>
              <div className={styles.passwordField}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.formInput}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder={isRegistering ? 'Create password' : 'Enter password'}
                />
                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </motion.div>

            <motion.div className={styles.submitButtonContainer} variants={slideUp}>
              <motion.button
                type="submit"
                disabled={isLoading}
                className={styles.submitButton}
                variants={buttonHover}
                whileHover="hover"
                whileTap="tap"
              >
                {isLoading ? (
                  <span className={styles.buttonLoading}>
                    <FiLoader className={styles.loadingIcon} />
                    {isRegistering ? 'Creating account...' : 'Signing in...'}
                  </span>
                ) : (
                  <>
                    {isRegistering ? (
                      <>
                        <FiUserPlus className={styles.buttonIcon} />
                        Register
                      </>
                    ) : (
                      <>
                        <FiLogIn className={styles.buttonIcon} />
                        Login
                      </>
                    )}
                  </>
                )}
              </motion.button>
            </motion.div>

            <div className={styles.authToggleContainer}>
              <span className={styles.toggleText}>
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}
              </span>
              <motion.button
                type="button"
                onClick={handleAuthModeToggle}
                className={styles.toggleButton}
                whileHover={{ color: "#6366F1" }}
                whileTap={{ color: "#4F52DD" }}
              >
                {isRegistering ? 'Login instead' : 'Register now'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(EmpresaPage);
