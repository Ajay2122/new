const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  // console.log(err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

module.exports = globalErrorHandler;

// const AppError = require("../error/AppError");

// const globalErrorHandler = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   let error = { ...err }; // Create a copy of the error object

//   // Handling specific error types
//   if (error.name === "CastError") {
//     // MongoDB ID Error
//     const message = `Resource Not Found. Invalid: ${error.path}`;
//     error = next(new AppError(message, 400));
//   } else if (error.code === 11000) {
//     // Mongoose Duplicate Key Error
//     const key = Object.keys(error.keyValue)[0];
//     const message = `${key} already exists`;
//     error = next(new AppError(message, 400));
//   } else if (error.name === "JsonWebTokenError") {
//     // Wrong JWT Error
//     const message = "JWT Error";
//     error = next(new AppError(message, 400));
//   } else if (error.name === "TokenExpiredError") {
//     // JWT Expired Error
//     const message = "JWT is Expired";
//     error = next(new AppError(message, 400));
//   }

//   res.status(error.statusCode).json({
//     status: error.status,
//     message: error.message,
//   });
// };

// module.exports = globalErrorHandler;
