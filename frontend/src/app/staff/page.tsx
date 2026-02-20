
import Link from "next/link";
import { API_URL } from "@/config";

async function getStaff() {
  try {
    const res = await fetch(`${API_URL}/staff/`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function Staff() {
  const staffList = await getStaff();

  const categories = [
    { name: "Principal", roles: ["Principal"] },
    { name: "PGT", roles: ["PGT"] },
    { name: "TGT", roles: ["TGT"] },
    { name: "PRT", roles: ["PRT"] },
    { name: "NTT", roles: ["NTT"] },
    { name: "Special Educators & Counselors", roles: ["Special Educator", "Counsellor(Wellness Teacher)"] },
    { name: "Support Staff", roles: ["PTI", "Librarian", "Lab Assistant"] },
  ];

  return (
    <main>
      <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Staff training/WhatsApp Image 2024-12-12 at 9.43.36 AM.jpeg')", backgroundColor: "#003366"}}>
          <div className="container">
              <h1 className="page-title">Staff List</h1>
              <ul className="breadcrumb">
                  <li><Link href="/">Home</Link></li>
                  <li>Staff List</li>
              </ul>
          </div>
      </section>

      <section className="section bg-gray-50">
          <div className="container">
              {categories.map((category, catIndex) => {
                const filteredStaff = staffList.filter((staff: any) => 
                  category.roles.some(role => staff.role?.includes(role))
                );

                if (filteredStaff.length === 0) return null;

                return (
                  <div key={catIndex} id={category.name === "Special Educators & Counselors" ? "Special" : category.name} className="mb-16 last:mb-0">
                    <div className="flex items-center gap-4 mb-8">
                      <h2 className="text-3xl font-bold text-gray-800">{category.name}</h2>
                      <div className="h-1 flex-grow bg-red-100 rounded-full">
                        <div className="h-full bg-red-600 rounded-full" style={{width: "100px"}}></div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredStaff.map((staff: any, index: number) => (
                            <div key={index} className="staff-card-container">
                                <div className="staff-card-inner">
                                    {/* Front Side: Image + Name + Role */}
                                    <div className="staff-card-front">
                                        <div className="img-wrapper">
                                            {staff.image_url ? (
                                                <img 
                                                    src={staff.image_url} 
                                                    alt={staff.name} 
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <i className="fas fa-user-circle text-8xl"></i>
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="staff-name">{staff.name}</h3>
                                        <p className="staff-role">{staff.role || "Faculty Member"}</p>
                                    </div>

                                    {/* Back Side: Qualification */}
                                    <div className="staff-card-back">
                                        <div className="circle-bg" id="circle-bottom"></div>
                                        <div className="circle-bg" id="circle-right"></div>
                                        <div className="staff-card-back-content">
                                            <span className="qual-badge">Qualification</span>
                                            <p className="qual-text">{staff.qualification || "Information being updated"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                  </div>
                );
              })}
              
              {staffList.length === 0 && (
                  <div className="col-span-full text-center py-12">
                      <p className="text-gray-500 text-lg">Staff list is being updated.</p>
                  </div>
              )}
          </div>
      </section>
    </main>
  );
}
