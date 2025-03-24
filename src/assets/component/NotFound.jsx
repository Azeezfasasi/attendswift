import { Link } from "react-router-dom";
import LoginSignUpHeader from "./LoginSignUpHeader";
import { Helmet } from "react-helmet";

const NotFound = () => {
  return (
    <>
    <Helmet>
        <title>404 - Page Not Found</title>
    </Helmet>
    <LoginSignUpHeader />
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mt-2">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/app/dashboard"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Back to Dashboard
      </Link>
    </div>
    </>
  );
};

export default NotFound;
