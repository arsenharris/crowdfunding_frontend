async function postComment(fundraiserId, comments) {
    const token = window.localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/comments/`;
    
    const message =
        typeof comments === "string"
            ? comments
            : (comments?.message ?? comments?.content ?? comments?.comment ?? "");
    const payload = { text: message, fundraiser: fundraiserId };
    const response = await fetch(url, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const fallbackError = `Error posting comment for fundraiser ${fundraiserId}`;
        let data;
        try {
            data = await response.json();
        } catch (e) {
            throw new Error(fallbackError);
        }
        console.error("postComment response (non-ok):", {
            status: response.status,
            statusText: response.statusText,
            parsedBody: data,
        });
        let errorMessage = fallbackError;
        if (data) {
            if (typeof data === "string") {
                errorMessage = data;
            } else if (data.detail) {
                errorMessage = data.detail;
            } else {
                const msgs = Object.values(data)
                    .flat()
                    .filter(Boolean)
                    .map((m) => (typeof m === "string" ? m : JSON.stringify(m)));
                if (msgs.length) errorMessage = msgs.join(" ");
            }
        }
        throw new Error(errorMessage);
    }
    return await response.json();
}
export default postComment;