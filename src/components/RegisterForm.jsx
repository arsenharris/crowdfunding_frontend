import { useState } from "react";
import { useNavigate } from "react-router-dom";
import createUser from "../api/post-createuser";
import "./RegisterForm.css";

function RegisterForm() {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials(prev => ({
            ...prev,
            [id]: value
        }));
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!(credentials.username && credentials.email && credentials.password)) return;

        setLoading(true);
        try {
            const response = await createUser(
                credentials.username,
                credentials.email,
                credentials.password
            );

            // store token & username in localStorage
            if (response?.token) window.localStorage.setItem("token", response.token);
            const name = response?.username || response?.user?.username || credentials.username;
            window.localStorage.setItem("username", name);

            // Redirect using React Router so app reloads components
            navigate(0); // forces React to reload the current page
            // OR you can navigate to home like this:
            // navigate("/", { replace: true });

        } catch (err) {
            console.error("Registration failed:", err);
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }




    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input className="form-input"  id="username" placeholder="Enter username" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input className="form-input"  id="email" placeholder="Enter email" onChange={handleChange} />
            </div>            
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input className="form-input" type="password" id="password" placeholder="Password" onChange={handleChange}/>
            </div>
            <button className="submit-btn" type="submit" > Create an account</button>
        </form>
    );
}

export default RegisterForm;