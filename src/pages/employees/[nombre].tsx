// import React, { useEffect, useState, useCallback } from 'react';
// import { useRouter } from 'next/router';
// import { fetchData } from '@/services/fetch.services';
// import { Skeleton } from 'antd';
// import styles from './employes.module.css';
// import MenuEmploees from '@/components/MenuEmployees/MenuEmploees';
// import { getLocalhostStorage, localhostStorage } from '@/services/localstorage.services';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../../../store/authSlice';
// import Image from 'next/image';
// import { setChExcelData } from '../../../store/chExcelDataSlice';
// import useGeolocation from '../../../hooks/useGeolocation';


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
//     const [data, setData] = useState<any | undefined>(undefined);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [isLogin, setIsLogin] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const dispatch = useDispatch();

//     const { position, errors } = useGeolocation();
//     console.log("🚀 ~ EmpresaPage ~ position:", position)


//     useEffect(() => {
//         const storedData = getLocalhostStorage()
//         console.log("🚀 ~ useEffect ~ storedData:", storedData)
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
//             if (!response.ok) {
//                 throw new Error(result.message || `Error: ${response.status} ${response.statusText}`);
//             }
//             console.log("🚀 ~ handleLogin ~ result:", result)

//             if (response.status === 200) {
//                 await localhostStorage(result);
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
//         <div className={styles.body} data-cy="empresa-page">
//             <div className={styles.container} data-cy="menu-container">
//                 {isLoaded ? (
//                     <div>
//                         {isLogin ? (
//                             <MenuEmploees menuItems={data} namecompanies={nombre} />
//                         ) : (
//                             <div className={styles.hero}>
//                                 <video
//                                     autoPlay
//                                     muted
//                                     playsInline
//                                     className={styles.videoBackground}
//                                 >
//                                     <source src={'/videos/menu.mp4'} type={'video/mp4'} />
//                                     Tu navegador no soporta el tag de video.
//                                 </video>
//                                 <div className={styles.overlay} />

//                                 {/* Sección de la marca (título + imagen) */}
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

//                                 {/* Formulario de inicio de sesión */}
//                                 <div className={styles.authContainer} data-cy="login-container">
//                                     <div className={styles.header}>
//                                         <h1 className={styles.loginTitle} data-cy="login-title">Welcome back</h1>
//                                         <span className={styles.subtitle} data-cy="login-subtitle">
//                                             Sign in to your account
//                                         </span>
//                                     </div>

//                                     {error && (
//                                         <div className={styles.errorMessage} data-cy="login-error-message" role="alert">
//                                             {error}
//                                         </div>
//                                     )}

//                                     <form onSubmit={handleLogin} className={styles.form} data-cy="login-form">
//                                         <div className={styles.field}>
//                                             <label htmlFor="email" className={styles.label} data-cy="login-email-label">
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
//                                                 data-cy="login-email-input"
//                                                 aria-label="Email address"
//                                                 disabled={isLoading}
//                                             />
//                                         </div>

//                                         <div className={styles.field}>
//                                             <label htmlFor="password" className={styles.label} data-cy="login-password-label">
//                                                 Password
//                                             </label>
//                                             <input
//                                                 id="password"
//                                                 type="password"
//                                                 className={styles.input}
//                                                 placeholder="Enter your password"
//                                                 value={password}
//                                                 onChange={(e) => setPassword(e.target.value)}
//                                                 required
//                                                 data-cy="login-password-input"
//                                                 aria-label="Password"
//                                                 disabled={isLoading}
//                                             />
//                                         </div>

//                                         <button
//                                             type="submit"
//                                             className={`${styles.button} ${isLoading ? styles.loading : ''}`}
//                                             data-cy="login-submit-button"
//                                             disabled={isLoading}
//                                         >
//                                             {isLoading ? 'Signing in...' : 'Sign in'}
//                                         </button>

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
import { useRouter } from 'next/router';
import { fetchData } from '@/services/fetch.services';
import { Skeleton } from 'antd';
import styles from './employes.module.css';
import MenuEmploees from '@/components/MenuEmployees/MenuEmploees';
import { getLocalhostStorage, localhostStorage } from '@/services/localstorage.services';
import { useDispatch } from 'react-redux';
import { loginSuccess, registerSuccess, authFailure, clearError } from '../../../store/authSlice';
import Image from 'next/image';
import { setChExcelData } from '../../../store/chExcelDataSlice';

import LocationService from '@/services/Location.services';
import { GeolocationService } from '@/services/locationUser.services';
import { LocationDiffService } from '@/services/locationDiff.services';


type InfoData = {
    Config: [];
    Hoja1: any[];
    Info: any[];
    Promotino: any[];
    schedules: any[];
    staff: any[];

};


export async function getServerSideProps({ params }: { params: { nombre: string } }) {
    const { nombre } = params;

    if (!nombre) {
        return {
            redirect: {
                destination: '/notfound',
                permanent: false,
            },
        };
    }

    return {
        props: { nombre },
    };
}

