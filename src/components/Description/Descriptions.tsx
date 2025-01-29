import React from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import styles from './Description.module.css'; // Importa los estilos responsivos

export const DescriptionComponent: React.FC<{ items: DescriptionsProps['items'] }> = ({ items }) => {
    console.log("🚀 ~ items:", items)
    return (
        <div className={styles.descriptionContainer}>

            {
                items && items.map((item, index) => (
                    <div className={styles.descriptionItem} key={index}>
                        <div className={styles.itemValue}>
                            <strong>
                                {item.label}:
                            </strong>
                            <span>
                                {item.children}
                            </span>
                        </div>
                    </div>
                ))
            }


        </div>
    );
};
