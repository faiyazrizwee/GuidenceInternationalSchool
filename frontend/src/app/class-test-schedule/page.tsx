
import Link from "next/link";

export default function ClassTestSchedule() {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner" style={{backgroundImage: "url('/assets/images/hero.jpg')", backgroundColor: "#003366"}}>
          <div className="container">
              <h1 className="page-title">Class Test Schedule</h1>
              <ul className="breadcrumb">
                  <li><Link href="/">Home</Link></li>
                  <li>Academics</li>
                  <li>Class Test Schedule</li>
              </ul>
          </div>
      </section>

      {/* Content Section */}
      <section className="section">
          <div className="container">
              <div className="reveal">
                  <h2 className="section-title text-center text-primary">Ongoing & Upcoming Assessments</h2>
                  <p className="text-center text-gray-600 mb-8">Schedule for monthly class tests and periodic assessments.</p>

                  <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 p-8 max-w-4xl mx-auto">
                      <div className="text-center py-12 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
                          <h3 className="text-xl text-primary font-semibold">Test Schedule content coming soon...</h3>
                          <p className="text-gray-500 mt-2">The test schedule will be updated here shortly.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </main>
  );
}
