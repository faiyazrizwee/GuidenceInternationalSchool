
import Link from "next/link";

export default function Goals() {
  return (
    <main>
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Beyond classroom/WhatsApp Image 2024-12-10 at 8.25.29 PM.jpeg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">Our Goals & Objectives</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li>Our Goals</li>
                </ul>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="grid grid-2 reveal">
                    <div className="feature-card" style={{textAlign: "left"}}>
                        <div className="feature-icon"><i className="fas fa-bullseye"></i></div>
                        <h4>Empowerment</h4>
                        <p>To empower students to learn and to provide them with the skills to be able to manage their own learning.</p>
                    </div>
                    <div className="feature-card" style={{textAlign: "left"}}>
                        <div className="feature-icon"><i className="fas fa-book-open"></i></div>
                        <h4>Comprehensive Curriculum</h4>
                        <p>To provide students with a comprehensive and balanced curriculum that meets their individual needs.</p>
                    </div>
                    <div className="feature-card" style={{textAlign: "left"}}>
                        <div className="feature-icon"><i className="fas fa-briefcase"></i></div>
                        <h4>Career Preparation</h4>
                        <p>To provide students with a high-quality education that prepares them for success in their future careers.</p>
                    </div>
                    <div className="feature-card" style={{textAlign: "left"}}>
                        <div className="feature-icon"><i className="fas fa-heart"></i></div>
                        <h4>Supportive Environment</h4>
                        <p>To provide students with a safe and supportive learning environment.</p>
                    </div>
                    <div className="feature-card" style={{textAlign: "left"}}>
                        <div className="feature-icon"><i className="fas fa-users"></i></div>
                        <h4>Leadership</h4>
                        <p>To provide students with opportunities to develop their leadership skills.</p>
                    </div>
                    <div className="feature-card" style={{textAlign: "left"}}>
                        <div className="feature-icon"><i className="fas fa-running"></i></div>
                        <h4>Extracurriculars</h4>
                        <p>To provide students with opportunities to participate in extracurricular activities.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
