// "use client"

// import type React from "react"
// import { useEffect, useLayoutEffect, useState } from "react"
// import Image from "next/image"
// import Logo from "@/components/Logo/Logo"
// import Info from "@/components/Info/Info"
// import Schedules from "@/components/Schedules/Schedules"
// import SelectComponent from "@/components/SelectComponent/SelectComponent"
// import styles from "./MenuNew.module.css"
// import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker"
// import { extractLastSegment } from "../../../../tools/urlService"

// interface MenuItem {
//   Item_id: string
//   Name: string
//   Description: string
//   Price: string | number
//   Menu_Title: string
//   Item_Image: string
// }

// interface MenuProps {
//   menuData: any
//   groupedSections: { [key: string]: MenuItem[] }
//   groupedSectionpromotions: { [key: string]: MenuItem[] }
//   backgroundImages: any
//   namecompanies: string
//   promotions: any
//   info: any
//   schedules: any
//   config: any[]
// }

// const Menuone: React.FC<MenuProps> = (props) => {
//   console.log("props", props)
//   const { backgroundImages, config, groupedSections, groupedSectionpromotions, info, menuData, promotions, schedules } = props
//   const [searchTerm, setSearchTerm] = useState("")
//   const [iconURL, setIconURL] = useState<string>("")
//   const [namecompanies, setNamecompanies] = useState<string>("")
//   const [isMobile, setIsMobile] = useState(false)
//   const [isSmallScreen, setIsSmallScreen] = useState(false)

//   useLayoutEffect(() => {
//     if (typeof window !== "undefined") {
//       const data = window.location.href
//       setNamecompanies(extractLastSegment(data))

//       const handleResize = () => {
//         setIsMobile(window.innerWidth <= 768)
//         setIsSmallScreen(window.innerWidth <= 480)
//       }

//       handleResize()
//       window.addEventListener("resize", handleResize)
//       return () => window.removeEventListener("resize", handleResize)
//     }
//   }, [])

//   const { handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies)

//   useEffect(() => {
//     if (config?.length) {
//       setIconURL(config[0].IconBrand || "")
//     }
//   }, [config])

//   const memoizedSectionsPromotions = (groupedSectionpromotions ? Object.entries(groupedSectionpromotions) : [])
//     .map(([sectionName, items]) => {
//       const filteredItems = items.filter(
//         (item: any) =>
//           [item.Name, item.Description, item.Menu_Title, item.Section].some(
//             (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
//           ) ||
//           (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
//       )
//       return [sectionName, filteredItems] as [string, MenuItem[]]
//     })
//     .filter(([, items]) => items.length > 0)

//   const memoizedSections = Object.entries(groupedSections)
//     .map(([sectionName, items]) => {
//       const filteredItems = items.filter(
//         (item) =>
//           [item.Name, item.Description, item.Menu_Title].some(
//             (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
//           ) ||
//           (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
//       )
//       return [sectionName, filteredItems] as [string, MenuItem[]]
//     })
//     .filter(([, items]) => items.length > 0)

//   const handleChange = (value: { inputValue: string; clarification: string }) => {
//     console.log("Order Info:", value)
//   }

//   const getElementId = (sectionName: string, index: number, itemName: string) => {
//     return `${sectionName}-${index}-${itemName}`
//   }

//   const renderMenuItem = (item: MenuItem, sectionName: string, index: number) => {
//     const elementId = getElementId(sectionName, index, item.Name)

//     return (
//       <div
//         key={elementId}
//         className={styles.menuItem}
//         onMouseLeave={() => handleSectionLeave(elementId)}
//         onClick={() => handleClick(elementId, "menuItem")}
//         data-cy={`${elementId}-menuItem`}
//       >
//         <div className={styles.cardImage}>
//           <Image
//             src={item.Item_Image || "/placeholder.svg"}
//             alt={item.Name}
//             width={isSmallScreen ? 60 : 120}
//             height={isSmallScreen ? 40 : 80}
//             priority
//             style={{ objectFit: "cover", width: "100%", height: "100%" }}
//             onClick={() => handleClick(elementId, "image")}
//             data-cy={`${elementId}-image`}
//           />
//         </div>
//         <div className={styles.itemDetails}>
//           <h2 title={item.Name}>{item.Name}</h2>
//           {!isSmallScreen && (
//             <p className={styles.itemDescription} title={item.Description}>
//               {item.Description}
//             </p>
//           )}
//           <p className={styles.price}>{`$${item.Price}`}</p>
//         </div>
//         {/* {!isSmallScreen && ( */}
//         <div onMouseEnter={() => handleSectionEnter(`Button-${item.Name}`)}>
//           <SelectComponent
//             orderdescription={[]}
//             size="small"
//             delivery={(info[0]?.delivery)|| false}
//             takeaway={(info[0]?.takeaway)|| false}
//             Dinein={(info[0]?.Dinein) || true}
//             onChange={handleChange}
//             value="someValue"
//             color="white"
//             data-cy={`Button-${item.Name}`}
//           />

