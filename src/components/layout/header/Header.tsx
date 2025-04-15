import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import { useEffect, useLayoutEffect, useState } from "react";
import ModalComponents from "@/components/ModalComponents/ModalComponents";
import { Button } from "antd";
import AuthB from "@/components/AuthB/AuthB";
import { clearLocalhostStorage, getLocalhostStorage } from "@/services/localstorage.services";
import { RootState } from "../../../../store/store";
import { useSelector } from "react-redux";

export default function Header(props: any) {
  const { imagetodo } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false); // Use isLogin directly
  const [fullUrl, setFullUrl] = useState("");
  const [openResponsive, setOpenResponsive] = useState(false);

  const users: any | any[] | undefined = useSelector((state: RootState) => state.auth)
  
  const {
    error,
    isAuthenticated,
    loading,
    user
  } = users

  useEffect(() => {
    const storedData = getLocalhostStorage()
    if (storedData?.aud != null || isAuthenticated|| user !== null) {
      setIsLogin(true)
    } else {
      // setOpenResponsive(true)
    }
  }, [users])




  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

  const handleCloseModal = () => {
    setOpenResponsive(false); // Close the modal correctly
  };


  const handleLogout = () => {
    clearLocalhostStorage();
    setIsLogin(false);
    console.log("Logged out");
  };








  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <Image
            src={imagetodo?.src || "/placeholder.svg"}
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

          {
            isLogin ?
              <Button type="primary" onClick={handleLogout}>LogOut</Button> // Show LogOut button when logged in
              :
              <Button type="link" onClick={() => setOpenResponsive(true)}>Login / Register</Button> // Show Login/Register button when logged out
          }
        </div>
        <ModalComponents openResponsive={openResponsive} setOpenResponsive={setOpenResponsive} onClose={handleCloseModal}>
          <AuthB
            redirections={true}
            setOpenResponsive={setOpenResponsive}
            fullUrl={fullUrl}
            setIsLogin={setIsLogin}
          />
        </ModalComponents>

      </nav>
    </header>
  );
}
