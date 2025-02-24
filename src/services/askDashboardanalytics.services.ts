

// type Section = {
//     timeSpent: number;
// };

// type Lot = {
//     _id: any;  // Permite tanto ObjectId como strings
//     sections: Section[];
// };

// type ClientData = {
//     totalTimeSpent: string;
//     userIds: string[];
//     companyName: string;
//     emails: string[];
//     lotsData: {
//         lotId: string;
//         sectionsCount: number;
//         timeSpentInLot: number;
//         sections: Section[];
//         clicks: number;
//     }[];
// };

// export const askDashboardAnalytics = async (data: any[]): Promise<ClientData> => {
//     let totalTimeSpentInSeconds = 0; // Tiempo total en segundos
//     const clientData: ClientData = {
//         totalTimeSpent: "",
//         userIds: [],
//         companyName: "",
//         emails: [],
//         lotsData: []
//     };

//     // Usamos un Set para evitar duplicados de IDs de usuario y correos electrónicos
//     const userIdsSet = new Set<string>();
//     const emailsSet = new Set<string>();

//     // Procesamos los datos
//     for (const element of data) {
//         console.log("🚀 ~ askDashboardAnalytics ~ element:", element?.lots)

//         // Extraemos información básica del cliente
//         clientData.companyName = element.companyName || "Unknown Company";

//         // Acumulamos los correos electrónicos de forma única
//         if (element.email) {
//             emailsSet.add(element.email);  // Añadir correo si no está duplicado
//         }

//         // Guardamos los ID de los usuarios de forma única
//         if (element.userId) {
//             userIdsSet.add(element.userId);
//         }

//         // Procesamos los lotes
//         const lotsDetails: any[] = [];
//         const clickElementsTodo: any[] = [];
//         for (const lot of element.lots) {
//             console.log("🚀 ~ askDashboardAnalytics ~ lot:", lot?.clicks)
//             // Verificamos que el _id del lote esté presente y sea válido
//             const lotId = lot._id ? (lot._id instanceof Object ? lot._id.toString() : String(lot._id)) : "unknown_lot_id";
//             const sections = lot.sections || [];
//             let timeSpentInLot = 0;
//             const dataLot = lot?.clicks
//             clickElementsTodo.push(dataLot)



//             // Sumamos el timeSpent de todas las secciones del lote
//             for (const section of sections) {
//                 timeSpentInLot += section.timeSpent;
//                 totalTimeSpentInSeconds += section.timeSpent;
//             }

//             lotsDetails.push({
//                 lotId,
//                 sectionsCount: sections.length,
//                 timeSpentInLot,
//                 sections
//             });
//         }

//         // Empujamos los detalles de los lotes a la estructura del cliente
//         const flattenedArray = clickElementsTodo?.flatMap((obj: any) =>
//             Object.entries(obj).flat()
//         );
//         console.log("🚀 ~ askDashboardAnalytics ~ flattenedArray:", flattenedArray)

//         const clicksall: any | undefined = {};

//         // Recorrer el array de a dos elementos (clave, valor)
//         const todoClick = []
//         for (let i = 0; i < flattenedArray.length; i += 2) {

//             const key: any = flattenedArray[i];
//             const value: any = flattenedArray[i + 1];

//             // Si la clave ya existe, suma el valor; si no, créala
//             if (clicksall[key]) {
//                 clicksall[key] += value;
//             } else {
//                 clicksall[key] = value;
//             }
//         }

//         console.log("clicksall", clicksall, "**************************");
//         const countclick = Object.values(clicksall as Record<string, number>).reduce((sum, value) => sum + value, 0);


//         clientData.lotsData.push(...lotsDetails);
//     }



//     // Convertimos el total de tiempo a horas, minutos y segundos
//     const hours = Math.floor(totalTimeSpentInSeconds / 3600);
//     const minutes = Math.floor((totalTimeSpentInSeconds % 3600) / 60);
//     const seconds = totalTimeSpentInSeconds % 60;

//     // Formateamos el resultado como HH:MM:SS
//     const totalTime = `${hours} hours ${minutes} minutes ${seconds} seconds`;
//     clientData.totalTimeSpent = totalTime;

//     // Actualizamos las propiedades de correos y IDs con los sets
//     clientData.userIds = Array.from(userIdsSet);
//     clientData.emails = Array.from(emailsSet);

//     console.log("🚀 ~ Total timeSpent en la aplicación (real):", totalTime);
//     console.log("🚀 ~ User IDs:", clientData.userIds);
//     console.log("🚀 ~ Emails:", clientData.emails);
//     console.log("🚀 ~ All client data:", clientData);

