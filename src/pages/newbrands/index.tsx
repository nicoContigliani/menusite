// "use client";
// import dynamic from 'next/dynamic';
// import React, { use, useEffect, useMemo, useState } from 'react'
// import styles from './newbrands.module.css'
// import { Button, DescriptionsProps, Divider, TabsProps } from 'antd';
// import { FormaterDataItems } from '../../services/formaterDataItems.services';
// import { replaceImageUrls } from '../../services/UploadImageUrl.services';
// import StaffOfSystem from '@/components/StaffOfSystem/StaffOfSystem';
// import { mock } from 'node:test';
// import Header from '@/components/layout/header/Header';
// import { getLocalhostStorage } from '@/services/localstorage.services';
// import ModalComponents from '@/components/ModalComponents/ModalComponents';
// import Login from '@/components/Login/Login';

// const DescriptionComponent = dynamic(() => import('@/components/Description/Descriptions'), { ssr: false });
// const StepsComponent = dynamic(() => import('../../components/steps/Steps'), {
//   ssr: false
// });
// const Navbar = dynamic(() => import('@/components/Navbar/Navbar'));
// const DownloadFile = dynamic(() => import('@/components/DownloadFile/DownloadFile'));
// const UploadImageToStorage = dynamic(() => import('@/components/UploadImageToStorage/UploadImageToStorage'));
// const Profile = dynamic(() => import('@/components/Profile/Profile'));
// const Licence = dynamic(() => import('@/components/Licence/Licence'));

// interface DescriptionItem {
//   key: string;
//   label: string;
//   children: any;
// }

// const page = () => {
//   const [isLogin, setIsLogin] = useState(false)
//   const [openResponsive, setOpenResponsive] = useState(false);


//   const [current, setCurrent] = useState<number>(0);

//   const [showDownload, setShowDownload] = useState(false)
//   const [showUploadImageToStorage, setShowUploadImageToStorage] = useState(false)
//   const [showProfile, setShowProfile] = useState(false)
//   const [showLicence, setShowLicence] = useState(false)
//   const [showStaff, setShowStaff] = useState(false)

//   const [dataResult, setDataResult] = useState<any | any[] | undefined>()
//   const [dataURlSupabase, setDataURlSupabase] = useState<any | any[] | undefined>('')

//   const [uploadedFiles, setUploadedFiles] = useState<any | any[] | undefined>([])


//   const [selectedProfile, setSelectedProfile] = useState<string>("")

//   const [labelCheck, setLabelCheck] = useState<any>("Confirmar Condiciones")
//   const [checked, setChecked] = useState<boolean>(false);

//   const [paymentLevel, setPaymentLevel] = useState<number>(0)

//   const [items, setItems] = useState<any | any[] | undefined>([
//     {
//       title: 'Descargar Excel con el formato obligatorio',
//       description: "Es obligatorio ",
//     },
//     {
//       title: 'Ingreso de Archivo Excel e imagenes',
//       description: "Es obligatorio ",
//     },
//     {
//       title: 'Selección de perfil',
//       description: "El pefil ocupa la información del Excel",
//     },
//     {
//       title: 'Licncia de uso',
//       description: "Step 3",
//     },
//     {
//       title: 'Confirmación de usuarios y Creación',
//       description: "Step 4",
//     },
//   ]);

