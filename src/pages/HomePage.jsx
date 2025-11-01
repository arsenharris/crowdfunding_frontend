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

    const filteredFundraisers = useMemo(() => {
        const getId = (item) => {
            if (!item) return null;
            if (item.id != null) return String(item.id);
            if (item.pk != null) return String(item.pk);
            if (item._id != null) return String(item._id);
            if (item.fundraiser) {
                const f = item.fundraiser;
                if (f.id != null) return String(f.id);
                if (f.pk != null) return String(f.pk);
                if (f._id != null) return String(f._id);
            }
            return null;
        };

        const featuredIds = new Set(
            (featured || []).map(getId).filter(Boolean)
        );
        const featuredTitles = new Set(
            (featured || []).map((f) => (f.title || f.fundraiser?.title || "").toLowerCase()).filter(Boolean)
        );

        const q = query.trim().toLowerCase();
        return (fundraisers || []).filter((f) => {
            // hide featured from the main list by id or title fallback
            const fid = getId(f);
            const title = (f.title || "").toLowerCase();
            if (fid && featuredIds.has(fid)) return false;
            if (title && featuredTitles.has(title)) return false;

            if (!q) return true;
            return (
                (f.title && f.title.toLowerCase().includes(q)) ||
                (f.description && f.description.toLowerCase().includes(q)) ||
                (typeof f.owner === "string"
                    ? f.owner.toLowerCase().includes(q)
                    : f.owner && f.owner.username && f.owner.username.toLowerCase().includes(q))
            );
        });
    }, [fundraisers, query, featured]);


    // helper to compute total pledged for sorting
    const totalPledged = (f) =>(f.pledges || []).reduce((sum, p) => sum + (Number(p.amount) || 0), 0);






    const sortedFundraisers = useMemo(() => {
        const withIndex = filteredFundraisers.map((f, i) => ({ f, i }));
        const safeNum = (v) => {
            if (v == null || v === "") return 0;
            const n = Number(v);
            return Number.isFinite(n) ? n : 0;
        };
        const safeTime = (d) => {
            const t = new Date(d).getTime();
            return Number.isFinite(t) ? t : 0;
        };
        const likesCount = (item) => {
            if (!item) return 0;
            if (Array.isArray(item.likes)) return item.likes.length;
            if (typeof item.likes === "number") return item.likes;
            if (item.like_count != null) return safeNum(item.like_count);
            if (item.likes_count != null) return safeNum(item.likes_count);
            // sometimes likes are stored under reactions or similar
            if (Array.isArray(item.reactions)) return item.reactions.length;
            return 0;
        };
        const safeTitle = (item) => (item && item.title ? String(item.title).toLowerCase() : "");
        const compare = (a, b) => {
            const A = a.f, B = b.f;
            switch (sortBy) {
                case "newest":
                    return safeTime(B.date_created) - safeTime(A.date_created);
                case "mostPledged":
                    return totalPledged(B) - totalPledged(A);
                case "goalAsc":
                    return safeNum(A.goal) - safeNum(B.goal);
                case "goalDesc":
                    return safeNum(B.goal) - safeNum(A.goal);
                case "mostLiked":
                    return likesCount(B) - likesCount(A);
                case "alphaAsc":
                    return safeTitle(A).localeCompare(safeTitle(B), undefined, { sensitivity: "base" });
                case "alphaDesc":
                    return safeTitle(B).localeCompare(safeTitle(A), undefined, { sensitivity: "base" });
                default:
                    return 0;
            }
        };
        withIndex.sort((a, b) => {
            const r = compare(a, b);
            return r !== 0 ? r : a.i - b.i;
        });
        return withIndex.map((x) => x.f);
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
                        <option value="newest">Newest</option>
                        <option value="mostPledged">Most pledged</option>
                        <option value="goalDesc">Goal (high → low)</option>
                        <option value="goalAsc">Goal (low → high)</option>
                        <option value="mostLiked">Most liked</option>
                        <option value="alphaAsc">Alphabetical (A → Z)</option>
                        <option value="alphaDesc">Alphabetical (Z → A)</option>
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
                {sortedFundraisers.length === 0 ? (
                    <p>No fundraisers found.</p>
                ) : (
                    sortedFundraisers.map((fundraiserData, idx) => (
                        <FundraiserCard key={fundraiserData.id ?? idx} fundraiserData={fundraiserData} />
                    ))
                )}                
            </div>
            <Footer />
        </div>
    );
}

export default HomePage;
