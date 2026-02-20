
import Link from "next/link";

export default function NationalAnthem() {
  return (
    <main>
      <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Indpendence day/20240815_091329.jpg')", backgroundColor: "#003366"}}>
          <div className="container">
              <h1 className="page-title">National Anthem</h1>
              <ul className="breadcrumb">
                  <li><Link href="/">Home</Link></li>
                  <li>National Anthem</li>
              </ul>
          </div>
      </section>

      <section className="section">
          <div className="container text-center">
              <div className="reveal">
                  <h2 className="section-title mb-8">Jana Gana Mana</h2>
                  <div className="text-[1.2rem] leading-[2] max-w-[800px] mx-auto italic text-gray-700">
                      <p>Jana-gana-mana-adhinayaka, jaya he</p>
                      <p>Bharata-bhagya-vidhata.</p>
                      <p>Punjab-Sindh-Gujarat-Maratha</p>
                      <p>Dravida-Utkala-Banga</p>
                      <p>Vindhya-Himachala-Yamuna-Ganga</p>
                      <p>Uchchala-Jaladhi-taranga.</p>
                      <p>Tava shubha name jage,</p>
                      <p>Tava shubha asisa mage,</p>
                      <p>Gahe tava jaya gatha,</p>
                      <p>Jana-gana-mangala-dayaka jaya he</p>
                      <p>Bharata-bhagya-vidhata.</p>
                      <p>Jaya he, jaya he, jaya he,</p>
                      <p>Jaya jaya jaya, jaya he!</p>
                  </div>
              </div>
          </div>
      </section>
    </main>
  );
}
