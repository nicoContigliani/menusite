// "use client"

// import { useState, useEffect } from "react"

// export function useMediaQuery(query: string): boolean {
//   const [matches, setMatches] = useState(false)

//   useEffect(() => {
//     const media = window.matchMedia(query)
//     if (media.matches !== matches) {
//       setMatches(media.matches)
//     }

//     const listener = () => setMatches(media.matches)
//     media.addEventListener("change", listener)

//     return () => media.removeEventListener("change", listener)
//   }, [matches, query])

//   return matches
// }

"use client"

import { useState, useEffect } from "react"

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const listener = () => {
      setMatches(mediaQuery.matches)
    }

    mediaQuery.addEventListener("change", listener)

    return () => {
      mediaQuery.removeEventListener("change", listener)
    }
  }, [query])

  return matches
}
