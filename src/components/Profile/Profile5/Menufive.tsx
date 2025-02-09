import React, { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import SelectComponent from '@/components/SelectComponent/SelectComponent';

interface MenuItem {
    Menu_Title: string;
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

const Menufive: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Search change handler
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }, []);

    const handleChange = (value: { inputValue: string; clarification: string }) => {
        console.log("Order Info:", value);
    };

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <header className={styles.header}>
                <h1>{namecompanies}</h1>
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Buscar artículo..."
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={handleSearchChange} // Using the memoized callback
                />
            </header>

            {Object.entries(groupedSections).map(([sectionName, items], index) => (
                <section key={index} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.masonryGrid}>
                        {items.filter((item) =>
                            item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.Price.toLowerCase().includes(searchTerm.toLowerCase())
                        ).length > 0 ? (
                            items.filter((item) =>
                                item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.Price.toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className={styles.card}

                                >
                                    <div className={styles.cardImage}>
                                        <Image
                                            src={`${item.Item_Image}`}
                                            alt={item.Name}
                                            width={400}
                                            height={400}
                                            priority
                                        />
                                    </div>
                                    <div className={styles.cardContent}>
                                        <h3 className={styles.cardTitle}>{item.Name}</h3>
                                        <span className={styles.cardDescription}>{item.Description}</span>
                                        <span className={styles.cardPrice}>{`$${item.Price}`}</span>
                                    </div>
                                    <div > {/* Esta es la clase CSS del padre */}
                                        <SelectComponent
                                            orderdescription={[]}
                                            delivery={true}
                                            takeaway={false}
                                            Dinein={false}
                                            onChange={handleChange}
                                            value="someValue"
                                            className="no"
                                            color="black"
                                        />
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

export default Menufive;
