import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";
import useFundraisers from "../hooks/use-fundraisers";
import Footer from "../components/Footer"; // ✅ Import Footer

function HomePage() {
    const { fundraisers } = useFundraisers();

    return (
        <div className="home-container">
            <div id="fundraiser-list">
                {fundraisers.map((fundraiserData, key) => {
                    return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
                })}
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
