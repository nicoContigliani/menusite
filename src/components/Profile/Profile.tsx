"use client"
import React from 'react'
import styles from './Profile.module.css'
import dynamic from 'next/dynamic';

const ProfileGrid = dynamic(() => import('../ProfileGridNew/ProfileGrid'), {
    loading: () => <span>Cargando...</span>, // Opcional: mensaje de carga mientras se carga el componente
    ssr: false, // Desactivar la renderización del lado del servidor (opcional)
}); const Profile = (props: any) => {
    const { dataResult, items, dataURlFirebase: { xlsxData }, paymentLevel } = props

    const dataMocks =
    {
        "Hoja1": [
            {
                "Menu_Title": "Pizza",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna Nico",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Pizza",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Pizza",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Pizza",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Pizza",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Pizza",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Pizza",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Pizza",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            },
            {
                "Menu_Title": "Cucina Italiana",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "segunda",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "17.50"
            }
        ],
        "Promotion": [
            {
                "Menu_Title": "Pizza Tropical",
                "Profile_Type": "profile_ten",
                "Primary_Color": "#33ffff",
                "Secondary_color": "#d2a700",
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=ffdb158e-64ee-4a8a-ad4b-1d5afcb44850",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
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
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=ffdb158e-64ee-4a8a-ad4b-1d5afcb44850",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
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
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=ffdb158e-64ee-4a8a-ad4b-1d5afcb44850",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
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
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=ffdb158e-64ee-4a8a-ad4b-1d5afcb44850",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
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
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=ffdb158e-64ee-4a8a-ad4b-1d5afcb44850",
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4e0809ce-64a4-4228-8b7a-f55e7c05943b",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "27.50",
                "profile": 1
            }
        ],
        "Config": [
            {
                "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=ffdb158e-64ee-4a8a-ad4b-1d5afcb44850",
                "IconBrand": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ficono.png?alt=media&token=cd67074c-c44a-4d8e-9a20-c49ff5e6ab86"
            }
        ],
        "Info": [
            {
                "phone": 54900000,
                "mail": "todo@gmail,com",
                "x": "http:algo.com",
                "instagram": "http:algo.com",
                "facebook": "http:algo.com",
                "web": "http:algo.com",
                "whatsapp": 5492222222,
                "ubication": "calle libertad 17"
            }
        ],
        "schedules": [
            {
                "day": "lunes",
                "servicehours": "8:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
            },
            {
                "day": "martes",
                "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
            },
            {
                "day": "miércoles",
                "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
            },
            {
                "day": "jueves",
                "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
            },
            {
                "day": "viernes",
                "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
            },
            {
                "day": "sábado",
                "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
            },
            {
                "day": "domingo",
                "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
            }
        ]
    }

    return (
        <div className={styles.container}>
            <ProfileGrid
                dataGeneral={xlsxData || dataMocks}
                namecompanies={"LLakaScript"}
                paymentLevel={paymentLevel}
            />
        </div>
    )
}

export default Profile