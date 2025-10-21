import React from "react";
import "./Contact.css";
import Footer from "../components/Footer";

function Contact() {
    return (
        <>
        <div className="contact-container">
            <h1>Contact Us</h1>
            <p>Have questions or need help with your campaign? We'd love to hear from you.</p>

            <div className="contact-details">
            <p><strong>Email:</strong> support@crowdfundme.com</p>
            <p><strong>Phone:</strong> +1 (800) 123-4567</p>
            <p><strong>Address:</strong> 123 Crowdfund Ave, Sydney, Australia</p>
            </div>

            <form className="contact-form">
            <label>
                Name:
                <input type="text" name="name" placeholder="Your name" required />
            </label>
            <label>
                Email:
                <input type="email" name="email" placeholder="you@example.com" required />
            </label>
            <label>
                Message:
                <textarea name="message" rows="4" placeholder="Write your message..." required />
            </label>
            <button type="submit">Send Message</button>
            </form>
        </div>
        <Footer />
        </>
    );
    }

export default Contact;

