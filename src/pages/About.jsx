import React from "react";
import "./About.css";
import Footer from "../components/Footer";

function About() {
    return (
        <>
        <div className="about-container">
            <h1>About Our Crowdfunding Platform</h1>
            <p>
            Welcome! We are dedicated to helping creators and entrepreneurs raise
            funds for their projects. Our mission is to make fundraising simple,
            transparent, and secure.
            </p>
            <h2>Our Vision</h2>
            <p>
            We aim to connect ideas with people who care. Everyone deserves a chance
            to bring their dreams to life.
            </p>
            <p>
            Learn more on our <a href="/contact">Contact</a> page.
            </p>
        </div>
        <Footer />
        </>
    );
    }

export default About;