//         </div>
//         {/* )} */}
//       </div>
//     )
//   }

//   return (
//     <div
//       className={styles.container}
//       style={{
//         backgroundImage: backgroundImages || "none",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//       data-cy="empresa-page-menu"
//     >
//       <header className={styles.header}>
//         <div onMouseEnter={() => handleSectionEnter("logo")}>
//           {iconURL && (
//             <Logo
//               namecompanies={namecompanies}
//               logoUrl={iconURL}
//               size={isMobile ? 80 : 100}
//               fontSize={isMobile ? "24px" : "30px"}
//               fontWeight="700"
//               color="#ffffff"
//               fontFamily="Arial, sans-serif"
//               data-cy="Logo"
//             />
//           )}
//         </div>
//         <div onMouseEnter={() => handleSectionEnter("info")}>
//           {info && (
//             <Info
//               info={info}
//               fontSize={isMobile ? "11px" : "13px"}
//               fontWeight="500"
//               color="#dddddd"
//               fontFamily="Helvetica, sans-serif"
//               data-cy="Info"
//             />
//           )}
//         </div>
//         <div onMouseEnter={() => handleSectionEnter("search")}>
//           <input
//             type="text"
//             className={styles.searchInput}
//             placeholder="Buscar en el menú..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             data-cy="Search"
//           />
//         </div>
//       </header>

//       {memoizedSectionsPromotions.length > 0 && (
//         <div className={styles.sectionTitle}>
//           <h5 className={styles.titleStructure}>Promoción</h5>
//         </div>
//       )}

//       <main className={styles.main}>
//         {memoizedSectionsPromotions.map(([sectionName, items]) => (
//           <section
//             key={sectionName}
//             data-section={sectionName}
//             className={styles.section}
//             onMouseEnter={() => handleSectionEnter(sectionName)}
//             onMouseLeave={() => handleSectionLeave(sectionName)}
//             data-cy={sectionName}
//           >
//             <div className={styles.sectionHeader}>
//               <h2>{sectionName}</h2>
//             </div>
//             <div>{items.map((item, index) => renderMenuItem(item, sectionName, index))}</div>
//           </section>
//         ))}
//       </main>

//       {memoizedSections.length > 0 && (
//         <div className={styles.sectionTitle}>
//           <h5 className={styles.titleStructure}>Menú</h5>
//         </div>
//       )}

//       <main className={styles.main}>
//         {memoizedSections.map(([sectionName, items]) => (
//           <section
//             key={sectionName}
//             data-section={sectionName}
//             className={styles.section}
//             onMouseEnter={() => handleSectionEnter(sectionName)}
//             onMouseLeave={() => handleSectionLeave(sectionName)}
//             data-cy={sectionName}
//           >
//             <div className={styles.sectionHeader}>
//               <h2>{sectionName}</h2>
//             </div>
//             <div>{items.map((item, index) => renderMenuItem(item, sectionName, index))}</div>
//           </section>
//         ))}
//       </main>

//       <div className={styles.schedules} onMouseEnter={() => handleSectionEnter("schedules")}>
//         <Schedules
//           Schedules={schedules}
//           fontSize={isMobile ? "11px" : "13px"}
//           fontWeight="500"
//           color="#ddd"
//           fontFamily="Helvetica, sans-serif"
//           data-cy={`Schedules`}
//         />
//       </div>

//       <footer className={styles.footer}>
//         <p>{`© ${new Date().getFullYear()} LlakaScript`}</p>
//       </footer>
//     </div>
//   )
// }

