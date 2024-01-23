/* eslint-disable no-unused-vars */
const golbalErrorsHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-console
// console.log(error.name);
  let statusCode = 500;

  let errorMessages = [];

  if (error.name === "ValidationError") {
    errorMessages = Object.values(error.errors).map((val) => val.message);
    // console.log(errorMessages);
  }
  else if (error.name === "MongoServerError") {
    statusCode=(error.code);
    errorMessages.push(error.message)
  }
  // eslint-disable-next-line no-console
  console.log("❌ Error:", errorMessages);
  res.json({
    status: false,
    code: statusCode,
    message: "something went wrong",
    errorMessage: errorMessages
  });
};
export default golbalErrorsHandler;
