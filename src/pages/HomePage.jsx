import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";
import useFundraisers from "../hooks/use-fundraisers";
import Footer from "../components/Footer"; // ✅ Import Footer
import useFeaturedFundraisers from "../hooks/use-featured-fundraisers";


function HomePage() {
    const { fundraisers } = useFundraisers();
    const { featured, isLoading: featuredLoading } = useFeaturedFundraisers();
    return (
        <div className="home-container">

            {featured && featured.length > 0 && (
                <section id="featured-fundraisers" className="featured-section">
                    <h2>Featured</h2>
                    <div className="featured-list">
                        {featured.map((f) => (
                            <FundraiserCard key={f.id} fundraiserData={f} />
                        ))}
                    </div>
                </section>
            )}
            
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
