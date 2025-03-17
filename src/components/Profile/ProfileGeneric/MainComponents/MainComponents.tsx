import React from "react";
import { Grid } from "@mui/material";
import Image from "next/image";
import SelectComponent from "@/components/SelectComponent/SelectComponent";
import useDynamicStyles from "../../../../../hooks/useDynamicStyles";
import CatchOrder from "@/components/CatchOrder/CatchOrder";
// import styles from "../../Profile3/MenuNew.module.css";

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

interface MenuSectionProps {
  sections: [string, MenuItem[]][];
  title: string;
  handleSectionEnter: (sectionName: string) => void;
  handleSectionLeave: (sectionName: string) => void;
  handleClick: (elementId: string, type: string) => void;
  handleChange: (value: { inputValue: string; clarification: string }) => void;
  profile?: any;
  addOrder: any
}

const MenuSection: React.FC<MenuSectionProps> = ({
  sections,
  title,
  handleSectionEnter,
  handleSectionLeave,
  handleClick,
  handleChange,
  profile,
  addOrder
  
}) => {
  const getElementId = (sectionName: string, index: number, itemName: string) => {
    return `${sectionName}-${index}-${itemName}`;
  };
  const styles = useDynamicStyles(profile);
  return (
    <main className={styles.main}>
      {sections.length > 0 && (
        <div className={styles.sectionTitle}>
          <h5 className={styles.titleStructure}>{title}</h5>
        </div>
      )}
      {sections.map(([sectionName, items]) => (
        <Grid
          key={sectionName}
          item
          xs={12}
          data-section={sectionName}
          className={styles.section}
          onMouseEnter={() => handleSectionEnter(sectionName)}
          onMouseLeave={() => handleSectionLeave(sectionName)}
          data-cy={sectionName}
        >
          <div className={styles.sectionHeader}>
            <h2>{sectionName}</h2>
          </div>
          <Grid container spacing={2}>
            {items.map((item, index) => {
              const elementId = getElementId(sectionName, index, item.Name);
              return (
                <Grid
                  key={elementId}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  className={styles.menuItem}
                  onMouseLeave={() => handleSectionLeave(elementId)}
                  onClick={() => handleClick(elementId, "menuItem")}
                  data-cy={`${elementId}-menuItem`}
                >
                  <div className={styles.cardImage}>
                    <Image
                      src={item.Item_Image}
                      alt={item.Name}
                      width={200}
                      height={200}
                      priority
                      style={{ objectFit: "cover" }}
                      onClick={() => handleClick(elementId, "image")}
                      data-cy={`${elementId}-image`}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h2>{item.Name}</h2>
                    <p className={styles.itemDescription}>{item.Description}</p>
                    <p className={styles.price}>{`$${item.Price}`}</p>
                  </div>
                  <div onMouseEnter={() => handleSectionEnter(`Button-${item.Name}`)}>
                    <CatchOrder
                      title={item.Name}
                      description={item.Description}
                      price={item.Price}
                      extra={item?.extras}
                      urlImage={item.Item_Image}
                      onConfirm={addOrder}
                    />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </main>
  );
};

export default MenuSection;