// export default Menuone







// "use client"

// import type React from "react"
// import { useEffect, useLayoutEffect, useState } from "react"
// import Image from "next/image"
// import Logo from "@/components/Logo/Logo"
// import Info from "@/components/Info/Info"
// import Schedules from "@/components/Schedules/Schedules"
// import SelectComponent from "@/components/SelectComponent/SelectComponent"
// import styles from "./MenuNew.module.css"
// import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker"
// import { extractLastSegment } from "../../../../tools/urlService"
// import MoreInfo from "@/components/moreInfo/MoreInfo"

// interface MenuItem {
//   Item_id: string
//   Name: string
//   Description: string
//   Price: string | number
//   Menu_Title: string
//   Item_Image: string
// }

// interface MenuProps {
//   menuData: any
//   groupedSections: { [key: string]: MenuItem[] }
//   groupedSectionpromotions: { [key: string]: MenuItem[] }
//   backgroundImages: any
//   namecompanies: string
//   promotions: any
//   info: any
//   schedules: any
//   config: any[]
// }

// const Menuone: React.FC<MenuProps> = (props) => {
//   const { backgroundImages, config, groupedSections, groupedSectionpromotions, info, menuData, promotions, schedules } = props
//   const [searchTerm, setSearchTerm] = useState("")
//   const [iconURL, setIconURL] = useState<string>("")
//   const [namecompanies, setNamecompanies] = useState<string>("")
//   const [isMobile, setIsMobile] = useState(false)
//   const [isSmallScreen, setIsSmallScreen] = useState(false)



//   useLayoutEffect(() => {
//     if (typeof window !== "undefined") {
//       const data = window.location.href
//       setNamecompanies(extractLastSegment(data))

//       const handleResize = () => {
//         setIsMobile(window.innerWidth <= 768)
//         setIsSmallScreen(window.innerWidth <= 480)
//       }

//       handleResize()
//       window.addEventListener("resize", handleResize)
//       return () => window.removeEventListener("resize", handleResize)
//     }
//   }, [])

//   const { handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies)

//   useEffect(() => {
//     if (config?.length) {
//       setIconURL(config[0].IconBrand || "")
//     }
//   }, [config])

//   const memoizedSectionsPromotions = (groupedSectionpromotions ? Object.entries(groupedSectionpromotions) : [])
//     .map(([sectionName, items]) => {
//       const filteredItems = items.filter(
//         (item: any) =>
//           [item.Name, item.Description, item.Menu_Title, item.Section].some(
//             (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
//           ) ||
//           (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
//       )
//       return [sectionName, filteredItems] as [string, MenuItem[]]
//     })
//     .filter(([, items]) => items.length > 0)

//   const memoizedSections = Object.entries(groupedSections)
//     .map(([sectionName, items]) => {
//       const filteredItems = items.filter(
//         (item) =>
//           [item.Name, item.Description, item.Menu_Title].some(
//             (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
//           ) ||
//           (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
//       )
//       return [sectionName, filteredItems] as [string, MenuItem[]]
//     })
//     .filter(([, items]) => items.length > 0)

//   const handleChange = (value: { inputValue: string; clarification: string }) => {
//     console.log("Order Info:", value)
//   }

//   const getElementId = (sectionName: string, index: number, itemName: string) => {
//     return `${sectionName}-${index}-${itemName}`
//   }

//   const renderMenuItem = (item: MenuItem, sectionName: string, index: number) => {
//     const elementId = getElementId(sectionName, index, item.Name)

