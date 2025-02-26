// import React from "react";
// import {
//   PieChart, Pie, BarChart, Bar, LineChart, Line, RadarChart, Radar, ScatterChart, Scatter,
//   XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell, PolarGrid, PolarAngleAxis, PolarRadiusAxis
// } from "recharts";

// interface ChartProps {
//   type: "pie" | "bar" | "line" | "radar" | "scatter";
//   data: any[];
//   xKey?: string;
//   yKey?: string | string[]; // Soporte para múltiples series
//   width?: string | number; // Soporte para porcentaje o número fijo
//   height?: string | number;
// }

// const colorPalette = [
//   "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000",
//   "#00ff00", "#0000ff", "#800080", "#ff1493", "#32cd32",
//   "#ffa500", "#00ced1", "#ff4500", "#da70d6", "#4682b4"
// ];

// const getColor = (index: number) => colorPalette[index % colorPalette.length];

// const DynamicChart: React.FC<ChartProps> = ({ 
//   type, 
//   data, 
//   xKey = "x", 
//   yKey = "y", 
//   width = "100%", 
//   height = "100%" 
// }) => {

//   const yKeys = Array.isArray(yKey) ? yKey : [yKey];

//   const renderChart: any = () => {
//     switch (type) {
//       case "pie":
//         return (
//           <PieChart width={400} height={400}>
//             <Pie data={data} dataKey={yKeys[0]} nameKey={xKey} cx="50%" cy="50%" outerRadius={80} label paddingAngle={10}>
//               {data?.map((_, index) => <Cell key={index} fill={getColor(index)} />)}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         );

//       case "bar":
//         return (
//           <BarChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey={xKey} />
//             <Tooltip />
//             <Legend />
//             <YAxis />
//             {yKeys.map((key, index) => (
//               <Bar key={key} dataKey={key} fill={getColor(index)}>
//                 {data.map((_, i) => <Cell key={i} fill={getColor(i)} />)}
//               </Bar>
//             ))}
//           </BarChart>
//         );

//       case "line":
//         return (
//           <LineChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey={xKey} />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             {yKeys.map((key, index) => (
//               <Line key={key} type="monotone" dataKey={key} stroke={getColor(index)} />
//             ))}
//           </LineChart>
//         );

//       case "radar":
//         return (
//           <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
//             <PolarGrid />
//             <PolarAngleAxis dataKey={xKey} />
//             <PolarRadiusAxis />
//             {yKeys.map((key, index) => (
//               <Radar key={key} name={key} dataKey={key} stroke={getColor(index)} fill={getColor(index)} fillOpacity={0.6} />
//             ))}
//             <Tooltip />
//             <Legend />
//           </RadarChart>
//         );

//       case "scatter":
//         return (
//           <ScatterChart>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey={xKey} />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Scatter name="Data" data={data} fill={getColor(0)} />
//           </ScatterChart>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
//       <ResponsiveContainer width={width} height={height}>
//         {renderChart()}
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default DynamicChart;



// import React from "react";
// import {
//     PieChart, Pie, BarChart, Bar, LineChart, Line, RadarChart, Radar, ScatterChart, Scatter,
//     XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, Cell, PolarGrid, PolarAngleAxis, PolarRadiusAxis
// } from "recharts";

// interface ChartProps {
//     type: "pie" | "bar" | "line" | "radar" | "scatter" | "twoSimplePie"; // Added new type
//     data: any[];
//     xKey?: string;
//     yKey?: string | string[]; // Support for multiple series
//     width?: string | number; // Support for percentage or fixed number
//     height?: string | number;
// }

// const colorPalette = [
//     "#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000",
//     "#00ff00", "#0000ff", "#800080", "#ff1493", "#32cd32",
//     "#ffa500", "#00ced1", "#ff4500", "#da70d6", "#4682b4"
// ];

// const getColor = (index: number) => colorPalette[index % colorPalette.length];

// const DynamicChart: React.FC<ChartProps> = ({
//     type,
//     data,
//     xKey = "x",
//     yKey = "y",
//     width = "100%",
//     height = "100%"
// }) => {

