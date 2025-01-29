import type React from "react"
import styles from "./SkeletonLoader.module.css"

const SkeletonLoader: React.FC = () => {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.skeletonHeader}></div>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonItem}></div>
        <div className={styles.skeletonItem}></div>
        <div className={styles.skeletonItem}></div>
      </div>
    </div>
  )
}

export default SkeletonLoader

