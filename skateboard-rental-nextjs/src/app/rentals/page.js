import Link from 'next/link';

async function getRentals() {
  const res = await fetch('http://localhost:3000/api/rentals', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch rentals');
  }
  
  return res.json();
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function RentalsPage() {
  const rentals = await getRentals();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">My Rentals</h1>
          <p className="text-gray-600 mt-1">Track and manage your skateboard rentals</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {rentals.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No Rentals Yet
            </h2>
            <p className="text-gray-600 mb-6">
              You haven't rented any skateboards yet. Browse our collection to get started!
            </p>
            <Link 
              href="/" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Skateboards
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {rentals.map((rental) => (
              <div key={rental.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Skateboard Info */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg w-20 h-20 flex items-center justify-center flex-shrink-0">
                        <span className="text-3xl">🛹</span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                          {rental.skateboard_name}
                        </h3>
                        <p className="text-gray-600 capitalize mb-2">
                          {rental.skateboard_type} · {rental.skateboard_price && `$${rental.skateboard_price}/day`}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">From:</span>{' '}
                            <span className="font-medium">{formatDate(rental.startDate)}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">To:</span>{' '}
                            <span className="font-medium">{formatDate(rental.endDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Rental Details */}
                  <div className="flex flex-col md:items-end gap-2">
                    <div className="text-3xl font-bold text-blue-600">
                      ${rental.totalPrice}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      rental.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rental.status.toUpperCase()}
                    </span>
                    <p className="text-xs text-gray-500">
                      Booked {formatDate(rental.createdAt)}
                    </p>
                  </div>
                </div>

                {/* User Info (for demo) */}
                {rental.user_name && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Rented by: <span className="font-medium">{rental.user_name}</span> ({rental.user_email})
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Summary */}
        {rentals.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Summary</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">{rentals.length}</div>
                <div className="text-sm text-gray-600 mt-1">Total Rentals</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {rentals.filter(r => r.status === 'active').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Active Rentals</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  ${rentals.reduce((sum, r) => sum + r.totalPrice, 0)}
                </div>
                <div className="text-sm text-gray-600 mt-1">Total Spent</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
