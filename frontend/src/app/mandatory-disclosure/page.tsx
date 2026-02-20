import Link from "next/link";

export default function MandatoryDisclosure() {
  const sections = [
    {
      title: "General Information",
      description: "About The School, Leadership & Contact Details",
      icon: "fas fa-school",
      link: "/mandatory-disclosure/general-information"
    },
    {
      title: "Documents",
      description: "Documents, Information & Certifications",
      icon: "fas fa-file-contract",
      link: "/mandatory-disclosure/documents"
    },
    {
      title: "Academics",
      description: "Academics, Syllabus & Structure",
      icon: "fas fa-graduation-cap",
      link: "/year-plan"
    },
    {
      title: "Staff",
      description: "Teaching Staff, Special Educators & Counsellors",
      icon: "fas fa-chalkboard-teacher",
      link: "/mandatory-disclosure/teaching-staff"
    },
    {
      title: "Infrastructure",
      description: "Campus Area, Class Rooms & Facilities",
      icon: "far fa-building",
      link: "/infrastructure"
    }
  ];

  return (
    <main>
        {/* Page Banner */}
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Annual day/432633574_927262959404894_3277676167273804378_n.jpg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">Mandatory Disclosure</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li>Mandatory Disclosure</li>
                </ul>
            </div>
        </section>

        {/* Content */}
        <section className="section">
            <div className="container" style={{maxWidth: "1200px"}}>
                <div className="reveal">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="section-title text-primary">Mandatory Public Disclosure</h2>
                        <p className="text-gray-600">Appendix - IX</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sections.map((section, index) => (
                            <Link href={section.link} key={index} className="group">
                                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                                    <div className="w-16 h-16 bg-red-50 text-primary rounded-lg flex items-center justify-center text-3xl mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <i className={section.icon}></i>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors">{section.title}</h3>
                                    <p className="text-gray-600 mb-6">{section.description}</p>
                                    <span className="text-red-600 font-semibold group-hover:text-primary flex items-center gap-2">
                                        Read Now <i className="fas fa-arrow-right text-sm"></i>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Image Section */}
                    <div className="mt-16 mb-16 rounded-xl overflow-hidden shadow-lg">
                        <img 
                            src="/assets/gallery/Beyond classroom/WhatsApp Image 2024-12-10 at 8.25.29 PM.jpeg" 
                            alt="School Activities" 
                            className="w-full h-[400px] object-cover"
                        />
                    </div>

                    {/* 8-Box Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Name Of The School", value: "Guidance International School" },
                            { label: "Affiliation No.(If Applicable)", value: "2134117" },
                            { label: "Complete Address With Pin Code", value: "Village Wajidpur Post Koyla, Near Toll Plaza, Tehsil Sadar Distt Rampur, Rampur, Uttar Pradesh - 244901" },
                            { label: "School Code (If Applicable)", value: "80163" },
                            { label: "Principal's Name", value: "Dr Jakkarapu Renuka" },
                            { label: "Principal's Qualification", value: "MA, BED" },
                            { label: "School's Email Id", value: "gisrampur@gmail.com" },
                            { label: "School's Phone No", value: "8865091309" }
                        ].map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-start gap-4">
                                    <span className="text-3xl font-bold text-red-500 opacity-80">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </span>
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800 uppercase mb-1">{item.label}</h4>
                                        <p className="text-red-600 font-medium text-sm break-words">{item.value}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
