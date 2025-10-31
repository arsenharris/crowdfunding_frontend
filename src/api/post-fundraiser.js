
async function postFundraiser(title, description, goal, image, genre_type) {
    
    const token = window.localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/`;
    const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "title":title,
            "description": description,
            "goal": goal,
            "image": image,
            "genre_type": genre_type,
            "is_open": true
        }),
    });

    if (!response.ok) {
    const fallbackError = `Error trying to create fundraiser`;

    const data = await response.json().catch(() => {
        throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    }

    return await response.json();
}

export default postFundraiser;