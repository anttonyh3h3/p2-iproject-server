const errorHandler = (err, req, res, next) => {
  console.log(">>>>>>>>>>>>>>>>>>>>>>>", err);

  let code = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    code = 400;
    message = err.errors[0].message;
  } 
  else if (err.name === "reqEmailUser") {
    code = 400
    message = "Username/Email required"
  }
  else if (err.name === "reqPass") {
    code = 400
    message = "Password required"
  }
  else if (err.name === "InvalidLogin") {
    code = 401
    message = "Invalid username/email or password"
  }

  res.status(code).json({ message });
};

module.exports = errorHandler;
