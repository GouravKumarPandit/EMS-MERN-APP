const createError = (message, status = 500) => {
    const error = new Error(message);
    error.status = status || 500;

    return error;
}

export default createError; 