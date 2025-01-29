'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './ElegantCarousel.module.css'

interface Item {
  id: string | number
  title: string
  description?: string
  image?: string
}

interface HorizontalCarouselProps {
  items: Item[]
}

export default function HorizontalCarousel({ items }: any) {
  console.log("🚀 ~ HorizontalCarousel ~ items:", items)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const itemsPerView = 3

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex + itemsPerView >= items.length ? 0 : prevIndex + itemsPerView
      );
      setTimeout(() => setIsTransitioning(false), 300); // Sincronizado con CSS
    }
  }, [isTransitioning, items.length]);
  
  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? Math.max(0, items.length - itemsPerView) : prevIndex - itemsPerView
      );
      setTimeout(() => setIsTransitioning(false), 300); // Sincronizado con CSS
    }
  }, [isTransitioning, items.length]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, 300) // Transition duration

    return () => clearTimeout(timer)
  }, [currentIndex])

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carouselWrapper}>
        <div
          className={styles.carouselContent}
          style={{
            transform: `translateX(-${(currentIndex * (100 / itemsPerView))}%)`,
            width: `${(items.length / itemsPerView) * 100}%`,
          }}
        >
          {items.map((item:any) => (
            <div className={styles.carouselItem} key={item.id}>
              <div className={styles.textContent}>
                <h3 className={styles.title}>{item.Menu_Title}</h3>
                {item.Description && (
                  <h5 className={styles.description}>{item.Description}</h5>
                )}

                {item.Price && (
                  <h5 className={styles.price}>{item.Price}</h5>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className={`${styles.navButton} ${styles.navButtonLeft}`}
        onClick={prevSlide}
        disabled={isTransitioning}
      >
        <ChevronLeft />
      </button>
      <button
        className={`${styles.navButton} ${styles.navButtonRight}`}
        onClick={nextSlide}
        disabled={isTransitioning}
      >
        <ChevronRight />
      </button>
    </div>
  )
}
