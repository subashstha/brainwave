import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const About = ({ about }) => {
  const { data, isLoading } = useContext(DataContext);

  if (isLoading) return <p>Loading...</p>;
  const aboutData = about || data?.defaults?.about;

  if (!aboutData) return null;

  const { images, title, text } = aboutData;

  return (
    <section className="about-block bg-white-200 py-20 lg:py-40">
      <div className="container md:flex md:flex-wrap md:items-end">
        <div className="about__left md:flex-1">
          {images && (
            <div className="about__images grid grid-cols-2 gap-4">
              {images.map((item, index) => (
                <figure
                  className="about__img rounded-xl overflow-hidden"
                  key={index}
                >
                  <img
                    src={item.src}
                    alt={item.desc}
                    className="w-full h-full object-cover"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
        <div className="about__right pt-12.5 md:w-1/2 lg:w-[57.1%] md:pt-0 md:pl-10 lg:pl-20">
          {title && <h2 className="about__title mb-7.5">{title}</h2>}
          {text && (
            <div
              className="about__text [&_p]:mb-5 -mb-5"
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
