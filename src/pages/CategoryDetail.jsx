import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";
import BlogCard from "../components/BlogCard";

const CategoryDetail = () => {
  const { slug } = useParams();

  const postsInCategory = blogs.posts.filter((post) =>
    post.categories.some(
      (c) => c.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
    )
  );

  if (postsInCategory.length === 0) {
    return (
      <div className="text-center py-20">No posts found in this category.</div>
    );
  }

  return (
    <>
      <section className="blog-block py-20">
        <div className="container">
          <h1 className="text-center mb-15">
            Category: {slug.replace(/-/g, " ")}
          </h1>
          {postsInCategory && (
            <div className="blog__row md:flex md:flex-wrap -mx-4 -mb-6">
              {postsInCategory.map((item, index) => {
                return (
                  <div
                    className="blog__col md:w-1/2 lg:w-1/3 px-4 pb-6"
                    key={index}
                  >
                    <BlogCard blogCard={item} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default CategoryDetail;
