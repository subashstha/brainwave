import { blogs } from "../data/blogs";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const Header = () => {
  const { title, logo, navigation, auth } = blogs.header;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `hover:text-primary ${isActive ? "text-primary" : ""}`;

  return (
    <header className="header py-6 text-base">
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
            <div className="nav__wrapper">
              <nav className="header__nav flex items-center gap-x-10">
                {navigation && (
                  <ul className="flex items-center gap-x-10">
                    {navigation.map((item, index) => (
                      <li key={index}>
                        <NavLink to={item.link} className={navClass}>
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}

                {auth && (
                  <div className="header__action">
                    <ul className="flex items-center gap-x-6">
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
                            >
                              {item.name}
                            </NavLink>
                          </li>
                        ))
                      ) : (
                        <>
                          <li className="font-semibold">
                            <NavLink to="/dashboard" className={navClass}>
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
