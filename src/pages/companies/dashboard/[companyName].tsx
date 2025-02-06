import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function CompanyDashboard() {
  const router = useRouter()
  const { companyName } = router.query  // 'companyName' es el parámetro dinámico

  const [companyData, setCompanyData] = useState(null)

//   useEffect(() => {
//     if (companyName) {
//       // Aquí llamas a tu API para cargar los datos de la empresa
//       fetch(`/api/companies/${companyName}`)
//         .then((res) => res.json())
//         .then((data) => setCompanyData(data))
//         .catch((err) => console.error(err))
//     }
//   }, [companyName])  // Se ejecuta cada vez que cambia el parámetro `companyName`

//   if (!companyData) {
//     return <div>Cargando...</div>  // Puedes mostrar un loader mientras los datos están siendo cargados
//   }

  return (
    <div>
        hola {companyName}
      {/* <h1>Dashboard de {companyData.name}</h1> */}
      {/* Renderiza aquí los datos que recuperaste */}
      {/* <p>{companyData.description}</p> */}
    </div>
  )
}
