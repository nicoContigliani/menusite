import React, { useEffect, useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiEye, FiEyeOff, FiLoader, FiLogIn, FiUserPlus } from 'react-icons/fi';
import HubIcon from '@mui/icons-material/Hub';
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
import useAccessControl from '../../../hooks/useAccessControl';

// Dynamic imports menu
const MenuEmploees = dynamic(() => import('@/components/MenuEmployees/MenuEmploees'), {
  loading: () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Skeleton active paragraph={{ rows: 8 }} />
    </motion.div>
  ),
});

const OrdersSpeed = dynamic(() => import('@/components/OrdersSpeed/OrdersSpeed'), {
  loading: () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Skeleton active paragraph={{ rows: 5 }} />
    </motion.div>
  ),
});
//menu
const CustomSpeedDial = dynamic(() => import('@/components/SpeedDial/SpeedDial'), {
  loading: () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Skeleton active paragraph={{ rows: 8 }} />
    </motion.div>
  ),
});
//tv
const OrdersSpeedPresentation = dynamic(() => import('@/components/OrdersSpeedPresentation/OrdersSpeedPresentation'), {
  loading: () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Skeleton active paragraph={{ rows: 5 }} />
    </motion.div>
  ),
});
//admin
const OrdersSpeedPresentationStaff = dynamic(() => import('@/components/OrdersSpeedPresentationStaff/OrdersSpeedPresentationStaff'), {
  loading: () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Skeleton active paragraph={{ rows: 5 }} />
    </motion.div>
  ),
});
//sale
const OrdersSaleStaff = dynamic(() => import('@/components/OrdersSaleStaff/OrdersSaleStaff'), {
  loading: () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Skeleton active paragraph={{ rows: 5 }} />
    </motion.div>
  ),
});

// Icons
import {
  FileCopy as FileCopyIcon,
  Grading as GradingIcon,
  Tv as TvIcon
} from '@mui/icons-material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import Footer from '@/components/Footer/Footer';
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from 'next/link';
import { RootState } from '../../../store/store';
import { useAuth } from '../../../hooks/useAuth';
import { recordAttendance } from '@/services/attendance.services';
import OrderSpeedGeneric from '@/components/orderSpeedGeneric/orderSpeedGeneric';
import { socketHost } from '@/services/socketHost.services';

// Interfaces
interface CompaniesData {
  hojas: {
    Config: any[];
    staff: any[];
    Hoja1?: any;
    Info?: any;
    Promotion?: any;
    schedules?: any;
  },
  companyName?: any;
}

