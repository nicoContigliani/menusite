"use client"
import React from 'react'
import styles from './Profile.module.css'
import dynamic from 'next/dynamic';

const ProfileGrid = dynamic(() => import('../ProfileGridNew/ProfileGrid'), {
    loading: () => <span>Cargando...</span>, // Opcional: mensaje de carga mientras se carga el componente
    ssr: false, // Desactivar la renderización del lado del servidor (opcional)
}); const Profile = (props: any) => {
    const {
        dataResult,
        paymentLevel,
        setSelectedProfile,
        setCurrent,
        dataMocks
    } = props



    return (
        <div className={styles.container}>
            <ProfileGrid
                dataGeneral={dataResult?.xlsxData || dataMocks}
                namecompanies={"LLakaScript"}
                paymentLevel={paymentLevel}
                setSelectedProfile={setSelectedProfile}
                setCurrent={setCurrent}
            />
        </div>
    )
}

export default Profile