import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!input.name.trim()) newErrors.name = "Name is required";
    if (!input.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input.email))
      newErrors.email = "Invalid email address";
    if (!input.password.trim()) newErrors.password = "Password is required";
    if (!input.confirmPassword.trim())
      newErrors.confirmPassword = "Confirm Password is required";
    if (input.password !== input.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
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
    const userExists = users.some((user) => user.email === input.email);

    if (userExists) {
      setErrors({ email: "Email already registered" });
      setSubmitted(false);
      return;
    }

    const newUser = {
      name: input.name,
      email: input.email,
      password: input.password,
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    login({ name: newUser.name, email: newUser.email });

    setInput({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setSubmitted(true);

    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <section className="blog-block py-10 md:py-20">
      <div className="container max-w-200">
        <h1 className="text-center mb-15">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="text-base mb-6">
            <label htmlFor="name" className="block font-medium">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter Your Name"
              value={input.name}
              onChange={handleChange}
              className={`block w-full py-2 px-4 rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border focus:border-indigo-600`}
            />
            {errors.name && (
              <span className="mt-2 text-red-600 text-sm block">
                {errors.name}
              </span>
            )}
          </div>

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

          <div className="text-base mb-6">
            <label htmlFor="confirmPassword" className="block font-medium">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Enter Confirm Password"
              value={input.confirmPassword}
              onChange={handleChange}
              className={`block w-full py-2 px-4 rounded-md border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border focus:border-indigo-600`}
            />
            {errors.confirmPassword && (
              <span className="mt-2 text-red-600 text-sm block">
                {errors.confirmPassword}
              </span>
            )}
          </div>

          <button type="submit" className="btn mb-4 ">
            Sign Up
          </button>
          <p className="text-sm">
            Already have an account?
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>

          {submitted && (
            <span className="mt-4 text-green-600 block text-sm">
              Registration successful! Redirecting...
            </span>
          )}
        </form>
      </div>
    </section>
  );
};

export default Signup;
