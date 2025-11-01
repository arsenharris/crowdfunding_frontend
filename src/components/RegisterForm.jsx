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

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [id]: value
        }));
    }

    const handleSubmit = (event) => {
        console.log(event)

        event.preventDefault();
        if ( credentials.username && credentials.email && credentials.password ) {
            createUser( 
                credentials.username,  
                credentials.email,
                credentials.password
            ).then((response) => {
            console.log(response)
            navigate("/");
        });
        }
    };



    return (
        <form className="register-form">
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input className="form-input" type="text" id="username" placeholder="Enter username" onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input className="form-input" type="text" id="email" placeholder="Enter email" onChange={handleChange} />
            </div>            
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input className="form-input" type="password" id="password" placeholder="Password" onChange={handleChange}/>
            </div>
            <button className="submit-btn" type="submit" onClick={handleSubmit}> Create an account</button>
        </form>
    );
}

export default RegisterForm;