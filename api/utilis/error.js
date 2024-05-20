//middleware created by us if we want to show error somewhere where error does'nt exist
export const errorHandler = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  error.message = message;
  return error;
};
