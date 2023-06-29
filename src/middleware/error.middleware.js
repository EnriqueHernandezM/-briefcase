const notFound = (req, res, next) => {
  const err = new Error(`Not foun  - ${req.originalUrl}`);
  res.status(400);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
    stack: err.stack,
  });
};

export { notFound, errorHandler };
