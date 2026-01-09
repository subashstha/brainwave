import { Link } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import { useContext } from "react";

import { FaTwitter, FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";

const icons = {
  FaTwitter: FaTwitter,
  FaFacebook: FaFacebook,
  AiFillInstagram: AiFillInstagram,
  BsLinkedin: BsLinkedin,
};

const Footer = () => {
  const { data, isLoading } = useContext(DataContext);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;
  const { navigation, copyright, socials, contact } = data.footer;

  return (
    <>
      <footer className="footer text-base text-white bg-secondary overflow-hidden pt-15 pb-7.5">
        <div className="container">
          <div className="footer__row flex flex-wrap -mb-10">
            {navigation &&
              navigation.map((item, index) => (
                <div
                  className="footer__col pb-10 w-1/2 md:w-1/3 lg:w-1/5"
                  key={index}
                >
                  <div className="footer__title text-white-600 font-normal mb-5">
                    {item.navTitle}
                  </div>
                  <nav
                    className="footer__nav"
                    aria-label={`${item.navTitle} Nav`}
                  >
                    <ul className="flex flex-col gap-y-3">
                      {item.navLists.map((navItem, navIndex) => (
                        <li key={navIndex}>
                          <Link
                            to={navItem.link}
                            className="hover:text-primary"
                          >
                            {navItem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              ))}

            {contact && (
              <div className="footer__col">
                <div className="footer__title text-white-600 font-normal mb-5">
                  {contact.title}
                </div>
                {contact.list && (
                  <nav className="footer__nav" aria-label="Legal Nav">
                    <ul className="flex flex-col gap-y-3">
                      {contact.list.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.link}
                            className="hover:text-primary"
                            target="_blank"
                          >
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                )}
              </div>
            )}
          </div>
          <div className="copyright flex flex-col-reverse lg:flex-row gap-y-5 flex-wrap justify-between pt-8 mt-20 text-white-600 border-t border-border">
            <div
              className="copyright__text [&_a]:hover:text-primary"
              dangerouslySetInnerHTML={{ __html: copyright }}
            />
            {socials && (
              <div className="social text-lg">
                <ul className="flex flex-wrap gap-x-7.5">
                  {socials.map((item, index) => {
                    const Icon = icons[item.icon];
                    return (
                      <li key={index}>
                        <a
                          href={item.target}
                          aria-label={item.name}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary"
                        >
                          {Icon && <Icon />}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
