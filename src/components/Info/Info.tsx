import React from "react";
import styles from "./Info.module.css";

interface InfoProps {
    info: any;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    fontFamily?: string;
    containerClassName?: string;
    textClassName?: string;
}

const Info: React.FC<InfoProps> = ({
    info,
    fontSize = "16px",
    fontWeight = "400",
    color = "#333",
    fontFamily = "Arial, sans-serif",
    containerClassName = "",
    textClassName = ""
}) => {
    if (!info || info.length === 0) {
        return <div>No information available</div>;  // O cualquier contenido alternativo
    }

    return (
        <div className={`${styles.infoContainer} ${containerClassName}`} style={{ fontFamily }}>
            <div className={`${styles.infoText} ${textClassName}`} style={{ fontSize, fontWeight, color }}>
                <div>facebook: {info[0]?.facebook}</div>
                <div>instagram: {info[0]?.instagram}</div>
                <div>mail: {info[0]?.mail}</div>
                <div>phone: {info[0]?.phone}</div>
                <div>ubication: {info[0]?.ubication}</div>
                <div>web: {info[0]?.web}</div>
                <div>whatsapp: {info[0]?.whatsapp}</div>
                <div>x: {info[0]?.x}</div>
            </div>
        </div>
    );
};

export default Info;
