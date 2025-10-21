import { Link } from "react-router-dom";
import "./FundraiserCard.css";


function FundraiserCard(props) {
    const { fundraiserData } = props;
    const fundraiserLink = `fundraiser/${fundraiserData.id}`;


    return (
        <div className="fundraiser-card">
        <Link to={fundraiserLink}>
            <img src={fundraiserData.image} />
            <div className="fundraiser-info">
                <h3 className="title">{fundraiserData.title}</h3>
                <h3 className="goal">${fundraiserData.goal}</h3>
            </div>

        </Link>
        </div>
    );
}

export default FundraiserCard;