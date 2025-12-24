import { Link, useParams } from "react-router-dom";
import { blogs } from "../data/blogs";

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogs.posts.find((p) => p.slug === slug);

  if (!post) {
    return <div>Blog not found</div>;
  }

  return (
    <section className="blog-detail py-10 lg:py-20">
      <div className="container">
        <div className="md:flex md:flex-wrap">
          <div className="md:w-2/3 md:pe-10">
            {post.title && (
              <h1 className="text-3xl font-bold mb-4 h2">{post.title}</h1>
            )}
            <div className="mb-6 text-gray-500">
              {post.author.name && <>By {post.author.name} | </>}
              {post.date && <>{post.date} | </>}
              {post.categories && (
                <>
                  Categories:{" "}
                  {post.categories.map((category, index) => (
                    <span key={index}>
                      <Link
                        to={`/category/${category
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="text-primary"
                      >
                        {category}
                      </Link>
                      {index < post.categories.length - 1 && ", "}
                    </span>
                  ))}
                </>
              )}
            </div>
            {post.image && (
              <img
                src={post.image}
                alt={post.imageDesc}
                className="w-full object-cover rounded-lg mb-6"
              />
            )}
            {post.excerpt && <p>{post.excerpt}</p>}
            {post.tags && (
              <div className="mt-6">
                <strong>Tags:</strong> {post.tags}
              </div>
            )}
          </div>
          <div className="md:w-1/3 mt-10 md:mt-0">
            {post.author && (
              <Link
                to={`/author/${post.author.name
                  .toLowerCase()
                  .trim()
                  .replace(/\s+/g, "-")
                  .replace(/[^\w-]/g, "")}
  `}
                className="author-holder"
              >
                <h2 className="h3 font-semibold mb-2">Author</h2>
                <div className="flex items-center gap-4">
                  {post.author.image && (
                    <img
                      src={post.author.image}
                      alt={post.author.imageDesc}
                      className="author-image w-14 h-14 object-cover rounded-full"
                    />
                  )}
                  <div className="author-content">
                    <p className="font-semibold">{post.author.name}</p>
                    {post.author.name && (
                      <p className="text-gray-500 text-base">
                        {post.author.bio}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetail;
