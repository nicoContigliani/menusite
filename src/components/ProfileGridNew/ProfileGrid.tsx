// 'use client'

// import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react'
// import dynamic from 'next/dynamic'
// import styles from './ElegantGrid.module.css'

// interface MenuItem {
//   Menu_Title: string;
//   Profile_Type: string;
//   Primary_Color: string;
//   Secondary_color: string;
//   Background_Image: string;
//   Item_Image: string;
//   Section: string;
//   Item_id: number;
//   Name: string;
//   Description: string;
//   Price: string;
// }

// interface MenuProps {
//   menuItems: MenuItem[];
//   namecompanies: string;
// }

// interface DynamicProfile {
//   name: string;
//   component: React.ComponentType<any>;
// }

// const profiles = [
//   { name: 'Profile1', path: 'Profile1/Menuone' },
//   { name: 'Profile2', path: 'Profile2/Menutwo' },
//   { name: 'Profile3', path: 'Profile3/Menuthree' },
//   { name: 'Profile4', path: 'Profile4/Menufourd' },
//   { name: 'Profile5', path: 'Profile5/Menufive' },
//   { name: 'Profile6', path: 'Profile6/Menusix' },
//   { name: 'Profile7', path: 'Profile7/Menuseven' },
//   { name: 'Profile8', path: 'Profile8/Menueight' },
//   { name: 'Profile9', path: 'Profile9/Menunine' },
//   { name: 'Profile10', path: 'Profile10/Menuten' },
//   { name: 'Profile11', path: 'Profile11/Menueleven' },
//   { name: 'Profile12', path: 'Profile12/Menutwelve' },
//   { name: 'Profile13', path: 'Profile13/Menuthirteen' },
//   { name: 'ProfileE1', path: 'ProfileE1/Ecomerceone' },
// ];

// // Mapea los componentes dinámicamente
// const dynamicProfiles: any = profiles?.map(profile => ({
//   name: profile?.name,
//   component: dynamic(() => import(`../../components/Profile/${profile?.path}`), { ssr: false }),
// }));

// const ProfileGrid = (props: any) => {
//   const { dataGeneral: { Hoja1, Promotion }, namecompanies } = props;
//   const [menuData, setMenuData] = useState<MenuItem[]>([]);
//   const [promotionData, setPromotionData] = useState<MenuItem[]>([]);
//   const [selectedProfileIndex, setSelectedProfileIndex] = useState<number>(0);
//   const [profileLoaded, setProfileLoaded] = useState<boolean>(false);
//   const [isReady, setIsReady] = useState<boolean>(false); // Nueva variable de estado para saber cuándo están listos los componentes

//   useEffect(() => {
//     if (Hoja1?.length) {
//       setMenuData(Hoja1);
//     }
//     if (Promotion?.length) {
//       setPromotionData(Promotion);
//     }
//   }, [Hoja1, Promotion]);

//   // Pre-cargar todos los perfiles
//   // useLayoutEffect(() => {
//   //   const loadProfiles = async () => {
//   //     // Cargar todos los perfiles para asegurarnos de que estén listos
//   //     await Promise?.all(dynamicProfiles?.map((profile: any) => profile?.component()));
//   //     setIsReady(true); // Una vez que todos los perfiles se hayan cargado
//   //   };

//   //   loadProfiles();
//   // }, []);
//   useLayoutEffect(() => {
//     const loadProfiles = async () => {
//       if (!dynamicProfiles || !Array.isArray(dynamicProfiles)) return;

//       await Promise.all(
//         dynamicProfiles
//           .map((profile: any) => {
//             if (typeof profile?.component === "function") {
//               return profile.component();
//             } else {
//               console.warn("profile.component no es una función:", profile);
//               return null;
//             }
//           })
//           .filter(Boolean) // Filtra valores nulos
//       );

//       setIsReady(true); // Una vez que todos los perfiles se hayan cargado
//     };

//     loadProfiles();
//   }, []);

//   useEffect(() => {
//     // Solo cargamos el perfil cuando esté listo
//     const loadProfile = async () => {
//       const { component } = dynamicProfiles[selectedProfileIndex];
//       await component(); // Esperamos a que el componente se cargue
//       setProfileLoaded(true); // Marcamos que el perfil ha sido cargado
//     };

