import { blogs } from "../data/blogs";

const Info = ({ info }) => {
  const data = info || blogs.defaults.info;
  const { title, text } = data;

  return (
    <section className="info-block info-block--alt py-10 md:py-15 lg:py-30">
      <div className="container md:flex md:flex-wrap">
        {title && <h2 className="info__title flex-1 mb-6 md:pe-10">{title}</h2>}
        {text && (
          <div
            className="info__text md:w-[48%] [&_p]:mb-5 md:pe-10"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default Info;
