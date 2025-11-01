import { Link, Outlet,useNavigate , useLocation} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import defaultAvatar from "../assets/default-avatar.jpg";
import "./NavBar.css";

function NavBar() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("token"));
    const displayAvatar = avatarUrl || defaultAvatar;
    const location = useLocation();

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
                <div className="navbar-links">
                <Link to="/">Home</Link>
                {/* <Link to="/login">Login</Link>
                <Link to="/api-token-auth/">Register</Link> */}
                <Link to="/fundraisers"> New Fundraiser</Link>
                <Link to="/about"> About Us</Link>
                <Link to="/contact"> Contact Us</Link>

                    <div className="navbar-right">
                        {!isLoggedIn && (
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/api-token-auth/">Register</Link>
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
                                        <Link to="/profile" className="profile-menu-item" onClick={() => setMenuOpen(false)}>Profile</Link>
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