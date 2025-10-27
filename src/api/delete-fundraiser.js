async function deleteFundraiser(fundraiserId) {
    const token = window.localStorage.getItem("token");
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}`;
    const headers = {};
    if (token) headers["Authorization"] = `Token ${token}`;

    const resp = await fetch(url, { method: "DELETE", headers });

    if (!resp.ok) {
        const fallback = `Error deleting fundraiser (status ${resp.status})`;
        const json = await resp.json().catch(() => null);
        const text = json ? null : await resp.text().catch(() => null);
        const detail = json?.detail ?? json?.error ?? text ?? fallback;
        throw new Error(detail);
    }

    return true;
}

export default deleteFundraiser;