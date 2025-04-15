import Logo from '@/components/Logo/Logo';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './MenuFourdTeen.module.css'
import Image from 'next/image';
import SelectComponent from '@/components/SelectComponent/SelectComponent';
import useSectionTimeTracker from '../../../../hooks/useSectionTimeTracker';
import Info from '@/components/Info/Info';
import { extractLastSegment } from '../../../../tools/urlService';
import useOrderManager from '../../../../hooks/useOrderManager';
import useRules from '../../../../hooks/useRules';
import CatchOrder from '@/components/CatchOrder/CatchOrder';
import Orderflow from '@/components/Orders/Orderflow';
interface MenuItem {
    Menu_Title?: string;
    Item_Image?: string;
    Section?: string;
    Item_id?: number;
    Name?: string;
    Description?: string;
    Price?: string;
    hojas?: { Hoja1?: any[] };
    status_Companies?: true;
    visits?: 0;
    licence?: any[];
    infoVisits?: any[];
    loyaltyProgram?: any[];
    delivery?: any[];
    trafficStats?: any[];
    marketingCampaigns?: any[];
    giftCards?: any[];
    badcustomer?: any[];
    godcustomer?: any[];
    raiting?: number;
    latitude?: string;
    longitude: string;
    createAt?: string;
    updateAt?: string;
    IconBrand?: string;  // Agregar esta propiedad
    extra?: any,
    extras?: any

}
interface ConfigType {
    Background_Image?: string | undefined;
    IconBrand?: string | undefined;
}
interface Infoype {
    facebook?: string;
    instagram?: string;
    mail?: string;
    phone?: string;
    ubication?: string;
    web?: string;
    whatsapp?: string;
    x?: string;
}
interface SchedulesType {
    day?: string | undefined;
    servicehours?: string | undefined;
}
interface MenuProps {
    namecompanies: string;
    groupedSections: Record<string, MenuItem[]>;
    menuData: any;
    backgroundImages: string | null;
    config: Record<string, ConfigType[]>;
    info: Record<string, Infoype[]>,
    Promotion: Record<string, MenuItem[]>,
    schedules: Record<string, SchedulesType[]>,
    paymentLevel: any
    staff: any;

}
const MenuFourdTeen: React.FC<MenuProps> = (props) => {
    const {
        menuData,
        groupedSections,
        backgroundImages,
        Promotion,
        info,
        schedules,
        config,
        paymentLevel = 0,
        staff
    } = props
    const { orders, addOrder, editOrder, deleteOrder } = useOrderManager()
    const { hasPermission } = useRules(config, staff)


    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);  // New loading state
    const [iconURL, setIconURL] = useState<any>('');
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
            const firstSection: any = Object.values(groupedSections)[0];
            if (firstSection && firstSection.length > 0) {
                // Aquí podrías hacer algo más con `firstSection` si lo necesitas
            }
        }

        if (config) {
            const consfitData = config[0]
            const configdata: any = { ...consfitData }
            const { IconBrand } = configdata
            setIconURL(IconBrand)
        }

        setLoading(false); // Set loading to false once preloaded
    }, [groupedSections, config]);

    if (loading) {
        return <div>Loading...</div>; // Show loading spinner or message while preloading
    }

    const memoizedSections = Object.entries(groupedSections).map(([sectionName, items]) => {
        const filteredItems = items.filter((item) =>
            [item.Name, item.Description, item.Price, item.Menu_Title].some(field =>
                field?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        return [sectionName, filteredItems] as [string, MenuItem[]];
    }).filter(([, items]) => items.length > 0);
    const handleChange = (value: { inputValue: string; clarification: string }) => {
        console.log("Order Info:", value);
    };
    return (
        <div className={styles.container}
            style={{

                // backgroundImage: backgroundImages ?? undefined,
                // backgroundSize: "cover", // Ensures the image covers the entire area
                // backgroundRepeat: "no-repeat", // Prevents repeating the image
                // backgroundPosition: "center", // Centers the image
            }}
        >
            <header className={styles.header}>
                <div className={styles.logo}
                    onMouseEnter={() => handleSectionEnter("logo")}
                >
                    {iconURL ? (
                        <Logo
                            logoUrl={iconURL}
                            namecompanies={namecompanies}
                        />
                    ) : (
                        <div>No logo available</div>  // Puedes mostrar un mensaje si no hay logo
                    )}
                </div>


                <div className={styles.info}
                    onMouseEnter={() => handleSectionEnter("info")}
                >
                    {info ?
                        <Info
                            info={info[0]}
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
            <main className={styles.main}>

                {memoizedSections?.map(([sectionName, items]) => (
                    <div
                        key={sectionName}
                        className={styles.section}
                        onMouseEnter={() => handleSectionEnter(sectionName)}
                        onMouseLeave={() => handleSectionLeave(sectionName)}
                    // onMouseEnter={() => handleSectionEnter(sectionName)}
                    // onMouseLeave={handleSectionLeave}
                    >
                        <div className={styles.sectionHeader}>
                            <div className={styles.sectionTitle}>{sectionName}</div>
                        </div>
                        <div className={styles.sectionItems}>
                            {items?.map((item: MenuItem | any, index: number) => (
                                <div
                                    key={`${sectionName}-${item?.Item_id}-${index}`}
                                    className={styles.menuItem}
                                    onMouseEnter={() => handleSectionEnter(getElementId(sectionName, index, item?.Name))}
                                    onClick={() => handleClick(getElementId(sectionName, index, item?.Name), "menuItem")}


                                >
                                    {/* <div className={styles.itemImage} >
                                        <Image
                                            src={`${item.Item_Image}`}
                                            alt={item?.Name || "Image"}
                                            width={100}
                                            height={100}
                                            priority
                                            className={styles.itemImage}
                                        />
                                    </div> */}
                                    <div className={styles.itemInfo}>
                                        <h2>{item?.Name}</h2>
                                        <span>{item?.Description}</span>
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
                            ))}
                        </div>
                    </div>
                ))}
            </main>
            <footer className={styles.footer}>

            </footer>
        </div>
    );
}

export default MenuFourdTeen;