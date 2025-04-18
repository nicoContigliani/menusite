import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import SelectComponent from '@/components/SelectComponent/SelectComponent';
import useSectionTimeTracker from '../../../../hooks/useSectionTimeTracker';
import { extractLastSegment } from '../../../../tools/urlService';
import Orderflow from '@/components/Orders/Orderflow';
import CatchOrder from '@/components/CatchOrder/CatchOrder';
import useOrderManager from '../../../../hooks/useOrderManager';
import useRules from '../../../../hooks/useRules';

interface MenuItem {
    Item_id: string
    Name: string
    Description: string
    Price: string | number
    Menu_Title: string
    Item_Image: string
    extra?:any,
    extras?:any
}

interface MenuProps {
    menuData: any
    groupedSections: { [key: string]: MenuItem[] }
    backgroundImages: any
    namecompanies: string
    promotions: any
    info: any
    schedules: any
    config: any[]
    paymentLevel:any
    staff:any
}

interface ConfigType {
    IconBrand: string
}

const MenuEight: React.FC<MenuProps> = (props) => {
    const { backgroundImages, config, groupedSections, info, menuData, promotions, schedules, paymentLevel,staff } = props
  
    const { orders, addOrder, editOrder, deleteOrder } = useOrderManager()
    const { hasPermission } = useRules(config, staff)


    const [namecompanies, setNamecompanies] = useState<string>('')
    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            // setFullUrl(window.location.href);
            const data = window.location.href;
            setNamecompanies(extractLastSegment(data))
        }
    }, []);

    const { sectionTimes, handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies)
    const getElementId = (sectionName: string, index: number, itemName: string) => {
        return `${sectionName}-${index}-${itemName}`;
    };


    const [searchTerm, setSearchTerm] = useState<string>(''); // State for search query

    // Debounced search term to optimize performance
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timer); // Cleanup on effect re-run
    }, [searchTerm]);

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
            <header className={styles.header}
                onMouseEnter={() => handleSectionEnter("logo")}
            >
                <h1 className={styles.mainTitle}>{namecompanies}</h1>

                {/* Add search input */}
                <div className={styles.info}
                    onMouseEnter={() => handleSectionEnter("info")}
                >
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={styles.searchInput}
                    />
                </div>
            </header>
            {
                orders.length > 0 &&
                <div className={styles.floatingButton}>
                    <Orderflow
                        orders={orders} // Lista de órdenes seleccionadas
                        editOrder={editOrder} // Función para editar una orden
                        deleteOrder={deleteOrder} // Función para eliminar una orden
                        info={info}
                    />
                </div>
            }
            <div className={styles.menuWrapper}>
                {Object.entries(groupedSections).map(([sectionName, items], sectionIndex) => {
                    const filteredSectionItems = items.filter(item =>
                        item.Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                        item.Description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                    );

                    return filteredSectionItems.length > 0 ? (
                        <div key={sectionIndex} className={styles.section}
                            onMouseEnter={() => handleSectionEnter(sectionName)}
                            onMouseLeave={() => handleSectionLeave(sectionName)}
                        >
                            <h1 className={styles.sectionTitle}>{sectionName}</h1>
                            <div className={styles.sectionItems}>
                                {filteredSectionItems.map((item, itemIndex) => (
                                    <div key={itemIndex} className={styles.menuItem}
                                        onMouseEnter={() => handleSectionEnter(getElementId(sectionName, itemIndex, item.Name))}
                                        onClick={() => handleClick(getElementId(sectionName, itemIndex, item.Name), "menuItem")}
                                    >
                                        <div className={styles.itemImage}>
                                            <Image
                                                src={`${item.Item_Image}`}
                                                alt={item.Name}
                                                width={80}
                                                height={80}
                                            />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h2>{item.Name}</h2>
                                            <span>{item.Description}</span>
                                            <br />
                                            <span className={styles.price}>{`${item.Price}`}</span>
                                        </div>
                                        <div onMouseEnter={() => handleSectionEnter(`Button-${item.Name}`)}>
                                        <CatchOrder
                                            title={item.Name}
                                            description={item.Description}
                                            price={item.Price}
                                            extra={item?.extras}
                                            urlImage={item.Item_Image}
                                            onConfirm={addOrder}
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

export default MenuEight;
