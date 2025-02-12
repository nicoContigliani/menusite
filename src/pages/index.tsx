import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import Counter from "@/components/TestReduxCounter/Counter";
import { useMongoDbConnection } from "../../hooks/useMongoDbConnection";
import Header from "@/components/layout/header/Header";
import Hero from "@/components/sections/hero/Hero";
import Features from "@/components/sections/features/Features";
import Contact from "@/components/sections/contact/Contact";
import AuthB from "@/components/AuthB/AuthB";
import { Button } from "antd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { isConnected, error, isLoading, verifyConnection } = useMongoDbConnection();

  const verifiConnection = () => {
    verifyConnection()
  }

  const redirections = {
    btn1: "/products",
    btn2: "/moreinfo"
  }

 const handleClick = () => {
  fetch('/api/todoregister').then(res => res.json()).then(data => console.log(data))
 }

  return (
    <>
      <div>
        {/* <button onClick={verifiConnection}>
          prueba de conexión
        </button>
        <Counter /> */}
        <Header 
        
        imagetodo={{
          src: "/images/flama.png",
          alt: "Flama",
          width: 1600,
          height: 1200,
          quality: 100,
        }}
        />
        <Hero
          title="Nuevas experiencias digitales"
          description="Ovación constante, soluciones excepcionales."
          btn1="Get Started"
          btn2="Learn More"
          redirections={redirections}
          img={{
            src: "/images/flama.png",
            alt: "Flama",
            width: 1600,
            height: 1200,
            quality: 100,
          }}
          video={{
            src: '/videos/presentation.mp4',
            type: 'video/mp4'
          }}
        />
        {/* <Projects/> */}
        <Features />
        <Contact />
      <Button type="primary" onClick={handleClick}>
        si
      </Button>
      </div>
    </>
  );
}
