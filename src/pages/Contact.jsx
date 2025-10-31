import React from "react";
import "./Contact.css";
import Footer from "../components/Footer";

function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // lightweight UI-only submit simulation
        setStatus({ type: "success", message: "Thanks — we'll get back to you shortly." });
        setTimeout(() => setStatus(null), 4500);
        e.currentTarget.reset();
    };
    return (
        <>
        <section className="contact-hero">
            <div className="contact-hero-inner">
            <h1>Get in touch</h1>
            <p className="lead">Questions about campaigns, partnerships, or support? Reach out and we’ll respond promptly.</p>
            <div className="hero-actions">
                <a className="btn primary" href="mailto:support@crowdfundme.com">Email Support</a>
            </div>
            </div>
        </section>

        <main className="contact-container">
            <div className="contact-grid">
            <aside className="contact-info">
                <h2>Contact details</h2>
                <p className="muted">Prefer direct contact? Use any of the options below.</p>

                <div className="contact-details">
                <p><strong>Email:</strong> <a href="mailto:support@crowdfundme.com">support@crowdfundme.com</a></p>
                <p><strong>Phone:</strong> <a href="tel:+18001234567">+1 (800) 123-4567</a></p>
                <p><strong>Address:</strong> 123 Crowdfund Ave, Sydney, Australia</p>
                </div>

                <div className="impact">
                <h3>Need faster help?</h3>
                <p className="muted">Use the Help Center for guides, or email with attachments for account-specific issues.</p>
                </div>
            </aside>

            <section className="contact-form-wrap">
                <form className="contact-form" onSubmit={handleSubmit} aria-label="Contact form">
                <div className="row">
                    <label>
                    <span className="label-text">Name</span>
                    <input type="text" name="name" placeholder="Your name" required aria-required="true" />
                    </label>

                    <label>
                    <span className="label-text">Email</span>
                    <input type="email" name="email" placeholder="you@example.com" required aria-required="true" />
                    </label>
                </div>

                <label>
                    <span className="label-text">Subject</span>
                    <input type="text" name="subject" placeholder="Short subject" />
                </label>

                <label>
                    <span className="label-text">Message</span>
                    <textarea name="message" rows="6" placeholder="Tell us what's happening..." required aria-required="true"></textarea>
                </label>

                <div className="form-actions">
                    <button type="submit" className="btn primary large" aria-live="polite">Send Message</button>
                    <small className="muted">We typically reply within 24 hours.</small>
                </div>

                </form>
            </section>
            </div>
        </main>

        <Footer />
        </>
    );
    }

export default Contact;