//     return (
//       <div
//         key={elementId}
//         className={styles.menuItem}
//         onMouseLeave={() => handleSectionLeave(elementId)}
//         onClick={() => handleClick(elementId, "menuItem")}
//         data-cy={`${elementId}-menuItem`}
//       >
//         <div className={styles.cardImage}>
//           <Image
//             src={item.Item_Image || "/placeholder.svg"}
//             alt={item.Name}
//             width={isSmallScreen ? 60 : 120}
//             height={isSmallScreen ? 40 : 80}
//             priority
//             style={{ objectFit: "cover", width: "100%", height: "100%" }}
//             onClick={() => handleClick(elementId, "image")}
//             data-cy={`${elementId}-image`}
//           />
//         </div>
//         <div className={styles.itemDetails}>
//           <h2 title={item.Name}>{item.Name}</h2>
//           {/* Mostrar la descripción en móviles */}
//           <div
//             className={styles.itemDescription}
//             title={item.Description}
//             style={{
//               fontSize: isSmallScreen ? "12px" : "14px", // Tamaño de fuente más pequeño en móviles
//               maxHeight: isSmallScreen ? "3.6em" : "none", // Limitar altura en móviles
//               overflow: "hidden", // Ocultar texto que excede el límite
//               textOverflow: "ellipsis",
//               // Mostrar puntos suspensivos si el texto es demasiado largo
//               display: "-webkit-box",
//               WebkitLineClamp: isSmallScreen ? 2 : "none", // Limitar a 2 líneas en móviles
//               WebkitBoxOrient: "vertical",
//             }}
//           >
//             {item.Description}
//           </div>
//           <p className={styles.price}>{`$${item.Price}`}</p>
//           <MoreInfo />
//         </div>
//         {/* Mostrar el botón en móviles */}
//         <div onMouseEnter={() => handleSectionEnter(`Button-${item.Name}`)}>
//           <SelectComponent
//             orderdescription={[]}
//             size="small"
//             delivery={info[0]?.delivery || false}
//             takeaway={info[0]?.takeaway || false}
//             Dinein={info[0]?.Dinein || true}
//             onChange={handleChange}
//             value="someValue"
//             color="white"
//             data-cy={`Button-${item.Name}`}
//           />
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div
//       className={styles.container}
//       style={{
//         backgroundImage: backgroundImages || "none",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//       data-cy="empresa-page-menu"
//     >
//       <header className={styles.header}>
//         <div onMouseEnter={() => handleSectionEnter("logo")}>
//           {iconURL && (
//             <Logo
//               namecompanies={namecompanies}
//               logoUrl={iconURL}
//               size={isMobile ? 80 : 100}
//               fontSize={isMobile ? "24px" : "30px"}
//               fontWeight="700"
//               color="#ffffff"
//               fontFamily="Arial, sans-serif"
//               data-cy="Logo"
//             />
//           )}
//         </div>
//         <div onMouseEnter={() => handleSectionEnter("info")}>
//           {info && (
//             <Info
//               info={info}
//               fontSize={isMobile ? "11px" : "13px"}
//               fontWeight="500"
//               color="#dddddd"
//               fontFamily="Helvetica, sans-serif"
//               data-cy="Info"
//             />
//           )}
//         </div>
//         <div onMouseEnter={() => handleSectionEnter("search")}>
//           <input
//             type="text"
//             className={styles.searchInput}
//             placeholder="Buscar en el menú..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             data-cy="Search"
//           />
//         </div>
//       </header>

//       {memoizedSectionsPromotions.length > 0 && (
//         <div className={styles.sectionTitle}>
//           <h5 className={styles.titleStructure}>Promoción</h5>
//         </div>
//       )}

//       <main className={styles.main}>
//         {memoizedSectionsPromotions.map(([sectionName, items]) => (
//           <section
//             key={sectionName}
//             data-section={sectionName}
//             className={styles.section}
//             onMouseEnter={() => handleSectionEnter(sectionName)}
//             onMouseLeave={() => handleSectionLeave(sectionName)}
//             data-cy={sectionName}
//           >
//             <div className={styles.sectionHeader}>
//               <h2>{sectionName}</h2>
//             </div>
//             <div>{items.map((item, index) => renderMenuItem(item, sectionName, index))}</div>
//           </section>
//         ))}
//       </main>

//       {memoizedSections.length > 0 && (
//         <div className={styles.sectionTitle}>
//           <h5 className={styles.titleStructure}>Menú</h5>
//         </div>
//       )}

//       <main className={styles.main}>
//         {memoizedSections.map(([sectionName, items]) => (
//           <section
//             key={sectionName}
//             data-section={sectionName}
//             className={styles.section}
//             onMouseEnter={() => handleSectionEnter(sectionName)}
//             onMouseLeave={() => handleSectionLeave(sectionName)}
//             data-cy={sectionName}
//           >
//             <div className={styles.sectionHeader}>
//               <h2>{sectionName}</h2>
//             </div>
//             <div>{items.map((item, index) => renderMenuItem(item, sectionName, index))}</div>
//           </section>
//         ))}
//       </main>

