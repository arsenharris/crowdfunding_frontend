// async function postLogin(username, password) {
//     const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
//     const response = await fetch(url, {
//         method: "POST", // We need to tell the server that we are sending JSON data so we set the Content-Type header to application/json
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             "username": username,
//             "password": password,
//         }),
//     });
//     if (!response.ok) {
//     const fallbackError = `Error trying to login`;
//     const data = await response.json().catch(() => {
//         // Store username in localStorage so you can access it later
//         window.localStorage.setItem("username", username); // store the username entered
//         // Optionally store token if backend returns one
//         if (data.token) {
//             window.localStorage.setItem("token", data.token);}
//     });
//     const errorMessage = data?.detail ?? fallbackError;
//     throw new Error(errorMessage);
//     }
//     return await response.json();
// }
// export default postLogin;

async function postLogin(username, password) {
    const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const fallbackError = `Error trying to login`;
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    // Successful login
    const data = await response.json();

    // Store username in localStorage so it can be used later
    window.localStorage.setItem("username", username);

    // Optionally store token if backend returns one
    if (data.token) {
        window.localStorage.setItem("token", data.token);
    }

    return data;
}

export default postLogin;
