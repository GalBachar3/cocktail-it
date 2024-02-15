const ErrorHandler = async (error, req, res, next) => {
    const status = error.status || 500;
    res.status(status).send(error.message);
};

export const notFoundError = async (req, res) => {
    res.status(404).send('Error 404 not found');
}

export default ErrorHandler;