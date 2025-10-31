import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postPledges from "../api/post-pledges";

function PledgeForm({ fundraiserId, onSuccess, onCancel }) {
    const [credentials, setCredentials] = useState({ amount: "", comment: "Good luck!", anonymous: false });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { id, value, type, checked } = event.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [id]: type === "checkbox" ? checked : value
        }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        try {
            const amountNumber = Number(credentials.amount);
            await postPledges(fundraiserId, amountNumber, credentials.comment, credentials.anonymous);
            if (onSuccess) onSuccess();
            // fallback reload if caller didn't handle UI update
            window.location.reload();
        } catch (error) {
            console.error("Failed to submit pledge:", error);
            alert("Could not submit pledge. " + (error.message || ""));
        } finally {
            setIsSubmitting(false);
        }
    }



    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label htmlFor="tier_level">Tier:</label>
                <select id="tier_level" value={credentials.tier_level} onChange={handleChange}>
                    <option value={1}>Tier 1: Basic</option>
                    <option value={2}>Tier 2: Hard Copy</option>
                    <option value={3}>Tier 3: Signed Copy</option>
                </select>
            </div>

            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="number" value={credentials.amount} id="amount" placeholder="Enter amount" onChange={handleChange} required
                    min="1" />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <input type="text" id="comment" value={credentials.comment} placeholder="Enter comment" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="anonymous">
                    <input type="checkbox"id="anonymous" checked={credentials.anonymous} onChange={handleChange}/> Post anonymously
                </label>
            </div>
            <div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Pledge"}
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} style={{ marginLeft: "0.5rem" }}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}

export default PledgeForm;