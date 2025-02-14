import React, { useState, useEffect, useLayoutEffect } from 'react';
import Image from 'next/image';
import styles from './MenuNew.module.css';
import SelectComponent from '@/components/SelectComponent/SelectComponent';
import useSectionTimeTracker from '../../../../hooks/useSectionTimeTracker';
import Logo from '@/components/Logo/Logo';
import Info from '@/components/Info/Info';
import { extractLastSegment } from '../../../../tools/urlService';

interface MenuItem {
    Item_id: string
    Name: string
    Description: string
    Price: string | number
    Menu_Title: string
    Item_Image: string
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
}

interface ConfigType {
    IconBrand: string
}

const MenuNine: React.FC<MenuProps> = (props) => {
    const { backgroundImages, config, groupedSections, info, menuData,promotions, schedules } = props
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
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
   
    const { sectionTimes, handleSectionEnter } = useSectionTimeTracker(namecompanies)

    // Debounced search term to optimize performance
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms debounce delay

        return () => clearTimeout(timer); // Cleanup on effect re-run
    }, [searchTerm]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

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
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className={styles.searchInput}
                    />
                </div>
            </header>
            <div className={styles.menuWrapper}>
                {Object.entries(groupedSections).map(([sectionName, items], sectionIndex) => {
                    // Filter items based on search term
                    const filteredSectionItems = items.filter((item: any) =>
                        item.Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                        item.Menu_Title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                        item.Description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                        item.Price.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
                    );

                    return filteredSectionItems.length > 0 ? (
                        <div key={sectionIndex} className={styles.section}
                            onMouseEnter={() => handleSectionEnter(`${sectionName}`)}
                        >
                            <h1 className={styles.sectionTitle}>{sectionName}</h1>
                            <div className={styles.sectionItems}>
                                {filteredSectionItems.map((item: MenuItem, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className={styles.menuItem}
                                        onMouseEnter={() => handleSectionEnter(`${sectionName}-${itemIndex}-${item?.Name}`)}

                                    >
                                        <div className={styles.itemImage}>
                                            <Image
                                                src={`${item.Item_Image}`}
                                                alt={item.Name}
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                        <div className={styles.itemInfo}>
                                            <h2>{item.Name}</h2>
                                            <span>{item.Description}</span>
                                            <span className={styles.price}>{`$${item.Price}`}</span>
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
                                ))}
                            </div>
                        </div>
                    ) : null;
                })}
            </div>
        </div>
    );
};

export default MenuNine;
