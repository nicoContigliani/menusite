// "use client"
// import Logo from "@/components/Logo/Logo"
// import type React from "react"
// import { useEffect, useState } from "react"
// import styles from "./MenuNew.module.css"
// import Info from "@/components/Info/Info"
// import Schedules from "@/components/Schedules/Schedules"
// import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker"
// import Image from "next/image"
// import { Divider } from "antd"
// import SelectComponent from "@/components/SelectComponent/SelectComponent"

// interface MenuItem {
//     Item_id: string
//     Name: string
//     Description: string
//     Price: string | number
//     Menu_Title: string
//     Item_Image: string
// }

// interface MenuProps {
//     menuData: any
//     groupedSections: { [key: string]: MenuItem[] }
//     backgroundImages: any
//     namecompanies: string
//     promotions: any
//     info: any
//     schedules: any
//     config: any[]
// }

// interface ConfigType {
//     IconBrand: string
// }

// const Menuone: React.FC<MenuProps> = (props) => {
//     const { backgroundImages, config, groupedSections, info, menuData, namecompanies, promotions, schedules } = props

//     const { sectionTimes, handleSectionEnter } = useSectionTimeTracker("nico")
//     useEffect(() => {
//         console.log("Tiempo en cada sección:", sectionTimes)
//     }, [sectionTimes])


//     const [searchTerm, setSearchTerm] = useState("")
//     const [loading, setLoading] = useState(true)
//     const [iconURL, setIconURL] = useState<string>("")

//     useEffect(() => {
//         if (groupedSections) {
//             const firstSection: any = Object.values(groupedSections)[0]
//             if (firstSection && firstSection.length > 0) {
//                 // You can do something with `firstSection` if needed
//             }
//         }

//         if (config && config.length > 0) {
//             const configData = config[0] as ConfigType
//             setIconURL(configData.IconBrand || "")
//         }

//         setLoading(false)
//     }, [groupedSections, config])

//     if (loading) {
//         return <div>Loading...</div>
//     }

//     const memoizedSections = Object.entries(groupedSections)
//         .map(([sectionName, items]) => {
//             const filteredItems = items.filter(
//                 (item) =>
//                     [item.Name, item.Description, item.Menu_Title].some(
//                         (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
//                     ) ||
//                     (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
//             )
//             return [sectionName, filteredItems] as [string, MenuItem[]]
//         })
//         .filter(([, items]) => items.length > 0)

//     const handleChange = (value: { inputValue: string; clarification: string }) => {
//         console.log("Order Info:", value);
//     };


//     return (
//         <div className={styles.container}
//             style={{
//                 backgroundImage: backgroundImages || 'none',
//             }}
//         >
//             <header className={styles.header}>
//                 <div className={styles.logo}
//                     onMouseEnter={() => handleSectionEnter("logo")}
//                 >
//                     {iconURL ?
//                         <Logo
//                             namecompanies="LlakaScript"
//                             logoUrl={iconURL}
//                             size={150} // Tamaño de la imagen
//                             fontSize="40px" // Tamaño de la fuente
//                             fontWeight="700" // Grosor de la fuente
//                             color="#ffffff" // Color del texto
//                             fontFamily="Arial, sans-serif" // Familia de la fuente
//                         />
//                         : null}
//                 </div>
//                 <div className={styles.info}
//                     onMouseEnter={() => handleSectionEnter("info")}
//                 >
//                     {info ?
//                         <Info
//                             info={info}
//                             fontSize="14px"
//                             fontWeight="500"
//                             color="#dddddd"
//                             fontFamily="Helvetica, sans-serif"
//                             containerClassName={styles.customInfoContainer}
//                             textClassName={styles.customInfoText}
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

