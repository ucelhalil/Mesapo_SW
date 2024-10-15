
class CustomResponse {
    constructor() {
        if (!CustomResponse.instance) {
            CustomResponse.instance = this;
        }
        return CustomResponse.instance;
    };

    sendResponse(res,status,message,data = null) {
        return res.status(status).json({
            status : status === 200 ? 'success' : 'failed', 
            message,
            data
        });
    }

    success (res, message = 'Success', data = null) {
        return this.sendResponse(res,200,message,data);
    }

    created (res, message = 'Object Created', data = null) {
        return this.sendResponse(res,201,message,data);
    }

    badRequest (res, message = 'Bad Request', data = null) {
        return this.sendResponse(res,400,message,data);
    }

    unauthorized (res, message = 'Unauthorized Access', data = null) {
        return this.sendResponse(res,401,message,data);
    }

    serverError (res, message = 'Interval Server Error', data = null) {
        return this.sendResponse(res,500,message,data);
    }

    forbidden (res, message = 'Forbidden', data = null) {
        return this.sendResponse(res,403,message,data);
    }

    notFound (res, message = 'Not Found', data = null) {
        return this.sendResponse(res,404,message,data);
    }
}

const response = new CustomResponse();
Object.freeze(response);

export default response;