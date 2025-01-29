import React, { useState, useCallback } from 'react';
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

const Menuten: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

    // UseEffect for debounce behavior
    const debounceSearch = useCallback(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    React.useEffect(() => {
        debounceSearch();
    }, [debounceSearch]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Filter sections only if necessary and return early if there's no search term
    const filteredSections = Object.entries(groupedSections).filter(([sectionName, items]) => {
        return items.some(item =>
            [item.Name, item.Menu_Title, item.Description, item.Price]
                .some(field => field.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        );
    });

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
                <input
                    type="text"
                    placeholder="Search menu..."
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
                                        className={styles.menuItem}
                                    >
                                        <div className={styles.itemImage}>
                                            <Image
                                                src={`${item.Item_Image}`}
                                                alt={item.Name}
                                                width={50}
                                                height={50}
                                                className={styles.image}
                                            />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h3 className={styles.itemName}>{item.Name}</h3>
                                            <span className={styles.itemDescription}>{item.Description}</span>
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

export default Menuten;
