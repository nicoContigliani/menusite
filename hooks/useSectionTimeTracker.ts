"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getLocalhostStorage } from "@/services/localstorage.services";

const useSectionTimeTracker = (namecompanies: string) => {
  const [sectionTimes, setSectionTimes] = useState<{ [key: string]: number }>({});
  const [totalTime, setTotalTime] = useState<number>(0);
  const [history, setHistory] = useState<{ section: string; timeSpent: number; startTime: number; endTime: number }[]>([]);
  const [clicks, setClicks] = useState<{ section: string; element: string; timestamp: number }[]>([]);
  const [demos, setDemos] = useState<boolean>(false);

  const storedData = getLocalhostStorage();
  const activeSectionRef = useRef<string | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastSentTimeRef = useRef<number>(Date.now());
  const isUserActiveRef = useRef<boolean>(true);
  const sendIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [userData, setUserData] = useState<{ userId: string; email: string }>({
    userId: storedData?._id || "",
    email: storedData?.email || "",
  });

  // Función para actualizar datos del usuario desde localStorage
  const updateUserDataFromStorage = useCallback(() => {
    if (storedData?.isLogin) {
      setUserData({
        userId: storedData._id || "",
        email: storedData.email || "",
      });
    }

    if (storedData?.demo) {
      setDemos(true);
    }
  }, [storedData, namecompanies]);

  useEffect(() => {
    updateUserDataFromStorage();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === null || event.key.startsWith("your_localstorage_key_prefix")) {
        updateUserDataFromStorage();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [updateUserDataFromStorage]);

  useEffect(() => {
    console.log("🆕 userData actualizado:", userData);
  }, [userData]);

  // Manejar la entrada a una sección
  const handleSectionEnter = useCallback(
    (section: string) => {
      if (demos) return; // No hacer seguimiento si es demo

      const now = Date.now();

      // Si ya hay una sección activa, calcular el tiempo transcurrido
      if (activeSectionRef.current && startTimeRef.current) {
        const elapsedTime = now - (startTimeRef.current || now);
        const previousSection = activeSectionRef.current;

        setSectionTimes((prev) => ({
          ...prev,
          [previousSection]: (prev[previousSection] || 0) + elapsedTime,
        }));

        setTotalTime((prev) => prev + elapsedTime);

        setHistory((prev) => [
          ...prev,
          { section: previousSection, timeSpent: elapsedTime, startTime: startTimeRef.current!, endTime: now },
        ]);
      }

      // Establecer la nueva sección activa y el tiempo de inicio
      activeSectionRef.current = section;
      startTimeRef.current = now;
    },
    [demos],
  );

  // Manejar la salida de una sección
  const handleSectionLeave = useCallback(
    (section: string) => {
      if (demos || !activeSectionRef.current || !startTimeRef.current) return;

      const now = Date.now();
      let validEndTime = now;

      // Verificar que endTime no sea menor que startTime
      if (startTimeRef.current && now < startTimeRef.current) {
        validEndTime = startTimeRef.current;
      }

      const elapsedTime = validEndTime - startTimeRef.current!;

      setSectionTimes((prev) => ({
        ...prev,
        [section]: (prev[section] || 0) + elapsedTime,
      }));

      setTotalTime((prev) => prev + elapsedTime);

      setHistory((prev) => [
        ...prev,
        { section, timeSpent: elapsedTime, startTime: startTimeRef.current!, endTime: validEndTime },
      ]);

      // Reiniciar la sección activa y el tiempo de inicio
      activeSectionRef.current = null;
      startTimeRef.current = null;
    },
    [demos],
  );

  // Manejar clics en elementos específicos
  const handleClick = useCallback(
    (section: string, element: string) => {
      if (demos) return; // No hacer seguimiento si es demo

      const now = Date.now();
      setClicks((prev) => [...prev, { section, element, timestamp: now }]); // Registrar el clic
    },
    [demos],
  );

  // Enviar datos al servidor
  const sendData = useCallback(
    async (force = false) => {
      if (demos) return; // No enviar datos si es demo

      const now = Date.now();
      if (!force && (now - lastSentTimeRef.current < 10000 || !isUserActiveRef.current)) return; // Intervalo de 10 segundos
      if (history.length === 0 && Object.keys(sectionTimes).length === 0 && clicks.length === 0) return;

      const dataToSend = { ...userData, sectionTimes, totalTime, history, clicks, namecompanie: namecompanies };

      try {
        const response = await fetch("/api/trackTime", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          lastSentTimeRef.current = now;
        } else {
          // throw new Error("Error en el envío");
          // console.error("❌ Error al enviar datos:");
          console.log("❌ Error al enviar datos:");

        }
      } catch (error) {
        // console.error("❌ Error al enviar datos:", error);

        console.log("❌ Error al enviar datos:");

      }
    },
    [userData, sectionTimes, totalTime, history, clicks, demos, namecompanies],
  );

  // Enviar datos cuando la página se hace visible
  useEffect(() => {
    if (demos) return;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendData(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [sendData, demos]);

  // Programar el envío de datos cada 10 segundos
  useEffect(() => {
    if (demos) return;

    const scheduleSend = () => {
      sendIntervalRef.current = setTimeout(() => {
        if (isUserActiveRef.current && activeSectionRef.current && startTimeRef.current) {
          handleSectionLeave(activeSectionRef.current); // Registrar el tiempo antes de enviar
          sendData();
        }
        scheduleSend();
      }, 10000); // Intervalo de 10 segundos
    };

    scheduleSend();

    return () => {
      if (sendIntervalRef.current) clearTimeout(sendIntervalRef.current);
    };
  }, [handleSectionLeave, sendData, demos]);

  // Enviar datos antes de que el usuario cierre la página
  useEffect(() => {
    if (demos) return;

    const handleBeforeUnload = () => {
      if (activeSectionRef.current && startTimeRef.current) {
        handleSectionLeave(activeSectionRef.current); // Registrar el tiempo antes de cerrar
      }
      sendData(true); // Forzar el envío de datos
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [handleSectionLeave, sendData, demos]);

  return { sectionTimes, totalTime, history, handleSectionEnter, handleSectionLeave, handleClick, namecompanie: namecompanies };
};

export default useSectionTimeTracker;
