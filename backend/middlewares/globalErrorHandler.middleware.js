export const globalErrorHandler = (err, req, res, next) => {
  console.error(`ERROR 💥:`, err.stack)

  //checks if there is an err code otherwise the status code is 500
  let statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'

  // Handle specific Node.js network/connection errors
  if (
    err.name === 'MongooseServerSelectionError' ||
    err.name === 'MongoNetworkError' ||
    err.code === 'ENOTFOUND' ||
    err.code === 'ECONNREFUSED' ||
    err.code === 'ENETUNREACH'
  ) {
    statusCode = 503 // Service Unavailable
    message = 'External service is unreachable. Please check your internet connection.'
  } else if (err.code === 'ETIMEDOUT') {
    statusCode = 504 // Gateway Timeout
    message = 'The request to the external service timed out.'
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  })

  next()
}
