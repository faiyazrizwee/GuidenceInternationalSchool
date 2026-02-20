
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Column 1: Newsletter */}
                    <div className="footer-col">
                        <h4 className="footer-heading">STAY WITH US</h4>
                        <p className="footer-desc">Subscribe to our newsletter for the latest updates and announcements.</p>
                        <form className="footer-newsletter-form">
                            <input type="email" placeholder="Your Email Address" required />
                            <button type="submit">SIGN UP</button>
                        </form>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="footer-col">
                        <h4 className="footer-heading">QUICK LINKS</h4>
                        <ul className="footer-links">
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/admissions">Admissions</Link></li>
                            <li><Link href="/mandatory-disclosure">Mandatory Disclosure</Link></li>
                            <li><Link href="/gallery">Gallery</Link></li>
                            <li><Link href="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div className="footer-col">
                        <h4 className="footer-heading">CONTACT US</h4>
                        <ul className="footer-contact-info">
                            <li><i className="fas fa-phone-alt"></i> +91-8865-091-309</li>
                            <li><i className="fas fa-envelope"></i> gisrampur@gmail.com</li>
                            <li><i className="fas fa-map-marker-alt"></i> Rampur, Uttar Pradesh</li>
                        </ul>
                    </div>

                    {/* Column 4: Social */}
                    <div className="footer-col">
                        <h4 className="footer-heading">FOLLOW US</h4>
                        <div className="footer-social-icons">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="https://youtu.be/7EFU3zV5TnY"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 GUIDANCE INTERNATIONAL SCHOOL. ALL RIGHTS RESERVED.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
