import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postPledges from "../api/post-pledges";
import { comment } from "postcss";

function PledgeForm({ fundraiserId, onSuccess, onCancel }) {
    const navigate = useNavigate();
    const [pledge, setPledge] = useState({ 
        tier_level: 1,
        amount: "", 
        comment: "Good luck!", 
        anonymous: false 
    });
        // const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { id, value} = event.target;
        setPledge(prevPledge => ({
            ...prevPledge,
            [id]: value
            // [id]: type === "checkbox" ? checked : value
        }));
    };
    
    const handleSubmit = (event) => {
        console.log(event)

        event.preventDefault();
        try {
            new Number(pledge.amount);
        } catch (error) {
            console.error("Invalid amount");
            return;
        }
        if (pledge.amount &&
            pledge.comment ) 
            {
            postPledges( 
                fundraiserId,  
                pledge.tier_level,
                Number(pledge.amount),
                pledge.comment,
                Boolean(pledge.anonymous)
            ).then(
                (response) => {
            console.log(response)
            if (onSuccess) onSuccess();
            // fallback reload if caller didn't handle UI update
            navigate(`/fundraisers/${fundraiserId}`); 
                }
    };






    return (
        <form onSubmit={handleSubmit}>

            <div>
                <label htmlFor="tier_level">Tier:</label>
                <select id="tier_level" value={pledge.tier_level} onChange={handleChange}>
                    <option value={1}>Tier 1: Basic</option>
                    <option value={2}>Tier 2: Hard Copy</option>
                    <option value={3}>Tier 3: Signed Copy</option>
                </select>
            </div>

            <div>
                <label htmlFor="amount">Amount:</label>
                <input type="number" value={pledge.amount} id="amount" placeholder="Enter amount" onChange={handleChange} required
                    min="1" />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <input type="text" id="comment" value={pledge.comment} placeholder="Enter comment" onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="anonymous">
                    <input type="checkbox"id="anonymous" checked={pledge.anonymous} onChange={handleChange}/> Post anonymously
                </label>
            </div>
            <div>
                <button type="submit" >
                    Submit Pledge
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