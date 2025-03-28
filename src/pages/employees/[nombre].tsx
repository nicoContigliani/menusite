// import React, { useEffect, useState, useCallback } from 'react';
// import dynamic from 'next/dynamic'
// import {
//     Save as SaveIcon,
//     Share as ShareIcon,
//     Print as PrintIcon,
//     Add as AddIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     FileCopy as FileCopyIcon,
// } from '@mui/icons-material';

// import GradingIcon from '@mui/icons-material/Grading';

// import { useRouter } from 'next/router';
// import { fetchData } from '@/services/fetch.services';
// import { Skeleton } from 'antd';
// import styles from './employes.module.css';
// //import MenuEmploees from '@/components/MenuEmployees/MenuEmploees';
// const MenuEmploees = dynamic(() => import('@/components/MenuEmployees/MenuEmploees'), {
//     loading: () => <Skeleton active />,
// })
// const OrdersSpeed = dynamic(() => import('@/components/OrdersSpeed/OrdersSpeed'), {
//     loading: () => <Skeleton active />,
// })


// import { getLocalhostStorage, localhostStorage } from '@/services/localstorage.services';
// import { useDispatch } from 'react-redux';
// import { loginSuccess, registerSuccess, authFailure, clearError } from '../../../store/authSlice';
// import Image from 'next/image';
// import { setChExcelData } from '../../../store/chExcelDataSlice';

// import { GeolocationService } from '@/services/locationUser.services';
// import { LocationDiffService } from '@/services/locationDiff.services';
// import CustomSpeedDial from '@/components/SpeedDial/SpeedDial';


// type InfoData = {
//     Config: [];
//     Hoja1: any[];
//     Info: any[];
//     Promotino: any[];
//     schedules: any[];
//     staff: any[];

// };


// export async function getServerSideProps({ params }: { params: { nombre: string } }) {
//     const { nombre } = params;

//     if (!nombre) {
//         return {
//             redirect: {
//                 destination: '/notfound',
//                 permanent: false,
//             },
//         };
//     }

//     return {
//         props: { nombre },
//     };
// }

// const EmpresaPage = ({ nombre }: { nombre: string }) => {
//     const router = useRouter();
//     const [data, setData] = useState<any[] | any | undefined>(undefined);

//     const [dataResum, setDataResum] = useState<any[] | any | undefined>(undefined);

//     const [isLoaded, setIsLoaded] = useState(false);
//     const [isLogin, setIsLogin] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [name, setName] = useState(""); // Nuevo campo para registro
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login/register


//     const [menuShow, setMenuShow] = useState<boolean>(true)
//     const [orderShow, setOrderShow] = useState<boolean>(false)


//     const dispatch = useDispatch();

//     useEffect(() => {
//         const storedData = getLocalhostStorage()
//         if (storedData?.aud != null) {
//             const { aud, email, _id, access_token, expires_at, userid } = storedData
//             setIsLogin(true)
//         } else {
//             setIsLogin(false)
//         }
//     }, [])

//     const fetchExcelData = useCallback(async (folder: string) => {
//         const formData = {
//             folder,
//             file: `${folder}.xlsx`,
//         };

//         try {
//             const response = await fetchData(formData, 'POST', '/api/readFile');
//             if (response.ok) {
//                 setData(response?.data);

//                 setDataResum(response?.data.hojas)

//                 setIsLoaded(true);
//                 dispatch(setChExcelData({
//                     ok: true,
//                     data: response.data,
//                     error: null,
//                     message: 'Datos cargados correctamente',
//                 }));




//             } else {
//                 console.error("❌ Error fetching data:", response.error);
//                 router.push('/notfound');
//             }
//         } catch (error) {
//             console.error("❌ Error en fetchExcelData:", error);
//             router.push('/notfound');
//         }
//     }, [router]);

//     useEffect(() => {
//         if (nombre && !isLoaded) {
//             fetchExcelData(nombre);
//         }
//     }, [nombre, isLoaded, fetchExcelData]);

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();
//         dispatch(clearError());
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

