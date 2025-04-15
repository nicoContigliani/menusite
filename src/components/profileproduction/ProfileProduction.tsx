"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import dynamic from "next/dynamic"
import { type MenuItem, type DataGeneral, useMenuDataAternative } from "../../../hooks/useMenuData"
import styles from "./ProfileProduction.module.css"
import { reduceSeccions } from "@/services/reduceSeccions.services"

interface ProfileGridProps {
    dataGeneral: DataGeneral
    namecompanies: string
    paymentLevel: number
    setSelectedProfile: any
    setCurrent: any
}

interface DynamicProfile {
    name: string
    component: React.ComponentType<any>
}

const profiles = [
    { name: "Profile1", path: "Profile1/Menuone" },
    { name: "Profile2", path: "Profile2/Menutwo" },
    { name: "Profile3", path: "Profile3/Menuthree" },
    { name: "Profile4", path: "Profile4/Menufourd" },
    // { name: "Profile5", path: "Profile5/Menufive" },
    { name: "Profile6", path: "Profile6/Menusix" },
    // { name: "Profile7", path: "Profile7/Menuseven" },
    { name: "Profile8", path: "Profile8/Menueight" },
    { name: "Profile9", path: "Profile9/Menunine" },
    { name: "Profile10", path: "Profile10/Menuten" },
    { name: "Profile11", path: "Profile11/Menueleven" },
    { name: "Profile12", path: "Profile12/Menutwelve" },
    // { name: "Profile13", path: "Profile13/Menuthirteen" },
    // { name: "Profile14", path: "Profile14/MenuFourdTeen" },
    { name: "Profile15", path: "Profile15/MenuFifteen" },
    { name: "Profile16", path: "Profile16/MenuSixteen" },
    { name: "ProfileE1", path: "ProfileE1/Ecomerceone" },
    // ProfileGeneric is intentionally not included here
]

const dynamicProfiles: DynamicProfile[] = profiles?.map((profile) => ({
    name: profile.name,
    component: dynamic(() => import(`../../components/Profile/${profile.path}`), { ssr: false }),
}))

// Create the generic profile component separately
const GenericProfileComponent = dynamic(() => import("../../components/Profile/ProfileGeneric/ProfileGeneric"), {
    ssr: false,
})

const ProfileProduction = (props: any) => {
    const [dataGeneral, setDataGeneral] = useState<any | undefined>(undefined)
    const [selectedProfile, setSelectedProfile] = useState<string | null>(null)
    const [companyNames, setCompanyNames] = useState<string>("")

    useEffect(() => {
        const funtionasync = async () => {
            setDataGeneral(props?.menuItems ?? {})
            setSelectedProfile(props?.menuItems?.selectedProfile ?? null)
            setCompanyNames(props?.menuItems?.companyNames ?? "")
        }
        funtionasync()
    }, [props?.menuItems])

    const { menuData, backgroundImageSet, promotions, info, schedules, config, isReady, staff } = useMenuDataAternative(
        dataGeneral ?? { hoja: {} },
    )



    const groupedSections = useMemo(() => {
         return reduceSeccions(menuData)
    }, [menuData])

    const groupedSectionpromotions = useMemo(() => {
        return reduceSeccions(promotions)
    }, [promotions])



    // Find the selected profile component or use the generic profile as fallback
    const getProfileComponent = () => {
        // First try to find the selected profile in our dynamicProfiles array
        const selectedProfileData = dynamicProfiles.find((profile) => profile.name === selectedProfile)

        if (selectedProfileData) {
            return selectedProfileData.component
        }

        // If not found, use the generic profile component
        return GenericProfileComponent
    }

    const SelectedProfileComponent: any = getProfileComponent()

    const renderContent = () => {
        if (!isReady) {
            return <div className={styles.loading}>Cargando...</div>
        }

        if (!SelectedProfileComponent) {
            return <div className={styles.error}>Error al cargar el perfil</div>
        }

        return (
            <SelectedProfileComponent
                menuData={menuData}
                groupedSections={groupedSections}
                groupedSectionpromotions={groupedSectionpromotions}
                backgroundImages={backgroundImageSet}
                namecompanies={companyNames}
                promotions={promotions}
                info={info}
                schedules={schedules}
                config={config || []}
                profile={selectedProfile || "Generic"} // Pasa el perfil seleccionado
                staff={staff}
            />
        )
    }

    return <div className={styles.container}>{renderContent()}</div>
}

export default ProfileProduction