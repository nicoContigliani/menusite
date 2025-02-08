"use client";
import React from "react";
import styles from "./Profile.module.css";
import dynamic from "next/dynamic";

const ProfileGrid = dynamic(() => import("../ProfileGridNew/ProfileGrid"), {
  loading: () => <span>Cargando...</span>,
  ssr: false,
});

const Profile = (props: any) => {
  const {
    folderName,
    dataResult,
    paymentLevel,
    setSelectedProfile,
    setCurrent,
    dataMocks
  } = props;
  console.log("🚀 ~ ProfileGrid ~ dataResult:", dataResult);

  return (
    <div className={styles.body}> {/* Fondo fijo */}
      <div className={styles.container}>
        {dataResult && (
          <ProfileGrid
            dataGeneral={dataResult || dataMocks}
            namecompanies={folderName || "LLakaScript"}
            paymentLevel={paymentLevel}
            setSelectedProfile={setSelectedProfile}
            setCurrent={setCurrent}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;