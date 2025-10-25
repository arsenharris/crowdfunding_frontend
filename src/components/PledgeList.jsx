import { Link } from "react-router-dom";


function PledgeCard(props) {
    const { fundraiserData } = props;
    const pledgeLink = `fundraiser/${fundraiserData.id}/pledges`;


    return (
        <div className="pledge-card">
        <Link to={pledgeLink}>
            <div className="pledge-info">
                <h3 className="amount">${fundraiserData.amount}</h3>
                <h3 className="goal">${fundraiserData.goal}</h3>
            </div>

        </Link>
        </div>
    );
}

export default PledgeCard;