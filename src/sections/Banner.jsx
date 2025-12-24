import { blogs } from "../data/blogs";

const Banner = ({ banner }) => {
  const data = banner || blogs.defaults.banner;
  const { title, text, image, imageDesc } = data;
  return (
    <section className="banner py-20 text-center">
      <div className="container">
        <div className="banner__content mb-12.5 mx-auto max-w-150">
          {title && <h1 className="banner__title mb-7">{title}</h1>}
          {text && (
            <div
              className="banner__text"
              dangerouslySetInnerHTML={{ __html: text }}
            ></div>
          )}
        </div>
        {image && (
          <figure className="banner__img rounded-xl overflow-hidden">
            <img
              src={image}
              alt={imageDesc}
              className="w-full h-full object-cover"
            />
          </figure>
        )}
      </div>
    </section>
  );
};

export default Banner;
