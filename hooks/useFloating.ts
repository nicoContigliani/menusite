import { useCallback } from "react";

const useHandleCreate = (data: any, setRefreshTrigger: React.Dispatch<React.SetStateAction<number>>) => {
    const handleCreate = useCallback(async () => {
        const { companies } = data;
        if (!companies.length) {
            console.log("No companies data found.");
            return;
        }

        try {
            setRefreshTrigger(0);
            const promises = companies.map(async (record: any) => {
                try {
                    const res = await fetch(`/api/analytics?companyname=${record.companyName}`);
                    if (!res.ok) throw new Error(`Error fetching data for ${record.companyName}`);

                    const response = await fetch(`/api/analytics?companyname=${record.companyName}`, {
                        method: "DELETE",
                    });
                    if (!response.ok) throw new Error(`Error deleting data for ${record.companyName}`);

                    return await response.json();
                } catch (err) {
                    console.error("Error processing record:", record.companyName, err);
                }
            });

            await Promise.all(promises);
            setRefreshTrigger((prev) => prev + 1);
            console.log("Successfully processed all companies.");
        } catch (err) {
            console.error("🚀 ~ handleCreate ~ global error:", err);
        }
    }, [data, setRefreshTrigger]);

    return { handleCreate };
};

export default useHandleCreate;
