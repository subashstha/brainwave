import { blogs } from "../data/blogs";

const Info = ({ info }) => {
  const data = info || blogs.defaults.info;
  const { title, text } = data;

  return (
    <section className="info-block info-block--alt py-30">
      <div className="container flex flex-wrap">
        {title && <h2 className="info__title flex-1 pe-10">{title}</h2>}
        {text && (
          <div
            className="info__text w-[48%] [&_p]:mb-5 pe-10"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default Info;
