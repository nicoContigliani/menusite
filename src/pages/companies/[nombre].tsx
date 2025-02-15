// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import dynamic from 'next/dynamic';
// import { useDispatch } from 'react-redux';
// import { fetchData } from '@/services/fetch.services';
// import { setChExcelData } from '../../../store/chExcelDataSlice';
// import { Skeleton } from 'antd';
// import styles from './companies.module.css';
// import { localhostStorage } from '@/services/localstorage.services';

// const MenuNew = dynamic(() => import('../../components/profileproduction/ProfileProduction'), {
//     loading: () => <Skeleton active />,
//     ssr: false,
// });

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

// export default function EmpresaPage({ nombre }: { nombre: string }) {
//     const dispatch = useDispatch();
//     const router = useRouter();
//     const [data, setExcelData] = useState<any | undefined>(undefined);
//     const [isLoaded, setIsLoaded] = useState(false);
//     const [namecompanies, setNamecompanies] = useState<string>('');

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             localhostStorage({ demo: false });
//         }

//         const fetchExcelData = async (folder: string) => {
//             // console.log("📂 Fetching data for folder:", folder);
//             const formData = {
//                 folder,
//                 file: `${folder}.xlsx`,
//             };

//             try {
//                 const response = await fetchData(formData, 'POST', '/api/readFile');

//                 if (response.ok) {
//                     dispatch(setChExcelData(response));
//                     setExcelData(response?.data);
//                     setNamecompanies(folder);
//                     setIsLoaded(true);
//                 } else {
//                     console.error("❌ Error fetching data:", response.error);
//                     dispatch(setChExcelData({
//                         ok: false,
//                         data: null,
//                         error: response.error,
//                         message: response.message,
//                     }));
//                     router.push('/notfound');
//                 }
//             } catch (error) {
//                 console.error("❌ Error en fetchExcelData:", error);
//                 router.push('/notfound');
//             }
//         };

//         if (nombre && !data) {
//             fetchExcelData(nombre);
//         }
//     }, [nombre, data, dispatch, router]);

//     console.log("🚀 Renderizando EmpresaPage - Nombre:", nombre);
//     console.log("🏢 Empresa obtenida:", namecompanies);

//     return (
//         <div className={styles.body}>
//             <div className={styles.container}>
//                 {isLoaded && namecompanies ? (
//                     <MenuNew menuItems={data} namecompanies={namecompanies} />
//                 ) : (
//                     <Skeleton active />
//                 )}
//             </div>
//         </div>
//     );
// }


import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { fetchData } from '@/services/fetch.services';
import { setChExcelData } from '../../../store/chExcelDataSlice';
import { Skeleton } from 'antd';
import styles from './companies.module.css';
import { getLocalhostStorage, localhostStorage } from '@/services/localstorage.services';
import ModalComponents from '@/components/ModalComponents/ModalComponents';
import AuthB from '@/components/AuthB/AuthB';

const MenuNew = dynamic(() => import('../../components/profileproduction/ProfileProduction'), {
    loading: () => <Skeleton active />,
    ssr: false,
});

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
    const dispatch = useDispatch();
    const router = useRouter();

    const [data, setExcelData] = useState<any | undefined>(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [namecompanies, setNamecompanies] = useState<string>('');

    const [isLogin, setIsLogin] = useState(true); // Use isLogin directly
    const [fullUrl, setFullUrl] = useState("");
    const [openResponsive, setOpenResponsive] = useState(false);

    useEffect(() => {
        const storedData = getLocalhostStorage()
        console.log("🚀 ~ useEffect ~ storedData:", storedData)
        if (storedData.aud == null) {
            setOpenResponsive(true)
        }
        if (storedData?.aud != null) {
            const { aud, email, _id, access_token, expires_at, userid } = storedData

            // setIsLogin(true)

        } else {
            // setOpenResponsive(true)
        }
    }, [])
    const handleCloseModal = () => {
        setOpenResponsive(false); // Close the modal correctly
    };

    const isFetching = useRef(false);

    const fetchExcelData = useCallback(async (folder: string) => {
        if (isFetching.current) return;
        isFetching.current = true;

        const formData = {
            folder,
            file: `${folder}.xlsx`,
        };

        try {
            const response = await fetchData(formData, 'POST', '/api/readFile');

            if (response.ok) {
                dispatch(setChExcelData(response));
                setExcelData(response?.data);
                setNamecompanies(folder);
                setIsLoaded(true);
            } else {
                console.error("❌ Error fetching data:", response.error);
                dispatch(setChExcelData({
                    ok: false,
                    data: null,
                    error: response.error,
                    message: response.message,
                }));
                router.push('/notfound');
            }
        } catch (error) {
            console.error("❌ Error en fetchExcelData:", error);
            router.push('/notfound');
        } finally {
            isFetching.current = false;
        }
    }, [dispatch, router]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            localhostStorage({ demo: false });
        }

        if (nombre && !isLoaded) {
            fetchExcelData(nombre);
        }
    }, [nombre, isLoaded, fetchExcelData]);

    const memoizedMenuNew = useMemo(() => {
        return isLoaded && namecompanies ? (
            <MenuNew menuItems={data} namecompanies={namecompanies} />
        ) : (
            <Skeleton active />
        );
    }, [isLoaded, namecompanies, data]);

    return (
        <div className={styles.body}>
            <ModalComponents openResponsive={openResponsive} setOpenResponsive={setOpenResponsive} onClose={handleCloseModal}>
                <hr style={{ borderTop: '2px solid #ddd', margin: '20px 0' }} />
                <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#333' }}>
                        ¡Accede a todas las ventajas de nuestra plataforma!
                    </span>
                    <br />
                    <span style={{ fontSize: '15px', color: '#555', marginTop: '10px' }}>
                        Inicia sesión o crea tu cuenta para disfrutar de contenido exclusivo.
                    </span>
                    <br />
                    <span style={{ fontSize: '14px', color: '#285ba7', fontWeight: 'bold' }}>
                        ¡Totalmente gratis!
                    </span>
                </div>
                <hr style={{ borderTop: '2px solid #ddd', margin: '20px 0' }} />


                <AuthB
                    redirections={true}
                    setOpenResponsive={setOpenResponsive}
                    fullUrl={fullUrl}
                    setIsLogin={setIsLogin}
                />
            </ModalComponents>
            <div className={styles.container}>
                {memoizedMenuNew}
            </div>
        </div>
    );
};

export default React.memo(EmpresaPage);