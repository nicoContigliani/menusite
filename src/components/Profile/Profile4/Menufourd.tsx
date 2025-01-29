import React, { useState, useMemo, useCallback } from 'react';
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

const Menufourd: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Memoize filteredSections to only re-calculate when searchTerm or groupedSections change
    const filteredSections = useMemo(() => {
        return Object.entries(groupedSections).map(([sectionName, items]) => {
            // Filter the items by search term
            const filteredItems = items.filter((item) =>
                item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Price.toLowerCase().includes(searchTerm.toLowerCase())
            );
            return [sectionName, filteredItems] as [string, MenuItem[]];
        });
    }, [searchTerm, groupedSections]); // Only re-run when searchTerm or groupedSections change

    // Use callback to memoize the setSearchTerm handler and avoid re-creating it on each render
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []); // Empty dependency array, as this function doesn't depend on any external state

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <header className={styles.header}>
                <h1>{namecompanies}</h1>
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Buscar artículo..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={handleSearchChange} // Using the memoized callback
                />
            </header>

            {filteredSections.map(([sectionName, items], sectionIndex) => (
                <section key={`${sectionName}-${sectionIndex}`} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.grid}>
                        {items.length > 0 ? (
                            items.map((item, itemIndex) => (
                                <div
                                    key={`${item.Item_id}-${itemIndex}`} // Using the index for unique keys
                                    className={styles.card}
                                    style={{
                                        borderColor: item.Primary_Color,
                                        background: `linear-gradient(145deg, ${item.Primary_Color}, ${item.Secondary_color})`,
                                    }}
                                >
                                    <div className={styles.cardImage}>
                                        <Image
                                            src={`${item.Item_Image}`}
                                            alt={item.Name}
                                            width={200}
                                            height={200}
                                            priority
                                        />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{item.Name}</h3>
                                        <span className={styles.cardDescription}>{item.Description}</span>
                                        <span className={styles.cardPrice}>{`$${item.Price}`}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span>No se encontraron artículos</span>
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Menufourd;