const EmpresaPage = ({ nombre }: { nombre: string }) => {
    const router = useRouter();
    const [data, setData] = useState<any[] | any | undefined>(undefined);

    const [dataResum, setDataResum] = useState<any[] | any | undefined>(undefined);

    const [isLoaded, setIsLoaded] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState(""); // Nuevo campo para registro
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login/register
    const dispatch = useDispatch();

    useEffect(() => {
        const storedData = getLocalhostStorage()
        if (storedData?.aud != null) {
            const { aud, email, _id, access_token, expires_at, userid } = storedData
            setIsLogin(true)
        } else {
            setIsLogin(false)
        }
    }, [])

    const fetchExcelData = useCallback(async (folder: string) => {
        const formData = {
            folder,
            file: `${folder}.xlsx`,
        };

        try {
            const response = await fetchData(formData, 'POST', '/api/readFile');
            if (response.ok) {
                setData(response?.data);

                setDataResum(response?.data.hojas)

                setIsLoaded(true);
                dispatch(setChExcelData({
                    ok: true,
                    data: response.data,
                    error: null,
                    message: 'Datos cargados correctamente',
                }));




            } else {
                console.error("❌ Error fetching data:", response.error);
                router.push('/notfound');
            }
        } catch (error) {
            console.error("❌ Error en fetchExcelData:", error);
            router.push('/notfound');
        }
    }, [router]);

    useEffect(() => {
        if (nombre && !isLoaded) {
            fetchExcelData(nombre);
        }
    }, [nombre, isLoaded, fetchExcelData]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
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

                const dataSi: any = dataResum?.Info[0].coordinates
                // const userUbications = await GeolocationService.getCurrentLocation();
                const userUbications = await GeolocationService.getPreciseLocation();

                const storeUbications = {
                    lat: dataSi?.latitude,
                    lng: dataSi?.longitude
                };

                const userUbication = {
                    lat: userUbications?.latitude,
                    lng: userUbications?.longitude
                };

                const isNear = LocationDiffService.isWithinRange(storeUbications, userUbication);


                const employessGetHere = LocationDiffService.isWithinRange(
                    { lat: dataSi?.latitude, lng: dataSi?.longitude },
                    { lat: userUbications?.latitude, lng: userUbications?.longitude },
                    50 // Radio de 50 metros
                );


                await localhostStorage(result);
                //if emplooyessGetHere then  dispatch(loginSuccess(result.user));

                if (isNear) {

                    await setIsLogin(true);
                    await dispatch(loginSuccess(result.user)); // Asegúrate que result.user tenga la estructura correcta
                }
                if (!isNear) {
                    await dispatch(authFailure("No estas cerca de la empresa"));
                }

            }
        } catch (error) {
            const errorMessage = (error as Error).message || "Error al iniciar sesión";
            setError(errorMessage);
            dispatch(authFailure(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
        setError(null);
        setIsLoading(true);

        const userData = { email, password, name };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || `Error: ${response.status} ${response.statusText}`);
            }

            if (response.status === 201) {
                await localhostStorage(result);

                await setIsLogin(true);
                await dispatch(registerSuccess(result?.user)); // Asegúrate que result.user tenga la estructura correcta
                console.log("🚀 ~ handleRegister ~ result?.user:", result?.user)
                setIsRegistering(false); // Volver al login después de registro exitoso
            }
        } catch (error) {
            const errorMessage = (error as Error).message || "Error al registrarse";
            setError(errorMessage);
            dispatch(authFailure(errorMessage));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.body} data-cy="empresa-page">
            <div className={styles.container} data-cy="menu-container">
                {isLoaded ? (
                    <div>
                        {isLogin ? (
                            <MenuEmploees menuItems={data} namecompanies={nombre} />
                        ) : (
                            <div className={styles.hero}>
                                <video autoPlay muted playsInline className={styles.videoBackground}>
                                    <source src={'/videos/menu.mp4'} type={'video/mp4'} />
                                    Tu navegador no soporta el tag de video.
                                </video>
                                <div className={styles.overlay} />

                                <div className={styles.brandSection}>
                                    <div className={styles.brandImage}>
                                        <Image
                                            src={"/images/flama.png"}
                                            alt={"LlakaScript"}
                                            width={1600}
                                            height={1200}
                                            quality={100}
                                            priority
                                            className={styles.mockup}
                                        />
                                    </div>
                                    <h1 className={styles.brandTitle}>{"LlakaScript"}</h1>
                                </div>

                                <div className={styles.authContainer} data-cy="auth-container">
                                    <div className={styles.header}>
                                        <h1 className={styles.loginTitle}>
                                            {isRegistering ? 'Create Account' : 'Welcome back'}
                                        </h1>
                                        <span className={styles.subtitle}>
                                            {isRegistering ? 'Join us today' : 'Sign in to your account'}
                                        </span>
                                    </div>

                                    {error && (
                                        <div className={styles.errorMessage} role="alert">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={isRegistering ? handleRegister : handleLogin} className={styles.form}>
                                        {isRegistering && (
                                            <div className={styles.field}>
                                                <label htmlFor="name" className={styles.label}>
                                                    Full Name
                                                </label>
                                                <input
                                                    id="name"
                                                    type="text"
                                                    className={styles.input}
                                                    placeholder="Enter your full name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                    disabled={isLoading}
                                                />
                                            </div>
                                        )}

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
                                                disabled={isLoading}
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
                                                placeholder={isRegistering ? 'Create a password' : 'Enter your password'}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className={`${styles.button} ${isLoading ? styles.loading : ''}`}
                                            disabled={isLoading}
                                        >
                                            {isLoading
                                                ? (isRegistering ? 'Signing up...' : 'Signing in...')
                                                : (isRegistering ? 'Sign up' : 'Sign in')}
                                        </button>

                                        <div className={styles.switchAuth}>
                                            <span>
                                                {isRegistering
                                                    ? 'Already have an account?'
                                                    : "Don't have an account?"}
                                            </span>
                                            <button
                                                type="button"
                                                className={styles.switchButton}
                                                onClick={() => {
                                                    setIsRegistering(!isRegistering);
                                                    dispatch(clearError());
                                                    setError(null);
                                                }}
                                            >
                                                {isRegistering ? 'Sign in' : 'Sign up'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Skeleton active />
                )}
            </div>
        </div>
    );
};

export default React.memo(EmpresaPage);