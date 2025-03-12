// import type React from "react"
// import { useState, useMemo } from "react"
// import dynamic from "next/dynamic"
// import styles from "./ElegantGrid.module.css"
// import { useMenuData, type MenuItem, type DataGeneral } from "../../../hooks/useMenuData"
// import ToggleButtons from "../ToggleButton/ToggleButton"
// import { Button } from "antd"


// interface ProfileGridProps {
//   dataGeneral: DataGeneral;
//   namecompanies: string;
//   paymentLevel: number;
//   setSelectedProfile: any;
//   setCurrent: any
// }

// interface DynamicProfile {
//   name: string
//   component: React.ComponentType<any>
// }

// const profiles = [
//   { name: "Profile1", path: "Profile1/Menuone" },
//   { name: "Profile2", path: "Profile2/Menutwo" },
//   { name: "Profile3", path: "Profile3/Menuthree" },
//   { name: "Profile4", path: "Profile4/Menufourd" },
//   { name: "Profile5", path: "Profile5/Menufive" },
//   { name: "Profile6", path: "Profile6/Menusix" },
//   { name: "Profile7", path: "Profile7/Menuseven" },
//   { name: "Profile8", path: "Profile8/Menueight" },
//   { name: "Profile9", path: "Profile9/Menunine" },
//   { name: "Profile10", path: "Profile10/Menuten" },
//   { name: "Profile11", path: "Profile11/Menueleven" },
//   { name: "Profile12", path: "Profile12/Menutwelve" },
//   { name: "Profile13", path: "Profile13/Menuthirteen" },
//   { name: "Profile14", path: "Profile14/MenuFourdTeen" },
//   { name: "Profile15", path: "Profile15/MenuFifteen" },
//   { name: "Profile16", path: "Profile16/MenuSixteen" },
//   { name: "ProfileE1", path: "ProfileE1/Ecomerceone" },
// ]

// const dynamicProfiles: DynamicProfile[] = profiles.map((profile) => ({
//   name: profile.name,
//   component: dynamic(() => import(`../../components/Profile/${profile.path}`), { ssr: false }),
// }))

// const ProfileGrid: React.FC<ProfileGridProps> = ({
//   dataGeneral,
//   namecompanies,
//   paymentLevel,
//   setSelectedProfile,
//   setCurrent
// }) => {
//   const { menuData, backgroundImageSet, promotions, info, schedules, config, isReady } = useMenuData(dataGeneral)

//   const [selectedProfileIndex, setSelectedProfileIndex] = useState(0)

//   const groupedSections = useMemo(() => {
//     return menuData.reduce(
//       (acc, item) => {
//         acc[item.Section] = acc[item.Section] || []
//         acc[item.Section].push(item)
//         return acc
//       },
//       {} as Record<string, MenuItem[]>,
//     )
//   }, [menuData])

//   const catchProfile = (name: string) => {
//     console.log("🚀 ~ catchProfile ~ name:", name)
//     setSelectedProfile(name)
//     setCurrent(3)
//   }


//   const handlePreviousProfile = () => {
//     setSelectedProfileIndex((prevIndex) => (prevIndex === 0 ? dynamicProfiles.length - 1 : prevIndex - 1))
//   }

//   const handleNextProfile = () => {
//     setSelectedProfileIndex((prevIndex) => (prevIndex === dynamicProfiles.length - 1 ? 0 : prevIndex + 1))
//   }

//   const { name, component: SelectedProfileComponent } = dynamicProfiles[selectedProfileIndex]

//   return (
//     <div className={styles.container}
//     // style={{ backgroundImage: backgroundImageSet || undefined }}
//     >
//       <h1>{name}</h1>

//       <Button onClick={() => catchProfile(name)}
//         type="primary"
//         variant="outlined"
//       >select profieles</Button>

