import { blogs } from "../data/blogs";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { useState } from "react";

const Header = () => {
  const { title, logo, navigation, auth } = blogs.header;
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const navClass = ({ isActive }) =>
    `hover:text-primary ${isActive ? "text-primary" : ""}`;

  return (
    <header className="header py-6 text-base relative z-99">
      <div className="container">
        <div className="header__holder flex justify-between items-center">
          {logo && (
            <div className="header__logo">
              <Link to="/">
                <img src={logo} alt={title} />
              </Link>
            </div>
          )}

          <div className="nav__holder font-semibold text-secondary">
            <button
              className="flex flex-col items-center justify-center gap-y-1 w-10 h-10 relative lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span
                className={`w-6 h-0.5 bg-primary inline-flex transition-all duration-300
                ${isOpen ? "absolute rotate-45" : ""}`}
              ></span>
              <span
                className={`${
                  !isOpen ? "w-6 h-0.5 bg-primary inline-flex" : "hidden"
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-primary inline-flex transition-all duration-300
                ${isOpen ? "absolute -rotate-45" : ""}`}
              ></span>
            </button>
            <div
              className={`${
                isOpen
                  ? "nav__wrapper absolute top-21.5 left-0 right-0 bg-bg p-9 lg:static"
                  : "hidden lg:flex"
              }`}
            >
              <nav className="header__nav flex flex-col lg:flex-row lg:items-center  gap-x-10">
                {navigation && (
                  <ul className="flex flex-col text-end lg:flex-row lg:items-center gap-y-4 gap-x-10 mb-5 lg:mb-0">
                    {navigation.map((item, index) => (
                      <li key={index}>
                        <NavLink
                          to={item.link}
                          className={navClass}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}

                {auth && (
                  <div className="header__action text-end">
                    <ul className="flex flex-col gap-y-4 lg:flex-row lg:items-center gap-x-6">
                      {!user ? (
                        auth.map((item, index) => (
                          <li key={index}>
                            <NavLink
                              to={item.link}
                              className={({ isActive }) =>
                                `${item.class ?? ""} ${
                                  isActive ? "text-primary" : ""
                                }`
                              }
                              onClick={() => setIsOpen(false)}
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="font-semibold">
                            <NavLink
                              to="/dashboard"
                              className={navClass}
                              onClick={() => setIsOpen(false)}
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <button onClick={handleLogout} className="btn">
                              Logout
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
