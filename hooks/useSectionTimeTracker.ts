// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { getLocalhostStorage } from "@/services/localstorage.services";
// import { set } from "mongoose";

// const useSectionTimeTracker = (namecompanies: string) => {

//     const [sectionTimes, setSectionTimes] = useState<{ [key: string]: number }>({});
//     const [totalTime, setTotalTime] = useState<number>(0);
//     const [history, setHistory] = useState<{ section: string; timeSpent: number; startTime: number; endTime: number }[]>([]);
//     const [userId, setUserId] = useState<string>("");
//     const [email,setEmail]=useState<string>("")
//     const [namecompanie,setnamecompanie]=useState<string>("")


//     const activeSectionRef = useRef<string | null>(null);
//     const startTimeRef = useRef<number | null>(null);


//     const storedData = getLocalhostStorage()

//     if (storedData.aud != null || storedData?.isLogin) {
//          setUserId(storedData._id)
//          setEmail(storedData.email)
//          setnamecompanie(namecompanies)
//     }




//     const sendData = async () => {
//         if (history.length === 0 && Object.keys(sectionTimes).length === 0) return; // No enviar si no hay datos

//         try {

//             const response = await fetch("/api/trackTime", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ userId,email,namecompanie, sectionTimes, totalTime, history }),
//             });

//             console.log("✅ Datos enviados a /api/trackTime:", { userId, sectionTimes, totalTime, history });
//             setHistory([]); // Limpiar historial tras enviar
//             setSectionTimes({}); // Opcional: Reiniciar tiempos por sección
//         } catch (error) {
//             console.error("❌ Error al enviar datos:", error);
//         }
//     };

//     const handleSectionEnter = (sectionName: string) => {
//         const now = Date.now();

//         if (activeSectionRef.current && startTimeRef.current) {
//             const elapsedTime = now - startTimeRef.current;
//             const previousSection = activeSectionRef.current;

//             setSectionTimes((prevTimes) => ({
//                 ...prevTimes,
//                 [previousSection]: (prevTimes[previousSection] || 0) + elapsedTime,
//             }));

//             setTotalTime((prevTotal) => prevTotal + elapsedTime);

//             setHistory((prevHistory) => [
//                 ...prevHistory,
//                 {
//                     section: previousSection,
//                     timeSpent: elapsedTime,
//                     startTime: startTimeRef.current!,
//                     endTime: now,
//                 },
//             ]);
//         }

//         activeSectionRef.current = sectionName;
//         startTimeRef.current = now;
//     };

//     useEffect(() => {
//         const handleBeforeUnload = async () => {
//             if (activeSectionRef.current && startTimeRef.current) {
//                 const now = Date.now();
//                 const elapsedTime = now - startTimeRef.current;
//                 const previousSection = activeSectionRef.current;

//                 setSectionTimes((prevTimes) => ({
//                     ...prevTimes,
//                     [previousSection]: (prevTimes[previousSection] || 0) + elapsedTime,
//                 }));

//                 setTotalTime((prevTotal) => prevTotal + elapsedTime);

//                 setHistory((prevHistory) => [
//                     ...prevHistory,
//                     {
//                         section: previousSection,
//                         timeSpent: elapsedTime,
//                         startTime: startTimeRef.current!,
//                         endTime: now,
//                     },
//                 ]);

//                 await sendData(); // Enviar datos antes de cerrar
//             }
//         };

//         window.addEventListener("beforeunload", handleBeforeUnload);

//         return () => {
//             handleBeforeUnload();
//             window.removeEventListener("beforeunload", handleBeforeUnload);
//         };
//     }, []);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             sendData();
//         }, 3000); // Cada 30 segundos

//         return () => clearInterval(interval);
//     }, [history, sectionTimes]);

//     return { sectionTimes, totalTime, history, handleSectionEnter };
// };

// export default useSectionTimeTracker;


// "use client"

// import { useState, useEffect, useRef, useCallback } from "react"
// import { getLocalhostStorage } from "@/services/localstorage.services"

// const useSectionTimeTracker = (namecompanies: string) => {
//   const sectionTimesRef = useRef<{ [key: string]: number }>({})
//   const totalTimeRef = useRef<number>(0)
//   const historyRef = useRef<{ section: string; timeSpent: number; startTime: number; endTime: number }[]>([])
//   const lastSentTimeRef = useRef<number>(Date.now())
//   const userDataRef = useRef<{ userId: string; email: string; namecompanie: string }>({
//     userId: "",
//     email: "",
//     namecompanie: "",
//   })

//   const activeSectionRef = useRef<string | null>(null)
//   const startTimeRef = useRef<number | null>(null)
//   const idleTimerRef = useRef<NodeJS.Timeout | null>(null)

//   // Cargar datos del usuario
//   useEffect(() => {
//     const storedData = getLocalhostStorage()
//     if (storedData.aud != null || storedData?.isLogin) {
//       userDataRef.current = {
//         userId: storedData._id,
//         email: storedData.email,
//         namecompanie: namecompanies,
//       }
//     }
//   }, [namecompanies])

