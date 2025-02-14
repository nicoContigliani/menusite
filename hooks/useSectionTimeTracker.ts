
// import { useState, useEffect, useRef, useCallback } from "react";
// import { getLocalhostStorage } from "@/services/localstorage.services";

// const useSectionTimeTracker = (namecompanies: string) => {
//   const [sectionTimes, setSectionTimes] = useState<{ [key: string]: number }>({});
//   const [totalTime, setTotalTime] = useState<number>(0);
//   const [history, setHistory] = useState<{ section: string; timeSpent: number; startTime: number; endTime: number }[]>([]);
//   const [userData, setUserData] = useState<{ userId: string; email: string; namecompanie: string }>({
//     userId: "",
//     email: "",
//     namecompanie: "",
//   });

//   const activeSectionRef = useRef<string | null>(null);
//   const startTimeRef = useRef<number | null>(null);
//   const lastSentTimeRef = useRef<number>(Date.now());
//   const isUserActiveRef = useRef<boolean>(true);
//   const sendIntervalRef = useRef<NodeJS.Timeout | null>(null);
//   const [demos, setDemos] = useState<boolean>(false)


//   useEffect(() => {
//     const storedData = getLocalhostStorage();
//     if (storedData?.isLogin) {
//       setUserData({
//         userId: storedData._id,
//         email: storedData.email,
//         namecompanie: namecompanies,
//       });
//     }
//     if (storedData?.demo) {
//       setDemos(true)
//     }
//   }, [namecompanies]);

//   /** 🔹 Detectar actividad del usuario */
//   useEffect(() => {
//     const handleUserActivity = () => {
//       isUserActiveRef.current = true;
//     };

//     const handleUserInactivity = () => {
//       isUserActiveRef.current = false;
//     };

//     const resetInactivityTimer = () => {
//       clearTimeout(sendIntervalRef.current as NodeJS.Timeout);
//       sendIntervalRef.current = setTimeout(handleUserInactivity, 30000);
//     };

//     document.addEventListener("mousemove", handleUserActivity);
//     document.addEventListener("scroll", handleUserActivity);
//     document.addEventListener("keydown", handleUserActivity);
//     document.addEventListener("touchstart", handleUserActivity);
//     document.addEventListener("mousemove", resetInactivityTimer);
//     document.addEventListener("keydown", resetInactivityTimer);

//     sendIntervalRef.current = setTimeout(handleUserInactivity, 30000);

//     return () => {
//       document.removeEventListener("mousemove", handleUserActivity);
//       document.removeEventListener("scroll", handleUserActivity);
//       document.removeEventListener("keydown", handleUserActivity);
//       document.removeEventListener("touchstart", handleUserActivity);
//       document.removeEventListener("mousemove", resetInactivityTimer);
//       document.removeEventListener("keydown", resetInactivityTimer);
//       if (sendIntervalRef.current) clearTimeout(sendIntervalRef.current);
//     };
//   }, []);

//   /** 🔹 Enviar datos */
//   const sendData = useCallback(
//     async (force = false) => {
//       const now = Date.now();
//       if (!force && (now - lastSentTimeRef.current < 5000 || !isUserActiveRef.current)) return;
//       if (history.length === 0 && Object.keys(sectionTimes).length === 0) return;

//       const dataToSend = { ...userData, sectionTimes, totalTime, history };

//       console.log("📤 Datos a enviar:", JSON.stringify(dataToSend, null, 2)); // 🔹 Log antes de enviar

//       try {
//         const response = await fetch("/api/trackTime", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(dataToSend),
//         });

//         if (response.ok) {
//           console.log("✅ Datos enviados correctamente");
//           lastSentTimeRef.current = now;
//         } else {
//           throw new Error("Error en el envío");
//         }
//       } catch (error) {
//         console.error("❌ Error al enviar datos:", error);
//       }
//     },
//     [userData, sectionTimes, totalTime, history]
//   );

//   /** 🔹 Detectar cambio de sección */
//   const handleSectionEnter = useCallback((sectionName: string) => {
//     const now = Date.now();

//     if (activeSectionRef.current && startTimeRef.current) {
//       const elapsedTime = now - startTimeRef.current;
//       const previousSection = activeSectionRef.current;

//       setSectionTimes((prev) => ({
//         ...prev,
//         [previousSection]: (prev[previousSection] || 0) + elapsedTime,
//       }));

//       setTotalTime((prev) => prev + elapsedTime);

//       setHistory((prev) => {
//         return [
//           ...prev,
//           { section: previousSection, timeSpent: elapsedTime, startTime: startTimeRef.current!, endTime: now },
//         ];
//       });
//     }

//     activeSectionRef.current = sectionName;
//     startTimeRef.current = now;
//   }, []);

