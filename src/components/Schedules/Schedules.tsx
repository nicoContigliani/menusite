import React from "react";
import styles from "./Schedules.module.css";
import { FaFacebook, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe, FaWhatsapp, FaXing } from 'react-icons/fa'; // Importa los íconos

interface SchedulesProps {
    Schedules: any;
    fontSize?: string;
    fontWeight?: string;
    color?: string;
    fontFamily?: string;
    containerClassName?: string;
    textClassName?: string;
}

const Schedules: React.FC<SchedulesProps> = ({
    Schedules,
    fontSize = "14px",
    fontWeight = "400",
    color,
    fontFamily = "Arial, sans-serif",
    containerClassName = "",
    textClassName = ""
}) => {
    if (!Schedules || Schedules.length === 0) {
        return <div>No information available</div>;
    }

    return (
        <div className={`${containerClassName} ${styles.infoContainer}`} style={{ fontFamily }}>
            <div className={`${textClassName} ${styles.infoText}`} style={{ fontSize, fontWeight, color: color || 'black' }}>
                <div className={styles.title}>Horarios</div>
                {
                    Schedules.length && Schedules.map((schedule: any, index: number) => (
                        <div key={index} className={styles.scheduleItem}>
                            <div className={styles.scheduleDay}>
                                {schedule.day}
                            </div>
                            <div className={styles.scheduleHours}>
                                {schedule.servicehours}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Schedules;