//   const servicesLicencesData = {
//     "planes": [
//       {
//         "nombre": "Plan Básico",
//         "duracion_prueba": 28,
//         "precio_mensual": 10000,
//         "caracteristicas": {
//           "diseno_menu": "Plantillas personalizables",
//           "gestion_productos": "50 productos",
//           "codigo_qr": "Estático",
//           "idiomas": "1 idioma",
//           "pedidos_online": "No incluido",
//           "reservas": "No incluido",
//           "pagos_online": "No incluido",
//           "analitica": "Informes básicos",
//           "fidelizacion": "No incluido",
//           "redes_sociales": "No incluido",
//           "soporte_tecnico": "Email",
//           "almacenamiento": "Limitado",
//           "usuarios_concurrentes": 1,
//           "capacitacion": "Guía online",
//           "actualizaciones": "Estándar"
//         }
//       },
//       {
//         "nombre": "Plan Intermedio",
//         "duracion_prueba": 45,
//         "precio_mensual": 20000,
//         "caracteristicas": {
//           "diseno_menu": "Diseño a medida",
//           "gestion_productos": "Productos ilimitados",
//           "codigo_qr": "Dinámico con seguimiento",
//           "idiomas": "3 idiomas con traducción automática",
//           "pedidos_online": "Integración con WhatsApp y plataformas",
//           "reservas": "Formulario de reservas",
//           "pagos_online": "Integración con Mercado Pago",
//           "analitica": "Datos de ventas y productos",
//           "fidelizacion": "Herramientas básicas",
//           "redes_sociales": "Opción de compartir menú",
//           "soporte_tecnico": "Chat y teléfono",
//           "almacenamiento": "Ampliado",
//           "usuarios_concurrentes": 3,
//           "capacitacion": "Videotutoriales personalizados",
//           "actualizaciones": "Prioritarias"
//         }
//       },
//       {
//         "nombre": "Plan Premium",
//         "duracion_prueba": 60,
//         "precio_mensual": 35000,
//         "caracteristicas": {
//           "diseno_menu": "Diseño interactivo con animaciones",
//           "gestion_productos": "Productos ilimitados con gestión de inventario y alérgenos",
//           "codigo_qr": "Múltiples códigos QR con promociones personalizadas",
//           "idiomas": "Idiomas ilimitados con menús específicos por idioma",
//           "pedidos_online": "Plataforma propia con personalización y branding",
//           "reservas": "Gestión completa de reservas con recordatorios",
//           "pagos_online": "Pasarela de pagos propia con múltiples opciones",
//           "analitica": "Analítica avanzada con segmentación y ROI",
//           "fidelizacion": "Programas personalizados con segmentación",
//           "redes_sociales": "Publicación automática de promociones",
//           "soporte_tecnico": "Soporte prioritario 24/7",
//           "almacenamiento": "Ilimitado",
//           "usuarios_concurrentes": 5,
//           "capacitacion": "Sesión online personalizada",
//           "actualizaciones": "VIP"
//         }
//       }
//     ]
//   }

//   const dataHoja1: DescriptionsProps['items'] = useMemo(() => {
//     return FormaterDataItems({
//       Menu_Title: "Título del menú. Ejemplo: 'Menú de La Trattoria'",
//       Background_Image: "URL de la imagen de fondo del menú. Ejemplo: 'https://ejemplo.com/fondo.jpg'",
//       profile: "Nombre del perfil o negocio. Ejemplo: 'Pizzeria Napoli'",
//       Section: "Título de una sección del menú. Ejemplo: 'Pastas', 'Ensaladas', 'Bebidas'",
//       Item_id: "ID único del ítem del menú. Ejemplo: 'a1b2c3d4-e5f6-7890-1234-567890abcdef'",
//       Name: "Nombre del ítem del menú. Ejemplo: 'Espagueti a la Boloñesa'",
//       Description: "Descripción del ítem del menú. Ejemplo: 'Espagueti con salsa boloñesa hecha en casa con carne de res y cerdo.'",
//       Price: "Precio del ítem del menú. Ejemplo: '12.50', '9.99'",
//       Item_Image: "URL de la imagen del ítem del menú. Ejemplo: 'https://ejemplo.com/espagueti.jpg'",
//       highlight: "Indica si el ítem está destacado. Ejemplos: 'true' (sí), 'false' (no)",
//       status: "Estado del ítem o del perfil. Ejemplos (para un ítem): 'disponible', 'no disponible', 'temporal'. Ejemplos (para un perfil): 'activo', 'inactivo', 'pendiente'"
//     });
//   }, []); // El array vacío de dependencias asegura que solo se ejecute una vez al montar el componente

