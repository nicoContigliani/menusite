



// import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
// import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic';
// import { useDispatch } from 'react-redux';
// import { fetchData } from '@/services/fetch.services';
// import { Skeleton } from 'antd';
// import styles from './companies.module.css';
// import { getLocalhostStorage, localhostStorage } from '@/services/localstorage.services';
// import ModalComponents from '@/components/ModalComponents/ModalComponents';
// import AuthB from '@/components/AuthB/AuthB';
// import { setChExcelData } from '../../../store/chExcelDataSlice';
// import useHandleCreate from '../../../hooks/useFloating';
// import MenuEmploees from '@/components/MenuEmployees/MenuEmploees';
// import { useFetchMultiple } from '../../../hooks/useFetchMultiple';



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
//     const dispatch = useDispatch();
//     const router = useRouter();

//     const [data, setExcelData] = useState<any | undefined>(undefined);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [namecompanies, setNamecompanies] = useState<string>('');

//     const [isLogin, setIsLogin] = useState(true); // Use isLogin directly

//     const [isLogin2, setIsLogin2] = useState(false);

//     const [fullUrl, setFullUrl] = useState("");
//     const [openResponsive, setOpenResponsive] = useState(false);

//     const [refreshTrigger, setRefreshTrigger] = React.useState<number>(0);
//     const [datas, setData] = React.useState<any | undefined>({});

//     const { results, loading, fetchMultiple } = useFetchMultiple();

//     const { handleCreate } = useHandleCreate(data, setRefreshTrigger);

//     React.useEffect(() => {
//         fetchMultiple([{ url: "/api/trackTime" }]);
//     }, [fetchMultiple, refreshTrigger]);

//     React.useEffect(() => {
//         const companiesData = results?.apicompaniesdashboard?.data || [];
//         const trackTimeData: any = results?.apitrackTime?.data || [];
//         const uniqueCompaniesData: any | any[] = [...new Set(trackTimeData.map((item: any) => item.namecompanie))];

//         if (trackTimeData.length >= 2000) {
//             handleCreate();
//             //create data of floating // when and how many
//         }

//         setData({
//             companies: companiesData,
//             trakestime: trackTimeData,
//             uniqueCompanies: uniqueCompaniesData,
//         });
//     }, [results, refreshTrigger]);

//     useEffect(() => {
//         const handleStorageChange = (event: StorageEvent) => {
//             if (event.key === 'your-storage-key') {
//                 const storedData = getLocalhostStorage();
//                 if (storedData.aud == null) {
//                     setOpenResponsive(true);
//                 }
//                 if (storedData?.aud != null) {
//                     setIsLogin2(true);
//                     const { aud, email, _id, access_token, expires_at, userid } = storedData;
//                     // setIsLogin(true)
//                 } else {
//                     // setOpenResponsive(true)
//                 }
//             }
//         };

//         window.addEventListener('storage', handleStorageChange);

//         return () => {
//             window.removeEventListener('storage', handleStorageChange);
//         };
//     }, []);

//     useEffect(() => {
//         const storedData = getLocalhostStorage();
//         if (storedData.aud == null) {
//             setOpenResponsive(true);
//         }
//         if (storedData?.aud != null) {
//             setIsLogin2(true);
//             const { aud, email, _id, access_token, expires_at, userid } = storedData;
//             // setIsLogin(true)
//         } else {
//             // setOpenResponsive(true)
//         }
//     }, []);

//     const handleCloseModal = () => {
//         setOpenResponsive(false); // Close the modal correctly
//     };

//     const isFetching = useRef(false);

//     const fetchExcelData = useCallback(async (folder: string) => {
//         if (isFetching.current) return;
//         isFetching.current = true;

//         const formData = {
//             folder,
//             file: `${folder}.xlsx`,
//         };

//         try {
//             const response = await fetchData(formData, 'POST', '/api/readFile');

