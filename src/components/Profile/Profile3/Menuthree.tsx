// "use client";

// import type React from "react";
// import { useEffect, useLayoutEffect, useState } from "react";
// import Image from "next/image";
// import Logo from "@/components/Logo/Logo";
// import Info from "@/components/Info/Info";
// import Schedules from "@/components/Schedules/Schedules";
// import SelectComponent from "@/components/SelectComponent/SelectComponent";
// import styles from "./MenuNew.module.css";
// import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker";
// import { extractLastSegment } from "../../../../tools/urlService";
// import MoreInfo from "@/components/moreInfo/MoreInfo";
// import CatchOrder from "@/components/CatchOrder/CatchOrder";
// import { extraBeforeCheck } from "@/services/extraBeforeCheck.services";
// import { Button, IconButton, Typography } from "@mui/material";
// import ReusableModal from "@/components/ReusableModal/ReusableModal";

// import CloseIcon from '@mui/icons-material/Close'; // Importa el ícono de cierre
// import OrderFlow from "@/components/Orders/Orderflow";
// import useOrderManager from "../../../../hooks/useOrderManager";


// interface MenuItem {
//   Item_id: string;
//   Name: string;
//   Description: string;
//   Price: string | number;
//   Menu_Title: string;
//   Item_Image: string;
//   extra?: any
// }

// interface MenuProps {
//   menuData: any;
//   groupedSections: { [key: string]: MenuItem[] };
//   groupedSectionpromotions: { [key: string]: MenuItem[] };
//   backgroundImages: any;
//   namecompanies: string;
//   promotions: any;
//   info: any;
//   schedules: any;
//   config: any[];
//   paymentLevel: any
// }

// const Menuone: React.FC<MenuProps> = (props) => {
//   const { backgroundImages, config, groupedSections, groupedSectionpromotions, info, menuData, promotions, schedules, paymentLevel = 0 } =
//     props;
//   const [searchTerm, setSearchTerm] = useState("");
//   const [iconURL, setIconURL] = useState<string>("");
//   const [namecompanies, setNamecompanies] = useState<string>("");
//   const [isMobile, setIsMobile] = useState(false);
//   const [isSmallScreen, setIsSmallScreen] = useState(false);

//   useLayoutEffect(() => {
//     if (typeof window !== "undefined") {
//       const data = window.location.href;
//       setNamecompanies(extractLastSegment(data));

//       const handleResize = () => {
//         setIsMobile(window.innerWidth <= 768);
//         setIsSmallScreen(window.innerWidth <= 480);
//       };

//       handleResize();
//       window.addEventListener("resize", handleResize);
//       return () => window.removeEventListener("resize", handleResize);
//     }
//   }, []);

//   const { handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies);

//   useEffect(() => {
//     if (config?.length) {
//       setIconURL(config[0].IconBrand || "");
//     }
//   }, [config]);

//   const memoizedSectionsPromotions = (groupedSectionpromotions ? Object.entries(groupedSectionpromotions) : [])
//     .map(([sectionName, items]) => {
//       const filteredItems = items.filter(
//         (item: any) =>
//           [item.Name, item.Description, item.Menu_Title, item.Section].some(
//             (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
//           ) ||
//           (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
//       );
//       return [sectionName, filteredItems] as [string, MenuItem[]];
//     })
//     .filter(([, items]) => items.length > 0);

//   const memoizedSections = Object.entries(groupedSections)
//     .map(([sectionName, items]) => {
//       const filteredItems = items.filter(
//         (item) =>
//           [item.Name, item.Description, item.Menu_Title].some(
//             (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
//           ) ||
//           (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
//       );
//       return [sectionName, filteredItems] as [string, MenuItem[]];
//     })
//     .filter(([, items]) => items.length > 0);

//   const handleChange = (value: { inputValue: string; clarification: string }) => {
//     console.log("Order Info:", value);
//   };

//   const getElementId = (sectionName: string, index: number, itemName: string) => {
//     return `${sectionName}-${index}-${itemName}`;
//   };

