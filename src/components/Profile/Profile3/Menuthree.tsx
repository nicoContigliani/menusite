import React, { useState, useMemo } from 'react';
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

const Menuthree: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para el término de búsqueda

    // Use useMemo to memoize filteredSections and only recalculate when searchTerm or groupedSections change
    const filteredSections = useMemo(() => {
        if (searchTerm === '') {
            return groupedSections; // If no search term, return all sections
        }

        // Filter the sections based on the search term
        return Object.entries(groupedSections).reduce((acc, [sectionName, items]) => {
            const filteredItems = items.filter((item) =>
                item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.Price.includes(searchTerm) ||
                item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (filteredItems.length > 0) {
                acc[sectionName] = filteredItems; // Only add the section if it has matching items
            }
            return acc;
        }, {} as Record<string, MenuItem[]>);
    }, [searchTerm, groupedSections]); // Only re-run this effect if searchTerm or groupedSections change

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value); // Actualiza el término de búsqueda
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
                {/* Campo de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar en el menú..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </header>
            {Object.entries(filteredSections)?.map(([sectionName, items], sectionIndex) => (
                <section key={`${sectionName}-${sectionIndex}`} className={styles.section}>
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.carousel}>
                        {items?.map((item, itemIndex) => (
                            <div
                                key={`${item.Item_id}-${itemIndex}`} // Usando el índice para asegurar que la clave sea única
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
                                        width={100}
                                        height={100}
                                        priority // Priorizar imágenes visibles
                                    />
                                </div>
                                <div className={styles.cardContent}>
                                    <h3 className={styles.cardTitle}>{item.Name}</h3>
                                    <span className={styles.cardDescription}>{item.Description}</span>
                                    <span className={styles.cardPrice}>{`$${item.Price}`}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default Menuthree;
