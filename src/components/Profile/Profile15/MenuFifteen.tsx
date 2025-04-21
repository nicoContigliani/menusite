import Logo from "@/components/Logo/Logo"
import Info from "@/components/Info/Info"
import type React from "react"
import { useEffect, useLayoutEffect, useState } from "react"
import styles from "./MenuFifteen.module.css"
import Schedules from "@/components/Schedules/Schedules"
import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker"
import SelectComponent from "@/components/SelectComponent/SelectComponent"
import { extractLastSegment } from "../../../../tools/urlService"
import useOrderManager from "../../../../hooks/useOrderManager"
import useRules from "../../../../hooks/useRules"
import CatchOrder from "@/components/CatchOrder/CatchOrder"
import Orderflow from "@/components/Orders/Orderflow"

interface MenuItem {
    Item_Image: unknown
    Item_id: string
    Name: string
    Description: string
    Price: string | number
    Menu_Title: string
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
    // Add other properties as needed
}

const MenuFifTeen: React.FC<MenuProps> = (props) => {
    // const { menuData, groupedSections, backgroundImages, namecompanies, Promotion, info, schedules, config } = props
    const { backgroundImages, config, groupedSections, info, menuData,
        promotions, schedules, paymentLevel = 0, staff } = props
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



    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(true)
    const [iconURL, setIconURL] = useState<string>("")

    useEffect(() => {
        console.log("Tiempo en cada sección:", sectionTimes)
    }, [sectionTimes])

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
        <div className={styles.container}>
            <header className={styles.header}
                onMouseEnter={() => handleSectionEnter("header")}

            >
                <div className={styles.logo}
                    onMouseEnter={() => handleSectionEnter("logo")}
                >
                    {iconURL ?

                        <Logo
                            namecompanies={namecompanies || "LlakaScript"}
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
                    {
                        info ?
                            <Info
                                info={info}
                                fontSize="14px"
                                fontWeight="500"
                                color="#333"
                                fontFamily="Helvetica, sans-serif"
                                containerClassName={styles.customInfoContainer}
                                textClassName={styles.customInfoText}
                            />
                            : null
                    }

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
                {memoizedSections?.map(([sectionName, items]) => (
                    <div key={sectionName} className={styles.section}
                        onMouseEnter={() => handleSectionEnter(sectionName)}
                        onMouseLeave={() => handleSectionLeave(sectionName)}
                    >
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionTitle}>{sectionName}</div>
                        </div>
                        <div className={styles.sectionItems}>
                            {items?.map((item: MenuItem, index: number) => (
                                <div key={`${sectionName}-${item?.Item_id}-${index}`} className={styles.menuItem}
                                    onMouseEnter={() => handleSectionEnter(getElementId(sectionName, index, item.Name))}
                                    onClick={() => handleClick(getElementId(sectionName, index, item.Name), "menuItem")}

                                >
                                    <div className={styles.itemInfo}>
                                        <h2>{item?.Name}</h2>
                                        <div className={styles.itemDetails}>
                                            <div className={styles.itemDescription}>{item?.Description}</div>
                                            <div className={styles.price}>{`$${item.Price}`}</div>
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
                onMouseEnter={() => handleSectionEnter(`${schedules}`)}

            >
                <Schedules
                    Schedules={schedules}
                    fontSize="14px"
                    fontWeight="500"
                    color="#333"
                    fontFamily="Helvetica, sans-serif"
                    containerClassName={styles.customInfoContainer}
                    textClassName={styles.customInfoText}
                />
            </div>

            <footer className={styles.footer}>{/* Add footer content if needed */}</footer>
        </div>
    )
}

export default MenuFifTeen

