async function getLike(fundraiserId, like) {
    const token = window.localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/likes/`;
    const response = await fetch(url, {
        method: "GET", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "like":like,

        }),
    });

    if (!response.ok) {
    const fallbackError = `Error fetching fundraiser with id ${fundraiserId}`;

    const data = await response.json().catch(() => {
        throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    }

    return await response.json();
}

export default getLike;