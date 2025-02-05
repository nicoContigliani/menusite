import React from "react";
import styles from "./staffofSystem.module.css";
import Image from "next/image";
import { Button } from "antd";

interface StaffMember {
  role: string;
  email: string;
}

interface InfoItem {
  phone: string;
  mail: string;
  web: string;
}

interface ConfigItem {
  IconBrand: string;
}

interface StaffData {
  staff: StaffMember[];
  Config: ConfigItem[];
  Info: InfoItem[];
}

interface StaffOfSystemProps {
  staffData: StaffData;
}

const StaffOfSystem: React.FC<StaffOfSystemProps> = ({ staffData }) => {
  const { staff, Config, Info } = staffData;

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Staff Of System</h1>

      <div className={styles.container}>
        {/* Icono de la marca */}
        <div className={styles.brandContainer}>
          <Image
            src={Config[0]?.IconBrand || "/placeholder.png"}
            alt="Icono de la marca"
            fill
            className={styles.brandImage}
          />
        </div>

        {/* Información */}
        <div className={styles.infoSection}>
          <h3>Info</h3>
          {Info?.map((item, index) => (
            <div key={index} className={styles.infoItem}>
              <p><strong>Phone:</strong> {item.phone}</p>
              <p><strong>Email:</strong> {item.mail}</p>
              <p><strong>Web:</strong> {item.web}</p>
            </div>
          ))}
        </div>

        {/* Personal */}
        <div className={styles.staffSection}>
          {staff?.map((item, index) => (
            <div key={index} className={styles.staffItem}>
              <h2>{item.role}</h2>
              <p>{item.email}</p>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default StaffOfSystem;
