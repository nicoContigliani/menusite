import React, { useMemo, useState } from 'react';
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
    backgroundImages: string | null;
}

const Menutwo: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const memoizedSections = useMemo(() => {
        return Object.entries(groupedSections);
    }, [groupedSections]);

    // Filter items based on search term
    const filteredItems = useMemo(() => {
        if (!searchTerm) return groupedSections;
        return Object.entries(groupedSections).reduce((acc, [section, items]) => {
            const filteredItems = items.filter(item =>
                item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Price.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filteredItems.length > 0) {
                acc[section] = filteredItems;
            }
            return acc;
        }, {} as Record<string, MenuItem[]>);
    }, [searchTerm, groupedSections]);

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <header className={styles.header}>
                <h1>{namecompanies}</h1>
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Search items..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>
            {Object.entries(filteredItems).map(([sectionName, items], sectionIndex) => (
                <section key={`${sectionName}-${sectionIndex}`} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.itemGrid}>
                        {items.map((item, itemIndex) => (
                            <div
                                key={`${item.Item_id}-${itemIndex}`} // Usando el índice para asegurar que la clave sea única
                                className={styles.card}
                                style={{ borderColor: item.Primary_Color }}
                            >
                                <div
                                    className={styles.cardBackground}
                                    style={{
                                        backgroundImage: `url(${item.Background_Image})`,
                                    }}
                                ></div>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardImage}>
                                        <Image
                                            src={`${item.Item_Image}`}
                                            alt={item.Name}
                                            width={100}
                                            height={100}
                                            priority // Priorizar imágenes visibles
                                        />
                                    </div>
                                    <div className={styles.cardDetails}>
                                        <h3 className={styles.cardTitle}>{item.Name}</h3>
                                        <span className={styles.cardDescription}>{item.Description}</span>
                                        <span className={styles.cardPrice}>{`$${item.Price}`}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Menutwo;
