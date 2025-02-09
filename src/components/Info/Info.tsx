import React from "react";
import styles from "./Info.module.css";
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaWhatsapp, FaXing, FaMotorcycle, FaRegCalendar, FaWallet, FaRobot } from 'react-icons/fa'; // Importa los íconos

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
    const data = info?.[0] || {};
    return (
        <div className={`${styles.infoContainer} ${containerClassName}`} style={{ fontFamily }}>
            <div className={`${styles.infoText} ${textClassName}`} style={{ fontSize, fontWeight, color }}>
                {data.facebook && <div><FaFacebook /> {data.facebook}</div>}
                {data.instagram && <div><FaInstagram /> {data.instagram}</div>}
                {data.mail && <div><FaEnvelope /> {data.mail}</div>}
                {data.phone && <div><FaPhone /> {data.phone}</div>}
                {data.ubication && <div><FaMapMarkerAlt /> {data.ubication}</div>}
                {data.web && <div><FaGlobe /> {data.web}</div>}
                {data.whatsapp && <div><FaWhatsapp /> {data.whatsapp}</div>}
                {data.x && <div><FaXing /> {data.x}</div>}
                {data.reservation && <div><FaRegCalendar /> {data.reservation}</div>}
                {data.delivery && <div><FaMotorcycle /> {data.delivery}</div>}
                {data.pay && <div><FaWallet /> {data.pay}</div>}
                {data.chatbot && <div><FaRobot /> {data.chatbot}</div>} {/* Suponiendo que "pay" estaba mal y era para chatbot */}

            </div>
        </div>
    );
};

export default Info;
