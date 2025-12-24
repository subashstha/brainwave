import { useState } from "react";
import { blogs } from "../data/blogs";

const ContactSection = ({ contact }) => {
  const data = contact || blogs.defaults.contact;
  const { title } = data;

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  }

  function validate() {
    const newErrors = {};
    if (!input.name.trim()) newErrors.name = "Name is required";
    if (!input.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(input.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!input.phone.trim()) newErrors.phone = "Phone number is required";
    if (!input.message.trim()) newErrors.message = "Message is required";

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    setInput({
      name: "",
      email: "",
      phone: "",
      message: "",
    });

    setErrors({});
    setSubmitted(true);
  }

  return (
    <section className="contact-block py-10 md:py-20">
      <div className="container max-w-200">
        {title && <h1 className="text-center mb-15">{title}</h1>}
        <form action="#" onSubmit={handleSubmit}>
          <div className="text-base mb-6">
            <label htmlFor="name" className="block font-medium">
              Full Name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter Your Name"
                value={input.name}
                onChange={handleChange}
                className={`block w-full py-2 px-4 text-gray-900 placeholder-gray-400 rounded-md border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border focus:border-indigo-600`}
              />
            </div>
            {errors.name && (
              <span className="mt-2 text-red-600 text-sm block">
                {errors.name}
              </span>
            )}
          </div>

          <div className="text-base mb-6">
            <label htmlFor="phone" className="block font-medium">
              Phone Number
            </label>
            <div className="mt-2">
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter Your Phone Number"
                value={input.phone}
                onChange={handleChange}
                className={`block w-full py-2 px-4 text-gray-900 placeholder-gray-400 rounded-md border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border focus:border-indigo-600`}
              />
            </div>
            {errors.phone && (
              <span className="mt-2 text-red-600 text-sm block">
                {errors.phone}
              </span>
            )}
          </div>

          <div className="text-base mb-6">
            <label htmlFor="email" className="block font-medium">
              Email Address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                value={input.email}
                onChange={handleChange}
                className={`block w-full py-2 px-4 text-gray-900 placeholder-gray-400 rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border focus:border-indigo-600`}
              />
            </div>
            {errors.email && (
              <span className="mt-2 text-red-600 text-sm block">
                {errors.email}
              </span>
            )}
          </div>

          <div className="text-base mb-6">
            <label htmlFor="message" className="block font-medium">
              Message
            </label>
            <div className="mt-2">
              <textarea
                id="message"
                name="message"
                rows="3"
                placeholder="Enter Your Message"
                value={input.message}
                onChange={handleChange}
                className={`block w-full py-2 px-4 text-gray-900 placeholder-gray-400 rounded-md border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:border focus:border-indigo-600 resize-none`}
              ></textarea>
            </div>
            {errors.message && (
              <span className="mt-2 text-red-600 text-sm block">
                {errors.message}
              </span>
            )}
          </div>

          <div className="contact__btn">
            <button type="submit" className="btn">
              Submit
            </button>
          </div>

          {submitted && (
            <span className="mt-4 text-base bg-green-100 px-4 py-2 rounded-lg font-medium block">
              Form Submitted!
            </span>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
