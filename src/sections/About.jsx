import { blogs } from "../data/blogs";

const About = ({ about }) => {
  const data = about || blogs.defaults.about;
  const { images, title, text } = data;

  return (
    <section className="about-block bg-white-200 py-40">
      <div className="container flex flex-wrap items-end">
        <div className="about__left flex-1">
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
        <div className="about__right pt-12.5 w-[57.1%] md:pt-0 md:pl-20">
          {title && <h2 className="about__title mb-7.5">{title}</h2>}
          {text && (
            <div
              className="about__text [&_p]:mb-5"
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
