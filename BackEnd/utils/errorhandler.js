class ErrorHandler extends Error {  // ErrorHandeler class is inherited from the Error class which is Node's default class
     constructor (message,statusCode){
        super(message) ;
            this.statusCode = statusCode

             Error.captureStackTrace (this, this.constructor)
     }
    }
    
module.exports= ErrorHandler
     
// In summary, the ErrorHandler class is a custom error handling class that extends the built-in Error class.
// It allows you to create instances of error objects with a custom status code and captures the stack trace
// for debugging purposes. This class can be used in a Node.js application to handle and report errors.
    
    