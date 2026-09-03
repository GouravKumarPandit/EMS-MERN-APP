function Priority({ priority }) {
    return (
        <>
            <span className={`rounded-md border px-3 py-1 text-xs capitalize ${priority === "urgent"
                ? "border-fuchsia-500/20 bg-fuchsia-500/10 text-fuchsia-400"
                : priority === "high"
                ? "border-red-500/20 bg-red-500/10 text-red-400"
                : priority === "medium"
                    ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                    : priority === "low"
                        ? "border-green-500/20 bg-green-500/10 text-green-400"
                        : "border-red-500/20 bg-red-500/10 text-red-400"
                }`}>
                {priority}
            </span>
        </>
    )
}

export default Priority