//   const itemsTabs: any = [
//     {
//       key: '1',
//       label: 'Hoja 1',
//       children: <DescriptionComponent items={dataHoja1} />,
//     },
//     {
//       key: '2',
//       label: 'Promotions',
//       children: <DescriptionComponent items={dataHoja1} />,
//     },
//   ];

//   const carouselItems = [
//     { id: 1, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 1' },
//     { id: 2, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 2' },
//     { id: 3, imageUrl: '/resto/blacksheep.png?height=200&width=200', title: 'Slide 3' },
//     { id: 4, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 4' },
//     { id: 5, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 5' },
//   ];

//   const dataMocks = {
//     "Hoja1": [
//       {
//         "Menu_Title": "Pizza",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna Nico",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Pizza",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Pizza",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Pizza",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "segunda",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Pizza",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "segunda",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Pizza",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "segunda",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "segunda",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Pizza",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "segunda",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "segunda",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Pizza",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "segunda",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       },
//       {
//         "Menu_Title": "Cucina Italiana",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "segunda",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "17.50"
//       }
//     ],
//     "Promotion": [
//       {
//         "Menu_Title": "Pizza Tropical",
//         "Profile_Type": "profile_ten",
//         "Primary_Color": "#33ffff",
//         "Secondary_color": "#d2a700",
//         "Background_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "27.50",
//         "profile": 1
//       },
//       {
//         "Menu_Title": "Pizza Salchipapas",
//         "Profile_Type": "profile_ten",
//         "Primary_Color": "#33ffff",
//         "Secondary_color": "#d2a700",
//         "Background_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "27.50",
//         "profile": 1
//       },
//       {
//         "Menu_Title": "Pizza Cuatro Quesos",
//         "Profile_Type": "profile_ten",
//         "Primary_Color": "#33ffff",
//         "Secondary_color": "#d2a700",
//         "Background_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "27.50",
//         "profile": 1
//       },
//       {
//         "Menu_Title": "Pizza Cuatro Variada",
//         "Profile_Type": "profile_ten",
//         "Primary_Color": "#33ffff",
//         "Secondary_color": "#d2a700",
//         "Background_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "27.50",
//         "profile": 1
//       },
//       {
//         "Menu_Title": "Pizza con Palmitos",
//         "Profile_Type": "profile_ten",
//         "Primary_Color": "#33ffff",
//         "Secondary_color": "#d2a700",
//         "Background_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
//         "Item_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
//         "Section": "primera",
//         "Item_id": 1,
//         "Name": "Lasagna",
//         "Description": "asaña clásica con carne y salsa bechamel",
//         "Price": "27.50",
//         "profile": 1
//       }
//     ],
//     "Config": [
//       {
//         "Background_Image": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/italia.jpg",
//         "IconBrand": "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/icono.png"
//       }
//     ],
//     "Info": [
//       {
//         "phone": 54900000,
//         "mail": "todo@gmail,com",
//         "x": "http:algo.com",
//         "instagram": "http:algo.com",
//         "facebook": "http:algo.com",
//         "web": "http:algo.com",
//         "whatsapp": 5492222222,
//         "ubication": "calle libertad 17"
//       }
//     ],
//     "schedules": [
//       {
//         "day": "lunes",
//         "servicehours": "8:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
//       },
//       {
//         "day": "martes",
//         "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
//       },
//       {
//         "day": "miércoles",
//         "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
//       },
//       {
//         "day": "jueves",
//         "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
//       },
//       {
//         "day": "viernes",
//         "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
//       },
//       {
//         "day": "sábado",
//         "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
//       },
//       {
//         "day": "domingo",
//         "servicehours": "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  "
//       }
//     ],
//     "staff": [
//       {
//         "role": "owner",
//         "email": "nico.contigliani@gmail.com"
//       },
//       {
//         "role": "admin",
//         "email": "pedro.contigliani@gmail.com"
//       },
//       {
//         "role": "employees",
//         "email": "macarena.contigliani@gmail.com"
//       }
//     ]
//   }

