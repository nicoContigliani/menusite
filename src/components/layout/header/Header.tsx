"use client"
import Link from 'next/link'
import { Monitor } from 'lucide-react'
import styles from './header.module.css'
import Image from 'next/image'
import { useState } from 'react'

export default function Header(props: any) {
  const { imagetodo } = props
  const [menuOpen, setMenuOpen] = useState(false)

  // Función para alternar el menú
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image
            src={imagetodo}
            alt="LlakaScript Logo"
            width={100}
            height={100}
            quality={100}
            priority
          />
          <span>LlakaScript</span>
        </Link>
        <button className={styles.menuButton} onClick={toggleMenu}>
          &#9776;
        </button>
        <div className={`${styles.links} ${menuOpen ? styles.show : ''}`}>
          <Link href="#features" className={styles.link}>Features</Link>
          <Link href="#team" className={styles.link}>Team</Link>
          <Link href="#contact" className={styles.link}>Contact</Link>
          <Link href="/login" className={styles.link}>Login</Link>
          <Link href="/register" className={styles.button}>Sign Up</Link>
        </div>
      </nav>
    </header>
  )
}
