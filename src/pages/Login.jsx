import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [input, setInput] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!input.email.trim()) newErrors.email = "Email is required";
    if (!input.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === input.email && u.password === input.password
    );

    if (user) {
      login(user);
      setSubmitted(true);
      setErrors({});
      setLoginError("");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setLoginError("Invalid email or password");
      setSubmitted(false);
    }
  };

  return (
    <section className="contact-block py-10 md:py-20">
      <div className="container max-w-200">
        <h1 className="text-center mb-15">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="text-base mb-6">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Your Email"
              value={input.email}
              onChange={handleChange}
              className={`block w-full py-2 px-4 rounded-md border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border focus:border-indigo-600`}
            />
            {errors.email && (
              <span className="mt-2 text-red-600 text-sm block">
                {errors.email}
              </span>
            )}
          </div>

          <div className="text-base mb-6">
            <label htmlFor="password" className="block font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Your Password"
              value={input.password}
              onChange={handleChange}
              className={`block w-full py-2 px-4 rounded-md border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border focus:border-indigo-600`}
            />
            {errors.password && (
              <span className="mt-2 text-red-600 text-sm block">
                {errors.password}
              </span>
            )}
          </div>

          <button type="submit" className="btn mb-4">
            Login
          </button>
          <p className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-indigo-600 hover:underline">
              Sign Up
            </Link>
          </p>

          {loginError && (
            <span className="mt-4 text-red-600 block">{loginError}</span>
          )}
          {submitted && (
            <span className="mt-4 text-green-600 block text-sm">
              Login successful! Redirecting...
            </span>
          )}
        </form>
      </div>
    </section>
  );
};

export default Login;
