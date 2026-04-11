import { FileText, Download, Share2 } from 'lucide-react';

export default function CertificatePage() {
  const certificates = [
    {
      id: 1,
      course: 'React.js Basics',
      completionDate: '2024-04-05',
      score: 92,
      instructor: 'Sarah Johnson',
    },
    {
      id: 2,
      course: 'Full-Stack Web Development',
      completionDate: '2024-03-28',
      score: 88,
      instructor: 'Emma Wilson',
    },
    {
      id: 3,
      course: 'Data Science Fundamentals',
      completionDate: '2024-02-15',
      score: 95,
      instructor: 'Dr. Lisa Anderson',
    },
  ];

  const generatePDF = (cert) => {
    // Simulated PDF generation
    alert(`Downloading certificate for "${cert.course}"...\nQR Code included for verification.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12">My Certificates</h1>

        {certificates.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
            <FileText size={64} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No certificates yet. Complete a module with 80%+ score to earn a certificate!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map(cert => (
              <div key={cert.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* Certificate preview */}
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 p-8 text-white aspect-video flex flex-col justify-center items-center relative">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">✓</div>
                    <p className="text-sm opacity-90">Certificate of Completion</p>
                    <p className="text-lg font-bold mt-4">{cert.course}</p>
                  </div>
                  {/* QR Code placeholder */}
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded">
                    <div className="w-12 h-12 bg-gray-300 rounded text-center text-xs" style={{lineHeight: '48px'}}>QR</div>
                  </div>
                </div>

                {/* Certificate details */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Instructor</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{cert.instructor}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Score</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{cert.score}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{new Date(cert.completionDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => generatePDF(cert)}
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
                    >
                      <Download size={18} />
                      Download
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 font-bold py-2 rounded-lg transition">
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
