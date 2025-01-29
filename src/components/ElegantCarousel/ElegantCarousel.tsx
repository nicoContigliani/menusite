import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from './ElegantCarousel.module.css'

interface CarouselItem {
  id: number
  imageUrl: string
  title: string
}

interface ElegantCarouselProps {
  items: CarouselItem[]
}

export default function ElegantCarousel({ items }: ElegantCarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className={styles.slide}>
            <div className={styles.imageContainer}>
              <Image
                src={item.imageUrl}
                alt={item.title}
                layout="intrinsic" // Keep the image size proportional
                width={600}         // Fixed width to enforce size
                height={700}        // Fixed height to enforce size
                objectFit="cover"  // Ensures the image stays within the container without distortion
              />
            </div>
            <h3 className={styles.title}>{item.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  )
}