//   useEffect(() => {
//     const storedData = getLocalhostStorage();
//     console.log("🚀 ~ useEffect ~ storedData:", storedData)
//     if (storedData.aud != null) {
//       const {
//         aud,
//         email,
//         access_token,
//         expires_at,
//         userid
//       } = storedData
//       console.log("🚀 ~ useEffect ~ aud:", aud)
//       if (storedData.aud != null) setIsLogin(true)
//       console.log("🚀 ~ useEffect ~ storedData.aud == null:", storedData.aud == null)
//       if (storedData.aud == null){ 
//         // setOpenResponsive(true)
//         setOpenResponsive(true)
//       };
//     }

//   }, [])




//   useEffect(() => {
//     switch (current) {
//       case 0:
//         setShowDownload(true)
//         setShowProfile(false)
//         setShowUploadImageToStorage(false)
//         setShowLicence(false)
//         setShowStaff(false)
//         break;
//       case 1:
//         setShowDownload(false)
//         setShowUploadImageToStorage(true)
//         setShowProfile(false)
//         setShowLicence(false)
//         setShowStaff(false)

//         break;
//       case 2:
//         setShowDownload(false)
//         setShowUploadImageToStorage(false)
//         setShowProfile(true)
//         setShowLicence(false)
//         setShowStaff(false)

//         break;
//       case 3:
//         setShowDownload(false)
//         setShowUploadImageToStorage(false)
//         setShowProfile(false)
//         setShowLicence(true)
//         setShowStaff(false)

//         break;
//       case 4:
//         setShowDownload(false)
//         setShowUploadImageToStorage(false)
//         setShowProfile(false)
//         setShowLicence(false)
//         setShowStaff(true)

//         break;
//       default:
//         break;
//     }


//   }, [current])

//   useEffect(() => {
//     setDataURlSupabase(dataResult)
//   }, [dataResult])


//   console.log("🚀 ~ useEffect ~ dataResult:", dataResult)



//   //TODO activar esto para produccion

//   // useEffect(() => {
//   //   if ([2, 3, 4].includes(current) && (!dataResult?.Hoja1 || !dataResult?.Config)) {
//   //     setCurrent(1);

//   //     setShowDownload(false);
//   //     setShowUploadImageToStorage(true);
//   //     setShowProfile(false);
//   //     setShowLicence(false);
//   //     setShowStaff(false);
//   //   }
//   // }, [current, dataResult]);

//   const handleCreate = () => {
//     console.log("Crear botón presionado");
//   };









//   return (
//     <div className={styles.main}>
//       <div className={styles.header}>
//         {/* <Button type="primary" onClick={() => setOpenResponsive(true)}>
//           Open Modal
//         </Button> */}
//         <ModalComponents
//           openResponsive={openResponsive}
//           setOpenResponsive={setOpenResponsive}
//         >
//           <Login
//             redirections={false}
//           />
//         </ModalComponents>


//         <Header
//           imagetodo={{
//             src: "/images/flama.png",
//             alt: "Flama",
//             width: 1600,
//             height: 1200,
//             quality: 100,
//           }}

//         />
//       </div>

//       <div className={styles.container}>

//         <div className={styles.steps}>
//           <Divider />
//           {
//             showProfile ?
//               <Navbar />
//               : null
//           }
//           <Divider />

//           <StepsComponent
//             items={items}
//             current={current}
//             setCurrent={setCurrent}
//           />
//         </div>
//         <div className={styles.body}>

//           {
//             showDownload ?
//               <DownloadFile
//                 itemsTabs={itemsTabs}
//                 setCurrent={setCurrent}
//                 servicesLicencesData={servicesLicencesData}

