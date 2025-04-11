// // import Image from 'next/image'
// // import Link from 'next/link'
// // import styles from './hero.module.css'

// // interface HeroProps {
// //   title: string
// //   description: string
// //   btn1: string
// //   btn2: string
// //   redirections: {
// //     btn1: string
// //     btn2: string
// //   }
// //   img?: {
// //     src: string
// //     alt: string
// //     width: number
// //     height: number
// //     quality?: number
// //   }
// //   video?: {
// //     src: string
// //     type?: string
// //   }
// //   children?: React.ReactNode
// // }

// // export default function Hero({
// //   title,
// //   description,
// //   btn1,
// //   btn2,
// //   redirections,
// //   img,
// //   video,
// //   children
// // }: HeroProps) {
// //   return (
// //     <div className={styles.Herocontainer}>


// //       <section className={styles.hero}>
// //         {video?.src && (
// //           <>
// //             <video
// //               autoPlay
// //               muted
// //               playsInline
// //               className={styles.videoBackground}
// //             >
// //               <source src={video.src} type={video.type || 'video/mp4'} />
// //               Tu navegador no soporta el tag de video.
// //             </video>
// //             <div className={styles.overlay} />
// //           </>
// //         )}
// //         <div className={styles.container}>
// //           <div className={styles.content}>
            
// //             <h1 className={styles.title}>
// //               {title}
// //             </h1>
// //             <div className={styles.description}>
// //               {description}
// //             </div>
// //             <div className={styles.buttons}>
// //               <Link href={redirections.btn1} className={styles.primary}>
// //                 {btn1}
// //               </Link>
// //               <Link href={redirections.btn2} className={styles.secondary}>
// //                 {btn2}
// //               </Link>
// //             </div>
// //           </div>
// //           {img && (
// //             <div className={styles.image}>
// //               <Image
// //                 src={img.src}
// //                 alt={img.alt}
// //                 width={img.width}
// //                 height={img.height}
// //                 quality={img.quality}
// //                 priority
// //                 className={styles.mockup}
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </section>
// //       {children && <div className={styles.childrenContainer}>{children}</div>}

// //     </div>

// //   )
// // }

// import Image from 'next/image';
// import Link from 'next/link';
// import styles from './hero.module.css';

// interface HeroProps {
//   showbuttonsOptions?: boolean;
//   title: string;
//   description: string;
//   btn1: string;
//   btn2: string;
//   redirections?: {
//     btn1?: string;
//     btn2?: string;
//   };
//   img?: {
//     src: string;
//     alt: string;
//     width: number;
//     height: number;
//     quality?: number;
//   };
//   video?: {
//     src: string;
//     type?: string;
//   };
//   children?: React.ReactNode;
// }

// export default function Hero({
//   title,
//   description,
//   btn1,
//   btn2,
//   redirections,
//   img,
//   video,
//   children,
//   showbuttonsOptions = true,
// }: HeroProps) {
//   return (
//     <div className={styles.Herocontainer}>
//       <section className={styles.hero}>
//         {video?.src && (
//           <>
//             <video
//               autoPlay
//               muted
//               playsInline
//               className={styles.videoBackground}
//             >
//               <source src={video.src} type={video.type || 'video/mp4'} />
//               Tu navegador no soporta el tag de video.
//             </video>
//             <div className={styles.overlay} />
//           </>
//         )}
//         <div className={styles.container}>
//           <div className={styles.content}>
//             <h1 className={styles.title}>{title}</h1>
//             <div className={styles.description}>{description}</div>
//             {showbuttonsOptions && (
//               <>
//                 {redirections?.btn1 && (
//                   <Link href={redirections.btn1} className={styles.primary}>
//                     {btn1}
//                   </Link>
//                 )}
//                 {redirections?.btn2 && (
//                   <Link href={redirections.btn2} className={styles.secondary}>
//                     {btn2}
//                   </Link>
//                 )}
//               </>
//             )}
//             <div className={styles.buttons}></div>
//           </div>
//           {img && (
//             <div className={styles.image}>
//               <Image
//                 src={img.src}
//                 alt={img.alt}
//                 width={img.width}
//                 height={img.height}
//                 quality={img.quality}
//                 priority
//                 className={styles.mockup}
//               />
//             </div>
//           )}
//         </div>
//       </section>
//       {children && <div className={styles.childrenContainer}>{children}</div>}
//     </div>
//   );
// }
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './hero.module.css';

interface HeroProps {
  showbuttonsOptions?: boolean;
  title: string;
  description: string;
  btn1: string;
  btn2: string;
  redirections?: {
    btn1?: string;
    btn2?: string;
  };
  img?: {
    src: string;
    alt: string;
    width: number;
    height: number;
    quality?: number;
  };
  video?: {
    src: string;
    type?: string;
  };
  children?: React.ReactNode;
}

// Variantes de animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      delay: 0.2
    }
  }
};

export default function Hero({
  title,
  description,
  btn1,
  btn2,
  redirections,
  img,
  video,
  children,
  showbuttonsOptions = true,
}: HeroProps) {
  return (
    <div className={styles.Herocontainer}>
      <section className={styles.hero}>
        {video?.src && (
          <>
            <motion.video
              autoPlay
              muted
              playsInline
              className={styles.videoBackground}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <source src={video.src} type={video.type || 'video/mp4'} />
              Tu navegador no soporta el tag de video.
            </motion.video>
            <motion.div 
              className={styles.overlay} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          </>
        )}
        
        <div className={styles.container}>
          <motion.div 
            className={styles.content}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 className={styles.title} variants={itemVariants}>
              {title}
            </motion.h1>
            <motion.div className={styles.description} variants={itemVariants}>
              {description}
            </motion.div>
            
            {showbuttonsOptions && (
              <motion.div className={styles.buttons} variants={itemVariants}>
                {redirections?.btn1 && (
                  <Link href={redirections.btn1} className={styles.primary}>
                    {btn1}
                  </Link>
                )}
                {redirections?.btn2 && (
                  <Link href={redirections.btn2} className={styles.secondary}>
                    {btn2}
                  </Link>
                )}
              </motion.div>
            )}
          </motion.div>
          
          {img && (
            <motion.div 
              className={styles.image}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                quality={img.quality}
                priority
                className={styles.mockup}
              />
            </motion.div>
          )}
        </div>
      </section>
      
      {children && (
        <motion.div 
          className={styles.childrenContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}