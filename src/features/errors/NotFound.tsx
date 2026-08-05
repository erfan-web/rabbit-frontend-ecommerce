import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-6xl font-bold mb-2">404</p>
      <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
};

export default NotFound;
