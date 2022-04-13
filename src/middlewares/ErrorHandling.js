const { BadRequest, NotFound } = require("../errors/GenericError");

const ErrorHandling = (error, request, response, next) => {
  if (error instanceof BadRequest) {
    return response.status(400).json({
      status: "error",
      message: error.message,
    });
  }

  if (error instanceof NotFound) {
    return response.status(404).json({
      status: "error",
      message: error.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Something broke. Try again later, please.",
  });
};

module.exports = ErrorHandling;
