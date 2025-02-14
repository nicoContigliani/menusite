

"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { getLocalhostStorage } from "@/services/localstorage.services"

const useSectionTimeTracker = (namecompanies: string) => {
  const [sectionTimes, setSectionTimes] = useState<{ [key: string]: number }>({})
  const [totalTime, setTotalTime] = useState<number>(0)
  const [history, setHistory] = useState<{ section: string; timeSpent: number; startTime: number; endTime: number }[]>([])
  const [demos, setDemos] = useState<boolean>(false)

  const storedData = getLocalhostStorage()
  const activeSectionRef = useRef<string | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const lastSentTimeRef = useRef<number>(Date.now())
  const isUserActiveRef = useRef<boolean>(true)
  const sendIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const [userData, setUserData] = useState<{ userId: string; email: string}>({
    userId: storedData?._id || "",
    email: storedData?.email || "",  
  })

  // Función para actualizar datos del usuario desde localStorage
  const updateUserDataFromStorage = useCallback(() => {

    if (storedData?.isLogin) {
      setUserData({
        userId: storedData._id || "",
        email: storedData.email || "",
      })
    }

    if (storedData?.demo) {
      setDemos(true)
    }
  }, [storedData, namecompanies]) // Se asegura de actualizarse con ambos valores

  useEffect(() => {
    updateUserDataFromStorage()

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === null || event.key.startsWith("your_localstorage_key_prefix")) {
        updateUserDataFromStorage()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [updateUserDataFromStorage])

  useEffect(() => {
    console.log("🆕 userData actualizado:", userData)
  }, [userData])

  const handleSectionEnter = useCallback(
    (section: string) => {
      if (demos) return // No hacer seguimiento si es demo

      const now = Date.now()

      if (activeSectionRef.current && startTimeRef.current) {
        const elapsedTime = now - startTimeRef.current
        const previousSection = activeSectionRef.current

        setSectionTimes((prev) => ({
          ...prev,
          [previousSection]: (prev[previousSection] || 0) + elapsedTime,
        }))

        setTotalTime((prev) => prev + elapsedTime)

        setHistory((prev) => [
          ...prev,
          { section: previousSection, timeSpent: elapsedTime, startTime: startTimeRef.current!, endTime: now },
        ])
      }

      activeSectionRef.current = section
      startTimeRef.current = now
    },
    [demos],
  )

  const sendData = useCallback(
    async (force = false) => {
      if (demos) return // No enviar datos si es demo

      const now = Date.now()
      if (!force && (now - lastSentTimeRef.current < 5000 || !isUserActiveRef.current)) return
      if (history.length === 0 && Object.keys(sectionTimes).length === 0) return

      const dataToSend = { ...userData, sectionTimes, totalTime, history,namecompanie: namecompanies }

      try {
        const response = await fetch("/api/trackTime", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        })

        if (response.ok) {
          lastSentTimeRef.current = now
        } else {
          throw new Error("Error en el envío")
        }
      } catch (error) {
        console.error("❌ Error al enviar datos:", error)
      }
    },
    [userData, sectionTimes, totalTime, history, demos],
  )

  useEffect(() => {
    if (demos) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendData(true)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [sendData, demos])

  useEffect(() => {
    if (demos) return

    const scheduleSend = () => {
      sendIntervalRef.current = setTimeout(() => {
        if (isUserActiveRef.current && activeSectionRef.current && startTimeRef.current) {
          handleSectionEnter(activeSectionRef.current)
          sendData()
        }
        scheduleSend()
      }, 5000)
    }

    scheduleSend()

    return () => {
      if (sendIntervalRef.current) clearTimeout(sendIntervalRef.current)
    }
  }, [handleSectionEnter, sendData, demos])

  return { sectionTimes, totalTime, history, handleSectionEnter,namecompanie: namecompanies }
}

export default useSectionTimeTracker
