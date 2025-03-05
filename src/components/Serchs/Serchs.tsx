// import React from "react";
// import styles from "./Serchs.module.css";
// import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaWhatsapp, FaXing, FaMotorcycle, FaRegCalendar, FaWallet, FaRobot } from 'react-icons/fa'; // Import icons
// import { Button } from "antd";
// import { set } from "mongoose";

// interface InfoProps {
//     info: any;
//     fontSize?: string;
//     fontWeight?: string;
//     color?: string;
//     fontFamily?: string;
//     containerClassName?: string;
//     textClassName?: string;
//     setSearchTerm: (searchTerm: any) => void;
// }


// const Searchs: React.FC<InfoProps> = ({
//     info,
//     fontSize = "16px",
//     fontWeight = "400",
//     color = "white",
//     fontFamily = "Arial, sans-serif",
//     containerClassName = "",
//     textClassName = "",
//     setSearchTerm
// }) => {
//     if (!info || info.length === 0) {
//         return <div>No information available</div>;
//     }

//     return (

//         <div className={`${styles.infoContainer} ${containerClassName}`} style={{ fontFamily }}>
//             <div className={`${styles.infoText} ${textClassName}`} style={{ fontSize, fontWeight, color }}>
//                 {info?.map((item: any, index: number) => (
//                     <div key={index} className={styles.itemWrapper}>
//                         <Button
//                             block
//                             style={{
//                                 color: `${color}`,
//                                 backgroundColor: 'transparent',
//                                 borderRadius: '5px',
//                                 margin: '10px 0',
//                                 border: `1px solid ${color}`
//                             }}
//                             onClick={() => setSearchTerm(item)}

//                         >
//                             {item}
//                         </Button>
//                     </div>
//                 ))}
//                 <div className={styles.itemWrapper}>
//                     <Button
//                         block
//                         style={{
//                             color: `${color}`,
//                             backgroundColor: 'transparent',
//                             borderRadius: '5px',
//                             margin: '10px 0',
//                             border: `1px solid ${color}`
//                         }}
//                         onClick={() => setSearchTerm("")}

//                     >
//                         Todos
//                     </Button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Searchs;


import React from "react";
import styles from "./Serchs.module.css";
import { Button } from "antd";

interface InfoProps {
    info: any[]; // Asegúrate de que `info` sea un array de objetos
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    fontFamily?: string;
    containerClassName?: string;
    textClassName?: string;
    setSearchTerm: (searchTerm: string) => void; // Asegúrate de que `setSearchTerm` reciba un string
}

const Searchs: React.FC<InfoProps> = ({
    info,
    fontSize = "16px",
    fontWeight = "400",
    color = "white",
    fontFamily = "Arial, sans-serif",
    containerClassName = "",
    textClassName = "",
    setSearchTerm,
}) => {
    if (!info || info.length === 0) {
        return <div>No information available</div>;
    }

    return (
        <div className={`${styles.infoContainer} ${containerClassName}`} style={{ fontFamily }}>
            <div className={`${styles.infoText} ${textClassName}`} style={{ fontSize, fontWeight, color }}>
                {info.map((item, index) => (
                    <div key={index} className={styles.itemWrapper}>
                        <Button
                            block
                            style={{
                                color: `${color}`,
                                backgroundColor: 'transparent',
                                borderRadius: '5px',
                                margin: '10px 0',
                                border: `1px solid ${color}`,
                            }}
                            onClick={() => setSearchTerm(item.Name || item.label || item)} // Pasar el valor correcto
                        >
                            {item.Name || item.label || item} {/* Mostrar el valor correcto */}
                        </Button>
                    </div>
                ))}
                <div className={styles.itemWrapper}>
                    <Button
                        block
                        style={{
                            color: `${color}`,
                            backgroundColor: 'transparent',
                            borderRadius: '5px',
                            margin: '10px 0',
                            border: `1px solid ${color}`,
                        }}
                        onClick={() => setSearchTerm("")} // Restablecer la búsqueda
                    >
                        Todos
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Searchs;