import { useState, useEffect } from "react"

export interface MenuItem {
  Menu_Title: string
  Background_Image: string
  Item_Image: string
  Section: string
  Item_id: number
  Name: string
  Description: string
  Price: string
}

export interface ConfigType {
  Background_Image?: string
  IconBrand?: string
}

export interface InfoType {
  facebook?: string
  instagram?: string
  mail?: string
  phone?: string
  ubication?: string
  web?: string
  whatsapp?: string
  x?: string
  delivery?: string
  reservation?: string
  pay?: string
  chatboot: string
}

export interface SchedulesType {
  day?: string
  servicehours?: string
}

export interface DataGeneral {
  Hoja1: MenuItem[]
  Promotion?: any
  Config?: ConfigType[]
  Info?: InfoType[]
  schedules?: SchedulesType[],
  paymentLevel: number
}

export const useMenuData = (dataGeneral: DataGeneral) => {
  const [menuData, setMenuData] = useState<MenuItem[]>([])
  const [backgroundImageSet, setBackgroundImageSet] = useState<string | null>(null)
  const [promotions, setPromotions] = useState<any | null>(null)
  const [info, setInfo] = useState<InfoType[] | null>(null)
  const [schedules, setSchedules] = useState<SchedulesType[] | null>(null)
  const [config, setConfig] = useState<ConfigType[] | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [paymentLevel,setPaymentLevel]= useState(dataGeneral?.paymentLevel)

  useEffect(() => {
    if (dataGeneral && dataGeneral.Hoja1) {
      const { Hoja1, Promotion, Config, Info, schedules,paymentLevel } = dataGeneral

      if (Hoja1.length > 0) setMenuData(Hoja1)
      if (Config?.[0]?.Background_Image) {
        setBackgroundImageSet(
          Config[0].Background_Image
            ? `url("${Config[0].Background_Image}")`
            : `url("/foldercompanies/LlakaScript/fondo.png")`,
        )
      }
      if (Promotion) setPromotions(Promotion)
      if (Info) setInfo(Info)
      if (schedules) setSchedules(schedules)
      if (Config) setConfig(Config)

      setIsReady(true)
    }
  }, [dataGeneral])

  return {
    menuData,
    backgroundImageSet,
    promotions,
    info,
    schedules,
    config,
    isReady,
  }
}

export const useMenuDataAternative = (dataGeneral: any) => {
  const [menuData, setMenuData] = useState<MenuItem[]>([])
  const [backgroundImageSet, setBackgroundImageSet] = useState<string | null>(null)
  const [promotions, setPromotions] = useState<any | null>(null)
  const [info, setInfo] = useState<InfoType[] | null>(null)
  const [schedules, setSchedules] = useState<SchedulesType[] | null>(null)
  const [config, setConfig] = useState<ConfigType[] | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (dataGeneral && dataGeneral?.hojas?.Hoja1) {
      const { Hoja1, Promotion, Config, Info, schedules } = dataGeneral?.hojas

      if (Hoja1.length > 0) setMenuData(Hoja1)
      if (Config?.[0]?.Background_Image) {
        setBackgroundImageSet(
          Config[0].Background_Image
            ? `url("${Config[0].Background_Image}")`
            : `url("/foldercompanies/LlakaScript/fondo.png")`,
        )
      }
      if (Promotion) setPromotions(Promotion)
      if (Info) setInfo(Info)
      if (schedules) setSchedules(schedules)
      if (Config) setConfig(Config)

      setIsReady(true)
    }
  }, [dataGeneral])

  return {
    menuData,
    backgroundImageSet,
    promotions,
    info,
    schedules,
    config,
    isReady,
    paymentLevel: dataGeneral?.paymentLevel
  }
}

