/* eslint-disable no-unused-vars */
const golbalErrorsHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-console
  // console.log(error.name);
  let statusCode = 500;
  let message = "";
  let errorMessages = "";

  if (error.name === "ValidationError") {
    message=error?.name
    errorMessages = error?.message;
    
    // console.log(errorMessages);
  } else if (error.name === "MongoServerError") {
    statusCode = error.code;
    message=error.name
    errorMessages = error.message;
  } else if (error instanceof Error) {
    message=error?.name
    errorMessages = error?.message;
  }
  // eslint-disable-next-line no-console
  console.log("❌ Error:", errorMessages);
  res.json({
    status: false,
    code: statusCode,
    message,
    errorMessage: errorMessages,
  });
};
export default golbalErrorsHandler;
