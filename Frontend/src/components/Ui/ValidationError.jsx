function ValidationError({ error }) {
    return (
        <p className='pt-1 text-red-400 text-sm'>{error}</p>
    );
}

export default ValidationError;