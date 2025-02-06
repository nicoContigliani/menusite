import type React from "react"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import styles from "./Footer.module.css"
import Image from "next/image"
// src: "/images/flama.png",
// alt: "Flama",
// width: 1600,
// height: 1200,
// quality: 100,
const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.logoSection}>
                    <Link href="/" className={styles.logo}>
                        <Image
                            alt=""
                            src="/images/flama.png"
                            width={90}
                            height={90}
                            quality={100}
                        />
                        Llakascript
                    </Link>
                </div>
                <nav className={styles.linksSection}>
                    <Link href="/about" className={styles.link}>
                        About
                    </Link>
                    <Link href="/services" className={styles.link}>
                        Services
                    </Link>
                    <Link href="/contact" className={styles.link}>
                        Contact
                    </Link>
                    <Link href="/privacy" className={styles.link}>
                        Privacy
                    </Link>
                    <Link href="/terms" className={styles.link}>
                        Terms
                    </Link>
                </nav>
                <div className={styles.socialSection}>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                        <Facebook size={18} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                        <Twitter size={18} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                        <Instagram size={18} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                        <Linkedin size={18} />
                    </a>
                </div>
            </div>
            <div className={styles.bottomBar}>
                <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer

