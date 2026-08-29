/**
 * Global Error Handler Middleware
 * Implements graceful error handling and recovery
 */

import metricsService from '../services/metricsService.js';

const errorHandler = (err, req, res, next) => {
  metricsService.recordError();

  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // Determine status code
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  } else if (err.name === 'ForbiddenError') {
    statusCode = 403;
    message = 'Forbidden';
  } else if (err.name === 'NotFoundError') {
    statusCode = 404;
    message = 'Not Found';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code: err.code || 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString(),
    },
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;