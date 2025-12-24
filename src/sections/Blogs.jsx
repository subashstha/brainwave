import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { blogs } from "../data/blogs";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  return (
    <nav aria-label="Pagination" className="flex gap-x-2">
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="relative inline-flex items-center rounded-md px-2 py-2
             hover:bg-primary hover:text-white
             disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon aria-hidden="true" className="w-5 h-5" />
      </button>

      {getPageNumbers().map((page, index) =>
        page === "..." ? (
          <span
            key={index}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold"
          >
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => setCurrentPage(page)}
            aria-current={currentPage === page ? "page" : undefined}
            className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer rounded-lg ${
              currentPage === page
                ? "z-10 bg-indigo-500 text-white hover:bg-primary"
                : "hover:bg-primary hover:text-white"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="relative inline-flex items-center rounded-md px-2 py-2
             hover:bg-primary hover:text-white
             disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon aria-hidden="true" className="w-5 h-5" />
      </button>
    </nav>
  );
};

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    setTimeout(() => {
      setPosts(blogs.posts);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 1000);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedAuthor, sortOption, debouncedSearch]);

  const categories = Array.from(
    new Set(blogs.posts.flatMap((post) => post.categories))
  );
  const authors = Array.from(
    new Set(blogs.posts.map((post) => post.author.name))
  );

  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleAuthorChange = (e) => setSelectedAuthor(e.target.value);
  const handleSortChange = (e) => setSortOption(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);

  const filteredPosts = posts
    .filter((post) => {
      const categoryMatch =
        selectedCategory === "" || post.categories.includes(selectedCategory);
      const authorMatch =
        selectedAuthor === "" || post.author.name === selectedAuthor;
      const searchMatch =
        debouncedSearch === "" ||
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

  return (
    <section className="blog-block py-20">
      <div className="container">
        <h1 className="text-center mb-15">Blogs</h1>

        <div className="filter-holder mb-10 grid grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg px-3 py-2.5"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg px-3 py-2.5"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option value={cat} key={index}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={selectedAuthor}
            onChange={handleAuthorChange}
            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg px-3 py-2.5"
          >
            <option value="">All Authors</option>
            {authors.map((author, index) => (
              <option value={author} key={index}>
                {author}
              </option>
            ))}
          </select>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="block w-full bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg px-3 py-2.5"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title A → Z</option>
            <option value="title-desc">Title Z → A</option>
          </select>
        </div>

        {isLoading ? (
          <p className="text-center">Loading blogs...</p>
        ) : currentPosts.length === 0 ? (
          <p className="text-center text-gray-500">No blog posts found.</p>
        ) : (
          <>
            <div className="blog__row flex flex-wrap -mx-4">
              {currentPosts.map((item) => (
                <div className="blog__col w-1/3 px-4 mb-6" key={item.id}>
                  <BlogCard blogCard={item} />
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