//     if (isReady) {
//       loadProfile();
//     }
//   }, [selectedProfileIndex, isReady]);

//   const groupedSections = useMemo(() => {
//     if (menuData?.length) {
//       return menuData?.reduce((acc, item) => {
//         acc[item?.Section] = acc[item?.Section] || [];
//         acc[item?.Section]?.push(item);
//         return acc;
//       }, {} as Record<string, MenuItem[]>);
//     }
//     return {};
//   }, [menuData]);

//   const backgroundImage: any = useMemo(() => {
//     return menuData?.length
//       ? `url(${menuData[0]?.Background_Image})`
//       : null;
//   }, [menuData, namecompanies]);

//   // Manejo de cambio de perfil
//   const handlePreviousProfile = () => {
//     setSelectedProfileIndex((prevIndex) =>
//       prevIndex === 0 ? dynamicProfiles?.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNextProfile = () => {
//     setSelectedProfileIndex((prevIndex) =>
//       prevIndex === dynamicProfiles?.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // Perfil actualmente seleccionado
//   const { name, component: SelectedProfileComponent } = dynamicProfiles[selectedProfileIndex];

//   return (
//     <div className={styles?.container} style={{ backgroundImage }}>
//       <h2 className={styles?.title}>
//         {name} de {dynamicProfiles?.length}
//       </h2>
//       <div className={styles?.navigation}>
//         <button onClick={handlePreviousProfile} className={styles?.navButton}>
//           ⬅️
//         </button>
//         <button onClick={() => alert('Perfil seleccionado')} className={styles?.selectButton}>
//           Seleccionar perfil
//         </button>

//         <button onClick={handleNextProfile} className={styles?.navButton}>
//           ➡️
//         </button>
//       </div>
//       <div className={styles?.profile}>
//         {/* Solo mostramos el perfil cuando esté listo */}
//         {isReady && profileLoaded && (
//           <SelectedProfileComponent
//             menuData={menuData}
//             groupedSections={groupedSections}
//             backgroundImages={backgroundImage}
//             namecompanies={namecompanies}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileGrid;

// 'use client'

// import React, { useEffect, useState, useMemo, useLayoutEffect } from 'react'
// import dynamic from 'next/dynamic'
// import styles from './ElegantGrid.module.css'

// interface MenuItem {
//   Menu_Title: string;
//   Profile_Type: string;
//   Primary_Color: string;
//   Secondary_color: string;
//   Background_Image: string;
//   Item_Image: string;
//   Section: string;
//   Item_id: number;
//   Name: string;
//   Description: string;
//   Price: string;
// }

// interface MenuProps {
//   menuItems: MenuItem[];
//   namecompanies: string;
// }

// interface DynamicProfile {
//   name: string;
//   component: React.ComponentType<any>;
// }

// const profiles = [
//   { name: 'Profile1', path: 'Profile1/Menuone' },
//   { name: 'Profile2', path: 'Profile2/Menutwo' },
//   { name: 'Profile3', path: 'Profile3/Menuthree' },
//   { name: 'Profile4', path: 'Profile4/Menufourd' },
//   { name: 'Profile5', path: 'Profile5/Menufive' },
//   { name: 'Profile6', path: 'Profile6/Menusix' },
//   { name: 'Profile7', path: 'Profile7/Menuseven' },
//   { name: 'Profile8', path: 'Profile8/Menueight' },
//   { name: 'Profile9', path: 'Profile9/Menunine' },
//   { name: 'Profile10', path: 'Profile10/Menuten' },
//   { name: 'Profile11', path: 'Profile11/Menueleven' },
//   { name: 'Profile12', path: 'Profile12/Menutwelve' },
//   { name: 'Profile13', path: 'Profile13/Menuthirteen' },
//   { name: 'ProfileE1', path: 'ProfileE1/Ecomerceone' },
// ];

// // Definir el tipo de props que necesita el componente dinámico
// interface ProfileProps {
//   menuData: MenuItem[];
//   groupedSections: Record<string, MenuItem[]>;
//   backgroundImages: any;
//   namecompanies: any;
// }

