import { useParams } from "react-router-dom";
import { useState } from "react";
import useFundraiser from "../hooks/use-fundraiser";
import postLike from "../api/like-fundraiser";
import postComment from "../api/comment-fundraiser";

import "./FundraiserPage.css";
import { ThumbsUp } from "lucide-react";

function FundraiserPage() {
    const { id } = useParams();
    const [likes, setLikes] = useState(0);
    const { fundraiser, isLoading, error } = useFundraiser(id);   
    const incrementLikes = () => {
        if (likes >= 1) { alert ("You have already liked this fundraiser!"); return; }        
        setLikes(likes + 1);
    } 
    if (isLoading) {
        return (<p>loading...</p>)}
    if (error) {    
        return (<p>{error.message}</p>)}
    return (
        <div className="fundraiser-page">
            <div className="fundraiser-image">
                <img src={fundraiser.image} />
            </div>
            <div className="fundraiser-details"> 
            <h1>{fundraiser.title}</h1>
            <p><strong>Genre:</strong> {fundraiser.genre_type}</p>
            <p><strong>Goal:</strong> ${fundraiser.goal}</p>
            <p><strong>Description:</strong> {fundraiser.description}</p>
            <h3> Created at: {new Date(fundraiser.date_created).toLocaleString()}</h3>
            <h3> End date: {fundraiser.end_date ? new Date(fundraiser.end_date).toLocaleString() : "Not set yet"}</h3>

            <h3>{`Status: ${fundraiser.is_open}`}</h3>

            <h3>Pledges:</h3>

            
            <button onClick={() => incrementLikes()}><ThumbsUp /></button>
            <span>{likes} Likes</span>

            <textarea id="comment" placeholder="Leave a comment..."></textarea> 
            <button>Submit Comment</button>

            <ul>
                {fundraiser.pledges.map((pledgeData, key) => {
                    return (
                        <li key={key}>
                            {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                    );   
                })}
            </ul>
            
            
                

            <p><strong>Owner:</strong> {fundraiser.owner?.username}</p>

            </div>
        </div>
    );
}

export default FundraiserPage;