//       <div className={styles.navigation}>
//         <Button onClick={handlePreviousProfile}
//           type="primary"
//           variant="outlined"
//         >⬅ Anterior</Button>
//         <div>
//           {paymentLevel !== 0 ?
//             <ToggleButtons />
//             : null
//           }
//         </div>
//         <Button onClick={handleNextProfile}
//           type="primary"
//           variant="outlined"
//         >Siguiente ➡</Button>
//       </div>
//       <div className={styles.profile}>
//         {isReady && (
//           <SelectedProfileComponent
//             menuData={menuData}
//             groupedSections={groupedSections}
//             backgroundImages={backgroundImageSet}
//             namecompanies={namecompanies}
//             promotions={promotions}
//             info={info}
//             schedules={schedules}
//             config={config}
//           />
//         )}
//       </div>
//     </div>
//   )
// }

// export default ProfileGrid

// import type React from "react";
// import { useState, useMemo } from "react";
// import dynamic from "next/dynamic";
// import styles from "./ElegantGrid.module.css";
// import { useMenuData, type MenuItem, type DataGeneral } from "../../../hooks/useMenuData";
// import ToggleButtons from "../ToggleButton/ToggleButton";
// import { Button } from "antd";
// import useDynamicStyles from "../../../hooks/useDynamicStyles"; // Importa el hook de estilos dinámicos

// interface ProfileGridProps {
//   dataGeneral: DataGeneral;
//   namecompanies: string;
//   paymentLevel: number;
//   setSelectedProfile: any;
//   setCurrent: any;
// }

// interface DynamicProfile {
//   name: string;
//   component: React.ComponentType<any>;
// }

// const profiles = [
//   { name: "Profile1", path: "Profile1/Menuone" },
//   { name: "Profile2", path: "Profile2/Menutwo" },
//   { name: "Profile3", path: "Profile3/Menuthree" },
//   { name: "Profile4", path: "Profile4/Menufourd" },
//   { name: "Profile5", path: "Profile5/Menufive" },
//   { name: "Profile6", path: "Profile6/Menusix" },
//   { name: "Profile7", path: "Profile7/Menuseven" },
//   { name: "Profile8", path: "Profile8/Menueight" },
//   { name: "Profile9", path: "Profile9/Menunine" },
//   { name: "Profile10", path: "Profile10/Menuten" },
//   { name: "Profile11", path: "Profile11/Menueleven" },
//   { name: "Profile12", path: "Profile12/Menutwelve" },
//   { name: "Profile13", path: "Profile13/Menuthirteen" },
//   { name: "Profile14", path: "Profile14/MenuFourdTeen" },
//   { name: "Profile15", path: "Profile15/MenuFifteen" },
//   { name: "Profile16", path: "Profile16/MenuSixteen" },
//   { name: "ProfileE1", path: "ProfileE1/Ecomerceone" },
//   { name: "ProfileGeneric", path: "ProfileGeneric/ProfileGeneric" }, // Agrega el perfil genérico
// ];

// // Diccionario de estilos dinámicos
// const profileStyles = ["ProfileGeneric", "ProfileGeneric1", "ProfileGeneric2", "ProfileGeneric3", "ProfileGeneric4"];

// const dynamicProfiles: DynamicProfile[] = profiles.map((profile) => ({
//   name: profile.name,
//   component: dynamic(() => import(`../../components/Profile/${profile.path}`), { ssr: false }),
// }));

// // Crea el componente genérico por separado
// const GenericProfileComponent = dynamic(() => import("../../components/Profile/ProfileGeneric/ProfileGeneric"), {
//   ssr: false,
// });

// const ProfileGrid: React.FC<ProfileGridProps> = ({
//   dataGeneral,
//   namecompanies,
//   paymentLevel,
//   setSelectedProfile,
//   setCurrent,
// }) => {
//   const { menuData, backgroundImageSet, promotions, info, schedules, config, isReady } = useMenuData(dataGeneral);

//   const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
//   const [selectedStyleIndex, setSelectedStyleIndex] = useState(0); // Índice para los estilos dinámicos

//   const groupedSections = useMemo(() => {
//     return menuData.reduce(
//       (acc, item) => {
//         acc[item.Section] = acc[item.Section] || [];
//         acc[item.Section].push(item);
//         return acc;
//       },
//       {} as Record<string, MenuItem[]>,
//     );
//   }, [menuData]);


//   const handlePreviousProfile = () => {
//     setSelectedProfileIndex((prevIndex) => (prevIndex === 0 ? dynamicProfiles.length - 1 : prevIndex - 1));
//   };