//   const renderMenuItem = (item: MenuItem, sectionName: string, index: number) => {
//     const elementId = getElementId(sectionName, index, item.Name);

//     // const { orders, addOrder, editOrder, deleteOrder, total } = useOrderManager();
//     // if (orders.length > 0) console.log("🚀 ~ renderMenuItem ~ orders:", orders)


//     const [addOrder, setAddOrder] = useState<any[]>([]);

//     // const handleOrderConfirm = (newOrder: any) => {
//     //   newOrder.length != 0 && setAddOrder((prevOrders) => [...prevOrders, newOrder]);
//     // };

//     // // Usar el custom hook para manejar las órdenes
//     // const handleOrderConfirm = (order: any) => {
//     //   addOrder(order);
//     // };

//     const handleOrderConfirm = async (newOrder:any) => {

//     };

//     return (
//       <div
//         key={elementId}
//         className={styles.menuItem}
//         onMouseLeave={() => handleSectionLeave(elementId)}
//         onClick={() => handleClick(elementId, "menuItem")}
//         data-cy={`${elementId}-menuItem`}
//       >
//         {/* <OrderFlow
//           orders={orders}
//           addOrder={addOrder}
//           editOrder={editOrder}
//           deleteOrder={deleteOrder}
//         /> */}


//         <div className={styles.cardImage}>
//           <Image
//             src={item.Item_Image || "/placeholder.svg"}
//             alt={item.Name}
//             width={isSmallScreen ? 60 : 120}
//             height={isSmallScreen ? 40 : 80}
//             priority
//             style={{ objectFit: "cover", width: "100%", height: "100%" }}
//             onClick={() => handleClick(elementId, "image")}
//             data-cy={`${elementId}-image`}
//           />
//         </div>
//         <div className={styles.itemDetails}>
//           <h2 title={item.Name}>{item.Name}</h2>
//           {/* Mostrar la descripción en móviles */}
//           <div
//             className={styles.itemDescription}
//             title={item.Description}
//             style={{
//               fontSize: isSmallScreen ? "12px" : "14px",
//               maxHeight: isSmallScreen ? "3.6em" : "none",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               display: "-webkit-box",
//               WebkitLineClamp: isSmallScreen ? 2 : "none",
//               WebkitBoxOrient: "vertical",
//             }}
//           >
//             {item.Description}
//           </div>
//           {/* Contenedor para precio y More Info */}
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center", // Alinear verticalmente
//               marginTop: "8px", // Espacio entre la descripción y este contenedor
//             }}
//           >
//             <p className={styles.price}>{`$${item.Price}`}</p>
//             <MoreInfo
//               titleModal={item.Name}
//               modalcontent={item.Description}
//               labelInfo={"More Info"}
//             />
//           </div>
//         </div>
//         {/* Mostrar el botón en móviles */}
//         <div
//           key={elementId}
//           className={styles.menuItem}
//           onMouseLeave={() => handleSectionLeave(elementId)}
//           onClick={() => handleClick(elementId, "menuItem")}
//           data-cy={`${elementId}-menuItem`}
//         >
//           {/* <SelectComponent
//             orderdescription={[`${item.Name}: ${item.Description}   ${item.Price}` ]}
//             size="small"
//             delivery={info[0]?.delivery || false}
//             takeaway={info[0]?.takeaway || false}
//             Dinein={info[0]?.Dinein || true}
//             onChange={handleChange}
//             value="someValue"
//             color="white"
//             data-cy={`Button-${item.Name}`}
//             paymentLevel={paymentLevel||0}
//           /> */}
//           {/* <CatchOrder
//             title={item?.Name}
//             description={item?.Description}
//             price={item?.Price}
//             extra={extraBeforeCheck(item?.extra)}
//             urlImage={item.Item_Image}
//             onConfirm={handleOrderConfirm}

