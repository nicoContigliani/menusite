import Link from 'next/link'
import { Monitor } from 'lucide-react'
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Monitor className="w-6 h-6" />
          <span>LlakaScript</span>
        </Link>
        <div className={styles.links}>
          <Link href="#features" className={styles.link}>Features</Link>
          {/* <Link href="#projects" className={styles.link}>Projects</Link> */}
          <Link href="#team" className={styles.link}>Team</Link>
          <Link href="#contact" className={styles.link}>Contact</Link>
          <Link href="/login" className={styles.link}>Login</Link>
          <Link href="/register" className={styles.button}>Sign Up</Link>
        </div>
      </nav>
    </header>
  )
}

