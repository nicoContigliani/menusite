// import { useState, useEffect, useRef } from "react"

// const useSectionTimeTracker = () => {
//     const [sectionTimes, setSectionTimes] = useState<{ [key: string]: number }>({})
//     const activeSectionRef = useRef<string | null>(null)
//     const startTimeRef = useRef<number | null>(null)
    

//     const handleSectionEnter = (sectionName: string) => {
//         const now = Date.now()

//         // Si hay una sección activa, guarda el tiempo transcurrido
//         if (activeSectionRef.current && startTimeRef.current) {
//             const elapsedTime = now - startTimeRef.current
//             setSectionTimes((prevTimes) => ({
//                 ...prevTimes,
//                 [activeSectionRef.current!]: (prevTimes[activeSectionRef.current!] || 0) + elapsedTime,
//             }))
//         }

//         // Establece la nueva sección activa
//         activeSectionRef.current = sectionName
//         startTimeRef.current = now
//     }

//     useEffect(() => {
//         // Al desmontar el componente, guarda el último tiempo
//         return () => {
//             if (activeSectionRef.current && startTimeRef.current) {
//                 const elapsedTime = Date.now() - startTimeRef.current
//                 setSectionTimes((prevTimes) => ({
//                     ...prevTimes,
//                     [activeSectionRef.current!]: (prevTimes[activeSectionRef.current!] || 0) + elapsedTime,
//                 }))
//             }
//         }
//     }, [])

//     return { sectionTimes, handleSectionEnter }
// }

// export default useSectionTimeTracker
import { useState, useEffect, useRef } from "react";

const useSectionTimeTracker = () => {
    const [sectionTimes, setSectionTimes] = useState<{ [key: string]: number }>({});
    const [totalTime, setTotalTime] = useState<number>(0);
    const [history, setHistory] = useState<{ section: string; timeSpent: number }[]>([]);

    const activeSectionRef = useRef<string | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const handleSectionEnter = (sectionName: string) => {
        const now = Date.now();

        if (activeSectionRef.current && startTimeRef.current) {
            const elapsedTime = now - startTimeRef.current;

            setSectionTimes((prevTimes) => {
                const updatedTimes = {
                    ...prevTimes,
                    [activeSectionRef.current!]: (prevTimes[activeSectionRef.current!] || 0) + elapsedTime,
                };
                console.log("📊 Actualizando sectionTimes:", updatedTimes);
                return updatedTimes;
            });

            setTotalTime((prevTotal) => {
                const newTotal = prevTotal + elapsedTime;
                console.log("⏳ Actualizando totalTime:", newTotal);
                return newTotal;
            });

            setHistory((prevHistory) => {
                const updatedHistory = [
                    ...prevHistory,
                    { section: activeSectionRef.current!, timeSpent: elapsedTime },
                ];
                console.log("📜 Actualizando history:", updatedHistory);
                return updatedHistory;
            });
        }

        activeSectionRef.current = sectionName;
        startTimeRef.current = now;
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            if (activeSectionRef.current && startTimeRef.current) {
                const now = Date.now();
                const elapsedTime = now - startTimeRef.current;

                setSectionTimes((prevTimes) => ({
                    ...prevTimes,
                    [activeSectionRef.current!]: (prevTimes[activeSectionRef.current!] || 0) + elapsedTime,
                }));

                setTotalTime((prevTotal) => prevTotal + elapsedTime);

                setHistory((prevHistory) => [
                    ...prevHistory,
                    { section: activeSectionRef.current!, timeSpent: elapsedTime },
                ]);
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            handleBeforeUnload();
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return { sectionTimes, totalTime, history, handleSectionEnter };
};

export default useSectionTimeTracker;
