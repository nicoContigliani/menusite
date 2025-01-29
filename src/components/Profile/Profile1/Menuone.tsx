import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import ElegantCarouselPromotions from '../../ElegantCarouselPromotions/ElegantCarouselPromotions';

interface MenuItem {
    Menu_Title?: string;
    Profile_Type?: string;
    Primary_Color?: string;
    Secondary_Color?: string;
    Background_Image?: string;
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
}

interface MenuProps {
    namecompanies: string;
    groupedSections: Record<string, MenuItem[]>;
    menuData: any;
    backgroundImages: string | null;
    groupedSectionsPromotions: Record<string, MenuItem[]>;
}

const Menuone: React.FC<MenuProps> = ({ groupedSections, namecompanies, backgroundImages, groupedSectionsPromotions }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [menuTime, setMenuTime] = useState(0);
    const [sectionTimes, setSectionTimes] = useState<Record<string, number>>({});
    const [currentSection, setCurrentSection] = useState<string | null>(null);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [carouselTime, setCarouselTime] = useState(0);
    const [carouselStartTime, setCarouselStartTime] = useState<number | null>(null);
    const [firstProfile, setFirstProfile] = useState<MenuItem | null>(null);
    const [loading, setLoading] = useState(true);  // New loading state

    // useEffect(() => {
    //     const start = Date.now();
    //     const intervalId = setInterval(() => {
    //         const elapsed = (Date.now() - start) / 1000;
    //         setMenuTime(elapsed);
    //     }, 1000);
    //     return () => clearInterval(intervalId);
    // }, []);

    // Preload the first profile
    useEffect(() => {
        if (groupedSections) {
            const firstSection = Object.values(groupedSections)[0];
            if (firstSection && firstSection.length > 0) {
                setFirstProfile(firstSection[0]);
            }
        }
        setLoading(false); // Set loading to false once preloaded
    }, [groupedSections]);

    // const handleSectionEnter = (sectionName: string) => {
    //     const now = Date.now();
    //     if (currentSection && startTime) {
    //         const duration = (now - startTime) / 1000;
    //         setSectionTimes((prev) => ({
    //             ...prev,
    //             [currentSection]: (prev[currentSection] || 0) + duration,
    //         }));
    //     }
    //     setCurrentSection(sectionName);
    //     setStartTime(now);
    // };

    // const handleSectionLeave = () => {
    //     const now = Date.now();
    //     if (currentSection && startTime) {
    //         const duration = (now - startTime) / 1000;
    //         setSectionTimes((prev) => ({
    //             ...prev,
    //             [currentSection]: (prev[currentSection] || 0) + duration,
    //         }));
    //     }
    //     setCurrentSection(null);
    //     setStartTime(null);
    // };

    // const handleCarouselEnter = () => {
    //     setCarouselStartTime(Date.now());
    // };

    // const handleCarouselLeave = () => {
    //     if (carouselStartTime) {
    //         const duration = (Date.now() - carouselStartTime) / 1000;
    //         setCarouselTime((prev) => prev + duration);
    //         setCarouselStartTime(null);
    //     }
    // };

    // const handleButtonClick = (item: MenuItem) => {
    //     console.log('Item clicked:', item);
    // };

    const memoizedSections = Object.entries(groupedSections).map(([sectionName, items]) => {
        const filteredItems = items.filter((item) =>
            [item.Name, item.Description, item.Price, item.Menu_Title].some(field =>
                field?.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        return [sectionName, filteredItems] as [string, MenuItem[]];
    }).filter(([, items]) => items.length > 0);

    if (loading) {
        return <div>Loading...</div>; // Show loading spinner or message while preloading
    }

    return (
        <div
            className={styles.menuWrapper}
            style={{
                backgroundImage: backgroundImages || 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        // onMouseLeave={handleSectionLeave}
        >
            <header className={styles.header}>
                <h1 className={styles.companyName}>{namecompanies}</h1>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Buscar en el menú..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* {groupedSectionsPromotions && (
                    <div
                        onMouseEnter={handleCarouselEnter}
                        onMouseLeave={handleCarouselLeave}
                    >
                        <ElegantCarouselPromotions items={groupedSectionsPromotions} />
                    </div>
                )} */}
            </header>

            {memoizedSections?.map(([sectionName, items]) => (
                <div
                    key={sectionName}
                    className={styles.section}
                // onMouseEnter={() => handleSectionEnter(sectionName)}
                // onMouseLeave={handleSectionLeave}
                >
                    <h1 className={styles.sectionTitle}>{sectionName}</h1>
                    <div className={styles.sectionItems}>
                        {items?.map((item: MenuItem, index: number) => (
                            <div
                                key={`${sectionName}-${item?.Item_id}-${index}`} // Agrega el índice para hacer la clave única
                                className={styles.menuItem}
                                style={{
                                    backgroundImage: `url(${backgroundImages})`,
                                }}
                            >
                                <div className={styles.overlay}></div>
                                    <Image
                                        src={`${item.Item_Image}`}
                                        alt={item?.Name || "Image"}
                                        width={100}
                                        height={100}
                                        priority
                                        className={styles.itemImage}
                                    />
                                <div className={styles.itemInfo}>
                                    <h2>{item?.Name}</h2>
                                    <span>{item?.Description}</span>
                                    <span className={styles.price}>{`$${item.Price}`}</span>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Menuone;