// // Mapea los componentes dinámicamente y asigna el tipo de props
// const dynamicProfiles: DynamicProfile[] = profiles?.map(profile => ({
//   name: profile?.name,
//   component: dynamic<ProfileProps>(() =>
//     import(`../../components/Profile/${profile?.path}`), { ssr: false }
//   ),
// }));

// const ProfileGrid = (props: any) => {
//   const { dataGeneral: { Hoja1, Promotion }, namecompanies } = props;
//   const [menuData, setMenuData] = useState<MenuItem[]>([]);
//   const [promotionData, setPromotionData] = useState<MenuItem[]>([]);
//   const [selectedProfileIndex, setSelectedProfileIndex] = useState<number>(0);
//   const [profileLoaded, setProfileLoaded] = useState<boolean>(false);
//   const [isReady, setIsReady] = useState<boolean>(false); // Nueva variable de estado para saber cuándo están listos los componentes

//   useEffect(() => {
//     if (Hoja1?.length) {
//       setMenuData(Hoja1);
//     }
//     if (Promotion?.length) {
//       setPromotionData(Promotion);
//     }
//   }, [Hoja1, Promotion]);

//   // Pre-cargar todos los perfiles
//   useLayoutEffect(() => {
//     const loadProfiles = async () => {
//       if (!dynamicProfiles || !Array.isArray(dynamicProfiles)) return;

//       await Promise.all(
//         dynamicProfiles
//           .map((profile: any) => {
//             if (typeof profile?.component === "function") {
//               return profile.component();
//             } else {
//               console.warn("profile.component no es una función:", profile);
//               return null;
//             }
//           })
//           .filter(Boolean) // Filtra valores nulos
//       );

//       setIsReady(true); // Una vez que todos los perfiles se hayan cargado
//     };

//     loadProfiles();
//   }, []);



//   useEffect(() => {
//     const loadProfiles = async () => {
//       await Promise.all(
//         // ../../components/Profile/${profile.path}
//         profiles.map(profile => import(`@/components/Profile/Profiles/${profile.path}`))
//       );
//       setIsReady(true);
//     };

//     loadProfiles();
//   }, []);




//   const groupedSections = useMemo(() => {
//     if (menuData?.length) {
//       return menuData?.reduce((acc, item) => {
//         acc[item?.Section] = acc[item?.Section] || [];
//         acc[item?.Section]?.push(item);
//         return acc;
//       }, {} as Record<string, MenuItem[]>);
//     }
//     return {};
//   }, [menuData]);

//   const backgroundImage: any = useMemo(() => {
//     return menuData?.length
//       ? `url(${menuData[0]?.Background_Image})`
//       : null;
//   }, [menuData, namecompanies]);

//   // Manejo de cambio de perfil
//   const handlePreviousProfile = () => {
//     setSelectedProfileIndex((prevIndex) =>
//       prevIndex === 0 ? dynamicProfiles?.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNextProfile = () => {
//     setSelectedProfileIndex((prevIndex) =>
//       prevIndex === dynamicProfiles?.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   // Perfil actualmente seleccionado
//   const { name, component: SelectedProfileComponent } = dynamicProfiles[selectedProfileIndex];

//   return (
//     <div className={styles.container} style={{ backgroundImage }}>
//       <h2 className={styles.title}>
//         {name} de {dynamicProfiles?.length}
//       </h2>
//       <div className={styles.navigation}>
//         <button onClick={handlePreviousProfile} className={styles.navButton}>
//           ⬅️
//         </button>
//         <button onClick={() => alert('Perfil seleccionado')} className={styles.selectButton}>
//           Seleccionar perfil
//         </button>

//         <button onClick={handleNextProfile} className={styles.navButton}>
//           ➡️
//         </button>
//       </div>
//       <div className={styles.profile}>
//         {/* Solo mostramos el perfil cuando esté listo */}
//         {isReady && profileLoaded && (
//           <SelectedProfileComponent
//             menuData={menuData}
//             groupedSections={groupedSections}
//             backgroundImages={backgroundImage}
//             namecompanies={namecompanies}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileGrid;

// import React, { useEffect, useState, useMemo } from 'react'
// import dynamic from 'next/dynamic'
// import styles from './ElegantGrid.module.css'
// import Image from 'next/image'
// import backgrounImage from "../../public/images/italia.jpg"

