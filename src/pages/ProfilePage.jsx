import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [fundraisers, setFundraisers] = useState([]);

    useEffect(() => {
        const storedUser = window.localStorage.getItem("username");
        setUsername(storedUser || "");

        // Fetch user's fundraisers
        const token = window.localStorage.getItem("token");
        if (token) {
        fetch(`${import.meta.env.VITE_API_URL}/fundraisers/?owner=${storedUser}`, {
            headers: {
            "Authorization": `Token ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setFundraisers(data))
            .catch((err) => console.error("Error loading fundraisers:", err));
        }
    }, []);

    const handleLogout = () => {
        window.localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="profile-page">
        <h1>Welcome, {username}</h1>

        <section className="profile-section">
            <h2>Your Fundraisers</h2>
            {fundraisers.length === 0 ? (
            <p>You haven’t created any fundraisers yet.</p>
            ) : (
            <ul className="fundraiser-list">
                {fundraisers.map((f) => (
                <li key={f.id}>
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                    <div className="fundraiser-actions">
                    <button onClick={() => navigate(`/fundraisers/${f.id}`)}>View</button>
                    <button onClick={() => navigate(`/fundraisers/${f.id}/edit`)}>Edit</button>
                    </div>
                </li>
                ))}
            </ul>
            )}
        </section>

        <section className="profile-actions">
            <button onClick={() => navigate("/settings")} className="settings-button">Settings</button>
            <button onClick={handleLogout} className="logout-button">Logout</button>
        </section>
        </div>
    );
}

export default ProfilePage;
