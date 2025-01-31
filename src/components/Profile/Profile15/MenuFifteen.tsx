// import Logo from '@/components/Logo/Logo';
// import React, { useEffect, useState } from 'react'
// import styles from './MenuFifteen.module.css'
// import Image from 'next/image';
// interface MenuItem {
//     Menu_Title?: string;
//     Item_Image?: string;
//     Section?: string;
//     Item_id?: number;
//     Name?: string;
//     Description?: string;
//     Price?: string;
//     hojas?: { Hoja1?: any[] };
//     status_Companies?: true;
//     visits?: 0;
//     licence?: any[];
//     infoVisits?: any[];
//     loyaltyProgram?: any[];
//     delivery?: any[];
//     trafficStats?: any[];
//     marketingCampaigns?: any[];
//     giftCards?: any[];
//     badcustomer?: any[];
//     godcustomer?: any[];
//     raiting?: number;
//     latitude?: string;
//     longitude: string;
//     createAt?: string;
//     updateAt?: string;
//     IconBrand?: string;  // Agregar esta propiedad

// }
// interface ConfigType {
//     Background_Image?: string | undefined;
//     IconBrand?: string | undefined;
// }
// interface Infoype {
//     facebook?: string;
//     instagram?: string;
//     mail?: string;
//     phone?: string;
//     ubication?: string;
//     web?: string;
//     whatsapp?: string;
//     x?: string;
// }
// interface SchedulesType {
//     day?: string | undefined;
//     servicehours?: string | undefined;
// }
// interface MenuProps {
//     namecompanies: string;
//     groupedSections: Record<string, MenuItem[]>;
//     menuData: any;
//     backgroundImages: string | null;
//     config: Record<string, ConfigType[]>;
//     Info: Record<string, Infoype[]>,
//     Promotion: Record<string, MenuItem[]>,
//     schedules: Record<string, SchedulesType[]>,
// }
// const MenuFifTeen: React.FC<MenuProps> = (props) => {
//     console.log("🚀 ~ MenuFifTeen ~ props:*****************", props)
//     const {
//         menuData,
//         groupedSections,
//         backgroundImages,
//         namecompanies,
//         Promotion,
//         Info,
//         schedules,
//         config,
//     } = props
//     console.log("🚀 ~ backgroundImages:", backgroundImages)

//     const [searchTerm, setSearchTerm] = useState('');
//     const [loading, setLoading] = useState(true);  // New loading state
//     const [iconURL, setIconURL] = useState<any>('');

//     useEffect(() => {
//         if (groupedSections) {
//             const firstSection: any = Object.values(groupedSections)[0];
//             if (firstSection && firstSection.length > 0) {
//                 // Aquí podrías hacer algo más con `firstSection` si lo necesitas
//             }
//         }

//         if (config) {
//             const consfitData = config[0]
//             const configdata: any = { ...consfitData }
//             const { IconBrand } = configdata
//             setIconURL(IconBrand)
//         }

//         setLoading(false); // Set loading to false once preloaded
//     }, [groupedSections, config]);

//     if (loading) {
//         return <div>Loading...</div>; // Show loading spinner or message while preloading
//     }

//     const memoizedSections = Object.entries(groupedSections).map(([sectionName, items]) => {
//         const filteredItems = items.filter((item) =>
//             [item.Name, item.Description, item.Price, item.Menu_Title].some(field =>
//                 field?.toLowerCase().includes(searchTerm.toLowerCase())
//             )
//         );
//         return [sectionName, filteredItems] as [string, MenuItem[]];
//     }).filter(([, items]) => items.length > 0);

//     return (
//         <div className={styles.container}
//             style={{

//                 // backgroundImage: backgroundImages ?? undefined,
//                 // backgroundSize: "cover", // Ensures the image covers the entire area
//                 // backgroundRepeat: "no-repeat", // Prevents repeating the image
//                 // backgroundPosition: "center", // Centers the image
//             }}
//         >
//             <header className={styles.header}>
//                 <div className={styles.logo}>
//                     {iconURL ? (
//                         <Logo
//                             logoUrl={iconURL}
//                             namecompanies={namecompanies}
//                         />
//                     ) : (
//                         <div>No logo available</div>  // Puedes mostrar un mensaje si no hay logo
//                     )}
//                 </div>
//                 <div className={styles.searchContainer}>
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
//                     <div
//                         key={sectionName}
//                         className={styles.section}
//                     // onMouseEnter={() => handleSectionEnter(sectionName)}
//                     // onMouseLeave={handleSectionLeave}
//                     >
//                         <div className={styles.sectionHeader}>
//                             <div className={styles.sectionTitle}>{sectionName}</div>
//                         </div>
//                         <div className={styles.sectionItems}>
//                             {items?.map((item: MenuItem, index: number) => (
//                                 <div
//                                     key={`${sectionName}-${item?.Item_id}-${index}`}
//                                     className={styles.menuItem}


//                                 >
//                                     {/* <div className={styles.itemImage} >
//                                         <Image
//                                             src={`${item.Item_Image}`}
//                                             alt={item?.Name || "Image"}
//                                             width={100}
//                                             height={100}
//                                             priority
//                                             className={styles.itemImage}
//                                         />
//                                     </div> */}
//                                     <div className={styles.itemInfo}>
//                                         <h2>{item?.Name}</h2>
//                                         <div>
//                                             <div>{item?.Description}</div>
//                                             <div className={styles.price}>{`$${item.Price}`}</div>
//                                         </div>

//                                     </div>

//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </main>
//             <footer className={styles.footer}>

//             </footer>
//         </div>
//     );
// }

// export default MenuFifTeen;




import Logo from "@/components/Logo/Logo"
import type React from "react"
import { useEffect, useState } from "react"
import styles from "./MenuFifteen.module.css"

interface MenuItem {
  Item_id: string
  Name: string
  Description: string
  Price: string | number
  Menu_Title: string
}

interface MenuProps {
  menuData: any
  groupedSections: { [key: string]: MenuItem[] }
  backgroundImages: any
  namecompanies: string
  Promotion: any
  Info: any
  schedules: any
  config: any[]
}

interface ConfigType {
  IconBrand: string
  // Add other properties as needed
}

const MenuFifTeen: React.FC<MenuProps> = (props) => {
  const { menuData, groupedSections, backgroundImages, namecompanies, Promotion, Info, schedules, config } = props

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

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          {iconURL ? <Logo logoUrl={iconURL} namecompanies={namecompanies} /> : <div>No logo available</div>}
        </div>
        <div className={styles.searchContainer}>
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
          <div key={sectionName} className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>{sectionName}</div>
            </div>
            <div className={styles.sectionItems}>
              {items?.map((item: MenuItem, index: number) => (
                <div key={`${sectionName}-${item?.Item_id}-${index}`} className={styles.menuItem}>
                  <div className={styles.itemInfo}>
                    <h2>{item?.Name}</h2>
                    <div className={styles.itemDetails}>
                      <div className={styles.itemDescription}>{item?.Description}</div>
                      <div className={styles.price}>{`$${item.Price}`}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <footer className={styles.footer}>{/* Add footer content if needed */}</footer>
    </div>
  )
}

export default MenuFifTeen