// interface MenuItem {
//   Menu_Title: string;
//   Profile_Type: string;
//   Primary_Color: string;
//   Secondary_color: string;
//   Background_Image: string;
//   Item_Image: string;
//   Section: string;
//   Item_id: number;
//   Name: string;
//   Description: string;
//   Price: string;
// }

// interface MenuProps {
//   menuItems: MenuItem[];
//   namecompanies: string;
// }

// // Array con los componentes de perfil
// const profiles = [
//   { name: 'Profile1', path: 'Profile1/Menuone' },
//   { name: 'Profile2', path: 'Profile2/Menutwo' },
//   { name: 'Profile3', path: 'Profile3/Menuthree' },
//   { name: 'Profile4', path: 'Profile4/Menufourd' },
//   { name: 'Profile5', path: 'Profile5/Menufive' },
//   { name: 'Profile6', path: 'Profile6/Menusix' },
//   { name: 'Profile7', path: 'Profile7/Menuseven' },
//   { name: 'Profile8', path: 'Profile8/Menueight' },
//   { name: 'Profile9', path: 'Profile9/Menunine' },
//   { name: 'Profile10', path: 'Profile10/Menuten' },
//   { name: 'Profile11', path: 'Profile11/Menueleven' },
//   { name: 'Profile12', path: 'Profile12/Menutwelve' },
//   { name: 'Profile13', path: 'Profile13/Menuthirteen' },
//   { name: 'ProfileE1', path: 'ProfileE1/Ecomerceone' },
// ];

// // Mapea los componentes dinámicamente
// const dynamicProfiles: any = profiles?.map(profile => ({
//   name: profile.name,
//   component: dynamic(() => import(`../../components/Profile/${profile.path}`), { ssr: false }),
// }));

// const ProfileGrid = (props: any) => {
//   const { dataGeneral, namecompanies } = props
//   const [menuData, setMenuData] = useState<MenuItem[]>([]);
//   const [profile, setSelectedProfile] = useState("")

//   useEffect(() => {
//     if (dataGeneral) {
//       const { Hoja1, Promotion } = dataGeneral
//       setMenuData(Hoja1)
//       setSelectedProfile(Hoja1[0]?.Profile_Type);
//     }

//   }, [dataGeneral, namecompanies])

//   console.log("🚀 ~ ProfileGrid ~ menuData:", menuData)

//   // Memoize grouped sections to prevent unnecessary recalculations
//   const groupedSections = useMemo(() => {
//     if (menuData.length) {
//       return menuData.reduce((acc, item) => {
//         acc[item.Section] = acc[item.Section] || [];
//         acc[item.Section].push(item);
//         return acc;
//       }, {} as Record<string, MenuItem[]>);
//     }
//     return {};
//   }, [menuData]);
//   console.log("🚀 ~ groupedSections ~ groupedSections:", groupedSections)

//   // Memoize the background image
//   const backgroundImage = useMemo(() => {
//     return menuData.length
//       ? `url(/foldercompanies/${namecompanies}/${menuData[0]?.Background_Image})`
//       : null;
//   }, [menuData, namecompanies]);



//   // // Fetch the menu data once and set the background image and profile
//   // useEffect(() => {
//   //   if (menuItems.length) {
//   //     const fetchedData = menuItems;
//   //     setMenuData(fetchedData);
//   //     setSelectedProfile(fetchedData[0]?.Profile_Type);
//   //   }
//   // }, [menuItems]);

//   // // Memoize grouped sections to prevent unnecessary recalculations
//   // const groupedSections = useMemo(() => {
//   //   if (menuData.length) {
//   //     return menuData.reduce((acc, item) => {
//   //       acc[item.Section] = acc[item.Section] || [];
//   //       acc[item.Section].push(item);
//   //       return acc;
//   //     }, {} as Record<string, MenuItem[]>);
//   //   }
//   //   return {};
//   // }, [menuData]);

//   // // Memoize the background image
//   // const backgroundImage = useMemo(() => {
//   //   return menuData.length
//   //     ? `url(/foldercompanies/${namecompanies}/${menuData[0]?.Background_Image})`
//   //     : null;
//   // }, [menuData, namecompanies]);

