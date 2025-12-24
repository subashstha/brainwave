import { Link } from "react-router-dom";

const BlogCard = ({ blogCard }) => {
  const {
    title,
    image,
    imageDesc,
    excerpt,
    categories,
    date,
    tags,
    author,
    slug,
  } = blogCard;
  return (
    <div className="blog__card relative">
      <Link
        to={`/blog/${slug}`}
        className="blog-link absolute inset-0"
        aria-label="Blog Link"
      />

      {image && (
        <div className="blog__img mb-4 overflow-hidden rounded-xl aspect-3/2">
          <img
            src={image}
            alt={imageDesc}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="blog__body">
        {categories && (
          <div className="blog__categories text-[12px] flex gap-2 mb-1">
            {categories.map((item, index) => (
              <Link
                to={`/category/${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="category related z-2 bg-primary rounded-md py-1 px-2 text-white inline-flex"
                key={index}
              >
                {item}
              </Link>
            ))}
          </div>
        )}

        {date && (
          <time
            dateTime={new Date(date).toISOString()}
            className="text-[14px] mb-1"
          >
            {date}
          </time>
        )}
        {title && <h2 className="h3">{title}</h2>}

        {tags && (
          <div className="blog__tags text-base">
            <span className="tag">{tags}</span>
          </div>
        )}

        {excerpt && (
          <div className="text">
            <p>{excerpt}</p>
          </div>
        )}

        <div className="blog-authors mt-8">
          <Link
            to={`/author/${author.name
              .toLowerCase()
              .trim()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]/g, "")}
  `}
            className="author-card relative z-2 flex flex-wrap items-center gap-2"
          >
            <img
              src={author.image}
              alt={author.imageDesc}
              className="author-image w-14 h-14 object-cover rounded-full"
            />
            <div className="author-content flex flex-col gap-1">
              {author.name && (
                <span className="author-name h5 mb-0">{author.name}</span>
              )}
              {author.bio && (
                <span className="author-bio text-base">{author.bio}</span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
