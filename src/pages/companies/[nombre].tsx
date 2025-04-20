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
import { useFetchMultiple } from '../../../hooks/useFetchMultiple';
import useHandleCreate from '../../../hooks/useFloating';
import MenuLayout from '@/components/MenuLayout/MenuLayout';

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

    const [isLogin2, setIsLogin2] = useState(false);

    const [fullUrl, setFullUrl] = useState("");
    const [openResponsive, setOpenResponsive] = useState(false);

    const [refreshTrigger, setRefreshTrigger] = React.useState<number>(0);
    const [datas, setData] = React.useState<any | undefined>({});

    const { results, loading, fetchMultiple } = useFetchMultiple();

    const { handleCreate } = useHandleCreate(data, setRefreshTrigger);

    React.useEffect(() => {
        fetchMultiple([{ url: "/api/trackTime" }]);
    }, [fetchMultiple, refreshTrigger]);

    React.useEffect(() => {
        const companiesData = results?.apicompaniesdashboard?.data || [];
        const trackTimeData: any = results?.apitrackTime?.data || [];
        const uniqueCompaniesData: any | any[] = [...new Set(trackTimeData.map((item: any) => item.namecompanie))];


        if (trackTimeData.length >= 2000) {
            handleCreate();
            //create data of floating // when and how many
        }

        setData({
            companies: companiesData,
            trakestime: trackTimeData,
            uniqueCompanies: uniqueCompaniesData,
        });
    }, [results, refreshTrigger]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'your-storage-key') {
                const storedData = getLocalhostStorage();
                if (storedData.aud == null) {
                    setOpenResponsive(true);
                }
                if (storedData?.aud != null) {
                    setIsLogin2(true);
                    const { aud, email, _id, access_token, expires_at, userid } = storedData;
                    // setIsLogin(true)
                } else {
                    // setOpenResponsive(true)
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        const storedData = getLocalhostStorage();
        if (storedData.aud == null) {
            setOpenResponsive(true);
        }
        if (storedData?.aud != null) {
            setIsLogin2(true);
            const { aud, email, _id, access_token, expires_at, userid } = storedData;
            // setIsLogin(true)
        } else {
            // setOpenResponsive(true)
        }
    }, []);

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
            <div>
                < MenuLayout>
                    <MenuNew menuItems={data} namecompanies={namecompanies} />
                </MenuLayout>
            </div>
        ) : (
            <Skeleton active />
        );
    }, [isLoaded, namecompanies, data]);

    return (
        <div
            className={styles.body}
            data-cy="empresa-page">
            <ModalComponents
                openResponsive={openResponsive}
                setOpenResponsive={setOpenResponsive}
                onClose={handleCloseModal}
                data-cy="login-modal" // Añadido para Cypress
            >
                <hr style={{ borderTop: '2px solid #ddd', margin: '20px 0' }} />
                <div style={{ textAlign: 'center' }} data-cy="modal-content">
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
                    data-cy="auth-form" // Añadido para Cypress
                />
            </ModalComponents>

            <div
                className={styles.container}
                data-cy="menu-container">
                {memoizedMenuNew}
            </div>
        </div>
    );
};

export default React.memo(EmpresaPage);