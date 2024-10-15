class CustomError extends Error {
  constructor(message = 'An error occurred', status = 500,functionName = 'Unknown',metaData = {}) {
    super(message);
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // Capturing the stack trace keeps the line numbers in our stack traces accurate.
    Error.captureStackTrace(this, this.constructor);

    // Custom Properties
    this.status = status;
    this.functionName = functionName;
    this.metaData = metaData;
  }

  toJsonObject() {
    return {
        name: this.name,
        status: this.status,
        functionName: this.functionName,
        message: this.message,
        metaData: this.metaData,
        stack: this.stack,
    };
  }
}

export default CustomError;