//               />
//               : null
//           }

//           {
//             showUploadImageToStorage ?
//               <UploadImageToStorage
//                 uploadedFiles={uploadedFiles}
//                 setUploadedFiles={setUploadedFiles}
//                 setCurrent={setCurrent}
//                 setDataResult={setDataResult}
//               />
//               : null
//           }
//           {
//             showProfile ?
//               <Profile
//                 dataResult={dataResult}
//                 items={carouselItems}
//                 paymentLevel={paymentLevel}
//                 setSelectedProfile={setSelectedProfile}
//                 setCurrent={setCurrent}
//                 dataMocks={dataMocks}

//               />
//               : null
//           }
//           {
//             showLicence ?
//               <Licence
//                 labelCheck={labelCheck}
//                 setLabelCheck={setLabelCheck}
//                 checked={checked}
//                 setChecked={setChecked}
//                 setCurrent={setCurrent}

//               />
//               : null
//           }

//           {
//             showStaff ?
//               <StaffOfSystem
//                 staffData={dataResult || dataMocks}

//               />
//               : null
//           }



//           <div>
//             {/* Botón de Crear */}
//             <div className={styles.buttonContainer}>
//               <Button type="primary" size="large" onClick={handleCreate}>
//                 Crear
//               </Button>
//             </div>
//           </div>


//         </div>
//       </div>
//     </div>
//   )
// }


// export default page





"use client"
import dynamic from "next/dynamic"
import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import styles from "./newbrands.module.css"
import { Button, type DescriptionsProps, Divider } from "antd"
import { FormaterDataItems } from "../../services/formaterDataItems.services"
import StaffOfSystem from "@/components/StaffOfSystem/StaffOfSystem"
import Header from "@/components/layout/header/Header"
import { getLocalhostStorage } from "@/services/localstorage.services"
import ModalComponents from "@/components/ModalComponents/ModalComponents"
import Login from "@/components/Login/Login"

const DescriptionComponent = dynamic(() => import("@/components/Description/Descriptions"), { ssr: false })
const StepsComponent = dynamic(() => import("../../components/steps/Steps"), {
  ssr: false,
})
const Navbar = dynamic(() => import("@/components/Navbar/Navbar"))
const DownloadFile = dynamic(() => import("@/components/DownloadFile/DownloadFile"))
const UploadImageToStorage = dynamic(() => import("@/components/UploadImageToStorage/UploadImageToStorage"))
const Profile = dynamic(() => import("@/components/Profile/Profile"))
const Licence = dynamic(() => import("@/components/Licence/Licence"))

interface DescriptionItem {
  key: string
  label: string
  children: any
}

