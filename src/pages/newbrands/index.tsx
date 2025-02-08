"use client"
import dynamic from "next/dynamic"
import { useEffect, useLayoutEffect, useMemo, useState } from "react"
import styles from "./newbrands.module.css"
import { Button, type DescriptionsProps, Divider } from "antd"
import StaffOfSystem from "@/components/StaffOfSystem/StaffOfSystem"
import Header from "@/components/layout/header/Header"
import { getLocalhostStorage } from "@/services/localstorage.services"
import ModalComponents from "@/components/ModalComponents/ModalComponents"
import Login from "@/components/Login/Login"
import QrComponents from "@/components/QrComponents/QrComponents"
import ResultComponents from "@/components/ResultComponents/ResultComponents"
import useStepVisibility from "../../../hooks/useStepVisibility"

const DescriptionComponent = dynamic(() => import("@/components/Description/Descriptions"), { ssr: false })
const StepsComponent = dynamic(() => import("../../components/steps/Steps"), {
  ssr: false,
})
const Navbar = dynamic(() => import("@/components/Navbar/Navbar"))
const DownloadFile = dynamic(() => import("@/components/DownloadFile/DownloadFile"))
const UploadImageToStorage = dynamic(() => import("@/components/UploadImageToStorage/UploadImageToStorage"))
const Profile = dynamic(() => import("@/components/Profile/Profile"))
const Licence = dynamic(() => import("@/components/Licence/Licence"))

interface DescriptionItem {
  key: string
  label: string
  children: any
}

