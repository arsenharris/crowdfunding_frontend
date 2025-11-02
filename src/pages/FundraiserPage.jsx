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

    const navigate = useNavigate(); // Enables page navigation using React Router
    const { id } = useParams(); // Extracts the fundraiser ID from the URL (e.g. /fundraiser/102 → id = 102)
    const [likes, setLikes] = useState(0); // Stores the number of likes for the fundraiser
    const [commentText, setCommentText] = useState(""); // Stores the current comment text input
    const [comments, setComments] = useState([]); // Stores all comments related to the fundraiser
    const { fundraiser, isLoading, error } = useFundraiser(id); // Fetches fundraiser details and loading/error states
    const [showPledgeForm, setShowPledgeForm] = useState(false); // Controls whether the pledge form is visible
    const [isDeleting, setIsDeleting] = useState(false); // Tracks if a delete request is in progress

    /////// Comments /////////
    useEffect(() => { // Runs when fundraiser data updates
        if (fundraiser?.comments) { // Checks if fundraiser has comments
            setComments(fundraiser.comments); // Updates local comments state
        }
    }, [fundraiser]); // Re-runs whenever fundraiser changes

    const handleCommentChange = (e) => setCommentText(e.target.value); // Update the commentText state whenever user types in the textarea

    const handleCommentSubmit = async () => { // Function runs when user submits a comment
        if (!commentText.trim()) return; // Stop if the comment is empty or only contains spaces

        try {
            const newComment = await postComment(id, commentText); // Send the new comment to backend for this fundraiser
            setComments((prev) => [newComment, ...prev]); // Add the new comment to the top of the comments list
            setCommentText(""); // Clear the textarea after successful submission

            // window.location.reload(); // (Optional) Reload page to refresh all data if backend doesn’t return updated comments
        } catch (err) {
            console.error("Failed to post comment:", err); // Log error for debugging
            alert("Could not post comment. " + (err.message || "")); // Notify user of failure
        }
    };
    // comments ended///////

    /////// Likes /////////
    useEffect(() => { // Runs when fundraiser data changes
        if (typeof fundraiser?.likes === "number") { // Checks if fundraiser.likes is a number
            setLikes(fundraiser.likes); // Sets initial likes count
        }
    }, [fundraiser]); // Re-runs whenever fundraiser changes

    const incrementLikes = async () => { // Defines an async function to handle the like button click
        if (likes >= 1) { // If user already liked (only 1 like allowed)
            alert("You have already liked this fundraiser!"); // Show warning message
            return; // Stop function execution
        }

        setLikes((l) => l + 1); // Instantly increase likes count on screen (optimistic update)

        try { 
            await postLike(id); // Send the like action to the backend API for the specific fundraiser
        } catch (err) {
            setLikes((l) => Math.max(0, l - 1)); // Undo like if request fails
            console.error("Failed to send like:", err); // Log error for debugging
            alert("Could not register like. Please try again."); // Notify user something went wrong
        }
    };
    // likes ended///////
    
    //////// progress bar ////////
    const totalPledged = fundraiser?.pledges?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0; // Calculate total pledged amount by summing all pledge amounts
    const progress = fundraiser?.goal ? (totalPledged / fundraiser.goal) * 100 : 0; // Calculate progress percentage toward goal
    const progressPercent = Math.max(0, Math.min(100, Math.round(progress))); // Ensure progress stays between 0% and 100%, rounded to nearest integer
    // progress bar ended ////////
    
    ///////pledges/////////
    const pledges = fundraiser?.pledges ?? []; // Use fundraiser's pledges or empty array if none
    const pledgesCount = pledges.length; // Count how many pledges exist
    const [supporterMap, setSupporterMap] = useState({}); // Store map of supporter IDs to usernames
    useEffect(() => { // Run this effect whenever pledges change
        const ids = Array.from(new Set( // Extract unique supporter IDs from pledges
            pledges
                .filter(p => !p.anonymous && (typeof p.supporter === "number" || typeof p.supporter === "string")) // Skip anonymous pledges and invalid supporters
                .map(p => String(p.supporter)) // Convert supporter IDs to strings for consistency
        ));
        if (ids.length === 0) return; // If no supporters, stop here
        let cancelled = false; // Used to prevent state updates if component unmounts
        (async () => { // Immediately-invoked async function to fetch supporter info
            const map = {}; // Temporary object to hold supporter data
            await Promise.all(ids.map(async (id) => { // Fetch all supporter data in parallel
                try {
                    const res = await fetch(`https://inkvestor-40ee966b1650.herokuapp.com/users/${id}/`); // Request each supporter’s data
                    if (!res.ok) return; // Skip if response not successful
                    const data = await res.json(); // Parse JSON data
                    map[id] = data.username ?? data.user?.username ?? null; // Extract username (handles different backend structures)
                } catch (err) {
                    // ignore individual fetch errors to keep loop running
                }
            }));
            if (!cancelled) setSupporterMap(map); // Update state with usernames if component is still mounted
        })();
        return () => { cancelled = true; }; // Cleanup: mark as cancelled to prevent setting state after unmount
    }, [pledges]); // Dependency array — rerun whenever pledges update
    
    // pledges ended///////

    // delete fundraiser
    const handleDelete = async () => {
    if (!fundraiser) return; // If fundraiser data is not loaded, do nothing
    if (!confirm("Are you sure you want to permanently delete this fundraiser?")) return; // Ask user for confirmation, exit if they cancel
    setIsDeleting(true); // Set deleting state to true to disable delete button and show feedback
    try {
        await deleteFundraiser(id); // Call API to delete the fundraiser by ID
        navigate("/"); // Redirect user back to home page after successful deletion
    } catch (err) {
        console.error("Failed to delete fundraiser:", err); // Log any errors to console
        alert("Could not delete fundraiser: " + (err.message || "Unknown error")); // Show alert to user if deletion fails
    } finally {
        setIsDeleting(false); // Reset deleting state, re-enable delete button
    }
    };
    // delete fundraiser ended /////








    // owner display- this is for fundraiser detail owner ////
    const currentUsername = window.localStorage.getItem("username") || ""; // Retrieves the current logged-in username from local storage
    const normalize = (s) => (s || "").toString().trim().toLowerCase();
    // keep ownerDisplay as-is (for showing on the page)
    const ownerDisplay = typeof fundraiser?.owner === "object"
        ? fundraiser.owner.username ?? "Unknown"
        : typeof fundraiser?.owner === "string"
            ? fundraiser.owner
            : "Unknown";
    // check if current user is the fundraiser owner
    const isOwner = normalize(currentUsername) === normalize(ownerDisplay);
    // Debugging logs
    console.log("currentUsername:", currentUsername);
    console.log("ownerDisplay:", ownerDisplay);
    console.log("isOwner:", isOwner);
        // owner display ended////







    // --- edit state ---
    const [isEditing, setIsEditing] = useState(false); // Track if edit mode is active
    const [editTitle, setEditTitle] = useState("");    // Local state for title edit
    const [editImage, setEditImage] = useState("");    // Local state for image edit
    const [editGoal, setEditGoal] = useState("");      // Local state for goal edit
    const [isSaving, setIsSaving] = useState(false);   // Track if save is in progress

    useEffect(() => {
    if (isEditing && fundraiser) {                 // Only run when edit mode is active and fundraiser data exists
        setEditTitle(fundraiser.title ?? "");      // Initialize local title state with current fundraiser title
        setEditImage(fundraiser.image ?? "");      // Initialize local image state with current fundraiser image
        setEditGoal(fundraiser.goal ? String(fundraiser.goal) : ""); // Initialize goal as string if exists
    }
    }, [isEditing, fundraiser]);                      // Run effect whenever `isEditing` or `fundraiser` changes
    const startEdit = () => {
    if (!isOwner) return;                          // Prevent editing if current user is not the owner
    setIsEditing(true);                             // Enable edit mode
    };
    const cancelEdit = () => {
        setIsEditing(false);                            // Disable edit mode
        setIsSaving(false);                             // Reset saving state
    };


    const saveEdit = async () => {
        if (!fundraiser) return;

        if (!editTitle.trim()) {
            alert("Title cannot be empty");
            return;
        }

        const payload = {
            title: editTitle.trim(),
            image: editImage.trim() || fundraiser.image, // Keep existing if empty
            goal: editGoal ? Number(editGoal) : fundraiser.goal, // Keep existing if empty
        };

        setIsSaving(true);
        try {
            const updated = await updateFundraiser(id, payload);
            console.log("Update successful:", updated);
            
            // Option 1: Reload page (current approach)
            window.location.reload();
            
            // Option 2: Update local state without reload (better UX)
            // setIsEditing(false);
            // setIsSaving(false);
            // Then trigger a refetch in your useFundraiser hook
        } catch (err) {
            console.error("Failed to update fundraiser:", err);
            alert("Could not update fundraiser: " + (err.message || "Unknown error"));
            setIsSaving(false);
        }
    };
    // --- edit state  ended---

    if (isLoading) { // Check if the fundraiser data is still being fetched
        return (<p>loading...</p>); // If loading, show a simple loading message
    }

    if (error) { // Check if there was an error fetching the fundraiser
        return (<p>{error.message}</p>); // If error, display the error message to the user
    }