//     const yKeys = Array.isArray(yKey) ? yKey : [yKey];

//     const renderChart: any = () => {
//         switch (type) {
//             case "pie":
//                 return (
//                     <PieChart width={400} height={400}>
//                         <Pie data={data} dataKey={yKeys[0]} nameKey={xKey} cx="50%" cy="50%" outerRadius={80} label paddingAngle={10}>
//                             {data?.map((_, index) => <Cell key={index} fill={getColor(index)} />)}
//                         </Pie>
//                         <Tooltip />
//                         <Legend />
//                     </PieChart>
//                 );

//             case "bar":
//                 return (
//                     <BarChart data={data}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey={xKey} />
//                         <Tooltip />
//                         <Legend />
//                         <YAxis />
//                         {yKeys.map((key, index) => (
//                             <Bar key={key} dataKey={key} fill={getColor(index)}>
//                                 {data.map((_, i) => <Cell key={i} fill={getColor(i)} />)}
//                             </Bar>
//                         ))}
//                     </BarChart>
//                 );

//             case "line":
//                 return (
//                     <LineChart data={data}>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey={xKey} />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         {yKeys.map((key, index) => (
//                             <Line key={key} type="monotone" dataKey={key} stroke={getColor(index)} />
//                         ))}
//                     </LineChart>
//                 );

//             case "radar":
//                 return (
//                     <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
//                         <PolarGrid />
//                         <PolarAngleAxis dataKey={xKey} />
//                         <PolarRadiusAxis />
//                         {yKeys.map((key, index) => (
//                             <Radar key={key} name={key} dataKey={key} stroke={getColor(index)} fill={getColor(index)} fillOpacity={0.6} />
//                         ))}
//                         <Tooltip />
//                         <Legend />
//                     </RadarChart>
//                 );

//             case "scatter":
//                 return (
//                     <ScatterChart>
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey={xKey} />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Scatter name="Data" data={data} fill={getColor(0)} />
//                     </ScatterChart>
//                 );




//             default:
//                 return null;
//         }
//     };

//     return (
//         <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
//             <ResponsiveContainer width={width} height={height}>
//                 {renderChart()}
//             </ResponsiveContainer>
//         </div>
//     );
// };

import React from "react";
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line, RadarChart, Radar, ScatterChart, Scatter,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, LabelList, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell
} from "recharts";

interface ChartProps {
  type: "pie" | "bar" | "line" | "radar" | "scatter";
  data: any[];
  xKey?: string;
  yKey?: string | string[];
  width?: string | number;
  height?: string | number;
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  animation?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  chartTitle?: string;
  unit?: string;
}

const defaultColors = [
  "#6366f1", "#10b981", "#3b82f6", "#f59e0b", "#ef4444",
  "#8b5cf6", "#06b6d4", "#f97316", "#ec4899", "#22c55e",
  "#a855f7", "#14b8a6", "#f43f5e", "#0ea5e9", "#84cc16"
];

const getColor = (index: number, colors: string[]) => colors[index % colors.length];

// Componente personalizado para rotar las etiquetas de las barras
const CustomLabel: React.FC<{ x?: number; y?: number; value?: string | number }> = ({ x, y, value }) => {
  return (
    <text
      x={x}
      y={y}
      dy={-10} // Ajusta la posición vertical
      fill="#666"
      fontSize={12}
      textAnchor="middle"
      transform={`rotate(-90, ${x}, ${y})`} // Rotación vertical
    >
      {value}
    </text>
  );
};

