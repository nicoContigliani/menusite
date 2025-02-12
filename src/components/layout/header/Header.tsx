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





// "use client"
// import Link from "next/link"
// import styles from "./header.module.css"
// import Image from "next/image"
// import { useEffect, useLayoutEffect, useState } from "react"
// import { getLocalhostStorage } from "@/services/localstorage.services"
// import ModalComponents from "@/components/ModalComponents/ModalComponents"
// import LoginForm from "@/components/Auth/LoginForm"
// import { Button } from "antd"
// import Auth from "@/components/Auth/Auth"

// export default function Header(props: any) {
//   const { imagetodo } = props
//   const [menuOpen, setMenuOpen] = useState(false)
//   const [isLogin, setIsLogin] = useState(true)
//   const [fullUrl, setFullUrl] = useState("")
//   const [openResponsive, setOpenResponsive] = useState(false)
//   const [isRegistering, setIsRegistering] = useState(false)

//   useLayoutEffect(() => {
//     if (typeof window !== "undefined") {
//       setFullUrl(window.location.href)
//     }
//   }, [])

//   const toggleAuthForm = () => setIsRegistering(!isRegistering)

//   useEffect(() => {
//     setIsRegistering(!isRegistering)
//   }, [isLogin])

//   const handleCloseModal = () => {
//     setOpenResponsive(false) // Cierra el modal correctamente
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
//         <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
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
//           {
//             isRegistering ?
//               <Button type="link" onClick={() => setOpenResponsive(true)}>Login / Register</Button>
//               :
//               <Button type="primary" onClick={() => setOpenResponsive(true)}>LogOut</Button>
//           }
//         </div>
//         <ModalComponents openResponsive={openResponsive} setOpenResponsive={setOpenResponsive} onClose={handleCloseModal}>
//           <Auth
//             redirections={true}
//             setOpenResponsive={setOpenResponsive}
//             fullUrl={fullUrl}
//             setIsLogin={setIsLogin}
//           />
//         </ModalComponents>
//       </nav>



//     </header>
//   )
// }


import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import ModalComponents from "@/components/ModalComponents/ModalComponents";
import { Button } from "antd";
import Auth from "@/components/Auth/Auth";
import AuthB from "@/components/AuthB/AuthB";

export default function Header(props: any) {
  const { imagetodo } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Use isLogin directly
  const [fullUrl, setFullUrl] = useState("");
  const [openResponsive, setOpenResponsive] = useState(false);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

  const handleCloseModal = () => {
    setOpenResponsive(false); // Close the modal correctly
  };
  const handleAuth = () => {
    setOpenResponsive(true)
  }

  const handleLogout = () => {
    // Reset login state and do any necessary cleanup, like clearing tokens or local storage
    setIsLogin(false); // Ensure isLogin is set to false when logging out
    // Optional: Add more logout logic (clear user data, etc.)
    console.log("Logged out");
  };

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
        <button className={styles.menuButton} onClick={() => setMenuOpen(!menuOpen)}>
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
          <Button type="primary" onClick={handleAuth}>Register/Login</Button>

          {/* {
            isLogin ?
              <Button type="primary" onClick={handleLogout}>LogOut</Button> // Show LogOut button when logged in
              :
              <Button type="link" onClick={() => setOpenResponsive(true)}>Login / Register</Button> // Show Login/Register button when logged out
          } */}
        </div>
        {/* <ModalComponents openResponsive={openResponsive} setOpenResponsive={setOpenResponsive} onClose={handleCloseModal}>
          <Auth
            redirections={true}
            setOpenResponsive={setOpenResponsive}
            fullUrl={fullUrl}
            setIsLogin={setIsLogin}
          />
        </ModalComponents> */}
    

      </nav>
    </header>
  );
}