//   return (
//     <div className={styles.container}>
//       {dynamicProfiles.map(({ name, component: Component }) => (
//         <div key={name}>
//           <h1>{name}</h1>
//           <hr />
//           <Component
//             menuData={menuData}
//             groupedSections={groupedSections}
//             backgroundImages={backgroundImage}
//             namecompanies={namecompanies}
//           />
//         </div>
//       ))}
//       hola
//     </div>
//   );
// };

// export default ProfileGrid;

// "use client"

// import React, { useEffect, useState, useMemo } from 'react';
// import dynamic from 'next/dynamic';
// import styles from './ElegantGrid.module.css';

// // Importar imagen de fondo (si es necesario)
// import Image from 'next/image';
// import backgrounImage from "../../public/images/italia.jpg";

// // Definimos la interfaz para los ítems del menú
// interface MenuItem {
//   Menu_Title: string;
//   Profile_Type: string;
//   Primary_Color: string;
//   Secondary_color: string;
//   Background_Image: string;
//   Item_Image: string;
//   Section: string;
//   Item_id: number;
//   Name: string;
//   Description: string;
//   Price: string;
// }

// // Definimos la interfaz para las props del componente
// interface ProfileGridProps {
//   dataGeneral: {
//     Hoja1: MenuItem[];
//     Promotion?: any;
//   };
//   namecompanies: string;
// }

// // Definimos la interfaz para los perfiles dinámicos
// interface DynamicProfile {
//   name: string;
//   component: React.ComponentType<any>;
// }

// // Array con los perfiles y sus rutas
// const profiles = [
//   { name: 'Profile1', path: 'Profile1/Menuone' },
//   { name: 'Profile2', path: 'Profile2/Menutwo' },
//   { name: 'Profile3', path: 'Profile3/Menuthree' },
//   { name: 'Profile4', path: 'Profile4/Menufourd' },
//   { name: 'Profile5', path: 'Profile5/Menufive' },
//   { name: 'Profile6', path: 'Profile6/Menusix' },
//   { name: 'Profile7', path: 'Profile7/Menuseven' },
//   { name: 'Profile8', path: 'Profile8/Menueight' },
//   { name: 'Profile9', path: 'Profile9/Menunine' },
//   { name: 'Profile10', path: 'Profile10/Menuten' },
//   { name: 'Profile11', path: 'Profile11/Menueleven' },
//   { name: 'Profile12', path: 'Profile12/Menutwelve' },
//   { name: 'Profile13', path: 'Profile13/Menuthirteen' },
//   { name: 'ProfileE1', path: 'ProfileE1/Ecomerceone' },
// ];

// // Mapeamos los perfiles dinámicamente con tipado correcto
// const dynamicProfiles: DynamicProfile[] = profiles.map(profile => ({
//   name: profile.name,
//   component: dynamic(() => import(`../../components/Profile/${profile.path}`), { ssr: false }),
// }));

// const ProfileGrid: React.FC<ProfileGridProps> = ({ dataGeneral, namecompanies }) => {
//   const [menuData, setMenuData] = useState<MenuItem[]>([]);
//   const [profile, setSelectedProfile] = useState<string>("");

//   useEffect(() => {
//     if (dataGeneral && dataGeneral.Hoja1) {
//       setMenuData(dataGeneral.Hoja1);
//       setSelectedProfile(dataGeneral.Hoja1[0]?.Profile_Type || "");
//     }
//   }, [dataGeneral, namecompanies]);

//   // Memoizamos las secciones agrupadas para optimizar rendimiento
//   const groupedSections = useMemo(() => {
//     return menuData.reduce((acc, item) => {
//       acc[item.Section] = acc[item.Section] || [];
//       acc[item.Section].push(item);
//       return acc;
//     }, {} as Record<string, MenuItem[]>);
//   }, [menuData]);

//   // Memoizamos la imagen de fondo
//   const backgroundImage: any | undefined = useMemo(() => {
//     return menuData.length
//       ? `url(${menuData[0]?.Background_Image})`
//       : null;
//   }, [menuData, namecompanies]);

//   return (
//     <div className={styles.container}
//       style={{ backgroundImage }
//       }
//     >
//       {dynamicProfiles.map(({ name, component: Component }) => (
//         <div key={name}>
//           <h1>{name}</h1>
//           <hr />
//           <Component
//             menuData={menuData}
//             groupedSections={groupedSections}
//             backgroundImages={backgroundImage}
//             namecompanies={namecompanies}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProfileGrid;


