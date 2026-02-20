import Link from "next/link";

export default function GeneralInformation() {
  return (
    <main>
        {/* Page Banner */}
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Annual day/432633574_927262959404894_3277676167273804378_n.jpg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">General Information</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/mandatory-disclosure">Mandatory Disclosure</Link></li>
                    <li>General Information</li>
                </ul>
            </div>
        </section>

        {/* Content */}
        <section className="section">
            <div className="container" style={{maxWidth: "900px"}}>
                <div className="reveal">
                    <div style={{padding: "3rem", backgroundColor: "#f9f9f9", borderRadius: "15px", border: "1px solid #ddd"}}>
                        <h2 className="section-title text-center">General Information</h2>
                        
                        <div style={{marginTop: "2rem", overflowX: "auto"}}>
                            <table style={{width: "100%", borderCollapse: "collapse", marginBottom: "2rem"}}>
                                <tbody>
                                    <tr style={{borderBottom: "1px solid #eee"}}>
                                        <td style={{fontWeight: 600, padding: "1rem 0", width: "40%"}}>Name of the School</td>
                                        <td style={{padding: "1rem 0"}}>GUIDANCE INTERNATIONAL SCHOOL</td>
                                    </tr>
                                    <tr style={{borderBottom: "1px solid #eee"}}>
                                        <td style={{fontWeight: 600, padding: "1rem 0"}}>Affiliation No. (If applicable)</td>
                                        <td style={{padding: "1rem 0"}}>2134117</td>
                                    </tr>
                                    <tr style={{borderBottom: "1px solid #eee"}}>
                                        <td style={{fontWeight: 600, padding: "1rem 0"}}>School Code (If applicable)</td>
                                        <td style={{padding: "1rem 0"}}>80163</td>
                                    </tr>
                                    <tr style={{borderBottom: "1px solid #eee"}}>
                                        <td style={{fontWeight: 600, padding: "1rem 0"}}>Complete Address with Pin Code</td>
                                        <td style={{padding: "1rem 0"}}>Wajidpur, Post Koyla, Rampur</td>
                                    </tr>
                                    <tr style={{borderBottom: "1px solid #eee"}}>
                                        <td style={{fontWeight: 600, padding: "1rem 0"}}>Principal Name & Qualification</td>
                                        <td style={{padding: "1rem 0"}}>Dr. Jakkarapu Renuka</td>
                                    </tr>
                                    <tr style={{borderBottom: "1px solid #eee"}}>
                                        <td style={{fontWeight: 600, padding: "1rem 0"}}>School Email ID</td>
                                        <td style={{padding: "1rem 0"}}>gisrampur@gmail.com</td>
                                    </tr>
                                    <tr style={{borderBottom: "1px solid #eee"}}>
                                        <td style={{fontWeight: 600, padding: "1rem 0"}}>Contact Details (Landline/Mobile)</td>
                                        <td style={{padding: "1rem 0"}}>8865091309</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="section-subtitle" style={{marginTop: "2rem"}}>Documents & Information</h3>
                        
                        <div className="grid grid-2" style={{marginTop: "1.5rem"}}>
                                <div className="feature-card" style={{padding: "1.5rem", textAlign: "left"}}>
                                    <h4>Fee Structure</h4>
                                    <a href="/fee-structure" className="btn btn-navy btn-sm" style={{marginTop: "0.5rem"}}>View Document</a>
                                </div>
                                <div className="feature-card" style={{padding: "1.5rem", textAlign: "left"}}>
                                    <h4>Annual Academic Calendar</h4>
                                    <a href="/assets/files/Year plan/UPDATED YEARLY PLAN 24-25.xlsx" className="btn btn-navy btn-sm" style={{marginTop: "0.5rem"}} target="_blank" download>View Document</a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
