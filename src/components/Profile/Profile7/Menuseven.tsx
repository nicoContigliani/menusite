// import Logo from "@/components/Logo/Logo"
// import type React from "react"
// import { useEffect, useLayoutEffect, useState } from "react"
// import styles from "./MenuNew.module.css"
// import Info from "@/components/Info/Info"
// import Schedules from "@/components/Schedules/Schedules"
// import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker"
// import Image from "next/image"
// import SelectComponent from "@/components/SelectComponent/SelectComponent"
// import { extractLastSegment } from "../../../../tools/urlService"

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
//     const { backgroundImages, config, groupedSections, info, menuData, promotions, schedules } = props

//     const getElementId = (sectionName: string, index: number, itemName: string) => {
//         return `${sectionName}-${index}-${itemName}`;
//     };

//     const [namecompanies, setNamecompanies] = useState<string>('')
//     useLayoutEffect(() => {
//         if (typeof window !== "undefined") {
//             // setFullUrl(window.location.href);
//             const data = window.location.href;
//             setNamecompanies(extractLastSegment(data))
//         }
//     }, []);

//     const { sectionTimes, handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies)



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
//         <div
//         className={styles.container}
//         style={{
//             backgroundImage: backgroundImages || "none",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",

//         }}
//     >
//             <header className={styles.header}>
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
//                     <div key={sectionName} className={styles.section}>
//                         <div className={styles.sectionHeader}>
//                             <div className={styles.sectionTitle}
//                                 onMouseEnter={() => handleSectionEnter(sectionName)}
//                                 onMouseLeave={() => handleSectionLeave(sectionName)}
//                             >
//                                 {sectionName}
//                             </div>
//                         </div>
//                         <div className={styles.sectionItems}>
//                             {items?.map((item: MenuItem, index: number) => (
//                                 <div key={`${sectionName}-${item?.Item_id}-${index}`} className={styles.menuItem}>
//                                     <div className={styles.itemInfo}
//                                         onMouseEnter={() => handleSectionEnter(getElementId(sectionName, index, item.Name))}
//                                         onClick={() => handleClick(getElementId(sectionName, index, item.Name), "menuItem")}                                    >
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
//                                         <div onMouseEnter={() => handleSectionEnter(`Button-${item.Name}`)}>
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
//             <div
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

import Logo from "@/components/Logo/Logo"
import type React from "react"
import { useEffect, useLayoutEffect, useState, useRef } from "react"
import styles from "./MenuNew.module.css"
import Info from "@/components/Info/Info"
import Schedules from "@/components/Schedules/Schedules"
import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker"
import Image from "next/image"
import SelectComponent from "@/components/SelectComponent/SelectComponent"
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
  paymentLevel:any
}

interface ConfigType {
  IconBrand: string
}

