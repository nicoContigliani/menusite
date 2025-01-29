"use client"
import React from 'react'
import styles from './Profile.module.css'
import dynamic from 'next/dynamic';

const ProfileGrid = dynamic(() => import('../ProfileGridNew/ProfileGrid'), {
    loading: () => <span>Cargando...</span>, // Opcional: mensaje de carga mientras se carga el componente
    ssr: false, // Desactivar la renderización del lado del servidor (opcional)
}); const Profile = (props: any) => {
    const { dataResult, items, dataURlFirebase: { xlsxData } } = props
    console.log("🚀 ~ ProfileGrid ~ items:", items)
    console.log("🚀 ~ ProfileGrid ~ dataResult:", dataResult)

    const dataMocks =
    {
        "Hoja1": [
            {
                "Menu_Title": "Pizza",
                "Profile_Type": "profile_ten",
                "Primary_Color": "#33ffff",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=be727240-8458-4f0f-9d40-920d8d8d7301",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza",
                "Profile_Type": "profile_three",
                "Primary_Color": "#33ffff",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza",
                "Profile_Type": "profile_three",
                "Primary_Color": "#33ffff",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza",
                "Profile_Type": "profile_three",
                "Primary_Color": "#33ffff",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Profile_Type": "profile_three",
                "Primary_Color": "#9b1c31",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Fbackground-food.jpg?alt=media&token=df2dce7e-4498-4eeb-90d7-7832690271f7",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50",
                "profile": 1
            }
        ],
        "Promotion": [
            {
                "Menu_Title": "Pizza Tropical",
                "Profile_Type": "profile_ten",
                "Primary_Color": "#33ffff",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=be727240-8458-4f0f-9d40-920d8d8d7301",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "27.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza Salchipapas",
                "Profile_Type": "profile_ten",
                "Primary_Color": "#33ffff",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=be727240-8458-4f0f-9d40-920d8d8d7301",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "27.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza Cuatro Quesos",
                "Profile_Type": "profile_ten",
                "Primary_Color": "#33ffff",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=be727240-8458-4f0f-9d40-920d8d8d7301",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "27.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza Cuatro Variada",
                "Profile_Type": "profile_ten",
                "Primary_Color": "#33ffff",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=be727240-8458-4f0f-9d40-920d8d8d7301",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "27.50",
                "profile": 1
            },
            {
                "Menu_Title": "Pizza con Palmitos",
                "Profile_Type": "profile_ten",
                "Primary_Color": "#33ffff",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=be727240-8458-4f0f-9d40-920d8d8d7301",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "27.50",
                "profile": 1
            }
        ]
    }

    return (
        <div className={styles.container}>

            <ProfileGrid
                dataGeneral={xlsxData || dataMocks}
                namecompanies={"LLakaScript"}
            />
        </div>
    )
}

export default Profile