//       <div className={styles.schedules} onMouseEnter={() => handleSectionEnter("schedules")}>
//         <Schedules
//           Schedules={schedules}
//           fontSize={isMobile ? "11px" : "13px"}
//           fontWeight="500"
//           color="#ddd"
//           fontFamily="Helvetica, sans-serif"
//           data-cy={`Schedules`}
//         />
//       </div>

//       <footer className={styles.footer}>
//         <p>{`© ${new Date().getFullYear()} LlakaScript`}</p>
//       </footer>
//     </div>
//   )
// }

// export default Menuone


"use client";

import type React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/components/Logo/Logo";
import Info from "@/components/Info/Info";
import Schedules from "@/components/Schedules/Schedules";
import SelectComponent from "@/components/SelectComponent/SelectComponent";
import styles from "./MenuNew.module.css";
import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker";
import { extractLastSegment } from "../../../../tools/urlService";
import MoreInfo from "@/components/moreInfo/MoreInfo";

interface MenuItem {
  Item_id: string;
  Name: string;
  Description: string;
  Price: string | number;
  Menu_Title: string;
  Item_Image: string;
}

interface MenuProps {
  menuData: any;
  groupedSections: { [key: string]: MenuItem[] };
  groupedSectionpromotions: { [key: string]: MenuItem[] };
  backgroundImages: any;
  namecompanies: string;
  promotions: any;
  info: any;
  schedules: any;
  config: any[];
  paymentLevel:any
}

