import React from "react";
import Image from "next/image";
import styles from "./Logo.module.css";

interface LogoProps {
    namecompanies: string;
    logoUrl: string;
    size?: number;  // Tamaño de la imagen
    fontSize?: string; // Tamaño de la fuente
    fontWeight?: string; // Grosor de la fuente
    color?: string; // Color del texto
    fontFamily?: string; // Familia de la fuente
}

const Logo: React.FC<LogoProps> = ({
    namecompanies,
    logoUrl,
    size = 100,
    fontSize = "18px",
    fontWeight = "600",
    color = "#333",
    fontFamily = "Roboto, sans-serif"
}) => {
    return (
        <div className={styles.logoContainer}>
            <span
                className={styles.companyName}
                style={{ fontSize, fontWeight, color, fontFamily }}
            >
                {namecompanies}
            </span>
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