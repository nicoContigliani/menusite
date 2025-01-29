import React, { useEffect, useState } from 'react';
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
    backgroundImages: string;
}

const MenuItemCard: React.FC<{ item: MenuItem; namecompanies: string }> = ({ item, namecompanies }) => (
    <div className={styles.menuItem}>
        <h1 className={styles?.companyName}>{namecompanies}</h1>
        <hr />

        <div className={styles.itemImage}>
            <Image
                src={`${item.Item_Image}`}
                alt={item.Name}
                width={150}
                height={150}
                layout="fixed"
                objectFit="cover"
                className={styles.image}
            />
        </div>
        <div className={styles.itemInfo}>
            <h3 className={styles.itemName}>{item.Name}</h3>
            <span className={styles.itemDescription}>{item.Description}</span>
            <span className={styles.itemPrice}>${item.Price}</span>
        </div>
    </div>
);

const Ecomerceone: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;
    const [allItems, setAllItems] = useState<MenuItem[]>([]);
    const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);

    // Flatten groupedSections and update allItems
    useEffect(() => {
        setAllItems(Object.values(groupedSections).flat());
    }, [groupedSections]);

    // Filter items based on search query (case-insensitive)
    useEffect(() => {
        if (!searchQuery) {
            setFilteredItems(allItems);
        } else {
            const query = searchQuery.toLowerCase();
            setFilteredItems(
                allItems.filter(
                    (item) =>
                        item.Menu_Title.toLowerCase().includes(query) ||
                        item.Description.toLowerCase().includes(query)
                )
            );
        }
    }, [searchQuery, allItems]);

    // Paginate filtered items
    const paginatedItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    // Handle page change
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div
            className={styles.menuWrapper}
            style={{
                backgroundImage: backgroundImages || 'none',
            }}
        >
            <h1 className={styles.companyNameTitle}>{namecompanies}</h1>

            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className={styles.sections}>
                {paginatedItems.map((item, index) => (
                    <MenuItemCard key={index} item={item} namecompanies={namecompanies} />
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? styles.activePage : ''}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Ecomerceone;
