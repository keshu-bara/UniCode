import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const buttonClicked = searchParams.get("button") || "unknown"; // Read from URL

  let v = buttonClicked === "login";
  const [isAuth, setIsAuth] = useState(v);

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle Auth/registration logic here
    if (!isAuth && formData.confirmPassword !== formData.password) {
      alert("Password confirmation does not match");
      return;
    }

    const { confirmPassword, ...dataToSend } = formData; // Exclude confirmPassword

    try {
      const response = await fetch(
        isAuth
          ? "http://192.168.1.114:8000/api/login/"
          : "http://192.168.1.114:8000/api/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        const responseData = await response.json();

        if (isAuth) {
          // Store tokens in localStorage
          localStorage.setItem("accessToken", responseData.data.access);
          localStorage.setItem("refreshToken", responseData.data.refresh);
          localStorage.setItem("username", formData.username);

          // Redirect to dashboard
          navigate("/dashboard");
        } else {
          alert("Registration successful! Please login.");
          setIsAuth(true); // Toggle to login box
          setFormData({
            full_name: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }
      } else {
        const errorData = await response.json();
        if (errorData.data) {
          const errorMessages = Object.entries(errorData.data)
            .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
            .join("\n"); // Format errors into a single string
          alert(
            `${isAuth ? "Login" : "Registration"} failed:\n${errorMessages}`
          );
        } else {
          alert(
            `${isAuth ? "Login" : "Registration"} failed: ${errorData.message}`
          );
        }
      }
    } catch (error) {
      console.error(
        `Error during ${isAuth ? "login" : "registration"}:`,
        error
      );
      alert("An error occurred. Please try again.");
    }
  };

  const toggleForm = () => {
    setIsAuth(!isAuth);
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Animated background elements */}

      <div className="w-full max-w-md p-8 space-y-6 bg-gray-900/50 backdrop-blur-sm rounded-lg shadow-xl border border-gray-700 z-10">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <h1 className="text-3xl font-bold text-white">Uni</h1>
            <h1 className="text-3xl font-bold text-blue-500">Code</h1>
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isAuth ? "Login" : "Register"}
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            {isAuth
              ? "Connect with your developer community"
              : "Join the developer dating community"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isAuth && (
            <>
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Full Name
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  required={!isAuth}
                  className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                  value={formData.full_name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required={!isAuth}
                  className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          {isAuth && (
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-300"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required={isAuth}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          {!isAuth && (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isAuth ? "current-password" : "new-password"}
              required
              className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-100"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          {!isAuth && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required={!isAuth}
                className="w-full px-3 py-2 mt-1 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          )}

          {isAuth && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-700"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </a>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              {isAuth ? "Sign in" : "Create Account"}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-300">
          {isAuth ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={toggleForm}
            className="font-medium text-blue-400 hover:text-blue-300 transition duration-300"
          >
            {isAuth ? "Register" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
