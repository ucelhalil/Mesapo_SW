import CustomResponse from '../utils/response.js';

const ErrorHandler = (err, req, res, next) => {
    if (err) {
        CustomResponse.serverError(res, err.message, err.status || 500);
    }
    next();
};

export default ErrorHandler;
