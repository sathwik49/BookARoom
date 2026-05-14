interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  page,
  totalPages,
  setPage,
}: PaginationProps) {
  return (
    <div className="px-5 py-3 border-t border-emerald-100 flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="
            h-10 px-4 rounded-xl
            border border-emerald-100
            bg-white
            hover:bg-emerald-50
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-sm font-medium
            transition
            cursor-pointer
          "
        >
          Previous
        </button>

        {Array.from({ length: totalPages }).map((_, index) => {
          const currentPage = index + 1;

          return (
            <button
              key={currentPage}
              onClick={() => setPage(currentPage)}
              className={`
                h-10 min-w-10 px-3 rounded-xl
                text-sm font-medium
                transition
                cursor-pointer
                ${
                  currentPage === page
                    ? "bg-emerald-600 text-white"
                    : "border border-emerald-100 bg-white hover:bg-emerald-50 text-gray-700"
                }
              `}
            >
              {currentPage}
            </button>
          );
        })}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="
            h-10 px-4 rounded-xl
            border border-emerald-100
            bg-white
            hover:bg-emerald-50
            disabled:opacity-50
            disabled:cursor-not-allowed
            text-sm font-medium
            transition
            cursor-pointer
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}
