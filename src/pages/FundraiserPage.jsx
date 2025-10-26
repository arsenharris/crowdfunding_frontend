import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFundraiser from "../hooks/use-fundraiser";
import postLike from "../api/like-fundraiser";
import postComment from "../api/comment-fundraiser";
import "./FundraiserPage.css";
import { ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PledgeForm from "../components/PledgeForm";
import usePledges from "../hooks/use-pledges";

function FundraiserPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [likes, setLikes] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const { fundraiser, isLoading, error } = useFundraiser(id); 
    

    useEffect(() => {
        if (fundraiser?.comments) {
            setComments(fundraiser.comments);
        }
    }, [fundraiser]);


    ///////// Likes /////////
    const incrementLikes = async () => {
        if (likes >= 1) {
            alert("You have already liked this fundraiser!");
            return;
        }
        // optimistic update: show immediate feedback
        setLikes((l) => l + 1);
        try {
            // call your API (adjust signature if needed)
            await postLike(id);
        } catch (err) {
            // revert optimistic update on failure
            setLikes((l) => Math.max(0, l - 1));
            console.error("Failed to send like:", err);
            alert("Could not register like. Please try again.");
        }
    };
    
    ////////// comment //////////
    const handleCommentChange = (e) => setCommentText(e.target.value);
    const handleCommentSubmit = async () => {
        if (!commentText.trim()) return;
        try {
            const newComment = await postComment(id, commentText);
            setComments((prev) => [newComment, ...prev]); // Add new comment instantly
            setCommentText("");
            // simple refresh to see new comments / pledges if backend returns them
            // window.location.reload();
        } catch (err) {
            console.error("Failed to post comment:", err);
            alert("Could not post comment. " + (err.message || ""));
        }
    };  


    //////// progress bar ////////
    const totalPledged = fundraiser?.pledges?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;
    const progress = fundraiser?.goal ? (totalPledged / fundraiser.goal) * 100 : 0;   
    const progressPercent = Math.max(0, Math.min(100, Math.round(progress)));
    
    
    ///////pledges/////////
    const pledges = fundraiser?.pledges ?? [];
    const pledgesCount = pledges.length;



    if (isLoading) {
        return (<p>loading...</p>)}
    if (error) {    
        return (<p>{error.message}</p>)}





    return (
        <div className="fundraiser-page">
            <div className="fundraiser-image"> <img src={fundraiser.image} alt={fundraiser.title} /> </div>
            <div className="fundraiser-details"> 
                {/* Title */}
                <h1>{fundraiser.title}</h1>
                {/* Genre */}
                <p><strong>Genre:</strong> {fundraiser.genre_type}</p>
                {/* Goal */}
                <p><strong>Goal:</strong> ${fundraiser.goal}</p>
                {/* Description */}
                <p><strong>Description:</strong> {fundraiser.description}</p>
                {/* Created at */}
                <h3> Created at: {new Date(fundraiser.date_created).toLocaleString()}</h3>
                {/* End date */}
                <h3> End date: {fundraiser.end_date ? new Date(fundraiser.end_date).toLocaleString() : "Not set yet"}</h3>
                {/* Status */}
                <h3>{`Status: ${fundraiser.is_open}`}</h3>
                {/* Owner */}
                <p><strong>Owner:</strong> {fundraiser.owner?.username}</p>
                {/* Likes */}
                <button onClick={() => incrementLikes()}><ThumbsUp /></button>
                <span>{likes} Likes</span>
                {/* Comments */}
                <div className="comments-section">
                    <h3>Comments</h3>
                    <div>
                        <textarea
                            placeholder="Write your comment here..."
                            value={commentText}
                            onChange={handleCommentChange}
                        ></textarea>
                        <button onClick={handleCommentSubmit} className="comment-submit-button">
                            Submit Comment
                        </button>
                    </div>
                    {comments.length === 0 ? (
                        <p>No comments yet. Be the first to comment!</p>
                    ) : (
                    <ul className="comment-list">
                        {comments.map((c) => (
                            <li key={c.id} className="comment-item">
                                <strong> {c.user?.username}</strong>: {c.text}
                                <br />
                                <small>{new Date(c.date_created).toLocaleString()}</small>
                            </li>       
                        ))}
                    </ul>
                    )}
                </div>    
                {/* Progress bar */}
                <div className="progress-container" aria-labelledby="progress-heading">
                    <h4 id="progress-heading" className="visually-hidden">Fundraiser progress</h4>
                    <div
                        className="progress-bar"
                        role="progressbar"
                        aria-valuenow={progressPercent}
                        style={{ width: `${progressPercent}%` }}
                    >
                        <span className="progress-label">{progressPercent}%</span>
                    </div>
                    <div className="progress-meta">
                        <small>${totalPledged} of ${fundraiser?.goal ?? 0} goal</small>
                    </div>
                </div>                
                {/* Pledges */}
                <section className="pledges-section" aria-labelledby="pledges-heading">
                    <h3 id="pledges-heading">Pledges</h3>
                    <p><strong>Count:</strong> {pledgesCount}</p>
                    <p><strong>Total pledged:</strong> ${totalPledged}</p>
                    {/* List of individual pledges (safe map over empty array) */}
                    <ul className="pledges-list">
                        {pledges.map((pledge) => (
                            <li
                                key={pledge.id ?? `${pledge.supporter}-${pledge.amount}`}
                                className="pledge-item"
                            >
                                ${pledge.amount} — {pledge.supporter}
                            </li>
                        ))}
                    </ul>
                </section>          
                {/* Render the pledge form so users can submit pledges */}
                <div > <h3>Make a Pledge</h3> <PledgeForm fundraiserId={id} /> </div>
                
                {/* Back to home button */}
                <button onClick={() => navigate("/")} className="back-button"> ← Back to Home </button>
            </div>
        </div>
    );
}
export default FundraiserPage;