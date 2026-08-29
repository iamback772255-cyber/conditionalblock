/**
 * Rate Limiting & DDoS Protection Middleware
 * Prevents abuse and ensures fair resource usage
 */

import rateLimit from 'express-rate-limit';

const standardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // limit login attempts
  message: 'Too many login attempts, please try again later.',
  skipSuccessfulRequests: true,
});

const contractLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit contract creation
  message: 'Too many contracts created, please wait before creating another.',
});

export { standardLimiter, authLimiter, contractLimiter };