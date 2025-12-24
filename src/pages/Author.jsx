import { Link } from "react-router-dom";
import { blogs } from "../data/blogs";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const Author = () => {
  const { title } = blogs.defaults.author;

  const authors = Array.from(
    new Map(blogs.posts.map((post) => [post.author.name, post.author])).values()
  );

  return (
    <section className="blog-block py-20">
      <div className="container">
        {title && <h1 className="text-center mb-15">{title}</h1>}
        <div className="blog__row flex flex-wrap -mx-4">
          {authors.map((item, index) => (
            <div className="blog__col w-1/3 px-4" key={index}>
              <div className="blog-authors mt-8">
                <Link
                  to={`/author/${slugify(item.name)}`}
                  className="author-card relative z-2 flex flex-wrap items-center gap-2"
                >
                  <img
                    src={item.image}
                    alt={item.imageDesc}
                    className="author-image w-14 h-14 object-cover rounded-full"
                  />
                  <div className="author-content flex flex-col gap-1">
                    <span className="author-name h5 mb-0">{item.name}</span>
                    <span className="author-bio text-base">{item.bio}</span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Author;
