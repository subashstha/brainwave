import { Link } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const Author = () => {
  const { data, isLoading } = useContext(DataContext);

  if (isLoading) return <p>Loading...</p>;
  const authorData = data?.defaults?.author;
  if (!authorData) return null;

  const { title } = authorData;

  const posts = data?.posts || [];

  const authors = Array.from(
    new Map(
      posts
        .filter((post) => post.author && post.author.name)
        .map((post) => [post.author.name, post.author])
    ).values()
  );

  console.log("Authors:", authors);

  if (authors.length === 0) return <p>No authors found.</p>;

  return (
    <section className="blog-block py-20">
      <div className="container">
        {title && <h1 className="text-center mb-15">{title}</h1>}
        <div className="blog__row flex flex-wrap -mx-4">
          {authors.map((item) => (
            <div className="blog__col w-1/3 px-4" key={item.name}>
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