//   const handleNextProfile = () => {
//     setSelectedProfileIndex((prevIndex) => (prevIndex === dynamicProfiles.length - 1 ? 0 : prevIndex + 1));
//   };

//   const handlePreviousStyle = () => {
//     setSelectedStyleIndex((prevIndex) => (prevIndex === 0 ? profileStyles.length - 1 : prevIndex - 1)); // Navega entre los estilos
//   };

//   const handleNextStyle = () => {
//     setSelectedStyleIndex((prevIndex) => (prevIndex === profileStyles.length - 1 ? 0 : prevIndex + 1)); // Navega entre los estilos
//   };

//   const { name, component: SelectedProfileComponent } = dynamicProfiles[selectedProfileIndex];

//   // Usa el hook useDynamicStyles para cargar los estilos dinámicos
//   const dynamicStyles = profileStyles[selectedStyleIndex]; // Cambia el estilo dinámico según el índice
//   console.log("***********useDynamicStyles", dynamicStyles)


//   // Verifica si el perfil seleccionado es genérico
//   // const isGenericProfile = name === "ProfileGeneric";
//   const isGenericProfile = dynamicStyles.includes(name)

//   const catchProfile = (name: string) => {
//     console.log("🚀 ~ catchProfile ~ name:", name);
//     dynamicStyles ? setSelectedProfile(dynamicStyles) : setSelectedProfile(name);
//     // setSelectedProfile(name);
//     setCurrent(3);
//   };




//   return (
//     <div className={styles.container}>
//       <h1>{name}</h1>

//       <Button onClick={() => catchProfile(name)} type="primary" variant="outlined">
//         Select Profile
//       </Button>

//       <br />
//       <div className={styles.navigation}>
//         <Button onClick={handlePreviousProfile} type="primary" variant="outlined"
//           size="small"
//         >
//           ⬅ Perfil
//         </Button>
//         {isGenericProfile && ( // Muestra los botones de estilo solo si el perfil es genérico
//           <>
//             <Button onClick={handlePreviousStyle} type="primary" variant="outlined"
//               size="small"
//             >
//               ⬅  Estilo
//             </Button>
//             <Button onClick={handleNextStyle} type="primary" variant="outlined"
//               size="small"
//             >
//                Estilo ➡
//             </Button>
//           </>
//         )}
//         <div>{paymentLevel !== 0 ? <ToggleButtons /> : null}</div>
//         <Button onClick={handleNextProfile} type="primary" variant="outlined"
//           size="small"
//         >
//            Perfil ➡
//         </Button>
//       </div>
//       <div className={styles.profile}>
//         {isReady && (
//           <SelectedProfileComponent
//             menuData={menuData}
//             groupedSections={groupedSections}
//             backgroundImages={backgroundImageSet}
//             namecompanies={namecompanies}
//             promotions={promotions}
//             info={info}
//             schedules={schedules}
//             config={config}
//             profile={dynamicStyles} // Pasa los estilos dinámicos al componente
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfileGrid;


import type React from "react";
import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import styles from "./ElegantGrid.module.css";
import { useMenuData, type MenuItem, type DataGeneral } from "../../../hooks/useMenuData";
import ToggleButtons from "../ToggleButton/ToggleButton";
import { Button } from "antd";
import useDynamicStyles from "../../../hooks/useDynamicStyles"; // Importa el hook de estilos dinámicos

interface ProfileGridProps {
  dataGeneral: DataGeneral;
  namecompanies: string;
  paymentLevel: number;
  setSelectedProfile: any;
  setCurrent: any;
}

interface DynamicProfile {
  name: string;
  component: React.ComponentType<any>;
}

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
  { name: "Profile14", path: "Profile14/MenuFourdTeen" },
  { name: "Profile15", path: "Profile15/MenuFifteen" },
  { name: "Profile16", path: "Profile16/MenuSixteen" },
  { name: "ProfileE1", path: "ProfileE1/Ecomerceone" },
  { name: "ProfileGeneric", path: "ProfileGeneric/ProfileGeneric" }, // Agrega el perfil genérico
];

