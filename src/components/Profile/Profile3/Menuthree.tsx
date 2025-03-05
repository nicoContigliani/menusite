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
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

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

const Menuone: React.FC<MenuProps> = (props) => {
    const { backgroundImages, config, groupedSections, groupedSectionpromotions, info, menuData, promotions, schedules } = props
    const [searchTerm, setSearchTerm] = useState("")
    const [iconURL, setIconURL] = useState<string>("")
    const [namecompanies, setNamecompanies] = useState<string>('')

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

    useLayoutEffect(() => {
        if (typeof window !== "undefined") {
            const data = window.location.href
            setNamecompanies(extractLastSegment(data))
        }
    }, [])

    const { sectionTimes, handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies)

    useEffect(() => {
        if (config?.length) {
            setIconURL(config[0].IconBrand || "")
        }
    }, [config])


    const memoizedSectionsPromotions = (groupedSectionpromotions ? Object.entries(groupedSectionpromotions) : [])
        .map(([sectionName, items]) => {
            const filteredItems = items.filter(
                (item: any) =>
                    // Check if any of the fields match the search term (case-insensitive)
                    [item.Name, item.Description, item.Menu_Title, item.Section].some(
                        (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
                    ) ||
                    // Additional check for Price field if it's a string
                    (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
            )
            return [sectionName, filteredItems] as [string, MenuItem[]]
        })
        .filter(([, items]) => items.length > 0)





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

    // Función auxiliar para generar el identificador único
    const getElementId = (sectionName: string, index: number, itemName: string) => {
        return `${sectionName}-${index}-${itemName}`;
    };

    return (
        <Grid container spacing={0}
            data-cy="empresa-page-menu"
        >
            <Grid item xs={12}>
                <div
                    className={styles.container}
                    style={{
                        backgroundImage: backgroundImages || "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed", // Fija el fondo para que no se mueva

                    }}
                >
                    <header className={styles.header}>
                        <Grid container alignItems="center" spacing={0}>
                            <Grid item xs={12} md={4} onMouseEnter={() => handleSectionEnter("logo")}>
                                {iconURL && (
                                    <Logo
                                        namecompanies={namecompanies}
                                        logoUrl={iconURL}
                                        size={isMobile ? 100 : 150}
                                        fontSize={isMobile ? "30px" : "40px"}
                                        fontWeight="700"
                                        color="#ffffff"
                                        fontFamily="Arial, sans-serif"
                                        data-cy="Logo"
                                    />
                                )}
                            </Grid>
                            <Grid item xs={12} md={4} onMouseEnter={() => handleSectionEnter("info")}>
                                {info && (
                                    <Info
                                        info={info}
                                        fontSize={isMobile ? "12px" : "14px"}
                                        fontWeight="500"
                                        color="#dddddd"
                                        fontFamily="Helvetica, sans-serif"
                                        data-cy="Info"

                                    />
                                )}
                            </Grid>
                            <Grid item xs={12} md={4} onMouseEnter={() => handleSectionEnter("search")}>
                                <input
                                    type="text"
                                    className={styles.searchInput}
                                    placeholder="Buscar en el menú..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    data-cy="Serch"
                                    style={{
                                        color: 'white', // Color del texto
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.75)', // Sombra del texto
                                    }} />
                            </Grid>
                        </Grid>
                    </header>



                    <main className={styles.main}>
                        {
                            memoizedSectionsPromotions.length>0 &&
                            <div className={styles.sectionTitle}>
                                <h5 className={styles.titleStructure}>Promoción</h5>
                            </div>
                        }
                        {memoizedSectionsPromotions.map(([sectionName, items]) => (
                            <Grid
                                key={sectionName}
                                item
                                xs={12}
                                data-section={sectionName}
                                className={styles.section}
                                onMouseEnter={() => handleSectionEnter(sectionName)}
                                onMouseLeave={() => handleSectionLeave(sectionName)}
                                data-cy={sectionName}

                            >
                                <div className={styles.sectionHeader}>
                                    <h2>{sectionName}</h2>
                                </div>
                                <Grid container spacing={2}>
                                    {items.map((item, index) => {
                                        const elementId = getElementId(sectionName, index, item.Name); // Generar el identificador único
                                        return (
                                            <Grid
                                                key={elementId}
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                className={styles.menuItem}
                                                // onMouseEnter={() => handleSectionEnter(elementId)}

                                                onMouseLeave={() => handleSectionLeave(elementId)}
                                                onClick={() => handleClick(elementId, "menuItem")}
                                                data-cy={`${elementId}-menuItem`}
                                            >
                                                <div className={styles.cardImage}>
                                                    <Image
                                                        src={item.Item_Image}
                                                        alt={item.Name}
                                                        width={200}
                                                        height={200}
                                                        priority
                                                        style={{ objectFit: 'cover' }}
                                                        onClick={() => handleClick(elementId, "image")}
                                                        data-cy={`${elementId}-image`}
                                                    />
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
                                                        color="white"
                                                        data-cy={`Button-${item.Name}`}
                                                    // onClick={() => handleClick(elementId, "button")}
                                                    />
                                                </div>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        ))}
                    </main>



                    <main className={styles.main}>
                        {
                            memoizedSections.length>0 &&
                            <div className={styles.sectionTitle}>
                                <h5 className={styles.titleStructure}>Menú</h5>
                            </div>
                        }
                        {memoizedSections.map(([sectionName, items]) => (
                            <Grid
                                key={sectionName}
                                item
                                xs={12}
                                data-section={sectionName}
                                className={styles.section}
                                onMouseEnter={() => handleSectionEnter(sectionName)}
                                onMouseLeave={() => handleSectionLeave(sectionName)}
                                data-cy={sectionName}

                            >
                                <div className={styles.sectionHeader}>
                                    <h2>{sectionName}</h2>
                                </div>
                                <Grid container spacing={2}>
                                    {items.map((item, index) => {
                                        const elementId = getElementId(sectionName, index, item.Name); // Generar el identificador único
                                        return (
                                            <Grid
                                                key={elementId}
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                className={styles.menuItem}
                                                // onMouseEnter={() => handleSectionEnter(elementId)}

                                                onMouseLeave={() => handleSectionLeave(elementId)}
                                                onClick={() => handleClick(elementId, "menuItem")}
                                                data-cy={`${elementId}-menuItem`}
                                            >
                                                <div className={styles.cardImage}>
                                                    <Image
                                                        src={item.Item_Image}
                                                        alt={item.Name}
                                                        width={200}
                                                        height={200}
                                                        priority
                                                        style={{ objectFit: 'cover' }}
                                                        onClick={() => handleClick(elementId, "image")}
                                                        data-cy={`${elementId}-image`}
                                                    />
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
                                                        color="white"
                                                        data-cy={`Button-${item.Name}`}
                                                    // onClick={() => handleClick(elementId, "button")}
                                                    />
                                                </div>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </Grid>
                        ))}
                    </main>

                    <Grid item xs={12} className={styles.schedules} onMouseEnter={() => handleSectionEnter("schedules")}>
                        <Schedules
                            Schedules={schedules}
                            fontSize={isMobile ? "12px" : "14px"}
                            fontWeight="500"
                            color="#ddd"
                            fontFamily="Helvetica, sans-serif"
                            data-cy={`Schedules`}
                        />
                    </Grid>

                    <footer className={styles.footer}>
                        <p>{`© ${new Date().getFullYear()} LlakaScript`}</p>
                    </footer>
                </div>
            </Grid>
        </Grid>
    )
}

export default Menuone