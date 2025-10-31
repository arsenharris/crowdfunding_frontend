
async function postPledges(fundraiserId, amount, comment, anonymous) {

    const token = window.localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify({
            "tier_level": null,
            "amount": amount,
            "comment": comment,
            "anonymous": anonymous,
            fundraiser: fundraiserId
        }),
    });

    if (!response.ok) {
    const fallbackError = `Error trying to create pledges !!! oops`;

    const data = await response.json().catch(() => {
        throw new Error(fallbackError);
    });

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
    }

    return await response.json();
}

export default postPledges;