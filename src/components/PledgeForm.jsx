import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postPledges from "../api/post-pledges";

function PledgeForm({ fundraiserId }) {
    const [credentials, setCredentials] = useState({ amount: "", comment: "" });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [id]: value
        }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                ...credentials,
                amount: Number(credentials.amount)
            };
            await postPledges(fundraiserId, payload);
            window.location.reload();
        } catch (error) {
            console.error("Failed to submit pledge:", error);
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="number" value={credentials.amount} id="amount" placeholder="Enter amount" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <input type="text" id="comment" value={credentials.comment} placeholder="Enter comment" onChange={handleChange} />
            </div>
            <button type="submit">Submit Pledge</button>

        </form>
    );
}

export default PledgeForm;