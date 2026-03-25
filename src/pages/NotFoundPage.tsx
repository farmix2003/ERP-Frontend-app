import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-sm">
      <h2 className="text-3xl font-bold text-gray-900">404</h2>
      <p className="mt-2 text-gray-600">The page you are looking for was not found.</p>
      <Link
        to="/dashboard"
        className="mt-4 rounded-xl bg-gray-900 px-4 py-2 text-white"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;