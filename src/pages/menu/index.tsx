import Footer from '@/components/Footer/Footer'
import Header from '@/components/layout/header/Header'
import Hero from '@/components/sections/hero/Hero'
import ServicesLicense from '@/components/ServicesLisence/ServicesLisence'
import React from 'react'
import styles from './page.module.css'

const page = () => {
    const redirections = {
        btn1: "/newbrands",
        btn2: "https://menusi.netlify.app/companies/LlakaScript"
    }

    const servicesLicencesData = {
        planes: [
            {
                nombre: "Plan Básico",
                duracion_prueba: 28,
                precio_mensual: 10000,
                caracteristicas: {
                    diseno_menu: "Plantillas personalizables",
                    gestion_productos: "50 productos",
                    codigo_qr: "Estático",
                    idiomas: "1 idioma",
                    pedidos_online: "No incluido",
                    reservas: "No incluido",
                    pagos_online: "No incluido",
                    analitica: "Informes básicos",
                    fidelizacion: "No incluido",
                    redes_sociales: "No incluido",
                    soporte_tecnico: "Email",
                    almacenamiento: "Limitado",
                    usuarios_concurrentes: 1,
                    capacitacion: "Guía online",
                    actualizaciones: "Estándar",
                },
            },
            {
                nombre: "Plan Intermedio",
                duracion_prueba: 45,
                precio_mensual: 20000,
                caracteristicas: {
                    diseno_menu: "Diseño a medida",
                    gestion_productos: "Productos ilimitados",
                    codigo_qr: "Dinámico con seguimiento",
                    idiomas: "3 idiomas con traducción automática",
                    pedidos_online: "Integración con WhatsApp y plataformas",
                    reservas: "Formulario de reservas",
                    pagos_online: "Integración con Mercado Pago",
                    analitica: "Datos de ventas y productos",
                    fidelizacion: "Herramientas básicas",
                    redes_sociales: "Opción de compartir menú",
                    soporte_tecnico: "Chat y teléfono",
                    almacenamiento: "Ampliado",
                    usuarios_concurrentes: 3,
                    capacitacion: "Videotutoriales personalizados",
                    actualizaciones: "Prioritarias",
                },
            },
            {
                nombre: "Plan Premium",
                duracion_prueba: 60,
                precio_mensual: 35000,
                caracteristicas: {
                    diseno_menu: "Diseño interactivo con animaciones",
                    gestion_productos: "Productos ilimitados con gestión de inventario y alérgenos",
                    codigo_qr: "Múltiples códigos QR con promociones personalizadas",
                    idiomas: "Idiomas ilimitados con menús específicos por idioma",
                    pedidos_online: "Plataforma propia con personalización y branding",
                    reservas: "Gestión completa de reservas con recordatorios",
                    pagos_online: "Pasarela de pagos propia con múltiples opciones",
                    analitica: "Analítica avanzada con segmentación y ROI",
                    fidelizacion: "Programas personalizados con segmentación",
                    redes_sociales: "Publicación automática de promociones",
                    soporte_tecnico: "Soporte prioritario 24/7",
                    almacenamiento: "Ilimitado",
                    usuarios_concurrentes: 5,
                    capacitacion: "Sesión online personalizada",
                    actualizaciones: "VIP",
                },
            },
        ],
    }

    return (
        <div>
            <Header
                imagetodo={{
                    src: "/images/flama.png",
                    alt: "Flama",
                    width: 1600,
                    height: 1200,
                    quality: 100,
                }}

            />
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
                >
                    <h3 className={styles?.title}>Servicio y  precio de la plataforma</h3>

                    <ServicesLicense planes={servicesLicencesData} />
                </Hero>
            </div>
            <Footer />
        </div>
    )
}

export default page