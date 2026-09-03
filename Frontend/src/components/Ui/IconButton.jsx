function IconButton({ label, ...props}) {
    return (
        <>
            <button
                {...props}
                className="rounded-lg p-2 text-app-muted transition hover:bg-blue-500/10 hover:text-blue-400"
            >
                { label }
            </button>
        </>
    )
}

export default IconButton