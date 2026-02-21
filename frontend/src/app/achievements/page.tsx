
import Link from "next/link";
import Image from "next/image";

export default function Achievements() {
  const achievements = [
    {
      title: "Inter-School Debate Competition:",
      description: "Abeer Fatima (Grade 8) secured 3rd rank at the prestigious debate competition hosted by Greenwood Senior Secondary School on October 17, 2024.",
      icon: "fa-microphone"
    },
    {
      title: "19th National Bruce Lee Gold Karate Championship:",
      description: "Our student emerged as a rank holder, showcasing exceptional martial arts skills.",
      icon: "fa-user-ninja" 
    },
    {
      title: "Naat Competition at Saulat Library:",
      description: "Wafiya, a talented student with a melodious voice, won the competition for the second consecutive time.",
      icon: "fa-music"
    },
    {
        title: "Inter-District Karate and Taekwondo Championship:",
        description: "Guidance International School hosted the championship, and our students took home the first-place trophy.",
        icon: "fa-trophy"
    },
    {
        title: "English Olympiad:",
        description: "Our students qualified for the final level, demonstrating their exceptional language skills.",
        icon: "fa-book"
    }
  ];

  return (
    <main>
        {/* Page Banner */}
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Indpendence day/20240815_090652.jpg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">Achievements</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li>Achievements</li>
                </ul>
            </div>
        </section>

        {/* Content */}
        <section className="section">
            <div className="container">
                <div className="reveal text-center">
                    <h2 className="section-title">Celebrating Excellence</h2>
                    <p style={{maxWidth: "800px", margin: "0 auto"}}>At Guidance International School, we take pride in the accomplishments of our students and staff. Their hard work and dedication have earned us recognition in various fields.</p>
                </div>
                
                <div className="grid grid-2" style={{marginTop: "3rem"}}>
                    {achievements.map((achievement, index) => (
                        <div key={index} className="achievement-card" style={{display: "flex", gap: "1.5rem", padding: "2rem", backgroundColor: "#fff", boxShadow: "var(--shadow-md)", borderRadius: "8px", alignItems: "flex-start"}}>
                            <div className="icon" style={{fontSize: "2.5rem", color: "var(--color-accent)"}}>
                                <i className={`fas ${achievement.icon}`}></i>
                            </div>
                            <div>
                                <h4 style={{marginBottom: "0.5rem"}}>{achievement.title}</h4>
                                <p style={{fontSize: "0.9rem", color: "#666"}}>{achievement.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Informational Message Section */}
                <div style={{marginTop: "4rem", backgroundColor: "#f9f9f9", borderRadius: "8px", overflow: "hidden"}}>
                    <div className="grid grid-2" style={{alignItems: "center", gap: "0"}}>
                        {/* Left Column: Image */}
                        <div style={{height: "100%", minHeight: "300px", position: "relative"}}>
                           <div style={{
                                width: "100%",
                                height: "100%",
                                minHeight: "300px",
                                backgroundImage: "url('/assets/gallery/Annual day/431097261_927262706071586_1836745502869245858_n.jpg')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                borderTopLeftRadius: "10px",
                                borderBottomLeftRadius: "10px"
                           }}></div>
                        </div>

                        {/* Right Column: Text */}
                        <div style={{padding: "3rem", textAlign: "left"}}>
                            <h3 style={{color: "var(--color-primary)", marginBottom: "0.5rem", fontWeight: "bold"}}>Educate. Empower. Excel.</h3>
                            <h2 style={{fontSize: "2.5rem", marginBottom: "1.5rem", color: "#333"}}>MESSAGES</h2>
                            <p style={{color: "#555", lineHeight: "1.6"}}>
                                Guidance International School is committed to nurturing responsible global citizens by providing quality education that empowers students to excel academically, embrace ethical values, and contribute positively to society. Together, let us shape a future where knowledge and compassion lead the way.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
