// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// const data = [
//   { name: "Aperitivos-1-Calamari Fritti", value: 1600 },
//   { name: "Ensaladas-2-Ensalada Caprese", value: 3430 },
//   { name: "Sopas", value: 0 },
//   { name: "Sopas-0-Minestrone", value: 12718 },
//   { name: "Postres", value: 1596 },
//   { name: "Postres-0-Tiramisú", value: 3928 },
//   { name: "Sopas-1-Zuppa Toscana", value: 1268 },
//   { name: "Aperitivos", value: 0 },
//   { name: "Aperitivos-0-Bruschetta", value: 9084 },
//   { name: "Ensaladas-1-Ensalada Griega", value: 24379 },
//   { name: "Aperitivos-2-Antipasto Misto", value: 4912 },
//   { name: "Carnes", value: 0 },
//   { name: "Carnes-1-Saltimbocca alla Romana", value: 6108 },
//   { name: "Ensaladas", value: 510 },
//   { name: "Button-Ensalada Caprese", value: 21664 },
//   { name: "search", value: 21715 },
//   { name: "info", value: 11368 },
//   { name: "Pizzas", value: 4 },
//   { name: "Pizzas-0-Pizza Margherita", value: 4237 },
//   { name: "Pizzas-1-Pizza Pepperoni", value: 3747 },
//   { name: "Pizzas-3-Pizza Prosciutto e Rucola", value: 2922 },
//   { name: "Ensaladas-0-Ensalada César", value: 2372 },
//   { name: "Pastas", value: 170 },
//   { name: "Pastas-0-Lasagna Clásica", value: 1756 },
//   { name: "Pastas-1-Spaghetti Carbonara", value: 5569 },
//   { name: "Pastas-3-Ravioli de Espinaca", value: 1748 },
//   { name: "Pastas-4-Penne Arrabbiata", value: 2422 },
//   { name: "Pizzas-2-Pizza Quattro Formaggi", value: 564 },
//   { name: "Pastas-2-Fettuccine Alfredo", value: 365 }
// ];

// // Función para agrupar los datos por categorías
// const groupDataByCategory = (data:any) => {
//   const grouped:any = {};

//   // Agrupar los valores por categorías
//   data.forEach((item:any) => {
//     const category = item.name.split('-')[0]; // Obtener la categoría
//     if (grouped[category]) {
//       grouped[category] += item.value; // Sumar los valores
//     } else {
//       grouped[category] = item.value;
//     }
//   });

//   // Convertir el objeto en un array de { name, value }
//   return Object.keys(grouped).map(key => ({ name: key, value: grouped[key] }));
// };

// const formattedData = groupDataByCategory(data);

// const FUTURISTIC_COLORS = [
//   'url(#gradient1)',
//   'url(#gradient2)',
//   'url(#gradient3)',
//   'url(#gradient4)',
//   'url(#gradient5)',
// ];

// export default function DashboardPieChart() {
//   return (
//     <div style={{ width: '100%', height: 350 }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <PieChart>
//           <defs>
//             <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#00bcd4" />
//               <stop offset="100%" stopColor="#3f51b5" />
//             </linearGradient>
//             <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#9c27b0" />
//               <stop offset="100%" stopColor="#00e676" />
//             </linearGradient>
//             <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#ff9800" />
//               <stop offset="100%" stopColor="#e91e63" />
//             </linearGradient>
//             <linearGradient id="gradient4" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#f44336" />
//               <stop offset="100%" stopColor="#4caf50" />
//             </linearGradient>
//             <linearGradient id="gradient5" x1="0%" y1="0%" x2="100%" y2="100%">
//               <stop offset="0%" stopColor="#2196f3" />
//               <stop offset="100%" stopColor="#ffeb3b" />
//             </linearGradient>
//           </defs>
//           <Pie
//             data={formattedData}
//             cx="50%"
//             cy="50%"
//             innerRadius={70}
//             outerRadius={100}
//             paddingAngle={5}
//             dataKey="value"
//             label={({ name, percent }) => `${name} (${(percent * 100).toFixed(2)}%)`} // Mostrar porcentaje
//             labelLine={false} // Eliminar línea entre etiqueta y segmento
//           >
//             {formattedData.map((entry, index) => (
//               <Cell key={`cell-${index}`} fill={FUTURISTIC_COLORS[index % FUTURISTIC_COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { name: "Aperitivos", Aperitivos: 1600, Ensaladas: 3430, Sopas: 12718, Postres: 1596, Carnes: 6108, Pizzas: 4237, Pastas: 1756 },
  { name: "Aperitivos-0-Bruschetta", Aperitivos: 9084, Ensaladas: 24379, Sopas: 2372, Postres: 3928, Carnes: 0, Pizzas: 3747, Pastas: 5569 },
  { name: "Aperitivos-1-Calamari Fritti", Aperitivos: 1600, Ensaladas: 3430, Sopas: 12718, Postres: 1596, Carnes: 6108, Pizzas: 4237, Pastas: 1756 },
  { name: "Aperitivos-2-Antipasto Misto", Aperitivos: 4912, Ensaladas: 24379, Sopas: 2372, Postres: 3928, Carnes: 0, Pizzas: 3747, Pastas: 5569 },
  { name: "Pastas-1-Spaghetti Carbonara", Aperitivos: 1600, Ensaladas: 3430, Sopas: 12718, Postres: 1596, Carnes: 6108, Pizzas: 4237, Pastas: 5569 },
];

export default function CategoryBarChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Aperitivos" stackId="a" fill="#8884d8" />
        <Bar dataKey="Ensaladas" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Sopas" stackId="a" fill="#ffc658" />
        <Bar dataKey="Postres" stackId="a" fill="#ff7300" />
        <Bar dataKey="Carnes" stackId="a" fill="#00C49F" />
        <Bar dataKey="Pizzas" stackId="a" fill="#ff0075" />
        <Bar dataKey="Pastas" stackId="a" fill="#8e44ad" />
      </BarChart>
    </ResponsiveContainer>
  );
}