const page = () => {
  const [isLogin, setIsLogin] = useState(false)
  const [openResponsive, setOpenResponsive] = useState(false)

  const [current, setCurrent] = useState<number>(0)

  const [showDownload, setShowDownload] = useState(false)
  const [showUploadImageToStorage, setShowUploadImageToStorage] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showLicence, setShowLicence] = useState(false)
  const [showStaff, setShowStaff] = useState(false)

  const [dataResult, setDataResult] = useState<any | any[] | undefined>()
  const [dataURlSupabase, setDataURlSupabase] = useState<any | any[] | undefined>("")

  const [uploadedFiles, setUploadedFiles] = useState<any | any[] | undefined>([])

  const [selectedProfile, setSelectedProfile] = useState<string>("")

  const [labelCheck, setLabelCheck] = useState<any>("Confirmar Condiciones")
  const [checked, setChecked] = useState<boolean>(false)

  const [paymentLevel, setPaymentLevel] = useState<number>(0)

  const [items, setItems] = useState<any | any[] | undefined>([
    {
      title: "Descargar Excel con el formato obligatorio",
      description: "Es obligatorio ",
    },
    {
      title: "Ingreso de Archivo Excel e imagenes",
      description: "Es obligatorio ",
    },
    {
      title: "Selección de perfil",
      description: "El pefil ocupa la información del Excel",
    },
    {
      title: "Licncia de uso",
      description: "Step 3",
    },
    {
      title: "Confirmación de usuarios y Creación",
      description: "Step 4",
    },
  ])

  const servicesLicencesData = {
    planes: [
      {
        nombre: "Plan Básico",
        duracion_prueba: 28,
        precio_mensual: 10000,
        caracteristicas: {
          diseno_menu: "Plantillas personalizables",
          gestion_productos: "50 productos",
          codigo_qr: "Estático",
          idiomas: "1 idioma",
          pedidos_online: "No incluido",
          reservas: "No incluido",
          pagos_online: "No incluido",
          analitica: "Informes básicos",
          fidelizacion: "No incluido",
          redes_sociales: "No incluido",
          soporte_tecnico: "Email",
          almacenamiento: "Limitado",
          usuarios_concurrentes: 1,
          capacitacion: "Guía online",
          actualizaciones: "Estándar",
        },
      },
      {
        nombre: "Plan Intermedio",
        duracion_prueba: 45,
        precio_mensual: 20000,
        caracteristicas: {
          diseno_menu: "Diseño a medida",
          gestion_productos: "Productos ilimitados",
          codigo_qr: "Dinámico con seguimiento",
          idiomas: "3 idiomas con traducción automática",
          pedidos_online: "Integración con WhatsApp y plataformas",
          reservas: "Formulario de reservas",
          pagos_online: "Integración con Mercado Pago",
          analitica: "Datos de ventas y productos",
          fidelizacion: "Herramientas básicas",
          redes_sociales: "Opción de compartir menú",
          soporte_tecnico: "Chat y teléfono",
          almacenamiento: "Ampliado",
          usuarios_concurrentes: 3,
          capacitacion: "Videotutoriales personalizados",
          actualizaciones: "Prioritarias",
        },
      },
      {
        nombre: "Plan Premium",
        duracion_prueba: 60,
        precio_mensual: 35000,
        caracteristicas: {
          diseno_menu: "Diseño interactivo con animaciones",
          gestion_productos: "Productos ilimitados con gestión de inventario y alérgenos",
          codigo_qr: "Múltiples códigos QR con promociones personalizadas",
          idiomas: "Idiomas ilimitados con menús específicos por idioma",
          pedidos_online: "Plataforma propia con personalización y branding",
          reservas: "Gestión completa de reservas con recordatorios",
          pagos_online: "Pasarela de pagos propia con múltiples opciones",
          analitica: "Analítica avanzada con segmentación y ROI",
          fidelizacion: "Programas personalizados con segmentación",
          redes_sociales: "Publicación automática de promociones",
          soporte_tecnico: "Soporte prioritario 24/7",
          almacenamiento: "Ilimitado",
          usuarios_concurrentes: 5,
          capacitacion: "Sesión online personalizada",
          actualizaciones: "VIP",
        },
      },
    ],
  }

  const dataHoja1: DescriptionsProps["items"] = useMemo(() => {
    return FormaterDataItems({
      Menu_Title: "Título del menú. Ejemplo: 'Menú de La Trattoria'",
      Background_Image: "URL de la imagen de fondo del menú. Ejemplo: 'https://ejemplo.com/fondo.jpg'",
      profile: "Nombre del perfil o negocio. Ejemplo: 'Pizzeria Napoli'",
      Section: "Título de una sección del menú. Ejemplo: 'Pastas', 'Ensaladas', 'Bebidas'",
      Item_id: "ID único del ítem del menú. Ejemplo: 'a1b2c3d4-e5f6-7890-1234-567890abcdef'",
      Name: "Nombre del ítem del menú. Ejemplo: 'Espagueti a la Boloñesa'",
      Description:
        "Descripción del ítem del menú. Ejemplo: 'Espagueti con salsa boloñesa hecha en casa con carne de res y cerdo.'",
      Price: "Precio del ítem del menú. Ejemplo: '12.50', '9.99'",
      Item_Image: "URL de la imagen del ítem del menú. Ejemplo: 'https://ejemplo.com/espagueti.jpg'",
      highlight: "Indica si el ítem está destacado. Ejemplos: 'true' (sí), 'false' (no)",
      status:
        "Estado del ítem o del perfil. Ejemplos (para un ítem): 'disponible', 'no disponible', 'temporal'. Ejemplos (para un perfil): 'activo', 'inactivo', 'pendiente'",
    })
  }, []) // El array vacío de dependencias asegura que solo se ejecute una vez al montar el componente

  const itemsTabs: any = [
    {
      key: "1",
      label: "Hoja 1",
      children: <DescriptionComponent items={dataHoja1} />,
    },
    {
      key: "2",
      label: "Promotions",
      children: <DescriptionComponent items={dataHoja1} />,
    },
  ]

  const carouselItems = [
    { id: 1, imageUrl: "/resto/pancho.png?height=200&width=300", title: "Slide 1" },
    { id: 2, imageUrl: "/resto/estacionpalero.png?height=200&width=300", title: "Slide 2" },
    { id: 3, imageUrl: "/resto/blacksheep.png?height=200&width=200", title: "Slide 3" },
    { id: 4, imageUrl: "/resto/pancho.png?height=200&width=300", title: "Slide 4" },
    { id: 5, imageUrl: "/resto/estacionpalero.png?height=200&width=300", title: "Slide 5" },
  ]

  const dataMocks = {
    Hoja1: [
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna Nico",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
    ],
    Promotion: [
      {
        Menu_Title: "Pizza Tropical",
        Profile_Type: "profile_ten",
        Primary_Color: "#33ffff",
        Secondary_color: "#d2a700",
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "27.50",
        profile: 1,
      },
      {
        Menu_Title: "Pizza Salchipapas",
        Profile_Type: "profile_ten",
        Primary_Color: "#33ffff",
        Secondary_color: "#d2a700",
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "27.50",
        profile: 1,
      },
      {
        Menu_Title: "Pizza Cuatro Quesos",
        Profile_Type: "profile_ten",
        Primary_Color: "#33ffff",
        Secondary_color: "#d2a700",
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "27.50",
        profile: 1,
      },
      {
        Menu_Title: "Pizza Cuatro Variada",
        Profile_Type: "profile_ten",
        Primary_Color: "#33ffff",
        Secondary_color: "#d2a700",
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "27.50",
        profile: 1,
      },
      {
        Menu_Title: "Pizza con Palmitos",
        Profile_Type: "profile_ten",
        Primary_Color: "#33ffff",
        Secondary_color: "#d2a700",
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "27.50",
        profile: 1,
      },
    ],
    Config: [
      {
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/italia.jpg",
        IconBrand:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/icono.png",
      },
    ],
    Info: [
      {
        phone: 54900000,
        mail: "todo@gmail,com",
        x: "http:algo.com",
        instagram: "http:algo.com",
        facebook: "http:algo.com",
        web: "http:algo.com",
        whatsapp: 5492222222,
        ubication: "calle libertad 17",
      },
    ],
    schedules: [
      {
        day: "lunes",
        servicehours: "8:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "martes",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "miércoles",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "jueves",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "viernes",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "sábado",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "domingo",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
    ],
    staff: [
      {
        role: "owner",
        email: "nico.contigliani@gmail.com",
      },
      {
        role: "admin",
        email: "pedro.contigliani@gmail.com",
      },
      {
        role: "employees",
        email: "macarena.contigliani@gmail.com",
      },
    ],
  }

  useEffect(() => {
    const storedData = getLocalhostStorage()
    console.log("🚀 ~ useEffect ~ storedData:", storedData)
    if (storedData.aud != null) {
      const { aud, email, access_token, expires_at, userid } = storedData
      console.log("🚀 ~ useEffect ~ aud:", aud)
      setIsLogin(true)
    } else {
      setOpenResponsive(true)
    }
  }, [])

  useEffect(() => {
    switch (current) {
      case 0:
        setShowDownload(true)
        setShowProfile(false)
        setShowUploadImageToStorage(false)
        setShowLicence(false)
        setShowStaff(false)
        break
      case 1:
        setShowDownload(false)
        setShowUploadImageToStorage(true)
        setShowProfile(false)
        setShowLicence(false)
        setShowStaff(false)

        break
      case 2:
        setShowDownload(false)
        setShowUploadImageToStorage(false)
        setShowProfile(true)
        setShowLicence(false)
        setShowStaff(false)

        break
      case 3:
        setShowDownload(false)
        setShowUploadImageToStorage(false)
        setShowProfile(false)
        setShowLicence(true)
        setShowStaff(false)

        break
      case 4:
        setShowDownload(false)
        setShowUploadImageToStorage(false)
        setShowProfile(false)
        setShowLicence(false)
        setShowStaff(true)

        break
      default:
        break
    }
  }, [current])

  useEffect(() => {
    setDataURlSupabase(dataResult)
  }, [dataResult])

  console.log("🚀 ~ useEffect ~ dataResult:", dataResult)

  const [fullUrl, setFullUrl] = useState("");

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

  //TODO activar esto para produccion

  // useEffect(() => {
  //   if ([2, 3, 4].includes(current) && (!dataResult?.Hoja1 || !dataResult?.Config)) {
  //     setCurrent(1);

  //     setShowDownload(false);
  //     setShowUploadImageToStorage(true);
  //     setShowProfile(false);
  //     setShowLicence(false);
  //     setShowStaff(false);
  //   }
  // }, [current, dataResult]);

  const handleCreate = () => {
    console.log("Crear botón presionado")
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>

        <ModalComponents
          openResponsive={openResponsive}
          setOpenResponsive={setOpenResponsive}>
          <Login
            redirections={true}
            setOpenResponsive={setOpenResponsive}
            fullUrl={fullUrl}

          />
        </ModalComponents>

        <Header
          imagetodo={{
            src: "/images/flama.png",
            alt: "Flama",
            width: 1600,
            height: 1200,
            quality: 100,
          }}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.steps}>
          <Divider />
          {showProfile ? <Navbar /> : null}
          <Divider />

          <StepsComponent items={items} current={current} setCurrent={setCurrent} />
        </div>
        <div className={styles.body}>
          {showDownload ? (
            <DownloadFile itemsTabs={itemsTabs} setCurrent={setCurrent} servicesLicencesData={servicesLicencesData} />
          ) : null}

          {showUploadImageToStorage ? (
            <UploadImageToStorage
              uploadedFiles={uploadedFiles}
              setUploadedFiles={setUploadedFiles}
              setCurrent={setCurrent}
              setDataResult={setDataResult}
            />
          ) : null}
          {showProfile ? (
            <Profile
              dataResult={dataResult}
              items={carouselItems}
              paymentLevel={paymentLevel}
              setSelectedProfile={setSelectedProfile}
              setCurrent={setCurrent}
              dataMocks={dataMocks}
            />
          ) : null}
          {showLicence ? (
            <Licence
              labelCheck={labelCheck}
              setLabelCheck={setLabelCheck}
              checked={checked}
              setChecked={setChecked}
              setCurrent={setCurrent}
            />
          ) : null}

          {showStaff ? <StaffOfSystem staffData={dataResult || dataMocks} /> : null}

          <div>
            {/* Botón de Crear */}
            <div className={styles.buttonContainer}>
              <Button type="primary" size="large" onClick={handleCreate}>
                Crear
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

