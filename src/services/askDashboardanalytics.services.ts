export const askDashboardanalytics = async (data: any) => {
    const userAll = []
    let totalTimeSpentInSeconds = 0;  // Tiempo total en segundos

    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        console.log("🚀 ~ askDashboardanalytics ~ element:", element)
        userAll.push(element.userId);

        const todo = element.lots;
        for (let indexs = 0; indexs < todo.length; indexs++) {
            const sections = todo[indexs].sections;

            console.log("🚀 ~ askDashboardanalytics ~ sections:", sections);

            // Sumamos el timeSpent de todas las secciones (convertido a segundos)
            for (let section of sections) {
                const { timeSpent } = section;
                totalTimeSpentInSeconds += timeSpent;
            }
        }
    }

    // Convertimos el total de tiempo a horas, minutos y segundos
    const hours = Math.floor(totalTimeSpentInSeconds / 3600);
    const minutes = Math.floor((totalTimeSpentInSeconds % 3600) / 60);
    const seconds = totalTimeSpentInSeconds % 60;

    // Formateamos el resultado como HH:MM:SS
    const totalTime = `${hours} hours ${minutes} minutes ${seconds} seconds`;

    console.log("🚀 ~ Total timeSpent en la aplicación (real):", totalTime);

    return totalTime; // Retornamos el tiempo total formateado
};
