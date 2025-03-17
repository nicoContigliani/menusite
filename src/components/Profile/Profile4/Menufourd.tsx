import React, { useState, useMemo, useCallback, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import Info from '@/components/Info/Info';
import Logo from '@/components/Logo/Logo';
import useSectionTimeTracker from '../../../../hooks/useSectionTimeTracker';
import Schedules from '@/components/Schedules/Schedules';
import SelectComponent from '@/components/SelectComponent/SelectComponent';
import { extractLastSegment } from '../../../../tools/urlService';
import useOrderManager from '../../../../hooks/useOrderManager';
import useRules from '../../../../hooks/useRules';
import CatchOrder from '@/components/CatchOrder/CatchOrder';
import Orderflow from '@/components/Orders/Orderflow';

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
    groupedSectionpromotions: { [key: string]: MenuItem[] }
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

const Menufourd: React.FC<MenuProps> = (props) => {
    const { backgroundImages, config, groupedSections, groupedSectionpromotions, info, menuData, promotions, schedules, paymentLevel = 0, staff } = props

    const [namecompanies, setNamecompanies] = useState<string>('')
    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            // setFullUrl(window.location.href);
            const data = window.location.href;
            setNamecompanies(extractLastSegment(data))
        }
    }, []);
    const { sectionTimes, handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies)

    const { orders, addOrder, editOrder, deleteOrder } = useOrderManager()
    const { hasPermission } = useRules(config, staff)


    const [searchTerm, setSearchTerm] = useState("")
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

    if (loading) {
        return <div>Loading...</div>
    }


    const memoizedSectionsPromotions = (groupedSectionpromotions ? Object.entries(groupedSectionpromotions) : [])
        .map(([sectionName, items]) => {
            const filteredItems = items.filter(
                (item: any) =>
                    // Check if any of the fields match the search term (case-insensitive)
                    [item.Name, item.Description, item.Menu_Title, item.Section].some(
                        (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
                    ) ||
                    // Additional check for Price field if it's a string
                    (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
            )
            return [sectionName, filteredItems] as [string, MenuItem[]]
        })
        .filter(([, items]) => items.length > 0)




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

    const getElementId = (sectionName: string, index: number, itemName: string) => {
        return `${sectionName}-${index}-${itemName}`;
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

                <div className={styles.info}
                    onMouseEnter={() => handleSectionEnter("info")}
                >
                    {info ?
                        <Info
                            info={info}
                            fontSize="14px"
                            fontWeight="500"
                            color="#dddddd"
                            fontFamily="Helvetica, sans-serif"
                            containerClassName={styles.customInfoContainer}
                            textClassName={styles.customInfoText}
                        />
                        : null}
                </div>

                <div className={styles.searchContainer}
                    onMouseEnter={() => handleSectionEnter("search")}
                >
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Buscar en el menú..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <main className={styles.main}>
                {
                    memoizedSectionsPromotions.length > 0 &&
                    <div className={styles.sectionTitle}>
                        <h5 className={styles.titleStructure}>Promoción</h5>
                    </div>
                }
                {memoizedSectionsPromotions?.map(([sectionName, items]) => (
                    <div key={sectionName} className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionTitle}
                                onMouseEnter={() => handleSectionEnter(sectionName)}
                                onMouseLeave={() => handleSectionLeave(sectionName)}
                            >
                                {sectionName}
                            </div>
                        </div>
                        <div className={styles.sectionItems}>
                            {items?.map((item: MenuItem, index: number) => (
                                <div key={`${sectionName}-${item?.Item_id}-${index}`} className={styles.menuItem}>
                                    <div className={styles.itemInfo}
                                        onMouseEnter={() => handleSectionEnter(getElementId(sectionName, index, item.Name))}
                                        onClick={() => handleClick(getElementId(sectionName, index, item.Name), "menuItem")}
                                    >
                                        <div className={styles.cardImage}>
                                            <Image
                                                src={`${item.Item_Image}`}
                                                alt={item.Name}
                                                width={100}
                                                height={100}
                                                priority
                                            />
                                        </div>
                                        <div className={styles.itemDetails}>
                                            <h2>{item?.Name}</h2>
                                            <div className={styles.itemDescription}>{item?.Description}</div>
                                            <div className={styles.price}>{`$${item.Price}`}</div>
                                        </div>
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
            </main>

            <main className={styles.main}>
                {
                    memoizedSections.length > 0 &&
                    <div className={styles.sectionTitle}>
                        <h5 className={styles.titleStructure}>Menú</h5>
                    </div>
                }
                {memoizedSections?.map(([sectionName, items]) => (
                    <div key={sectionName} className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionTitle}
                                onMouseEnter={() => handleSectionEnter(sectionName)}
                                onMouseLeave={() => handleSectionLeave(sectionName)}
                            >
                                {sectionName}
                            </div>
                        </div>
                        <div className={styles.sectionItems}>
                            {items?.map((item: MenuItem, index: number) => (
                                <div key={`${sectionName}-${item?.Item_id}-${index}`} className={styles.menuItem}>
                                    <div className={styles.itemInfo}
                                        onMouseEnter={() => handleSectionEnter(getElementId(sectionName, index, item.Name))}
                                        onClick={() => handleClick(getElementId(sectionName, index, item.Name), "menuItem")}
                                    >
                                        <div className={styles.cardImage}>
                                            <Image
                                                src={`${item.Item_Image}`}
                                                alt={item.Name}
                                                width={100}
                                                height={100}
                                                priority
                                            />
                                        </div>
                                        <div className={styles.itemDetails}>
                                            <h2>{item?.Name}</h2>
                                            <div className={styles.itemDescription}>{item?.Description}</div>
                                            <div className={styles.price}>{`$${item.Price}`}</div>
                                        </div>
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
            </main>
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
            <div
                onMouseEnter={() => handleSectionEnter(`Button-${schedules}`)}
            >
                <Schedules
                    Schedules={schedules}
                    fontSize="14px"
                    fontWeight="500"
                    color="#ddd"
                    fontFamily="Helvetica, sans-serif"
                    containerClassName={styles.customInfoContainer}
                    textClassName={styles.customInfoText}
                />
            </div>
            <footer className={styles.footer}>
                <div>{`© ${new Date().getFullYear()} LlakaScript`}</div>
            </footer>
        </div>
    );
};

export default Menufourd;