const Menuone: React.FC<MenuProps> = (props) => {
  const { backgroundImages, config, groupedSections, info, menuData, promotions, schedules,paymentLevel=0 } = props
  const parallaxRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<Map<string, HTMLDivElement>>(new Map())

  const getElementId = (sectionName: string, index: number, itemName: string) => {
    return `${sectionName}-${index}-${itemName}`
  }

  const [namecompanies, setNamecompanies] = useState<string>("")
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.location.href
      setNamecompanies(extractLastSegment(data))
    }
  }, [])

  const { sectionTimes, handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies)

  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [iconURL, setIconURL] = useState<string>("")
  const [scrollY, setScrollY] = useState(0)

  // Parallax effect for background
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll attachment effect for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.sectionVisible)
          } else {
            entry.target.classList.remove(styles.sectionVisible)
          }
        })
      },
      { threshold: 0.1 },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [loading, groupedSections])

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
    console.log("Order Info:", value)
  }

  // Set a default background image if the `backgroundImages` prop is not provided
  const backgroundImage = backgroundImages ? backgroundImages : "url('/default-background.jpg')" // Add your default image URL

  return (
    <div
      className={styles.container}
      ref={parallaxRef}
      style={{
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        // backgroundPosition: `center ${scrollY * 0.5}px`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // Fixed background for parallax
      }}
    >
      <header className={`${styles.header} ${styles.parallaxHeader}`}>
        <div
          className={styles.logo}
          onMouseEnter={() => handleSectionEnter("logo")}
          style={{
            transform: `translateY(${scrollY * 0.1}px)`, // Subtle parallax for logo
          }}
        >
          {iconURL ? (
            <Logo
              namecompanies="LlakaScript"
              logoUrl={iconURL}
              size={120}
              fontSize="22px"
              fontWeight="700"
              color="black"
              fontFamily="Arial, sans-serif"
            />
          ) : null}
        </div>

        <div className={styles.info} onMouseEnter={() => handleSectionEnter("info")}>
          {info ? (
            <Info
              info={info}
              fontSize="14px"
              fontWeight="500"
              color="#dddddd"
              fontFamily="Helvetica, sans-serif"
              containerClassName={styles.customInfoContainer}
              textClassName={styles.customInfoText}
            />
          ) : null}
        </div>

        <div
          className={styles.searchContainer}
          onMouseEnter={() => handleSectionEnter("search")}
          style={{
            transform: `translateY(${scrollY * 0.05}px)`, // Subtle parallax for search
          }}
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
        {memoizedSections?.map(([sectionName, items], sectionIndex) => (
          <div
            key={sectionName}
            className={`${styles.section} ${styles.scrollAttachment}`}
            ref={(el:any) => el && sectionsRef.current.set(sectionName, el)}
            style={{
              transform: `translateY(${Math.max(0, scrollY * 0.03 - sectionIndex * 20)}px)`,
              opacity: 1,
              transition: "transform 0.3s ease-out, opacity 0.5s ease-in",
            }}
          >
            <div className={styles.sectionHeader}>
              <div
                className={styles.sectionTitle}
                onMouseEnter={() => handleSectionEnter(sectionName)}
                onMouseLeave={() => handleSectionLeave(sectionName)}
              >
                {sectionName}
              </div>
            </div>
            <div className={styles.sectionItems}>
              {items?.map((item: MenuItem, index: number) => (
                <div
                  key={`${sectionName}-${item?.Item_id}-${index}`}
                  className={styles.menuItem}
                  style={{
                    transform: `translateY(${Math.max(0, scrollY * 0.01 - index * 5)}px)`,
                    transition: "transform 0.4s ease-out",
                    transitionDelay: `${index * 0.05}s`,
                  }}
                >
                  <div
                    className={styles.itemInfo}
                    onMouseEnter={() => handleSectionEnter(getElementId(sectionName, index, item.Name))}
                    onClick={() => handleClick(getElementId(sectionName, index, item.Name), "menuItem")}
                  >
                    <div className={styles.cardImage}>
                      <Image src={`${item.Item_Image}`} alt={item.Name} width={100} height={100} priority />
                    </div>
                    <div className={styles.itemDetails}>
                      <h2>{item?.Name}</h2>
                      <div className={styles.itemDescription}>{item?.Description}</div>
                      <div className={styles.price}>{`$${item.Price}`}</div>
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
                        paymentLevel={paymentLevel||0}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
      <div
        onMouseEnter={() => handleSectionEnter(`${schedules}`)}
        style={{
          transform: `translateY(${scrollY * -0.05}px)`, // Reverse parallax for schedules
        }}
      >
        <Schedules
          Schedules={schedules}
          fontSize="14px"
          fontWeight="500"
          color="#ddd"
          fontFamily="Helvetica, sans-serif"
          containerClassName={styles.customInfoContainer}
          textClassName={styles.customInfoText}
        />
      </div>
      <footer className={styles.footer}>
        <div>{`© ${new Date().getFullYear()} LlakaScript`}</div>
      </footer>
    </div>
  )
}

export default Menuone