//                 const dataSi: any = dataResum?.Info[0].coordinates
//                 // const userUbications = await GeolocationService.getCurrentLocation();
//                 const userUbications = await GeolocationService.getPreciseLocation();

//                 const storeUbications = {
//                     lat: dataSi?.latitude,
//                     lng: dataSi?.longitude
//                 };

//                 const userUbication = {
//                     lat: userUbications?.latitude,
//                     lng: userUbications?.longitude
//                 };

//                 const isNear = LocationDiffService.isWithinRange(storeUbications, userUbication);


//                 const employessGetHere = LocationDiffService.isWithinRange(
//                     { lat: dataSi?.latitude, lng: dataSi?.longitude },
//                     { lat: userUbications?.latitude, lng: userUbications?.longitude },
//                     50 // Radio de 50 metros
//                 );


//                 await localhostStorage(result);
//                 //if emplooyessGetHere then  dispatch(loginSuccess(result.user));

//                 if (isNear) {

//                     await setIsLogin(true);
//                     await dispatch(loginSuccess(result)); // Asegúrate que result.user tenga la estructura correcta
//                 }
//                 if (!isNear) {
//                     await dispatch(authFailure("No estas cerca de la empresa"));
//                 }

//             }
//         } catch (error) {
//             const errorMessage = (error as Error).message || "Error al iniciar sesión";
//             setError(errorMessage);
//             dispatch(authFailure(errorMessage));
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleRegister = async (e: React.FormEvent) => {
//         e.preventDefault();
//         dispatch(clearError());
//         setError(null);
//         setIsLoading(true);

//         const userData = { email, password, name };

//         try {
//             const response = await fetch('/api/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(userData)
//             });

//             const result = await response.json();
//             if (!response.ok) {
//                 throw new Error(result.message || `Error: ${response.status} ${response.statusText}`);
//             }

//             if (response.status === 201) {
//                 await localhostStorage(result);

//                 await setIsLogin(true);
//                 await dispatch(registerSuccess(result?.user)); // Asegúrate que result.user tenga la estructura correcta
//                 await setIsRegistering(false); // Volver al login después de registro exitoso
//             }
//         } catch (error) {
//             const errorMessage = (error as Error).message || "Error al registrarse";
//             setError(errorMessage);
//             dispatch(authFailure(errorMessage));
//         } finally {
//             setIsLoading(false);
//         }
//     };




//     const AcctionsSpeedDial = (types: any) => {
//         switch (types) {
//             case "OrderSpeed":
//                 setOrderShow(true);
//                 setMenuShow(false);
//                 break;
//             case "MenuSpeed":
//                 setOrderShow(false);
//                 setMenuShow(true);
//         }

//     }


//     // Acciones secundarias
//     const secondaryActions = [
//         {
//             icon: <FileCopyIcon />,
//             name: 'Copiar',
//             onClick: () => AcctionsSpeedDial("MenuSpeed"),
//         },
//         {
//             icon: <GradingIcon />,
//             name: 'OrdserSpeed',
//             onClick: () => AcctionsSpeedDial("OrderSpeed"),
//             tooltipPlacement: 'left'
//         }
//     ];





//     return (
//         <div className={styles.body} data-cy="empresa-page">
//             <div className={styles.container} data-cy="menu-container">
//                 {isLoaded ? (
//                     <div>
//                         {isLogin ? (
//                             <div>
//                                 {
//                                     menuShow && <MenuEmploees menuItems={data} namecompanies={nombre} />
//                                 }
//                                 {
//                                     orderShow && <OrdersSpeed />
//                                 }


//                                 {/* SpeedDial secundario (posición superior izquierda) */}
//                                 <div style={{ position: 'relative' }}>
//                                     <CustomSpeedDial
//                                         actions={secondaryActions}
//                                         position={{ vertical: 'bottom', horizontal: 'right' }}
//                                         direction="up"
//                                         ariaLabel="Acciones secundarias"
//                                         sx={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }}

//                                     />
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className={styles.hero}>
//                                 <video autoPlay muted playsInline className={styles.videoBackground}>
//                                     <source src={'/videos/menu.mp4'} type={'video/mp4'} />
//                                     Tu navegador no soporta el tag de video.
//                                 </video>
//                                 <div className={styles.overlay} />

//                                 <div className={styles.brandSection}>
//                                     <div className={styles.brandImage}>
//                                         <Image
//                                             src={"/images/flama.png"}
//                                             alt={"LlakaScript"}
//                                             width={1600}
//                                             height={1200}
//                                             quality={100}
//                                             priority
//                                             className={styles.mockup}
//                                         />
//                                     </div>
//                                     <h1 className={styles.brandTitle}>{"LlakaScript"}</h1>
//                                 </div>

//                                 <div className={styles.authContainer} data-cy="auth-container">
//                                     <div className={styles.header}>
//                                         <h1 className={styles.loginTitle}>
//                                             {isRegistering ? 'Create Account' : 'Welcome back'}
//                                         </h1>
//                                         <span className={styles.subtitle}>
//                                             {isRegistering ? 'Join us today' : 'Sign in to your account'}
//                                         </span>
//                                     </div>

//                                     {error && (
//                                         <div className={styles.errorMessage} role="alert">
//                                             {error}
//                                         </div>
//                                     )}

//                                     <form onSubmit={isRegistering ? handleRegister : handleLogin} className={styles.form}>
//                                         {isRegistering && (
//                                             <div className={styles.field}>
//                                                 <label htmlFor="name" className={styles.label}>
//                                                     Full Name
//                                                 </label>
//                                                 <input
//                                                     id="name"
//                                                     type="text"
//                                                     className={styles.input}
//                                                     placeholder="Enter your full name"
//                                                     value={name}
//                                                     onChange={(e) => setName(e.target.value)}
//                                                     required
//                                                     disabled={isLoading}
//                                                 />
//                                             </div>
//                                         )}

//                                         <div className={styles.field}>
//                                             <label htmlFor="email" className={styles.label}>
//                                                 Email
//                                             </label>
//                                             <input
//                                                 id="email"
//                                                 type="email"
//                                                 className={styles.input}
//                                                 placeholder="Enter your email"
//                                                 value={email}
//                                                 onChange={(e) => setEmail(e.target.value)}
//                                                 required
//                                                 disabled={isLoading}
//                                             />
//                                         </div>

//                                         <div className={styles.field}>
//                                             <label htmlFor="password" className={styles.label}>
//                                                 Password
//                                             </label>
//                                             <input
//                                                 id="password"
//                                                 type="password"
//                                                 className={styles.input}
//                                                 placeholder={isRegistering ? 'Create a password' : 'Enter your password'}
//                                                 value={password}
//                                                 onChange={(e) => setPassword(e.target.value)}
//                                                 required
//                                                 disabled={isLoading}
//                                             />
//                                         </div>

//                                         <button
//                                             type="submit"
//                                             className={`${styles.button} ${isLoading ? styles.loading : ''}`}
//                                             disabled={isLoading}
//                                         >
//                                             {isLoading
//                                                 ? (isRegistering ? 'Signing up...' : 'Signing in...')
//                                                 : (isRegistering ? 'Sign up' : 'Sign in')}
//                                         </button>

//                                         <div className={styles.switchAuth}>
//                                             <span>
//                                                 {isRegistering
//                                                     ? 'Already have an account?'
//                                                     : "Don't have an account?"}
//                                             </span>
//                                             <button
//                                                 type="button"
//                                                 className={styles.switchButton}
//                                                 onClick={() => {
//                                                     setIsRegistering(!isRegistering);
//                                                     dispatch(clearError());
//                                                     setError(null);
//                                                 }}
//                                             >
//                                                 {isRegistering ? 'Sign in' : 'Sign up'}
//                                             </button>
//                                         </div>
//                                     </form>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 ) : (
//                     <Skeleton active />
//                 )}
//             </div>
//         </div>
//     );
// };

// export default React.memo(EmpresaPage);




import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
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

// Dynamic imports
const MenuEmploees = dynamic(() => import('@/components/MenuEmployees/MenuEmploees'), {
  loading: () => <Skeleton active />,
});
const OrdersSpeed = dynamic(() => import('@/components/OrdersSpeed/OrdersSpeed'), {
  loading: () => <Skeleton active />,
});
const CustomSpeedDial = dynamic(() => import('@/components/SpeedDial/SpeedDial'), {
  loading: () => null,
});

// Icons
import {
  FileCopy as FileCopyIcon,
  Grading as GradingIcon,
} from '@mui/icons-material';

// Interface para ubicación
interface Location {
  lat: number;
  lng: number;
}

export async function getServerSideProps({ params }: { params: { nombre: string } }) {
  const { nombre } = params;
  return nombre ? { props: { nombre } } : { redirect: { destination: '/notfound', permanent: false } };
}

const EmpresaPage = ({ nombre }: { nombre: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Local state
  const [data, setData] = useState<any>(null);
  const [dataResum, setDataResum] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
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

  // Check initial auth state
  useEffect(() => {
    const storedData:any = getLocalhostStorage();
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

      // Verificación de ubicación
      const businessData = dataResum?.Info[0]?.coordinates;
      if (!businessData) {
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
        throw new Error('Debes estar cerca del negocio para iniciar sesión');
      }

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
  };

  // Speed dial actions
  const speedDialActions = [
    {
      icon: <FileCopyIcon />,
      name: 'Menu',
      onClick: () => handleSpeedDialAction("MenuSpeed"),
    },
    {
      icon: <GradingIcon />,
      name: 'Orders',
      onClick: () => handleSpeedDialAction("OrderSpeed"),
    }
  ];

  // Render loading state
  if (!isLoaded) {
    return (
      <div className={styles.body}>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  // Render authenticated state
  if (isAuthenticated) {
    return (
      <div className={styles.body}>
        {menuShow && <MenuEmploees menuItems={data} namecompanies={nombre} />}
        {orderShow && <OrdersSpeed />}
        
        <CustomSpeedDial
          actions={speedDialActions}
          position={{ vertical: 'bottom', horizontal: 'right' }}
          direction="up"
          ariaLabel="App actions"
        />
      </div>
    );
  }

  // Render auth form
  return (
    <div className={styles.body}>
      <div className={styles.hero}>
        <video autoPlay muted loop playsInline className={styles.videoBackground}>
          <source src="/videos/menu.mp4" type="video/mp4" />
          Your browser does not support videos.
        </video>
        <div className={styles.overlay} />

        <div className={styles.brandSection}>
          <div className={styles.brandImage}>
            <Image
              src="/images/flama.png"
              alt="LlakaScript"
              width={160}
              height={120}
              quality={100}
              priority
            />
          </div>
          <h1 className={styles.brandTitle}>LlakaScript</h1>
        </div>

        <div className={styles.authContainer}>
          <div className={styles.header}>
            <h1>{isRegistering ? 'Create Account' : 'Welcome Back'}</h1>
            <p>{isRegistering ? 'Join us today' : 'Sign in to continue'}</p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className={styles.form}>
            {isRegistering && (
              <>
                <div className={styles.field}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className={styles.field}>
                  <label>Birthday</label>
                  <input
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className={styles.field}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    disabled={isLoading}
                    placeholder="Enter your phone number"
                  />
                </div>
              </>
            )}

            <div className={styles.field}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                placeholder="Enter your email"
              />
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                placeholder={isRegistering ? 'Create password' : 'Enter password'}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.authButton}
            >
              {isLoading ? 'Processing...' : isRegistering ? 'Register' : 'Login'}
            </button>

            <div className={styles.authToggle}>
              <span>
                {isRegistering ? 'Already have an account?' : "Don't have an account?"}
              </span>
              <button
                type="button"
                onClick={handleAuthModeToggle}
                className={styles.toggleButton}
              >
                {isRegistering ? 'Login instead' : 'Register now'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(EmpresaPage);
