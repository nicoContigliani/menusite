// "use client"
// import Link from "next/link"
// import styles from "./header.module.css"
// import Image from "next/image"
// import { useEffect, useState } from "react"
// import { getLocalhostStorage } from "@/services/localstorage.services"

// export default function Header(props: any) {
//   const { imagetodo } = props
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [isLogin, setIsLogin] = useState(false)

//   // Function to toggle the menu
//   const toggleMenu = () => {
//     setMenuOpen(!menuOpen)
//   }

//   // Function to check login status
//   const checkLoginStatus = () => {
//     const storedData = getLocalhostStorage()
//     const loginStatus = storedData.aud != null
//     setIsLogin(loginStatus)
//     return loginStatus
//   }

//   useEffect(() => {
//     // Check login status on mount and set up interval
//     const initialLoginStatus = checkLoginStatus()
//     setIsLogin(initialLoginStatus)

//     const intervalId = setInterval(checkLoginStatus, 1000) // Check every second

//     // Cleanup function to clear interval
//     return () => clearInterval(intervalId)
//   }, [checkLoginStatus]) // Added checkLoginStatus to dependencies

//   const handleLogout = () => {
//     localStorage.clear()
//     setIsLogin(false)
//     // Force a re-check of login status
//     checkLoginStatus()
//   }

//   return (
//     <header className={styles.header}>
//       <nav className={styles.nav}>
//         <Link href="/" className={styles.logo}>
//           <Image
//             src={imagetodo.src || "/placeholder.svg"}
//             alt="LlakaScript Logo"
//             width={100}
//             height={100}
//             quality={100}
//             priority
//           />
//           <span>LlakaScript</span>
//         </Link>
//         <button className={styles.menuButton} onClick={toggleMenu}>
//           &#9776;
//         </button>
//         <div className={`${styles.links} ${menuOpen ? styles.show : ""}`}>
//           <Link href="#features" className={styles.link}>
//             Features
//           </Link>
//           <Link href="#team" className={styles.link}>
//             Team
//           </Link>
//           <Link href="#contact" className={styles.link}>
//             Contact
//           </Link>
//           {isLogin ? (
//             <Link href="/dashboard" className={styles.link}>
//               Products
//             </Link>
//           ) : (
//             <Link href="/login" className={styles.link}>
//               Login
//             </Link>
//           )}
//           {isLogin ? (
//             <Link href="/dashboardproducts" className={styles.button}>
//               Dashboard Products
//             </Link>
//           ) : (
//             <Link href="/register" className={styles.button}>
//               Sign Up
//             </Link>
//           )}
//           {isLogin && (
//             <Link href="/" className={styles.button} onClick={handleLogout}>
//               Logout
//             </Link>
//           )}
//         </div>
//       </nav>
//     </header>
//   )
// }




"use client"
import Link from "next/link"
import styles from "./header.module.css"
import Image from "next/image"
import { useEffect, useLayoutEffect, useState } from "react"
import { getLocalhostStorage } from "@/services/localstorage.services"

export default function Header(props: any) {
  const { imagetodo } = props
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [fullUrl, setFullUrl] = useState("");

  // Function to toggle the menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

  // // Function to check login status
  // const checkLoginStatus = () => {
  //   const storedData = getLocalhostStorage()
  //   const loginStatus = storedData.aud != null
  //   setIsLogin(loginStatus)
  //   return loginStatus
  // }

  // useEffect(() => {
  //   // Check login status on mount and set up interval
  //   const initialLoginStatus = checkLoginStatus()
  //   setIsLogin(initialLoginStatus)

  //   const intervalId = setInterval(checkLoginStatus, 1000) // Check every second

  //   // Cleanup function to clear interval
  //   return () => clearInterval(intervalId)
  // }, [checkLoginStatus]) // Added checkLoginStatus to dependencies

  // const handleLogout = () => {
  //   localStorage.clear()
  //   setIsLogin(false)
  //   // Force a re-check of login status
  //   checkLoginStatus()
  // }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image
            src={imagetodo.src || "/placeholder.svg"}
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
        <div className={`${styles.links} ${menuOpen ? styles.show : ""}`}>
          <Link href="#features" className={styles.link}>
            Features
          </Link>
          <Link href="#team" className={styles.link}>
            Team
          </Link>
          <Link href="#contact" className={styles.link}>
            Contact
          </Link>
          {/* {isLogin ? (
            <Link href="/dashboard" className={styles.link}>
              Products
            </Link>
          ) : (
            <Link href="/login" className={styles.link}>
              Login
            </Link>
          )}
          {isLogin ? (
            <Link href="/dashboardproducts" className={styles.button}>
              Dashboard Products
            </Link>
          ) : (
            <Link href="/register" className={styles.button}>
              Sign Up
            </Link>
          )} */}
          {/* {isLogin && (
            <Link href="/" className={styles.button} onClick={handleLogout}>
              Logout
            </Link>
          )} */}
        </div>
      </nav>
    </header>
  )
}

