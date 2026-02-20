"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { API_URL } from "@/config";



export default function Home() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);


  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [subscribeMessage, setSubscribeMessage] = useState("");
  const [isUnsubscribing, setIsUnsubscribing] = useState(false);

  useEffect(() => {
    // Open accordion by default on desktop
    if (window.innerWidth > 768) {
        setActiveAccordion("admissions");
    }


  }, []);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus("loading");
    setSubscribeMessage("");

    try {
      let response;
      if (isUnsubscribing) {
          // Unsubscribe logic
          response = await fetch(`${API_URL}/subscriber/?email=${encodeURIComponent(email)}`, {
              method: "DELETE",
          });
      } else {
          // Subscribe logic
          response = await fetch(`${API_URL}/subscriber/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
      }

      if (response.ok) {
        setSubscribeStatus("success");
        setSubscribeMessage(isUnsubscribing ? "Successfully unsubscribed." : "Thank you for subscribing!");
        setEmail("");
      } else {
        const errorData = await response.json();
        setSubscribeStatus("error");
        setSubscribeMessage(errorData.detail || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubscribeStatus("error");
      setSubscribeMessage("Failed to connect. Please check your internet connection.");
    }
  };

  return (
    <main>
        {/* Hero Section */}
        <section className="hero" style={{backgroundImage: "none"}}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                zIndex: 0
              }}
            >
              <source src="https://res.cloudinary.com/dciagnph5/video/upload/v1771596959/GuidanceBGvideo_gaqtil.mp4" type="video/mp4" />
            </video>
            {/* Dark Overlay for better text contrast */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 1
            }}></div>

            <div className="container hero-grid" style={{position: 'relative', zIndex: 10}}>
                <div className="hero-left">
                    <p className="hero-mini-tagline" style={{fontWeight: 700, textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>A Step to Success</p>
                    <h1 style={{textShadow: '2px 2px 8px rgba(0,0,0,0.6)'}}>Guidance International School</h1>
                    <p className="hero-main-quote" style={{fontWeight: 600, textShadow: '2px 2px 4px rgba(0,0,0,0.5)'}}>&quot;More than <em>Education</em> - A Step to lasting <em>Success</em>&quot;</p>
                    
                    <div className="hero-btns">
                        <Link href="/mandatory-disclosure" className="btn btn-red btn-pill">Mandatory Disclosure</Link>
                        <Link href="/admission-form" className="btn btn-white btn-pill">ADMISSIONS</Link>
                    </div>

                    {/* Scholarship Box */}
                    <div className="scholarship-box">
                        <div className="scholarship-images">
                            <Image src="/assets/gallery/Annual day/431964542_927263169404873_3404713853081002155_n.jpg" alt="Students" width={150} height={60} />
                        </div>
                        <div className="scholarship-text">
                            <h3>Scholarship</h3>
                            <p>available for meritorious students</p>
                        </div>
                    </div>
                </div>

                <div className="hero-right">
                    {/* Hero Accordion Card */}
                    <div className="hero-accordion">
                        <div className={`accordion-item ${activeAccordion === "admissions" ? "active" : ""}`}>
                            <button className="accordion-header" onClick={() => toggleAccordion("admissions")}>
                                <span>Admissions: AY 2025 - 26</span>
                                <i className={`fas ${activeAccordion === "admissions" ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </button>
                            <div className="accordion-content">
                                <p>Admissions Open for Academic Year 2025 - 26. Submit the application form online and reserve your spot !</p>
                                <Link href="/admission-form" className="btn btn-navy btn-sm">APPLICATION FORM</Link>
                                <p className="small-note">** Submitting the form does not confirm any admission.</p>
                            </div>
                        </div>
                        <div className={`accordion-item ${activeAccordion === "enquiries" ? "active" : ""}`}>
                            <button className="accordion-header" onClick={() => toggleAccordion("enquiries")}>
                                <span>General Enquiries</span>
                                <i className={`fas ${activeAccordion === "enquiries" ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                            </button>
                            <div className="accordion-content">
                                <p>For general inquiries, please contact us at <a href="mailto:info@guidanceinternationalschool.com">info@guidanceinternationalschool.com</a> or call us at <a href="tel:+918865091309">+91 8865 091 309</a>.</p>
                                <Link href="/contact" className="btn btn-navy btn-sm">CONTACT US</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Ink Splatter Divider */}
            <div className="hero-divider"></div>
        </section>


        {/* Who We Are Section */}
        <section className="section bg-light">
            <div className="container container-flex">
                <div className="who-we-are-text reveal">
                    <h4 className="section-subtitle" style={{color: "#c92f2f"}}>Who we are</h4>
                    <h2 className="section-title">Guidance International School</h2>
                    
                    <p>The creative team of Starmakers through ten academies and six clubs continuously generate ideas that can unleash the innate talents of children in the field of art, music, dance, theatre or public speaking.</p>
                    
                    <p>To offer a system of education that is oriented on the needs of the students and emphasizes their whole development. Empowering children to develop into disciplined leaders of the future with high self esteem.</p>
                    
                    <Link href="/about" className="btn btn-red btn-pill">Discover More</Link>
                </div>
                <div className="who-we-are-image reveal" style={{transform: "translateY(3rem)"}}>
                     <Image src="/assets/gallery/new_pic/PXL_20251017_054720044.PORTRAIT.jpg" alt="Students Learning" width={600} height={400} style={{borderRadius: "20px"}} />
                </div>
            </div>
        </section>

        {/* How we make a Difference Section */}
        <section className="section section-what-we-do">
            <div className="container container-flex">
                <div className="difference-text reveal">
                    <h4 className="section-subtitle" style={{color: "#c92f2f"}}>How we make a Difference</h4>
                    <h2 className="section-title">What we do</h2>
                    
                    <div className="difference-item">
                        <h4 className="text-primary" style={{fontWeight: 700, color: "#c92f2f"}}>Purpose</h4>
                        <p>We believe that education is more than just textbooks and exams - it&apos;s about shaping future leaders who are ready to take on the world.</p>
                    </div>

                    <div className="difference-item">
                        <h4 className="text-primary" style={{fontWeight: 700, color: "#c92f2f"}}>Vision</h4>
                        <p>With a team of dedicated educators, innovative teaching methods, and state-of-the-art facilities, we focus on nurturing the individual potential of each student.</p>
                    </div>

                    <div className="difference-item">
                        <h4 className="text-primary" style={{fontWeight: 700, color: "#c92f2f"}}>Growth</h4>
                        <p>At Guidance International School, we are more than just a school - we are a place where future visionaries are made.</p>
                    </div>
                </div>
                <div className="difference-image reveal">
                     <div className="image-grid-collage">
                         <Image src="/assets/gallery/new_pic/IMG-20251016-WA0127.jpg" alt="Student Reading" width={300} height={200} className="collage-img-1" />
                         <Image src="/assets/gallery/new_pic/IMG-20251016-WA0128.jpg" alt="Science Lab" width={300} height={200} className="collage-img-2" />
                     </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="section features">
            <div className="container">
                <div className="section-header reveal">
                    <h2 className="section-title">OUR FEATURES & FACILITIES</h2>
                </div>
                <div className="grid grid-3 reveal">
                    {/* Feature 1 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <h4 className="feature-title">Realtime Vehicle Tracking</h4>
                        <p className="feature-text">
                            Ensure the safety and security of our students with our advanced GPS-based vehicle tracking system for all school transport.
                        </p>
                    </div>
                    {/* Feature 2 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-trophy"></i>
                        </div>
                        <h4 className="feature-title">World-Class Sports Academy</h4>
                        <p className="feature-text">State-of-the-art sports facilities and professional coaching to nurture talent and promote physical well-being.</p>
                    </div>
                    {/* Feature 3 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-theater-masks"></i>
                        </div>
                        <h4 className="feature-title">Open Air Theater</h4>
                        <p className="feature-text">A unique space for cultural performances, assemblies, and creative expressions under the open sky.</p>
                    </div>
                    {/* Feature 4 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-building"></i>
                        </div>
                        <h4 className="feature-title">Expanding For a Brighter Future</h4>
                        <p className="feature-text">Continuous infrastructure development to provide the best learning environment for our growing community.</p>
                    </div>
                    {/* Feature 5 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-laptop-code"></i>
                        </div>
                        <h4 className="feature-title">Preparing For Tomorrow with IT & AI</h4>
                        <p className="feature-text">Equipping students with future-ready skills through our advanced IT labs and AI-integrated curriculum.</p>
                    </div>
                    {/* Feature 6 */}
                    <div className="feature-card">
                        <div className="feature-icon">
                            <i className="fas fa-user-graduate"></i>
                        </div>
                        <h4 className="feature-title">Guidance From Expert Educators</h4>
                        <p className="feature-text">Learning from highly qualified and experienced teachers who are mentors and role models.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Principal's Message Section */}
        <section className="section section-difference">
            <div className="container">
                <div className="principal-section reveal">
                    <div className="principal-content">
                        <h2>Principal&apos;s Message</h2>
                        <p>Welcome to Guidance International School, where we believe that every child has the potential to achieve greatness. Our mission is to provide a nurturing and stimulating environment that fosters intellectual curiosity, creativity, and character development.</p>
                        <p>At Guidance International School, we are committed to excellence in education. Our dedicated team of educators works tirelessly to ensure that each student receives personalized attention and guidance to help them reach their full potential.</p>
                        <p>We understand that education extends beyond textbooks. That&apos;s why we emphasize holistic development through sports, arts, and various extracurricular activities. Our goal is to prepare students not just for exams, but for life itself.</p>
                        <p>I invite you to explore what makes Guidance International School a special place for learning and growth. Together, let&apos;s embark on this exciting journey of discovery and achievement.</p>
                    </div>
                    <div className="principal-image">
                        <Image src="/assets/images/principal.jpg" alt="Dr. Meera Sharma - Principal" width={400} height={500} />
                        <p className="principal-name">Dr. Jakkarapu Renuka</p>
                        <p className="principal-title">Principal</p>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Strip */}
        <section className="cta-strip">
            <div className="container">
                <h2>Guidance International School — The Right Choice!</h2>
                <Link href="/contact" className="btn btn-outline-white btn-lg">
                    Contact us <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
        </section>

        {/* Newsletter Section */}
        <section className="newsletter-section">
            <div className="container">
                <div className="newsletter-content reveal">
                    <div className="flex justify-between items-center mb-4">
                        <h3>{isUnsubscribing ? "Unsubscribe" : "Stay Updated"}</h3>
                        <button 
                            type="button" 
                            onClick={() => {
                                setIsUnsubscribing(!isUnsubscribing);
                                setSubscribeMessage("");
                                setSubscribeStatus("idle");
                            }}
                            className="text-primary text-sm underline hover:text-blue-800"
                        >
                            {isUnsubscribing ? "Want to Subscribe?" : "Unsubscribe?"}
                        </button>
                    </div>
                    
                    <p>{isUnsubscribing ? "Enter your email to unsubscribe from our newsletter." : "Subscribe to our newsletter for the latest news, events, and updates from Guidance International School."}</p>
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Enter your email address" 
                            required 
                            aria-label="Email address" 
                            style={{border: "1px solid var(--color-primary)"}} 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={subscribeStatus === "loading" || subscribeStatus === "success"}
                        />
                        <button type="submit" className="btn btn-primary" disabled={subscribeStatus === "loading" || subscribeStatus === "success"}>
                            {subscribeStatus === "loading" ? "Processing..." : (subscribeStatus === "success" ? "Done!" : (isUnsubscribing ? "Unsubscribe" : "Subscribe"))}
                        </button>

                    </form>
                    {subscribeMessage && <p style={{marginTop: "1rem", color: subscribeStatus === "error" ? "red" : "green"}}>{subscribeMessage}</p>}
                    <p style={{fontSize: "0.875rem", color: "var(--color-text-muted)", marginTop: "1rem"}}>We respect your privacy. Unsubscribe at any time.</p>
                </div>
            </div>
        </section>

        
        {/* Chat Widget */}
        <div className="chat-widget">
            <a href="https://wa.me/918865091309" target="_blank" rel="noopener noreferrer" className="chat-widget-button">
                <Image src="/assets/images/logo2.png" alt="GIS" width={120} height={80} style={{width: "120px", height: "80px"}} />
                <span>Let&apos;s Chat!</span>
            </a>
        </div>
    </main>
  );
}
