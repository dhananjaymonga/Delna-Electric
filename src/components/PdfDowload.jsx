import React from 'react';
import { useNavigate } from 'react-router-dom';
function PdfDownload({ setCurrentPage }) {
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  const pdfs = [
    { 
      id: 1, 
      name: "Product Catalog 2024", 
      url: "https://example.com/sample.pdf",
      size: "2.5 MB"
    },
    { 
      id: 2, 
      name: "Technical Specifications", 
      url: "https://example.com/sample2.pdf",
      size: "1.8 MB"
    },
    { 
      id: 3, 
      name: "Installation Guide", 
      url: "https://example.com/sample3.pdf",
      size: "3.2 MB"
    }
  ];

  const handleDownload = (pdf) => {
    // Create an anchor element
    const link = document.createElement('a');
    link.href = pdf.url;
    link.download = pdf.name + '.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Available Documents</h1>
      <div className="grid gap-4">
        {pdfs.map(pdf => (
          <div 
            key={pdf.id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium text-lg text-gray-900">{pdf.name}</h3>
                <p className="text-sm text-gray-500">Size: {pdf.size}</p>
              </div>
              <button
                onClick={() => handleDownload(pdf)}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                Download PDF
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/")} // ✅ Correct navigation
        className="mt-8 text-orange-500 hover:text-orange-600"
      >
        ← Back to Home
      </button>
    </div>
  );
}

export default PdfDownload;