//     return clientData;
// };


//mejorar el retorno 
//id general
//id de lote
//section count
//timeSpent
//click general
//click por lote
//section lote




// type Section = {
//     timeSpent: number;
// };

// type Lot = {
//     _id: any;  // Permite tanto ObjectId como strings
//     sections: Section[];
// };

// type ClientData = {
//     idGeeral?: string;
//     totalTimeSpent: string;
//     userIds: string[];
//     companyName: string;
//     emails: string[];
//     clickcount: number;
//     clicksGeneral: Record<string, number>;
//     lotsData: {
//         lotId: string;
//         sectionsCount: number;
//         timeSpentInLot: number;
//         sections: Section[];
//     }[];
// };

// export const askDashboardAnalytics = async (data: any[]): Promise<ClientData> => {
//     let totalTimeSpentInSeconds = 0; // Tiempo total en segundos
//     const clientData: ClientData = {
//         idGeeral: "",
//         totalTimeSpent: "",
//         userIds: [],
//         companyName: "",
//         emails: [],
//         clickcount: 0,
//         clicksGeneral: {},
//         lotsData: []
//     };

//     // Usamos un Set para evitar duplicados de IDs de usuario y correos electrónicos
//     const userIdsSet = new Set<string>();
//     const emailsSet = new Set<string>();

//     // Objeto para almacenar los clics por tipo
//     const clicksAll: Record<string, number> = {};
//     const sectionAll: any | any[] = [];
//     const sectionsGroup: any | any[] = [];

//     // Procesamos los datos
//     for (const element of data) {

//         // Extraemos información básica del cliente
//         clientData.companyName = element.companyName || "Unknown Company";

//         // Acumulamos los correos electrónicos de forma única
//         if (element.email) {
//             emailsSet.add(element.email);
//         }

//         // Guardamos los ID de los usuarios de forma única
//         if (element.userId) {
//             userIdsSet.add(element.userId);
//         }

//         // Procesamos los lotes
//         const lotsDetails: any[] = [];
//         for (const lot of element.lots) {

//             // Verificamos que el _id del lote esté presente y sea válido
//             const lotId = lot._id ? (lot._id instanceof Object ? lot._id.toString() : String(lot._id)) : "unknown_lot_id";
//             const sections = lot.sections || [];

//             const dataGroupSections = sections.reduce((acc: Record<string, number>, item: any) => {
//                 acc[item.section] = (acc[item.section] || 0) + item.timeSpent;
//                 return acc;
//             }, []);
//             sectionAll.push(dataGroupSections)







//             // sectionsGroup.push(sections);


//             let timeSpentInLot = 0;

//             // Sumamos el timeSpent de todas las secciones del lote
//             for (const section of sections) {
//                 timeSpentInLot += section.timeSpent;
//                 totalTimeSpentInSeconds += section.timeSpent;
//             }

//             // Procesamos los clics del lote
//             const dataLot = lot?.clicks;
//             if (dataLot) {
//                 for (const [key, value] of Object.entries(dataLot)) {
//                     clicksAll[key] = (clicksAll[key] || 0) + (typeof value === "number" ? value : 0);
//                 }
//             }

//             lotsDetails.push({
//                 lotId,
//                 sectionsCount: sections.length,
//                 timeSpentInLot,
//                 sections
//             });


//         }

//         // Agregamos los detalles de los lotes al cliente
//         clientData.lotsData.push(...lotsDetails);
//     }

//     // Calculamos el total de clics
//     const totalClickCount = Object.values(clicksAll).reduce((sum, value) => sum + value, 0);

//     // Convertimos el total de tiempo a horas, minutos y segundos
//     const hours = Math.floor(totalTimeSpentInSeconds / 3600);
//     const minutes = Math.floor((totalTimeSpentInSeconds % 3600) / 60);
//     const seconds = totalTimeSpentInSeconds % 60;

//     // Formateamos el resultado como HH:MM:SS
//     clientData.totalTimeSpent = `${hours} hours ${minutes} minutes ${seconds} seconds`;

//     // Actualizamos las propiedades de correos y IDs con los sets
//     clientData.userIds = Array.from(userIdsSet);
//     clientData.emails = Array.from(emailsSet);
//     clientData.clickcount = totalClickCount;
//     clientData.clicksGeneral = clicksAll;

