
import Link from "next/link";
import Image from "next/image";

export default function Principal() {
  return (
    <main>
        {/* Page Banner */}
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Indpendence day/20240815_095156.jpg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">Our Principles</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li>Our Principles</li>
                </ul>
            </div>
        </section>

        {/* Content */}
        <section className="section">
            <div className="container">
                <div className="container-flex" style={{alignItems: "flex-start"}}>
                     <div className="principal-image-large reveal" style={{flex: "0 0 350px"}}>
                        <Image src="/assets/images/principal.jpg" alt="Dr. Jakkarapu Renuka" width={350} height={450} style={{borderRadius: "12px", boxShadow: "var(--shadow-lg)"}} />
                        <div style={{textAlign: "center", marginTop: "1rem"}}>
                            <h3 style={{color: "var(--color-primary)", marginBottom: "0.25rem"}}>Dr. Jakkarapu Renuka</h3>
                            <p style={{color: "#666", fontWeight: 500}}>MA, B.Ed, Ph.D.</p>
                            <p style={{color: "var(--color-accent)", fontWeight: 700}}>Principal</p>
                        </div>
                     </div>
                     
                     <div className="principal-message-text reveal" style={{flex: 1}}>
                        <blockquote style={{fontSize: "1.1rem", fontStyle: "italic", color: "var(--color-primary)", borderLeft: "4px solid var(--color-accent)", paddingLeft: "1.5rem", marginBottom: "2rem"}}>
                            &quot;The words are lovely, dark and deep, But I have promises to keep, and miles to go before I sleep&quot; <br/>
                            <span style={{fontSize: "0.9rem", color: "#666", fontStyle: "normal"}}>- Robert Frost</span>
                        </blockquote>

                        <p>I am delighted to introduce Guidance International School to you. Guidance International is the school of realization of a dream to real time, the delivery of education to make it most effective and enjoyable. We aim to be the leader preparing and inspiring the next generation leaders.</p>
                        
                        <p>We believe in empowering our students with the ability to think, participate, discover, and excel. We take pride in our commitment to providing opportunities for the advancement of our students from every background.</p>

                        <p>We have a team of dedicated educators who are not just teachers but mentors, guiding students through their academic and personal growth. Our state-of-the-art facilities and innovative teaching methodologies ensure that learning is an engaging and enriching experience.</p>
                        
                        <p>At Guidance International School, we prepare children not just for careers but for life - instilling values of integrity, resilience, and compassion that will last a lifetime.</p>
                     </div>
                </div>
            </div>
        </section>
    </main>
  );
}
