import { useParams } from "react-router-dom";
import { blogs } from "../data/blogs";

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const AuthorDetail = () => {
  const { slug } = useParams();

  const authors = Array.from(
    new Map(blogs.posts.map((post) => [post.author.name, post.author])).values()
  );

  const author = authors.find((a) => slugify(a.name) === slug);

  if (!author) return <div>Author not found</div>;

  return (
    <section className="author-detail py-20">
      <div className="container text-center">
        <img
          src={author.image}
          alt={author.imageDesc}
          className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{author.name}</h1>
        <p className="text-lg text-gray-600">{author.bio}</p>
      </div>
    </section>
  );
};

export default AuthorDetail;