//   const sendData = useCallback(
//     async (force = false) => {
//       const now = Date.now()
//       if (!force && now - lastSentTimeRef.current < 15000) return // Aumentamos el intervalo a 15s para menos envíos

//       if (historyRef.current.length === 0 && Object.keys(sectionTimesRef.current).length === 0) return

//       const dataToSend = {
//         ...userDataRef.current,
//         sectionTimes: sectionTimesRef.current,
//         totalTime: totalTimeRef.current,
//         history: historyRef.current,
//       }

//       try {
//         const response = await fetch("/api/trackTime", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(dataToSend),
//         })

//         if (response.ok) {
//           console.log("✅ Datos enviados a /api/trackTime:", dataToSend)
//           historyRef.current = []
//           sectionTimesRef.current = {}
//           totalTimeRef.current = 0
//           lastSentTimeRef.current = now
//         }
//       } catch (error) {
//         console.error("❌ Error al enviar datos:", error)
//       }
//     },
//     []
//   )

//   const handleSectionEnter = useCallback((sectionName: string) => {
//     const now = Date.now()

//     if (activeSectionRef.current && startTimeRef.current) {
//       const elapsedTime = now - startTimeRef.current
//       const previousSection = activeSectionRef.current

//       sectionTimesRef.current = {
//         ...sectionTimesRef.current,
//         [previousSection]: (sectionTimesRef.current[previousSection] || 0) + elapsedTime,
//       }

//       totalTimeRef.current += elapsedTime

//       historyRef.current = [
//         ...historyRef.current,
//         {
//           section: previousSection,
//           timeSpent: elapsedTime,
//           startTime: startTimeRef.current!,
//           endTime: now,
//         },
//       ]
//     }

//     activeSectionRef.current = sectionName
//     startTimeRef.current = now
//   }, [])

//   useEffect(() => {
//     const handleBeforeUnload = async () => {
//       if (activeSectionRef.current && startTimeRef.current) {
//         handleSectionEnter(activeSectionRef.current)
//       }
//       await sendData(true)
//     }

//     window.addEventListener("beforeunload", handleBeforeUnload)

//     return () => {
//       handleBeforeUnload()
//       window.removeEventListener("beforeunload", handleBeforeUnload)
//     }
//   }, [handleSectionEnter, sendData])

//   // Nueva lógica para esperar antes de enviar datos al detener scroll
//   useEffect(() => {
//     const handleUserIdle = () => {
//       idleTimerRef.current = setTimeout(() => sendData(), 5000) // Esperamos 5s después de inactividad
//     }

//     const resetIdleTimer = () => {
//       if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
//       handleUserIdle()
//     }

//     window.addEventListener("scroll", resetIdleTimer)
//     window.addEventListener("mousemove", resetIdleTimer)
//     window.addEventListener("keydown", resetIdleTimer)

//     return () => {
//       if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
//       window.removeEventListener("scroll", resetIdleTimer)
//       window.removeEventListener("mousemove", resetIdleTimer)
//       window.removeEventListener("keydown", resetIdleTimer)
//     }
//   }, [sendData])

//   return {
//     sectionTimes: sectionTimesRef.current,
//     totalTime: totalTimeRef.current,
//     history: historyRef.current,
//     handleSectionEnter,
//   }
// }

// export default useSectionTimeTracker






// "use client"

// import { useState, useEffect, useRef, useCallback } from "react"
// import { getLocalhostStorage } from "@/services/localstorage.services"

// const useSectionTimeTracker = (namecompanies: string) => {
//   const [sectionTimes, setSectionTimes] = useState<{ [key: string]: number }>({})
//   const [totalTime, setTotalTime] = useState<number>(0)
//   const [history, setHistory] = useState<{ section: string; timeSpent: number; startTime: number; endTime: number }[]>(
//     [],
//   )

//   const [userData, setUserData] = useState<{ userId: string; email: string; namecompanie: string }>({
//     userId: "",
//     email: "",
//     namecompanie: "",
//   })

//   const activeSectionRef = useRef<string | null>(null)
//   const startTimeRef = useRef<number | null>(null)
//   const lastSentTimeRef = useRef<number>(Date.now())
//   const isUserActiveRef = useRef<boolean>(true)

//   useEffect(() => {
//     const storedData = getLocalhostStorage()
//     if (storedData?.isLogin) {
//       setUserData({
//         userId: storedData._id,
//         email: storedData.email,
//         namecompanie: namecompanies,
//       })
//     }
//   }, [namecompanies])

//   /** 🔹 Detectar actividad */
//   useEffect(() => {
//     const handleUserActivity = () => (isUserActiveRef.current = true)
//     const handleUserInactivity = () => (isUserActiveRef.current = false)

//     document.addEventListener("mousemove", handleUserActivity)
//     document.addEventListener("scroll", handleUserActivity)
//     document.addEventListener("keydown", handleUserActivity)
//     document.addEventListener("touchstart", handleUserActivity)

