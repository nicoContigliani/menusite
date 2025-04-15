"use client"

import type React from "react"
import { useState, useCallback, useLayoutEffect } from "react"
import styles from "./MenuNew.module.css"
import SelectComponent from "@/components/SelectComponent/SelectComponent"
import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker"
import Logo from "@/components/Logo/Logo"
import { extractLastSegment } from "../../../../tools/urlService"
import useOrderManager from "../../../../hooks/useOrderManager"
import useRules from "../../../../hooks/useRules"
import CatchOrder from "@/components/CatchOrder/CatchOrder"
import Orderflow from "@/components/Orders/Orderflow"

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
    staff: any;

}

const Menueleven: React.FC<MenuProps> = (props: MenuProps) => {
    const { backgroundImages, config, groupedSections, info, menuData, promotions, schedules, paymentLevel, staff } = props
    const { orders, addOrder, editOrder, deleteOrder } = useOrderManager()
    const { hasPermission } = useRules(config, staff)



    const [searchTerm, setSearchTerm] = useState<string>("")
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


    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }, [])

    const filteredSections: [string, MenuItem[]][] = Object.entries(groupedSections).filter(([sectionName, items]) => {
        return items.some((item) =>
            [item.Name, item.Menu_Title, item.Description, item.Price.toString()].some((field) =>
                field.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
        )
    })

    const handleChange = (value: { inputValue: string; clarification: string }) => {
        console.log("Order Info:", value)
    }

    return (
        <div
            className={styles.menuContainer}
            style={{
                backgroundImage: backgroundImages || "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            <header className={styles.header}>
                <h2 className={styles.mainTitle}>{namecompanies}</h2>
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
                        placeholder="Search our menu..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                        aria-label="Search menu items"
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
                {filteredSections.length > 0 ? (
                    filteredSections.map(([sectionName, items], sectionIndex) => (
                        <div key={sectionIndex} className={styles.section}
                            onMouseEnter={() => handleSectionEnter(sectionName)}
                            onMouseLeave={() => handleSectionLeave(sectionName)}
                        >
                            <h2 className={styles.sectionTitle}>{sectionName}</h2>
                            <div className={styles.sectionItems}>
                                {items.map((item, itemIndex) => (
                                    <div
                                        onMouseEnter={() => handleSectionEnter(getElementId(sectionName, itemIndex, item.Name))}
                                        onClick={() => handleClick(getElementId(sectionName, itemIndex, item.Name), "menuItem")}
                                        key={`${sectionIndex}-${itemIndex}`} className={`${styles.menuItem} ${styles.glassEffect}`}>
                                        <div className={styles.itemInfo}>
                                            <div>
                                                <h3 className={styles.itemName}>{item.Name}</h3>
                                                {item.Description && <span className={styles.itemDescription}>{item.Description}</span>}
                                            </div>
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
                    ))
                ) : (
                    <span className={styles.noResults}>No results found for "{searchTerm}"</span>
                )}
            </div>
            <footer className={styles.footer}>
                <p>{`© ${new Date().getFullYear()} LlakaScript`}</p>
            </footer>
        </div>
    )
}

export default Menueleven

