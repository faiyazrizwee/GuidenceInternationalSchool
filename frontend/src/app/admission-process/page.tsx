
import Link from "next/link";

export default function AdmissionProcess() {
  return (
    <main>
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Staff training/WhatsApp Image 2024-12-12 at 9.43.39 AM (1).jpeg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">Admission Process</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li>Admission Process</li>
                </ul>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="reveal">
                    <div className="timeline">
                        <div className="timeline-item">
                            <div className="timeline-number">1</div>
                            <div className="timeline-content">
                                <h3>Registration</h3>
                                <p>Fill out the registration form online or at the school office. This is the first step to becoming part of our family.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-number">2</div>
                            <div className="timeline-content">
                                <h3>Admission Test / Interview</h3>
                                <p>Students will undergo an assessment based on their grade level to understand their current academic standing.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-number">3</div>
                            <div className="timeline-content">
                                <h3>Document Submission</h3>
                                <p>Provide necessary documents including birth certificate, transfer certificate, and previous academic records.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-number">4</div>
                            <div className="timeline-content">
                                <h3>Fee Payment</h3>
                                <p>Complete the admission formalities by securing your seat through fee payment.</p>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <div className="timeline-number">5</div>
                            <div className="timeline-content">
                                <h3>Uniform & Books</h3>
                                <p>Collect uniform and book lists from the school store and get ready for the first day!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
