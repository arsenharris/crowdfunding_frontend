import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";
import useFundraisers from "../hooks/use-fundraisers";
import Footer from "../components/Footer"; // ✅ Import Footer
import useFeaturedFundraisers from "../hooks/use-featured-fundraisers";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

function HomePage() {
    const navigate = useNavigate();
    const { fundraisers } = useFundraisers();
    const { featured, isLoading: featuredLoading } = useFeaturedFundraisers();
    const [query, setQuery] = useState("");
    const [sortBy, setSortBy] = useState("default");
    

    const handleSearchChange = (e) => setQuery(e.target.value.trimStart());
    const handleSortChange = (e) => setSortBy(e.target.value);

    const filteredFundraisers = (fundraisers || []).filter((f) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
            (f.title && f.title.toLowerCase().includes(q)) ||
            (f.description && f.description.toLowerCase().includes(q)) ||
            (f.owner && f.owner.username && f.owner.username.toLowerCase().includes(q))
        );
    });   


    // helper to compute total pledged for sorting
    const totalPledged = (f) =>
        (f.pledges || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const sortedFundraisers = useMemo(() => {
        const list = [...filteredFundraisers];
        switch (sortBy) {
            case "newest":
                return list.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
            case "mostPledged":
                return list.sort((a, b) => totalPledged(b) - totalPledged(a));
            case "goalAsc":
                return list.sort((a, b) => (a.goal || 0) - (b.goal || 0));
            case "goalDesc":
                return list.sort((a, b) => (b.goal || 0) - (a.goal || 0));
            default:
                return list;
        }
    }, [filteredFundraisers, sortBy]);


    return (
        <div className="home-container">
            <div className="home-header">
                <h1>Explore All Fundraisers</h1>


                <div className="header-controls">
                    <input
                        className="search-input"
                        type="search"
                        placeholder="Search by title, description or owner…"
                        value={query}
                        onChange={handleSearchChange}
                        aria-label="Search fundraisers"
                    />

                    <select className="sort-select" value={sortBy} onChange={handleSortChange} aria-label="Sort fundraisers">
                        <option value="default">Sort</option>
                        <option value="newest">Newest</option>
                        <option value="mostPledged">Most pledged</option>
                        <option value="goalDesc">Goal (high → low)</option>
                        <option value="goalAsc">Goal (low → high)</option>
                    </select>
                </div>

            </div>
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
