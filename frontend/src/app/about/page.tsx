
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <main>
      {/* Page Banner */}
      <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Indpendence day/20240815_095434.jpg')", backgroundColor: "#003366"}}>
          <div className="container">
              <h1 className="page-title">About Us</h1>
              <ul className="breadcrumb">
                  <li><Link href="/">Home</Link></li>
                  <li>About</li>
              </ul>
          </div>
      </section>

      {/* About Section */}
      <section className="section">
          <div className="container">
              <div className="container-flex">
                  <div className="reveal">
                      <h4 className="section-subtitle" style={{color: "#c92f2f"}}>Our Story</h4>
                      <h2 className="section-title">Guidance International School</h2>
                      <p>Guidance International School was founded in 2022, a visionary educator driven by a passion for delivering exceptional learning experiences. With unwavering commitment to academic excellence and character development, our institution has swiftly established itself as a beacon of quality education in Rampur.</p>
                      <p>Our curriculum is thoughtfully designed to ignite curiosity, critical thinking, and a lifelong love for learning. We pride ourselves on creating an environment where every student feels valued and empowered to achieve their full potential.</p>
                  </div>
                  <div className="reveal">
                      <Image src="/assets/gallery/new_pic/PXL_20251110_032005833.RAW-01.jpg" alt="About GIS" width={600} height={400} style={{borderRadius: "10px"}} />
                  </div>
              </div>
          </div>
      </section>

      {/* Mission, Vision & Goal */}
      <section className="section bg-light">
          <div className="container">
              <div className="grid grid-2 items-center">
                  <div className="reveal">
                      <div className="mb-8">
                          <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
                          <p className="text-gray-600">To provide a safe, nurturing, and stimulating environment where students can discover their potential, achieve academic success, and develop into compassionate human beings.</p>
                      </div>
                      <div className="mb-8">
                          <h2 className="text-3xl font-bold text-primary mb-4">Our Vision</h2>
                          <p className="text-gray-600">To offer a system of education that is oriented on the needs of the students and emphasizes their whole development. Empowering children to develop into disciplined leaders of the future with high self esteem.</p>
                      </div>
                      <div className="mb-8">
                          <h2 className="text-3xl font-bold text-primary mb-4">Our Goal</h2>
                          <p className="text-gray-600">To foster a community of lifelong learners who are equipped with the skills, knowledge, and values necessary to thrive in a global society and contribute positively to their communities.</p>
                      </div>
                  </div>
                  <div className="reveal flex justify-center">
                      <Image 
                        src="/assets/gallery/Summer camp/20240527_090136.jpg" 
                        alt="Student" 
                        width={400} 
                        height={500} 
                        className="object-contain"
                        style={{maxHeight: "600px"}}
                      />
                  </div>
              </div>
          </div>
      </section>

      {/* Student Acknowledgement Ceremonies */}
      <section className="section">
          <div className="container">
              <h2 className="section-title text-center text-primary mb-12">STUDENT ACKNOWLEDGEMENT CEREMONIES</h2>
              <div className="grid grid-3 gap-8">
                  {/* Academic Excellence */}
                  <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full">
                      <div className="relative h-48 w-full">
                          <Image 
                            src="/assets/gallery/Annual day/432000124_927263196071537_102122480611010984_n.jpg" 
                            alt="Academic Excellence" 
                            fill
                            className="object-cover"
                          />
                      </div>
                      <div className="p-6 flex flex-col flex-grow text-center">
                          <h3 className="text-xl font-bold text-primary mb-4 uppercase">Academic Excellence</h3>
                          <p className="text-gray-600 text-sm flex-grow">
                            To honour and acknowledge the students who perform par excellence in the field of academics, Academic Excellence Awards is, a grandiose affair, organised every year wherein our Chairperson awards the toppers for excelling in academics and other significant academic fields like 100% attendance.
                          </p>
                      </div>
                  </div>

                  {/* Citation Ceremony */}
                  <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full">
                      <div className="relative h-48 w-full">
                          <Image 
                            src="/assets/gallery/Annual day/432048664_927263309404859_4755735664839880409_n.jpg" 
                            alt="Citation Ceremony" 
                            fill
                            className="object-cover"
                          />
                      </div>
                      <div className="p-6 flex flex-col flex-grow text-center">
                          <h3 className="text-xl font-bold text-primary mb-4 uppercase">Citation Ceremony</h3>
                          <p className="text-gray-600 text-sm flex-grow">
                            As the young leaders of tomorrow get ready to turn a new page of their book of life, takes the opportunity to acknowledge the outgoing batch. Here, each student gets a citation that highlights his/her talents and achievements of the years spent at school.
                          </p>
                      </div>
                  </div>

                  {/* Investiture Ceremony */}
                  <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 flex flex-col h-full">
                      <div className="relative h-48 w-full">
                          <Image 
                            src="/assets/gallery/Indpendence day/20240815_093151.jpg" 
                            alt="Investiture Ceremony" 
                            fill
                            className="object-cover"
                          />
                      </div>
                      <div className="p-6 flex flex-col flex-grow text-center">
                          <h3 className="text-xl font-bold text-primary mb-4 uppercase">Investiture Ceremony</h3>
                          <p className="text-gray-600 text-sm flex-grow">
                            For, leaders of tomorrow need to become leaders of today first! At the Investiture Ceremony, the students are recognized for their promising leadership and extraordinary contribution to the school. They are bestowed with the responsibility to lead their school through the Student Council.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
    </main>
  );
}
