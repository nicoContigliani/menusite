import { useState, useEffect, useRef } from "react"

const useSectionTimeTracker = () => {
    const [sectionTimes, setSectionTimes] = useState<{ [key: string]: number }>({})
    const activeSectionRef = useRef<string | null>(null)
    const startTimeRef = useRef<number | null>(null)
    

    const handleSectionEnter = (sectionName: string) => {
        const now = Date.now()

        // Si hay una sección activa, guarda el tiempo transcurrido
        if (activeSectionRef.current && startTimeRef.current) {
            const elapsedTime = now - startTimeRef.current
            setSectionTimes((prevTimes) => ({
                ...prevTimes,
                [activeSectionRef.current!]: (prevTimes[activeSectionRef.current!] || 0) + elapsedTime,
            }))
        }

        // Establece la nueva sección activa
        activeSectionRef.current = sectionName
        startTimeRef.current = now
    }

    useEffect(() => {
        // Al desmontar el componente, guarda el último tiempo
        return () => {
            if (activeSectionRef.current && startTimeRef.current) {
                const elapsedTime = Date.now() - startTimeRef.current
                setSectionTimes((prevTimes) => ({
                    ...prevTimes,
                    [activeSectionRef.current!]: (prevTimes[activeSectionRef.current!] || 0) + elapsedTime,
                }))
            }
        }
    }, [])

    return { sectionTimes, handleSectionEnter }
}

export default useSectionTimeTracker
