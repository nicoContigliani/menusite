"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import Image from "next/image"
import Logo from "@/components/Logo/Logo"
import Info from "@/components/Info/Info"
import Schedules from "@/components/Schedules/Schedules"
import SelectComponent from "@/components/SelectComponent/SelectComponent"
import { Divider } from "antd"
import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker"
import { extractLastSegment } from "../../../../tools/urlService"
import Grid from '@mui/material/Grid'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MenuSection from "./MainComponents/MainComponents"
import useDynamicStyles from "../../../../hooks/useDynamicStyles" // Importa el custom hook


// import styles from "../Profile3/MenuNew.module.css"

import stryless from '../Profile3/MenuNew.module.css'
import GenericSearch from "./GenericSerch/GenericSerch"


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
    profile?: string // Asegúrate de que `profile` esté definida como prop
}

interface ConfigType {
    IconBrand: string
}

const Menuone: React.FC<MenuProps> = (props) => {
    console.log("🚀 ~ props:", props)
    const { backgroundImages, config, groupedSections, groupedSectionpromotions, info, menuData, promotions, schedules, profile } = props
    const [searchTerm, setSearchTerm] = useState("")
    const [iconURL, setIconURL] = useState<string>("")
    const [namecompanies, setNamecompanies] = useState<string>('')

    // Función para seleccionar los estilos según el perfil
    const styles = useDynamicStyles(profile);

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
                    [item.Name, item.Description, item.Menu_Title, item.Section].some(
                        (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
                    ) ||
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


    return (
        <Grid  data-cy="empresa-page-menu">
            <div
                className={styles.container}
                style={{
                    backgroundImage: backgroundImages || "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    minHeight: "100vh",
                    width: "100%",
                }}
            >
                <header className={styles.header}>
                    <Grid 
                     container 
                     direction="column"  // Siempre en columna
                     alignItems="center"
                     justifyContent="center"
                     spacing={2} // Espaciado entre elementos
                    >
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
                        <Grid
                            item
                            xs={12}
                            md={4}
                            onMouseEnter={() => handleSectionEnter("info")}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
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

                        <Grid  item xs={12} md={4} onMouseEnter={() => handleSectionEnter("search")}>
                            <GenericSearch value={searchTerm} onChange={setSearchTerm} profile={profile} />
                        </Grid>
                    </Grid>
                </header>

                <MenuSection
                    sections={memoizedSectionsPromotions}
                    title="Promoción"
                    handleSectionEnter={handleSectionEnter}
                    handleSectionLeave={handleSectionLeave}
                    handleClick={handleClick}
                    handleChange={handleChange}
                    profile={profile}
                />
                <MenuSection
                    sections={memoizedSections}
                    title="Menú"
                    handleSectionEnter={handleSectionEnter}
                    handleSectionLeave={handleSectionLeave}
                    handleClick={handleClick}
                    handleChange={handleChange}
                    profile={profile}

                />

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
    )
}

export default Menuone