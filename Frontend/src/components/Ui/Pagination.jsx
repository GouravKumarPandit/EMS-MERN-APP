function Pagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) {
        return null;
    }

    return (
        <div className="mt-5 flex items-center justify-between">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded-lg border border-app-line bg-app-hover px-4 py-2 text-sm text-app-muted transition cursor-pointer hover:bg-app-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>

            <div className="flex items-center gap-2">
                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map(page => (

                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`h-9 min-w-9 rounded-lg px-3 text-sm transition cursor-pointer ${
                            currentPage === page
                                ? "bg-violet-600 text-white"
                                : "border border-app-line bg-app-hover text-app-muted hover:bg-app-hover"
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded-lg border border-app-line bg-app-hover px-4 py-2 text-sm text-app-muted transition cursor-pointer hover:bg-app-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;