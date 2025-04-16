import React, { useEffect } from 'react'

const Closingsales = (props: any) => {
    console.log("🚀 ~ Closingsales ~ props:", props)

    const { companyId, turno_id, fecha } = props



    // useEffect(() => {
    //     if (!companyId && !turno_id) return; // Esperamos a que esté definido

    //     const funtionsAsync = async () => {
    //         try {
    //             const response = await fetch('/api/closingsales', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     turno_id: turno_id,
    //                     companyId: companyId
    //                 }),

    //             });

    //             const result: any = await response.json();

    //             if (!response.ok) {
    //                 throw new Error(result.error || 'Error al obtener los datos');
    //             }



    //             console.log('Datos de la empresa:', result.data);
    //             // Aquí podrías guardar los datos en un estado
    //             // setLoading(false);
    //         } catch (error) {
    //             console.error('Error al hacer fetch:', error);
    //             // setLoading(false);
    //         }
    //     }

    //     funtionsAsync();
    // }, [companyId, turno_id]);



    const createZ = async () => {
        try {
            const response = await fetch('/api/closingsales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    turno_id: turno_id,
                    companyId: companyId
                }),

            });

            const result: any = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Error al obtener los datos');
            }



            console.log('Datos de la empresa:', result.data);
            // Aquí podrías guardar los datos en un estado
            // setLoading(false);
        } catch (error) {
            console.error('Error al hacer fetch:', error);
            // setLoading(false);
        }
    }
    const getZ = async () => {

    }







    return (
        <div>
            <h1>Closingsales</h1>
            <button onClick={createZ}>
                create closing sales
            </button>
            <hr />
            <button>
                get closing sales
            </button>
        </div>
    )
}

export default Closingsales