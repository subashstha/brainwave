import { blogs } from "../data/blogs";
import BlogCard from "../components/BlogCard";

const RelatedPost = ({ related }) => {
  const featuredPosts = blogs.posts
    .filter((post) => post.isFeatured)
    .slice(0, 3);

  const data = related || blogs.defaults.related;
  const { title } = data;

  return (
    <>
      <section className="related-block pb-30">
        <div className="container">
          {title && <h2 className="text-center mb-10">{title}</h2>}
          {featuredPosts && (
            <div className="blog__row flex flex-wrap -mx-4">
              {featuredPosts.map((item, index) => {
                return (
                  <div className="blog__col w-1/3 px-4" key={index}>
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

export default RelatedPost;
