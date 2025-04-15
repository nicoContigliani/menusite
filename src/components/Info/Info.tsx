// import React from "react";
// import styles from "./Info.module.css";
// import { 
//     FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, 
//     FaGlobe, FaWhatsapp, FaXing, FaMotorcycle, FaRegCalendar, 
//     FaWallet, FaRobot 
// } from 'react-icons/fa';

// interface InfoProps {
//     info: any;
//     fontSize?: string;
//     fontWeight?: string;
//     color?: string;
//     fontFamily?: string;
//     containerClassName?: string;
//     textClassName?: string;
// }

// const Info: React.FC<InfoProps> = ({
//     info,
//     fontSize = "16px",
//     fontWeight = "400",
//     color = "#333",
//     fontFamily = "Arial, sans-serif",
//     containerClassName = "",
//     textClassName = ""
// }) => {
//     if (!info || info.length === 0) {
//         return <div className={styles.noInfo}>No information available</div>;
//     }
    
//     const data = info?.[0] || {};

//     return (
//         <div className={`${styles.infoContainer} ${containerClassName}`} style={{ fontFamily }}>
//             <div className={`${styles.infoText} ${textClassName}`} style={{ fontSize, fontWeight, color }}>
//                 {data.facebook && <div className={styles.infoItem}><FaFacebook /> {data.facebook}</div>}
//                 {data.instagram && <div className={styles.infoItem}><FaInstagram /> {data.instagram}</div>}
//                 {data.mail && <div className={styles.infoItem}><FaEnvelope /> {data.mail}</div>}
//                 {data.phone && <div className={styles.infoItem}><FaPhone /> {data.phone}</div>}
//                 {data.ubication && <div className={styles.infoItem}><FaMapMarkerAlt /> {data.ubication}</div>}
//                 {data.web && <div className={styles.infoItem}><FaGlobe /> {data.web}</div>}
//                 {data.whatsapp && <div className={styles.infoItem}><FaWhatsapp /> {data.whatsapp}</div>}
//                 {data.x && <div className={styles.infoItem}><FaXing /> {data.x}</div>}
//                 {data.reservation && <div className={styles.infoItem}><FaRegCalendar /> {data.reservation}</div>}
//                 {data.delivery && <div className={styles.infoItem}><FaMotorcycle /> {data.delivery}</div>}
//                 {data.pay && <div className={styles.infoItem}><FaWallet /> {data.pay}</div>}
//                 {data.chatbot && <div className={styles.infoItem}><FaRobot /> {data.chatbot}</div>}
//             </div>
//         </div>
//     );
// };

// export default Info;




import React from "react";
import styles from "./Info.module.css";
import { 
    FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, 
    FaGlobe, FaWhatsapp, FaXing, FaMotorcycle, FaRegCalendar, 
    FaWallet, FaRobot 
} from 'react-icons/fa';

interface InfoItem {
    facebook?: string;
    instagram?: string;
    mail?: string;
    phone?: string;
    ubication?: string;
    web?: string;
    whatsapp?: string;
    x?: string;
    reservation?: string;
    delivery?: string;
    pay?: string;
    chatbot?: string;
}

interface InfoProps {
    info: InfoItem[];
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    fontFamily?: string;
    containerClassName?: string;
    textClassName?: string;
}

const iconComponents = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    mail: FaEnvelope,
    phone: FaPhone,
    ubication: FaMapMarkerAlt,
    web: FaGlobe,
    whatsapp: FaWhatsapp,
    x: FaXing,
    reservation: FaRegCalendar,
    delivery: FaMotorcycle,
    pay: FaWallet,
    chatbot: FaRobot
};

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
        return <div className={styles.noInfo}>No information available</div>;
    }
    
    const data = info[0];

    return (
        <div className={`${styles.infoContainer} ${containerClassName}`} style={{ fontFamily }}>
            <div className={`${styles.infoText} ${textClassName}`} style={{ fontSize, fontWeight, color }}>
                {Object.entries(data).map(([key, value]) => {
                    const IconComponent = iconComponents[key as keyof typeof iconComponents];
                    if (value && IconComponent) {
                        return (
                            <div key={key} className={styles.infoItem}>
                                <IconComponent /> {value}
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default Info;