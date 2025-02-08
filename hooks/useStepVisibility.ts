import { useEffect } from "react";

interface StepVisibilityProps {
    current: number;
    setCurrent: (value: number) => void;
    setShowDownload: (value: boolean) => void;
    setShowUploadImageToStorage: (value: boolean) => void;
    setShowProfile: (value: boolean) => void;
    setShowLicence: (value: boolean) => void;
    setShowStaff: (value: boolean) => void;
}

const useStepVisibility = ({
    current,
    setCurrent,
    setShowDownload,
    setShowUploadImageToStorage,
    setShowProfile,
    setShowLicence,
    setShowStaff
}: StepVisibilityProps) => {
    const visibilityStates: Record<number, { download: boolean; upload: boolean; profile: boolean; licence: boolean; staff: boolean }> = {
        0: { download: true, upload: false, profile: false, licence: false, staff: false },
        1: { download: false, upload: true, profile: false, licence: false, staff: false },
        2: { download: false, upload: false, profile: true, licence: false, staff: false },
        3: { download: false, upload: false, profile: false, licence: true, staff: false },
        4: { download: false, upload: false, profile: false, licence: false, staff: true }
    };

    useEffect(() => {
        const { download = false, upload = false, profile = false, licence = false, staff = false } = visibilityStates[current] || {};
        
        setShowDownload(download);
        setShowUploadImageToStorage(upload);
        setShowProfile(profile);
        setShowLicence(licence);
        setShowStaff(staff);
    }, [current, setShowDownload, setShowUploadImageToStorage, setShowProfile, setShowLicence, setShowStaff]);

    return { setCurrent };
};

export default useStepVisibility;
