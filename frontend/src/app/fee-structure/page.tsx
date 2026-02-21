
import Link from "next/link";
import { API_URL } from "@/config";

async function getFees() {
  try {
    const res = await fetch(`${API_URL}/fees`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function FeeStructure() {
  const fees = await getFees();

  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Republic day/WhatsApp Image 2024-12-10 at 8.14.59 PM (1).jpeg')", backgroundColor: "#003366"}}>
          <div className="container">
              <h1 className="page-title">Fee Structure</h1>
              <ul className="breadcrumb">
                  <li><Link href="/">Home</Link></li>
                  <li>Mandatory Disclosure</li>
                  <li>Fee Structure</li>
              </ul>
          </div>
      </section>

      {/* Content Section */}
      <section className="section bg-white">
          <div className="container" style={{maxWidth: "1000px"}}>
              <div className="reveal">
                  <div className="text-center mb-10">
                      <h2 className="section-title text-primary">Fee Structure (2025-26)</h2>
                      <p className="text-gray-600">Detailed breakdown of tuition and other fees for the academic year.</p>
                  </div>

                  <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-100">
                      <table className="w-full text-left border-collapse">
                          <thead>
                              <tr className="bg-primary text-white">
                                  <th className="p-4 border-b border-gray-200">Class</th>
                                  <th className="p-4 border-b border-gray-200">REG.</th>
                                  <th className="p-4 border-b border-gray-200">ADM.</th>
                                  <th className="p-4 border-b border-gray-200">ANN.</th>
                                  <th className="p-4 border-b border-gray-200">TUI.</th>
                                  <th className="p-4 border-b border-gray-200">ERP</th>
                                  <th className="p-4 border-b border-gray-200">TUI TOTAL(M)</th>
                                  <th className="p-4 border-b border-gray-200">EXAM (Y)</th>
                              </tr>
                          </thead>
                          <tbody className="bg-white">
                              {fees.length === 0 ? (
                                <tr>
                                  <td colSpan={5} className="p-8 text-center text-gray-500">
                                    Fee structure is currently being updated. Please contact administration.
                                  </td>
                                </tr>
                              ) : (
                                fees.map((fee: any) => (
                                  <tr key={fee.id} className="hover:bg-blue-50 transition border-b border-gray-100">
                                      <td className="p-4 font-semibold text-primary">{fee.class_group}</td>
                                      <td className="p-4">{fee.registration_fee}</td>
                                      <td className="p-4">{fee.admission_fee}</td>
                                      <td className="p-4">{fee.annual_charges}</td>
                                      <td className="p-4">{fee.tuition_fee}</td>
                                      <td className="p-4">{fee.erp_fee}</td>
                                      <td className="p-4 font-bold text-gray-700">{fee.tuition_total}</td>
                                      <td className="p-4">{fee.exam_fee}</td>
                                  </tr>
                                ))
                              )}
                          </tbody>
                      </table>
                  </div>
                  
                  <div className="mt-12">
                      <h3 className="text-xl font-bold text-center mb-6 text-gray-800">TRANSPORT</h3>
                      <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-100">
                          <table className="w-full text-center border-collapse">
                              <thead>
                                  <tr className="bg-white border-b border-gray-200">
                                      <th className="p-4 border-r border-gray-200">Class</th>
                                      <th className="p-4 border-r border-gray-200">CITY</th>
                                      <th className="p-4 border-r border-gray-200">AJEETPUR</th>
                                      <th className="p-4 border-r border-gray-200">DURU NAGLA</th>
                                      <th className="p-4 border-r border-gray-200">KEMRI</th>
                                      <th className="p-4 border-r border-gray-200">TANDA</th>
                                      <th className="p-4">BILASPUR</th>
                                  </tr>
                              </thead>
                              <tbody className="bg-white">
                                  <tr className="hover:bg-blue-50 transition">
                                      <td className="p-4 border-r border-gray-200 font-bold">All</td>
                                      <td className="p-4 border-r border-gray-200">1050</td>
                                      <td className="p-4 border-r border-gray-200">1100</td>
                                      <td className="p-4 border-r border-gray-200">1250</td>
                                      <td className="p-4 border-r border-gray-200">1250</td>
                                      <td className="p-4 border-r border-gray-200">1250</td>
                                      <td className="p-4">1250</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>

                  <div className="mt-8 text-center bg-blue-50 p-6 rounded-xl border-l-4 border-accent">
                      <p className="text-gray-700 text-sm">
                          <strong>Note:</strong> The above fee structure is subject to change as per school management decisions. <br/>
                          Transport and Examination fees are charged separately.
                      </p>
                  </div>
              </div>
          </div>
      </section>
    </main>
  );
}