interface Location {
  lat: number;
  lng: number;
}

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
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");

  const [menuShow, setMenuShow] = useState(true);
  const [orderShow, setOrderShow] = useState(false);
  const [orderPresentationShow, setOrderPresentationShow] = useState(false);
  const [orderPresentationShowStaff, setOrderPresentationShowStaff] = useState(false);
  const [orderSalesShow, setSalesShow] = useState(false);
  const [genericShow, setGenericShow] = useState(false);


  const {
    login,
    register,
    error,
    isLoading,
    isAuthenticated,
    isRegistering,
    toggleAuthMode,
    setIsAuthenticated
  } = useAuth();


  useEffect(() => {
    const storedData: any = getLocalhostStorage();
    if (storedData?.token) {
      setIsAuthenticated(true);
      dispatch(loginSuccess(storedData));
    }
  }, [dispatch, setIsAuthenticated]);

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

  // Convert location format
  const convertToLocation = (position: any): Location => {
    return {
      lat: position.latitude || position.lat,
      lng: position.longitude || position.lng
    };
  };


  // Get company data and staff
  const companiesData = useSelector((state: RootState) => state.chExcelData.data as unknown as CompaniesData | undefined);
  const { hojas, companyName } = companiesData || { hojas: { Config: [], staff: [] } };
  const { Config = [], staff = [] } = hojas;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const si = await login(email, password);

    if (si !== null) {
      await recordAttendance('getIn', email, companyName);
    }


  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register({ email, password, fullname, birthday, phone });
  };


  // const user = useSelector((state: RootState) => state.auth)
  // console.log("🚀 ~ EmpresaPage ~ user:", user)



  // useEffect(() => {
  //   //validar si el usuario esta autenticado
  //   //validar si esta en staff
  //   console.log("🚀 ~ EmpresaPage ~ staff:", staff)

  //    if (isAuthenticated&& staff.length > 0 && user?.user?.email) {
  //   //   if (!hasAccess('staff')) {
  //   //     alert('No tienes permiso para acceder a esta página');
  //   //     router.push('/menu');
  //   //   }
  //        const si = staff.some((item: any) => item.email === user?.user?.email);
  //        console.log("🚀 ~ useEffect ~ si:", si)
  //    }

  // }, [handleLogin, handleRegister])


  // UI handlers
  const handleAuthModeToggle = () => {
    dispatch(clearError());
    toggleAuthMode();

    // setError(null);
    // setIsRegistering(!isRegistering);
  };

  // Use access control hook
  const { access, hasAccess } = useAccessControl(Config, staff);

  const handleSpeedDialAction = (type: string) => {
    // Verify permissions before changing view
    if (type === "OrderSpeed" && !hasAccess('kichen')) {
      alert('No tienes permiso para acceder a la cocina');
      return;
    }
    if (type === "SalesStaff" && !hasAccess('sales')) {
      alert('No tienes permiso para acceder a ventas');
      return;
    }
    if (type === "PresentationSpeed" && !hasAccess('presentation')) {
      alert('No tienes permiso para ver presentaciones');
      return;
    }
    if (type === "PresentationSpeedStaff" && !hasAccess('presentationStaff')) {
      alert('No tienes permiso para ver presentaciones staff');
      return;
    }

    setOrderShow(type === "OrderSpeed");
    setMenuShow(type === "MenuSpeed");
    setOrderPresentationShow(type === "PresentationSpeed");
    setOrderPresentationShowStaff(type === "PresentationSpeedStaff");
    setSalesShow(type === "SalesStaff");

    setGenericShow(type === "GenericComponent");


  };


  const speedDialActions = useMemo(() => [
    {
      icon: <HubIcon />,
      name: "Generic Component Staff",
      onClick: () => handleSpeedDialAction("GenericComponent"),
      visible: hasAccess('sales')
    },
    {
      icon: <PointOfSaleIcon />,
      name: "Sales Staff",
      onClick: () => handleSpeedDialAction("SalesStaff"),
      visible: hasAccess('sales')
    },
    {
      icon: <DashboardIcon />,
      name: "Presentation Staff",
      onClick: () => handleSpeedDialAction("PresentationSpeedStaff"),
      visible: hasAccess('presentationStaff')
    },
    {
      icon: <TvIcon />,
      name: "Presentation",
      onClick: () => handleSpeedDialAction("PresentationSpeed"),
      visible: hasAccess('presentation')
    },
    {
      icon: <GradingIcon />,
      name: 'Orderskichen',
      onClick: () => handleSpeedDialAction("OrderSpeed"),
      visible: hasAccess('kichen')
    },
    {
      icon: <FileCopyIcon />,
      name: 'Orders',
      onClick: () => handleSpeedDialAction("MenuSpeed"),
      visible: true
    },
  ].filter(action => action.visible), [handleSpeedDialAction, hasAccess]);



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

          {orderPresentationShowStaff && (
            <motion.div
              key="ordersPresentationStaff"
              className={styles.ordersContainer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrdersSpeedPresentationStaff />
            </motion.div>
          )}

          {orderSalesShow && (
            <motion.div
              key="ordersSales"
              className={styles.ordersContainer}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrdersSaleStaff />
            </motion.div>
          )}
          {genericShow && (
            <motion.div
              key="genericShow"
              className={styles.ordersContainer}
              initial={{ opacity: 0, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <OrderSpeedGeneric

              />
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
            <>&copy; {new Date().getFullYear()} Llakascript Technologies. All rights reserved.</>
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
            <span className={styles.authSubtitle}>
              {isRegistering ? 'Join us today' : 'Sign in to continue'}
            </span>
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