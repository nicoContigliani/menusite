// import React, { useState, useCallback, useEffect, useMemo, useLayoutEffect } from 'react';
// import Image from 'next/image';
// import styles from './MenuNew.module.css';
// import SelectComponent from '@/components/SelectComponent/SelectComponent';
// import useSectionTimeTracker from '../../../../hooks/useSectionTimeTracker';
// import Logo from '@/components/Logo/Logo';
// import { extractLastSegment } from '../../../../tools/urlService';

// interface MenuItem {
//     Menu_Title: string;
//     Background_Image: string;
//     Item_Image: string;
//     Section: string;
//     Item_id: number;
//     Name: string;
//     Description: string;
//     Price: string;
// }

// interface MenuProps {
//     menuData: any;
//     groupedSections: { [key: string]: MenuItem[] };
//     groupedSectionpromotions: { [key: string]: MenuItem[] };
//     backgroundImages: any;
//     namecompanies: string;
//     promotions: any;
//     info: any;
//     schedules: any;
//     config: any[];
// }

// interface ConfigType {
//     IconBrand: string;
// }

// const Menufive: React.FC<MenuProps> = (props) => {
//     const { backgroundImages, config, groupedSections,groupedSectionpromotions } = props;


//     const [namecompanies, setNamecompanies] = useState<string>('')
//     useLayoutEffect(() => {
//         if (typeof window !== "undefined") {
//             // setFullUrl(window.location.href);
//             const data = window.location.href;
//             setNamecompanies(extractLastSegment(data))
//         }
//     }, []);

//     const [searchTerm, setSearchTerm] = useState<string>('');
//     const [loading, setLoading] = useState(true);
//     const [iconURL, setIconURL] = useState<string>('');

//     const { sectionTimes, handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies)

//     useEffect(() => {
//         if (config?.length > 0) {
//             const configData = config[0] as ConfigType;
//             setIconURL(configData.IconBrand || '');
//         }
//         setLoading(false);
//     }, [config]);

//     // Manejo del cambio en la búsqueda
//     const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchTerm(e.target.value);
//     }, []);

//     const handleChange = (value: { inputValue: string; clarification: string }) => {
//         console.log('Order Info:', value);
//     };

//     const getElementId = (sectionName: string, index: number, itemName: string) => {
//         return `${sectionName}-${index}-${itemName}`;
//     };


//     return (
//         <div
//             className={styles.menuContainer}
//             style={{ backgroundImage: backgroundImages || 'none' }}
//         >
//             <header className={styles.header} onMouseEnter={() => handleSectionEnter('header')}>
//                 <h1>{namecompanies}</h1>
//                 <div className={styles.logo}
//                     onMouseEnter={() => handleSectionEnter("logo")}
//                 >
//                     {iconURL ?
//                         <Logo
//                             namecompanies="LlakaScript"
//                             logoUrl={iconURL}
//                             size={120} // Tamaño de la imagen
//                             fontSize="22px" // Tamaño de la fuente
//                             fontWeight="700" // Grosor de la fuente
//                             color="black" // Color del texto
//                             fontFamily="Arial, sans-serif" // Familia de la fuente
//                         />
//                         : null}
//                 </div>
//                 <div className={styles.searchContainer}
//                     onMouseEnter={() => handleSectionEnter("search")}
//                 >
//                     <input
//                         type="text"
//                         className={styles.searchInput}
//                         placeholder="Buscar en el menú..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>
//             </header>
            



//             {Object.entries(groupedSections).map(([sectionName, items]: [string, MenuItem[]], index) => {
//                 // Filtramos los elementos de la sección una sola vez
//                 const filteredItems = useMemo(
//                     () =>
//                         items.filter(
//                             (item) =>
//                                 item.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                                 item.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                                 item.Menu_Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                                 item.Price.toLowerCase().includes(searchTerm.toLowerCase())
//                         ),
//                     [items, searchTerm]
//                 );

