import React from 'react'
import styles from './PromotionsCard.module.css'

interface PromotionItem {
  id: string | number
  Name: string
  Description: string
  Price: string
  Image?: string // Opcional, en caso de que haya una imagen
}

interface PromotionsCardProps {
  item: PromotionItem[]
}

const PromotionsCard: React.FC<PromotionsCardProps> = ({ item }) => {
  return (
    <div className={styles.promotionsContainer}>
      {item?.map((promotion) => (
        <div className={styles.promotionCard} key={promotion.id}>
          {promotion.Image && (
            <img
              src={promotion.Image}
              alt={promotion.Name}
              className={styles.promotionImage}
            />
          )}
          <div className={styles.promotionContent}>
            <h5 className={styles.promotionTitle}>{promotion.Name}</h5>
            <span className={styles.promotionDescription}>{promotion.Description}</span>
            <span className={styles.promotionPrice}>{promotion.Price}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PromotionsCard