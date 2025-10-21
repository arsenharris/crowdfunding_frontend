async function updateFundraiser(id, newImageUrl) {
    const token = window.localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/${id}/`;

    const response = await fetch(url, {
        method: "PATCH", // PATCH updates only the fields you send
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            image: newImageUrl
        }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to update fundraiser`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export default updateFundraiser;
