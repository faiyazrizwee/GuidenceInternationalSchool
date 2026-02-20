
import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";

// Function to get gallery data from filesystem
async function getGalleryData() {
  const galleryDir = path.join(process.cwd(), "public/assets/gallery");
  
  // Check if directory exists
  if (!fs.existsSync(galleryDir)) {
    return [];
  }

  const sections = [];
  
  // Read folders in gallery directory
  const items = fs.readdirSync(galleryDir, { withFileTypes: true });
  
  for (const item of items) {
    if (item.isDirectory()) {
      const folderName = item.name;
      const folderPath = path.join(galleryDir, folderName);
      
      // Read images in the folder
      const files = fs.readdirSync(folderPath);
      const images = files
        .filter(file => /\.(jpg|jpeg|png|webp|gif)$/i.test(file)) // Filter image files
        .map(file => ({
          src: `/assets/gallery/${folderName}/${file}`,
          alt: `${folderName} - ${file}`
        }));
      
      if (images.length > 0) {
        sections.push({
          title: folderName,
          images: images
        });
      }
    }
  }
  
  return sections;
}

export default async function Gallery() {
  const gallerySections = await getGalleryData();

  // Helper to create URL-friendly IDs
  const slugify = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

  return (
    <main>
        {/* Page Banner */}
        <section className="page-banner" style={{backgroundImage: "url('/assets/gallery/Annual day/431097261_927262706071586_1836745502869245858_n.jpg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">Gallery</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li>Gallery</li>
                </ul>
            </div>
        </section>

        {/* Gallery Navigation */}
        <div className="sticky top-[70px] z-30 bg-white border-b shadow-sm py-4 overflow-x-auto">
            <div className="container">
                <div className="flex flex-nowrap gap-4 md:gap-6 md:justify-center min-w-max px-4">
                    {gallerySections.map((section) => (
                        <a 
                            key={section.title} 
                            href={`#${slugify(section.title)}`}
                            className="bg-gray-100 hover:bg-primary hover:text-white text-gray-700 font-medium py-2 px-6 rounded-full transition-colors whitespace-nowrap text-sm md:text-base scroll-smooth-anchor"
                        >
                            {section.title}
                        </a>
                    ))}
                </div>
            </div>
        </div>

        {/* Gallery Sections */}
        <div className="py-12 space-y-16">
            {gallerySections.length === 0 ? (
                <section className="section">
                    <div className="container">
                        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                            <p className="text-gray-500 text-lg">Our gallery is currently being curated. Check back soon!</p>
                        </div>
                    </div>
                </section>
            ) : (
                gallerySections.map((section, index) => (
                    <section key={section.title} id={slugify(section.title)} className="section-sm scroll-mt-28">
                        <div className="container">
                            <div className="flex items-center gap-4 mb-8">
                                <h2 className="text-2xl md:text-3xl font-bold text-primary">{section.title}</h2>
                                <div className="h-1 flex-grow bg-gray-100 rounded-full"></div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {section.images.map((img, imgIndex) => (
                                    <div key={imgIndex} className="group relative rounded-[12px] overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 bg-white">
                                        <div className="aspect-[4/3] w-full relative">
                                            <Image 
                                                src={img.src} 
                                                alt={img.alt}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            {/* Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                                <p className="text-white text-sm font-medium">{section.title}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                ))
            )}
        </div>
    </main>
  );
}
