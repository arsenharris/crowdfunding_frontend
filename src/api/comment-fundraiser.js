async function postComment(fundraiserId, comments) {
    const token = window.localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/comments/`;
    const response = await fetch(url, {
        method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "comment":comments,

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

export default postComment;