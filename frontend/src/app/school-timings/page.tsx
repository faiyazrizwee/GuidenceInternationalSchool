
import Link from "next/link";

export default function SchoolTimings() {
  return (
    <main>
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Summer camp/20240527_090136.jpg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">School Timings</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li>School Timings</li>
                </ul>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div>
                    <div className="text-center mb-12">
                         <h2 className="section-title">School Timings</h2>
                         <p className="text-gray-600">Standard operational hours for different sections and offices.</p>
                    </div>

                    <div className="grid grid-4 gap-6">
                        {/* Summers */}
                        <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col items-center justify-center h-full">
                            <div className="mb-4">
                                <i className="fas fa-sun text-4xl text-orange-500"></i>
                            </div>
                            <h4 className="text-red-700 font-bold mb-2 uppercase">SUMMERS</h4>
                            <p className="font-bold text-gray-800">7.30AM - 1.00PM</p>
                        </div>

                         {/* Winters */}
                        <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col items-center justify-center h-full">
                            <div className="mb-4">
                                <i className="fas fa-sun text-4xl text-blue-600"></i>
                            </div>
                            <h4 className="text-red-700 font-bold mb-2 uppercase">WINTERS</h4>
                            <p className="font-bold text-gray-800">8:00 am- 2:00 pm<br/>or<br/>8:30 to 2:30 pm</p>
                        </div>

                        {/* Principal Office Hours */}
                        <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col items-center justify-center h-full">
                            <div className="mb-4">
                                <div className="inline-block border-2 border-gray-800 rounded-full p-1 w-12 h-12 flex items-center justify-center">
                                    <i className="fas fa-user text-2xl text-gray-800"></i>
                                </div>
                            </div>
                             <h4 className="text-red-700 font-bold mb-2 uppercase text-sm">PRINCIPAL OFFICE HOURS(PARENTS)</h4>
                            <p className="font-bold text-gray-800">10:00 am- 12:00 pm</p>
                        </div>

                        {/* School Office */}
                        <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col items-center justify-center h-full">
                            <div className="mb-4">
                                 <i className="far fa-building text-4xl text-gray-800"></i>
                            </div>
                            <h4 className="text-red-700 font-bold mb-2 uppercase">SCHOOL OFFICE</h4>
                            <p className="font-bold text-gray-800 text-sm">8:00 am - 4:00 pm except week offs.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
