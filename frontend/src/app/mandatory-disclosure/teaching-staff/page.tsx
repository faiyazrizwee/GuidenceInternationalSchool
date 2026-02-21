import Link from "next/link";
import { API_URL } from "@/config";

async function getStaff() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const res = await fetch(`${API_URL}/staff`, { 
      cache: "no-store",
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error("Error fetching staff:", error);
    return [];
  }
}

export default async function TeachingStaffDisclosure() {
  const staffList = await getStaff();
  
  // Counts based on role
  const pgtCount = staffList.filter((s: any) => s.role === "PGT").length || 5;
  const tgtCount = staffList.filter((s: any) => s.role === "TGT").length || 15;
  const prtCount = staffList.filter((s: any) => s.role === "PRT").length || 8;
  const nttCount = staffList.filter((s: any) => s.role === "NTT").length || 5;
  const totalTeachers = pgtCount + tgtCount + prtCount + nttCount;

  const principal = staffList.find((s: any) => s.role === "Principal") || { name: "Maria Masood", qualification: "MA, Ph.D, B.Ed" };
  const specialEducator = staffList.find((s: any) => s.role === "Special Educator") || { name: "Jalees ahmad", qualification: "MA, B.Ed" };
  const counsellor = staffList.find((s: any) => s.role.includes("Counsellor")) || { name: "Zakir Ali", qualification: "MA, D.P.Ed" };

  const tableData = [
    { sn: 1, info: "PRINCIPAL", strength: "1", details: `${principal.name} (${principal.qualification})`, link: null },
    { sn: 2, info: "VICE PRINCIPAL", strength: "0", details: "NIL", link: null },
    { sn: 3, info: "HEADMISTRESS/HEADMASTER", strength: "0", details: "NIL", link: null },
    { sn: 4, info: "TOTAL NO. OF TEACHERS", strength: totalTeachers.toString(), details: "View All staff", link: "/staff" },
    { sn: "", info: "PGT", strength: pgtCount.toString(), details: "View PGT staffs", link: "/staff#PGT", isSub: true },
    { sn: "", info: "TGT", strength: tgtCount.toString(), details: "View TGT staffs", link: "/staff#TGT", isSub: true },
    { sn: "", info: "PRT", strength: prtCount.toString(), details: "View PRT staffs", link: "/staff#PRT", isSub: true },
    { sn: "", info: "NTT", strength: nttCount.toString(), details: "View NTT staffs", link: "/staff#NTT", isSub: true },
    { sn: 5, info: "TEACHERS SECTION RATIO", strength: "1 : 1.5", details: "", link: null },
    { sn: 6, info: "DETAILS OF SPECIAL EDUCATOR", strength: "1", details: `${specialEducator.name} (${specialEducator.qualification})`, link: null },
    { sn: 7, info: "DETAILS OF COUNSELLOR & WELLNESS TEACHER", strength: "1", details: `${counsellor.name} (${counsellor.qualification})`, link: null },
  ];

  return (
    <main>
      <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Annual day/432633574_927262959404894_3277676167273804378_n.jpg')", backgroundColor: "#003366"}}>
        <div className="container">
          <h1 className="page-title">Mandatory Disclosure</h1>
          <ul className="breadcrumb">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/mandatory-disclosure">Mandatory Disclosure</Link></li>
            <li>Staff (Teaching)</li>
          </ul>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container" style={{maxWidth: "1000px"}}>
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="mb-8 border-b pb-4">
              <h2 className="text-2xl font-bold text-primary mb-2">D: STAFF (TEACHING):</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-blue-200">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border border-blue-200 p-3 text-left w-16">S. No.</th>
                    <th className="border border-blue-200 p-3 text-left">INFORMATION</th>
                    <th className="border border-blue-200 p-3 text-center w-32">NUMBER/STRENGTH</th>
                    <th className="border border-blue-200 p-3 text-left">NAME AND QUALIFICATIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, index) => (
                    <tr key={index} className={typeof row.sn === 'number' ? 'font-semibold' : 'italic'}>
                      <td className="border border-blue-200 p-3 text-center">{row.sn}</td>
                      <td className={`border border-blue-200 p-3 ${row.isSub ? 'pl-8' : ''}`}>{row.info}</td>
                      <td className="border border-blue-200 p-3 text-center">{row.strength}</td>
                      <td className="border border-blue-200 p-3">
                        {row.link ? (
                          <Link 
                            href={row.link}
                            className="text-primary hover:underline font-bold"
                          >
                            {row.details}
                          </Link>
                        ) : row.details === "UPLOAD LIST/DETAILS" ? (
                          <a 
                            href="/assets/files/School Docs/staff.pdf" 
                            target="_blank" 
                            className="text-primary hover:underline font-bold"
                            download
                          >
                            {row.details}
                          </a>
                        ) : (
                          row.details
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <i className="fas fa-info-circle mr-2 text-primary"></i>
                Click on the links in the table to download the detailed staff list PDF.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
