import { Link } from "react-router-dom";
import "./FundraiserCard.css";


function FundraiserCard(props) {
    const { fundraiserData } = props;
    const fundraiserLink = `fundraiser/${fundraiserData.id}`;
    const likesCount = fundraiserData?.likes_count ?? fundraiserData?.likes ?? 0;


    return (
        <div className="fundraiser-card">
            <Link to={fundraiserLink} className="fundraiser-link">
                <h3 className="title">{fundraiserData.title}</h3>
                <div className="fundraiser-image-wrapper">
                    <img src={fundraiserData.image} alt={fundraiserData.title} className="fundraiser-image" />
                </div>
                <div className="fundraiser-info">
                    <div className="meta-row">
                        <span className="goal">Goal: ${fundraiserData.goal}</span>
                        <span className="likes">❤️ {likesCount}</span>
                    </div>

                </div>
            </Link>
        </div>
    );
}
export default FundraiserCard;