import React from "react";
import Image from "next/image";
import styles from "./Logo.module.css";

interface LogoProps {
    namecompanies: string;
    logoUrl: string;
    size?: number;
}

const Logo: React.FC<LogoProps> = ({ namecompanies, logoUrl, size = 50 }) => {
    return (
        <div className={styles.logoContainer}>
            <span className={styles.companyName}>{namecompanies}</span>
            <Image
                src={logoUrl}
                alt={`Logo de ${namecompanies}`}
                title={namecompanies}
                width={size}
                height={size}
                className={styles.logo}
                priority
            />
        </div>
    );
};

export default Logo;
