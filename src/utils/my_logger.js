class MyLogger {
    constructor () {
        if(!MyLogger.instance){
            MyLogger.instance = this;
        }
        return MyLogger.instance;
    }

    info(message = 'An info message', functionName = 'Unknown', metaData = {}) {
        if (process.env.NODE_ENV !== 'development') {
            console.log('INFO:', message, functionName, metaData);
        }
    }

    error(message = 'An error occurred', functionName = 'Unknown', metaData = {}) {
        if (process.env.NODE_ENV !== 'development') {
            console.error('ERROR:', message, functionName, metaData);
        }
    }

    warn(message = 'A warning occurred', functionName = 'Unknown', metaData = {}) {
        if (process.env.NODE_ENV !== 'development') {
            console.warn('WARN:', message, functionName, metaData);
        }
    }
}

const instance = new MyLogger();
Object.freeze(instance);

export default instance;