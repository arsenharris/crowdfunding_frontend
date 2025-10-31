import React from "react";
import Footer from "../components/Footer";
import defaultAvatar from "../assets/default-avatar.jpg";

function About() {
    return (
        <>
            <header className="about-hero">
                <div className="about-hero-inner">
                    <h1>Bring Your Story to Life with Support</h1>
                    <p className="lead">
                        Discover and back stories that inspire, written by talented authors.
                    </p>
                    <div className="hero-actions">
                        <a className="btn primary" href="/fundraisers">Start a new fundraisers</a>
                        <a className="btn outline" href="/api-token-auth">Create an account</a>
                    </div>
                </div>
            </header>

            <main className="about-container">
                <section className="mission">
                    <h2>Our mission</h2>
                    <p>
                        We empower creators and changemakers by removing friction from fundraising —
                        connecting good ideas with people who care.
                    </p>

                    <ul className="values-list">
                        <li>
                            <strong>Transparency</strong>
                            <span> Clear fees, clear timelines, clear updates.</span>
                        </li>
                        <li>
                            <strong>Security</strong>
                            <span> Payments and data handled with best practices.</span>
                        </li>
                        <li>
                            <strong>Community</strong>
                            <span> Tools to build lasting relationships, not just one-off donations.</span>
                        </li>
                    </ul>
                </section>

                <section className="features">
                    <h2>Platform features</h2>

                    <div className="feature-grid">
                        <article className="feature">
                            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 2L2 7v7c0 5 5 9 10 9s10-4 10-9V7l-10-5z" fill="currentColor"/>
                            </svg>
                            <h3>Flexible funding</h3>
                            <p>Choose the model that fits your project: flexible or all-or-nothing.</p>
                        </article>

                        <article className="feature">
                            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 1l3 6 6 .5-4.5 3.5L19 18l-7-4-7 4 1.5-7L2 7.5 8 7z" fill="currentColor"/>
                            </svg>
                            <h3>Built-in tools</h3>
                            <p>Campaign pages, updates, rewards, and backer management in one place.</p>
                        </article>

                        <article className="feature">
                            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm-9 9a9 9 0 0118 0H3z" fill="currentColor"/>
                            </svg>
                            <h3>Community support</h3>
                            <p>Discovery features and social sharing help projects reach engaged backers.</p>
                        </article>
                    </div>
                </section>

                <section className="impact">
                    <h2>Impact so far</h2>

                    <div className="stats">
                        <div className="stat">
                            <strong>1,200+</strong>
                            <span>Projects funded</span>
                        </div>
                        <div className="stat">
                            <strong>45,000+</strong>
                            <span>Backers</span>
                        </div>
                        <div className="stat">
                            <strong>$8.3M</strong>
                            <span>Raised</span>
                        </div>
                    </div>
                </section>

                <section className="team">
                    <h2>Meet the team</h2>

                    <div className="team-grid">
                        <div className="team-card">
                            <img
                                className="avatar"
                                src="https://images.unsplash.com/photo-1497493292307-31c376b6e479"
                                alt="Project lead — Ava"
                                loading="lazy"
                                width={96}
                                height={96}
                                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = defaultAvatar }}
                            />
                            <h4>Ava Torres</h4>
                            <p className="role">Founder & CEO</p>
                        </div>

                        <div className="team-card">
                            <img
                                className="avatar"
                                src="https://via.placeholder.com/120"
                                alt="Product lead — Marcus"
                                loading="lazy"
                                width={96}
                                height={96}
                                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = defaultAvatar }}
                            />
                            <h4>Marcus Lee</h4>
                            <p className="role">Product</p>
                        </div>

                        <div className="team-card">
                            <img
                                className="avatar"
                                src="https://via.placeholder.com/120"
                                alt="Engineering lead — Priya"
                                loading="lazy"
                                width={96}
                                height={96}
                                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = defaultAvatar }}
                            />
                            <h4>Priya Patel</h4>
                            <p className="role">Engineering</p>
                        </div>
                    </div>
                </section>

                <section className="cta">
                    <h3>Ready to bring your idea to life?</h3>
                    <a className="btn primary large" href="/start">Launch a campaign</a>
                    <p className="muted">Have questions? <a href="/contact">Contact us</a></p>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default About;