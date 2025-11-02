import { Link, Outlet,useNavigate , useLocation} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import defaultAvatar from "../assets/default-avatar.jpg";
import "./NavBar.css";
import { Menu } from "lucide-react";


function NavBar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [menuOpen, setMenuOpen] = useState(false); 
    const [navOpen, setNavOpen] = useState(false); 
    const menuRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("token"));
    const displayAvatar = avatarUrl || defaultAvatar;
    const location = useLocation();
    // const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleNav = () => setNavOpen(!navOpen);

    useEffect(() => {
        setIsLoggedIn(!!window.localStorage.getItem("token"));
        setUsername(window.localStorage.getItem("username") || "");
        setAvatarUrl(window.localStorage.getItem("profileImage") || window.localStorage.getItem("avatar") || "");
    }, [location]);

    // close menu on outside click
    useEffect(() => {
        function handleStorage(e) {
            if (!e.key) return;
            if (["token","username","profileImage","avatar"].includes(e.key)) {
                setIsLoggedIn(!!window.localStorage.getItem("token"));
                setUsername(window.localStorage.getItem("username") || "");
                setAvatarUrl(window.localStorage.getItem("profileImage") || window.localStorage.getItem("avatar") || "");
            }
        }
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
    }, []);

    useEffect(() => {
        function handleClick(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        }
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("username");
        window.localStorage.removeItem("profileImage");
        window.localStorage.removeItem("avatar");
        setIsLoggedIn(false);
        setUsername("");
        setAvatarUrl("");
        setMenuOpen(false);
        navigate("/login");
    };

    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo"> <Link to="/">Inkvestor</Link></div>
        {/* Hamburger button (visible on small screens) */}
        <button 
        className="hamburger-button" 
        onClick={toggleNav} 
        aria-label="Toggle navigation"
        >
        <Menu size={24} strokeWidth={2} />
        </button>

        {/* Collapsible nav links */}
        <div className={`navbar-links ${navOpen ? "active" : ""}`}>
        <Link to="/" onClick={() => setNavOpen(false)}>Home</Link>
        <Link to="/fundraisers" onClick={() => setNavOpen(false)}>New Fundraiser</Link>
        <Link to="/about" onClick={() => setNavOpen(false)}>About Us</Link>
        <Link to="/contact" onClick={() => setNavOpen(false)}>Contact Us</Link>

        <div className="navbar-right">
            {!isLoggedIn && (
            <>
                <Link to="/login" onClick={() => setNavOpen(false)}>Login</Link>
                <Link to="/api-token-auth/" onClick={() => setNavOpen(false)}>Register</Link>
            </>
            )}

            {isLoggedIn && (
            <div className="profile-container" ref={menuRef}>
                <button
                className="profile-button"
                onClick={(e) => { e.stopPropagation(); setMenuOpen(prev => !prev); }}
                aria-haspopup="true"
                aria-expanded={menuOpen}
                >
                <img src={displayAvatar} alt="profile" className="profile-avatar" />
                </button>

                {menuOpen && (
                <div className="profile-menu">
                    <div className="profile-info">
                    <div className="profile-info-avatar">
                        <img src={displayAvatar} alt="profile" className="profile-avatar-sm" />
                    </div>
                    <div className="profile-info-name">{username || "User"}</div>
                    </div>
                    <Link to="/profile" className="profile-menu-item" onClick={() => {setMenuOpen(false); setNavOpen(false);}}>Profile</Link>
                    <button className="profile-menu-item logout" onClick={handleLogout}>Logout</button>
                </div>
                )}
            </div>
            )}
        </div>
        </div>


            </nav>

            
            {/* React Router will pass components into the <Outlet /> based on the path */}
            <Outlet />
        </div>
    );
}

export default NavBar;