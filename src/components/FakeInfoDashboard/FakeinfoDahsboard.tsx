// import { Button, ButtonGroup, TextField } from '@mui/material';
// import React, { useState } from 'react';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import useFakeInfo from '../../../hooks/useFakeInfo';
// import dayjs from 'dayjs';

// const FakeinfoDahsboard = (props: any) => {
//     const { setIsLoading, setStatusMessage, setProgress, dataToSendHard, setRefreshTrigger } = props;
//     const [selectedDate, setSelectedDate] = useState(dayjs());

//     const fakeData = useFakeInfo(selectedDate.valueOf(), { userId: "67adfab7df1c3e1f1a53af56", email: "nico.contigliani@gmail.com" });

//     const handleHard = React.useCallback(async () => {
//         setIsLoading(true);
//         setStatusMessage('Iniciando la inserción de datos...');
//         setProgress(0);

//         const totalRequests = 1000;
//         const batchSize = 50;
//         const totalBatches = Math.ceil(totalRequests / batchSize);

//         let successCount = 0;
//         let failCount = 0;

//         try {
//             for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
//                 const batchRequests = Array.from({ length: batchSize }, () =>
//                     fetch("/api/trackTime", {
//                         method: "POST",
//                         headers: { "Content-Type": "application/json" },
//                         body: JSON.stringify({ ...dataToSendHard, date: selectedDate.valueOf() }),
//                     })
//                         .then(() => { successCount++; return true; })
//                         .catch(() => { failCount++; return false; })
//                 );

//                 await Promise.allSettled(batchRequests);
//                 const currentProgress = Math.round((((batchIndex + 1) * batchSize) / totalRequests) * 100);
//                 setProgress(Math.min(currentProgress, 100));
//                 setStatusMessage(`Procesando lote ${batchIndex + 1} de ${totalBatches}...`);
//             }

//             setStatusMessage(`✅ ${successCount} exitosas. ❌ ${failCount} fallidas.`);
//         } catch (err) {
//             console.error("Error en handleHard:", err);
//             setStatusMessage('❌ Error en la inserción de datos.');
//         } finally {
//             setIsLoading(false);
//             setRefreshTrigger((prev: any) => prev + 1);
//         }
//     }, [selectedDate]);

//     return (
//         <div>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                 <DateTimePicker
//                     label="Selecciona fecha y hora"
//                     value={selectedDate}
//                     onChange={(newValue:any) => setSelectedDate(newValue)}
//                 />

//             </LocalizationProvider>
//             <div>
//                 <strong>Track Hard: </strong>
//                 <ButtonGroup variant="contained" color='info' size="small">
//                     <Button onClick={handleHard}>Enviar Datos</Button>
//                 </ButtonGroup>
//             </div>
//         </div>
//     );
// };

// export default FakeinfoDahsboard;



import { Button, ButtonGroup, TextField } from '@mui/material';
import React, { useState, useCallback } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import useFakeInfo from '../../../hooks/useFakeInfo';
import dayjs, { Dayjs } from 'dayjs';

const FakeinfoDashboard = (props: any) => {
    const { setIsLoading, setStatusMessage, setProgress, dataToSendHard, setRefreshTrigger } = props;
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

    const fakeData = useFakeInfo(selectedDate?.valueOf() || 0, { userId: "67adfab7df1c3e1f1a53af56", email: "nico.contigliani@gmail.com" });

    const handleHard = useCallback(async () => {
        setIsLoading(true);
        setStatusMessage('Iniciando la inserción de datos...');
        setProgress(0);

        const totalRequests = 3000;
        const batchSize = 50;
        const totalBatches = Math.ceil(totalRequests / batchSize);

        let successCount = 0;
        let failCount = 0;

        try {
            for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
                const batchRequests = Array.from({ length: batchSize }, () =>
                    fetch("/api/trackTime", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ ...dataToSendHard, date: selectedDate?.valueOf() || 0 }),
                    })
                        .then(() => { successCount++; return true; })
                        .catch(() => { failCount++; return false; })
                );

                await Promise.allSettled(batchRequests);
                const currentProgress = Math.round((((batchIndex + 1) * batchSize) / totalRequests) * 100);
                setProgress(Math.min(currentProgress, 100));
                setStatusMessage(`Procesando lote ${batchIndex + 1} de ${totalBatches}...`);
            }

            setStatusMessage(`✅ ${successCount} exitosas. ❌ ${failCount} fallidas.`);
        } catch (err) {
            console.error("Error en handleHard:", err);
            setStatusMessage('❌ Error en la inserción de datos.');
        } finally {
            setIsLoading(false);
            setRefreshTrigger((prev: any) => prev + 1);
        }
    }, [selectedDate, setIsLoading, setStatusMessage, setProgress, dataToSendHard, setRefreshTrigger]);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Selecciona fecha y hora"
                    value={selectedDate}
                    onChange={(newValue: Dayjs | null) => setSelectedDate(newValue)}
                    slotProps={{ textField: { variant: "outlined", fullWidth: true } }}
                />
            </LocalizationProvider>
            <div>
                <strong>Track Hard: </strong>
                <ButtonGroup variant="contained" color="info" size="small">
                    <Button onClick={handleHard}>Send Data</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default FakeinfoDashboard;
