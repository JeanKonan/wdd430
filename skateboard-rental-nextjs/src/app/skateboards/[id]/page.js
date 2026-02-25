import Link from 'next/link';
import RentalForm from './RentalForm';

async function getSkateboard(id) {
  const res = await fetch(`http://localhost:3000/api/skateboards/${id}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

export default async function SkateboardDetail({ params }) {
  const { id } = await params;
  const skateboard = await getSkateboard(id);

  if (!skateboard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Skateboard Not Found</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-3">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            ← Back to all skateboards
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Skateboard Info */}
          <div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg h-96 flex items-center justify-center mb-6">
              <span className="text-9xl">🛹</span>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {skateboard.name}
              </h1>
              
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600 font-medium">Type:</span>
                  <span className="font-semibold capitalize">{skateboard.type}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600 font-medium">Size:</span>
                  <span className="font-semibold">{skateboard.size}</span>
                </div>
                
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600 font-medium">Price:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${skateboard.pricePerDay}
                    <span className="text-sm text-gray-500">/day</span>
                  </span>
                </div>
                
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 font-medium">Status:</span>
                  {skateboard.isAvailable ? (
                    <span className="px-4 py-1 bg-green-100 text-green-800 font-semibold rounded-full">
                      Available
                    </span>
                  ) : (
                    <span className="px-4 py-1 bg-red-100 text-red-800 font-semibold rounded-full">
                      Currently Rented
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Rental Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Book This Skateboard
              </h2>
              
              {skateboard.isAvailable ? (
                <RentalForm skateboard={skateboard} />
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800">
                    This skateboard is currently rented out. Please check back later or browse other available options.
                  </p>
                  <Link 
                    href="/" 
                    className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Available Skateboards
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
