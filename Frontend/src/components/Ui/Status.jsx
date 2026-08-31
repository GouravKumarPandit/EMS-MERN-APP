function Status({ status }) {
    return (
        <>
            <span className={`rounded-md border px-3 py-1 text-xs capitalize ${status === "pending"
                ? "border-blue-500/20 bg-blue-500/10 text-blue-400"
                : status === "accepted"
                    ? "border-yellow-500/20 bg-yellow-500/10 text-yellow-400"
                    : status === "completed"
                        ?"border-green-500/20 bg-green-500/10 text-green-400"
                        : "border-red-500/20 bg-red-500/10 text-red-400"
                }`}>
                {status}
            </span>
        </>
    )
}

export default Status;