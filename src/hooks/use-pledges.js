import { useState, useEffect } from "react";
import getPledges from "../api/get-pledges";

export default function usePledges(fundraiserId) {
    const [pledges, setPledges] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getPledges(fundraiserId)
            .then((pledges) => {
                setPledges(pledges);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });

    }, [fundraiserId]);

    return { pledges };
}
