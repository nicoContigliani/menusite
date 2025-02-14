import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { fetchData } from '@/services/fetch.services';
import { setChExcelData } from '../../../store/chExcelDataSlice';
import { Skeleton } from 'antd';
import styles from './companies.module.css';
import { localhostStorage } from '@/services/localstorage.services';

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

export default function EmpresaPage({ nombre }: { nombre: string }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [data, setExcelData] = useState<any | undefined>(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const [namecompanies, setNamecompanies] = useState<string>('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            localhostStorage({ demo: false });
        }

        const fetchExcelData = async (folder: string) => {
            // console.log("📂 Fetching data for folder:", folder);
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
            }
        };

        if (nombre && !data) {
            fetchExcelData(nombre);
        }
    }, [nombre, data, dispatch, router]);

    console.log("🚀 Renderizando EmpresaPage - Nombre:", nombre);
    console.log("🏢 Empresa obtenida:", namecompanies);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                {isLoaded && namecompanies ? (
                    <MenuNew menuItems={data} namecompanies={namecompanies} />
                ) : (
                    <Skeleton active />
                )}
            </div>
        </div>
    );
}
