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
  Background_Image: string;
  Item_Image: string;
  Section: string;
  Item_id: number;
  Name: string;
  Description: string;
  Price: string;
}
interface ConfigType {
  Background_Image?: string | undefined;
}

// Definimos la interfaz para las props del componente
interface ProfileGridProps {
  dataGeneral: {
    Hoja1: MenuItem[];
    Promotion?: any;
    Config?: ConfigType[] | undefined;
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
  console.log("🚀 ~ dataGeneral:", dataGeneral)
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [backgroundImageSet, setBackgroundImageSet] = useState<any | null>(null);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (dataGeneral && dataGeneral.Hoja1) {
      const { Hoja1, Promotion, Config } = dataGeneral;
      setMenuData(Hoja1);
      setBackgroundImageSet(Config?.[0]?.Background_Image ? `url("${Config[0].Background_Image}")` : `url("/foldercompanies/LlakaScript/fondo.png")`);
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
    <div className={styles.container} style={{ backgroundImage: backgroundImageSet }}>
      <h1>{name}</h1>
      {/* Controles para cambiar de perfil */}
      <div className={styles.navigation}>
        <button  onClick={handlePreviousProfile}>⬅ Anterior</button>
        <button  onClick={handleNextProfile}>Siguiente ➡</button>
      </div>
      <div className={styles.profile}>
        {/* Solo mostramos el perfil cuando esté listo */}
        {isReady && (
          <SelectedProfileComponent
            menuData={menuData}
            groupedSections={groupedSections}
            backgroundImages={backgroundImageSet}
            namecompanies={namecompanies}
          />
        )}
      </div>


    </div>
  );
};

export default ProfileGrid;
