import React, { useState, useEffect } from 'react';
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
    backgroundImages: any;
}

const MenuNine: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');

    // Debounced search term to optimize performance
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timer); // Cleanup on effect re-run
    }, [searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleChange = (value: { inputValue: string; clarification: string }) => {
        console.log("Order Info:", value);
    };
    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>{namecompanies}</h1>
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className={styles.searchInput}
                />
            </header>
            <div className={styles.menuWrapper}>
                {Object.entries(groupedSections).map(([sectionName, items], sectionIndex) => {
                    // Filter items based on search term
                    const filteredSectionItems = items.filter(item =>
                        item.Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                        item.Menu_Title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                        item.Description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                        item.Price.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                    );

                    return filteredSectionItems.length > 0 ? (
                        <div key={sectionIndex} className={styles.section}>
                            <h1 className={styles.sectionTitle}>{sectionName}</h1>
                            <div className={styles.sectionItems}>
                                {filteredSectionItems.map((item: MenuItem, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className={styles.menuItem}

                                    >
                                        <div className={styles.itemImage}>
                                            <Image
                                                src={`${item.Item_Image}`}
                                                alt={item.Name}
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h2>{item.Name}</h2>
                                            <span>{item.Description}</span>
                                            <span className={styles.price}>{`$${item.Price}`}</span>
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
                                                color="white"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default MenuNine;
