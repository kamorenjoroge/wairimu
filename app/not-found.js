import Link from 'next/link';


export default function NotFound() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 p-6 text-center">
        
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border-t-4 border-t-green-500">
          <h1 className="text-4xl font-bold mb-2 text-green-600">Oops!</h1>
          <h2 className="text-2xl font-semibold mb-4 text-black">Page Not Found</h2>
          
          {/* Simple 404 illustration */}
          <div className="my-8 text-center">
            <span className="text-8xl font-bold text-amber-500">4</span>
            <span className="text-8xl font-bold text-green-500">0</span>
            <span className="text-8xl font-bold text-amber-500">4</span>
          </div>
          
          <p className="text-gray-600 mb-6">
            We could not find the resource you were looking for. It might have been moved or deleted.
          <Link 
            href="/"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
              Return Home
        
          </Link>
          
            </p>
        </div>
      </div>
    );
  }