"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import styles from "./ElegantGrid.module.css";

// Importar imagen de fondo (si es necesario)
import Image from "next/image";
import backgrounImage from "../../public/images/italia.jpg";

// Definimos la interfaz para los ítems del menú
interface MenuItem {
  Menu_Title: string;
  Profile_Type: string;
  Primary_Color: string;
  Secondary_color: string;
  Background_Image: string;
  Item_Image: string;
  Section: string;
  Item_id: number;
  Name: string;
  Description: string;
  Price: string;
}

// Definimos la interfaz para las props del componente
interface ProfileGridProps {
  dataGeneral: {
    Hoja1: MenuItem[];
    Promotion?: any;
  };
  namecompanies: string;
}

// Definimos la interfaz para los perfiles dinámicos
interface DynamicProfile {
  name: string;
  component: React.ComponentType<any>;
}

// Array con los perfiles y sus rutas
const profiles = [
  { name: "Profile1", path: "Profile1/Menuone" },
  { name: "Profile2", path: "Profile2/Menutwo" },
  { name: "Profile3", path: "Profile3/Menuthree" },
  { name: "Profile4", path: "Profile4/Menufourd" },
  { name: "Profile5", path: "Profile5/Menufive" },
  { name: "Profile6", path: "Profile6/Menusix" },
  { name: "Profile7", path: "Profile7/Menuseven" },
  { name: "Profile8", path: "Profile8/Menueight" },
  { name: "Profile9", path: "Profile9/Menunine" },
  { name: "Profile10", path: "Profile10/Menuten" },
  { name: "Profile11", path: "Profile11/Menueleven" },
  { name: "Profile12", path: "Profile12/Menutwelve" },
  { name: "Profile13", path: "Profile13/Menuthirteen" },
  { name: "ProfileE1", path: "ProfileE1/Ecomerceone" },
];

// Mapeamos los perfiles dinámicamente con tipado correcto
const dynamicProfiles: DynamicProfile[] = profiles.map((profile) => ({
  name: profile.name,
  component: dynamic(() => import(`../../components/Profile/${profile.path}`), { ssr: false }),
}));

const ProfileGrid: React.FC<ProfileGridProps> = ({ dataGeneral, namecompanies }) => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (dataGeneral && dataGeneral.Hoja1) {
      setMenuData(dataGeneral.Hoja1);
      setIsReady(true);
    }
  }, [dataGeneral]);

  // Memoizamos las secciones agrupadas para optimizar rendimiento
  const groupedSections = useMemo(() => {
    return menuData.reduce((acc, item) => {
      acc[item.Section] = acc[item.Section] || [];
      acc[item.Section].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);
  }, [menuData]);

  // Memoizamos la imagen de fondo
  const backgroundImage: any | undefined = useMemo(() => {
    return menuData.length ? `url(${menuData[0]?.Background_Image})` : null;
  }, [menuData]);

  // Manejo de cambio de perfil
  const handlePreviousProfile = () => {
    setSelectedProfileIndex((prevIndex) =>
      prevIndex === 0 ? dynamicProfiles.length - 1 : prevIndex - 1
    );
  };

  const handleNextProfile = () => {
    setSelectedProfileIndex((prevIndex) =>
      prevIndex === dynamicProfiles.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Perfil actualmente seleccionado
  const { name, component: SelectedProfileComponent } = dynamicProfiles[selectedProfileIndex];

  return (
    <div className={styles.container} style={{ backgroundImage }}>
      <h1>{name}</h1>
      {/* Controles para cambiar de perfil */}
      <div className={styles.controls}>
        <button onClick={handlePreviousProfile}>⬅ Anterior</button>
        <button onClick={handleNextProfile}>Siguiente ➡</button>
      </div>
      <div className={styles.profile}>
        {/* Solo mostramos el perfil cuando esté listo */}
        {isReady && (
          <SelectedProfileComponent
            menuData={menuData}
            groupedSections={groupedSections}
            backgroundImages={backgroundImage}
            namecompanies={namecompanies}
          />
        )}
      </div>


    </div>
  );
};

export default ProfileGrid;
