import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser";
import "./FundraiserForm.css";

function FundraiserForm() {
    const navigate = useNavigate();
    const [fundraiser, setFundraiser] = useState({
        title: "",
        description: "",
        goal: "",
        image: "",
        genre_type: "",
    });

    const handleChange = (event) => {
        const { id, name, value } = event.target;
        const key = name || id;
        setFundraiser(prevFundraiser => ({
            ...prevFundraiser,
            // [id]: value
        [key]: value
        }));
    };

    const handleSubmit = (event) => {
        console.log(event)

        event.preventDefault();
        try {
            new URL(fundraiser.image);
        } catch (error) {
            console.error("Invalid image URL");
            return;
        }
        if ( 
            fundraiser.title && 
            fundraiser.description && 
            fundraiser.goal && 
            fundraiser.image && 
            fundraiser.genre_type ) 
            {
            postFundraiser( 
                fundraiser.title,  
                fundraiser.description,
                Number(fundraiser.goal),
                fundraiser.image,
                fundraiser.genre_type
            ).then(
                (response) => {
            console.log(response)
            navigate("/");});
        

        }
    };

    return (
        <form className="fundraiser-form" onSubmit={handleSubmit}>
            <div className="field">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" id="title" className="input" value={fundraiser.title} placeholder="Enter title" onChange={handleChange} required />
            </div>
            <div className="field">
                <label htmlFor="description">Description:</label>
                <input type="text" name="description" id="description" className="input" value={fundraiser.description}    placeholder="Enter description" onChange={handleChange} rows={6}
        required />
            </div>
            <div className="field">
                <label htmlFor="goal">Goal:</label>
                <input type="number" name="goal" id="goal" className="input" value={fundraiser.goal}   placeholder="Enter goal" inputMode="numeric" onChange={handleChange} required
        min="10"/>
            </div>
            <div className="field">
                <label htmlFor="image">Image URL:</label>
                <input type="url" name="image" id="image" className="input"  value={fundraiser.image} placeholder="Enter image URL" onChange={handleChange} required />
            </div>
            <div className="field">
                <label htmlFor="genre_type">Genre type:</label>
                <select id="genre_type" name="genre_type" className="input" value={fundraiser.genre_type} onChange={handleChange} required>
                    <option value="">Select genre</option>
                    <option value="drama">Drama</option>
                    <option value="romance">Romance</option>
                    <option value="crime">Crime</option>
                    <option value="thriller">Thriller</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="sci-fi">Sci-Fi</option>
                    <option value="young adult">Young Adult</option>
                    <option value="children">Children</option>
                    <option value="self-help">Self-Help</option>
                    <option value="biography">Biography</option>
                    <option value="history">History</option>
                    <option value="knowledge">Knowledge</option>
                    <option value="poem">Poem</option>
                    <option value="classic">Classic</option>
                    <option value="modern">Modern</option>
                    <option value="short">Short</option>
                    <option value="picture">Picture</option>
                    <option value="middle">Middle</option>
                </select>

            </div>
            <button type="submit" className="btn primary" > Create Fundraiser</button>
        </form>
    );
}

export default FundraiserForm;