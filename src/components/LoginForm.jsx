import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postLogin from "../api/post-login";
import "./LoginForm.css";

function LoginForm() {
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    const handleChange = async (event) => {
        const { id, value } = event.target;
            try {
        const data = await postLogin(usernameInput, passwordInput);
        console.log("Login successful, localStorage should have username now:", localStorage.getItem("username"));
        // redirect or update state
        } catch (err) {
            console.error(err);
        }
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [id]: value
        }));
    }

    const handleSubmit = (event) => {
        
        event.preventDefault();
        if ( credentials.username && credentials.password ) {
            postLogin( 
                credentials.username,  
                credentials.password
            ).then((response) => {
                window.localStorage.setItem("token", response.token);
            navigate("/");
        });
        }
    };



    return (
        <form className="login-form">
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input className="form-input" id="username" placeholder="Enter username" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input className="form-input" type="password" id="password" placeholder="Password" onChange={handleChange}/>
            </div>
            <button className="submit-btn" type="submit" onClick={handleSubmit}> Login</button>
        </form>
    );
}

export default LoginForm;

