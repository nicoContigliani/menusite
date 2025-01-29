"use client";
import dynamic from 'next/dynamic';
import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import styles from './newbrands.module.css'
import { DescriptionsProps, Divider, TabsProps } from 'antd';

import { FormaterDataItems } from '../../services/formaterDataItems.services';
import { DescriptionComponent } from '@/components/Description/Descriptions';
import { replaceImageUrls } from '../../services/UploadImageUrl.services';
import Navbar from '@/components/Navbar/Navbar';
import DownloadFile from '@/components/DownloadFile/DownloadFile';
import UploadImageToStorage from '@/components/UploadImageToStorage/UploadImageToStorage';
import Profile from '@/components/Profile/Profile';
import Licence from '@/components/Licence/Licence';




const StepsComponent = dynamic(() => import('../../components/steps/Steps'), {
  ssr: false // Desactiva el renderizado del lado del servidor si es necesario
});

interface DescriptionItem {
  key: string;
  label: string;
  children: any;
}



const page = () => {

  const [current, setCurrent] = useState<number>(0);

  const [items, setItems] = useState<any | any[] | undefined>([
    {
      title: 'Descargar Excel con el formato obligatorio',
      description: "Es obligatorio ",
    },
    {
      title: 'Ingreso de Archivo Excel e imagenes',
      description: "Es obligatorio ",
    },
    {
      title: 'Selección de perfil',
      description: "El pefil ocupa la información del Excel",
    },
    {
      title: 'Licncia de uso',
      description: "Step 3",
    },
  ]);

  const dataHoja1: DescriptionsProps['items'] = useMemo(() => {
    return FormaterDataItems({
      Menu_Title: "Título del menú. Ejemplo: 'Menú de La Trattoria'",
      Profile_Type: "Tipo de perfil del negocio. Ejemplos: 'Restaurante', 'Bar', 'Cafetería', 'Food Truck'",
      Primary_Color: "Color primario para la interfaz. Ejemplo: '#007bff' (azul), '#FF0000' (rojo)",
      Secondary_color: "Color secundario para la interfaz. Ejemplo: '#ffffff' (blanco), '#000000' (negro)",
      Background_Image: "URL de la imagen de fondo del menú. Ejemplo: 'https://ejemplo.com/fondo.jpg'",
      profile: "Nombre del perfil o negocio. Ejemplo: 'Pizzeria Napoli'",
      Section: "Título de una sección del menú. Ejemplo: 'Pastas', 'Ensaladas', 'Bebidas'",
      Item_id: "ID único del ítem del menú. Ejemplo: 'a1b2c3d4-e5f6-7890-1234-567890abcdef'",
      Name: "Nombre del ítem del menú. Ejemplo: 'Espagueti a la Boloñesa'",
      Description: "Descripción del ítem del menú. Ejemplo: 'Espagueti con salsa boloñesa hecha en casa con carne de res y cerdo.'",
      Price: "Precio del ítem del menú. Ejemplo: '12.50', '9.99'",
      Item_Image: "URL de la imagen del ítem del menú. Ejemplo: 'https://ejemplo.com/espagueti.jpg'",
      highlight: "Indica si el ítem está destacado. Ejemplos: 'true' (sí), 'false' (no)",
      status: "Estado del ítem o del perfil. Ejemplos (para un ítem): 'disponible', 'no disponible', 'temporal'. Ejemplos (para un perfil): 'activo', 'inactivo', 'pendiente'"
    });
  }, []); // El array vacío de dependencias asegura que solo se ejecute una vez al montar el componente



  const itemsTabs: any = [
    {
      key: '1',
      label: 'Hoja 1',
      children: <DescriptionComponent items={dataHoja1} />,
    },
    {
      key: '2',
      label: 'Promotions',
      children: <DescriptionComponent items={dataHoja1} />,
    },

  ];

  const [showDownload, setShowDownload] = useState(false)
  const [showUploadImageToStorage, setShowUploadImageToStorage] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showLicence, setShowLicence] = useState(false)

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [xlsxFile, setXlsxFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [downloadURLs, setDownloadURLs] = useState<string[]>([]);
  const [dataFileXLSX, setDataFileXLSX] = useState<Record<string, any[]>>({});
  const [dataResult, setDataResult] = useState<any | any[] | undefined>()
  const [dataURlFirebase, setDataURlFirebase] = useState<any | any[] | undefined>('')

  const [labelCheck, setLabelCheck] = useState<any>("Confirmar Condiciones")
  const [checked, setChecked] = useState<boolean>(false);


  const carouselItems = [
    { id: 1, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 1' },
    { id: 2, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 2' },
    { id: 3, imageUrl: '/resto/blacksheep.png?height=200&width=200', title: 'Slide 3' },
    { id: 4, imageUrl: '/resto/pancho.png?height=200&width=300', title: 'Slide 4' },
    { id: 5, imageUrl: '/resto/estacionpalero.png?height=200&width=300', title: 'Slide 5' },
  ];

  useEffect(() => {
    switch (current) {
      case 0:
        setShowDownload(true)
        setShowProfile(false)
        setShowUploadImageToStorage(false)
        setShowLicence(false)
        break;
      case 1:
        setShowDownload(false)
        setShowProfile(false)
        setShowUploadImageToStorage(true)
        setShowLicence(false)
        break;
      case 2:
        setShowDownload(false)
        setShowUploadImageToStorage(false)
        setShowProfile(true)
        setShowLicence(false)
        break;
      case 3:
        setShowDownload(false)
        setShowUploadImageToStorage(false)
        setShowProfile(false)
        setShowLicence(true)

        break;
      default:
        break;
    }


  }, [current])

  useEffect(() => {
    if (dataResult !== undefined && dataResult !== null) { // Check for both undefined and null
      const todo = replaceImageUrls(dataResult);
      console.log("🚀 ~ useEffect ~ todo:", todo)
      setDataURlFirebase(todo)
    }
  }, [dataResult]);




  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        <Divider />
      
        {
          showProfile ?
            <Navbar />
            : null

        }
        <Divider />

        <StepsComponent
          items={items}
          current={current}
          setCurrent={setCurrent}
        />


      </div>
      <div className={styles.body}>

        {
          showDownload ?
            <DownloadFile
              itemsTabs={itemsTabs}
              setCurrent={setCurrent}

            />
            : null
        }

        {
          showUploadImageToStorage ?
            <UploadImageToStorage
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              xlsxFile={xlsxFile}
              setXlsxFile={setXlsxFile}
              isUploading={isUploading}
              setIsUploading={setIsUploading}
              progressUpload={progressUpload}
              setProgressUpload={setProgressUpload}
              downloadURLs={downloadURLs}
              setDownloadURLs={setDownloadURLs}
              dataFileXLSX={dataFileXLSX}
              setDataFileXLSX={setDataFileXLSX}
              setCurrent={setCurrent}
              setShowUploadImageToStorage={setShowUploadImageToStorage}
              setDataResult={setDataResult}
              dataResult={dataResult}
            />
            : null
        }
        {
          showProfile ?
            <Profile
              dataResult={dataResult}
              items={carouselItems}
              dataURlFirebase={dataURlFirebase}
            />
            : null
        }
        {
          showLicence ?
            <Licence
              labelCheck={labelCheck}
              setLabelCheck={setLabelCheck}
              checked={checked}
              setChecked={setChecked}
            />
            : null
        }


      </div>

    </div>
  )
}

export default page