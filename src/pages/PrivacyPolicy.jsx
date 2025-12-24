import { blogs } from "../data/blogs";

const PrivacyPolicy = ({ privacy }) => {
  const data = privacy || blogs.defaults.privacy;
  const { title, content } = data;

  return (
    <section className="py-10 md:py-20">
      <div className="container">
        {title && <h1 className="mb-15 text-center">{title}</h1>}
        {content && (
          <div
            className="[&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-10 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-10 [&_img]:w-full [&_img]:h-full [&_img]:rounded-xl [&_img]:my-10"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        )}
      </div>
    </section>
  );
};

export default PrivacyPolicy;
