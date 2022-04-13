class GenericError extends Error {
  constructor(message) {
    super();

    this.message = message;
  }
}

class BadRequest extends GenericError {}

class NotFound extends GenericError {}

module.exports = {
  GenericError,
  BadRequest,
  NotFound,
};