//   /** 🔹 Asegurar envío de datos incluso si la pestaña está en segundo plano */
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "visible") {
//         sendData(true);
//       }
//     };

//     document.addEventListener("visibilitychange", handleVisibilityChange);
//     return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
//   }, [sendData]);

//   /** 🔹 Envío cada 5s y asegurado en móviles */
//   useEffect(() => {
//     const scheduleSend = () => {
//       sendIntervalRef.current = setTimeout(() => {
//         if (isUserActiveRef.current && activeSectionRef.current && startTimeRef.current) {
//           handleSectionEnter(activeSectionRef.current);
//           sendData();
//         }
//         scheduleSend();
//       }, 5000);
//     };

//     scheduleSend();

//     return () => {
//       if (sendIntervalRef.current) clearTimeout(sendIntervalRef.current);
//     };
//   }, [handleSectionEnter, sendData]);

//   return { sectionTimes, totalTime, history, handleSectionEnter };
// };

// export default useSectionTimeTracker;


import { useState, useEffect, useRef, useCallback } from "react";
import { getLocalhostStorage } from "@/services/localstorage.services";

const useSectionTimeTracker = (namecompanies: string) => {
  const [sectionTimes, setSectionTimes] = useState<{ [key: string]: number }>({});
  const [totalTime, setTotalTime] = useState<number>(0);
  const [history, setHistory] = useState<{ section: string; timeSpent: number; startTime: number; endTime: number }[]>([]);
  const [userData, setUserData] = useState<{ userId: string; email: string; namecompanie: string }>({
    userId: "",
    email: "",
    namecompanie: "",
  });

  const activeSectionRef = useRef<string | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const lastSentTimeRef = useRef<number>(Date.now());
  const isUserActiveRef = useRef<boolean>(true);
  const sendIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [demos, setDemos] = useState<boolean>(false);

  useEffect(() => {
    const storedData = getLocalhostStorage();
    if (storedData?.isLogin) {
      setUserData({
        userId: storedData._id,
        email: storedData.email,
        namecompanie: namecompanies,
      });
    }
    if (storedData?.demo) {
      setDemos(true);
    }
  }, [namecompanies]);

  /** 🔹 Detectar actividad del usuario */
  useEffect(() => {
    if (demos) return; // 🚫 No hacer nada si es demo

    const handleUserActivity = () => {
      isUserActiveRef.current = true;
    };

    const handleUserInactivity = () => {
      isUserActiveRef.current = false;
    };

    const resetInactivityTimer = () => {
      clearTimeout(sendIntervalRef.current as NodeJS.Timeout);
      sendIntervalRef.current = setTimeout(handleUserInactivity, 30000);
    };

    document.addEventListener("mousemove", handleUserActivity);
    document.addEventListener("scroll", handleUserActivity);
    document.addEventListener("keydown", handleUserActivity);
    document.addEventListener("touchstart", handleUserActivity);
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keydown", resetInactivityTimer);

    sendIntervalRef.current = setTimeout(handleUserInactivity, 30000);

    return () => {
      document.removeEventListener("mousemove", handleUserActivity);
      document.removeEventListener("scroll", handleUserActivity);
      document.removeEventListener("keydown", handleUserActivity);
      document.removeEventListener("touchstart", handleUserActivity);
      document.removeEventListener("mousemove", resetInactivityTimer);
      document.removeEventListener("keydown", resetInactivityTimer);
      if (sendIntervalRef.current) clearTimeout(sendIntervalRef.current);
    };
  }, [demos]);

  /** 🔹 Enviar datos */
  const sendData = useCallback(
    async (force = false) => {
      if (demos) return; // 🚫 No enviar datos si es demo

      const now = Date.now();
      if (!force && (now - lastSentTimeRef.current < 5000 || !isUserActiveRef.current)) return;
      if (history.length === 0 && Object.keys(sectionTimes).length === 0) return;

      const dataToSend = { ...userData, sectionTimes, totalTime, history };

      console.log("📤 Datos a enviar:", JSON.stringify(dataToSend, null, 2)); // 🔹 Log antes de enviar

      try {
        const response = await fetch("/api/trackTime", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
          console.log("✅ Datos enviados correctamente");
          lastSentTimeRef.current = now;
        } else {
          throw new Error("Error en el envío");
        }
      } catch (error) {
        console.error("❌ Error al enviar datos:", error);
      }
    },
    [userData, sectionTimes, totalTime, history, demos]
  );

  /** 🔹 Detectar cambio de sección */
  const handleSectionEnter = useCallback(
    (sectionName: string) => {
      if (demos) return; // 🚫 No hacer seguimiento si es demo

      const now = Date.now();

      if (activeSectionRef.current && startTimeRef.current) {
        const elapsedTime = now - startTimeRef.current;
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

      activeSectionRef.current = sectionName;
      startTimeRef.current = now;
    },
    [demos]
  );

  /** 🔹 Asegurar envío de datos incluso si la pestaña está en segundo plano */
  useEffect(() => {
    if (demos) return; // 🚫 No hacer nada si es demo

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendData(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [sendData, demos]);

  /** 🔹 Envío cada 5s y asegurado en móviles */
  useEffect(() => {
    if (demos) return; // 🚫 No hacer nada si es demo

    const scheduleSend = () => {
      sendIntervalRef.current = setTimeout(() => {
        if (isUserActiveRef.current && activeSectionRef.current && startTimeRef.current) {
          handleSectionEnter(activeSectionRef.current);
          sendData();
        }
        scheduleSend();
      }, 5000);
    };

    scheduleSend();

    return () => {
      if (sendIntervalRef.current) clearTimeout(sendIntervalRef.current);
    };
  }, [handleSectionEnter, sendData, demos]);

  return { sectionTimes, totalTime, history, handleSectionEnter };
};

export default useSectionTimeTracker;