//           /> */}
//           <CatchOrder
//             title={item.Name}
//             description={item.Description}
//             price={item.Price}
//             extra={extraBeforeCheck(item?.extra)}
//             urlImage={item.Item_Image}
//             onConfirm={handleOrderConfirm}
//           />
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div
//       className={styles.container}
//       style={{
//         backgroundImage: backgroundImages || "none",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundRepeat: "no-repeat",
//       }}
//       data-cy="empresa-page-menu"
//     >
//       <header className={styles.header}>
//         <div onMouseEnter={() => handleSectionEnter("logo")}>
//           {iconURL && (
//             <Logo
//               namecompanies={namecompanies}
//               logoUrl={iconURL}
//               size={isMobile ? 80 : 100}
//               fontSize={isMobile ? "24px" : "30px"}
//               fontWeight="700"
//               color="#ffffff"
//               fontFamily="Arial, sans-serif"
//               data-cy="Logo"
//             />
//           )}
//         </div>
//         <div onMouseEnter={() => handleSectionEnter("info")}>
//           {info && (
//             <Info
//               info={info}
//               fontSize={isMobile ? "11px" : "13px"}
//               fontWeight="500"
//               color="#dddddd"
//               fontFamily="Helvetica, sans-serif"
//               data-cy="Info"
//             />
//           )}
//         </div>
//         <div onMouseEnter={() => handleSectionEnter("search")}>
//           <input
//             type="text"
//             className={styles.searchInput}
//             placeholder="Buscar en el menú..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             data-cy="Search"
//           />
//         </div>
//       </header>

//       {memoizedSectionsPromotions.length > 0 && (
//         <div className={styles.sectionTitle}>
//           <h5 className={styles.titleStructure}>Promoción</h5>
//         </div>
//       )}

//       <main className={styles.main}>
//         {memoizedSectionsPromotions.map(([sectionName, items]) => (
//           <section
//             key={sectionName}
//             data-section={sectionName}
//             className={styles.section}
//             onMouseEnter={() => handleSectionEnter(sectionName)}
//             onMouseLeave={() => handleSectionLeave(sectionName)}
//             data-cy={sectionName}
//           >
//             <div className={styles.sectionHeader}>
//               <h2>{sectionName}</h2>
//             </div>
//             <div>{items.map((item, index) => renderMenuItem(item, sectionName, index))}</div>
//           </section>
//         ))}
//       </main>

//       {memoizedSections.length > 0 && (
//         <div className={styles.sectionTitle}>
//           <h5 className={styles.titleStructure}>Menú</h5>
//         </div>
//       )}

//       <main className={styles.main}>
//         {memoizedSections.map(([sectionName, items]) => (
//           <section
//             key={sectionName}
//             data-section={sectionName}
//             className={styles.section}
//             onMouseEnter={() => handleSectionEnter(sectionName)}
//             onMouseLeave={() => handleSectionLeave(sectionName)}
//             data-cy={sectionName}
//           >
//             <div className={styles.sectionHeader}>
//               <h2>{sectionName}</h2>
//             </div>
//             <div>{items.map((item, index) => renderMenuItem(item, sectionName, index))}</div>
//           </section>
//         ))}
//       </main>

//       <div className={styles.schedules} onMouseEnter={() => handleSectionEnter("schedules")}>
//         <Schedules
//           Schedules={schedules}
//           fontSize={isMobile ? "11px" : "13px"}
//           fontWeight="500"
//           color="#ddd"
//           fontFamily="Helvetica, sans-serif"
//           data-cy={`Schedules`}
//         />
//       </div>

//       <footer className={styles.footer}>
//         <p>{`© ${new Date().getFullYear()} LlakaScript`}</p>
//       </footer>
//     </div>
//   );
// };

// export default Menuone;



"use client";

import type React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/components/Logo/Logo";
import Info from "@/components/Info/Info";
import Schedules from "@/components/Schedules/Schedules";
import styles from "./MenuNew.module.css";
import useSectionTimeTracker from "../../../../hooks/useSectionTimeTracker";
import { extractLastSegment } from "../../../../tools/urlService";
import MoreInfo from "@/components/moreInfo/MoreInfo";
import CatchOrder from "@/components/CatchOrder/CatchOrder";
import { extraBeforeCheck } from "@/services/extraBeforeCheck.services";
import { Button, IconButton, Typography } from "@mui/material";
import ReusableModal from "@/components/ReusableModal/ReusableModal";
import CloseIcon from '@mui/icons-material/Close';
import useOrderManager from "../../../../hooks/useOrderManager";
import OrderFlow from "@/components/Orders/Orderflow";

