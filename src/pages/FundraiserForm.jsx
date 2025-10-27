import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postFundraiser from "../api/post-fundraiser";

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
        const { id, value } = event.target;
        setFundraiser(prevFundraiser => ({
            ...prevFundraiser,
            // [id]: value
        [id]: id === "goal" ? parseInt(value, 10) : value
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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" placeholder="Enter title" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input type="text" id="description" placeholder="Enter description" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="goal">Goal:</label>
                <input type="number" id="goal" placeholder="Enter goal" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="image">Image URL:</label>
                <input type="url" id="image" placeholder="Enter image URL" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="genre_type">Genre type:</label>
                <select id="genre_type" value={fundraiser.genre_type} onChange={handleChange}>
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
            <button type="submit" > Create Fundraiser</button>
        </form>
    );
}

export default FundraiserForm;