const page = () => {

  const [isLogin, setIsLogin] = useState(false);
  const [openResponsive, setOpenResponsive] = useState(false);

  // Estados relacionados con los pasos del proceso
  const [current, setCurrent] = useState<number>(0);
  const [showDownload, setShowDownload] = useState(false);
  const [showUploadImageToStorage, setShowUploadImageToStorage] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLicence, setShowLicence] = useState(false);
  const [showStaff, setShowStaff] = useState(false);

  // Estados relacionados con los datos y archivos
  const [dataResult, setDataResult] = useState<any | any[] | undefined>();
  const [dataURlSupabase, setDataURlSupabase] = useState<any | any[] | undefined>("");
  const [uploadedFiles, setUploadedFiles] = useState<any | any[] | undefined>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [folderName, setFolderName] = useState<string | null>(null);

  // Estados relacionados con la confirmación y el pago
  const [labelCheck, setLabelCheck] = useState<any>("Confirmar Condiciones");
  const [checked, setChecked] = useState<boolean>(false);
  const [paymentLevel, setPaymentLevel] = useState<number>(0);

  // Estados relacionados con los ítems y botones
  const [items, setItems] = useState<any | any[] | undefined>([
    {
      title: "Descargar Excel con el formato obligatorio",
      description: "Es obligatorio ",
    },
    {
      title: "Ingreso de Archivo Excel e imagenes",
      description: "Es obligatorio ",
    },
    {
      title: "Selección de perfil",
      description: "El pefil ocupa la información del Excel",
    },
    {
      title: "Licncia de uso",
      description: "Step 3",
    },
    {
      title: "Confirmación de usuarios y Creación",
      description: "Step 4",
    },
  ]);
  const [abilityButtonSend, setAbilityButtonSend] = useState<boolean>(false);

  // Estados relacionados con la URL y el icono
  const [iconsUrl, setIconsUrl] = useState<any | any[] | undefined>("/images/flama.png");
  const [finishit, setFinishit] = useState<boolean>(false);
  const [fullUrl, setFullUrl] = useState("");


  const dataMocks = {
    Hoja1: [
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna Nico",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Pizza",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
      {
        Menu_Title: "Cucina Italiana",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "segunda",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "17.50",
      },
    ],
    Promotion: [
      {
        Menu_Title: "Pizza Tropical",
        Profile_Type: "profile_ten",
        Primary_Color: "#33ffff",
        Secondary_color: "#d2a700",
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "27.50",
        profile: 1,
      },
      {
        Menu_Title: "Pizza Salchipapas",
        Profile_Type: "profile_ten",
        Primary_Color: "#33ffff",
        Secondary_color: "#d2a700",
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "27.50",
        profile: 1,
      },
      {
        Menu_Title: "Pizza Cuatro Quesos",
        Profile_Type: "profile_ten",
        Primary_Color: "#33ffff",
        Secondary_color: "#d2a700",
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "27.50",
        profile: 1,
      },
      {
        Menu_Title: "Pizza Cuatro Variada",
        Profile_Type: "profile_ten",
        Primary_Color: "#33ffff",
        Secondary_color: "#d2a700",
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "27.50",
        profile: 1,
      },
      {
        Menu_Title: "Pizza con Palmitos",
        Profile_Type: "profile_ten",
        Primary_Color: "#33ffff",
        Secondary_color: "#d2a700",
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/fondo.png",
        Item_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/lasagna.jpg",
        Section: "primera",
        Item_id: 1,
        Name: "Lasagna",
        Description: "asaña clásica con carne y salsa bechamel",
        Price: "27.50",
        profile: 1,
      },
    ],
    Config: [
      {
        Background_Image:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/italia.jpg",
        IconBrand:
          "https://bvzjttzvsriwmdokdupp.supabase.co/storage/v1/object/public/llakaScriptBucket/companiesFolders/LlakaScript/icono.png",
      },
    ],
    Info: [
      {
        phone: 54900000,
        mail: "todo@gmail,com",
        x: "http:algo.com",
        instagram: "http:algo.com",
        facebook: "http:algo.com",
        web: "http:algo.com",
        whatsapp: 5492222222,
        ubication: "calle libertad 17",
      },
    ],
    schedules: [
      {
        day: "lunes",
        servicehours: "8:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "martes",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "miércoles",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "jueves",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "viernes",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "sábado",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
      {
        day: "domingo",
        servicehours: "9:00hs a 12:30 hs, 20:00hs a 00:30 hs  ",
      },
    ],
    staff: [
      {
        role: "owner",
        email: "nico.contigliani@gmail.com",
      },
      {
        role: "admin",
        email: "pedro.contigliani@gmail.com",
      },
      {
        role: "employees",
        email: "macarena.contigliani@gmail.com",
      },
    ],
  }

  useEffect(() => {
    const storedData = getLocalhostStorage()
    console.log("🚀 ~ useEffect ~ storedData:", storedData)
    if (storedData.aud != null) {
      const { aud, email, access_token, expires_at, userid } = storedData
      console.log("🚀 ~ useEffect ~ aud:", aud)
      setIsLogin(true)
    } else {
      setOpenResponsive(true)
    }
  }, [])

  const { setCurrent: updateStep } = useStepVisibility({
    current,
    setCurrent,
    setShowDownload,
    setShowUploadImageToStorage,
    setShowProfile,
    setShowLicence,
    setShowStaff
  });


  useEffect(() => {
    setDataURlSupabase(dataResult)
  }, [dataResult])

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

  //TODO activar esto para produccion

  useEffect(() => {
    if ([2, 3, 4].includes(current) && (!dataResult?.Hoja1 || !dataResult?.Config)) {
      setCurrent(1);

      setShowDownload(false);
      setShowUploadImageToStorage(true);
      setShowProfile(false);
      setShowLicence(false);
      setShowStaff(false);
    }
  }, [current, dataResult]);



  useEffect(() => {
    if (dataResult && checked && folderName && selectedProfile) {
      setAbilityButtonSend(true)
    }
  }, [dataResult && checked && folderName && selectedProfile])


  const handleCreate = async () => {
    const data = {
      filePath: `/foldercompanies/${folderName}`,
      companyName: `${folderName}`,
      folderName: `${folderName}`,
      hojas: dataResult,
      selectedProfile: selectedProfile,
      status_Companies: true

    };


    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setFinishit(true)

      } else {
        console.error('Error en la solicitud:', response.statusText);
      }
    } catch (error) {
      console.error('Error al hacer la solicitud:', error);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <ModalComponents
          openResponsive={openResponsive}
          setOpenResponsive={setOpenResponsive}>
          {
            isLogin ?
              <div>
                si
              </div>
              :
              <Login
                redirections={true}
                setOpenResponsive={setOpenResponsive}
                fullUrl={fullUrl}
             />
         }
        </ModalComponents>

        <Header
          imagetodo={{
            src: "/images/flama.png",
            alt: "Flama",
            width: 1600,
            height: 1200,
            quality: 100,
          }}
        />
      </div>
      {
        finishit ?
          <div className={styles.result}>
            < ResultComponents
              operationStatus="success"
              title="Successfully"
              subTitle="Company created successfully"
            >
              <QrComponents
                errorLevel="H"
                value={`https://menusi.netlify.app/companies/${folderName}`}
                icon={"/images/flama.png"}
              />
              
              <Button
                type="primary"
                block
                style={{ marginTop: "16px" }}
                onClick={() => window.location.href = `https://menusi.netlify.app/companies/${folderName || "LlakaScript"}`}
              >
                Go to {folderName}
              </Button>
            </ResultComponents>
          </div> :
          null
      }
      <div className={styles.container}>
        {
          finishit ? "" :
            <div className={styles.steps}>
              <Divider />
              {showProfile ? <Navbar /> : null}
              <Divider />
              <StepsComponent items={items} current={current} setCurrent={setCurrent} />
            </div>
        }
        {
          finishit ? "" :
            <div className={styles.body}>
              {showDownload ? (
                <DownloadFile setCurrent={setCurrent} />
              ) : null}
              {showUploadImageToStorage ? (
                <UploadImageToStorage
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  setCurrent={setCurrent}
                  setDataResult={setDataResult}
                  folderName={folderName}
                  setFolderName={setFolderName}
                />
              ) : null}
              {showProfile ? (
                <Profile
                  folderName={folderName}
                  dataResult={dataResult}
                  paymentLevel={paymentLevel}
                  setSelectedProfile={setSelectedProfile}
                  setCurrent={setCurrent}
                  dataMocks={dataMocks}
                />
              ) : null}
              {showLicence ? (
                <Licence
                  labelCheck={labelCheck}
                  setLabelCheck={setLabelCheck}
                  checked={checked}
                  setChecked={setChecked}
                  setCurrent={setCurrent}
                />
              ) : null}

              {showStaff ? <StaffOfSystem staffData={dataResult || dataMocks} /> : null}

              <div>
                {/* Botón de Crear */}
                <div className={styles.buttonContainer}>
                  {
                    (abilityButtonSend) &&
                    <Button type="primary" block size="large" onClick={handleCreate}>
                      Crear
                    </Button>
                  }
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  )
}

export default page