//                 return (
//                     <section key={index} className={styles.section}
//                         onMouseEnter={() => handleSectionEnter(sectionName)}
//                         onMouseLeave={() => handleSectionLeave(sectionName)}
//                     >
//                         <h2 className={styles.sectionTitle}>{sectionName}</h2>
//                         <div className={styles.masonryGrid}>
//                             {filteredItems.length > 0 ? (
//                                 filteredItems.map((item, itemIndex) => (
//                                     <div key={itemIndex} className={styles.card}
//                                         onMouseEnter={() => handleSectionEnter(getElementId(sectionName, index, item.Name))}
//                                         onClick={() => handleClick(getElementId(sectionName, index, item.Name), "menuItem")}
//                                     >
//                                         <div className={styles.cardImage}>
//                                             <Image
//                                                 src={item.Item_Image}
//                                                 alt={item.Name}
//                                                 width={400}
//                                                 height={400}
//                                                 priority
//                                             />
//                                         </div>
//                                         <div className={styles.cardContent}>
//                                             <h3 className={styles.cardTitle}>{item.Name}</h3>
//                                             <span className={styles.cardDescription}>{item.Description}</span>
//                                             <span className={styles.cardPrice}>{`$${item.Price}`}</span>
//                                         </div>
//                                         <div onMouseEnter={() => handleSectionEnter(`Button-${item.Name}`)}>
//                                             <SelectComponent
//                                                 orderdescription={[]}
//                                                 delivery={true}
//                                                 takeaway={false}
//                                                 Dinein={false}
//                                                 onChange={handleChange}
//                                                 value="someValue"
//                                                 className="no"
//                                                 color="black"
//                                             />
//                                         </div>
//                                     </div>
//                                 ))
//                             ) : (
//                                 <span>No se encontraron artículos</span>
//                             )}
//                         </div>
//                     </section>
//                 );
//             })}
//         </div>
//     );
// };

// export default Menufive;



"use client"

import type React from "react"
import { useState, useCallback, useEffect, useMemo, useLayoutEffect } from "react"
import Image from "next/image"
import styles from "./MenuNew.module.css"
import SelectComponent from "@/components/SelectComponent/SelectComponent"
import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker"
import Logo from "@/components/Logo/Logo"
import { extractLastSegment } from "../../../../tools/urlService"

interface MenuItem {
  Menu_Title: string
  Background_Image: string
  Item_Image: string
  Section: string
  Item_id: number
  Name: string
  Description: string
  Price: string
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
}

interface ConfigType {
  IconBrand: string
}

