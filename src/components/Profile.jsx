// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


function Profile() {
    const [user, setUser] = useState(null);
    const token = localStorage.getItem("token");
    const { userId } = useParams(); 
    const navigate = useNavigate();
    const handleLogout = () => {
        // Remove user info from localStorage
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("profileImage"); // if you store avatar
        // Redirect to home or login page
        navigate("/");
    };

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => console.error("Failed to load user:", err));
    }, [userId]);

    if (!user) return <p>Loading profile...</p>;

    return (
        <div className="profile-page">
        <h1>Welcome, {window.localStorage.getItem("username") || "User"}!</h1>

        <button
            onClick={handleLogout}
            className="logout-button"
            style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#f56565",
            color: "white",
            border: "none",
            borderRadius: "0.25rem",
            cursor: "pointer"
            }}
        >
            Logout
        </button>

        {/* Add your fundraiser list here */}
        </div>
    );
    }

export default Profile;;
