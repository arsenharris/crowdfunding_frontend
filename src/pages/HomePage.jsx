import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";
import useFundraisers from "../hooks/use-fundraisers";
import Footer from "../components/Footer"; // ✅ Import Footer
import usePledges from "../hooks/use-pledges";
function HomePage() {
    const { fundraisers } = useFundraisers();
    const { pledges } = usePledges();

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
