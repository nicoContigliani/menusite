import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { fetchData } from '@/services/fetch.services';
import { setChExcelData } from '../../../store/chExcelDataSlice';
import { Skeleton } from 'antd'; // Importa el Skeleton de Ant Design
import styles from './companies.module.css'
// Importación dinámica de MenuNew con una imagen de fondo mientras se carga
const MenuNew = dynamic(() => import('../../components/profileproduction/ProfileProduction'), {
    loading: () => (
        <div
        // style={{
        //     height: '20vh',
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     backgroundImage: `url('/images/flama.png')`,
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        // }}
        >
            {/* <p style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold' }}>Cargando...</p> */}
            <Skeleton active />
        </div>
    ),
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
        props: { nombre }, // Pasamos "nombre" como prop al componente
    };
}

export default function EmpresaPage({ nombre }: { nombre: string }) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [data, setExcelData] = useState<any | undefined>(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchExcelData = async (folder: string) => {
            console.log("entre", folder);
            const formData = {
                folder,
                file: `${folder}.xlsx`,
            };

            try {
                const response = await fetchData(formData, 'POST', '/api/readFile');

                if (response.ok) {
                    dispatch(setChExcelData(response));
                    setExcelData(response?.data);
                    setIsLoaded(true);
                } else {
                    dispatch(
                        setChExcelData({
                            ok: false,
                            data: null,
                            error: response.error,
                            message: response.message,
                        })
                    );
                    router.push('/notfound');
                }
            } catch (error) {
                console.error('Error en fetchExcelData:', error);
                router.push('/notfound');
            }
        };

        if (nombre && !data) {
            fetchExcelData(nombre);
        }
    }, [nombre, data, dispatch, router]);

    return (
        <div className={styles.body}> {/* Contenedor del fondo fijo */}
          <div className={styles.container}>
            {isLoaded ? <MenuNew menuItems={data} namecompanies={nombre} /> : null}
          </div>
        </div>
      );
      
}