//     // console.log("🚀 ~ Total timeSpent en la aplicación (real):", clientData.totalTimeSpent);
//     // console.log("🚀 ~ User IDs:", clientData.userIds);
//     // console.log("🚀 ~ Emails:", clientData.emails);
//     // console.log("🚀 ~ Click count total:", clientData.clickcount);
//     // console.log("🚀 ~ Clicks breakdown:", clientData.clicksGeneral);
//     // console.log("🚀 ~ All client data:", clientData);


//     //todas las secciones de todos los lotes 
//     const sectionsAlls = sectionAll.reduce((acc:any, obj:any) => ({ ...acc, ...obj }), {});

//     console.log("🚀 ~ askDashboardAnalytics ~ flattenedObject:", sectionsAlls)



//     console.log("🚀 ~ askDashboardAnalytics ~ clientData:", clientData)
//     // const returnData={
//     //     idGeeral
//     //     totalTimeSpent
//     //     userIds
//     //     companyName
//     //     emails
//     //     clickcount
//     //     clicksGeneral, 
//     //     sectionsAlls,
//     //     lotsData,
//     // }


//     return clientData;
// };



type Section = {
    timeSpent: number;
};

type Lot = {
    _id: any;  // Permite tanto ObjectId como strings
    sections: Section[];
    clicks?: Record<string, number>;
};

type ClientData = {
    idGeeral?: string;
    totalTimeSpent: string;
    userIds: string[];
    companyName: string;
    emails: string[];
    clickcount: number;
    clicksGeneral: Record<string, number>;
    lotsData: {
        lotId: string;
        sectionsCount: number;
        timeSpentInLot: number;
        sections: Section[];
    }[];
    sectionsAlls: Record<string, number>;
};

export const askDashboardAnalytics = async (data: any[]): Promise<ClientData> => {
    let totalTimeSpentInSeconds = 0; // Tiempo total en segundos
    const userIdsSet = new Set<string>();
    const emailsSet = new Set<string>();
    const clicksAll: Record<string, number> = {};
    const sectionsAll: Record<string, number> = {};

    // Datos finales para cliente
    const clientData: ClientData = {
        idGeeral: "",
        totalTimeSpent: "",
        userIds: [],
        companyName: "",
        emails: [],
        clickcount: 0,
        clicksGeneral: {},
        lotsData: [],
        sectionsAlls: {}
    };

    // Procesamos los datos
    for (const element of data) {
        // Información básica del cliente
        clientData.companyName = element.companyName || "Unknown Company";

        // Agregar correos electrónicos y IDs de usuario únicos
        element.email && emailsSet.add(element.email);
        element.userId && userIdsSet.add(element.userId);

        // Procesamos los lotes
        const lotsDetails: any[] = [];

        for (const lot of element.lots) {
            const lotId = lot._id ? String(lot._id) : "unknown_lot_id";
            const sections = lot.sections || [];
            let timeSpentInLot = 0;

            // Agrupación de secciones por tipo y acumulación del tiempo
            for (const section of sections) {
                sectionsAll[section.section] = (sectionsAll[section.section] || 0) + section.timeSpent;
                timeSpentInLot += section.timeSpent;
                totalTimeSpentInSeconds += section.timeSpent;
            }

            // Procesar clics
            const dataLot = lot?.clicks;
            if (dataLot) {
                Object.entries(dataLot).forEach(([key, value]) => {
                    clicksAll[key] = (clicksAll[key] || 0) + (typeof value === "number" ? value : 0);
                });
            }

            lotsDetails.push({
                lotId,
                sectionsCount: sections.length,
                timeSpentInLot,
                sections
            });
        }

        // Agregamos detalles de los lotes procesados
        clientData.lotsData.push(...lotsDetails);
    }

    // Calcular el total de clics
    const totalClickCount = Object.values(clicksAll).reduce((sum, value) => sum + value, 0);

    // Convertir tiempo total a horas, minutos y segundos
    const hours = Math.floor(totalTimeSpentInSeconds / 3600);
    const minutes = Math.floor((totalTimeSpentInSeconds % 3600) / 60);
    const seconds = totalTimeSpentInSeconds % 60;

    // Formateamos el tiempo total
    clientData.totalTimeSpent = `${hours} hours ${minutes} minutes ${seconds} seconds`;

    // Actualizamos las propiedades de correos y IDs con los sets
    clientData.userIds = Array.from(userIdsSet);
    clientData.emails = Array.from(emailsSet);
    clientData.clickcount = totalClickCount;
    clientData.clicksGeneral = clicksAll;
    clientData.sectionsAlls = sectionsAll;

    console.log("🚀 ~ askDashboardAnalytics ~ clientData:", clientData)
    // Devuelve los datos organizados
    return clientData;
};
