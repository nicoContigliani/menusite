'use client'

import React, { useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import styles from './ElegantGrid.module.css'


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

interface MenuProps {
  menuItems: MenuItem[];
  namecompanies: string;
}
interface DynamicProfile {
  name: string;
  component: React.ComponentType<any>;
}
// Array con los componentes de perfil
const profiles = [
  { name: 'Profile1', path: 'Profile1/Menuone' },
  // { name: 'Profile2', path: 'Profile2/Menutwo' },
  // { name: 'Profile3', path: 'Profile3/Menuthree' },
  // { name: 'Profile4', path: 'Profile4/Menufourd' },
  // { name: 'Profile5', path: 'Profile5/Menufive' },
  // { name: 'Profile6', path: 'Profile6/Menusix' },
  // { name: 'Profile7', path: 'Profile7/Menuseven' },
  // { name: 'Profile8', path: 'Profile8/Menueight' },
  // { name: 'Profile9', path: 'Profile9/Menunine' },
  // { name: 'Profile10', path: 'Profile10/Menuten' },
  // { name: 'Profile11', path: 'Profile11/Menueleven' },
  // { name: 'Profile12', path: 'Profile12/Menutwelve' },
  // { name: 'Profile13', path: 'Profile13/Menuthirteen' },
  // { name: 'ProfileE1', path: 'ProfileE1/Ecomerceone' },
];

// Mapea los componentes dinámicamente
const dynamicProfiles: any = profiles?.map(profile => ({
  name: profile.name,
  component: dynamic(() => import(`../../components/Profile/${profile.path}`), { ssr: false }),
}));

const ProfileGrid = ({ menuItems, namecompanies }: MenuProps) => {

  
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [profile, setSelectedProfile] = useState("")

  // Fetch the menu data once and set the background image and profile
  useEffect(() => {
    if (menuItems.length) {
      const fetchedData = menuItems;
      setMenuData(fetchedData);
      setSelectedProfile(fetchedData[0]?.Profile_Type);
    }
  }, [menuItems]);

  // Memoize grouped sections to prevent unnecessary recalculations
  const groupedSections = useMemo(() => {
    if (menuData.length) {
      return menuData.reduce((acc, item) => {
        acc[item.Section] = acc[item.Section] || [];
        acc[item.Section].push(item);
        return acc;
      }, {} as Record<string, MenuItem[]>);
    }
    return {};
  }, [menuData]);

  // Memoize the background image
  const backgroundImage = useMemo(() => {
    return menuData.length
      ? `url(/foldercompanies/${namecompanies}/${menuData[0]?.Background_Image})`
      : null;
  }, [menuData, namecompanies]);

  return (
    <div className={styles.container}>
      {dynamicProfiles.map(({ name, component: Component }:DynamicProfile) => (
        <div key={name}>
          <h1>{name}</h1>
          <hr />
          <Component
            menuData={menuData}
            groupedSections={groupedSections}
            backgroundImages={backgroundImage}
            namecompanies={namecompanies}
          />
        </div>
      ))}
    </div>
  );
};

export default ProfileGrid;
