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
        image: null,
        genre_type: "",
    });
    
    const handleChange = (event) => {
        const { id, name, value, files, type } = event.target;
        const key = name || id;
        if (type === "file") {
            setFundraiser(prev => ({ ...prev, [key]: files && files[0] ? files[0] : null }));
            return;
        }
        setFundraiser(prevFundraiser => ({ ...prevFundraiser, [key]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitted image:", fundraiser.image);

        if (!fundraiser.genre_type) {
            console.error("Genre type is required");
            return;
        }

        const goalInt = parseInt(fundraiser.goal, 10);
        if (isNaN(goalInt)) {
            console.error("Goal must be a number");
            return;
        }
        if (!fundraiser.image) {
            console.error("Image file is required");
            return;
        }


        const formData = new FormData();
        formData.append("title", fundraiser.title);
        formData.append("description", fundraiser.description);
        formData.append("goal", goalInt);
        formData.append("genre_type", fundraiser.genre_type);
        formData.append("is_open", true);

        if (fundraiser.image) formData.append("image", fundraiser.image);

        postFundraiser(formData)
            .then(() => navigate("/"))
            .catch(err => console.error(err));
    };

    const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setFundraiser({ ...fundraiser, image: file });
        console.log("Selected image file:", file);
    }
    };

// on submit vs onclick are js events( listeners.)
    return (
        <form className="fundraiser-form" onSubmit={handleSubmit}>
        <div className="field">
            <label htmlFor="title">Title:</label>
            <input  name="title" id="title" className="input" value={fundraiser.title} placeholder="Enter title" onChange={handleChange} required />
        </div>
        <div className="field">
            <label htmlFor="description">Description:</label>
            <input  name="description" id="description" className="input" value={fundraiser.description} placeholder="Enter description" onChange={handleChange} rows={6} required />
        </div>
        <div className="field">
            <label htmlFor="goal">Goal:</label>
            <input type="number" name="goal" id="goal" className="input" value={fundraiser.goal} placeholder="Enter goal" inputMode="numeric" onChange={handleChange} required min="10"/>
        </div>
        <div className="field">
            <label htmlFor="image">Image upload</label>
            <input type="file" name="image" id="image" className="input" accept="image/*" onChange={handleImageChange} />
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
                <option value="scifi">Sci-Fi</option>
                <option value="youngadult">Young Adult</option>
                <option value="children">Children</option>
                <option value="selfhelp">Self-Help</option>
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