//             if (response.ok) {
//                 dispatch(setChExcelData(response));
//                 setExcelData(response?.data);
//                 setNamecompanies(folder);
//                 setIsLoaded(true);
//             } else {
//                 console.error("❌ Error fetching data:", response.error);
//                 dispatch(setChExcelData({
//                     ok: false,
//                     data: null,
//                     error: response.error,
//                     message: response.message,
//                 }));
//                 router.push('/notfound');
//             }
//         } catch (error) {
//             console.error("❌ Error en fetchExcelData:", error);
//             router.push('/notfound');
//         } finally {
//             isFetching.current = false;
//         }
//     }, [dispatch, router]);

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             localhostStorage({ demo: false });
//         }

//         if (nombre && !isLoaded) {
//             fetchExcelData(nombre);
//         }
//     }, [nombre, isLoaded, fetchExcelData]);

//     const memoizedMenuNew = useMemo(() => {
//         return isLoaded && namecompanies ? (
//             <MenuEmploees
//                menuItems={data}
//                namecompanies={namecompanies} 
//             />
//         ) : (
//             <Skeleton active />
//         );
//     }, [isLoaded, namecompanies, data]);

//     return (
//         <div
//             className={styles.body}
//             data-cy="empresa-page">


//             <div
//                 className={styles.container}
//                 data-cy="menu-container">
//                 {memoizedMenuNew}
//             </div>
//         </div>
//     );
// };

// export default React.memo(EmpresaPage);




// import React, { useEffect, useState, useCallback } from 'react';
// import { useRouter } from 'next/router';
// import { fetchData } from '@/services/fetch.services';
// import { Menu, Skeleton } from 'antd';
// import styles from './employes.module.css';
// import MenuEmploees from '@/components/MenuEmployees/MenuEmploees';
// import { localhostStorage } from '@/services/localstorage.services';
// import { useDispatch } from 'react-redux';
// import { loginSuccess } from '../../../store/authSlice';
// import Hero from '@/components/sections/hero/Hero';
// import Image from 'next/image';


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
//     const [isLogin, setIsLogin] = useState(false)

//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")
//     const [isLoading, setIsLoading] = useState(false)
//     const [error, setError] = useState<string | null>(null)

//     const dispatch = useDispatch();



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
//             console.log("🚀 ~ handleLogin ~ result:", result)

//             if (!response.ok) {
//                 throw new Error(result.message || `Error: ${response.status} ${response.statusText}`);
//             }

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
//                         {
//                             isLogin ?
//                                 <MenuEmploees
//                                     menuItems={data}
//                                     namecompanies={nombre}
//                                 />
//                                 :
//                                 <div>

//                                         <>
//                                             <video
//                                                 autoPlay
//                                                 muted
//                                                 playsInline
//                                                 className={styles.videoBackground}
//                                             >
//                                                 <source src={'/videos/menu.mp4'} type={'video/mp4'} />
//                                                 Tu navegador no soporta el tag de video.
//                                             </video>
//                                             <div className={styles.overlay} />
//                                         </>



//                                         <div className={styles.container}>
//                                             <div className={styles.content}>
//                                                 <h1 className={styles.title}>{"title"}</h1>
//                                                 <div className={styles.description}>{"Para Uso Interno"}</div>

//                                                 <div className={styles.buttons}></div>
//                                             </div>

//                                             <div className={styles.image}>
//                                                 <Image
//                                                     src={"/images/flama.png"}
//                                                     alt={"LlakaScript"}
//                                                     width={1600}
//                                                     height={1200}
//                                                     quality={100}
//                                                     priority
//                                                     className={styles.mockup}
//                                                 />
//                                             </div>
//                                         </div>






//                                     <div className={styles.authContainer} data-cy="login-container">
//                                         <div className={styles.header}>
//                                             <h1 className={styles.title} data-cy="login-title">
//                                                 Welcome back
//                                             </h1>
//                                             <span className={styles.subtitle} data-cy="login-subtitle">
//                                                 Sign in to your account
//                                             </span>
//                                         </div>

//                                         {error && (
//                                             <div className={styles.errorMessage} data-cy="login-error-message" role="alert">
//                                                 {error}
//                                             </div>
//                                         )}

