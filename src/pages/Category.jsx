import { Link } from "react-router-dom";
import { blogs } from "../data/blogs";

const Category = () => {
  const categories = Array.from(
    new Set(blogs.posts.flatMap((post) => post.categories))
  );

  return (
    <section className="blog-block py-20">
      <div className="container">
        <h1 className="text-center mb-15">Categories</h1>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
              className="category text-base related z-2 bg-primary rounded-md py-1 px-2 text-white inline-flex"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
