import Image from 'next/image'
import Link from 'next/link'
import styles from './hero.module.css'

interface HeroProps {
  title: string
  description: string
  btn1: string
  btn2: string
  redirections: {
    btn1: string
    btn2: string
  }
  img?: {
    src: string
    alt: string
    width: number
    height: number
    quality?: number
  }
  video?: {
    src: string
    type?: string
  }
}

export default function Hero({
  title,
  description,
  btn1,
  btn2,
  redirections,
  img,
  video
}: HeroProps) {
  return (
    <section className={styles.hero}>
      {video?.src && (
        <>
          <div className={styles.overlay} />
          <video
            autoPlay
            muted
            playsInline
            className={styles.videoBackground}
          >
            <source src={video.src} type={video.type || 'video/mp4'} />
            Tu navegador no soporta el tag de video.
          </video>
        </>
      )}
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            {title}
          </h1>
          <div className={styles.description}>
            {description}
          </div>
          <div className={styles.buttons}>
            <Link href={redirections.btn1} className={styles.primary}>
              {btn1}
            </Link>
            <Link href={redirections.btn2} className={styles.secondary}>
              {btn2}
            </Link>
          </div>
        </div>
        {img && (
          <div className={styles.image}>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              quality={img.quality}
              priority
              className={styles.mockup}
            />
          </div>
        )}
      </div>
    </section>
  )
}

