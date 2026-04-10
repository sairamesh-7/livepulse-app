import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>▶</span>
          <span className={styles.logoText}>StreamFest</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Browse</Link>
          <Link href="/" className={styles.navLink}>Schedule</Link>
          <Link href="/" className={styles.navLink}>Categories</Link>
        </nav>

        <button className={styles.cta}>
          Go Live
        </button>
      </div>
    </header>
  )
}
