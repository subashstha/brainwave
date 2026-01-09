import { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";

const Blogs = () => {
  const { data, isLoading } = useContext(DataContext);

  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const postsPerPage = 6;

  useEffect(() => {
    if (data?.posts) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosts(data.posts);
    }
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(1);
  }, [selectedCategory, selectedAuthor, sortOption, debouncedSearch]);

  const categories = Array.from(
    new Set(posts.flatMap((post) => post.categories))
  );
  const authors = Array.from(new Set(posts.map((post) => post.author.name)));

  const filteredPosts = posts
    .filter((post) => {
      const categoryMatch =
        !selectedCategory || post.categories.includes(selectedCategory);
      const authorMatch =
        !selectedAuthor || post.author.name === selectedAuthor;
      const searchMatch =
        !debouncedSearch ||
        post.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(debouncedSearch.toLowerCase());
      return categoryMatch && authorMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortOption === "newest") return new Date(b.date) - new Date(a.date);
      if (sortOption === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortOption === "title-asc") return a.title.localeCompare(b.title);
      if (sortOption === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  if (isLoading) {
    return <p className="text-center">Loading blogs...</p>;
  }

  if (!posts || posts.length === 0) {
    return (
      <p className="text-center text-gray-500">No blog posts available.</p>
    );
  }

  return (
    <section className="blog-block py-10 lg:py-20">
      <div className="container">
        <h1 className="text-center mb-10 lg:mb-15">Blogs</h1>

        <div className="filter-holder mb-10 grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg px-3 py-2.5"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg px-3 py-2.5"
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) => (
              <option value={cat} key={i}>
                {cat}
              </option>
            ))}
          </select>

          <select
            value={selectedAuthor}
            onChange={(e) => setSelectedAuthor(e.target.value)}
            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg px-3 py-2.5"
          >
            <option value="">All Authors</option>
            {authors.map((author, i) => (
              <option value={author} key={i}>
                {author}
              </option>
            ))}
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg px-3 py-2.5"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
          </select>
        </div>

        {currentPosts.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts found.</p>
        ) : (
          <>
            <div className="blog__row md:flex md:flex-wrap -mx-4">
              {currentPosts.map((post) => (
                <div
                  className="blog__col md:w-1/2 lg:w-1/3 px-4 mb-6"
                  key={post.id}
                >
                  <BlogCard blogCard={post} />
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Blogs;