interface MenuItem {
  Item_id: string;
  Name: string;
  Description: string;
  Price: string | number;
  Menu_Title: string;
  Item_Image: string;
  extra?: any;
  extras?: any;
}

interface MenuProps {
  menuData: any;
  groupedSections: { [key: string]: MenuItem[] };
  groupedSectionpromotions: { [key: string]: MenuItem[] };
  backgroundImages: any;
  namecompanies: string;
  promotions: any;
  info: any;
  schedules: any;
  config: any[];
  paymentLevel: any;
}

const Menuone: React.FC<MenuProps> = (props) => {
  const { backgroundImages, config, groupedSections, groupedSectionpromotions, info, menuData, promotions, schedules, paymentLevel = 0 } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [iconURL, setIconURL] = useState<string>("");
  const [namecompanies, setNamecompanies] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { orders, addOrder, editOrder, deleteOrder } = useOrderManager()
  if (orders.length > 0) console.log("🚀 ~ orders:*************", orders)

  // // // const [orders, setOrders] = useState<any[]>([]);
  // // // console.log("🚀 ~ orders:", orders)

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      const data = window.location.href;
      setNamecompanies(extractLastSegment(data));

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
        setIsSmallScreen(window.innerWidth <= 480);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const { handleSectionEnter, handleSectionLeave, handleClick } = useSectionTimeTracker(namecompanies);

  useEffect(() => {
    if (config?.length) {
      setIconURL(config[0].IconBrand || "");
    }
  }, [config]);

  const memoizedSectionsPromotions = (groupedSectionpromotions ? Object.entries(groupedSectionpromotions) : [])
    .map(([sectionName, items]) => {
      const filteredItems = items.filter(
        (item: any) =>
          [item.Name, item.Description, item.Menu_Title, item.Section].some(
            (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
          ) ||
          (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
      );
      return [sectionName, filteredItems] as [string, MenuItem[]];
    })
    .filter(([, items]) => items.length > 0);

  const memoizedSections = Object.entries(groupedSections)
    .map(([sectionName, items]) => {
      const filteredItems = items.filter(
        (item) =>
          [item.Name, item.Description, item.Menu_Title].some(
            (field) => typeof field === "string" && field.toLowerCase().includes(searchTerm.toLowerCase()),
          ) ||
          (typeof item.Price === "string" && item.Price.toLowerCase().includes(searchTerm.toLowerCase())),
      );
      return [sectionName, filteredItems] as [string, MenuItem[]];
    })
    .filter(([, items]) => items.length > 0);

  // // // // const handleOrderConfirm = async (newOrder: any) => {
  // // // //   setOrders((prevOrders) => [...prevOrders, newOrder]);
  // // // // };


  const getElementId = (sectionName: string, index: number, itemName: string) => {
    return `${sectionName}-${index}-${itemName}`;
  };
  const renderMenuItem = (item: MenuItem, sectionName: string, index: number) => {
    const elementId = getElementId(sectionName, index, item.Name);

    return (
      <div
        key={elementId}
        className={styles.menuItem}
        onMouseLeave={() => handleSectionLeave(elementId)}
        onClick={() => handleClick(elementId, "menuItem")}
        data-cy={`${elementId}-menuItem`}
      >

        <div className={styles.cardImage}>
          <Image
            src={item.Item_Image || "/placeholder.svg"}
            alt={item.Name}
            width={isSmallScreen ? 60 : 120}
            height={isSmallScreen ? 40 : 80}
            priority
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            onClick={() => handleClick(elementId, "image")}
            data-cy={`${elementId}-image`}
          />
        </div>
        <div className={styles.itemDetails}>
          <h2 title={item.Name}>{item.Name}</h2>
          <div
            className={styles.itemDescription}
            title={item.Description}
            style={{
              fontSize: isSmallScreen ? "12px" : "14px",
              maxHeight: isSmallScreen ? "3.6em" : "none",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: isSmallScreen ? 2 : "none",
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.Description}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            <p className={styles.price}>{`$${item.Price}`}</p>
            <MoreInfo
              titleModal={item.Name}
              modalcontent={item.Description}
              labelInfo={"More Info"}
            />
          </div>
        </div>
        <CatchOrder
          title={item.Name}
          description={item.Description}
          price={item.Price}
          extra={item?.extras}
          urlImage={item.Item_Image}
          // onConfirm={handleOrderConfirm}
          onConfirm={addOrder}
        />

      </div>
    );
  };

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: backgroundImages || "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      data-cy="empresa-page-menu"
    >
      <header className={styles.header}>
        <div onMouseEnter={() => handleSectionEnter("logo")}>
          {iconURL && (
            <Logo
              namecompanies={namecompanies}
              logoUrl={iconURL}
              size={isMobile ? 80 : 100}
              fontSize={isMobile ? "24px" : "30px"}
              fontWeight="700"
              color="#ffffff"
              fontFamily="Arial, sans-serif"
              data-cy="Logo"
            />
          )}
        </div>
        <div onMouseEnter={() => handleSectionEnter("info")}>
          {info && (
            <Info
              info={info}
              fontSize={isMobile ? "11px" : "13px"}
              fontWeight="500"
              color="#dddddd"
              fontFamily="Helvetica, sans-serif"
              data-cy="Info"
            />
          )}
        </div>
        <div onMouseEnter={() => handleSectionEnter("search")}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar en el menú..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            data-cy="Search"
          />
        </div>
      </header>

      {memoizedSectionsPromotions.length > 0 && (
        <div className={styles.sectionTitle}>
          <h5 className={styles.titleStructure}>Promoción</h5>
        </div>
      )}

      <main className={styles.main}>
        {memoizedSectionsPromotions.map(([sectionName, items]) => (
          <section
            key={sectionName}
            data-section={sectionName}
            className={styles.section}
            onMouseEnter={() => handleSectionEnter(sectionName)}
            onMouseLeave={() => handleSectionLeave(sectionName)}
            data-cy={sectionName}
          >
            <div className={styles.sectionHeader}>
              <h2>{sectionName}</h2>
            </div>
            <div>{items.map((item, index) => renderMenuItem(item, sectionName, index))}</div>
          </section>
        ))}
      </main>

      {memoizedSections.length > 0 && (
        <div className={styles.sectionTitle}>
          <h5 className={styles.titleStructure}>Menú</h5>
        </div>
      )}

      <main className={styles.main}>
        {memoizedSections.map(([sectionName, items]) => (
          <section
            key={sectionName}
            data-section={sectionName}
            className={styles.section}
            onMouseEnter={() => handleSectionEnter(sectionName)}
            onMouseLeave={() => handleSectionLeave(sectionName)}
            data-cy={sectionName}
          >
            <div className={styles.sectionHeader}>
              <h2>{sectionName}</h2>
            </div>
            <div>{items.map((item, index) => renderMenuItem(item, sectionName, index))}</div>
          </section>
        ))}
      </main>

      <div className={styles.schedules} onMouseEnter={() => handleSectionEnter("schedules")}>
        <Schedules
          Schedules={schedules}
          fontSize={isMobile ? "11px" : "13px"}
          fontWeight="500"
          color="#ddd"
          fontFamily="Helvetica, sans-serif"
          data-cy={`Schedules`}
        />
      </div>

      <footer className={styles.footer}>
        <p>{`© ${new Date().getFullYear()} LlakaScript`}</p>
      </footer>

      <OrderFlow
        orders={orders} // Lista de órdenes seleccionadas
        editOrder={editOrder} // Función para editar una orden
        deleteOrder={deleteOrder} // Función para eliminar una orden
      />


    </div>
  );
};

export default Menuone;