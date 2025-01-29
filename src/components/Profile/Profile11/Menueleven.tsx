import React, { useState, useCallback } from 'react';
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

const Menueleven: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }, []);

    const filteredSections = Object.entries(groupedSections).filter(([sectionName, items]) => {
        return items.some(item =>
            [item.Name, item.Menu_Title, item.Description, item.Price]
                .some(field => field.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    });

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
                <input
                    type="text"
                    placeholder="Search our menu..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                    aria-label="Search menu items"
                />
            </header>

            <div className={styles.menuWrapper}>
                {filteredSections.length > 0 ? (
                    filteredSections.map(([sectionName, items], sectionIndex) => (
                        <div key={sectionIndex} className={styles.section}>
                            <h2 className={styles.sectionTitle}>{sectionName}</h2>
                            <div className={styles.sectionItems}>
                                {items.map((item, itemIndex) => (
                                    <div
                                        key={`${sectionIndex}-${itemIndex}`} // Clave única combinando índice de sección y elemento
                                        className={`${styles.menuItem} ${styles.glassEffect}`}
                                    >
                                        <div className={styles.itemInfo}>
                                            <div>
                                                <h3 className={styles.itemName}>{item.Name}</h3>
                                                {item.Description && (
                                                    <span className={styles.itemDescription}>{item.Description}</span>
                                                )}
                                            </div>
                                            <span className={styles.price}>${item.Price}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <span className={styles.noResults}>No results found for "{searchTerm}"</span>
                )}
            </div>
        </div>
    );
};

export default Menueleven;
