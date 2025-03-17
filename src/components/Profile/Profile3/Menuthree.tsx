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

import useOrderManager from "../../../../hooks/useOrderManager";
import OrderFlow from "@/components/Orders/Orderflow";
import useRules from "../../../../hooks/useRules";

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
  staff:any;
  schedules: any;
  config: any[];
  paymentLevel: any;
}

const Menuone: React.FC<MenuProps> = (props) => {
  console.log("🚀 ~ props:", props)
  const { backgroundImages, config, groupedSections, groupedSectionpromotions, info, menuData, promotions, schedules, paymentLevel = 0,staff } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [iconURL, setIconURL] = useState<string>("");
  const [namecompanies, setNamecompanies] = useState<string>("");
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { orders, addOrder, editOrder, deleteOrder } = useOrderManager()

  const {hasPermission} = useRules(config, staff)
  if (orders.length > 0) console.log("🚀 ~ orders:*************", orders)
  console.log("🚀 ~ hasPermission:", hasPermission)



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

      {
        orders.length > 0 &&
        <div className={styles.floatingButton}>
          <OrderFlow
            orders={orders} // Lista de órdenes seleccionadas
            editOrder={editOrder} // Función para editar una orden
            deleteOrder={deleteOrder} // Función para eliminar una orden
            info={info}
        />
        </div>
      }

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

    </div>
  );
};

export default Menuone;