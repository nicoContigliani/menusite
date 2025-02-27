import React, { useState, useCallback, useMemo, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import SelectComponent from '@/components/SelectComponent/SelectComponent';
import useSectionTimeTracker from '../../../../hooks/useSectionTimeTracker';
import Logo from '@/components/Logo/Logo';
import Info from '@/components/Info/Info';
import { extractLastSegment } from '../../../../tools/urlService';

interface MenuItem {
    Menu_Title: string;
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

interface ConfigType {
    IconBrand: string
}


const Menufive: React.FC<MenuProps> = (props: any) => {
    const { backgroundImages, config, groupedSections, info, menuData, promotions, schedules } = props

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



    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    }, []);

    const filteredSections = useMemo(() => {
        return Object.entries(groupedSections).map(([sectionName, items]) => {
            const filteredItems = (items as MenuItem[]).filter(item =>
                item.Name.toLowerCase().includes(searchTerm) ||
                item.Description.toLowerCase().includes(searchTerm) ||
                item.Menu_Title.toLowerCase().includes(searchTerm) ||
                item.Price.toLowerCase().includes(searchTerm)
            );
            return { sectionName, filteredItems };
        });
    }, [groupedSections, searchTerm]);


    const handleChange = (value: { inputValue: string; clarification: string }) => {
        console.log("Order Info:", value);
    };

    const getElementId = (sectionName: string, index: number, itemName: string) => {
        return `${sectionName}-${index}-${itemName}`;
    };

    return (
        <div className={styles.menuContainer} style={{ backgroundImage: backgroundImages || 'none' }}>
            <header className={styles.header}
                onMouseEnter={() => handleSectionEnter('header')}
            >
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
                        placeholder="Buscar artículo..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </header>

            {filteredSections.map(({ sectionName, filteredItems }, index) => (
                <section key={index} className={styles.section}
                    onMouseEnter={() => handleSectionEnter(sectionName)}
                    onMouseLeave={() => handleSectionLeave(sectionName)}
                >
                    <h2 className={styles.sectionTitle}>{sectionName}</h2>
                    <div className={styles.masonryGrid}>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, itemIndex) => (
                                <div key={itemIndex} className={styles.itemCard}>
                                    <div className={styles.cardImageWrapper}>
                                        <Image
                                            src={item.Item_Image}
                                            alt={item.Name}
                                            width={400}
                                            height={400}
                                            className={styles.cardImage}
                                            priority
                                        />
                                    </div>
                                    <div className={styles.cardContent}
                                        onMouseEnter={() => handleSectionEnter(getElementId(sectionName, index, item.Name))}
                                        onClick={() => handleClick(getElementId(sectionName, index, item.Name), "menuItem")}
                                    >
                                        <h3 className={styles.cardTitle}>{item.Name}</h3>
                                        <p className={styles.cardDescription}>{item.Description}</p>
                                        <span className={styles.cardPrice}>{`$${item.Price}`}</span>
                                    </div>
                                    <div onMouseEnter={() => handleSectionEnter(`Button-${item.Name}`)}>
                                        <SelectComponent
                                            orderdescription={[]}
                                            delivery={true}
                                            takeaway={false}
                                            Dinein={false}
                                            onChange={handleChange}
                                            value="someValue"
                                            className="no"
                                            color="white"
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <span className={styles.noResults}>No se encontraron artículos</span>
                        )}

                    </div>
                </section>
            ))}
        </div>
    );
};

export default Menufive;