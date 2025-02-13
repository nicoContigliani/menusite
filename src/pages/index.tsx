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
import LoginB from "@/components/Login/LoginB";
import RegisterB from "@/components/Register/RegisterB";
import LoginWithCode from "@/components/Login/LoginWithCode";

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
  const LoginUser = (data: any) => {
    console.log("🚀 ~ LoginUser ~ data:", data)
    fetch('/api/loginuser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
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


        <button
          onClick={() => LoginUser({ "email": "nico.contigliani@gmail.com", "password": "Jesus6388" })}
        >hola</button>
        <LoginWithCode/>
        {/* <LoginB />
        <RegisterB /> */}




      </div>
    </>
  );
}