//                                         <form onSubmit={handleLogin} className={styles.form} data-cy="login-form">
//                                             <div className={styles.field}>
//                                                 <label htmlFor="email" className={styles.label} data-cy="login-email-label">
//                                                     Email
//                                                 </label>
//                                                 <input
//                                                     id="email"
//                                                     type="email"
//                                                     className={styles.input}
//                                                     placeholder="Enter your email"
//                                                     value={email}
//                                                     onChange={(e) => setEmail(e.target.value)}
//                                                     required
//                                                     data-cy="login-email-input"
//                                                     aria-label="Email address"
//                                                     disabled={isLoading}
//                                                 />
//                                             </div>

//                                             <div className={styles.field}>
//                                                 <label htmlFor="password" className={styles.label} data-cy="login-password-label">
//                                                     Password
//                                                 </label>
//                                                 <input
//                                                     id="password"
//                                                     type="password"
//                                                     className={styles.input}
//                                                     placeholder="Enter your password"
//                                                     value={password}
//                                                     onChange={(e) => setPassword(e.target.value)}
//                                                     required
//                                                     data-cy="login-password-input"
//                                                     aria-label="Password"
//                                                     disabled={isLoading}
//                                                 />
//                                             </div>

//                                             <button
//                                                 type="submit"
//                                                 className={`${styles.button} ${isLoading ? styles.loading : ''}`}
//                                                 data-cy="login-submit-button"
//                                                 disabled={isLoading}
//                                             >
//                                                 {isLoading ? 'Signing in...' : 'Sign in'}
//                                             </button>
//                                         </form>
//                                     </div>


//                                 </div>
//                         }


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
import { localhostStorage } from '@/services/localstorage.services';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../../store/authSlice';
import Image from 'next/image';

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
    const [data, setData] = useState<any | undefined>(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();

    const fetchExcelData = useCallback(async (folder: string) => {
        const formData = {
            folder,
            file: `${folder}.xlsx`,
        };

        try {
            const response = await fetchData(formData, 'POST', '/api/readFile');
            if (response.ok) {
                setData(response?.data);
                setIsLoaded(true);
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
                await setIsLogin(true);
                await dispatch(loginSuccess(result));
            }
        } catch (error) {
            setError((error as Error).message || "Error al iniciar sesión");
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
                                <video
                                    autoPlay
                                    muted
                                    playsInline
                                    className={styles.videoBackground}
                                >
                                    <source src={'/videos/menu.mp4'} type={'video/mp4'} />
                                    Tu navegador no soporta el tag de video.
                                </video>
                                <div className={styles.overlay} />

                                {/* Sección de la marca (título + imagen) */}
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

                                {/* Formulario de inicio de sesión */}
                                <div className={styles.authContainer} data-cy="login-container">
                                    <div className={styles.header}>
                                        <h1 className={styles.loginTitle} data-cy="login-title">Welcome back</h1>
                                        <span className={styles.subtitle} data-cy="login-subtitle">
                                            Sign in to your account
                                        </span>
                                    </div>

                                    {error && (
                                        <div className={styles.errorMessage} data-cy="login-error-message" role="alert">
                                            {error}
                                        </div>
                                    )}

                                    <form onSubmit={handleLogin} className={styles.form} data-cy="login-form">
                                        <div className={styles.field}>
                                            <label htmlFor="email" className={styles.label} data-cy="login-email-label">
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
                                                data-cy="login-email-input"
                                                aria-label="Email address"
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <div className={styles.field}>
                                            <label htmlFor="password" className={styles.label} data-cy="login-password-label">
                                                Password
                                            </label>
                                            <input
                                                id="password"
                                                type="password"
                                                className={styles.input}
                                                placeholder="Enter your password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                data-cy="login-password-input"
                                                aria-label="Password"
                                                disabled={isLoading}
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className={`${styles.button} ${isLoading ? styles.loading : ''}`}
                                            data-cy="login-submit-button"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Signing in...' : 'Sign in'}
                                        </button>
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