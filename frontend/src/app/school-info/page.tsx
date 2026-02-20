
import Link from "next/link";

export default function SchoolInfo() {
  return (
    <main>
        {/* Page Banner */}
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Plant drive/20240422_114108.jpg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">School Uniform</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li>School Uniform</li>
                </ul>
            </div>
        </section>

        {/* Content */}
        <section className="section">
            <div className="container" style={{maxWidth: "1200px"}}>
                <div className="reveal">
                    {/* School Uniform Section */}
                    <div style={{marginBottom: "3rem"}}>
                        <h2 className="section-title text-center mb-8">School Uniform</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Boys: NUR / 3rd */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-4 h-4 rounded-full border-2 border-blue-400"></div>
                                    <h3 className="text-xl font-bold text-gray-800 m-0">Boys: NUR / 3rd</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-red-800 font-bold text-sm uppercase mb-1">SUMMERS :</h4>
                                        <p className="text-gray-600 text-sm">Blue and red track suit (with school labelling), White socks, Black shoes</p>
                                    </div>
                                    <div>
                                        <h4 className="text-red-800 font-bold text-sm uppercase mb-1">WINTERS :</h4>
                                        <p className="text-gray-600 text-sm">Red and blue woollen tracksuit, -White socks, Black shoes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Girls: NUR / 3rd */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-gray-300 rounded-sm"></div>
                                    <h3 className="text-xl font-bold text-gray-800 m-0">Girls: NUR / 3rd</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-red-800 font-bold text-sm uppercase mb-1">SUMMERS :</h4>
                                        <p className="text-gray-600 text-sm">Blue and red track suit (with school labelling), White socks, Black shoes</p>
                                    </div>
                                    <div>
                                        <h4 className="text-red-800 font-bold text-sm uppercase mb-1">WINTERS :</h4>
                                        <p className="text-gray-600 text-sm">Red and blue woollen tracksuit, -White socks, Black shoes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Boys: 4th - 9th */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-4 h-4 rounded-full border-2 border-blue-400"></div>
                                    <h3 className="text-xl font-bold text-gray-800 m-0">Boys: 4th - 9th</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-red-800 font-bold text-sm uppercase mb-1">SUMMERS :</h4>
                                        <p className="text-gray-600 text-sm">Blue and red track suit (with school labelling), White socks, Black shoes, Black shoes</p>
                                    </div>
                                    <div>
                                        <h4 className="text-red-800 font-bold text-sm uppercase mb-1">WINTERS :</h4>
                                        <p className="text-gray-600 text-sm">Blue and red woollen track suit (with school labelling), White socks, Black shoes</p>
                                    </div>
                                </div>
                            </div>

                            {/* Girls: 4th - 9th */}
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-gray-300 rounded-sm"></div>
                                    <h3 className="text-xl font-bold text-gray-800 m-0">Girls: 4th - 9th</h3>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-red-800 font-bold text-sm uppercase mb-1">SUMMERS :</h4>
                                        <p className="text-gray-600 text-sm">White kurta, Navy blue pants, blue sleeveless jacket, blue hijab (with white piping), White socks, Black shoes.</p>
                                    </div>
                                    <div>
                                        <h4 className="text-red-800 font-bold text-sm uppercase mb-1">WINTERS :</h4>
                                        <p className="text-gray-600 text-sm">White kurta, Navy blue pants, blue sleeveless jacket, blue hijab (with white piping), Red half sweater, blue blazer with school monogram White socks, Black shoes.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
