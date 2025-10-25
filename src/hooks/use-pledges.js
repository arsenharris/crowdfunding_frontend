import { useState, useEffect } from "react";

import getPledges from "../api/get-pledges";

export default function usePledges(fundraiserId) {
    const [pledges, setPledges] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        // Here we pass the fundraiserId to the getPledges function.
        getPledges(fundraiserId)
            .then((pledges) => {
                setPledges(pledges);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });

        // This time we pass the fundraiserId to the dependency array so that the hook will re-run if the fundraiserId changes.
    }, [fundraiserId]);

    return { pledges, isLoading, error };
}
