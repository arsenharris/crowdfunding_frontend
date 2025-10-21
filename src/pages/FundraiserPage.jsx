import { useParams } from "react-router-dom";
import useFundraiser from "../hooks/use-fundraiser";
import "./FundraiserPage.css";

function FundraiserPage() {
    const { id } = useParams();
    const { fundraiser, isLoading, error } = useFundraiser(id);    
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

            <ul>
                {fundraiser.pledges.map((pledgeData, key) => {
                    return (
                        <li key={key}>
                            {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                    );   
                })}
            </ul>
            <p><strong>Comment:</strong> {fundraiser.Comment}</p>
            <p><strong>Like</strong> {fundraiser.Like}</p>
            
                

            <p><strong>Owner:</strong> {fundraiser.owner?.username}</p>

            </div>
        </div>
    );
}

export default FundraiserPage;