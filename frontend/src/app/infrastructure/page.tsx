
import Link from "next/link";



export default function Infrastructure() {
  return (
    <main>
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Indpendence day/20240815_094025.jpg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">Infrastructure</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li>Infrastructure</li>
                </ul>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="reveal">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 max-w-4xl mx-auto">
                        <div className="p-8 pb-4 text-center">
                            <h2 className="section-title text-primary mb-2 uppercase">E. SCHOOL INFRASTRUCTURE</h2>
                            <p className="text-gray-600 mb-6">State-of-the-art infrastructure to support holistic learning.</p>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-primary text-white text-center">
                                        <th className="p-3 border border-gray-300 uppercase text-sm font-bold w-24">SR.NO.</th>
                                        <th className="p-3 border border-gray-300 uppercase text-sm font-bold">INFORMATION</th>
                                        <th className="p-3 border border-gray-300 uppercase text-sm font-bold w-1/3">DETAILS</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    <tr className="hover:bg-blue-50 transition duration-150">
                                        <td className="p-3 border border-gray-300 text-center font-medium">1</td>
                                        <td className="p-3 border border-gray-300 font-medium">TOTAL CAMPUS AREA OF THE SCHOOL (IN SQ. MTR)</td>
                                        <td className="p-3 border border-gray-300 text-center font-bold text-primary">8898</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50 transition duration-150">
                                        <td className="p-3 border border-gray-300 text-center font-medium">2</td>
                                        <td className="p-3 border border-gray-300 font-medium">NO. AND SIZE OF THE CLASS ROOMS (IN SQ. MTR)</td>
                                        <td className="p-3 border border-gray-300 text-center font-bold text-primary">30 and 48</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50 transition duration-150">
                                        <td className="p-3 border border-gray-300 text-center font-medium">3</td>
                                        <td className="p-3 border border-gray-300 font-medium">NO. AND SIZE OF LABORATORIES INCLUDING COMPUTER LABS (IN SQ.MTR)</td>
                                        <td className="p-3 border border-gray-300 text-center font-bold text-primary">06 and 58</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50 transition duration-150">
                                        <td className="p-3 border border-gray-300 text-center font-medium">4</td>
                                        <td className="p-3 border border-gray-300 font-medium">INTERNET FACILITY ( Y / N)</td>
                                        <td className="p-3 border border-gray-300 text-center font-bold text-primary">YES</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50 transition duration-150">
                                        <td className="p-3 border border-gray-300 text-center font-medium">5</td>
                                        <td className="p-3 border border-gray-300 font-medium">NO. OF GIRLS TOILETS</td>
                                        <td className="p-3 border border-gray-300 text-center font-bold text-primary">10</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50 transition duration-150">
                                        <td className="p-3 border border-gray-300 text-center font-medium">6</td>
                                        <td className="p-3 border border-gray-300 font-medium">NO. OF BOYS TOILETS</td>
                                        <td className="p-3 border border-gray-300 text-center font-bold text-primary">10</td>
                                    </tr>
                                    <tr className="hover:bg-blue-50 transition duration-150">
                                        <td className="p-3 border border-gray-300 text-center font-medium">7</td>
                                        <td className="p-3 border border-gray-300 font-medium uppercase">LINK OF YOUTUBE VIDEO OF THE INSPECTION OF SCHOOL COVERING THE INFRASTRUCTURE OF THE SCHOOL</td>
                                        <td className="p-3 border border-gray-300 text-center font-bold text-primary">
                                            <a href="https://youtu.be/7EFU3zV5TnY" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                                https://youtu.be/7EFU3zV5TnY
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
