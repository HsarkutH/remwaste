import React from "react";
import "./Header.css";

const TrashIllustration = () => (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
        {/* Simple illustration*/}
        <rect x="20" y="30" width="80" height="40" rx="8" fill="#b0bec5" />
        <rect x="35" y="20" width="50" height="15" rx="4" fill="#789262" />
        <rect x="50" y="60" width="20" height="10" rx="3" fill="#616161" />
        <circle cx="35" cy="70" r="5" fill="#616161" />
        <circle cx="85" cy="70" r="5" fill="#616161" />
    </svg>
);

const Header: React.FC<{ postcode: string; onChangePostcode: () => void }> = ({
    postcode,
    onChangePostcode,
}) => (
    <header className="hero-header">
        <div className="hero-illustration">
            <TrashIllustration />
        </div>
        <div className="hero-content">
            <h1>Find the Perfect Skip for Your Project!</h1>
            <p>Choose the right skip size and get instant pricing for your area.</p>
            <div className="postcode-bar">
                <span className="postcode-badge">{postcode}</span>
                <button className="change-btn" onClick={onChangePostcode}>
                    Change
                </button>
            </div>
        </div>
    </header>
);

export default Header;