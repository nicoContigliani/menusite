import React from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';

interface MenuItem {
    Menu_Title: string;
    Profile_Type: string;
    Primary_Color: string;
    Secondary_color: string;
    Background_Image: string;
    Item_Image: string;
    Section: string;
    Item_id: number;
    Name: string;
    Description: string;
    Price: string;
}

interface MenuProps {
    namecompanies: string;
    groupedSections: Record<string, MenuItem[]>;
    menuData: any;
    backgroundImages?: string;
}

const Menutwelve: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
                backgroundSize: 'cover', // Correcta propiedad en camelCase
                backgroundPosition: 'center', // Correcta propiedad en camelCase
                backgroundAttachment: 'fixed', // Correcta propiedad en camelCase
            }}
        >
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>{namecompanies}</h1>
            </header>

            <div className={styles.menuWrapper}>
                {Object.entries(groupedSections).map(([sectionName, items], sectionIndex) => (
                    <div key={sectionIndex} className={styles.section}>
                        <h2 className={styles.sectionTitle}>{sectionName}</h2>
                        <div className={styles.sectionItems}>
                            {items.map((item, itemIndex) => (
                                <div
                                    key={`${sectionIndex}-${itemIndex}`} // Clave única combinando índice de sección y elemento
                                    className={styles.menuItem}
                                >
                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.itemName}>{item.Name}</h3>
                                        <span className={styles.itemDescription}>{item.Description}</span>
                                        <span className={styles.price}>${item.Price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

     
        </div>
    );
};

export default Menutwelve;
