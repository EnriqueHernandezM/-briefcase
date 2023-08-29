const notFound = (req, res, next) => {
  const err = new Error(
    `Not found - ${req.originalUrl} visit: http://enriquehdezbriefcasev100-env.eba-mdkbmmjj.us-east-2.elasticbeanstalk.com/api_briefcase/v1`
  );
  res.status(400);
  next(err);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
  });
};

export { notFound, errorHandler };
