export const errorHandler=(statusCode,message)=>{
    // Error() is already there in js
    const error = new Error();
    error.statusCode=statusCode;
    error.message=message;
    return error;
}