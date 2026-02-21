import Link from "next/link";
import fs from "fs";
import path from "path";

// Function to get prospectus files
async function getProspectusFiles() {
  const isProd = process.env.NODE_ENV === "production";
  // In production (Next.js standalone), public is usually at /app/frontend/public or relative to server.js
  const docsDir = path.join(process.cwd(), isProd ? "public/assets/files/School Docs" : "public/assets/files/School Docs");
  
  // Try to find the directory, if not found try another common standalone path
  let finalDocsDir = docsDir;
  if (!fs.existsSync(finalDocsDir)) {
    // Standalone mode might have a different relative path
    const fallbackDir = path.join(process.cwd(), "../public/assets/files/School Docs");
    if (fs.existsSync(fallbackDir)) {
      finalDocsDir = fallbackDir;
    } else {
      console.warn("Documents directory not found at:", docsDir, "or", fallbackDir);
      return [];
    }
  }

  // Read files in the directory
  const files = fs.readdirSync(finalDocsDir);
  
  return files
    .filter(file => file.toLowerCase().endsWith(".pdf")) // Filter PDF files
    .map(file => {
        const stats = fs.statSync(path.join(finalDocsDir, file));
        return {
            name: file,
            displayName: file.replace(".pdf", "").replace(/_/g, " "), // Clean up filename for display
            size: (stats.size / 1024 / 1024).toFixed(2) + " MB", // Convert size to MB
            path: `/assets/files/School Docs/${file}`
        };
    });
}

export default async function Documents() {
  const documents = await getProspectusFiles();

  return (
    <main>
        {/* Page Banner */}
        <section className="page-banner" style={{backgroundImage: "url('/assets/images/document.jpg')", backgroundColor: "#003366"}}>
            <div className="container">
                <h1 className="page-title">Documents</h1>
                <ul className="breadcrumb">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/mandatory-disclosure">Mandatory Disclosure</Link></li>
                    <li>Documents</li>
                </ul>
            </div>
        </section>

        {/* Documents List */}
        <section className="section">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                        <div className="p-8 pb-4 border-b border-gray-100">
                            <h2 className="text-2xl font-bold text-primary mb-2">School Documents</h2>
                            <p className="text-gray-600">Download and view important school documents and certificates.</p>
                        </div>
                        
                        <div className="divide-y divide-gray-100">
                            {documents.length === 0 ? (
                                <div className="p-8 text-center text-gray-500">
                                    No documents available at the moment.
                                </div>
                            ) : (
                                documents.map((doc, index) => (
                                    <div key={index} className="p-6 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-red-50 text-red-600 p-3 rounded-lg">
                                                <i className="fas fa-file-pdf text-xl"></i>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-gray-800 mb-1">{doc.displayName}</h3>
                                                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">PDF • {doc.size}</span>
                                            </div>
                                        </div>
                                        <a 
                                            href={doc.path} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="btn btn-navy btn-sm shrink-0 flex items-center gap-2 justify-center"
                                        >
                                            <i className="fas fa-eye"></i> View Document
                                        </a>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
  );
}
