
import Link from "next/link";
import { API_URL } from "@/config";

async function getCalendar() {
  try {
    const res = await fetch(`${API_URL}/academics/calendar`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function AcademicCalendar() {
  const events = await getCalendar();

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner" style={{backgroundImage: "url('/assets/images/hero.jpg')", backgroundColor: "#003366"}}>
          <div className="container">
              <h1 className="page-title">Academic Calendar</h1>
              <ul className="breadcrumb">
                  <li><Link href="/">Home</Link></li>
                  <li>Academics</li>
                  <li>Academic Calendar</li>
              </ul>
          </div>
      </section>

      {/* Content Section */}
      <section className="section">
          <div className="container">
              <div className="reveal">
                  <h2 className="section-title text-center text-primary">Academic Calendar 2024-25</h2>
                  <p className="text-center text-gray-600 mb-8">Important dates and events for the academic year.</p>

                  <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 p-8 max-w-4xl mx-auto">
                      {events.length === 0 ? (
                        <div className="text-center py-12 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
                            <h3 className="text-xl text-primary font-semibold">Calendar content coming soon...</h3>
                            <p className="text-gray-500 mt-2">The detailed academic calendar will be updated here shortly.</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                            {events.map((event: any) => (
                                <div key={event.id} className="flex items-center p-4 border-l-4 border-primary bg-gray-50 rounded shadow-sm hover:shadow-md transition">
                                    <div className="min-w-[100px] text-center border-r border-gray-200 pr-4 mr-4">
                                        <div className="text-2xl font-bold text-primary">{new Date(event.event_date).getDate()}</div>
                                        <div className="text-sm uppercase text-gray-500">{new Date(event.event_date).toLocaleString('default', { month: 'short' })}</div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">{event.event_name}</h4>
                                        <span className={`text-xs px-2 py-1 rounded ${event.event_type === 'Holiday' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {event.event_type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                      )}
                  </div>
              </div>
          </div>
      </section>
    </main>
  );
}
