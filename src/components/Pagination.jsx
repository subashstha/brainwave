import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  // Generate page numbers with "..." if there are gaps
  const getPageNumbers = () => {
    const delta = 2; // number of pages around current page
    const range = [];
    const rangeWithDots = [];
    let last;

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
      if (last) {
        if (i - last === 2) {
          rangeWithDots.push(last + 1);
        } else if (i - last > 2) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      last = i;
    }

    return rangeWithDots;
  };

  return (
    <nav aria-label="Pagination" className="flex gap-x-2">
      {/* Previous button */}
      <button
        onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="relative inline-flex items-center rounded-md px-2 py-2 hover:bg-primary hover:text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Previous</span>
        <ChevronLeftIcon className="w-5 h-5" />
      </button>

      {/* Page numbers */}
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

      {/* Next button */}
      <button
        onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="relative inline-flex items-center rounded-md px-2 py-2 hover:bg-primary hover:text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
      >
        <span className="sr-only">Next</span>
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </nav>
  );
};

export default Pagination;
