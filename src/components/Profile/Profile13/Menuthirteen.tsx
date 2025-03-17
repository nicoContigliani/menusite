import React, { useState, useMemo, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import SelectComponent from '@/components/SelectComponent/SelectComponent';
import useSectionTimeTracker from '../../../../hooks/useSectionTimeTracker';
import Logo from '@/components/Logo/Logo';
import { extractLastSegment } from '../../../../tools/urlService';
import useOrderManager from '../../../../hooks/useOrderManager';
import useRules from '../../../../hooks/useRules';
import CatchOrder from '@/components/CatchOrder/CatchOrder';
import Orderflow from '@/components/Orders/Orderflow';

interface MenuItem {
    Item_id: string
    Name: string
    Description: string
    Price: string | number | any
    Menu_Title: string
    Item_Image: string
    extra?: any,
    extras?: any
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
    paymentLevel: any
    staff: any;

}

interface ConfigType {
    IconBrand: string
}
const Menuthirteen: React.FC<MenuProps> = (props) => {
    const { backgroundImages, config, groupedSections, info, menuData, promotions, schedules, paymentLevel = 0, staff } = props
    const { orders, addOrder, editOrder, deleteOrder } = useOrderManager()
    const { hasPermission } = useRules(config, staff)

    const [searchTerm, setSearchTerm] = useState<string>('');
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


    const [loading, setLoading] = useState(true)
    const [iconURL, setIconURL] = useState<string>("")

    useEffect(() => {
        if (groupedSections) {
            const firstSection: any = Object.values(groupedSections)[0]
            if (firstSection && firstSection.length > 0) {
                // You can do something with `firstSection` if needed
            }
        }

        if (config && config.length > 0) {
            const configData = config[0] as ConfigType
            setIconURL(configData.IconBrand || "")
        }

        setLoading(false)
    }, [groupedSections, config])


    // Debounce to optimize search handling
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredItems = useMemo(() => {
        const searchLower: any = searchTerm.toLowerCase();
        return (items: MenuItem[]) => {
            return items.filter(item =>
                item.Name.toLowerCase().includes(searchLower) ||
                item.Menu_Title.toLowerCase().includes(searchLower) ||
                item.Description.toLowerCase().includes(searchLower) ||
                item.Price.toLowerCase().includes(searchLower)
            );
        };
    }, [searchTerm]);

    const handleChange = (value: { inputValue: string; clarification: string }) => {
        console.log("Order Info:", value);
    };

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
            <div className={styles.menuWrapper}>
                <header className={styles.header}>
                    <h1 className={styles.mainTitle}>{namecompanies}</h1>

                    <div className={styles.logo}
                        onMouseEnter={() => handleSectionEnter("logo")}
                    >
                        {iconURL ?
                            <Logo
                                namecompanies="LlakaScript"
                                logoUrl={iconURL}
                                size={120} // Tamaño de la imagen
                                fontSize="22px" // Tamaño de la fuente
                                fontWeight="700" // Grosor de la fuente
                                color="black" // Color del texto
                                fontFamily="Arial, sans-serif" // Familia de la fuente
                            />
                            : null}
                    </div>
                    <div className={styles.searchContainer}
                        onMouseEnter={() => handleSectionEnter("search")}
                    >
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearchChange}
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
                {Object.entries(groupedSections)?.map(([sectionName, items], sectionIndex) => (
                    <div key={sectionIndex} className={styles.section}
                        onMouseEnter={() => handleSectionEnter(sectionName)}
                        onMouseLeave={() => handleSectionLeave(sectionName)}
                    >
                        <h1 className={styles.sectionTitle}>{sectionName}</h1>
                        <div className={styles.sectionItems}>
                            {filteredItems(items)?.map((item, itemIndex) => (
                                <div
                                    key={`${sectionIndex}-${itemIndex}`} // Clave única combinando índice de sección y elemento
                                    className={styles.menuItem}
                                    onMouseEnter={() => handleSectionEnter(getElementId(sectionName, itemIndex, item.Name))}
                                    onClick={() => handleClick(getElementId(sectionName, itemIndex, item.Name), "menuItem")}
                                >
                                    <div className={styles.itemImage}>
                                        <Image
                                            src={`${item.Item_Image}`}
                                            alt={item.Name}
                                            width={120}
                                            height={120}
                                            loading="lazy" // Lazy load images for better performance
                                        />
                                    </div>
                                    <div className={styles.itemInfo}>
                                        <h2>{item.Name}</h2>
                                        <span>{item.Description}</span>
                                        <span className={styles.price}>{`$${item.Price}`}</span>
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
                ))}
            </div>
        </div>
    );
};

export default Menuthirteen;