const Menuone: React.FC<MenuProps> = (props) => {
  console.log("🚀 ~ props:", props)
  const { backgroundImages, config, groupedSections, groupedSectionpromotions, info, menuData, promotions, schedules,paymentLevel=0 } =
    props;
  const [searchTerm, setSearchTerm] = useState("");
  const [iconURL, setIconURL] = useState<string>("");
  const [namecompanies, setNamecompanies] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.location.href;
      setNamecompanies(extractLastSegment(data));

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        setIsSmallScreen(window.innerWidth <= 480);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const { handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies);

  useEffect(() => {
    if (config?.length) {
      setIconURL(config[0].IconBrand || "");
    }
  }, [config]);

  const memoizedSectionsPromotions = (groupedSectionpromotions ? Object.entries(groupedSectionpromotions) : [])
    .map(([sectionName, items]) => {
      const filteredItems = items.filter(
        (item: any) =>
          [item.Name, item.Description, item.Menu_Title, item.Section].some(
            (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
          ) ||
          (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
      );
      return [sectionName, filteredItems] as [string, MenuItem[]];
    })
    .filter(([, items]) => items.length > 0);

  const memoizedSections = Object.entries(groupedSections)
    .map(([sectionName, items]) => {
      const filteredItems = items.filter(
        (item) =>
          [item.Name, item.Description, item.Menu_Title].some(
            (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
          ) ||
          (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
      );
      return [sectionName, filteredItems] as [string, MenuItem[]];
    })
    .filter(([, items]) => items.length > 0);

  const handleChange = (value: { inputValue: string; clarification: string }) => {
    console.log("Order Info:", value);
  };

  const getElementId = (sectionName: string, index: number, itemName: string) => {
    return `${sectionName}-${index}-${itemName}`;
  };

  const renderMenuItem = (item: MenuItem, sectionName: string, index: number) => {
    const elementId = getElementId(sectionName, index, item.Name);

    return (
      <div
        key={elementId}
        className={styles.menuItem}
        onMouseLeave={() => handleSectionLeave(elementId)}
        onClick={() => handleClick(elementId, "menuItem")}
        data-cy={`${elementId}-menuItem`}
      >
        <div className={styles.cardImage}>
          <Image
            src={item.Item_Image || "/placeholder.svg"}
            alt={item.Name}
            width={isSmallScreen ? 60 : 120}
            height={isSmallScreen ? 40 : 80}
            priority
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            onClick={() => handleClick(elementId, "image")}
            data-cy={`${elementId}-image`}
          />
        </div>
        <div className={styles.itemDetails}>
          <h2 title={item.Name}>{item.Name}</h2>
          {/* Mostrar la descripción en móviles */}
          <div
            className={styles.itemDescription}
            title={item.Description}
            style={{
              fontSize: isSmallScreen ? "12px" : "14px",
              maxHeight: isSmallScreen ? "3.6em" : "none",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: isSmallScreen ? 2 : "none",
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.Description}
          </div>
          {/* Contenedor para precio y More Info */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center", // Alinear verticalmente
              marginTop: "8px", // Espacio entre la descripción y este contenedor
            }}
          >
            <p className={styles.price}>{`$${item.Price}`}</p>
            <MoreInfo 
             titleModal={item.Name}
             modalcontent={item.Description}
            />
          </div>
        </div>
        {/* Mostrar el botón en móviles */}
        <div onMouseEnter={() => handleSectionEnter(`Button-${item.Name}`)}>
          <SelectComponent
            orderdescription={[`${item.Name}: ${item.Description}   ${item.Price}` ]}
            size="small"
            delivery={info[0]?.delivery || false}
            takeaway={info[0]?.takeaway || false}
            Dinein={info[0]?.Dinein || true}
            onChange={handleChange}
            value="someValue"
            color="white"
            data-cy={`Button-${item.Name}`}
            paymentLevel={paymentLevel||0}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: backgroundImages || "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      data-cy="empresa-page-menu"
    >
      <header className={styles.header}>
        <div onMouseEnter={() => handleSectionEnter("logo")}>
          {iconURL && (
            <Logo
              namecompanies={namecompanies}
              logoUrl={iconURL}
              size={isMobile ? 80 : 100}
              fontSize={isMobile ? "24px" : "30px"}
              fontWeight="700"
              color="#ffffff"
              fontFamily="Arial, sans-serif"
              data-cy="Logo"
            />
          )}
        </div>
        <div onMouseEnter={() => handleSectionEnter("info")}>
          {info && (
            <Info
              info={info}
              fontSize={isMobile ? "11px" : "13px"}
              fontWeight="500"
              color="#dddddd"
              fontFamily="Helvetica, sans-serif"
              data-cy="Info"
            />
          )}
        </div>
        <div onMouseEnter={() => handleSectionEnter("search")}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar en el menú..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-cy="Search"
          />
        </div>
      </header>

      {memoizedSectionsPromotions.length > 0 && (
        <div className={styles.sectionTitle}>
          <h5 className={styles.titleStructure}>Promoción</h5>
        </div>
      )}

      <main className={styles.main}>
        {memoizedSectionsPromotions.map(([sectionName, items]) => (
          <section
            key={sectionName}
            data-section={sectionName}
            className={styles.section}
            onMouseEnter={() => handleSectionEnter(sectionName)}
            onMouseLeave={() => handleSectionLeave(sectionName)}
            data-cy={sectionName}
          >
            <div className={styles.sectionHeader}>
              <h2>{sectionName}</h2>
            </div>
            <div>{items.map((item, index) => renderMenuItem(item, sectionName, index))}</div>
          </section>
        ))}
      </main>

      {memoizedSections.length > 0 && (
        <div className={styles.sectionTitle}>
          <h5 className={styles.titleStructure}>Menú</h5>
        </div>
      )}

      <main className={styles.main}>
        {memoizedSections.map(([sectionName, items]) => (
          <section
            key={sectionName}
            data-section={sectionName}
            className={styles.section}
            onMouseEnter={() => handleSectionEnter(sectionName)}
            onMouseLeave={() => handleSectionLeave(sectionName)}
            data-cy={sectionName}
          >
            <div className={styles.sectionHeader}>
              <h2>{sectionName}</h2>
            </div>
            <div>{items.map((item, index) => renderMenuItem(item, sectionName, index))}</div>
          </section>
        ))}
      </main>

      <div className={styles.schedules} onMouseEnter={() => handleSectionEnter("schedules")}>
        <Schedules
          Schedules={schedules}
          fontSize={isMobile ? "11px" : "13px"}
          fontWeight="500"
          color="#ddd"
          fontFamily="Helvetica, sans-serif"
          data-cy={`Schedules`}
        />
      </div>

      <footer className={styles.footer}>
        <p>{`© ${new Date().getFullYear()} LlakaScript`}</p>
      </footer>
    </div>
  );
};

export default Menuone;