return (
    <div className="fundraiser-page">
        <div className="fundraiser-details">
            <div className="top-side">
                <div className="fundraiser-image"><img src={fundraiser.image} alt={fundraiser.title} /></div>
                <div className="right-side">
                    <p><strong>Title:</strong> {fundraiser.title}</p>
                    <p><strong>Genre:</strong> {fundraiser.genre_type}</p>
                    <p><strong>Goal:</strong> ${fundraiser.goal}</p>
                    <p><strong>Description:</strong> {fundraiser.description}</p>
                    <h3>Created at: {new Date(fundraiser.date_created).toLocaleString()}</h3>
                    <h3>End date: {fundraiser.end_date ? new Date(fundraiser.end_date).toLocaleString() : "Not set yet"}</h3>
                    <h3>Status: {fundraiser.is_open ? "Open" : "Closed"}</h3>
                    <p><strong>Owner:</strong> {ownerDisplay}</p>
                    <div className="progress-container" aria-labelledby="progress-heading">
                        <h4 id="progress-heading" className="visually-hidden">Fundraiser progress</h4>
                        <div className="progress-bar" role="progressbar" aria-valuenow={progressPercent} style={{ width: `${progressPercent}%` }}>
                            <span className="progress-label">{progressPercent}%</span></div>
                        <div className="progress-meta"><small>${totalPledged} of ${fundraiser?.goal ?? 0} goal</small></div>
                    </div>
                </div>
            </div>
            <div className="bottom-side">
                <div className="image-likes"><button className="like-button" onClick={() => incrementLikes()}><ThumbsUp /></button><span className="likes-count">{likes} Likes</span></div>
                <div className="comments-section">
                    <h3>Comments</h3>
                    <div><textarea placeholder="Write your comment here..." value={commentText} onChange={handleCommentChange}></textarea>
                    <button onClick={handleCommentSubmit} className="comment-submit-button">Submit Comment</button></div>
                    {comments.length === 0 ? <p>No comments yet. Be the first to comment!</p> : 
                    <ul className="comment-list">{comments.map((c) => (<li key={c.id} className="comment-item">
                        <div className="comment-author">
                            <strong>{c.user?.username ?? c.username ?? "Anonymous"}</strong>
                        </div> 
                        <div className="comment-text">{c.text}</div>
                        <div className="comment-date">
                            <small>{new Date(c.date_created).toLocaleString()}</small>
                        </div>
                    </li>))}</ul>}
                </div>
                <section className="pledges-section" aria-labelledby="pledges-heading">
                    <h3 id="pledges-heading">Pledges</h3>
                    <p><strong>Count:</strong> {pledgesCount}</p>
                    <p><strong>Total pledged:</strong> ${totalPledged}</p>
                    {pledges.map((p) => { const idKey = String(p.supporter ?? ""); const supporterName = p.anonymous ? "Anonymous" : 
                        (p.supporter?.username ?? supporterMap[idKey] ?? (typeof p.supporter === "string" ? p.supporter : null) ?? (typeof p.supporter === "number" ? `User #${p.supporter}` : null) ?? "Unknown"); 
                        return (<li key={p.id ?? `${idKey}-${p.amount}`} className="pledge-item">
                        <div className="pledge-main">${p.amount} — {supporterName}</div>{p.comment && <div className="pledge-comment">{p.comment}</div>
                        }{p.date_created && <div className="pledge-meta"><small>{new Date(p.date_created).toLocaleString()}</small></div>}</li>);})}
                </section>
                <div className="make-pledge-area">{!showPledgeForm ? <button className="open-pledge-button" onClick={() => setShowPledgeForm(true)}>Make a Pledge</button> : 
                <div className="pledge-form-wrapper"><h3>Make a Pledge</h3><PledgeForm fundraiserId={id} onSuccess={() => { setShowPledgeForm(false); window.location.reload(); }} onCancel={() => setShowPledgeForm(false)} /></div>}</div>
                <button className="back-home-button" onClick={() => navigate("/")}>Back to Home</button>

                {fundraiser && isOwner && (
                    !isEditing ? (
                        <div className="owner-actions">
                            <button className="update-button" onClick={startEdit} title="Update this fundraiser">Update</button>
                            <button className="delete-button" onClick={handleDelete} disabled={isDeleting} aria-disabled={isDeleting} title="Delete this fundraiser">
                                {isDeleting ? "Deleting…" : "Delete Fundraiser"}
                            </button>
                        </div>
                    ) : (
                        <div className="edit-form">
                            <h3>Edit fundraiser</h3>
                            <label className="edit-label">Title <input className="edit-input" type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /></label>
                            <label className="edit-label">Image URL <input className="edit-input" type="text" value={editImage} onChange={(e) => setEditImage(e.target.value)} /></label>
                            <label className="edit-label">Goal <input className="edit-input" type="number" value={editGoal} onChange={(e) => setEditGoal(e.target.value)} /></label>
                            <div className="edit-actions">
                                <button onClick={saveEdit} disabled={isSaving}>{isSaving ? "Saving…" : "Save"}</button>
                                <button onClick={cancelEdit} disabled={isSaving}>Cancel</button>
                            </div>
                        </div>
                    )
                )}

            </div>
        </div>
    </div>
);
}
export default FundraiserPage;