const Menufive: React.FC<MenuProps> = (props) => {
  const { backgroundImages, config, groupedSections, groupedSectionpromotions } = props

  const [namecompanies, setNamecompanies] = useState<string>("")
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.location.href
      setNamecompanies(extractLastSegment(data))
    }
  }, [])

  const [searchTerm, setSearchTerm] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [iconURL, setIconURL] = useState<string>("")

  const { sectionTimes, handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies)

  useEffect(() => {
    if (config?.length > 0) {
      const configData = config[0] as ConfigType
      setIconURL(configData.IconBrand || "")
    }
    setLoading(false)
  }, [config])

  // Manejo del cambio en la búsqueda
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, [])

  const handleChange = (value: { inputValue: string; clarification: string }) => {
    console.log("Order Info:", value)
  }

  const getElementId = (sectionName: string, index: number, itemName: string) => {
    return `${sectionName}-${index}-${itemName}`
  }

  // Memoized filtered sections - new approach based on Menuone
  const memoizedSections = useMemo(() => {
    return Object.entries(groupedSections)
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
  }, [groupedSections, searchTerm])

  // Memoized filtered promotions sections
  const memoizedSectionsPromotions = useMemo(() => {
    return (groupedSectionpromotions ? Object.entries(groupedSectionpromotions) : [])
      .map(([sectionName, items]) => {
        const filteredItems = items.filter(
          (item: any) =>
            [item.Name, item.Description, item.Menu_Title, item.Section].some(
              (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
            ) ||
            (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
        )
        return [sectionName, filteredItems] as [string, MenuItem[]]
      })
      .filter(([, items]) => items.length > 0)
  }, [groupedSectionpromotions, searchTerm])

  return (
    <div className={styles.menuContainer} style={{ backgroundImage: backgroundImages || "none" }}>
      <header className={styles.header} onMouseEnter={() => handleSectionEnter("header")}>
        <h1>{namecompanies}</h1>
        <div className={styles.logo} onMouseEnter={() => handleSectionEnter("logo")}>
          {iconURL ? (
            <Logo
              namecompanies="LlakaScript"
              logoUrl={iconURL}
              size={120} // Tamaño de la imagen
              fontSize="22px" // Tamaño de la fuente
              fontWeight="700" // Grosor de la fuente
              color="black" // Color del texto
              fontFamily="Arial, sans-serif" // Familia de la fuente
            />
          ) : null}
        </div>
        <div className={styles.searchContainer} onMouseEnter={() => handleSectionEnter("search")}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar en el menú..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Render promotions sections if they exist */}
      {memoizedSectionsPromotions.length > 0 && (
        <>
          <div className={styles.sectionTitle}>
            <h5 className={styles.titleStructure}>Promoción</h5>
          </div>

          {memoizedSectionsPromotions.map(([sectionName, items], index) => (
            <section
              key={index}
              className={styles.section}
              onMouseEnter={() => handleSectionEnter(sectionName)}
              onMouseLeave={() => handleSectionLeave(sectionName)}
            >
              <h2 className={styles.sectionTitle}>{sectionName}</h2>
              <div className={styles.masonryGrid}>
                {items.length > 0 ? (
                  items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={styles.card}
                      onMouseEnter={() => handleSectionEnter(getElementId(sectionName, index, item.Name))}
                      onClick={() => handleClick(getElementId(sectionName, index, item.Name), "menuItem")}
                    >
                      <div className={styles.cardImage}>
                        <Image
                          src={item.Item_Image || "/placeholder.svg"}
                          alt={item.Name}
                          width={400}
                          height={400}
                          priority
                        />
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{item.Name}</h3>
                        <span className={styles.cardDescription}>{item.Description}</span>
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
                          color="black"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <span>No se encontraron artículos</span>
                )}
              </div>
            </section>
          ))}
        </>
      )}

      {/* Render regular menu sections */}
      {memoizedSections.length > 0 && (
        <>
          <div className={styles.sectionTitle}>
            <h5 className={styles.titleStructure}>Menú</h5>
          </div>

          {memoizedSections.map(([sectionName, items], index) => (
            <section
              key={index}
              className={styles.section}
              onMouseEnter={() => handleSectionEnter(sectionName)}
              onMouseLeave={() => handleSectionLeave(sectionName)}
            >
              <h2 className={styles.sectionTitle}>{sectionName}</h2>
              <div className={styles.masonryGrid}>
                {items.length > 0 ? (
                  items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className={styles.card}
                      onMouseEnter={() => handleSectionEnter(getElementId(sectionName, index, item.Name))}
                      onClick={() => handleClick(getElementId(sectionName, index, item.Name), "menuItem")}
                    >
                      <div className={styles.cardImage}>
                        <Image
                          src={item.Item_Image || "/placeholder.svg"}
                          alt={item.Name}
                          width={400}
                          height={400}
                          priority
                        />
                      </div>
                      <div className={styles.cardContent}>
                        <h3 className={styles.cardTitle}>{item.Name}</h3>
                        <span className={styles.cardDescription}>{item.Description}</span>
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
                          color="black"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <span>No se encontraron artículos</span>
                )}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  )
}

export default Menufive

