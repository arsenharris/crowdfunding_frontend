import { Link, Outlet } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
    return (
        <div>
            <nav className="navbar">
                <div className="navbar-logo"> <Link to="/">Inkvestor</Link></div>
                <div className="navbar-links">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/api-token-auth/">Register</Link>
                <Link to="/fundraisers"> New Fundraiser</Link>
                <Link to="/about"> About Us</Link>
                <Link to="/contact"> Contact Us</Link>
                </div>
            </nav>
            {/* React Router will pass components into the <Outlet /> based on the path */}
            <Outlet />
        </div>
    );
}

export default NavBar;