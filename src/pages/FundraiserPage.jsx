import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFundraiser from "../hooks/use-fundraiser";
import postLike from "../api/post-likefundraiser";
import postComment from "../api/post-commentfundraiser";
import "./FundraiserPage.css";
import { ThumbsUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PledgeForm from "../components/FundraiserPledgeForm";
import usePledges from "../hooks/use-pledges";
import deleteFundraiser from "../api/delete-fundraiser";
import updateFundraiser from "../api/put-fundraiser";      


function FundraiserPage() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [likes, setLikes] = useState(0);
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);
    const {fundraiser, isLoading, error } = useFundraiser(id);
    const {pledge} = usePledges(id); 
    const [showPledgeForm, setShowPledgeForm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const currentUsername = window.localStorage.getItem("username") || "";
    
    
    ///////// Comments /////////    
    useEffect(() => {
        if (fundraiser?.comments) {
            setComments(fundraiser.comments);
        }
    }, [fundraiser]);

   // seed likes from backend value if present
    useEffect(() => {
        if (typeof fundraiser?.likes === "number") {
            setLikes(fundraiser.likes);
        }
    }, [fundraiser]);
// --- edit state ---
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editImage, setEditImage] = useState("");
    const [editGoal, setEditGoal] = useState("");
    const [isSaving, setIsSaving] = useState(false);    
    // When opening edit mode, seed local fields from fundraiser
    useEffect(() => {
        if (isEditing && fundraiser) {
            setEditTitle(fundraiser.title ?? "");
            setEditImage(fundraiser.image ?? "");
            setEditGoal(fundraiser.goal ? String(fundraiser.goal) : "");
        }
    }, [isEditing, fundraiser]);

    const startEdit = () => {
        if (fundraiser?.owner?.username !== currentUsername) return;
        setIsEditing(true);
    };
    const cancelEdit = () => {
        setIsEditing(false);
        setIsSaving(false);
    };

    const saveEdit = async () => {
        if (!fundraiser) return;
        // basic validation
        if (!editTitle.trim()) {
            alert("Title cannot be empty");
            return;
        }
        const payload = {
            title: editTitle.trim(),
            image: editImage.trim() || null,
            goal: editGoal ? Number(editGoal) : null,
        };
        setIsSaving(true);
        try {
            await updateFundraiser(id, payload);
            // simple refresh so the useFundraiser hook reloads
            window.location.reload();
        } catch (err) {
            console.error("Failed to update fundraiser:", err);
            alert("Could not update fundraiser: " + (err.message || ""));
            setIsSaving(false);
        }
    };



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
    const [supporterMap, setSupporterMap] = useState({});

    useEffect(() => {
        const ids = Array.from(new Set(
            pledges
                .filter(p => !p.anonymous && (typeof p.supporter === "number" || typeof p.supporter === "string"))
                .map(p => String(p.supporter))
        ));
        if (ids.length === 0) return;
        let cancelled = false;
        (async () => {
            const map = {};
            await Promise.all(ids.map(async (id) => {
                try {
                    const res = await fetch(`https://inkvestor-40ee966b1650.herokuapp.com/users/${id}/`);
                    if (!res.ok) return;
                    const data = await res.json();
                    map[id] = data.username ?? data.user?.username ?? null;
                } catch (err) {
                    // ignore individual fetch errors
                }
            }));
            if (!cancelled) setSupporterMap(map);
        })();
        return () => { cancelled = true; };
    }, [pledges]);    



    // owner display
    const ownerDisplay =
        fundraiser?.owner?.username ??
        (typeof fundraiser?.owner === "string" ? fundraiser.owner : "Unknown");

        // delete fundraiser
    const handleDelete = async () => {
        if (!fundraiser) return;
        if (!confirm("Are you sure you want to permanently delete this fundraiser?")) return;
        setIsDeleting(true);
        try {
            await deleteFundraiser(id);
            navigate("/");
        } catch (err) {
            console.error("Failed to delete fundraiser:", err);
            alert("Could not delete fundraiser: " + (err.message || "Unknown error"));
        } finally {
            setIsDeleting(false);
        }
    };



    if (isLoading) {
        return (<p>loading...</p>)}
    if (error) {    
        return (<p>{error.message}</p>)}





    return (
        <div className="fundraiser-page">
            <div className="fundraiser-details"> 

                <div className="top-side"> 
                <div className="fundraiser-image"> <img src={fundraiser.image} alt={fundraiser.title} /> </div>
                <div className="right-side"> 
                {/* Title */}
                <p><strong>Title:</strong> {fundraiser.title}</p>
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
                <h3>{`Status: ${fundraiser.is_open ? "Open" : "Closed"}`}</h3>
                {/* Owner */}
                <p><strong>Owner:</strong> {ownerDisplay}</p>
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
                </div>
                </div>

                <div className="bottom-side">
                {/* Likes */}
                <div className ="image-likes"> 
                <button className="like-button"onClick={() => incrementLikes()}><ThumbsUp /></button>
                <span className="likes-count">{likes} Likes</span>
                </div>
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

                {/* Pledges */}
                <section className="pledges-section" aria-labelledby="pledges-heading">
                    <h3 id="pledges-heading">Pledges</h3>
                    <p><strong>Count:</strong> {pledgesCount}</p>
                    <p><strong>Total pledged:</strong> ${totalPledged}</p>
                {/* List of individual pledges (safe map over empty array) */}
                        {pledges.map((p) => {
                            const idKey = String(p.supporter ?? "");
                            const supporterName = p.anonymous
                                ? "Anonymous"
                                : (p.supporter?.username
                                    ?? supporterMap[idKey]
                                    ?? (typeof p.supporter === "string" ? p.supporter : null)
                                    ?? (typeof p.supporter === "number" ? `User #${p.supporter}` : null)
                                    ?? "Unknown");
                            return (
                                <li key={p.id ?? `${idKey}-${p.amount}`} className="pledge-item">
                                    ${p.amount} — {supporterName}
                                </li>
                            );
                        })}
                </section>  

                {/* Render the pledge form so users can submit pledges */}
                <div className="make-pledge-area">
                {!showPledgeForm ? (
                        <button className="open-pledge-button" onClick={() => setShowPledgeForm(true)}>
                            Make a Pledge
                        </button>
                    ) : (
                        <div className="pledge-form-wrapper">
                            <h3>Make a Pledge</h3>
                            <PledgeForm
                                fundraiserId={id}
                                onSuccess={() => {
                                    setShowPledgeForm(false);
                                    window.location.reload();
                                }}
                                onCancel={() => setShowPledgeForm(false)}
                            />
                        </div>
                    )}
                </div>





                {/* Back to home button */}
                <button onClick={() => navigate("/")} className="back-button"> ← Back to Home </button>
                {/* Delete fundraiser button */}
                                {/* Delete button - only show to owner if we can detect them */}
                {fundraiser?.owner?.username === currentUsername && (
                <button
                        className="delete-button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        aria-disabled={isDeleting}
                        title="Delete this fundraiser"
                    >
                        {isDeleting ? "Deleting…" : "Delete Fundraiser"}
                </button>
                )}
                </div>
            </div>
        </div>
    );
}
export default FundraiserPage;