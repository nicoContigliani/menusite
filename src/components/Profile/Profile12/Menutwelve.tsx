import React, { useEffect, useLayoutEffect, useState } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import SelectComponent from '@/components/SelectComponent/SelectComponent';
import useSectionTimeTracker from '../../../../hooks/useSectionTimeTracker';
import { extractLastSegment } from '../../../../tools/urlService';
import Orderflow from '@/components/Orders/Orderflow';
import useOrderManager from '../../../../hooks/useOrderManager';
import useRules from '../../../../hooks/useRules';
import CatchOrder from '@/components/CatchOrder/CatchOrder';

interface MenuItem {
    Item_id: string
    Name: string
    Description: string
    Price: string | number
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
    staff: any
}

interface ConfigType {
    IconBrand: string
}

const Menutwelve: React.FC<MenuProps> = (props) => {
    const { backgroundImages, config, groupedSections, info, menuData, promotions, schedules, paymentLevel, staff } = props
    const { orders, addOrder, editOrder, deleteOrder } = useOrderManager()
    const { hasPermission } = useRules(config, staff)

    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [iconURL, setIconURL] = useState<string>("")
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

    const memoizedSections = Object.entries(groupedSections)
        .map(([sectionName, items]) => {
            const filteredItems = items.filter(
                (item) =>
                    [item.Name, item.Description, item.Menu_Title].some(
                        (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
                    ) ||
                    (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
            )
            return [sectionName, filteredItems] as [string, MenuItem[]]
        })
        .filter(([, items]) => items.length > 0)
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
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>{namecompanies}</h1>
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
                {memoizedSections.map(([sectionName, items], sectionIndex) => (
                    <div key={sectionIndex} className={styles.section}
                        onMouseEnter={() => handleSectionEnter(sectionName)}
                        onMouseLeave={() => handleSectionLeave(sectionName)}
                    >
                        <h2 className={styles.sectionTitle}>{sectionName}</h2>
                        <div className={styles.sectionItems}>
                            {items.map((item, itemIndex) => (
                                <div
                                    key={`${sectionIndex}-${itemIndex}`} // Clave única combinando índice de sección y elemento
                                    className={styles.menuItem}
                                    onMouseEnter={() => handleSectionEnter(getElementId(sectionName, itemIndex, item.Name))}
                                    onClick={() => handleClick(getElementId(sectionName, itemIndex, item.Name), "menuItem")}
                                >
                                    <div className={styles.itemInfo}>
                                        <h3 className={styles.itemName}>{item.Name}</h3>
                                        <span className={styles.itemDescription}>{item.Description}</span>
                                        <span className={styles.price}>${item.Price}</span>
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

export default Menutwelve;
