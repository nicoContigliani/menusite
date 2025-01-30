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
                "Item_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Flasagna.jpg?alt=media&token=4bc1b1e2-4d7b-4a89-9447-de1fdf4febf2",
                "Section": "primera",
                "Item_id": 1,
                "Name": "Lasagna",
                "Description": "asaña clásica con carne y salsa bechamel",
                "Price": "27.50",
                "profile": 1
            }
        ],
        "Config": [{
            "Background_Image": "https://firebasestorage.googleapis.com/v0/b/llakascript.firebasestorage.app/o/companiesFolders%2FLlakaScript%2Ffondo.png?alt=media&token=f9cdc930-26a9-4604-a694-8c6fde0f01cc",
            "Item_imagen":""
        }]
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