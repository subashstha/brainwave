import { Link } from "react-router-dom";
import { blogs } from "../data/blogs";

const NotFound = ({ notFound }) => {
  const data = notFound || blogs.defaults.notFound;
  const { title, text } = data;
  return (
    <section className="blog-block py-20">
      <div className="container">
        {title && <h1 className="mb-5">{title}</h1>}
        {text && <div dangerouslySetInnerHTML={{ __html: text }}></div>}
        <div className="mt-7">
          <Link to="/" className="btn">
            Go Back Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