//     const inactivityTimer = setInterval(() => (isUserActiveRef.current = false), 30000)

//     return () => {
//       document.removeEventListener("mousemove", handleUserActivity)
//       document.removeEventListener("scroll", handleUserActivity)
//       document.removeEventListener("keydown", handleUserActivity)
//       document.removeEventListener("touchstart", handleUserActivity)
//       clearInterval(inactivityTimer)
//     }
//   }, [])

//   /** 🔹 Enviar datos */
//   const sendData = useCallback(
//     async (force = false) => {
//       const now = Date.now()
//       if (!force && (now - lastSentTimeRef.current < 15000 || !isUserActiveRef.current)) return

//       if (history.length === 0 && Object.keys(sectionTimes).length === 0) return

//       const dataToSend = { ...userData, sectionTimes, totalTime, history }

//       try {
//         const response = await fetch("/api/trackTime", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(dataToSend),
//         })

//         if (response.ok) {
//           console.log("✅ Datos enviados:", dataToSend)
//           setHistory([])
//           setSectionTimes({})
//           setTotalTime(0)
//           lastSentTimeRef.current = now
//         } else {
//           throw new Error("Error en el envío")
//         }
//       } catch (error) {
//         console.error("❌ Error al enviar datos:", error)
//       }
//     },
//     [userData, sectionTimes, totalTime, history],
//   )

//   /** 🔹 Detectar cambio de sección */
//   const handleSectionEnter = useCallback((sectionName: string) => {
//     const now = Date.now()

//     if (activeSectionRef.current && startTimeRef.current) {
//       const elapsedTime = now - startTimeRef.current
//       const previousSection = activeSectionRef.current

//       setSectionTimes((prev) => ({ ...prev, [previousSection]: (prev[previousSection] || 0) + elapsedTime }))
//       setTotalTime((prev) => prev + elapsedTime)

//       setHistory((prev) => [
//         ...prev,
//         { section: previousSection, timeSpent: elapsedTime, startTime: startTimeRef.current!, endTime: now },
//       ])
//     }

//     activeSectionRef.current = sectionName
//     startTimeRef.current = now
//   }, [])

//   /** 🔹 Asegurar envío de datos incluso si la pestaña está en segundo plano */
//   useEffect(() => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === "visible") {
//         sendData(true)
//       }
//     }

//     document.addEventListener("visibilitychange", handleVisibilityChange)
//     return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
//   }, [sendData])

//   /** 🔹 Envío cada 15s en desktop y asegurado en móviles */
//   useEffect(() => {
//     let timeout: NodeJS.Timeout
//     const scheduleSend = () => {
//       timeout = setTimeout(() => {
//         if (isUserActiveRef.current && activeSectionRef.current && startTimeRef.current) {
//           handleSectionEnter(activeSectionRef.current)
//           sendData()
//         }
//         scheduleSend() // Vuelve a programar el envío en lugar de usar `setInterval`
//       }, 15000)
//     }

//     scheduleSend()

//     return () => clearTimeout(timeout)
//   }, [handleSectionEnter, sendData])

//   return { sectionTimes, totalTime, history, handleSectionEnter }
// }

// export default useSectionTimeTracker

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

  useEffect(() => {
    const storedData = getLocalhostStorage();
    if (storedData?.isLogin) {
      setUserData({
        userId: storedData._id,
        email: storedData.email,
        namecompanie: namecompanies,
      });
    }
  }, [namecompanies]);

  /** 🔹 Detectar actividad del usuario */
  useEffect(() => {
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
  }, []);

  /** 🔹 Enviar datos */
  const sendData = useCallback(
    async (force = false) => {
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
    [userData, sectionTimes, totalTime, history]
  );

  /** 🔹 Detectar cambio de sección */
  const handleSectionEnter = useCallback((sectionName: string) => {
    const now = Date.now();

    if (activeSectionRef.current && startTimeRef.current) {
      const elapsedTime = now - startTimeRef.current;
      const previousSection = activeSectionRef.current;

      setSectionTimes((prev) => ({
        ...prev,
        [previousSection]: (prev[previousSection] || 0) + elapsedTime,
      }));

      setTotalTime((prev) => prev + elapsedTime);

      setHistory((prev) => {
        return [
          ...prev,
          { section: previousSection, timeSpent: elapsedTime, startTime: startTimeRef.current!, endTime: now },
        ];
      });
    }

    activeSectionRef.current = sectionName;
    startTimeRef.current = now;
  }, []);

  /** 🔹 Asegurar envío de datos incluso si la pestaña está en segundo plano */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendData(true);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [sendData]);

  /** 🔹 Envío cada 5s y asegurado en móviles */
  useEffect(() => {
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
  }, [handleSectionEnter, sendData]);

  return { sectionTimes, totalTime, history, handleSectionEnter };
};

export default useSectionTimeTracker;
