// hooks/useDateTimeFormatter.ts
type DateTimeFormatOptions = {
    includeTime?: boolean;
    locale?: string;
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    timeStyle?: 'full' | 'long' | 'medium' | 'short';
    customFormat?: string;
  };
  
  const useDateTimeFormatter = () => {
    const formatCustom = (date: Date, format: string): string => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
  
      return format
        .replace('dd', day)
        .replace('MM', month)
        .replace('yyyy', year.toString())
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
    };
  
    const formatDateTime = (
      dateValue: string | Date,
      options: DateTimeFormatOptions = {}
    ): string => {
      try {
        const date = new Date(dateValue);
        if (isNaN(date.getTime())) return 'Fecha inválida';
  
        const hasTime = dateValue.toString().includes('T') || 
                       date.getHours() > 0 || 
                       date.getMinutes() > 0 || 
                       date.getSeconds() > 0;
  
        const {
          includeTime = hasTime,
          locale = 'es-ES',
          dateStyle = 'medium',
          timeStyle = 'short',
          customFormat
        } = options;
  
        if (customFormat) {
          return formatCustom(date, customFormat);
        }
  
        const formatOptions: Intl.DateTimeFormatOptions = {
          dateStyle,
          timeStyle: includeTime ? timeStyle : undefined,
        };
  
        return date.toLocaleString(locale, formatOptions);
      } catch (error) {
        console.error('Error formateando fecha:', error);
        return 'Fecha inválida';
      }
    };
  
    return { formatDateTime };
  };
  
  export default useDateTimeFormatter;



// import useDateTimeFormatter from '@/hooks/useDateTimeFormatter';

// const TurnoInfo = ({ catchDataTurnStart }) => {
//   const { formatDateTime } = useDateTimeFormatter();

//   return (
//     <div>
//       <h3>Información de Turno</h3>
//       <p>
//         Comienzo de Turno: {formatDateTime(catchDataTurnStart.comienzoturno, {
//           includeTime: true,
//           dateStyle: 'long',
//           timeStyle: 'short'
//         })}
//       </p>
      
//       {/* Ejemplo con formato personalizado */}
//       <p>
//         Formato personalizado: {formatDateTime(catchDataTurnStart.comienzoturno, {
//           customFormat: 'dd/MM/yyyy HH:mm'
//         })}
//       </p>
      
//       {/* Ejemplo que detecta automáticamente si tiene hora */}
//       <p>
//         Autodetección: {formatDateTime(catchDataTurnStart.comienzoturno)}
//       </p>
//     </div>
//   );
// };

// export default TurnoInfo;