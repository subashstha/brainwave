import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import BlogCard from "../components/BlogCard";

const RelatedPost = () => {
  const { data, isLoading } = useContext(DataContext);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return null;

  const relatedData = data.defaults?.related;
  if (!relatedData) return null;

  const { title } = relatedData;

  const featuredPosts = data.posts
    ?.filter((post) => post.isFeatured)
    .slice(0, 3);

  if (!featuredPosts || featuredPosts.length === 0) return null;

  return (
    <>
      <section className="related-block pb-20 md:pb-30">
        <div className="container">
          {title && <h2 className="text-center mb-10">{title}</h2>}
          {featuredPosts && (
            <div className="blog__row md:flex md:flex-wrap md:-mx-4 -mb-10">
              {featuredPosts.map((item, index) => {
                return (
                  <div
                    className="blog__col md:w-1/2 lg:w-1/3 md:px-4 mb-10"
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

export default RelatedPost;