//             <main className={styles.main}>
//                 {memoizedSections?.map(([sectionName, items]) => (
//                     <div key={sectionName} data-section={sectionName} className={styles.section}>
//                         <div className={styles.sectionHeader}>
//                             <div className={styles.sectionTitle}
//                                 onMouseEnter={() => handleSectionEnter(`${sectionName}`)}
//                             >
//                                 {sectionName}
//                             </div>
//                         </div>
//                         <div className={styles.sectionItems}>
//                             {items?.map((item: MenuItem, index: number) => (
//                                 <div key={`${sectionName}-${item?.Item_id}-${index}`} className={styles.menuItem}>
//                                     <div className={styles.itemInfo}
//                                         onMouseEnter={() => handleSectionEnter(`${sectionName}-${index}-${item?.Name}`)}
//                                     >
//                                         <div className={styles.cardImage}>
//                                             <Image
//                                                 src={`${item.Item_Image}`}
//                                                 alt={item.Name}
//                                                 width={100}
//                                                 height={100}
//                                                 priority
//                                             />
//                                         </div>
//                                         <div className={styles.itemDetails}>
//                                             <h2>{item?.Name}</h2>
//                                             <div className={styles.itemDescription}>{item?.Description}</div>
//                                             <div className={styles.price}>{`$${item.Price}`}</div>
//                                         </div>
//                                         <div > {/* Esta es la clase CSS del padre */}
//                                             <SelectComponent
//                                                 orderdescription={[]}
//                                                 delivery={true}
//                                                 takeaway={false}
//                                                 Dinein={false}
//                                                 onChange={handleChange}
//                                                 value="someValue"
//                                                 className="no"
//                                                 color="white"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </main>
//             <div className={styles.schedules}
//                 onMouseEnter={() => handleSectionEnter(`${schedules}`)}
//             >
//                 <Schedules
//                     Schedules={schedules}
//                     fontSize="14px"
//                     fontWeight="500"
//                     color="#ddd"
//                     fontFamily="Helvetica, sans-serif"
//                     containerClassName={styles.customInfoContainer}
//                     textClassName={styles.customInfoText}
//                 />
//             </div>
//             <footer className={styles.footer}>
//                 <div>{`© ${new Date().getFullYear()} LlakaScript`}</div>
//             </footer>
//         </div>
//     )
// }

// export default Menuone

"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import Image from "next/image"
import Logo from "@/components/Logo/Logo"
import Info from "@/components/Info/Info"
import Schedules from "@/components/Schedules/Schedules"
import SelectComponent from "@/components/SelectComponent/SelectComponent"
import { Divider } from "antd"
import styles from "./MenuNew.module.css"
import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker"
import { extractLastSegment } from "../../../../tools/urlService"

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

const Menuone: React.FC<MenuProps> = (props) => {
    const { backgroundImages, config, groupedSections, info, menuData, promotions, schedules } = props
    const [searchTerm, setSearchTerm] = useState("")
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
    useEffect(() => {
        if (config?.length) {
            setIconURL(config[0].IconBrand || "")
        }
    }, [config])

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
        console.log("Order Info:", value)
    }

    return (
        <div
            className={styles.container}
            style={{ backgroundImage: backgroundImages || "none" }}
        >
            <header className={styles.header}>
                <div className={styles.logo} onMouseEnter={() => handleSectionEnter("logo")}>
                    {iconURL && (
                        <Logo
                            namecompanies={namecompanies}
                            logoUrl={iconURL}
                            size={150}
                            fontSize="40px"
                            fontWeight="700"
                            color="#ffffff"
                            fontFamily="Arial, sans-serif"
                        />
                    )}
                </div>

                <div className={styles.info} onMouseEnter={() => handleSectionEnter("info")}>
                    {info && (
                        <Info
                            info={info}
                            fontSize="14px"
                            fontWeight="500"
                            color="#dddddd"
                            fontFamily="Helvetica, sans-serif"
                        />
                    )}
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

            <main className={styles.main}>
                {memoizedSections.map(([sectionName, items]) => (
                    <div
                        key={sectionName}
                        data-section={sectionName}
                        className={styles.section}
                        onMouseEnter={() => handleSectionEnter(sectionName)}
                    >
                        <div className={styles.sectionHeader}>
                            <h2>{sectionName}</h2>
                        </div>

                        <div className={styles.sectionItems}>
                            {items.map((item, index) => (
                                <div
                                    key={`${sectionName}-${item.Item_id}-${index}`}
                                    className={styles.menuItem}
                                    onMouseEnter={() => handleSectionEnter(`${sectionName}-${index}-${item.Name}`)}
                                >
                                    <div className={styles.cardImage}>

                                        <Image src={item.Item_Image} alt={item.Name} width={100} height={100} priority />
                                    </div>


                                    <div className={styles.itemDetails}>
                                        <h2>{item.Name}</h2>
                                        <p className={styles.itemDescription}>{item.Description}</p>
                                        <p className={styles.price}>{`$${item.Price}`}</p>
                                    </div>
                                    <div onMouseEnter={() => handleSectionEnter(`Button-${item.Name}`)}>

                                        <SelectComponent
                                            orderdescription={[]}
                                            delivery
                                            takeaway={false}
                                            Dinein={false}
                                            onChange={handleChange}
                                            value="someValue"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </main>

            <div className={styles.schedules} onMouseEnter={() => handleSectionEnter("schedules")}>
                <Schedules
                    Schedules={schedules}
                    fontSize="14px"
                    fontWeight="500"
                    color="#ddd"
                    fontFamily="Helvetica, sans-serif"
                />
            </div>

            <footer className={styles.footer}>
                <p>{`© ${new Date().getFullYear()} LlakaScript`}</p>
            </footer>
        </div>
    )
}

export default Menuone
