import React from "react";
import styles from "./Info.module.css";
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaWhatsapp, FaXing } from 'react-icons/fa'; // Importa los íconos

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
        return <div>No information available</div>;
    }

    return (
        <div className={`${styles.infoContainer} ${containerClassName}`} style={{ fontFamily }}>
            <div className={`${styles.infoText} ${textClassName}`} style={{ fontSize, fontWeight, color }}>
                <div><FaFacebook />  {info[0]?.facebook}</div>
                <div><FaInstagram /> {info[0]?.instagram}</div>
                <div><FaEnvelope /> {info[0]?.mail}</div>
                <div><FaPhone />  {info[0]?.phone}</div>
                <div><FaMapMarkerAlt />  {info[0]?.ubication}</div>
                <div><FaGlobe />  {info[0]?.web}</div>
                <div><FaWhatsapp />  {info[0]?.whatsapp}</div>
                <div><FaXing /> {info[0]?.x}</div>
            </div>
        </div>
    );
};

export default Info;
