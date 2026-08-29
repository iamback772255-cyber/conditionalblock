/**
 * Audit Logger Middleware
 * Tracks all critical operations for compliance and debugging
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const auditLogPath = path.join(__dirname, '../../logs/audit.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(auditLogPath))) {
  fs.mkdirSync(path.dirname(auditLogPath), { recursive: true });
}

const auditLogger = (req, res, next) => {
  const originalSend = res.send;

  res.send = function(data) {
    const auditEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      userId: req.user?.id || 'anonymous',
      ip: req.ip,
      statusCode: res.statusCode,
      userAgent: req.get('user-agent')
    };

    // Log to file
    fs.appendFileSync(
      auditLogPath,
      JSON.stringify(auditEntry) + '\n'
    );

    console.log('[AUDIT]', auditEntry);
    return originalSend.call(this, data);
  };

  next();
};

export default auditLogger;