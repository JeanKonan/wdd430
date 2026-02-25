import Link from 'next/link';

async function getSkateboards() {
  const res = await fetch('http://localhost:3000/api/skateboards', {
    cache: 'no-store' // Always get fresh data
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch skateboards');
  }
  
  return res.json();
}

export default async function Home() {
  const skateboards = await getSkateboards();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Ride</h1>
          <p className="text-xl text-blue-100">Premium skateboards available for rent</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Skateboards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skateboards.map((skateboard) => (
            <Link 
              key={skateboard.id} 
              href={`/skateboards/${skateboard.id}`}
              className="block"
            >
              <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden h-full">
                {/* Placeholder Image */}
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 h-48 flex items-center justify-center">
                  <span className="text-6xl">🛹</span>
                </div>
                
                {/* Card Content */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {skateboard.name}
                  </h2>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">{skateboard.type}</span>
                    </div>
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{skateboard.size}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-2xl font-bold text-blue-600">
                        ${skateboard.pricePerDay}
                        <span className="text-sm text-gray-500">/day</span>
                      </span>
                      
                      {skateboard.isAvailable ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                          Available
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
                          Rented
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {skateboards.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No skateboards available at the moment.</p>
          </div>
        )}
      </main>
    </div>
  );
}

