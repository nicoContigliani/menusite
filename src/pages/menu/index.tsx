import Header from '@/components/layout/header/Header'
import Hero from '@/components/sections/hero/Hero'
import React from 'react'


const page = () => {
    const redirections={
        btn1:"/newbrands",
        btn2:"/moreinfo"
      }
    return (
        <div>
            <Header />
            <div>
                <Hero
                    title="Menu y página web simple"
                    description="Tenés tu pime y querés hacer cambios de menú seguido y es tediodo la interacción con una web y si lo haes con una hoja de cálculo?"
                    btn1="Generar Menu y Página"
                    btn2="Ver Demos"
                    redirections={redirections}
                    img={{
                        src: "/images/flama.png",
                        alt: "Flama",
                        width: 1600,
                        height: 1200,
                        quality: 100,
                    }}
                    video={{
                        src: '/videos/menu.mp4',
                        type: 'video/mp4'
                      }}
                />
            </div>
        </div>
    )
}

export default page