// Diccionario de estilos dinámicos
const profileStyles = ["ProfileGeneric", "ProfileGeneric1", "ProfileGeneric2", "ProfileGeneric3", "ProfileGeneric4"];

const dynamicProfiles: DynamicProfile[] = profiles.map((profile) => ({
  name: profile.name,
  component: dynamic(() => import(`../../components/Profile/${profile.path}`), { ssr: false }),
}));

// Crea el componente genérico por separado
const GenericProfileComponent = dynamic(() => import("../../components/Profile/ProfileGeneric/ProfileGeneric"), {
  ssr: false,
});

const ProfileGrid: React.FC<ProfileGridProps> = ({
  dataGeneral,
  namecompanies,
  paymentLevel,
  setSelectedProfile,
  setCurrent,
}) => {
  const { menuData, backgroundImageSet, promotions, info, schedules, config, isReady } = useMenuData(dataGeneral);

  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [selectedStyleIndex, setSelectedStyleIndex] = useState(0); // Índice para los estilos dinámicos

  const groupedSections = useMemo(() => {
    return menuData.reduce(
      (acc, item) => {
        acc[item.Section] = acc[item.Section] || [];
        acc[item.Section].push(item);
        return acc;
      },
      {} as Record<string, MenuItem[]>,
    );
  }, [menuData]);

  const handlePreviousProfile = () => {
    setSelectedProfileIndex((prevIndex) => (prevIndex === 0 ? dynamicProfiles.length - 1 : prevIndex - 1));
  };

  const handleNextProfile = () => {
    setSelectedProfileIndex((prevIndex) => (prevIndex === dynamicProfiles.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePreviousStyle = () => {
    setSelectedStyleIndex((prevIndex) => (prevIndex === 0 ? profileStyles.length - 1 : prevIndex - 1)); // Navega entre los estilos
  };

  const handleNextStyle = () => {
    setSelectedStyleIndex((prevIndex) => (prevIndex === profileStyles.length - 1 ? 0 : prevIndex + 1)); // Navega entre los estilos
  };

  const { name, component: SelectedProfileComponent } = dynamicProfiles[selectedProfileIndex];

  // Usa el hook useDynamicStyles para cargar los estilos dinámicos
  const dynamicStyles = profileStyles[selectedStyleIndex]; // Cambia el estilo dinámico según el índice
  console.log("***********useDynamicStyles", dynamicStyles);

  // Verifica si el perfil seleccionado es genérico
  const isGenericProfile = profileStyles.includes(name);

  const catchProfile = (name: string) => {
    console.log("🚀 ~ catchProfile ~ name:", name);
    setSelectedProfile(name); // Guarda el nombre del perfil seleccionado
    setCurrent(3);
  };

  return (
    <div className={styles.container}>
      <h1>{name}</h1>

      <Button onClick={() => catchProfile(name)} type="primary" variant="outlined">
        Select Profile
      </Button>

      <br />
      <div className={styles.navigation}>
        <Button onClick={handlePreviousProfile} type="primary" variant="outlined" size="small">
          ⬅ Perfil
        </Button>
        {isGenericProfile && ( // Muestra los botones de estilo solo si el perfil es genérico
          <>
            <Button onClick={handlePreviousStyle} type="primary" variant="outlined" size="small">
              ⬅ Estilo
            </Button>
            <Button onClick={handleNextStyle} type="primary" variant="outlined" size="small">
              Estilo ➡
            </Button>
          </>
        )}
        <div>{paymentLevel !== 0 ? <ToggleButtons /> : null}</div>
        <Button onClick={handleNextProfile} type="primary" variant="outlined" size="small">
          Perfil ➡
        </Button>
      </div>
      <div className={styles.profile}>
        {isReady && (
          <SelectedProfileComponent
            menuData={menuData}
            groupedSections={groupedSections}
            backgroundImages={backgroundImageSet}
            namecompanies={namecompanies}
            promotions={promotions}
            info={info}
            schedules={schedules}
            config={config}
            profile={dynamicStyles} // Pasa los estilos dinámicos al componente
          />
        )}
      </div>
    </div>
  );
};

export default ProfileGrid;