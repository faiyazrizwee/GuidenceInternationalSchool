
import Link from "next/link";

export default function SchoolPledge() {
  return (
    <main>
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Indpendence day/20240815_091838.jpg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">School Pledge</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li>School Pledge</li>
                </ul>
            </div>
        </section>

        <section className="section">
            <div className="container">
                <div className="reveal max-w-[800px] mx-auto text-center">
                    <div className="p-12 bg-[#f9f9f9] rounded-[15px] border border-[#dddddd]">
                        <h3 className="text-[#003366] mb-6 text-2xl font-bold">Pledge for an Indian Citizen</h3>
                        <p className="text-[1.1rem] leading-[1.8] text-gray-700">
                            &quot;India is my country and all Indians are my brothers and sisters. I love my country and I am proud of its rich and varied heritage. I shall always strive to be worthy of it. I shall give respect to my parents, teachers and all the elders and treat everyone with courtesy. To my country and my people, I pledge my devotion. In their well-being and prosperity alone lies my happiness.&quot;
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