const DynamicChart: React.FC<ChartProps> = ({
  type,
  data,
  xKey = "x",
  yKey = "y",
  width = "100%",
  height = 400,
  colors = defaultColors,
  showLegend = true,
  showTooltip = true,
  showGrid = true,
  animation = true,
  xAxisLabel,
  yAxisLabel,
  chartTitle,
  unit
}) => {
  const yKeys = Array.isArray(yKey) ? yKey : [yKey];

  const renderChart: any = () => {
    switch (type) {
      case "bar":
        return (
          <BarChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />}
            <XAxis
              dataKey={xKey}
              label={{ value: xAxisLabel, position: "insideBottom", offset: -10, fill: "#666" }}
              // tick={{ fill: "#666", angle: -45, textAnchor: "end" }} // Rotar etiquetas del eje X
            />
            <YAxis
              label={{ value: yAxisLabel, angle: -90, position: "insideLeft", fill: "#666" }}
              tick={{ fill: "#666" }}
            />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value, name, props) => [
                  `${value} ${unit}`,
                  `${props.payload[xKey]}`,
                ]}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ paddingTop: "10px" }} />}
            {yKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={getColor(index, colors)}
                isAnimationActive={animation}
              >
                <LabelList
                  dataKey={key}
                  position="top"
                  formatter={(value: number) => `${value} ${unit}`}
                  content={<CustomLabel />} // Usar el componente personalizado
                />
              </Bar>
            ))}
          </BarChart>
        );

      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              dataKey={yKeys[0]}
              nameKey={xKey}
              cx="50%" // Centrar horizontalmente
              cy="40%" // Mover el círculo hacia arriba
              outerRadius={80}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              paddingAngle={5}
              isAnimationActive={animation}
            >
              {data?.map((_, index) => (
                <Cell key={index} fill={getColor(index, colors)} />
              ))}
            </Pie>
            {showTooltip && <Tooltip formatter={(value) => `${value} ${unit}`} />}
            {showLegend && (
              <Legend
                layout="horizontal" // Leyenda en horizontal
                align="center" // Centrar la leyenda
                verticalAlign="bottom" // Posicionar la leyenda en la parte inferior
                wrapperStyle={{ paddingTop: "20px" }} // Espacio entre el gráfico y la leyenda
              />
            )}
          </PieChart>
        );

      case "line":
        return (
          <LineChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />}
            <XAxis
              dataKey={xKey}
              label={{ value: xAxisLabel, position: "insideBottom", offset: -10, fill: "#666" }}
              tick={{ fill: "#666" }}
            />
            <YAxis
              label={{ value: yAxisLabel, angle: -90, position: "insideLeft", fill: "#666" }}
              tick={{ fill: "#666" }}
            />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => `${value} ${unit}`}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ paddingTop: "10px" }} />}
            {yKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={getColor(index, colors)}
                strokeWidth={2}
                isAnimationActive={animation}
              />
            ))}
          </LineChart>
        );

      case "radar":
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid strokeOpacity={0.3} />
            <PolarAngleAxis dataKey={xKey} tick={{ fill: "#666" }} />
            <PolarRadiusAxis tick={{ fill: "#666" }} />
            {yKeys.map((key, index) => (
              <Radar
                key={key}
                name={key}
                dataKey={key}
                stroke={getColor(index, colors)}
                fill={getColor(index, colors)}
                fillOpacity={0.6}
                isAnimationActive={animation}
              />
            ))}
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => `${value} ${unit}`}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ paddingTop: "10px" }} />}
          </RadarChart>
        );

      case "scatter":
        return (
          <ScatterChart>
            {showGrid && <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />}
            <XAxis
              dataKey={xKey}
              label={{ value: xAxisLabel, position: "insideBottom", offset: -10, fill: "#666" }}
              tick={{ fill: "#666" }}
            />
            <YAxis
              label={{ value: yAxisLabel, angle: -90, position: "insideLeft", fill: "#666" }}
              tick={{ fill: "#666" }}
            />
            {showTooltip && (
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value) => `${value} ${unit}`}
              />
            )}
            {showLegend && <Legend wrapperStyle={{ paddingTop: "10px" }} />}
            <Scatter
              name="Data"
              data={data}
              fill={getColor(0, colors)}
              isAnimationActive={animation}
            />
          </ScatterChart>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ width, height: "100%", minHeight: "300px" }}>
      {chartTitle && (
        <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333", fontSize: "1.5rem", fontWeight: "600" }}>
          {chartTitle}
        </h3>
      )}
      <ResponsiveContainer width="100%" height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default DynamicChart;;